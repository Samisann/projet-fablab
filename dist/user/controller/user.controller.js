"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const constant_1 = require("../../utils/constant");
const user_dto_1 = require("../dto/user.dto");
const UserService_1 = require("../service/UserService");
const passwordForgot_dto_1 = require("../dto/passwordForgot.dto");
const password_reset_service_1 = require("../../auth/service/password-reset.service");
let UserController = class UserController {
    constructor(userService, passwordResetService) {
        this.userService = userService;
        this.passwordResetService = passwordResetService;
    }
    async create(userDTO) {
        const user = await this.userService.findByUsername(userDTO.email);
        if (user) {
            throw new common_1.HttpException(constant_1.Constants.EXISTING_USER, common_1.HttpStatus.BAD_REQUEST);
        }
        return await this.userService.create(userDTO);
    }
    async getUserInfo(userDTO) {
        try {
            const user = await this.userService.findByUsername(userDTO.email);
            if (!user) {
                throw new common_1.HttpException(constant_1.Constants.USER_NOT_FOUND, common_1.HttpStatus.NOT_FOUND);
            }
            const { email, nom, prenom, telephone } = user;
            return { email, nom, prenom, telephone };
        }
        catch (e) {
            throw new common_1.HttpException(constant_1.Constants.SERVICE_UNAIVALAIBLE, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async sendPasswordResetEmail(userDTO) {
        const user = await this.userService.findByUsername(userDTO.email);
        if (!user) {
            throw new common_1.HttpException(constant_1.Constants.USER_NOT_FOUND, common_1.HttpStatus.NOT_FOUND);
        }
        await this.passwordResetService.sendTempPasswordByEmail(userDTO.email);
        return { message: 'Email envoyé' };
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserInfo", null);
__decorate([
    (0, common_1.Post)('reset-password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [passwordForgot_dto_1.PasswordForgotDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "sendPasswordResetEmail", null);
UserController = __decorate([
    (0, common_1.Controller)('v1/user'),
    __metadata("design:paramtypes", [UserService_1.UserService,
        password_reset_service_1.PasswordResetService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map