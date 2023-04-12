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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordResetService = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
const util_1 = require("util");
const UserService_1 = require("../../user/service/UserService");
const nodemailer_1 = require("nodemailer");
const dotenv = require("dotenv");
let PasswordResetService = class PasswordResetService {
    constructor(userService) {
        this.userService = userService;
        dotenv.config();
        this.transporter = (0, nodemailer_1.createTransport)({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.MAILER_EMAIL,
                pass: process.env.MAILER_PASSWORD,
            },
        });
    }
    async sendTempPasswordByEmail(email) {
        const tempPassword = (await (0, util_1.promisify)(crypto_1.randomBytes)(8)).toString('hex');
        const user = await this.userService.findByUsername(email);
        user.password = tempPassword;
        await this.transporter.sendMail({
            to: email,
            subject: 'Votre mot de passe temporaire',
            html: `Votre mot de passe temporaire est: <strong>${tempPassword}</strong>`,
        });
    }
};
PasswordResetService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [UserService_1.UserService])
], PasswordResetService);
exports.PasswordResetService = PasswordResetService;
//# sourceMappingURL=password-reset.service.js.map