import { UserDTO } from '../dto/user.dto';
import { UserService } from '../service/UserService';
import { User } from '../entities/user.model';
import { PasswordForgotDTO } from '../dto/passwordForgot.dto';
import { PasswordResetService } from 'src/auth/service/password-reset.service';
export declare class UserController {
    private readonly userService;
    private readonly passwordResetService;
    constructor(userService: UserService, passwordResetService: PasswordResetService);
    create(userDTO: UserDTO): Promise<User>;
    getUserInfo(userDTO: UserDTO): Promise<Pick<User, 'email' | 'nom' | 'prenom' | 'telephone'>>;
    sendPasswordResetEmail(userDTO: PasswordForgotDTO): Promise<{
        message: string;
    }>;
}
