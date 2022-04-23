/* start JSON */

var dades_internes = [];

cargarDades();

function cargarDades() {

    var xmlhttp = new XMLHttpRequest();
    var url = "assets/js/cabrera.json";


    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            dades = JSON.parse(xmlhttp.responseText);
            for (var i = 0; i < dades.length; i++) {

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

function crear_portfoli_lugares() {

    for (var i = 0; i < dades_internes.length; i++) {

        if (dades[i].type == "Place") {

            crearCarta(dades_internes[i].name, dades_internes[i].photo.caption.contentURL);
        }
    }
}

function carousel_itineraris() {

    for (var i = 0; i < dades_internes.length; i++) {

        if (dades[i].type == "Itinerari") {

            crearItem(dades_internes[i].name, dades_internes[i].photo.caption.contentURL);
        }
    }
}

function crearItem(titol, foto) {

    var item = document.createElement("div");
    item.classList.add("item");

    var columna = document.createElement("div");
    columna.classList.add("col-md-4");

    var carta = document.createElement("div");
    carta.classList.add("card");
    carta.classList.add("card-body");
    carta.classList.add("box");
    carta.classList.add("featured");
    var att = document.createAttribute("data-in");
    att.value = "zoom-in";
    var att2 = document.createAttribute("data-aos-delay");
    att2.value = "100";

    var titulo = document.createElement("h3");
    titulo.innerText = titol;

    var imagen = document.createElement("img");
    imagen.src = foto;
    imagen.classList.add("imagebox");
    imagen.alt = "";

    var boton = document.createElement("div");
    boton.classList.add("btn-wrap");

    var boton_l = document.createElement("button");
    boton_l.classList.add("btn-buy");
    boton_l.type="button";
    var att3 = document.createAttribute("data-toggle");
    att3.value = "modal";
    boton_l.setAttribute("data-toggle", "modal");
    var att4 = document.createAttribute("data-target");
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

    var carta = document.createElement("div");
    carta.classList.add("card");

    var caja = document.createElement("div");
    caja.classList.add("box");

    var contenido = document.createElement("div");
    contenido.classList.add("content");

    var titulo = document.createElement("h3");
    titulo.innerText = titol;

    var boton = document.createElement("a");
    boton.classList.add("position-absolute");
    boton.classList.add("bottom-0");
    boton.classList.add("start-50");
    boton.classList.add("translate-middle-x");
    boton.href = "#why";
    boton.innerText = "Mas información";
    var att = document.createAttribute("data-toggle");
    att.value = "modal";
    boton.setAttribute("data-toggle", "modal");


    var imagen = document.createElement("img");
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

        var promise = hero.querySelector('video').play();

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

        var div = hero.createElement("div");
        div.innerHtml = "Backup message shown if the browser does not support the video tag.";

    }
}




/* Start Carrousel */

function carrr(){

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
