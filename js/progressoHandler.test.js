import { salvarProgressoCheckboxes, carregarProgressoCheckboxes, limparProgressoStorage } from './progressoHandler';

describe('Controle de progresso dos treinos', () => {
  const treinoId = 'superior';
  const checkboxMocks = [
    { id: 'flexao', checked: true },
    { id: 'abdominal', checked: false }
  ];

  beforeEach(() => {
    localStorage.clear();
  });

  test('salva corretamente o progresso no localStorage', () => {
    const status = salvarProgressoCheckboxes(checkboxMocks, treinoId);
    expect(status).toEqual({ flexao: true, abdominal: false });

    const armazenado = JSON.parse(localStorage.getItem(`progresso-${treinoId}`));
    expect(armazenado).toEqual(status);
  });

  test('carrega o progresso corretamente', () => {
    localStorage.setItem(`progresso-${treinoId}`, JSON.stringify({ flexao: true }));
    const resultado = carregarProgressoCheckboxes(treinoId);
    expect(resultado).toEqual({ flexao: true });
  });

  test('limpa o progresso corretamente', () => {
    localStorage.setItem(`progresso-${treinoId}`, JSON.stringify({ flexao: true }));
    limparProgressoStorage(treinoId);
    expect(localStorage.getItem(`progresso-${treinoId}`)).toBeNull();
  });
});
