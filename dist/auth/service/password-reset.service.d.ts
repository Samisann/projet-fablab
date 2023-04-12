import { UserService } from 'src/user/service/UserService';
export declare class PasswordResetService {
    private readonly userService;
    private transporter;
    constructor(userService: UserService);
    sendTempPasswordByEmail(email: string): Promise<void>;
}
