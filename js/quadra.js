const horariosDisponiveis = [
  "06:00 às 07:00", "07:00 às 08:00", "08:00 às 09:00", "09:00 às 10:00", "10:00 às 11:00",
  "11:00 às 12:00", "12:00 às 13:00", "13:00 às 14:00", "14:00 às 15:00", "15:00 às 16:00",
  "16:00 às 17:00", "17:00 às 18:00", "18:00 às 19:00", "19:00 às 20:00"
];

function popularHorarios() {
  const selects = [
    "horarioSocyete",
    "horarioBasquete",
    "horarioTenis",
    "horarioVolei"
  ];

  selects.forEach(id => {
    const select = document.getElementById(id);
    if (!select) return;
    select.innerHTML = "";
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Selecione um horário";
    select.appendChild(defaultOption);
    horariosDisponiveis.forEach(horario => {
      const option = document.createElement("option");
      option.value = horario;
      option.textContent = horario;
      select.appendChild(option);
    });
  });
}

function configurarDataMin() {
  const hoje = new Date();
  const ano = hoje.getFullYear();
  const mes = String(hoje.getMonth() + 1).padStart(2, '0');
  const dia = String(hoje.getDate()).padStart(2, '0');
  const dataMin = `${ano}-${mes}-${dia}`;

  const idsDatas = [
    "dataSocyete",
    "dataBasquete",
    "dataTenis",
    "dataVolei"
  ];

  idsDatas.forEach(id => {
    const inputData = document.getElementById(id);
    if (inputData) {
      inputData.min = dataMin;
      inputData.value = "";
    }
  });
}

function limparCamposModal(nomeQuadra) {
  const idData = `data${nomeQuadra}`;
  const idHorario = `horario${nomeQuadra}`;
  const inputData = document.getElementById(idData);
  const selectHorario = document.getElementById(idHorario);
  if (inputData) inputData.value = "";
  if (selectHorario) selectHorario.selectedIndex = 0;
}

function configurarEventosSaibaMais() {
  const botoesSaibaMais = [
    { btnId: "btnSaibaMaisSocyete", nomeQuadra: "Socyete" },
    { btnId: "btnSaibaMaisBasquete", nomeQuadra: "Basquete" },
    { btnId: "btnSaibaMaisTenis", nomeQuadra: "Tenis" },
    { btnId: "btnSaibaMaisVolei", nomeQuadra: "Volei" }
  ];

  botoesSaibaMais.forEach(({ btnId, nomeQuadra }) => {
    const btn = document.getElementById(btnId);
    if (btn) {
      btn.addEventListener("click", () => {
        limparCamposModal(nomeQuadra);
      });
    }
  });
}

function salvarReserva(reserva) {
  const reservas = JSON.parse(localStorage.getItem("reservasQuadras")) || [];

  const existe = reservas.some(r =>
    r.nomeQuadra === reserva.nomeQuadra &&
    r.data === reserva.data &&
    r.horario === reserva.horario
  );
  if (existe) {
    alert("Já existe uma reserva para essa quadra, data e horário.");
    return false;
  }

  reservas.push(reserva);
  localStorage.setItem("reservasQuadras", JSON.stringify(reservas));
  return true;
}

function carregarReservas() {
  const reservas = JSON.parse(localStorage.getItem("reservasQuadras")) || [];
  const listaReservas = document.getElementById("listaReservas");
  const ulReservas = document.getElementById("reservaLista");

  ulReservas.innerHTML = "";

  if (reservas.length === 0) {
    listaReservas.style.display = "none";
    return;
  }

  reservas.sort((a, b) => {
    const horaA = a.horario.slice(0, 5);
    const horaB = b.horario.slice(0, 5);
    const dataHoraA = new Date(`${a.data}T${horaA}:00`);
    const dataHoraB = new Date(`${b.data}T${horaB}:00`);
    return dataHoraA - dataHoraB;
  });

  reservas.forEach(({ nomeQuadra, data, horario }, index) => {
    const li = document.createElement("li");
    const dataFormatada = new Date(data + "T12:00:00").toLocaleDateString("pt-BR");
    li.textContent = `Quadra: ${nomeQuadra} - Data: ${dataFormatada} - Horário: ${horario}`;

    const btnRemover = document.createElement("button");
    btnRemover.textContent = "Remover";
    btnRemover.style.marginLeft = "10px";
    btnRemover.addEventListener("click", () => {
      reservas.splice(index, 1);
      localStorage.setItem("reservasQuadras", JSON.stringify(reservas));
      carregarReservas();
    });

    li.appendChild(btnRemover);
    ulReservas.appendChild(li);
  });

  listaReservas.style.display = "block";
}

function reservarQuadra(nomeQuadra, idSelectHorario, idInputData, idConfirmacao, idConfirmacaoModal) {
  const selectHorario = document.getElementById(idSelectHorario);
  const inputData = document.getElementById(idInputData);
  if (!selectHorario || !inputData) return false;

  const horarioSelecionado = selectHorario.value;
  const dataSelecionada = inputData.value;

  if (nomeQuadra === "Socyete" && dataSelecionada === "2025-05-31") {
    alert("data indisponível");
    return false;
  }

  if (!dataSelecionada) {
    alert("selecione uma data");
    return false;
  }

  if (!horarioSelecionado) {
    alert("selecione um horário");
    return false;
  }

  const hoje = new Date();
  const dataEscolhida = new Date(dataSelecionada);
  hoje.setHours(0, 0, 0, 0);

  if (dataEscolhida < hoje) {
    alert("Não é possível reservar para datas passadas.");
    return false;
  }

  if (
    nomeQuadra === "Socyete" &&
    dataSelecionada === "2025-05-30" &&
    horarioSelecionado === "13:00 às 14:00"
  ) {
    alert("horário indisponível");
    return false;
  }

  const reserva = {
    nomeQuadra,
    data: dataSelecionada,
    horario: horarioSelecionado
  };

  const salvou = salvarReserva(reserva);
  if (!salvou) return false;

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

function configurarEventos() {
  const btnSocyete = document.getElementById("btnConfirmarSocyete");
  if (btnSocyete) {
    btnSocyete.addEventListener("click", () => {
      const sucesso = reservarQuadra("Socyete", "horarioSocyete", "dataSocyete", "confirmacaoSocyete", "reservaSocyete");
      if (sucesso) alert("quadra reservada com sucesso!");
    });
  }

  const btnBasquete = document.getElementById("btnConfirmarBasquete");
  if (btnBasquete) {
    btnBasquete.addEventListener("click", () => {
      const sucesso = reservarQuadra("Basquete", "horarioBasquete", "dataBasquete", "confirmacaoBasquete", "reservaBasquete");
      if (sucesso) alert("quadra reservada com sucesso!");
    });
  }

  const btnTenis = document.getElementById("btnConfirmarTenis");
  if (btnTenis) {
    btnTenis.addEventListener("click", () => {
      const sucesso = reservarQuadra("Tenis", "horarioTenis", "dataTenis", "confirmacaoTenis", "reservaTenis");
      if (sucesso) alert("quadra reservada com sucesso!");
    });
  }

  const btnVolei = document.getElementById("btnConfirmarVolei");
  if (btnVolei) {
    btnVolei.addEventListener("click", () => {
      const sucesso = reservarQuadra("Volei", "horarioVolei", "dataVolei", "confirmacaoVolei", "reservaVolei");
      if (sucesso) alert("quadra reservada com sucesso!");
    });
  }
}

// NOVO: Confirmação ao tentar fechar o modal
function configurarConfirmacaoFechamentoModal() {
  const modais = document.querySelectorAll(".modal");

  modais.forEach(modal => {
    const conteudoModal = modal.querySelector(".modal-content");
    const botoesFechar = modal.querySelectorAll(".btnFechar");

    // Clique fora do conteúdo
    modal.addEventListener("click", (event) => {
      if (!conteudoModal.contains(event.target)) {
        confirmarFechamento(() => {
          const modalInstance = bootstrap.Modal.getInstance(modal);
          if (modalInstance) {
            modalInstance.hide();
          }
        });
      }
    });

    // Clique no botão X
    botoesFechar.forEach(btn => {
      btn.addEventListener("click", (event) => {
        event.preventDefault();
        confirmarFechamento(() => {
          const bootstrapModal = bootstrap.Modal.getInstance(modal);
          if (bootstrapModal) {
            bootstrapModal.hide();
          } else {
            const modalInstance = bootstrap.Modal.getInstance(modal);
            if (modalInstance) {
              modalInstance.hide();
            }
          }
        });
      });
    });
  });
}

function confirmarFechamento(callbackFechar) {
  const confirmar = confirm("Deseja sair da reserva? Os dados preenchidos serão perdidos.");
  if (confirmar) {
    callbackFechar();
  }
}

function carregarFavoritos() {
  return JSON.parse(localStorage.getItem("quadrasFavoritas")) || [];
}

function salvarFavoritos(favoritos) {
  localStorage.setItem("quadrasFavoritas", JSON.stringify(favoritos));
}

function atualizarEstrelaFavorito(btn, nomeQuadra) {
  const favoritos = carregarFavoritos();
  if (favoritos.includes(nomeQuadra)) {
    btn.textContent = "⭐"; // Preenchido
    btn.classList.add("favoritado");
  } else {
    btn.textContent = "☆"; // Vazio
    btn.classList.remove("favoritado");
  }
}

function configurarEventosFavoritos() {
  const botoesEstrela = document.querySelectorAll(".btnFavorito");

  botoesEstrela.forEach(btn => {
    const nomeQuadra = btn.dataset.quadra;

    // Atualiza estrela ao abrir o modal
    btn.addEventListener("mouseenter", () => {
      atualizarEstrelaFavorito(btn, nomeQuadra);
    });

    // Clica na estrela
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const favoritos = carregarFavoritos();
      const index = favoritos.indexOf(nomeQuadra);

      if (index !== -1) {
        favoritos.splice(index, 1); // remover
      } else {
        favoritos.push(nomeQuadra); // adicionar
      }

      salvarFavoritos(favoritos);
      atualizarEstrelaFavorito(btn, nomeQuadra);
    });

    // Atualiza inicial
    atualizarEstrelaFavorito(btn, nomeQuadra);
  });
}


window.addEventListener("DOMContentLoaded", () => {
  popularHorarios();
  configurarDataMin();
  configurarEventosSaibaMais();
  configurarEventos();
  configurarConfirmacaoFechamentoModal(); // chamada da nova função
  carregarReservas();
  configurarEventosFavoritos();
});
