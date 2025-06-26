import { podeReservar } from './reservaHandler.js';

function reservarQuadra(nomeQuadra, idSelectHorario, idInputData, idConfirmacao, idConfirmacaoModal) {
  const selectHorario = document.getElementById(idSelectHorario);
  const inputData = document.getElementById(idInputData);
  if (!selectHorario || !inputData) return false;

  const horarioSelecionado = selectHorario.value;
  const dataSelecionada = inputData.value;
  const usuarioLogado = localStorage.getItem("usuarioLogado");

  const reserva = {
    usuario: usuarioLogado,
    nomeQuadra,
    data: dataSelecionada,
    horario: horarioSelecionado
  };

  const reservasExistentes = JSON.parse(localStorage.getItem("reservasQuadras")) || [];
  const resultado = podeReservar(reserva, reservasExistentes);

  if (resultado !== true) {
    alert(resultado);
    return false;
  }

  reservasExistentes.push(reserva);
  localStorage.setItem("reservasQuadras", JSON.stringify(reservasExistentes));

  const mensagem = `Reserva confirmada para a quadra ${nomeQuadra}, no dia ${new Date(dataSelecionada).toLocaleDateString("pt-BR")} às ${horarioSelecionado}.`;

  const confirmacao = document.getElementById(idConfirmacao);
  if (confirmacao) confirmacao.textContent = mensagem;

  const confirmacaoModal = document.getElementById(idConfirmacaoModal);
  if (confirmacaoModal) confirmacaoModal.textContent = mensagem;

  selectHorario.selectedIndex = 0;
  inputData.value = "";

  carregarReservas();
  return true;
}
