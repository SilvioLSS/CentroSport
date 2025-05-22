// Cadastro pré-carregado do usuário admin
if (!localStorage.getItem("cadastros")) {
    var admin = {
        usuario: "admin",
        email: "admin@gmail.com",
        senha: "1234",
        telefone: "(16) 99999-1111",
        cidade: "araraquara"
    };
    localStorage.setItem("cadastros", JSON.stringify([admin]));
}

// Máscara e bloqueio de letras no telefone
document.getElementById("telefone").addEventListener("input", function () {
    var valor = this.value.replace(/\D/g, ""); // Remove tudo que não for dígito

    if (valor.length > 0) {
        valor = "(" + valor;
    }
    if (valor.length > 3) {
        valor = valor.slice(0, 3) + ") " + valor.slice(3);
    }
    if (valor.length > 10) {
        valor = valor.slice(0, 10) + "-" + valor.slice(10);
    }
    this.value = valor.slice(0, 15); // Máximo de 15 caracteres formatados
});

// Bloqueia números na cidade
document.getElementById("cidade").addEventListener("keypress", function (e) {
    if (/\d/.test(e.key)) {
        e.preventDefault();
    }
});

// Validação dos campos
function validarCampos(usuario, email, senha, telefone, cidade) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var telefoneRegex = /^\(\d{2}\)\s\d{5}-\d{4}$/;

    if (!usuario || !email || !senha || !telefone || !cidade) {
        alert("Preencha todos os campos!");
        return false;
    }

    if (!emailRegex.test(email)) {
        if (!email.includes("@")) {
            alert("Email inválido: está faltando o '@'.");
        } else if (!email.includes(".")) {
            alert("Email inválido: está faltando o '.' (ponto).");
        } else {
            alert("Email inválido: verifique o formato.");
        }
        return false;
    }

    if (senha.length < 4) {
        alert("A senha deve ter pelo menos 4 caracteres!");
        return false;
    }

    if (!telefoneRegex.test(telefone)) {
        alert("Telefone inválido! Use o formato (99) 99999-9999");
        return false;
    }

    return true;
}

function cadastrar() {
    var usuario = document.getElementById("usuario").value.trim();
    var email = document.getElementById("email").value.trim();
    var senha = document.getElementById("senha").value.trim();
    var telefone = document.getElementById("telefone").value.trim();
    var cidade = document.getElementById("cidade").value.trim();

    if (!validarCampos(usuario, email, senha, telefone, cidade)) {
        return;
    }

    var cadastro = {
        usuario: usuario,
        email: email,
        senha: senha,
        telefone: telefone,
        cidade: cidade
    };

    var cadastros = JSON.parse(localStorage.getItem("cadastros")) || [];
    cadastros.push(cadastro);
    localStorage.setItem("cadastros", JSON.stringify(cadastros));

    alert("Cadastro efetuado com sucesso!");
    window.location.href = "../index.html";
}

document.getElementById("btnCadastrar").addEventListener("click", function (e) {
    e.preventDefault();
    cadastrar();
});
