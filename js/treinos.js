import {
  salvarProgressoCheckboxes,
  carregarProgressoCheckboxes,
  limparProgressoStorage
} from "./progressoHandler.js";

const conteudo = document.getElementById('conteudo-exercicios');

// Gerar interface com os dados dos exercícios
dadosExercicios.forEach(bloco => {
  const divCategoria = document.createElement('div');
  divCategoria.className = 'categoria';
  divCategoria.innerText = bloco.categoria;
  conteudo.appendChild(divCategoria);

  const ul = document.createElement('ul');
  ul.className = 'lista-exercicios';

  bloco.itens.forEach(item => {
    const id = item.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');

    const li = document.createElement('li');
    li.innerHTML = `
      <input type="checkbox" id="${id}">
      <label for="${id}"><span>${item}</span></label>
    `;
    ul.appendChild(li);
  });

  conteudo.appendChild(ul);
});

// ---------- Funcionalidades ----------
function marcarTodos() {
  document.querySelectorAll('input[type="checkbox"]').forEach(c => c.checked = true);
}

function desmarcarTodos() {
  document.querySelectorAll('input[type="checkbox"]').forEach(c => c.checked = false);
}

function salvarProgresso() {
  const checkboxes = Array.from(document.querySelectorAll('input[type="checkbox"]'));
  salvarProgressoCheckboxes(checkboxes, treinoId);
  alert("Progresso salvo!");
}

function limparProgresso() {
  limparProgressoStorage(treinoId);
  desmarcarTodos();
  alert("Progresso limpo.");
}

function carregarProgresso() {
  const status = carregarProgressoCheckboxes(treinoId);
  document.querySelectorAll('input[type="checkbox"]').forEach(c => {
    c.checked = !!status[c.id];
  });
}

window.onload = carregarProgresso;
