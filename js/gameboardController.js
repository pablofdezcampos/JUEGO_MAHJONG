class GameboardController{


    cartas = ['./img/buho.png', './img/cerdo.png', './img/conejo.png', './img/elefante.png', './img/gato.png', './img/lince.png', './img/loro.png', './img/mono.png', './img/panda.png', './img/pardo.png', './img/perro.png', './img/pez.png', './img/rana.png', './img/raton.png', './img/rinoceronte.png', './img/serpiente.png', './img/vaca.png', './img/zorro.png'];
    tablero = [[],[],[],[],[],[]];
    abiertas = 0;
    carta1 = [];
    carta2 = [];
    crono = 0;
    comenzado = false;
    intervalo;
    constructor(size, htmlContainer){
        this.size = size;
        this.htmlContainer = htmlContainer;
    }

    generarTablero() {
        for (let index = 0; index < parseInt(this.size*this.size/2); index++) {
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
    

    comprobarIguales(){
        if (this.tablero[this.carta1[1]][this.carta1[2]]==this.tablero[this.carta2[1]][this.carta2[2]]) {
            this.carta1[0].remove();
            this.carta2[0].remove();
        }else{
            this.carta1[0].src="img/carta.jpg";
            this.carta2[0].src="img/carta.jpg";
        }
    }


    comenzarTiempo(tiempo){
        var tiempo = document.getElementById('tiempo');
        var numero = parseInt(tiempo.innerHTML)+1;
        document.getElementById('tiempo').innerHTML= numero;
    }

    voltearCarta(e,x,y){
        if (!this.comenzado) {
            
            this.intervalo = setInterval(this.comenzarTiempo,1000, this.crono);

            this.comenzado= true;
        }
        e.src= tablero.tablero[x][y];

        if (this.abiertas==0) {
            this.carta1 = [e,x,y];
            this.abiertas++;

            console.log('abiertas0');

        }else if (this.abiertas==1){
            this.carta2 = [e,x,y];
            this.abiertas++;

            setTimeout('tablero.comprobarIguales()',300);
            this.abiertas = 0;
            

            console.log('abiertas1');

        }
    }
    
    pintarTablero(htmlContainer) {
        let table = '';
    
        for (let i = 0; i < this.tablero.length; i++) {
            table = table+'<tr>';
            for (let j = 0; j < this.tablero.length; j++) {
                const element = this.tablero[i][j];
                if (element) table = table+'<th>' + '<img src="'+ 'img/carta.jpg' + '"onclick="tablero.voltearCarta(this,'+i+','+j+')">' + '</th>';
                
            }
            table = table+'</tr>';
        }
        console.log('<table>'+ table + '</table>');
        htmlContainer.innerHTML = "<h1><table><td>PUNTOS: </td><td><span id='puntos'>1000</span></td><td>TIEMPO: </td><td><span id='tiempo'>0</span></td></table></h1>";
        htmlContainer.innerHTML += '<table>'+ table + '</table>';
    }
    
    }