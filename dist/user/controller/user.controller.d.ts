import { UpdatePasswordDTO } from '../dto/updatePassword.dto';
import { UserDTO } from '../dto/user.dto';
import { UserService } from '../service/UserService';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(userDTO: UserDTO): Promise<import("../entities/user.model").User>;
    updatePassword(email: string, UpdatePasswordDTO: UpdatePasswordDTO, request: Request): Promise<import("../entities/user.model").User>;
}
