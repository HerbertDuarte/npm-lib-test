import { BadRequestException } from "@nestjs/common";

export class EmailSendingException extends BadRequestException {
    constructor(message?: string) {
        super(message ?? "Erro ao enviar email.");
        this.name = "EmailSendingException";
    }
}
