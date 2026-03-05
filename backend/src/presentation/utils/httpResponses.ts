import { FastifyReply } from "fastify";

export function success<T>(reply: FastifyReply, data: T, status = 200): void {
    reply.code(status).send({ success : true, data});
}

export function created<T>(reply: FastifyReply, data: T): void {
    success(reply, data, 201);
}

export function noContent(reply: FastifyReply): void {
    reply.code(204).send();
}

export function error(reply: FastifyReply, message: string, status = 400): void {
    reply.code(status).send({ success: false, message });
}

//Padroniza resposta de erro par ajudar na legibilidade 