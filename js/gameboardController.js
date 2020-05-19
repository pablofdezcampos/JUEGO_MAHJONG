class GameboardController{


    cartas = ['./img/buho.png', './img/cerdo.png', './img/conejo.png', './img/elefante.png', './img/gato.png', './img/lince.png', './img/loro.png', './img/mono.png', './img/panda.png', './img/pardo.png', './img/perro.png', './img/pez.png', './img/rana.png', './img/raton.png', './img/rinoceronte.png', './img/serpiente.png', './img/vaca.png', './img/zorro.png'];
    tablero = [[],[],[],[],[],[]];
    abiertas = 0;
    carta1 = [];
    carta2 = [];
    crono = 0;
    comenzado = false;
    intervalo;
    parejas;
    puntos = 0;
    cartasAbiertas = [];
    acierto;
    error;
    musica;
    victoria;
    seccionTablero;
    constructor(size, htmlContainer){
        this.size = size;
        this.htmlContainer = htmlContainer;
        this.parejas = parseInt(this.size*this.size/2);
        this.acierto = document.getElementById('acierto');
        this.error = document.getElementById('error');
        this.musica = document.getElementById('musica');
        this.musica.loop = true;
        this.victoria = document.getElementById('victoria');
    }

    pararMusica(){
        this.musica.pause();
        this.musica.currentTime = 0;
    }

    generarTablero() {
        for (let index = 0; index < this.parejas; index++) {
            const element = this.cartas[index];
    
            for (let index = 0; index < 2; index++) {
                let x, y;
                do {
                    x = this.randomInteger(0, this.size-1);
                    y = this.randomInteger(0, this.size-1);
                    
                } while (this.checkExistingCard(x, y));
    
                this.insertCard(x, y, element);
            }
        }
        this.pintarTablero(this.htmlContainer);
    }
    
    randomInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
    
    insertCard(x, y, card) {
        this.tablero[x][y] = card;
    }
    
    checkExistingCard(x, y) {
        return this.tablero[x][y] != null;
    }
    pintarTablero2(htmlContainer) {
        let table = '';
    
        for (let i = 0; i < this.tablero.length; i++) {
            table = table+'<tr>';
            for (let j = 0; j < this.tablero.length; j++) {
                const element = this.tablero[i][j];
                if (element) table = table+'<th>' + '<img src="'+ element + '">' + '</th>';
                
            }
            table = table+'</tr>';
        }
        console.log('<table>'+ table + '</table>');
        htmlContainer.innerHTML = '<table>'+ table + '</table>';
        
    }
    

    guardarDatos(){
        let nombre = document.getElementById('nickname').value;
        let puntos = parseInt(document.getElementById('puntos').innerHTML);
        let tiempo = parseInt(document.getElementById('tiempo').innerHTML);
        score.cargarActual(nombre, puntos, tiempo);
        score.guardarPuntuacion(nivelEscogido);
        score.salvarPuntuaciones();
        document.getElementById(this.seccionTablero).style.display = 'none';
        document.getElementById('puntuacionessection').style.display = 'block';
        score.pintarPuntuaciones();
    }

    comprobarIguales(){
        if (this.tablero[this.carta1[1]][this.carta1[2]]==this.tablero[this.carta2[1]][this.carta2[2]] && !(this.carta1[1] == this.carta2[1] && this.carta1[2] == this.carta2[2])) {
            this.carta1[0].remove();
            this.carta2[0].remove();
            this.parejas--;
            this.puntos += 6;
            this.acierto.play();
        }else{
            //this.carta1[0].src="img/carta.jpg";
            //this.carta2[0].src="img/carta.jpg";
            this.puntos -= 1;
            this.error.play();
            for (let index = 0; index < this.cartasAbiertas.length; index++) {
                this.cartasAbiertas[index].src="img/carta.jpg";
                
            }

            this.cartasAbiertas = [];

        }

        document.getElementById('puntos').innerHTML= this.puntos;

        if (!this.parejas) {
            clearInterval(this.intervalo);
            this.intervalo = 0;
            this.pararMusica();
            this.pintarResultado();
            this.victoria.play();
            //this.guardarDatos();
        }
    }


    comenzarTiempo(){
        var tiempo = document.getElementById('tiempo');
        var numero = parseInt(tiempo.innerHTML)+1;
        document.getElementById('tiempo').innerHTML= numero;
    }

    voltearCarta(e,x,y){
        if (!this.comenzado) {
            
            this.intervalo = setInterval(this.comenzarTiempo,1000);

            this.comenzado= true;
        }

        if (this.abiertas==0) {
            this.carta1 = [e,x,y];
            this.abiertas++;
            e.src= tablero.tablero[x][y];

            this.cartasAbiertas.push(e);

            console.log('abiertas0');

        }else if (this.abiertas==1){
            
            
            if (!(this.carta1[1] == x && this.carta1[2] == y) ) {

            
                this.abiertas++;
                e.src= tablero.tablero[x][y];
                this.carta2 = [e,x,y];

                this.cartasAbiertas.push(e);
                

                setTimeout('tablero.comprobarIguales()',300);
                this.abiertas = 0;
                
            }
            

            console.log('abiertas1');

        }
            console.log(this.abiertas);
    }
    
    pintarTablero(htmlContainer) {
        this.musica.currentTime = 0;
        let table = '';
        this.seccionTablero = htmlContainer.id;
    
        for (let i = 0; i < this.tablero.length; i++) {
            table = table+'<tr>';
            for (let j = 0; j < this.tablero.length; j++) {
                const element = this.tablero[i][j];
                if (element) table = table+'<th>' + '<img class="carta" src="'+ 'img/carta.jpg' + '"onclick="tablero.voltearCarta(this,'+i+','+j+')">' + '</th>';
                
            }
            table = table+'</tr>';
        }
        console.log('<table>'+ table + '</table>');
        htmlContainer.innerHTML = "<h1><table><td>PUNTOS: </td><td><span id='puntos'>0</span></td><td>TIEMPO: </td><td><span id='tiempo'>0</span></td></table></h1>";
        htmlContainer.innerHTML += '<table id="resultados">'+ table + '</table>';
        this.musica.play();
    }
    

    borrarIntervalo(){
        clearInterval(this.intervalo);
    };



    pintarResultado(){
        let resultados = document.getElementById('resultados');
        resultados.innerHTML = '';
        resultados.innerHTML += '<tr><h2>ENHORABUENA</h2></tr>';
        resultados.innerHTML += '<tr><h3>HAS SUPERADO EL NIVEL</h3></tr>';
        resultados.innerHTML += '<tr><label for="nickname">INTRODUCE TU NICKNAME</label></tr>';
        resultados.innerHTML += '<tr><input type="text" id="nickname" name="nickname" default="player1"/></tr>';
        resultados.innerHTML += '<tr><button onclick="tablero.guardarDatos()">OK</button></tr>'
    }

    }