// mas info:  https://blog.webdevsimplified.com/2020-11/class-list/
const body = document.body;
body.append("hi", "he");

// Creamos div
const div = document.createElement("div");

/*
//diferencia?
div.innerText = "este es el inner text de div";
div.textContent = 'este es el texto textContent';

//para incluir texto html:
div.innerHTML = "<strong> texto </strong>"

Pero mejor crear elementos nuevos
*/

const strong = document.createElement("strong");

strong.setAttribute("id", "idstrong");
div.id = "iddediv";

strong.innerText = "hey strong text";


//Añadimos div a la pagina
body.appendChild(div);