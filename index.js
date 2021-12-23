

document.addEventListener('DOMContentLoaded', ()=>{
    urlBase = "http://localhost/PruebaTecnica/API/"

    let button = document.getElementById('refresh')
    let buttonGuardar = document.getElementById('guardar')
    let buttonVerGatos = document.getElementById('verGatos')
    let listaGatos = document.getElementById('listaGatos')

    let img = document.getElementById('imagenGato')

    button.addEventListener('click', ()=>{
        axios.get("https://api.thecatapi.com/v1/images/search")
            .then(res => {
                let {data} = res
                let url = data[0].url
                // console.log(data[0].url)
                img.src = url
            })
    })



buttonGuardar.addEventListener('click', ()=>{
    console.log(img.src)
    axios.post(`${urlBase}insertGato.php`, {
        url: img.src
    })
        .then(res => {
            // console.log(res)
            alert("Gato guardado")
        })
})


    const verGatos = () => {
        listaGatos.innerHTML = ''
        axios.post(`${urlBase}getGatos.php`)
            .then(res => {
                console.log(res)
                let {data} = res
                console.log(data)
                data.forEach(gato => {
                    let newDiv = document.createElement('div')
                    newDiv.className = 'gato-item'
                    let buttonEliminar = document.createElement('button')
                    buttonEliminar.addEventListener('click', (evt)=>{
                        console.log(evt.target.id)
                        let id = evt.target.id
                        axios.post(`${urlBase}deleteGato.php`, {
                            id: id
                        })
                        .then(res => {
                            // console.log(res)
                            alert("Eliminado exitosamente!")
                            verGatos()
                        })
                    })
                    let newImagen = document.createElement('img')
                    buttonEliminar.textContent = "Eliminar"
                    buttonEliminar.id = gato.id
                    buttonEliminar.className = "eliminar"
                    newImagen.src = gato.url
                    newImagen.id = gato.id
                    newDiv.appendChild(newImagen)
                    newDiv.appendChild(buttonEliminar)
                    listaGatos.appendChild(newDiv)
                });
            })
    }

    buttonVerGatos.addEventListener('click', ()=>{
        verGatos()
    })


})


