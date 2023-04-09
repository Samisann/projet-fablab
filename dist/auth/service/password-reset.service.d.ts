export declare class PasswordResetService {
    private transporter;
    sendResetEmail(email: string, resetLink: string): Promise<void>;
}
