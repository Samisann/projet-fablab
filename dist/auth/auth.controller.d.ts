import { PasswordResetService } from './service/password-reset.service';
import { UserDTO } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/service/UserService';
export declare class AuthController {
    private passwordResetService;
    private userService;
    constructor(passwordResetService: PasswordResetService, userService: UserService);
    sendPasswordResetEmail(userDTO: UserDTO): Promise<{
        message: string;
    }>;
}
