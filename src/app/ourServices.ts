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
        title: 'Red Team',
        intro: 'With this service we simulate a full scale attack',
        body: [],
        image: "/assets/img/horizont_javascript_close.jpg"
    },
    {
        title: 'Tech Checkup',
        intro: `IT-Security is always evolving with vulnerabilities being constantly discovered and corrected. Have you been keeping up with the latest news on the software your company uses, and whether or not it is still safe? We have, and we'll help you assess your preferred tools, so that your can safely leverage the technology in your daily operation.`,
        body: [],
        image: "/assets/img/router_laptop.jpg"
    },
    {
        title: 'Employee Training',
        intro: `Modern attacks are not limited to technological exploitation, and defenses are often breached by assailants targeting well meaning employees.`,
        body: [{ header: '', content: 'Your defenses are only as secure as the weakest point, and your employees are a major part of those defenses. We offer workshops on recognizing attacks, such as phishing or social engineering, tailored to your specific security strategy. Let us help your company by educating your staff on their part in keeping up IT-security, and transform your employees from liabilities to valuable security assets.' }],
        image: "/assets/img/harbour.jpg"
    },
    {
        title: 'Secure your Data',
        intro: `Your data is your business, but how safe is it? Data can be lost to a destructive attack, or by unfortunate accidents. Securing your data is a vital precaution, and recovery must be available on demand.`,

        body: [
            {
                header: 'Personal Data',
                content: `Data may only be available for the people your customer trust. Any external consultant companies may only have access to customers data if explicit concent is given.`
            },
            {
                header: 'Security',
                content: `Data can be stolen, but if encrypted correctly your customers usernames, passwords, social security numbers etc. will still stay safe.`
            },
            {
                header: '',
                content: `We can help you create and evaluate your data safety and security strategy, while making sure that you stay compliant with modern laws such as GDPR or the Cookie directive.`
            }
        ],
        image: "/assets/img/horizont_javascript_far.jpg"
    },
]
