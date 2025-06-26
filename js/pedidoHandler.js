export function criarPedido(produto, quantidade, endereco) {
  if (!produto || !endereco || quantidade < 1) {
    return "Por favor, preencha todos os campos corretamente.";
  }

  const subtotal = produto.preco * quantidade;

  return {
    produto: produto.nome,
    quantidade,
    endereco,
    subtotal
  };
}
