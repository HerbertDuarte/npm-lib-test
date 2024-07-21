export interface MailProps<T> {
    to: string;
    title: string;
    templateFileName?: string;
    args?: T;
}

export interface IMailService {
    send<T>(mailProps: MailProps<T>): Promise<void>;
}
