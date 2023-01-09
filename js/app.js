// Variables y selectores

const formulario = document.querySelector('#agregar-gasto');
const gastosListado = document.querySelector('#gastos ul');

//Eventos

eventListeners();
function eventListeners() {

  document.addEventListener('DOMContentLoaded', preguntarPresupuesto);
  document.addEventListener('submit', agregandoGasto);
}

//Clases

class Presupuesto{
  constructor(presupuesto){

    this.presupuesto = Number(presupuesto);
    this.restante = Number(presupuesto);
    this.gastos = [];
  }

  nuevoGasto(gasto){
    this.gastos = [...this.gastos, gasto]
    this.calcularRestante();
  }

  calcularRestante(){
    //sumar el total de gastos
    const gastado = this.gastos.reduce((total, gasto) => total + gasto.cantidad, 0);
    this.restante = this.presupuesto - gastado;
  }
}

class UI{
  insertarPresupuesto(infoUsuario){
    //Extrayendo los valores
    const { presupuesto, restante } = infoUsuario;

    //Agregar HTML

    document.querySelector('#total').textContent = presupuesto;
    document.querySelector('#restante').textContent = restante;
  }

  imprimirAlerta(mensaje, tipo){
    const divMensaje = document.createElement('div');

    divMensaje.classList.add('text-center', 'alert');

    if(tipo === 'error'){
      divMensaje.classList.add('alert-danger');
    }else{
      divMensaje.classList.add('alert-success');
    }

    //mensaje
    divMensaje.textContent = mensaje;

    //insertar html

    document.querySelector('.primario').insertBefore(divMensaje, formulario);

    setTimeout(() => {
      divMensaje.remove();
    }, 2000);
  }

  agregarGastoListado(gastos){

    // Limpiar HTML
    this.limpiarHTML();

    // ITERAR LOS GASTOS
    gastos.forEach(gasto => {
      // console.log(gasto);
      const {cantidad, nombre, id} = gasto;

      const nuevoGasto = document.createElement('li');
      nuevoGasto.className = 'list-group-item d-flex justify-content-between align-items-center';
      nuevoGasto.dataset.id = id;

      // Insertar el gasto
      nuevoGasto.innerHTML = `
          ${nombre}
          <span class="badge badge-primary badge-pill">$ ${cantidad}</span>
      `;

      // boton borrar gasto.
      const btnBorrar = document.createElement('button');
      btnBorrar.classList.add('btn', 'btn-danger', 'borrar-gasto');
      btnBorrar.innerHTML = 'Borrar &times';
      nuevoGasto.appendChild(btnBorrar);

      // Insertar al HTML
      gastosListado.appendChild(nuevoGasto);
    });
  }

  actulizarRestante(restante){
    document.querySelector('#restante').textContent = restante;
  }

  comprobarPresupuesto(presupuestoObj){
    const {presupuesto, restante} = presupuestoObj;

    const restanteDiv = document.querySelector('.restante');

    if((presupuesto / 4) > restante){
      restanteDiv.classList.remove('alert-success', 'alert-warning');
      restanteDiv.classList.add('alert-danger');
    } else if((presupuesto / 2) > restante){
      restanteDiv.classList.remove('alert-success');
      restanteDiv.classList.add('alert-warning');
    }

    if(restante <= 0){
      ui.imprimirAlerta('el presupuesto se ha agotado', 'error'); 
      formulario.querySelector('button[type="submit"]').disabled = true;
    }
  }

  limpiarHTML() {
    while(gastosListado.firstChild) {
        gastosListado.removeChild(gastosListado.firstChild);
    }
}
}

//instanciar

let presupuesto;
const ui = new UI();

//Funciones

function preguntarPresupuesto(){
  const presupuestoUsuario = prompt('Cual es tu presupueto');
  // console.log(Number(presupuestoUsuario));

  if( presupuestoUsuario === '' || presupuestoUsuario === null || presupuestoUsuario <= 0 || isNaN(presupuestoUsuario) ){
    window.location.reload();
  }

  //presupuesto validdo

  presupuesto = new Presupuesto(presupuestoUsuario);
  // console.log(presupuesto);

  ui.insertarPresupuesto(presupuesto);
}

function agregandoGasto(e) {

  e.preventDefault();
  const nombre = document.querySelector('#gasto').value;
  const cantidad = Number(document.querySelector('#cantidad').value);

  if(nombre === '' || cantidad ===''){
    ui.imprimirAlerta('Ambos campos son obligatorios', 'error');

    return;
  }else if(cantidad <= 0 || isNaN(cantidad)){
    ui.imprimirAlerta('Cantidad  invalida', 'error');

    return;
  }
  const gasto = {nombre, cantidad, id: Date.now() };

  // console.log(gasto);
// añade u nuevo gasto
  presupuesto.nuevoGasto(gasto);
//mensaje de todo ok
  ui.imprimirAlerta('Gasto agregado correctamente');

  //impriimir los gastos
  const { gastos, restante } = presupuesto;
  ui.agregarGastoListado(gastos);

  ui.actulizarRestante(restante);

  //comprobar el presupuesto
  ui.comprobarPresupuesto(presupuesto);
  //reiniciar formulario
  formulario.reset();
}
