function uuidv4() {
    return 'Dxxxx'.replace(/[x]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function preencherSelect(chaveLocalStorage, elementoSelect) {
  // Recupera os dados da LocalStorage
  var dadosLocalStorage = localStorage.getItem(chaveLocalStorage);
    console.log(dadosLocalStorage);

  // Verifica se existem dados
  if (dadosLocalStorage) {
      var dados = JSON.parse(dadosLocalStorage);

      // Preenche o select
      for (var i = 0; i < dados.length; i++) {
          var option = document.createElement("option");
          option.value = dados[i].nome;
          option.text = dados[i].nome;
          elementoSelect.appendChild(option);
      }
  }
  }

document.addEventListener("DOMContentLoaded", function () {
    const formDoacoes = document.getElementById("formDoacoes");

    var selectInstituicoes = document.getElementById("instReceptora");
    var selectAlimentos = document.getElementById("alimento");
  
    preencherSelect("instituicoes", selectInstituicoes);
    preencherSelect("alimentos", selectAlimentos);
 

    formDoacoes.addEventListener("submit", function (event) {
        event.preventDefault();

        const doacao = {
            idDoacao: uuidv4(), // Aqui estamos utilizando a função uuidv4() para gerar um UUID v4
            nomeDoador: formDoacoes.nomeDoador.value,
            enderecoDoador: formDoacoes.enderecoDoador.value,
            emailDoador: formDoacoes.emailDoador.value,
            telefoneDoador: formDoacoes.telefoneDoador.value,
            instReceptora: formDoacoes.instReceptora.value,
            alimento: formDoacoes.alimento.value,
            validade: formDoacoes.validade.value,
            quantidade: formDoacoes.quantidade.value
        };

        const doacoes = JSON.parse(localStorage.getItem('doacoes')) || [];
        doacoes.push(doacao);
        localStorage.setItem('doacoes', JSON.stringify(doacoes));

        formDoacoes.reset();
        atualizarTabela(doacoes);
    });

    function atualizarTabela(doacoes) {
        const tabela = document.getElementById('tabela').getElementsByTagName('tbody')[0];
        tabela.innerHTML = '';

        doacoes.forEach(function (doacao, index) {
            const novaLinha = tabela.insertRow();

            novaLinha.insertCell().textContent = doacao.idDoacao;
            novaLinha.insertCell().textContent = doacao.nomeDoador;
            novaLinha.insertCell().textContent = doacao.enderecoDoador;
            novaLinha.insertCell().textContent = doacao.emailDoador;
            novaLinha.insertCell().textContent = doacao.telefoneDoador;
            novaLinha.insertCell().textContent = doacao.instReceptora;
            novaLinha.insertCell().textContent = doacao.alimento;
            novaLinha.insertCell().textContent = doacao.validade;
            novaLinha.insertCell().textContent = doacao.quantidade;

            const cellExcluir = novaLinha.insertCell();
            const btnExcluir = document.createElement('button');
            btnExcluir.textContent = 'Excluir';
            btnExcluir.classList.add('btn', 'btn-sm', 'btn-outline-dark');

            btnExcluir.addEventListener('click', function () {
                excluirDoacao(index);
            });
            cellExcluir.appendChild(btnExcluir);
        });
    }

    function excluirDoacao(index) {
        const doacoes = JSON.parse(localStorage.getItem('doacoes')) || [];
        doacoes.splice(index, 1);
        localStorage.setItem('doacoes', JSON.stringify(doacoes));
        atualizarTabela(doacoes);
    }
 
  
    atualizarTabela(JSON.parse(localStorage.getItem('doacoes')) || []);
});
