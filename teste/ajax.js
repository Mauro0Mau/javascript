var btn1 = document.getElementById("botaoTeste");

var btn2 = document.getElementById("teste");

var btn3 = document.getElementById("test");

btn1.addEventListener("click", function() {
  var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("demo").innerHTML =
            "<p>"+this.responseText+"</p>";
        }
    };
    xhttp.open("GET", "ajax_info.txt", true);
    xhttp.send(); 
});

btn2.addEventListener("click", function() {
  var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function() {
      if (ajax.readyState == 4 && ajax.status == 200) {

        //document.getElementById("demo").innerHTML = ajax.responseText;
        
        var resposta = JSON.parse(ajax.responseText);

        document.getElementById("demo").innerHTML = "<ul>";
        
        for(let produto of resposta){

          document.getElementById("demo").innerHTML += "<li>"+produto.codigo+"</li>";
          document.getElementById("demo").innerHTML += "<li>"+produto.produto+"</li>";
          document.getElementById("demo").innerHTML += "<li>R$"+produto.valor+"</li><br>";

        }

        document.getElementById("demo").innerHTML += "</ul>";

      }
    };
    ajax.open("GET", "ajax.php", true);
    ajax.responseType = "text";
    ajax.send(); 
});

btn3.addEventListener("click", function() {

  var cod = document.getElementById("codigo").value;

  let produto = {
    codigo: cod
  }

    const xhr = new XMLHttpRequest();

    xhr.open('POST', 'teste.php', true);
    xhr.setRequestHeader("Content-type", "application/json");

    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        
        var resposta = JSON.parse(xhr.responseText);

        document.getElementById("demo").innerHTML = "<ul>";
        
          document.getElementById("demo").innerHTML += "<li>"+resposta.codigo+"</li>";
          document.getElementById("demo").innerHTML += "<li>"+resposta.produto+"</li>";
          document.getElementById("demo").innerHTML += "<li>R$"+resposta.valor+"</li>";

        document.getElementById("demo").innerHTML += "</ul>";

      }
    };

    xhr.send(JSON.stringify(produto)); 
});

/***** Utilização da Fetch API com GET sem parâmetros automaticos *****/

const getData = async () => {

  const url = document.querySelector(['#url']),
  container = document.querySelector('#demo'),
  select = document.querySelector('#method'),
  method = select.value

  if(url.value) {

    container.innerHTML = await fetch(url.value, { method: method })
      .then(res => res.text())
      .catch(error => error)
      

  } else {

    container.innerHTML = 'Please enter a url for request data'

  }

}

/********* Utilização da Fetch API com GET com parâmetros e API Externa ViaCep *********/

const cep = document.querySelector("#cep");

const showData = (result)=>{

  for(const campo in result){

    if(document.querySelector("#"+campo)){

      document.querySelector("#"+campo).value = result[campo];

    }
  }
}

cep.addEventListener("blur",(e)=>{

  let search = cep.value.replace("-","");

  if(search == ""){
    alert("Digite um CEP válido!");
  }else{

    const options = {

      method: 'GET',
      mode: 'cors',
      cache: 'default'

    }

    fetch(`https://viacep.com.br/ws/${search}/json/`, options)
      .then(response => { response.json()
        .then( data => showData(data) )
      
      })
      .catch( e => console.log('Error Message: ' + e.message))
  }
});
/***** Utilização da Fetch API com POST *****/

var showBox = document.getElementById("fetchPOST");

showBox.addEventListener("click", function(){

let produto = {
  codigo: 1
}

fetch("teste.php", {

  method: "POST",
  headers: {

    'Content-type': 'application/json',

  },
  body: JSON.stringify(produto),

}).then((resposta)=> resposta.json())
    .then((data)=> showProduct(data));

});

const showProduct = (result)=>{

  document.getElementById("demo").innerHTML = "<ul>";
        
    document.getElementById("demo").innerHTML += "<li>"+result.codigo+"</li>";
    document.getElementById("demo").innerHTML += "<li>"+result.produto+"</li>";
    document.getElementById("demo").innerHTML += "<li>R$"+result.valor+"</li>";

  document.getElementById("demo").innerHTML += "</ul>";
  
}

/***** Utilização da Fetch API com POST e API Externa Regress*****/

var showBox = document.getElementById("fetchPostApi");
var respostaAPI = document.querySelector("#demo");

showBox.addEventListener("click", function(){

/*fetch("https://reqres.in/api/users", {

  method: "POST",
  mode: 'cors',
  cache: 'default',
  headers: {

    "Content-type": "application/json",

  },
  body: JSON.stringify({ name: "Lucas" }),*/

  fetch("https://reqres.in/api/users?page=2", {

  method: "GET",
  mode: 'cors',
  cache: 'default',
  headers: {

    "Content-type": "application/json",

  }

/*}).then((resposta)=> resposta.json())
   .then((data)=> respostaAPI.innerHTML = "<h1>"+JSON.stringify(data)+"</h1>");

});*/

}).then((resposta)=> resposta.json())
    .then((data)=> showNames(data));

});

const showNames = (result)=>{

  respostaAPI.innerHTML = JSON.stringify(result);

  //respostaAPI.innerHTML = "<ul>";
    
    /*for(let pessoa in result.data[0]){

      respostaAPI.innerHTML += "<li>"+JSON.stringify(pessoa.id)+"</li>";
      respostaAPI.innerHTML += "<li>"+JSON.stringify(pessoa.first_name)+"</li>";
      respostaAPI.innerHTML += "<li>"+JSON.stringify(pessoa.email)+"</li>";

    }

  respostaAPI.innerHTML += "</ul>";*/
  
}