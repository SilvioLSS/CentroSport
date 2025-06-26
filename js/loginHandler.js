export default function autenticarUsuario(usuarioDigitado, senhaDigitada, cadastros) {
    const usuarioEncontrado = cadastros.find(c => c.usuario === usuarioDigitado);

    if (!usuarioEncontrado) {
        return "usuário não identificado";
    }

    if (usuarioEncontrado.senha !== senhaDigitada) {
        return "senha inválida";
    }

    return true;
}
