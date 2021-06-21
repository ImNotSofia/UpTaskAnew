import Swal from 'sweetalert2';

import axios from 'axios';

const btnEliminar = document.querySelector('#eliminar-proyecto');

if (btnEliminar) {

    btnEliminar.addEventListener('click', e => {

        const urlProyecto = e.target.dataset.proyectoUrl;



        Swal.fire({
            title: '¿Deseas borrar este proyecto?',
            text: "Esta acción no se puede revertir",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, borrar'
        }).then((result) => {

            if (result.value) {

                //Petición a Axios

                const url = `${location.origin}/proyectos/${urlProyecto}`;

                axios.delete(url, { params: { urlProyecto } })
                    .then(function (respuesta) {
                        console.log(respuesta)

                        Swal.fire(
                            'Proyecto eliminado',
                            respuesta.data,
                            'success'
                        );

                        //Redireccionar

                        setTimeout(() => {

                            window.location.href = '/'

                        }, 1500);

                    })

                    .catch(() => {

                        Swal.fire({
                            type: 'error',
                            title: 'Hubo un error',
                            text: 'No se pudo eliminar el proyecto'
                    })
                })
            }
        })

    })
}

export default btnEliminar;