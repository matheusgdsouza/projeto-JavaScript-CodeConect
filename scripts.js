const uploadBtn = document.querySelector('.botao-carregar-imagem');
const uploadInput = document.querySelector('#input-imagem');

uploadBtn.addEventListener('click', function() {
    uploadInput.click();
});

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
