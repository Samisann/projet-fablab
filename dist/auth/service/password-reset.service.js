"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordResetService = void 0;
const common_1 = require("@nestjs/common");
const nodemailer = require("nodemailer");
let PasswordResetService = class PasswordResetService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'connextu.webtech@gmail.com',
                pass: 'Bonjour2023',
            },
        });
    }
    async sendResetEmail(email, resetLink) {
        const mailOptions = {
            from: 'connextu.webtech@gmail.com',
            to: email,
            subject: 'Réinitialisation de mot de passe',
            text: `Vous avez demandé la réinitialisation de votre mot de passe. Cliquez sur le lien suivant pour réinitialiser votre mot de passe : ${resetLink}`,
        };
        const info = await this.transporter.sendMail(mailOptions);
        console.log(`Email envoyé : ${info.messageId}`);
    }
};
PasswordResetService = __decorate([
    (0, common_1.Injectable)()
], PasswordResetService);
exports.PasswordResetService = PasswordResetService;
//# sourceMappingURL=password-reset.service.js.map