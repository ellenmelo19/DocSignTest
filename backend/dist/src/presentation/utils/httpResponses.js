export function success(reply, data, status = 200) {
    reply.code(status).send({ success: true, data });
}
export function created(reply, data) {
    success(reply, data, 201);
}
export function noContent(reply) {
    reply.code(204).send();
}
export function error(reply, message, status = 400) {
    reply.code(status).send({ success: false, message });
}
//Padroniza resposta de erro par ajudar na legibilidade 
//# sourceMappingURL=httpResponses.js.map