function validarCampos(usuario, email, senha, telefone, cidade) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var telefoneRegex = /^\(\d{2}\)\s\d{5}-\d{4}$/;

    if (!usuario || !email || !senha || !telefone || !cidade) {
        return "Preencha todos os campos!";
    }

    if (!emailRegex.test(email)) {
        if (!email.includes("@")) {
            return "Email inválido: está faltando o '@'.";
        } else if (!email.includes(".")) {
            return "Email inválido: está faltando o '.' (ponto).";
        } else {
            return "Email inválido: verifique o formato.";
        }
    }

    if (senha.length < 4) {
        return "A senha deve ter pelo menos 4 caracteres!";
    }

    if (!telefoneRegex.test(telefone)) {
        return "Telefone inválido! Use o formato (99) 99999-9999";
    }

    return true;
}

module.exports = validarCampos;
