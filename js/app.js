// Variables y selectores

const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gastos ul');

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
      divMensaje.classList.add('alert-succes');
    }

    //mensaje
    divMensaje.textContent = mensaje;

    //insertar html

    document.querySelector('.primario').insertBefore(divMensaje, formulario);

    setTimeout(() => {
      divMensaje.remove();
    }, 2000);
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
  const gasto = document.querySelector('#gasto').value;
  const cantidad = document.querySelector('#cantidad').value;

  if(gasto === '' || cantidad ===''){
    ui.imprimirAlerta('Ambos campos son obligatorios', 'error');

    return;
  }else if(cantidad <= 0 || isNaN(cantidad)){
    ui.imprimirAlerta('Cantidad  invalida', 'error');

    return;
  }
  console.log('agregando vainas');
}
