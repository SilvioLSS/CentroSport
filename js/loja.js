import { criarPedido } from './pedidoHandler.js';

formPedido.addEventListener('submit', (e) => {
  e.preventDefault();

  const endereco = enderecoEntregaInput.value.trim();
  const quantidade = parseInt(quantidadeProdutoInput.value);

  const pedido = criarPedido(produtoAtual, quantidade, endereco);

  if (typeof pedido === 'string') {
    alert(pedido); // mensagem de erro
    return;
  }

  let pedidos = JSON.parse(localStorage.getItem('pedidosCentroSport') || '[]');
  pedidos.push(pedido);
  localStorage.setItem('pedidosCentroSport', JSON.stringify(pedidos));

  modal.hide();
  carregarPedidos();
  alert(`Pedido de ${produtoAtual.nome} finalizado com sucesso!`);
});
