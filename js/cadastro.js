function cadastrar() {  
    var nome = document.getElementById("nome").value;
    var email = document.getElementById("email").value;
    var senha = document.getElementById("senha").value;
    var telefone = document.getElementById("telefone").value;
    var cidade = document.getElementById("cidade").value;

    var cadastro = {
        nome: nome,
        email: email,
        senha: senha,
        telefone: telefone,
        cidade: cidade
    };
    
    var cadastros = JSON.parse(localStorage.getItem("cadastros")) || [];

    cadastros.push(cadastro);

    localStorage.setItem("cadastros", JSON.stringify(cadastros));

    window.location.href = "../index.html";
}

document.getElementById("btnCadastrar").addEventListener("click", function(e) {
    e.preventDefault();
    cadastrar();
});
