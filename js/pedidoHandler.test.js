import { criarPedido } from './pedidoHandler';

const produtoExemplo = {
  nome: "Tênis Esportivo",
  preco: 200.0
};

describe('Função criarPedido', () => {
  test('Retorna erro se faltar endereço', () => {
    const resultado = criarPedido(produtoExemplo, 2, "");
    expect(resultado).toBe("Por favor, preencha todos os campos corretamente.");
  });

  test('Retorna erro se quantidade for zero', () => {
    const resultado = criarPedido(produtoExemplo, 0, "Rua A, 123");
    expect(resultado).toBe("Por favor, preencha todos os campos corretamente.");
  });

  test('Retorna pedido válido se tudo estiver correto', () => {
    const resultado = criarPedido(produtoExemplo, 2, "Rua A, 123");
    expect(resultado).toEqual({
      produto: "Tênis Esportivo",
      quantidade: 2,
      endereco: "Rua A, 123",
      subtotal: 400.0
    });
  });
});
