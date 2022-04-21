/* start JSON */

var dades_internes= [];

cargarDades();


  


function cargarDades() {

    var xmlhttp = new XMLHttpRequest();
    var url = "assets/js/cabrera.json";


    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            dades = JSON.parse(xmlhttp.responseText);
            for (var i = 0; i < dades.length; i++) {

                if (dades[i].type == "Place"){

                    dades_internes.push(dades[i]);

                }
            }

            crear_portfoli_lugares();
            
        }
    };
     
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function crear_portfoli_lugares() {
         
    for (var i = 0; i < dades_internes.length; i++) {

        crearCarta(dades_internes[i].name, dades_internes[i].photo.caption.contentURL);
        
    }
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
/* jQuery(document).ready(function () {

    new WOW().init();

    $('#carousel-example').on('slide.bs.carousel', function (e) {

         */
/*
    CC 2.0 License Iatek LLC 2018 - Attribution required
*/
/*         var $e = $(e.relatedTarget);
        var idx = $e.index();
        var itemsPerSlide = 5;
        var totalItems = $('.carousel-item').length;

        if (idx >= totalItems - (itemsPerSlide - 1)) {
            var it = itemsPerSlide - (totalItems - idx);
            for (var i = 0; i < it; i++) {
                // append slides to end
                if (e.direction == "left") {
                    $('.carousel-item').eq(i).appendTo('.carousel-inner');
                }
                else {
                    $('.carousel-item').eq(0).appendTo('.carousel-inner');
                }
            }
        }
    });
}); */
/* End Carrousel */
