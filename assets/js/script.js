/* start JSON */
let dades = [];
let dades_internes = [];
let dades_p = [];
let dades_privades = [];

carregaDades();
carregaDadesPrivades();


function carregaDades() {

    let xmlhttp = new XMLHttpRequest();
    let url = "assets/js/cabrera.json";


    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

            dades = JSON.parse(xmlhttp.responseText);

            for (let i = 0; i < dades.length; i++) {

                dades_internes.push(dades[i]);

            }

            crear_portfoli_lugares();
            carousel_itineraris();
            carrr();

        }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();

}

function carregaDadesPrivades() {

    let xmlhttp = new XMLHttpRequest();
    let url = "assets/js/historia.json";


    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

            dades_p = JSON.parse(xmlhttp.responseText);

            for (let i = 0; i < dades_p.length; i++) {

                dades_privades.push(dades_p[i]);

            }

            crear_hist();

        }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();

}


function crear_portfoli_lugares() {

    for (let i = 0; i < dades_internes.length; i++) {

        if (dades[i].type == "Place") {

            crearCarta(dades_internes[i].name, dades_internes[i].photo.caption.contentURL);
        }
    }
}

function carousel_itineraris() {

    for (let i = 0; i < dades_internes.length; i++) {

        if (dades[i].type == "Itinerari") {

            crearItem(dades_internes[i].name, dades_internes[i].photo.caption.contentURL);
        }
    }
}

function crear_hist(){

    let contenedor = document.createElement("div");
    contenedor.classList.add("container");

    let c_titulo = document.createElement("div");
    c_titulo.classList.add("section-title");
    let att = document.createAttribute("data-aos");
    att.value = "fade-up";
    c_titulo.setAttribute("data-aos", "fade-up");

    let titulo = document.createElement("h2");
    titulo.innerText = "Historia";

    let desc = document.createElement("p");
    desc.innerText = "Hechando la vista atrás";

    c_titulo.appendChild(titulo);
    c_titulo.appendChild(desc);
    contenedor.appendChild(c_titulo);

    let c_ventana = document.querySelector("#historia");
    c_ventana.appendChild(contenedor);
    

    for (let i = 0; i < dades_privades.length; i++) {

        crear_elemento_hist((i%2 == 0), dades_privades[i].photo.caption.contentURL, dades_privades[i].titulo, dades_privades[i].description, c_ventana);

    }


}

function crearItem(titol, foto) {

    let item = document.createElement("div");
    item.classList.add("item");

    let columna = document.createElement("div");
    columna.classList.add("col-md-4");

    let carta = document.createElement("div");
    carta.classList.add("card");
    carta.classList.add("card-body");
    carta.classList.add("box");
    carta.classList.add("featured");
    let att = document.createAttribute("data-in");
    att.value = "zoom-in";
    carta.setAttribute("data-in", "zoom-in");
    let att2 = document.createAttribute("data-aos-delay");
    att2.value = "100";
    carta.setAttribute("data-aos-delay", "100");

    let titulo = document.createElement("h3");
    titulo.innerText = titol;

    let imagen = document.createElement("img");
    imagen.src = foto;
    imagen.classList.add("imagebox");
    imagen.alt = "";

    let boton = document.createElement("div");
    boton.classList.add("btn-wrap");

    let boton_l = document.createElement("button");
    boton_l.classList.add("btn-buy");
    boton_l.type = "button";
    let att3 = document.createAttribute("data-toggle");
    att3.value = "modal";
    boton_l.setAttribute("data-toggle", "modal");
    let att4 = document.createAttribute("data-target");
    att4.value = "#why2";
    boton_l.setAttribute("data-target", "#why2");
    boton_l.innerText = "Mas información";


    boton.appendChild(boton_l);
    carta.appendChild(titulo);
    carta.appendChild(imagen);
    carta.appendChild(boton);
    columna.appendChild(carta);
    item.appendChild(columna);
    carousel.prepend(item);

}

//Funcion que crea cartas de los lugares a visitar
function crearCarta(titol, foto) {

    let carta = document.createElement("div");
    carta.classList.add("card");

    let caja = document.createElement("div");
    caja.classList.add("box");

    let contenido = document.createElement("div");
    contenido.classList.add("content");

    let titulo = document.createElement("h3");
    titulo.innerText = titol;

    let boton = document.createElement("a");
    boton.classList.add("position-absolute");
    boton.classList.add("bottom-0");
    boton.classList.add("start-50");
    boton.classList.add("translate-middle-x");
    boton.href = "#why";
    boton.innerText = "Mas información";
    let att = document.createAttribute("data-toggle");
    att.value = "modal";
    boton.setAttribute("data-toggle", "modal");


    let imagen = document.createElement("img");
    imagen.src = foto;
    imagen.classList.add("imagebox");
    imagen.alt = "";

    contenido.appendChild(titulo);
    contenido.appendChild(boton);
    contenido.appendChild(imagen);
    caja.appendChild(contenido);
    carta.appendChild(caja);
    cartas_lugares.appendChild(carta);

}

function crear_elemento_hist(e_par, himg, htitulo, htexto, c_padre){

    let contenedor = document.createElement("div");
    contenedor.classList.add("row");
    contenedor.classList.add("content");

    let c_imagen = document.createElement("div");
    if (e_par == true){
        c_imagen.classList.add("col-md-4");
    }else{
        c_imagen.classList.add("col-md-4");
        c_imagen.classList.add("order-1");
        c_imagen.classList.add("order-md-2");
    }
    
    let att = document.createAttribute("data-aos");
    if (e_par == true){
        att.value = "fade-right";
        c_imagen.setAttribute("data-aos", "fade-right");
    }else{
        att.value = "fade-left";
        c_imagen.setAttribute("data-aos", "fade-left");
    }

    let imagen = document.createElement("img");
    imagen.src = himg;
    imagen.classList.add("imagebox");
    imagen.classList.add("img-fluid");
    imagen.alt="";

    let contenedor_texto = document.createElement("div");
    if (e_par == true){
        contenedor_texto.classList.add("col-md-8");
        contenedor_texto.classList.add("pt-4");
    }else{
        contenedor_texto.classList.add("col-md-8");
        contenedor_texto.classList.add("pt-5");
        contenedor_texto.classList.add("order-2");
        contenedor_texto.classList.add("order-md-1");
    }
    let att2 = document.createAttribute("data-aos");
    att2.value = "fade-up";
    contenedor_texto.setAttribute("data-aos", "fade-up");

    let titulo = document.createElement("h3");
    titulo.innerText = htitulo;

    let texto = document.createElement("p");
    texto.classList.add("fst-italic");
    texto.innerText = htexto

    contenedor_texto.appendChild(titulo);
    contenedor_texto.appendChild(texto);
    c_imagen.appendChild(imagen);
    contenedor.appendChild(c_imagen);
    contenedor.appendChild(contenedor_texto);

    c_padre.appendChild(contenedor);



    /* let c_ventana = document.querySelector("#historia");
    c_ventana.appendChild(c_padre);
 */
}



/* end JSON */

/* Ventana modal */

/* Fin ventana modal */
heroVideo();

function heroVideo() {
    // Create the video tag.
    const HeroVideo = document.createElement("video");
    // Check if this video tag is supported. Feature detection!
    if (HeroVideo.canPlayType) {
        // Check for webm support.
        if (HeroVideo.canPlayType("video/webm")) {
            HeroVideo.src = "assets/video/mivideo.webm";
        }
        // Check for mp4 support.
        if (HeroVideo.canPlayType("video/mp4")) {
            HeroVideo.src = "assets/video/mivideoc.mp4";
        }

        // Variables
        HeroVideo.autoplay = true;
        HeroVideo.muted = true;
        HeroVideo.loop = true;
        HeroVideo.id = "myVideo";
        HeroVideo.play();

        hero.appendChild(HeroVideo);

        let promise = hero.querySelector('video').play();

        if (promise !== undefined) {
            promise.catch(error => {
                // Auto-play was prevented
                // Show a UI element to let the user manually start playback
                HeroVideo.controls = true;
                HeroVideo.play();

            }).then(() => {
                // Auto-play started
            });
        }


    } else {

        let div = hero.createElement("div");
        div.innerHtml = "Backup message shown if the browser does not support the video tag.";

    }
}




/* Start Carrousel */

function carrr() {

    $('.owl-carousel').owlCarousel({

        loop: true,
        stagePadding: 0,
        autoWidth: true,
        nav: true,
        navText: ["<div class='nav-button owl-prev'><div class=\"icon\"><i class=\"bi bi-chevron-compact-left\"></i></div></div>", "<div class='nav-button owl-next'><div class=\"icon\"><i class=\"bi bi-chevron-compact-right\"></i></div></div>"],
        center: true,

        responsive: {
            0: {
                items: 1,
            },
            600: {
                items: 2,
            },
            1000: {
                items: 3,
            }
        }
    })

}


/* End carousel */

/* Start API maps */


/* End API maps */

function r(val) {
    console.log(val)
}


/* Actualiza la ventana modal */
function rellenar_plantilla(nombre) {
    const plantilla = document.querySelector("#plantilla")
    const container = document.querySelector("#info-dinamica-modal")
    const cuerpoAnterior = container.firstChild

    if (cuerpoAnterior !== undefined) {
        container.removeChild(cuerpoAnterior)
    }



    plantilla_clone = plantilla.content.cloneNode(true)
    plantilla_clone.querySelector(".parrafotemp").innerText = "texto desde js"
    plantilla_clone.querySelector(".titulotemp").innerText = "titulo desde js"
    container.appendChild(plantilla_clone)

}
rellenar_plantilla()
