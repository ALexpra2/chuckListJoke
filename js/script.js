
/*Manejador de click en el botón "Obtener Chiste"
- Una función para obtener un chiste de Chuck Norris desde la API
- Una función para renderizar la lista de chistes en el DOM
- Una función para guardar la lista de chistes en localStorage
- Una función para cargar la lista de chistes desde localStorage*/
//(https://api.chucknorris.io/jokes/random)

        
const apiUrl = ('https://api.chucknorris.io/jokes/random');
console.log(apiUrl);
cargarChistes();
const jokeButton = document.getElementById('fetchJoke');


jokeButton.addEventListener('click', () => {
  obtenerChiste();
});

function obtenerChiste() {
  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error('La solicitud no fue exitosa');
      }
      return response.json();
    })
    .then((data) => {

      incluirchiste(data.value);
      addLocalStorage(data.value);
    })
    .catch((error) => {
      error.innerText = 'Error: no se pudo obtener la broma';
    });
}
//_______________________________________________________________
//Funcionas para cargar los datos al principio

function cargarChistes() {
  const chistes = cargarDesdeLocalStorage();
  chistes.forEach((chiste) => {
    incluirchiste(chiste);
  });
}

    function cargarDesdeLocalStorage() {
        const chistes = localStorage.getItem('chistes');
        return chistes ? JSON.parse(chistes) : [];            
}

//_________________________________________________________________

///Incluyo chistes en Html con DOM

function incluirchiste(chiste) {
  const lista = document.getElementById('jokeList');
  const liChiste = document.createElement('li');
  liChiste.innerHTML = `<p>${chiste}</p>`;
  lista.appendChild(liChiste);
  }


//Incluyo Chistes en localStorage

function addLocalStorage(guardarchiste) {
  const chistes = cargarDesdeLocalStorage();
  chistes.push(guardarchiste);
  localStorage.setItem('chistes', JSON.stringify(chistes));           //Al final de la explicación de Mdn viene un ejemlo de esto y lo incluye con .push y l acalve era usar el JSON.strinfy que decia el readme
  console.log(localStorage);
}

function botonEliminarTodo(){
    const botonLimpiar = document.createElement('button');
    botonLimpiar.className = "limpiar";
    botonLimpiar.textContent = 'Eliminar Chistes';
    jokeButton.after(botonLimpiar);
    
    botonLimpiar.addEventListener('click', (borrarChistes));
    
    function borrarChistes(){
        const chistes = document.getElementById('jokeList');
        chistes.innerHTML = '';
        localStorage.clear();
    }
}
botonEliminarTodo();

//localStorage.clear();     // Con esto se puede sacar el boton general