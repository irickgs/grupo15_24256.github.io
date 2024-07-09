document.addEventListener("DOMContentLoaded", () => {
    const formCrear = document.getElementById('formCrear');
    const tablaContactos = document.getElementById('tablaContactos');

    // Evento para crear un contacto
    formCrear.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;

        const nuevoContacto = { nombre, email };

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

            // Limpiar tabla antes de actualizar
            tablaContactos.innerHTML = '';

            data.forEach(contacto => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${contacto.nombre}</td>
                    <td>${contacto.email}</td>
                    <td>
                        <button class="btn btn-info btn-sm" onclick="editarContacto(${contacto.id})">Editar</button>
                        <button class="btn btn-danger btn-sm" onclick="eliminarContacto(${contacto.id})">Eliminar</button>
                    </td>
                `;
                tablaContactos.appendChild(tr);
            });
        } catch (error) {
            console.error('Error al listar contactos:', error);
        }
    }

    // Función para eliminar un contacto
    async function eliminarContacto(id) {
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
    }

    // Función para editar un contacto (simplemente redirigiría a una página de edición)
    function editarContacto(id) {
        // Aquí podrías implementar la lógica para editar el contacto
        alert(`Editar contacto con ID ${id}`);
    }

    // Cargar la lista de contactos al cargar la página
    listarContactos();
});
