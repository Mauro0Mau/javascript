// Função para carregar o arquivo de texto usando AJAX
function carregarNomes() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var nomesString = xhr.responseText;
                exibirNomes(nomesString);
            } else {
                console.error('Erro ao carregar o arquivo de nomes.');
            }
        }
    };
    xhr.open('GET', 'nomes.txt', true);
    xhr.send();
}

// Função para exibir os nomes em uma lista
function exibirNomes(nomesString) {
    var nomes = nomesString.split('\n'); // Dividindo a string em um array de nomes

    var listaHTML = '';
    nomes.forEach(function(nome) {
        listaHTML += '<li>' + nome + '</li>';
    });

    var nomesLista = document.getElementById('nomes-lista');
    nomesLista.innerHTML = listaHTML;
}

// Carregar os nomes ao carregar a página
window.onload = function() {
    carregarNomes();
}; 