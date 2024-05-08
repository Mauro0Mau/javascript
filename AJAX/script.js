// Função para fazer a requisição AJAX
function carregarNomes() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'nomes_jojo.txt', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var nomes = xhr.responseText.split(',');
                var lista = document.getElementById('nomes-lista');
                nomes.forEach(function (nome) {
                    var li = document.createElement('li');
                    li.textContent = nome.trim();
                    lista.appendChild(li);
                });
            } else {
                console.error('Erro ao carregar nomes:', xhr.status);
            }
        }
    };
    xhr.send();
}