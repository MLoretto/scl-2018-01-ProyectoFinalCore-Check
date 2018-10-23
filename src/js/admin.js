var database = firebase.database();
const botonSave = document.getElementById("save");
const botonVerLista = document.getElementById("botonVisitantes")
const lista = document.getElementById("listaVisitas")
const inputText = document.querySelector("input");
const boton = document.getElementById("boton");
const listaVisita = document.getElementById("ConteoVisitas");
const listaResidentes = document.getElementById("listaResidentes");
const botonListaResidentes = document.getElementById("botonResidentes")

//guardar nuevo residente
botonSave.addEventListener("click", event => {
    let name = document.getElementById("name").value;
    let mail = document.getElementById("mail").value;
    var newPostRef = database.ref("/residentes/").push();
    newPostRef.set({
        name: name,
        mail: mail,
    })
})

//lista registro visitas
botonVerLista.addEventListener("click", event => {
        lista.innerHTML = "";
        database.ref('/registros/').on('child_added', function(snapshot) {
            let visitante = snapshot.val().userName;
            let mail = snapshot.val().eMail;
            let fecha = snapshot.val().createTime;
            let urlPicture = snapshot.val().urlPicture;
            lista.innerHTML += `<div class= "visitante">
            <img class="imgUser" src="${urlPicture}">
    <p class="datos">Nombre visita: ${visitante}</p>
    <p class="datos">Correo electrónico: ${mail}</p>
    <p class="datos">Registrado el: ${fecha}</p>
    </div>`
        });
        listaVisitasOpen = true;
})
    /* <p>Visita a: ${residente}</p>     let residente= snapshot.val().collaboratorName; */


//lista registro residentes
botonListaResidentes.addEventListener("click", event => {
    listaResidentes.innerHTML = "";
    database.ref('/residentes/').on('child_added', function(snapshot) {
        let residente = snapshot.val().name;
        listaResidentes.innerHTML += `<div class= "visitante">
    <p>Nombre residente: ${residente}</p>    
    </div>`
    })
})


//input buscar visitas por residente
boton.addEventListener("click", event => {
    let nameResidente = document.getElementById("Residente").value;
    listaVisita.innerHTML = `<p>Las visitas que a recibido ${nameResidente} son:</p>`
    database.ref('/registros/').on('child_added', function(snapshot) {
        let residente = snapshot.val().collaboratorName;
        let visitante = snapshot.val().userName;
        let fecha = snapshot.val().createTime;
        console.log(snapshot.val())
        if (residente.indexOf(nameResidente) != -1) {
            listaVisita.innerHTML +=
                `<div class= "visitanteCuatro">   
    <p>${visitante} el ${fecha}</p> 
    </div>`
        }
    })
})