class GameboardController{


    cartas = ['./img/buho.png', './img/cerdo.png', './img/conejo.png', './img/elefante.png', './img/gato.png', './img/lince.png', './img/loro.png', './img/mono.png', './img/panda.png', './img/pardo.png', './img/perro.png', './img/pez.png', './img/rana.png', './img/raton.png', './img/rinoceronte.png', './img/serpiente.png', './img/vaca.png', './img/zorro.png'];
    tablero = [[],[],[],[],[],[]];
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
    
    voltearCarta(e,x,y){
        e.src= tablero.tablero[x][y];
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
        htmlContainer.innerHTML = '<table>'+ table + '</table>';
    }
    
    }