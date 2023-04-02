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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_model_1 = require("../entities/user.model");
let UserService = class UserService {
    constructor(model) {
        this.model = model;
    }
    async findAll() {
        return this.model.find().exec();
    }
    async create(userDTO) {
        return await new this.model(Object.assign(Object.assign({}, userDTO), { createdAt: new Date() })).save();
    }
    async findByUsername(email) {
        return this.model.findOne({ email }).exec();
    }
    async updatePassword(email, updatePasswordDTO) {
        const { oldPassword } = updatePasswordDTO, rest = __rest(updatePasswordDTO, ["oldPassword"]);
        const user = this.model.findOne({ email }).exec();
        if ((await user).password !== oldPassword) {
            throw new common_1.HttpException('Wrong old password', common_1.HttpStatus.BAD_REQUEST);
        }
        else if (rest.newPassword !== rest.confirmPassword) {
            throw new common_1.HttpException('New password and confirm password do not match', common_1.HttpStatus.BAD_REQUEST);
        }
        else if (rest.newPassword.length < 8) {
            throw new common_1.HttpException('New password must be at least 8 characters', common_1.HttpStatus.BAD_REQUEST);
        }
        else {
            return new this.model(Object.assign(Object.assign({}, rest), { createdAt: new Date() })).save();
            console.log('Password updated successfully');
        }
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_model_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=UserService.js.map