//CONSTANTES GLOBALES
const form= document.querySelector("#formContacto");
const btnAddTel= document.querySelector("#btnAddTel");
const mensaje= document.querySelector("#msg");
const btnBorrarTodo= document.querySelector("#btnBorrarTodo");

const nombre= document.querySelector("#inpNombre");
const apellidos= document.querySelector("#inpApellidos");
const telefono= document.querySelector("#inpTelNumero");
const listaTelefonos= document.querySelector("#ulTelefonos");

let agenda= cargarContactos();
let telefonos= [];

//EVENTOS
form.addEventListener("submit", (e) => {
    e.preventDefault();
    guardarContacto();
});

btnBorrarTodo.addEventListener("click", borrarAgenda); 

btnAddTel.addEventListener("click", añadirTelefono);

//FUNCIONES
function validarContacto() {
    if (!nombre.checkValidity()) {
        nombre.reportValidity();
        return false;
    }

    if (!apellidos.checkValidity()) {
        apellidos.reportValidity();
        return false;
    }

    if(telefonos.length === "0") {
        alert("Añade al menos un telefono");
        return false;
    }

    return true;
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
    if(!validarContacto()) {
        alert("Uno de los campos del contacto es incorrecto");
        return;
    }

    let id= 0;
    const contactoNuevo= {
        id: id++,
        nombre: nombre.value,
        apellidos: apellidos.value,
        telefonos: [...telefonos]
    };

    agenda.push(nuevoContacto);

    resetear();  
    mensaje.textContent= "Contacto guardado con éxito";
    setTimeout(() => mensaje.textContent= "", 3000);
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

function resetear() {
  nombre.value= "";
  apellidos.value= "";
  telefono.value= "";
  telefonos= [];
  listaTelefonos.textContent= "";
}
