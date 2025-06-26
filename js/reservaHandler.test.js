import { podeReservar } from './reservaHandler';

const usuario = "testeUser";
const dataFutura1 = "2025-12-01";
const dataFutura2 = "2025-12-05";

const reservasExistentes = [
  { usuario, nomeQuadra: "Socyete", data: dataFutura1, horario: "10:00 às 11:00" }
];

test("Reserva duplicada deve ser bloqueada", () => {
  const resultado = podeReservar({
    usuario,
    nomeQuadra: "Socyete",
    data: dataFutura1,
    horario: "10:00 às 11:00"
  }, reservasExistentes);
  expect(resultado).toBe("Já existe uma reserva para esse horário.");
});

test("Horário indisponível da quadra deve ser bloqueado", () => {
  const resultado = podeReservar({
    usuario,
    nomeQuadra: "Socyete",
    data: dataFutura2,
    horario: "13:00 às 14:00"
  }, []);
  expect(resultado).toBe("Horário indisponível.");
});



  test("Horário indisponível da quadra deve ser bloqueado", () => {
    const resultado = podeReservar({
      usuario, nomeQuadra: "Socyete", data: "2025-05-30", horario: "13:00 às 14:00"
    }, []);
    expect(resultado).toBe("Horário indisponível.");
  });

  test("Reserva válida deve ser aceita", () => {
    const resultado = podeReservar({
      usuario, nomeQuadra: "Volei", data: "2025-07-01", horario: "09:00 às 10:00"
    }, []);
    expect(resultado).toBe(true);
  });
