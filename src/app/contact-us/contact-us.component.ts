import { Component, OnInit } from '@angular/core';
import { SlackService } from '../services/slack.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ContactMessage } from '../slack-message';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslatorService } from '../translator.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  contactForm: FormGroup;

  constructor(private slack: SlackService, private _snackBar: MatSnackBar, private translate: TranslatorService) { }

  ngOnInit() {
    this.contactForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      subject: new FormControl(''),
      text: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl(''),
    });
  }

  onSubmit() {
    const name = this.contactForm.value['name'];
    const subject = this.contactForm.value['subject'];
    const text = this.contactForm.value['text'];
    const email = this.contactForm.value['email'];
    const phone = this.contactForm.value['phone'];
    this.slack.sendMessage(new ContactMessage(name, email, phone, subject, text));
  }

  hasError = (controlName: string, errorName: string) => {
    return this.contactForm.controls[controlName].hasError(errorName);
  }

  copyPGPKey() {
    const copyText = document.getElementById("PUBLIC-PGP-KEY").innerText;
    navigator.clipboard.writeText(copyText);
    this.translate.translator.get('CONTACT.PGP.COPIED').subscribe((text: string) => {
      this.openSnackBar(text);
    });
  }
  openSnackBar(message: string, action?: string) {
    this._snackBar.open(message, action, {
      duration: 2000
    });
  }

  PGP: string = "mQINBF17XjQBEADMLTVuCVcjzV+MxjtnXgfv42y1vJ/XNZoEvS7pmiKBUN4A3NTOTmpkMMp2KPxwAjC8XgoMRoatDUCxaYyLANr2Iz4Io98j75ejK+0h6IVTP1HcGJ7EmC9kpa0r71JJgZkxuvSneX0gggloEtV5R7J0yp9MwDlCy7O6mbpWDqh+Jib7ET+r8qvmB79Kxrvj31THMI7+rd4Q2NvT3DYBNwsP88sCQGd9Q86QUlxa44NN+lXU8U0nc6q5sa/H4yc1q1Q9GAww0UFsvYrFFOfS9yPJK8mRb0S47azVK/+NSmzgjkA/+PIl7wLKN5gfhDGGsj3cyA9nBlMZhusruZG0FQaZqF5Q88DuIQLU4fbnjiRIgukPEnrXdnK/sPgwE3FCIOkBb8678+LmUp0AvC8KMaEvSsUgY6kwZh50hj9stt0+z0hPg+E/KuvjU9xZrsYrkymtfvjvuNKotJdYo8yiHphF2RG0DFhEXT0HXs6HW4Std3oIE61/TTEN5bYgQB/LENUrhUU31JQMa4P2Z04tMsiVKWFTlDwjQ87YDEBonaYPWgSq3G/NLkm1LzwoqAn6eqO95k3br8hkw9KqPuC3AA/V336gb7XjALF2jlW6gS5iJeJ/tfQbMD7M391kiQNMGSWrGrzaSQtt7PoAIttzFljmr9IL93L7bxi8tfSw2Axx7wARAQABtDRMeXJlYmlyZHMgKEx5cmViaXJkcyBjb250YWN0KSA8Y29udGFjdEBseXJlYmlyZHMuZGs+iQJUBBMBCAA+FiEESK57WOCupX6z3USAaM8wQ0yDEzsFAl17XjQCGwMFCQPCZwAFCwkIBwIGFQoJCAsCBBYCAwECHgECF4AACgkQaM8wQ0yDEztGxxAAocRe+6c4nLwhyOYHtASnPIR0VJF24l+dggAhmKR7HV/cE2yEKL7A0jJcy7bvXYTz8IESn76LTw+XyInDf2yGL736AQFEAPt26aiYGKHXxWNU39bh8oRdeFhmJ2fU059L4hmr/BgiSBeMXNeSSe/wUQWUQtzv/VxLqvkD847SSNTJ57UhZMp8WeFCt1Pb9DaPOik3etspkEpJdtPEjFD6281YKEem/uQEGQ5NeydnkZzzmMB+zK6xojeLvA218YbuRcn2fFeIksQEc+0HpBgUQyKkoE1FRby0F3TpcFjlxdMcCCUfctGMNEcglBlMO6PIWBBeklQESiS7wDgJUKHofKjuqa4/5+bccjmwka+yWGOr5h7kHLSWf4E10vDA8m2AIwrfcSPlwG959mQe/q+ApIwf0m+QYHFwV5on5HGJBnl0tLGKWora3HR4ETNbHxxUmlJGTYq7mMyQhlk27+BfIWq5gup9IgxFIZUDvXokGo5avo828imQAWEERDceBh0mi+t5NAXJWYx0Xaw/aNxA3u6iD3pgj9S2gx42d1KmiMax4iSnlCVP/CLkXCYPymCAxMWZov5rq/hHg44QKO2+1rmJ/v3PO3abRzvIf9V06Qz72RZexK3xXndmG827PL+yI9bzyUyNs8qigLwoF8tpqHEjjWVu1TyuRzD2MeGUr1a5Ag0EXXteNAEQANH8qMoL47H/pyPbI5Wk30t75RXznPIV4Gn2trPLo21U/Z+qnlnH+RHwCdtpVLfWFwH+VLph6czgozWYC/7G8P+DThu9T/6zV3b0CCY7sd8rMrA31Hej2J0cdXqjYOum8qn+gWoa1eYP3G0VGSE3xAiBUpgywrDZeSS2u9etlWffsVHHtuXDwxtEje0vy3nqMrh7c/2vBtErElxyapFsw2t/HsQBj9pE6AAbHPTr/OKilMV2amfJxtqofh2io7uSmRwtICXlzKtHuwqLdWW9ecZ/t3mgWs0I5+Leyzo9YiQyXGAi2EI9zuo7/+TPSSC9lipYeSmoT1kjL/myY5OdrcnS9fdkkgfE0/YRNFTV1vCREGZ7ue6o294jyxhz5php2u0ssGOKOZY4nZQtrQlYpvzizz9RNhN07R4KvyUfRLk9SbsXu+/L93Wc8pbAvJ8AoVKI8AqMYc82ZxwJvtqNHFjQwNijw2WPZmy1ciaUv7RTpgXXm4kvruoDPF6H4A5wPAHhlAtzfWPWnsgxZqgMeVbgeK/bEldP6tFBmR5OqByBwzkMXGLfFLpHhXU2akCFEOLt5eXO4lwxCYw/KX/drYphzsifV/Kvngb3U5qMmkGlqdNNcCdQ3sN8OK8Fv2Vzm/4mJ03/HmBnb83h9I3InsQF9cUCEhZgYOwkfqA+ny3HABEBAAGJAjwEGAEIACYWIQRIrntY4K6lfrPdRIBozzBDTIMTOwUCXXteNAIbDAUJA8JnAAAKCRBozzBDTIMTO9i5D/49EJS54VOtaDrYp7UNvDmv7WyPMBzvEA8KLULvxDB4EFPtSfzuxeJmieH1zouvAR7k4OMeGnPeehtoqQZfVHU9cKk1x4XBQsqQhfen5HPM8fAepOSNJe9F6IzPQVmz0lcwd4g9UQC5D3fKsLllPG0Yl5OrI/lTrQguc/CGL4GX4voMmXiODHc5kRv6XrvcblM9tb1U+zOXMFN7YCpRpFhuW8W0Tbg3aIGgNXE9Of/WTQP/zry9OOLcgbbtsFBGpBw+5Qibyz3rqlbpH53C0CIg0ppsaqtN0NVS7+WBTiqi7Y84v68Ggr09YXA/SKI2B5Q+k34YBX8HI6k6KaEJLkyJovqotf+LoHF91mIJCPqlulPpWwwmTrsGuSX5xA/oqRggQxWB0g6GuUXPfBo05k5Ak52m10Rwl/bpu0PTModoFXk5sIyl650Rn7kqejKUrdv9EBeXYMIIueCS4SaBf9oXeGhPg8lopQmsFF4GKeqzGCXeZ9K3rRAPuxJteO8RyAGslb5sUR/MagSuHxA7RdYXLgmXPJKpZ03Hc0PNxm+CBmVrA7/jevLqFS2cWEeC2lNtLs2YgfZh7kvyjH6TeyHBhX/UlOmlleRb+Zc09vJuB0SsJiRyw8dkVoZqLfT2J7P+EbHVWM9R+esGwVMjd9/O0MBkkMpeZon4vk79k9d1Ig===+E8o"
}