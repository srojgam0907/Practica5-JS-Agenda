//CONSTANTES GLOBALES
const form= document.querySelector("#formContacto");
const btnAddTel= document.querySelector("#btnAddTel");
const mensaje= document.querySelector("#msg");
const btnBorrarTodo= document.querySelector("#btnBorrarTodo");

const nombre= document.querySelector("#inpNombre");
const apellidos= document.querySelector("#inpApellidos");
const telefono= document.querySelector("#inpTelNumero");

let agenda= [];

//EVENTOS
form.addEventListener("submit", () => {

});

btnBorrarTodo.addEventListener("click", borrarAgenda()); 


//FUNCIONES
function validate() {
    if (!nombre.checkValidity()) {
        nombre.reportValidity();
        return;
    }

    if (!apellidos.checkValidity()) {
        apellidos.reportValidity();
        return;
    }

}

function cargarContactos() {
  const raw = localStorage.getItem("agenda");

  if (!raw) return [];

  try {
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("JSON inválido:", error);
    return [];
  }
}

function añadirTelefono() {

}

function guardarContacto() {

}

function mostrarContactos() {

}

function borrarContacto() {

}

function borrarAgenda() {
    if(confirm("¿Seguro de que quieres vaciar la agenda?")) {
        agenda= [];
        guardarAgenda();
    }
}

