document.addEventListener("DOMContentLoaded", function () {
    const formNovaInstituicao = document.getElementById("formNovaInstituicao");
    let contador = 1; // Inicialize o contador com 1

    // Adiciona uma nova opção para cada item nos dados
    instituicoesExistentes.forEach(function(imagem) {
        var option = document.createElement('option');
        option.value = imagem.imagem;
        option.text = imagem.nome;
        document.getElementById('imagem').appendChild(option);
    });

    formNovaInstituicao.addEventListener("submit", function (event) {
        event.preventDefault();

        const instituicao = {
            id: contador++, // Use o valor atual do contador e então incremente
            nome: formNovaInstituicao.nome.value,
            descricao: formNovaInstituicao.descricao.value,
            imagem: formNovaInstituicao.imagem.value
        };

        // Obtém os dados existentes de instituições do localStorage ou cria um novo array
        const instituicoes = JSON.parse(localStorage.getItem('instituicoes')) || [];
        instituicoes.push(instituicao);

        // Salva os dados de instituições no localStorage
        localStorage.setItem('instituicoes', JSON.stringify(instituicoes));

        formNovaInstituicao.reset();
        carregarAccordionInstituicoes(); // Atualiza o accordion após adicionar uma nova instituição
    });

    // Ao carregar a página, atualiza o accordion com os dados existentes de instituições
    var instituicoesCadastradas = recuperaInstituicoesCadastradas();      
    var accordionTitulos = [];
    var accordionDescricoes = [];
    var accordionEmails = [];
    var accordionEnderecos = [];
    var accordionImagens = [];
    var accordionTelefones = [];

    instituicoesCadastradas.forEach(function(instituicao) {
        var titulo = instituicao.nome;
        var descricao = instituicao.descricao;
        var email = instituicao.email;
        var endereco = instituicao.endereco;
        var telefone = instituicao.telefone;
        var imagem = instituicao.imagem;
        

        accordionTitulos.push(titulo);
        accordionDescricoes.push(descricao);
        accordionEmails.push(email);
        accordionEnderecos.push(endereco);
        accordionTelefones.push(telefone);
        accordionImagens.push(imagem);
        
    });

    carregarAccordionInstituicoes(); 

    // Função para validar os campos antes do submit
    btnSalvar.addEventListener("click", function (event) {
        event.preventDefault(); 

        // Captura os dados do formulário
        const instituicao = {
            id: contador++, // Use o valor atual do contador e então incremente
            nome: formNovaInstituicao.nome.value,
            descricao: formNovaInstituicao.descricao.value,
            email: formNovaInstituicao.email.value,
            endereco: formNovaInstituicao.endereco.value,
            telefone: formNovaInstituicao.telefone.value,            
            imagem: formNovaInstituicao.imagem.value 
        };

        if(validarDadosInstituicao(instituicao)){
            salvarDadosInstituicao();
        }
        else {
            return false;
        }
    });

    function salvarDadosInstituicao() {
        const instituicao = {
            id: contador++, // Use o valor atual do contador e então incremente
            nome: formNovaInstituicao.nome.value,
            descricao: formNovaInstituicao.descricao.value,
            email: formNovaInstituicao.email.value,
            endereco: formNovaInstituicao.endereco.value,
            telefone: formNovaInstituicao.telefone.value,
            imagem: formNovaInstituicao.imagem.value 
        };

        const instituicoes = JSON.parse(localStorage.getItem('instituicoes')) || [];
        instituicoes.push(instituicao);

        localStorage.setItem('instituicoes', JSON.stringify(instituicoes));
        console.log(instituicoes);

        location.reload(); // Recarrega a página após salvar os dados
    }

    function validarDadosInstituicao(instituicao){
        if(instituicao.nome == "" || instituicao.descricao == "" || instituicao.email == "" || instituicao.endereco == "" || instituicao.telefone == "" || instituicao.imagem == ""){
            alert("Dados inválidos");
            return false;
        }
        else {
            return true;
        }
    }

    function recuperaInstituicoesCadastradas(){
        const instituicoesStorage = JSON.parse(localStorage.getItem('instituicoes')) || [];

        if(instituicoesStorage == undefined || instituicoesStorage.length == 0){
            console.log(instituicoesExistentes);
            instituicoesStorage.push(...instituicoesExistentes);
            localStorage.setItem('instituicoes', JSON.stringify(instituicoesStorage));
        }

        return instituicoesStorage;
    }

    function carregarAccordionInstituicoes() { 
        document.getElementById("accordionInstituicoes").innerHTML = ""; // Limpa o conteúdo do accordion antes de carregar os novos dados
        accordionTitulos.map((e, i) => { 
            criaItemAccordion(e, 
                            accordionDescricoes[i], 
                            accordionEmails[i], 
                            accordionEnderecos[i],     
                            accordionImagens[i],
                            accordionTelefones[i]); 
        }); 
    } 

    function criaItemAccordion(title, desc, email, end, imagem, telefone) { 
        const head = document.createElement("div"); 
        head.classList.add("accordion-header"); 
        head.innerText = title; 

        const des = document.createElement("div"); 
        des.classList.add("accordion-content"); 

        const p = document.createElement("p"); 
        p.innerText = desc; 
        des.appendChild(p); 

        const emailP = document.createElement("p");
        emailP.innerText = email;
        des.appendChild(emailP);

        const enderecoP = document.createElement("p");
        enderecoP.innerText = end;
        des.appendChild(enderecoP);

        const pTelefone = document.createElement("p"); 
        pTelefone.innerText = `Telefone: ${telefone}`; 
        des.appendChild(pTelefone); 

        const img = document.createElement("img"); 
        img.src = imagem; 
        img.alt = title;
        des.appendChild(img); 

        const item = document.createElement("div"); 
        head.classList.add("accordion-item"); 

        head.addEventListener("click", () => { 
            des.classList.toggle("active"); 
            if (des.style.display === "block") { 
                des.style.display = "none"; 
            } else { 
                des.style.display = "block"; 
            } 
        }); 

        item.appendChild(head); 
        item.appendChild(des); 
        document.getElementById("accordionInstituicoes").appendChild(item); 
    }

    function encontrarInstituicaoPorNome(nome) {
        const instituicoes = JSON.parse(localStorage.getItem('instituicoes')) || [];
        return instituicoes.find(function (instituicao) {
            return instituicao.nome === nome;
        });
    }

    function excluirinstituicao(index) {
        const instituicoes = JSON.parse(localStorage.getItem('instituicoes')) || [];
        instituicoes.splice(index, 1);
        localStorage.setItem('instituicoes', JSON.stringify(instituicoes));
    }
});
