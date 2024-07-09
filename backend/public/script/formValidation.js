document.addEventListener("DOMContentLoaded", () => {
    const crearUsuarioForm = document.getElementById('form-contacto'); // formulario para crear usuarios
    const mensajeError = document.getElementById("mensajeError");
    const botonBorrar = document.querySelector("button[type='reset']");

    // Añadir eventos
    crearUsuarioForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Evita que la página se actualice

        // Validar formulario
        if (!validarFormulario()) {
            return; // Si la validación falla, no enviar el formulario
        }

        // Recoger datos del formulario
        const formData = new FormData(crearUsuarioForm);
        const data = {
            fk_id_asunto: formData.get('fk_id_asunto'),
            nombre: formData.get('nombre'),
            fk_id_ciudad: formData.get('fk_id_ciudad'),
            email: formData.get('email'),
            mensaje: formData.get('mensaje'),
            acepta: formData.get('acepta') ? 1 : 0
        };

        // Enviar datos al servidor
        try {
            const response = await fetch('http://localhost:3000/contactos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const result = await response.json();
            alert(result.mensaje);
            crearUsuarioForm.reset();
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
            alert('Hubo un problema al enviar el formulario. Inténtalo de nuevo.');
        }
    });

    botonBorrar.addEventListener('click', limpiarMensajeError);
});

function validarFormulario() {
    const mensajeError = document.getElementById("mensajeError");
    let email = document.getElementById('email').value;
    let mensaje = document.getElementById("mensaje").value;
    let terminos = document.getElementById("acepta").checked;

    mensajeError.innerHTML = '';

    if (email.trim() === '') {
        mensajeError.innerHTML = 'El campo email no puede estar vacío.';
        return false;
    }

    if (!validarEmail(email)) {
        mensajeError.innerHTML = 'El formato del email no es válido.';
        return false;
    }

    if (mensaje === '' || mensaje === "Tu consulta aquí...") {
        mensajeError.innerHTML = 'Debes escribir un mensaje.';
        return false;
    }

    if (!terminos) {
        mensajeError.innerHTML = 'Debes aceptar los términos y condiciones.';
        return false;
    }

    mensajeError.innerHTML = '';
    return true;
}

function validarEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function limpiarMensajeError() {
    const mensajeError = document.getElementById("mensajeError");
    mensajeError.innerHTML = '';
}


/*document.addEventListener("DOMContentLoaded", () => {
    const crearUsuarioForm = document.getElementById('form-contacto'); // formulario para crear usuarios
    const formulario = document.getElementById("form-contacto");
    const mensajeError = document.getElementById("mensajeError");
    const botonBorrar = document.querySelector("button[type='reset']");
    
    formulario.addEventListener('submit', validarFormulario);
    botonBorrar.addEventListener('click', limpiarMensajeError);
    
    // CREAR USUARIOS NUEVOS
    crearUsuarioForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // evita que la pagina se actualice

        const formData = new FormData(crearUsuarioForm);

        const data = {
            id_asunto: formData.get('id_asunto'),
            nombre: formData.get('nombre'),
            fk_id_ciudad: formData.get('fk_id_ciudad'),
            email: formData.get('email'),
            mensaje: formData.get('mensaje'),
            acepta: formData.get('acepta') ? 1 : 0
        };
        try{
        const response = await fetch('http://localhost:3000/contactos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        alert(result.mensaje);
        crearUsuarioForm.reset();
    }catch (error) {
        console.error('Error en la solicitud:', error.message);
    }
    });
});

function validarFormulario(evento) {
    evento.preventDefault();
    const mensajeError = document.getElementById("mensajeError");
    let email = document.getElementById('email').value;
    let mensaje = document.getElementById("mensaje").value;
    let terminos = document.getElementById("acepta").checked;

 
    if (email.trim() === '') {
        mensajeError.innerHTML = 'El campo email no puede estar vacío.';
        return;
    }

    if (!validarEmail(email)) {
        mensajeError.innerHTML = 'El formato del email no es válido.';
        return;
    }

    if (mensaje === '' || mensaje === "Tu consulta aqui...") {
        mensajeError.innerHTML = 'Debes escribir un mensaje.';
        return;
    }

    if (!terminos) {
        mensajeError.innerHTML = 'Debes aceptar los términos y condiciones.';
        return;
    }

    mensajeError.innerHTML = '';
    mensajeError.innerHTML = 'Formulario enviado con éxito!';
    document.getElementById('form-contacto').submit();
}

function validarEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function limpiarMensajeError() {
    const mensajeError = document.getElementById("mensajeError");
    mensajeError.innerHTML = '';
}*/