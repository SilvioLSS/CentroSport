export function salvarProgressoCheckboxes(checkboxes, treinoId) {
  const status = {};
  checkboxes.forEach(c => {
    status[c.id] = c.checked;
  });
  localStorage.setItem(`progresso-${treinoId}`, JSON.stringify(status));
  return status;
}

export function carregarProgressoCheckboxes(treinoId) {
  const status = JSON.parse(localStorage.getItem(`progresso-${treinoId}`)) || {};
  return status;
}

export function limparProgressoStorage(treinoId) {
  localStorage.removeItem(`progresso-${treinoId}`);
}
