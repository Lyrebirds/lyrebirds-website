export class Service {
    title: string;
    description: string;
}

export const OUR_SERVICES: Service[] = [
    {
        title: 'Red Team',
        description: 'With this service we simulate a full scale attack'
    },
    {
        title: 'Tech Checkup',
        description: `IT-Security is constantly evolving with vulnerabilities being constantly discovered and corrected. Have you been keeping up with the latest news on the software your company uses, and whether or not it is still safe? We have, and we'll help you assess your preferred tools, so that your can safely leverage the technology.`
    },
    {
        title: 'Employee Training',
        description: `Modern attacks are not limited to technological exploitation, and defenses are often breached by assailants targeting well meaning employees. Your defenses are only as secure as the weakest point, and your employees are a major part of those defenses. We offer workshops on recognizing attacks, such as phishing or social engineering, tailored to your specific security strategy. Let us help your company by educating your staff on their part in keeping up IT-security, and transform your employees from liabilities to valuable security assets.`
    },
    {
        title: 'Secure your Data',
        description: `Your data is your business, but are you prepared to lose it? Data can be lost to a destructive attacker, or by unfortunate accidents. Securing your data is a vital precaution, and recovery must be available on demand. We can help you create and evaluate your data security strategy, in order to leverage the best technology has to offer, while making sure that you stay compliant with modern laws such as GDPR or the Cookie Directive`
    },
]