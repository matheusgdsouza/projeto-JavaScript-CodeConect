// Seleção dos elementos do DOM 

const uploadBtn = document.querySelector('.botao-carregar-imagem');
const uploadInput = document.querySelector('#input-imagem');

// Evento de clique para abrir o seletor de arquivos
uploadBtn.addEventListener('click', function() {
    uploadInput.click();
});

// Função para ler o conteúdo do arquivo selecionado
function lerConteudoDoArquivo(arquivo) {
    return new Promise((resolve, reject) => {
        const leitor = new FileReader();

        leitor.onload = () => {
            resolve({url: leitor.result, nome: arquivo.name});
        };

        leitor.onerror = () => {
            reject(`Houve um erro ao ler o arquivo: ${arquivo.name}`);
        };

        leitor.readAsDataURL(arquivo);
    })
}

// Manipulação do DOM para exibir a imagem selecionada e o nome do arquivo
const imagemExemplo = document.querySelector('.img-card-principal');
const listaImagemSelecionada = document.querySelector('.lista-imagens');

uploadInput.addEventListener('change', async (event) => {
    const arquivos = event.target.files[0]; 
    if (arquivos) { 
        try {
            const conteudoDoArquivo = await lerConteudoDoArquivo(arquivos);
            imagemExemplo.src = conteudoDoArquivo.url;
            listaImagemSelecionada.innerHTML = `<li>${conteudoDoArquivo.nome}</li>`;
        } catch (erro) {
            console.error(erro);
        }
    }
})

// Manipulação do DOM para adicionar tags ao projeto
const inputTags = document.getElementById('input-tags-projeto');
const listaTags = document.querySelector('.lista-tags-projeto');

inputTags.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        const tag = inputTags.value.trim();
        if (tag) {
            listaTags.innerHTML += `<li>${tag}<img src="img/close-black.svg" alt="Ícone de fechar" class="close-icon"></li>`;
            inputTags.value = '';
        }
    }

}) 

// Evento de clique para remover tags
listaTags.addEventListener('click', (event) => {
    if (event.target.classList.contains('close-icon')) {
        event.target.parentElement.remove();
    }
});