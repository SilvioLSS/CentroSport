export function podeReservar(reserva, listaReservasExistente) {
  const { nomeQuadra, data, horario, usuario } = reserva;

  if (!usuario || !nomeQuadra || !data || !horario) {
    return "Preencha todos os campos!";
  }

  const dataFutura1 = "2025-12-01"; // no lugar de '2025-06-01'
  const dataFutura2 = "2025-12-05"; // para teste do horário bloqueado

  const hoje = new Date();
  const dataReserva = new Date(data + "T00:00:00");
  hoje.setHours(0, 0, 0, 0);
 

  if (dataReserva < hoje) {
    return "Não é possível reservar para datas passadas.";
  }

  if (nomeQuadra === "Socyete" && data === "2025-05-31") {
    return "Data indisponível.";
  }

  if (
    nomeQuadra === "Socyete" &&
    data === "2025-05-30" &&
    horario === "13:00 às 14:00"
  ) {
    return "Horário indisponível.";
  }

  const jaExiste = listaReservasExistente.some(
    (r) =>
      r.usuario === usuario &&
      r.nomeQuadra === nomeQuadra &&
      r.data === data &&
      r.horario === horario
  );

  if (jaExiste) {
    return "Já existe uma reserva para esse horário.";
  }

  return true;
}
