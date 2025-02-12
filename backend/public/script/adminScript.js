document.addEventListener("DOMContentLoaded", () => {
    const formCrear = document.getElementById('formCrear');
    const tablaContactos = document.getElementById('tablaContactos');
    const formEditar = document.getElementById('formEditar');
    const modalEditar = new bootstrap.Modal(document.getElementById('modalEditar'));

    // Evento para crear un contacto
    formCrear.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const mensaje = document.getElementById('mensaje').value;
        const acepta = document.getElementById('acepta').checked ? 1 : 0; // Capture checkbox value

        const nuevoContacto = { nombre, email, mensaje, acepta }; // Include acepta in the request

        try {
            const response = await fetch('http://localhost:3000/contactos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(nuevoContacto)
            });

            const data = await response.json();
            alert(data.mensaje);

            // Limpiar formulario y actualizar la tabla
            formCrear.reset();
            listarContactos();
        } catch (error) {
            console.error('Error al crear contacto:', error);
        }
    });

    // Función para listar contactos
    async function listarContactos() {
        try {
            const response = await fetch('http://localhost:3000/contactos');
            const data = await response.json();

            console.log('Response data:', JSON.stringify(data, null, 2)); // Log the entire response data in a readable format

            // Limpiar tabla antes de actualizar
            tablaContactos.innerHTML = '';

            data.forEach(contacto => {
                console.log('Contact ID:', contacto.id_contacto); // Updated to use the correct property name
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${contacto.nombre}</td>
                    <td>${contacto.email}</td>
                    <td>
                        <button class="btn btn-info btn-sm" onclick="editarContacto(${contacto.id_contacto}, '${contacto.nombre}', '${contacto.email}')">Editar</button>
                        <button class="btn btn-danger btn-sm" onclick="eliminarContacto(${contacto.id_contacto})">Eliminar</button>
                        <button class="btn btn-secondary btn-sm" onclick="verMensaje('${contacto.mensaje}')">Ver Mensajes</button> <!-- Added Ver Mensajes button -->
                    </td>
                `;
                tablaContactos.appendChild(tr);
            });
        } catch (error) {
            console.error('Error al listar contactos:', error);
        }
    }

    // Función para eliminar un contacto
    window.eliminarContacto = async function(id) {
        console.log('ID to delete:', id); // Added console log to check the ID
        try {
            const response = await fetch(`http://localhost:3000/contactos/${id}`, {
                method: 'DELETE'
            });

            const data = await response.json();
            alert(data.mensaje);

            // Actualizar la tabla después de eliminar
            listarContactos();
        } catch (error) {
            console.error('Error al eliminar contacto:', error);
        }
    };

    // Función para editar un contacto
    window.editarContacto = function(id, nombre, email) {
        document.getElementById('nombreEditar').value = nombre;
        document.getElementById('emailEditar').value = email;
        document.getElementById('contactoId').value = id;
        modalEditar.show();
    };

    // Función para ver el mensaje
    window.verMensaje = function(mensaje) {
        alert(`Mensaje: ${mensaje}`); // Display the message in an alert
    };

    // Evento para actualizar un contacto
    formEditar.addEventListener('submit', async (e) => {
        e.preventDefault();

        const id = document.getElementById('contactoId').value;
        const nombre = document.getElementById('nombreEditar').value;
        const email = document.getElementById('emailEditar').value;

        const contactoActualizado = { nombre, email };

        try {
            const response = await fetch(`http://localhost:3000/contactos/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(contactoActualizado)
            });

            const data = await response.json();
            alert(data.mensaje);

            // Cerrar modal y actualizar la tabla
            modalEditar.hide();
            listarContactos();
        } catch (error) {
            console.error('Error al actualizar contacto:', error);
        }
    });

    // Cargar la lista de contactos al cargar la página
    listarContactos();
});
