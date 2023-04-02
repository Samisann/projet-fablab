import { UserDTO } from '../dto/user.dto';
import { UserService } from '../service/UserService';
import { User } from '../entities/user.model';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(userDTO: UserDTO): Promise<User>;
    getUserInfo(userDTO: UserDTO): Promise<Pick<User, 'email' | 'nom' | 'prenom' | 'telephone'>>;
}
