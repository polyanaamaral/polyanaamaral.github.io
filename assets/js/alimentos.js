function uuidv4() {
    return 'Dxxxx'.replace(/[x]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const formAlimento = document.getElementById("formAlimento");

    imagens.forEach(function(imagem) {
        var option = document.createElement('option');
        option.value = imagem.caminho;
        option.text = imagem.nome;
        document.getElementById('imagem').appendChild(option);
    });

    formAlimento.addEventListener("submit", function (event) {
        event.preventDefault();

        const alimento = {
            id: uuidv4(), // Usando uuid para gerar ID único
            nome: formAlimento.nome.value,
            descricao: formAlimento.description.value,
            imagem: formAlimento.imagem.value
        };

      // Obtém os dados existentes de alimentos do localStorage ou cria um novo array
        const alimentos = JSON.parse(localStorage.getItem('alimentos')) || [];
        alimentos.push(alimento);
      
      // Salva os dados de alimentos no localStorage
        localStorage.setItem('alimentos', JSON.stringify(alimentos));

        formAlimento.reset();
        atualizarTabela(alimentos);
    });

    function atualizarTabela(alimentos) {
        const tabela = document.getElementById('tabela').getElementsByTagName('tbody')[0];
        tabela.innerHTML = '';

        alimentos.forEach(function (alimento, index) {
            const novaLinha = tabela.insertRow();

            novaLinha.insertCell().textContent = alimento.id;
            novaLinha.insertCell().textContent = alimento.nome;
            novaLinha.insertCell().textContent = alimento.descricao;

            const img = document.createElement('img');
            img.src = alimento.imagem;
            img.style.maxWidth = '100px';
            const cellImagem = novaLinha.insertCell();
            cellImagem.appendChild(img);

            const cellExcluir = novaLinha.insertCell();
            const btnExcluir = document.createElement('button');
            btnExcluir.textContent = 'Excluir';
            btnExcluir.classList.add('btn', 'btn-sm', 'btn-outline-dark');

            btnExcluir.addEventListener('click', function () {
                excluirAlimento(index);
            });
            cellExcluir.appendChild(btnExcluir);
        });
    }

    function excluirAlimento(index) {
        const alimentos = JSON.parse(localStorage.getItem('alimentos')) || [];
        alimentos.splice(index, 1);
        localStorage.setItem('alimentos', JSON.stringify(alimentos));
        atualizarTabela(alimentos);
    }
  
   // Ao carregar a página, atualiza a tabela com os dados de alimentos existentes
    atualizarTabela(JSON.parse(localStorage.getItem('alimentos')) || []);
});
