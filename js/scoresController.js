class ScoresController{



    basico = [];
    medio = [];
    avanzado = [];
    actual = [];

    /*basico = [['david', 15, 12], ['samuel', 10, 5], ['pedro', 10, 10], ['raul', -2, 25]];
    medio = [['david', 15, 12], ['samuel', 10, 5], ['pedro', 10, 10], ['raul', -2, 25]];
    avanzado = [['david', 15, 12], ['samuel', 10, 5], ['pedro', 10, 10], ['raul', -2, 25]];
    actual = ['martin', 10, 10];*/

    obtenerCadena(vector){
        let cadena = vector[0] + ":" + vector[1] + ":" + vector[2] + ";";
        return cadena;
    }

    generaVector(cadena){
        let vectorElementos = cadena.split(';');
        let vectorAuxiliar = [];

        for (let i = 0; i < vectorElementos.length; i++) {
            const element = vectorElementos[i].split(':');
            vectorAuxiliar.push(element);
        }
        return vectorAuxiliar;
    }

    cargarActual(nombre, puntos, tiempo){
        this.actual = [nombre, puntos, tiempo];
    }


    guardarPuntuacion(nivel){
        let puntuacionActual = this.obtenerCadena(this.actual);
        let vectorAuxiliar = [];
        let vectorActual = [];
        let insertado = false;

        switch (nivel) {
            case 'basico': vectorActual = this.basico; break;
            case 'medio': vectorActual = this.medio; break;
            case 'avanzado': vectorActual = this.avanzado; break;
        }

        if (vectorActual.length == 0) {
            vectorActual.push(puntuacionActual);

        } else {

            for (let index = 0; index < vectorActual.length; index++) {
                if (this.actual[1] < vectorActual[index][1]) {
                    vectorAuxiliar.push(vectorActual[index]);
                } else {
                    if (this.actual[1] == vectorActual[index][1] && this.actual[2] >= vectorActual[index][2]) { 
                        vectorAuxiliar.push(vectorActual[index]);
                    } else if (!insertado){
                        vectorAuxiliar.push(this.actual);
                        vectorAuxiliar.push(vectorActual[index]);
                        insertado = true;
                    } else {
                        vectorAuxiliar.push(vectorActual[index]);
                    }
                }  
            }
            
        }
        if (!insertado) {
            vectorAuxiliar.push(this.actual);
        }
        switch (nivel) {
            case 'basico': this.basico = vectorAuxiliar; break;
            case 'medio': this.medio = vectorAuxiliar; break;
            case 'avanzado': this.avanzado = vectorAuxiliar; break;
        }
    }

    borrarPuntuaciones(){
        this.basico = [];
        this.medio = [];
        this.avanzado = [];
        this.actual = [];
        this.salvarPuntuaciones();
        this.cargarPuntuaciones();
    }

    cargarPuntuaciones(){
        let niveles = ['basico', 'medio', 'avanzado'];
        for (let i = 0; i < niveles.length; i++) {
            const element = niveles[i];
            let refVectorNivel;
            let localscore = '';
            let datos = '';
            datos = localStorage.getItem(niveles[i])? localStorage.getItem(niveles[i]) : '';
            if (datos!='') {
                refVectorNivel = this.generaVector(datos);

                switch (niveles[i]) {
                    case 'basico': this.basico = refVectorNivel; break;
                    case 'medio': this.medio = refVectorNivel; break;
                    case 'avanzado': this.avanzado = refVectorNivel; break;
                }
            }
        }
    }

    salvarPuntuaciones(){
        let niveles = ['basico', 'medio', 'avanzado'];
        for (let i = 0; i < niveles.length; i++) {
            const element = niveles[i];
            let refVectorNivel;
            let localscore = '';
            switch (niveles[i]) {
                case 'basico': refVectorNivel = this.basico; break;
                case 'medio': refVectorNivel = this.medio; break;
                case 'avanzado': refVectorNivel = this.avanzado; break;
            }
            for (let j = 0; j < refVectorNivel.length; j++) {
                const element = refVectorNivel[j];
                localscore += this.obtenerCadena(element);
            }
            localscore = localscore.substr(0, localscore.length - 1);
            switch (niveles[i]) {
                case 'basico': localStorage.setItem('basico', localscore); break;
                case 'medio': localStorage.setItem('medio', localscore); break;
                case 'avanzado': localStorage.setItem('avanzado', localscore); break;
            }
        }
    }

    pintarPuntuaciones(){

        let seccion = document.getElementById('puntuacionessection');
        let codigo = '';
        let niveles = ['basico', 'medio', 'avanzado'];

        for (let i = 0; i < niveles.length; i++) {
            
            let refVectorNivel;
            switch (niveles[i]) {
                case 'basico': refVectorNivel = this.basico; break;
                case 'medio': refVectorNivel = this.medio; break;
                case 'avanzado': refVectorNivel = this.avanzado; break;
            }
            codigo += '<table id="'+niveles[i]+'">';
            codigo += '<tr><td colspan = "3">NIVEL ' + niveles[i].toUpperCase() + '</td></tr>';
            codigo += '<tr>';
            codigo += '<th>NOMBRE</th>';
            codigo += '<th>PUNTOS</th>';
            codigo += '<th>TIEMPO</th>';
            codigo += '</tr>';

            for (let j = 0; j < refVectorNivel.length; j++){
                codigo += '<tr>';
                codigo += '<td>'+ refVectorNivel[j][0] +'</td>';
                codigo += '<td>'+ refVectorNivel[j][1] +'</td>';
                codigo += '<td>'+ refVectorNivel[j][2] +'</td>';
                codigo += '</tr>';
            }
            
            codigo += '</table>';
            codigo += '<br/><br/>';
        }
        seccion.innerHTML = codigo;
    }


}