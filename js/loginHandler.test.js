import autenticarUsuario from './loginHandler';

const cadastrosMock = [
    { usuario: "admin", senha: "1234" },
    { usuario: "maria", senha: "abcd" }
];

describe("Autenticação de login", () => {
    test("Usuário não existe", () => {
        expect(autenticarUsuario("joao", "1234", cadastrosMock))
            .toBe("usuário não identificado");
    });

    test("Senha incorreta", () => {
        expect(autenticarUsuario("admin", "0000", cadastrosMock))
            .toBe("senha inválida");
    });

    test("Login bem-sucedido", () => {
        expect(autenticarUsuario("admin", "1234", cadastrosMock))
            .toBe(true);
    });
});
