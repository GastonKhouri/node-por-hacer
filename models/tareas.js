const Tarea = require('./tarea');

class Tareas {

    _listado = {};

    constructor() {
        this._listado = {};
    }

    get listadoArr() {
        const listado = [];

        Object.keys(this._listado).forEach(key => listado.push(this._listado[key]));

        return listado;
    }

    cargarTareasFromArray(tareas = []) {

        tareas.forEach(tarea => this._listado[tarea.id] = tarea);

    }

    crearTarea(desc = '') {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto() {

        console.log();
        this.listadoArr.forEach((tarea, i) => {

            const idx = `${i + 1}.`.green;
            const { desc, completadoEn } = tarea;
            const estado = (completadoEn) ? 'Completada'.green : 'Pendiente'.red;

            console.log(`${idx} ${desc} :: ${estado}`)
        });

    }

    listarPendientesCompletadas(completadas = true) {

        let cont = 0;

        console.log();
        this.listadoArr.forEach(tarea => {

            const { desc, completadoEn } = tarea;
            const estado = (completadoEn) ? 'Completada'.green : 'Pendiente'.red;

            if (completadas && completadoEn) {
                cont++;
                console.log(`${(cont + '.').green} ${desc} :: ${completadoEn.green}`)
            } else if (!completadas && !completadoEn) {
                cont++;
                console.log(`${(cont + '.').green} ${desc} :: ${estado}`)
            }

        });

    }

    borrarTarea(id = '') {

        if (this._listado[id]) {
            delete this._listado[id];
        }

    }

    toggleCompletadas(ids = []) {

        ids.forEach(id => {

            const tarea = this._listado[id];
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString();
            }

        });

        this.listadoArr.forEach(tarea => {

            if (!ids.includes(tarea.id)) {
                this._listado[tarea.id].completadoEn = null;;
            }

        });

    }

}

module.exports = Tareas;