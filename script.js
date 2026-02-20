//CONSTANTES GLOBALES
const form= document.querySelector("#formContacto");
const btnAddTel= document.querySelector("#btnAddTel");
const mensaje= document.querySelector("#msg");
const btnBorrarTodo= document.querySelector("#btnBorrarTodo");

const nombre= document.querySelector("#inpNombre");
const apellidos= document.querySelector("#inpApellidos");
const telefono= document.querySelector("#inpTelNumero");
const listaTelefonos= document.querySelector("#ulTelefonos");
const listaContactos= document.querySelector("#secContactos");

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

    if(telefonos.length === 0) {
        alert("Añade al menos 1 telefono");
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

    if (!telefono.checkValidity() || valorTelefono === "") {
        telefono.reportValidity();
        alert("No puedes dejar el telefono vacío");
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
        return;
    }

    const contactoNuevo= {
        id: Date.now(),
        nombre: nombre.value,
        apellidos: apellidos.value,
        telefonos: [...telefonos]
    };

    agenda.push(contactoNuevo);

    localStorage.setItem("agenda", JSON.stringify(agenda));
    mostrarContactos();

    resetear();  
    mensaje.textContent= "Contacto guardado con éxito";
    setTimeout(() => mensaje.textContent= "", 3000);
}

function mostrarContactos() {
  listaContactos.innerHTML= "";

  if(agenda.length === 0) {
    listaContactos.innerHTML= "No hay contactos";
  }

  for(let i=0; i<agenda.length; i++) {
    const contacto= agenda[i];
    const div= document.createElement("div");
    div.className= "contacto";

    const nombreCompleto= document.createElement("h3");
    nombreCompleto.textContent= contacto.nombre + " " + contacto.apellidos;  
    
    const contactoTelefonos= document.createElement("p");
    contactoTelefonos.textContent= "Telefonos: " + contacto.telefonos.join(", ");

    const btnBorrar= document.createElement("button");
    btnBorrar.textContent= "Eliminar";

    btnBorrar.addEventListener("click", () => {
        borrarContacto(contacto.id);
    });

    div.appendChild(nombreCompleto);
    div.appendChild(contactoTelefonos);
    div.appendChild(btnBorrar);

    listaContactos.appendChild(div);
  }
}

function borrarContacto(idContacto) {
  let borrado= false;

    if(confirm("¿Quieres borrar el contacto?")) {
        for(let i=0; i<agenda.length && !borrado; i++) {
            if(agenda[i].id === idContacto) {
                agenda.splice(i, 1);
                borrado= true;
            }
        }
        localStorage.setItem("agenda", JSON.stringify(agenda));
        mostrarContactos();
    }
}

function borrarAgenda() {
    if(confirm("¿Quieres vaciar la agenda?")) {
        agenda= [];
        localStorage.setItem("agenda", JSON.stringify(agenda));
        mostrarContactos();
    }
}

function resetear() {
  nombre.value= "";
  apellidos.value= "";
  telefono.value= "";
  telefonos= [];
  listaTelefonos.textContent= "";
}

mostrarContactos();