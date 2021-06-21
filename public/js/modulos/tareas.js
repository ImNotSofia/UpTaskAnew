const tareas = document.querySelector('.listado-pendientes');

if (tareas) {

    tareas.addEventListener('click', e => {
        if (e.target.classList.contains('fa-check-circle')) {

            const icono = e.target;

            const idTarea = icono.parentElement.parentElement.dataset.tarea;

            //Req tareas

            const url = `${location.origin}/tareas/${idTarea}`;

            console.log(url);

        }
    });

}

export default tareas;
