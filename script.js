//CONSTANTES GLOBALES
const form= document.querySelector("#formContacto");
const btnAddTel= document.querySelector("#btnAddTel");
const mensaje= document.querySelector("#msg");
const btnBorrarTodo= document.querySelector("#btnBorrarTodo");

const nombre= document.querySelector("#inpNombre");
const apellidos= document.querySelector("#inpApellidos");
const telefono= document.querySelector("#inpTelNumero");
const listaTelefonos= document.querySelector("#ulTelefonos");

let agenda= [];
let telefonos= [];

//EVENTOS
form.addEventListener("submit", () => {

});

btnBorrarTodo.addEventListener("click", borrarAgenda); 

btnAddTel.addEventListener("click", añadirTelefono);

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
    const valorTelefono= telefono.value.trim();

    if (!telefono.checkValidity()) {
        telefono.reportValidity();
        return;
    }

    telefonos.push(valorTelefono);
    const li= document.createElement("li");
    li.textContent= valorTelefono;
    listaTelefonos.appendChild(li);

    telefono.value= "";
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

