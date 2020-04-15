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

let opciones = document.getElementsByClassName('menuButton');
for (let index = 0; index < opciones.length; index++) {
const opcion = opciones[index];
opcion.addEventListener('click', function(){

    if (opcion.id == 'jugar1'){
        let container = document.getElementById('jugar1section');
        let tablero = new GameboardController(2, container);
        tablero.generarTablero();
        console.log('test');
    }
    if (opcion.id == 'jugar2'){
        let container = document.getElementById('jugar2section');
        let tablero = new GameboardController(4, container);
        tablero.generarTablero();
        console.log('test');
    }
    if (opcion.id == 'jugar3'){
        let container = document.getElementById('jugar3section');
        let tablero = new GameboardController(6, container);
        tablero.generarTablero();
        console.log('test');
    }
   cambio(opcion.id)});
}


console.log(sections);