export class ServiceDescription {
    header: string;
    content: string;
}

export class Service {
    title: string;
    intro: string;
    body: ServiceDescription[];
    image: string;
}

export const OUR_SERVICES: Service[] = [
    {
        title: 'Security Evaluation',
        intro: 'How well would your system fare against an attack? We can check your defenses for weaknesses, before a real attacker does.',
        body: [
            {
                header: 'Internal Review',
                content: `A through analysis of your IT-defenses, such as network configuration, user authentication, and intrusion detection.`
            },
            {
                header: 'Simulated Attack',
                content: `The only way to know how well your organization is protected, is to see how it fares against attacks. We can perform so called Red Team attacks, which wont cause any damage, but will show where and how it could be done.`
            }
        ],
        image: "/assets/img/horizont_javascript_close.jpg"
    },
    {
        title: 'Tech Checkup',
        intro: `IT-Security is always evolving with vulnerabilities being constantly discovered and corrected. We follow the evolution of cyber security, and can help you catch up.`

        ,
        body: [
            {
                header: 'Software Tools',
                content: `The software you use in your daily operation, might no longer be as secure as it used to be. We can help review your preferred tools for known security faults, so that your can safely leverage the technology.`
            },
            {
                header: 'Product Verification',
                content: `We can verify if your product lives up to modern security standards, and investigate if your suppliers are keeping a the same standard as you.`
            }
        ],
        image: "/assets/img/router_laptop.jpg"
    },
    {
        title: 'Employee Training',
        intro: `Modern attacks are not limited to technological exploitation, and defenses are often breached by assailants targeting well meaning employees. Your defenses are only as secure as the weakest point, and your employees are a major part of those defenses.`,
        body: [
            {
                header: 'Security Workshops',
                content: `We offer workshops on recognizing attacks, such as phishing or social engineering, tailored to your specific security strategy. Let us help your company by educating your staff on their part in keeping up IT-security, and transform your employees from liabilities to valuable security assets.`
            }
        ],
        image: "/assets/img/harbour.jpg"
    },
    {
        title: 'Secure your Data',
        intro: `Your data is your business, but is it safe? Data can be lost to a destructive attack, or by unfortunate accidents. Securing your data is a vital precaution, and recovery must be available on demand.`,
        body: [
            {
                header: 'Data Access Control',
                content: `It is not always desireable to have execute strategy documents shared with your entire organization. Having control of data access will limit risks of exposure of internal information or breaking GDPR agreements with your costumers.`
            },
            {
                header: 'Encryption',
                content: `Data can be stolen and communication intercepted, but if encrypted correctly your and your customers data will be safe.`
            },
            {
                header: 'Compliance',
                content: `We can help you create and evaluate your data safety and security strategy, making sure that you stay compliant with modern laws such as GDPR or the Cookie directive.`
            },
            {
                header: 'Data Backup',
                content: `When all else fails, being able to quickly restore data from recent backups, might be the deciding factor in a crisis. We can implement best practices, and make your data secure and recoverable.`
            }
        ],
        image: "/assets/img/horizont_javascript_far.jpg"
    },
]
