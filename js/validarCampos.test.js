const validarCampos = require('./validarCampos');

describe('validação de campos', () => {
    test('retorna erro se algum campo estiver vazio', () => {
        expect(validarCampos("", "email@email.com", "1234", "(11) 98765-4321", "São Paulo"))
            .toBe("Preencha todos os campos!");
    });

    test("retorna erro se o e-mail estiver sem '@'", () => {
        expect(validarCampos("user", "emailemail.com", "1234", "(11) 98765-4321", "São Paulo"))
            .toBe("Email inválido: está faltando o '@'.");
    });

    test("retorna erro se a senha for muito curta", () => {
        expect(validarCampos("user", "email@email.com", "12", "(11) 98765-4321", "São Paulo"))
            .toBe("A senha deve ter pelo menos 4 caracteres!");
    });

    test("retorna true se todos os dados estiverem corretos", () => {
        expect(validarCampos("user", "email@email.com", "1234", "(11) 98765-4321", "São Paulo"))
            .toBe(true);
    });
});
