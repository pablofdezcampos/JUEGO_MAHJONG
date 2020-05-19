let puntuaciones = document.getElementById('puntuaciones');
let score = new ScoresController();
let nivelEscogido;
score.cargarPuntuaciones();
puntuaciones.addEventListener('click', function(){
    score.pintarPuntuaciones();
})

let sections = document.getElementsByTagName('section');
for (let index = 0; index < sections.length; index++) {
const section = sections[index];
section.style.display = 'none';
}

let cambio = (nombreventana)=>{
console.log(nombreventana);
for (let index = 0; index < sections.length; index++) {
   const section = sections[index];
   if (section.id==nombreventana+'section'){
       section.style.display = 'block';
   }else{
       section.style.display = 'none';
   }
}
}
let tablero;
let opciones = document.getElementsByClassName('menuButton');
for (let index = 0; index < opciones.length; index++) {
const opcion = opciones[index];
opcion.addEventListener('click', function(){

    if (opcion.id == 'jugar1'){
        if (tablero) {
            tablero.borrarIntervalo();
        }
        nivelEscogido = 'basico';
        let container = document.getElementById('jugar1section');
        tablero = new GameboardController(3, container);
        tablero.generarTablero();
        console.log('test');
        document.getElementById('jugar2section').innerHTML = '';
        document.getElementById('jugar3section').innerHTML = '';
    }
    if (opcion.id == 'jugar2'){
        if (tablero) {
            tablero.borrarIntervalo();
        }
        nivelEscogido = 'medio';
        let container = document.getElementById('jugar2section');
        tablero = new GameboardController(4, container);
        tablero.generarTablero();
        console.log('test');
        document.getElementById('jugar1section').innerHTML = '';
        document.getElementById('jugar3section').innerHTML = '';
    }
    if (opcion.id == 'jugar3'){
        if (tablero) {
            tablero.borrarIntervalo();
        }
        nivelEscogido = 'avanzado';
        let container = document.getElementById('jugar3section');
        tablero = new GameboardController(6, container);
        tablero.generarTablero();
        console.log('test');
        document.getElementById('jugar1section').innerHTML = '';
        document.getElementById('jugar2section').innerHTML = '';
    }

    document.getElementById('submenu').classList.add('hide');

   cambio(opcion.id)});
}