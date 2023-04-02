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
const updatePassword_dto_1 = require("../dto/updatePassword.dto");
const user_dto_1 = require("../dto/user.dto");
const UserService_1 = require("../service/UserService");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async create(userDTO) {
        try {
            const user = await this.userService.findByUsername(userDTO.email);
            if (user) {
                throw new common_1.HttpException(constant_1.Constants.EXISTING_USER, common_1.HttpStatus.BAD_REQUEST);
            }
            return await this.userService.create(userDTO);
        }
        catch (e) {
            throw new common_1.HttpException(constant_1.Constants.SERVICE_UNAIVALAIBLE, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updatePassword(email, UpdatePasswordDTO, request) {
        try {
            const user = this.userService.findByUsername(email);
            if (user) {
                return await this.userService.updatePassword(email, UpdatePasswordDTO);
            }
            throw new common_1.HttpException(constant_1.Constants.EXISTING_USER, common_1.HttpStatus.BAD_REQUEST);
        }
        catch (e) {
            throw new common_1.HttpException(constant_1.Constants.SERVICE_UNAIVALAIBLE, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
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
    (0, common_1.Post)('password'),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, updatePassword_dto_1.UpdatePasswordDTO, Request]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updatePassword", null);
UserController = __decorate([
    (0, common_1.Controller)('v1/user'),
    __metadata("design:paramtypes", [UserService_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map