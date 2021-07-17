export interface EmailService {
  sendEmail: (message: string) => Promise<void>;
}
