let dades_internes = [];
let dades_privades = [];
let dades_externes = [];
let comentaris = [];
let events_externs;

let dades_p = []; /* desuso */
let dades; /* desuso */
let dades_comentaris; /* desuso */


async function getJSONFile() {
    // lo guarda en la memoria principal (RAM)
    let response = await fetch("assets/js/cabrera.JSON");
    let data = await response.json();
    dades_internes = data;

    let response2 = await fetch("assets/js/historia.json");
    let data2 = await response2.json();
    dades_privades = data2;

}

/* async function carregacomentaris() {
    let response4 = await fetch("https://comentaris.000webhostapp.com/comentaris.JSON");
    let data4 = await response4.json();
    comentaris = [];
    comentaris = data4;

} */


window.onload = async function () {

    await getJSONFile(); //Carrega les dades de la pagina web
    carregacomentaris(); //Carrega els comentaris
    heroVideo(); //Posa el video de l'inici
    crear_portfoli_lugares(); //Crea la seccio de llocs
    carousel_itineraris(); //Crea la seccio d' itinerairs
    carrusel(); // Crea el carrousel on van els itineraris
    crear_hist(); // Crea la finestra modal on es localitza la informacio de la historia

    carregaDades(); // Carrega les dades externes (Calendari d' events)
    /* init_calendar(); */
    //carregacomentaris();
    /* banner_comentarios();  */// Carrega la seccio comentaris
    enviar_comentario(); // posa el lissener que envia els comentaris

};



/*Carrega les dades del JSON extern*/
function carregaDades() {

    let xmlhttp = new XMLHttpRequest();
    let url = "https://mallorcaevents.web.app/assets/js/events.json";

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

            dades = JSON.parse(xmlhttp.responseText);

            for (let i = 0; i < dades.length; i++) {

                dades_externes.push(dades[i]);

            }

            init_calendar();
            /* events_externs = ompleix_calendari(); */

        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

/*Carrega Comentaris*/
function carregacomentaris() {

    let xmlhttp = new XMLHttpRequest();
    let url = "https://comentaris.000webhostapp.com/comentaris.JSON";
    comentaris = [];

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

            dades_comentaris = JSON.parse(xmlhttp.responseText);

            for (let i = 0; i < dades_comentaris.length; i++) {

                comentaris.push(dades_comentaris[i]);

            }

            banner_comentarios();
            console.log(comentaris);
        }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

/* Mete las tarjetas de lugares dentro de contenedor */
function crear_portfoli_lugares() {
    for (let i = 0; i < dades_internes.length; i++) {

        if (dades_internes[i].type == "Place") {

            crearCarta(i);
        }
    }
}

/* Mete los itinerarios dentro del carrousel */
function carousel_itineraris() {

    for (let i = 0; i < dades_internes.length; i++) {
        if (dades_internes[i].type == "Itinerari") {
            crearItem(i);
        }
    }
}

/* Crea el contenedor de historia y mete los distintos elementos */
function crear_hist() {

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

        crear_elemento_hist((i % 2 == 0), dades_privades[i].photo.caption.contentURL, dades_privades[i].titulo, dades_privades[i].description, c_ventana);

    }

}

/* Crea los elementos de itinerarios */
function crearItem(id) {

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
    titulo.innerText = dades_internes[id].name;

    let imagen = document.createElement("img");
    imagen.src = dades_internes[id].photo.caption.contentURL;
    imagen.classList.add("imagebox");
    imagen.alt = "";

    let boton = document.createElement("div");
    boton.classList.add("btn-wrap");

    let boton_l = document.createElement("button");
    boton_l.classList.add("btn-buy");
    boton_l.type = "button";

    boton_l.addEventListener("click", e => {
        e.preventDefault();
        rellenar_plantilla_itinerarios(id);
    });

    let att3 = document.createAttribute("data-toggle");
    att3.value = "modal";
    boton_l.setAttribute("data-toggle", "modal");

    let att4 = document.createAttribute("data-target");
    att4.value = "#modal_itinerarios";
    boton_l.setAttribute("data-target", "#modal_itinerarios");


    boton_l.innerText = "Mas información";


    boton.appendChild(boton_l);
    carta.appendChild(titulo);
    carta.appendChild(imagen);
    carta.appendChild(boton);
    columna.appendChild(carta);
    item.appendChild(columna);
    carousel.prepend(item);

}

/* Funcion que crea cartas de los lugares a visitar */
function crearCarta(id) {

    let carta = document.createElement("div");
    carta.classList.add("card");

    let caja = document.createElement("div");
    caja.classList.add("box");

    let contenido = document.createElement("div");
    contenido.classList.add("content");

    let titulo = document.createElement("h3");
    titulo.innerText = dades_internes[id].name;

    let boton = document.createElement("button");
    boton.classList.add("position-absolute");
    boton.classList.add("bottom-0");
    boton.classList.add("start-50");
    boton.classList.add("translate-middle-x");
    boton.type = "button";

    boton.addEventListener("click", e => {
        e.preventDefault();
        rellenar_plantilla_lugares(id);
    });

    let att3 = document.createAttribute("data-toggle");
    att3.value = "modal";
    boton.setAttribute("data-toggle", "modal");

    let att4 = document.createAttribute("data-target");
    att4.value = "#modal_lugares";
    boton.setAttribute("data-target", "#modal_lugares");

    boton.innerText = "Mas información";

    let imagen = document.createElement("img");
    imagen.src = dades_internes[id].photo.caption.contentURL;
    imagen.classList.add("imagebox");
    imagen.alt = "";

    contenido.appendChild(titulo);
    contenido.appendChild(boton);
    contenido.appendChild(imagen);
    caja.appendChild(contenido);
    carta.appendChild(caja);

    let c_padre = document.querySelector("#cartas_lugares");
    c_padre.appendChild(carta);

}

/* Crea los elementos de historia */
function crear_elemento_hist(e_par, himg, htitulo, htexto, c_padre) {

    let contenedor = document.createElement("div");
    contenedor.classList.add("row");
    contenedor.classList.add("content");

    let c_imagen = document.createElement("div");
    if (e_par == true) {
        c_imagen.classList.add("col-md-4");
    } else {
        c_imagen.classList.add("col-md-4");
        c_imagen.classList.add("order-1");
        c_imagen.classList.add("order-md-2");
    }

    let att = document.createAttribute("data-aos");
    if (e_par == true) {
        att.value = "fade-right";
        c_imagen.setAttribute("data-aos", "fade-right");
    } else {
        att.value = "fade-left";
        c_imagen.setAttribute("data-aos", "fade-left");
    }

    let imagen = document.createElement("img");
    imagen.src = himg;
    imagen.classList.add("imagebox");
    imagen.classList.add("img-fluid");
    imagen.alt = "";

    let contenedor_texto = document.createElement("div");
    if (e_par == true) {
        contenedor_texto.classList.add("col-md-8");
        contenedor_texto.classList.add("pt-4");
    } else {
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
}
/* end JSON */

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
function carrusel() {

    $('.owl-carousel').owlCarousel({

        /* loop: true,*/
        /* center: true, */
        /* callbacks: true, */

        rewind: true,
        stagePadding: 0,
        autoWidth: true,
        nav: true,
        navText: ["<div class='nav-button owl-prev'><div class=\"icon\"><i class=\"bi bi-chevron-compact-left\"></i></div></div>", "<div class='nav-button owl-next'><div class=\"icon\"><i class=\"bi bi-chevron-compact-right\"></i></div></div>"],
        margin: 0,
        items: 1,

        responsive: {
            0: {
                /* items: 1, */
                center: true,
            },
            600: {
                /* items: 2, */
                center: true,
            },
            1000: {
                /* items: 3, */
            }
        }
    })
}
/* End carousel */

/* Start Plantilla Ventana Modal */

/* Actualiza la ventana modal, usa una plantilla que llena con los elementos del JSON */
function rellenar_plantilla_itinerarios(id) {

    const plantilla_it = document.querySelector("#plantilla_itinerarios");
    const container_it = document.querySelector("#info-dinamica-itinerarios");
    const cuerpoAnterior_it = container_it.querySelector("#bloq_it");

    if (cuerpoAnterior_it !== null) {
        container_it.removeChild(cuerpoAnterior_it);
    }

    plantilla_clone_it = plantilla_it.content.cloneNode(true);
    plantilla_clone_it.querySelector(".desc_it").innerText = dades_internes[id].description;
    plantilla_clone_it.querySelector("#titulo_it").innerText = dades_internes[id].name;
    plantilla_clone_it.querySelector("#img_it").src = dades_internes[id].photo.caption.contentURL;
    plantilla_clone_it.querySelector("#corazon_it").addEventListener("click", tog_corazon_it, false);

    container_it.appendChild(plantilla_clone_it);


    var cz_btn = document.getElementById("it_fav_btn");


    cz_btn.addEventListener("click", e => {

        let item = localStorage.getItem(dades_internes[id].name)

        if (item == null || item == 0) {
            localStorage.setItem(dades_internes[id].name, 1);
        } else {
            localStorage.setItem(dades_internes[id].name, 0);
            localStorage.removeItem(dades_internes[id].name);
        }
    });

    /* Miramos si esta en local storage */
    if (localStorage.getItem(dades_internes[id].name)) {
        /* Cambiamos el color a rojo */
        var cz = document.getElementById("corazon_it");
        $(cz).toggleClass("fav_heart fav_heart-des");
    }

    nuevoItinerario(id);
}

function tog_corazon_it() {
    var cz = document.getElementById("corazon_it");
    $(cz).toggleClass("fav_heart fav_heart-des");
}

function rellenar_plantilla_lugares(id) {
    const plantilla_lg = document.querySelector("#plantilla_lugares")
    const container_lg = document.querySelector("#info-dinamica-lugares")
    const cuerpoAnterior_lg = container_lg.querySelector("#bloq_lg")

    if (cuerpoAnterior_lg !== null) {
        container_lg.removeChild(cuerpoAnterior_lg);
    }

    plantilla_clone_lg = plantilla_lg.content.cloneNode(true)
    plantilla_clone_lg.querySelector(".desc_lg").innerText = dades_internes[id].description;
    plantilla_clone_lg.querySelector("#titulo_lg").innerText = dades_internes[id].name;
    plantilla_clone_lg.querySelector("#img_lg").src = dades_internes[id].photo.caption.contentURL;
    plantilla_clone_lg.querySelector("#corazon_lg").addEventListener("click", tog_corazon_lg, false);

    container_lg.appendChild(plantilla_clone_lg);

    let lugar = { lat: dades_internes[id].geo.latitude, lng: dades_internes[id].geo.longitude };

    // The map, centered at place
    let map = new google.maps.Map(document.getElementById("map_lg"), {
        zoom: 14,
        center: lugar,
    });
    // The marker, positioned at place
    let marker = new google.maps.Marker({
        position: lugar,
        map: map,
    });

    var cz_btn = document.getElementById("lg_fav_btn");


    cz_btn.addEventListener("click", e => {

        let item = localStorage.getItem(dades_internes[id].name)

        if (item == null || item == 0) {
            localStorage.setItem(dades_internes[id].name, 1);
        } else {
            localStorage.setItem(dades_internes[id].name, 0);
            localStorage.removeItem(dades_internes[id].name);
        }

    });

    /* Miramos si esta en local storage */
    if (localStorage.getItem(dades_internes[id].name)) {
        /* Cambiamos el color a rojo */
        var cz = document.getElementById("corazon_lg");
        $(cz).toggleClass("fav_heart fav_heart-des");
    }
}

function tog_corazon_lg() {
    var cz = document.getElementById("corazon_lg");
    $(cz).toggleClass("fav_heart fav_heart-des");
}
/* End Plantilla ventana modal */

/* Start API maps */
function initMap() {
    // The location of Uluru
    let cabrera = { lat: 39.141944, lng: 2.945833 };

    // The map, centered at Uluru
    let map = new google.maps.Map(document.getElementById("map_cabrera"), {
        zoom: 8,
        center: cabrera,
    });
    // The marker, positioned at Uluru
    const marker = new google.maps.Marker({
        position: cabrera,
        map: map,
    });
}

function displayRoute(origin, destination, service, display, id) {
    service
        .route({
            origin: origin,
            destination: destination,
            waypoints: dades_internes[id].waypoints,
            travelMode: google.maps.TravelMode.WALKING,
            avoidTolls: true,
        })
        .then((result) => {
            display.setDirections(result);
        })
        .catch((e) => {
            alert("Could not display directions due to: " + e);
        });
}

function nuevoItinerario(id) {

    let cabrera = { lat: 39.141944, lng: 2.945833 };

    const map = new google.maps.Map(document.getElementById("map_it"), {
        zoom: 14,
        center: cabrera, // caberera
    });

    let directionsService = new google.maps.DirectionsService();
    let directionsRenderer = new google.maps.DirectionsRenderer({
        /* draggable: false, */
        map: map,
        zIndex: 0,
    });

    displayRoute(
        { lat: dades_internes[id].start.latitude, lng: dades_internes[id].start.longitude },
        { lat: dades_internes[id].end.latitude, lng: dades_internes[id].end.longitude },
        directionsService,
        directionsRenderer,
        id
    );
}
/* End API maps */

/* API Tiempo */
function generateIcon(data) {
    var icon;
    switch (data) {
        case "cielo claro":
            icon = "bi bi-sun";
            break;
        case "algo de nubes":
        case "nubes dispersas":
            icon = "bi bi-cloud-sun";
            break;
        case "nubes":
            icon = "bi bi-cloud";
            break;
        case "muy nuboso":
            icon = "bi bi-clouds";
            break;
        case "lluvia ligera":
        case "lluvia moderada":
            icon = "bi bi-cloud-drizzle";
            break;
        case "lluvia":
            icon = "bi bi-cloud-lightning-rain";
            break;
        case "thundetormentarstorm":
            icon = "bi bi-cloud-lightning";
            break;
        case "nieve":
            icon = "bi bi-cloud-snow";
            break;
        case "niebla":
            icon = "bi bi-cloud-fog2";
            break;
        default:
            icon = "bi bi-emoji-dizzy";
            break;
    }
    return icon;
}

function tempConverter(kelvin) {
    return Math.round(kelvin - 273.15);
}

function getDate(day) {
    var date = new Date(new Date().getTime() + day * 60 * 60 * 1000);
    return date.toLocaleDateString();
}

function handleData(arr) {
    var now = 0;
    var day = 0;
    var data;
    for (var i = 0; i <= 4; i++) {
        data = arr[now];
        $(".day-" + i + " h5").text(getDate(day));
        $("#day-" + i + "-icon").removeClass("wi-na");
        $("#day-" + i + "-icon").addClass(generateIcon(data.weather[0].description));
        $("#day-" + i + "-temp").text(tempConverter(data.main.temp));
        day += 24;
        now += 8;
    }
}

$(document).ready(function () {
    navigator.geolocation.getCurrentPosition(function (position) {
        $.ajax({
            url: 'https://api.openweathermap.org/data/2.5/forecast?lat=39.141550974876765&lon=2.9450440259637793&lang=es&appid=77f1ce5bc50c86aff883be3e0caf2d7b',
            success: function (data) {
                handleData(data.list);
                /* $("#contry").text(data.city.country + "__" + data.city.name); */
                $("#desc").text(data.list[0].weather[0].description);
                $('input').on('change', function () {
                    var temps = $("[id$=temp]");
                    var c = temps[0].textContent;
                    $.each(temps, function (i, val) {
                        var c = temps[i].textContent;
                        if ($("#pure-toggle-4").is(':checked')) {
                            $("[id=day-" + i + "-temp]").text(Math.round((c - 32) * (5 / 9)));
                        } else {
                            $("[id=day-" + i + "-temp]").text(Math.round(c * (9 / 5) + 32));
                        }
                    });
                });
            },
            cache: true
        });
    });
});
/* End API Tiempo */

/* API calendario */

function init_calendar() {

    var initialLocaleCode = 'es';
    var localeSelectorEl = document.getElementById('locale-selector');
    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',

        locale: initialLocaleCode,
        events: ompleix_calendari()
    });
    calendar.render();

    // build the locale selector's options
    calendar.getAvailableLocaleCodes().forEach(function (localeCode) {
        var optionEl = document.createElement('option');
        optionEl.value = localeCode;
        optionEl.selected = localeCode == initialLocaleCode;
        optionEl.innerText = localeCode;
        localeSelectorEl.appendChild(optionEl);
    });

    // when the selected option changes, dynamically change the calendar option
    localeSelectorEl.addEventListener('change', function () {
        if (this.value) {
            calendar.setOption('locale', this.value);
        }
    });

}

function ompleix_calendari() {

    let res = {};
    let eventos = [];
    let evento;

    for (let i = 0; i < dades_externes.length; i++) {

        if (dades_externes[i].location == "Cabrera") {

            res.title = dades_externes[i].name;
            res.start = dades_externes[i].startDate;
            res.end = dades_externes[i].endDate;
           
            res.url = "https://fullcalendar.io/docs/event-object";
            /* res.display = 'background'; */
           /*  res.textColor = 'red' */
           /* res.display = 'block' */
          /*  res.eventClick = function(info){
               console.log("hi");
               alert("hi");
           } */
            eventos.push(res);
            res = {};
        }
    }

    return eventos;
}

/* End API Calendario */

/* Comentarios Start */

function item_comentario(id) {

    let contenedor_padre = document.querySelector("#slider_coment");
    let contenedor_coment = document.createElement("div");
    contenedor_coment.classList.add("swiper-slide");

    let string_template = `
    <div class="testimonial-item">
        <div class="testimonial-img" alt="">${comentaris[id].name.substr(0, 2)}</div>
        <h3>${comentaris[id].name}</h3>
        <p>
            <i class="bx bxs-quote-alt-left quote-icon-left"></i>
            ${comentaris[id].description}
            <i class="bx bxs-quote-alt-right quote-icon-right"></i>
        </p>
    </div>`;

    contenedor_coment.innerHTML = string_template;
    contenedor_padre.appendChild(contenedor_coment);

}

function banner_comentarios() {

    let contenedor_padre = document.querySelector("#slider_coment");
    contenedor_padre.innerHTML = "";
    let start;
    let stop;
    console.log(comentaris.length);
    if (comentaris.length < 8) {
        stop = comentaris.length;
        start = 0;
    } else {
        stop = Math.floor((Math.random() * (comentaris.length - 10)) + 10)
        start = stop - 10;
    }

    for (let index = start; index < stop; index++) {

        item_comentario(index);
    }
}

function enviar_comentario(){

    let limpiar = document.querySelector("#boton_enviar");
    let form = document.querySelector('#form_coment');

    limpiar.addEventListener("click", e => {
        e.preventDefault();
        if (valid_form(e)) {
            form.submit();
            form.reset();
            carregacomentaris();
        }
    });

}

function valid_form(evento){
    evento.preventDefault();
    var nombre = document.getElementById('name').value;
    if(nombre.length == 0) {
      alert('No has escrito nada en el nombre');
      return false;
    }
    var coment = document.getElementById('message').value;
    if (coment.length < 6) {
      alert('El comentario es demasiado corto');
      return false;
    }
    alert('Comentario enviado');
    return true;
  }

/* End Comentarios */