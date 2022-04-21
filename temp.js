var dades;
var datosFiltrados = [];
var datosBuscados = [];


cargarDades(0);

function dadesRestaurantExt(filtrado) {
    var xmlhttp2 = new XMLHttpRequest();
    var url2 = "https://bares-mallorca.netlify.app/data.json";
    xmlhttp2.onreadystatechange = function () {
        if (xmlhttp2.readyState == 4 && xmlhttp2.status == 200) {
            var dadesExt = JSON.parse(xmlhttp2.responseText);
            for (var i = 0; i < dadesExt.length; i++) {
                if (dadesExt[i].tipus == "vegetariano") {
                    dades.push(dadesExt[i]);
                }
            }
            Cercador(filtrado);  // restaurantes
        }
    };
    xmlhttp2.open("GET", url2, true);
    xmlhttp2.send();
}

function dadesFiresExt(filtrado) {
    var xmlhttp2 = new XMLHttpRequest();
    var url2 = "https://fires-mallorca.netlify.app/jsonBase_1.json";
    xmlhttp2.onreadystatechange = function () {
        if (xmlhttp2.readyState == 4 && xmlhttp2.status == 200) {
            dadesExt = JSON.parse(xmlhttp2.responseText);
            for (var i = 0; i < dadesExt.length; i++) {
                if (dadesExt[i].tipus == "Vegeteriana") {
                    dades.push(dadesExt[i]);
                }
            }
            Cercador(filtrado);  // fires (o informacio)
        }
    };
    xmlhttp2.open("GET", url2, true);
    xmlhttp2.send();
}


function cargarDades(filtrado) {
    var xmlhttp = new XMLHttpRequest();
    var url = "dades.json";
    // leemos nuestros datos
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            dades = [];
            var tot = JSON.parse(xmlhttp.responseText);
            var urlweb = location.search //agafa de la url on hem clicat a partir del '?' inclòs
            var id = urlweb.replace("?", "")
            // Caso de favoritos (local storage)
            if (id == "favorits") {
                var favoritos = localStorage.getItem("favoritos") || "[]";
                favoritos = JSON.parse(favoritos);
                // para cada producto en favoritos
                for (var j = 0; j < tot.length; j++) {
                    for (var x = 0; x < favoritos.length; x++) {
                        if ((favoritos[x].id == tot[j].nom)) {
                            dades.push(tot[j]);
                        }
                    }
                }
                var xmlhttp2 = new XMLHttpRequest();
                var url2 = "https://bares-mallorca.netlify.app/data.json";
                xmlhttp2.onreadystatechange = function () {
                    if (xmlhttp2.readyState == 4 && xmlhttp2.status == 200) {
                        var dadesExt = JSON.parse(xmlhttp2.responseText);
                        for (var j = 0; j < dadesExt.length; j++) {
                            for (var x = 0; x < favoritos.length; x++) {
                                if ((favoritos[x].id == dadesExt[j].nom)) {
                                    dades.push(dadesExt[j]);
                                }
                            }
                        }
                        var xmlhttp3 = new XMLHttpRequest();
                        var url3 = "https://fires-mallorca.netlify.app/jsonBase_1.json";
                        xmlhttp3.onreadystatechange = function () {
                            if (xmlhttp3.readyState == 4 && xmlhttp3.status == 200) {
                                dadesExt2 = JSON.parse(xmlhttp3.responseText);
                                for (var j = 0; j < dadesExt2.length; j++) {
                                    for (var x = 0; x < favoritos.length; x++) {
                                        if ((favoritos[x].id == dadesExt2[j].nom)) {
                                            dades.push(dadesExt2[j]);
                                        }
                                    }
                                }
                                Cercador(filtrado);   // favoritos
                            }
                        };
                        xmlhttp3.open("GET", url3, true);
                        xmlhttp3.send();
                    }
                };
                xmlhttp2.open("GET", url2, true);
                xmlhttp2.send();

            } else if (id != "fira" && id != "informacio") {  // restaurante, info, curso, supermercado
                for (var i = 0; i < tot.length; i++) {
                    if (id == tot[i].tipus) {
                        dades.push(tot[i]);
                    }
                }
                // leemos los restaurantes de dilpreet  si son vegetarianos
                if (id == "restaurant") {
                    dadesRestaurantExt(filtrado)
                }
            } else if (id == "informacio") { // añadimos curs, fires y info
                for (var i = 0; i < tot.length; i++) {
                    if (tot[i].tipus == "curs" || tot[i].tipus == "info") {
                        dades.push(tot[i]);
                    }
                }
                id = "fira"; // para que luego también haga los datos de miquel
            }

            if (id == "fira") { // fires, si salimos de informacio, también añadimos les fires de miquel
                dadesFiresExt(filtrado)
            }

            // caso de supermercados, info, cursos (porque en restaurante hacemos la llamada
            if (id != "restaurant" && id != "fira" && id != "informacio" && id != "favorits") {
                Cercador(filtrado);
            }
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}


/* MAPA */
mapboxgl.accessToken = 'pk.eyJ1IjoiYXNob29rMDA3IiwiYSI6ImNrbnZ4bGg3bzByMTcydnFucWdpcGx6bWEifQ.jHKo86UYDX6fcEVz_VoHZQ';
var map = new mapboxgl.Map({
    container: 'mapid', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [2.942477242579887, 39.63623814828035], // starting position [lng, lat]
    zoom: 9 // starting zoom
});
map.on('idle', function () {
    map.resize()
});
map.scrollZoom.disable();
map.addControl(new mapboxgl.NavigationControl());
// Add geolocate control to the map.
map.addControl(new mapboxgl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
    trackUserLocation: true
})
);

var marker;




const searchWrapper = document.querySelector(".search-container");
if (searchWrapper != null) {
    const inputBox = searchWrapper.querySelector("input");
    const suggBox = searchWrapper.querySelector(".autocom-box");
    const icon = searchWrapper.querySelector(".icon");

    // si se pulsa enter reacciona igual que si clicas el botón de buscar:

    inputBox.addEventListener('keyup', function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            icon.click();
        }
    });

    inputBox.addEventListener('keyup', (e) => {
        let userData = e.target.value; //user enetered data
        if (userData) {
            const searchString = e.target.value.toLowerCase();
            datosBuscados = dades.filter((element) => {
                return (
                    element.nom.toLowerCase().includes(searchString)
                )
            });
            var rellenarHTML = [];
            for (var i = 0; i < datosFiltrados.length; i++) {
                for (var j = 0; j < datosBuscados.length; j++) {
                    if (datosFiltrados[i].nom == datosBuscados[j].nom) {
                        rellenarHTML.push('<li> <a class="portfolio-link" data-toggle="modal" data-target="#myModal" onclick="desplegable('
                         + i + ');"</a>' + datosFiltrados[i].nom + '</li>')
                    }
                }
            }
            searchWrapper.classList.add("active"); //show autocomplete box
            mostrarSugerits(rellenarHTML, inputBox, suggBox);
            icon.onclick = () => {
                $("#galeriaPortfoli").html("");
                datosFiltrados = datosBuscados;
                var urlweb = location.search //agafa de la url on hem clicat a partir del '?' inclòs
                var id = urlweb.replace("?", "")
                addElement(id);
                searchWrapper.classList.remove("active"); //hide autocomplete box
                $("#myInput").html("");
                document.getElementById('myInput').value = '';
            }

        } else {
            searchWrapper.classList.remove("active"); //hide autocomplete box
        }
    });
}

function mostrarSugerits(list, inputBox, suggBox) {
    let listData;
    if (!list.length) {
        userValue = inputBox.value;
        listData = '<li>' + userValue + '</li>';
    } else {
        listData = list.join('');
    }
    suggBox.innerHTML = listData;
}

/* BOTÓN DE SCROLL HACIA ARRIBA */

var mybutton = document.getElementById("myBtn");
// si baja 150px
window.onscroll = function () { scrollFunction() };
function scrollFunction() {
    if (document.body.scrollTop > 150 || document.documentElement.scrollTop > 150) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

/* FILTRADO */
function Cercador(filtrado) {
    var urlweb = location.search //agafa de la url on hem clicat a partir del '?' inclòs
    var id = urlweb.replace("?", "")
    $("#titolPortfoli").html("")
    $("#descPortfoli").html("")
    switch (id) {
        case "restaurant":
            $("#titolPortfoli").append("Restaurants")
            $("#descPortfoli").append("Aquí trobàs la millor secció de restaurants que tenen opcions veganes o vegetarianes.")
            break;
        case "supermercat":
            $("#titolPortfoli").append("Supermercats")
            $("#descPortfoli").append("Selecció de supermercats i petits comerços que ofereixen productes ecològics.")
            break;
        case "favorits":
            $("#titolPortfoli").append("Favorits")
            $("#descPortfoli").append("Conjunt de restaurants i supermercats favorits.")
            break;
        case "curs":
            $("#headingInfo").append("CURSOS")
            $("#subHeadingInfo").append("Troba aquí una petita selecció de cursos online i presencials vegetarians o vegans")
            break;
        case "info":
            $("#headingInfo").append("DADES INTERESSANTS")
            $("#subHeadingInfo").append("No et perdis les darreres notícies.")
            break;
        case "fira":
            id = "Vegeteriana";
            $("#headingInfo").append("FIRES VEGETARIANES I VEGANES DE L'ILLA")
            $("#subHeadingInfo").append("Descobreix l'illa visitant aquestes fires.")
            break;
        case "informacio":
            $("#headingInfo").append("MÉS INFORMACIÓ RELLEVANT")
            $("#subHeadingInfo").append("Segueix descobrint visitant les fires de l'illa, diferents cursos i tot un conjunt de curiositats.")
            break;
    }
    filtrar(id, filtrado);
    addElement(id);
}

function filtrar(id, filtrado) {
    datosFiltrados = [];
    if (id == "restaurant" || id == "favorits" || id == "supermercat") {
        if (filtrado == 0) { // predeterminado        ya esta hecho en  cargarDades      
            datosFiltrados = dades;
        } else if (filtrado == 1) { //Més valorades
            for (var i = 0; i < dades.length; i++) {
                var idPuntuacio = 0;
                var puntuacioAnterior = 0;
                //mira qué actividad és la siguiente con más puntuación
                for (var j = 0; j < dades.length; j++) {
                    if (dades[j].puntuacio >= puntuacioAnterior && !datosFiltrados.includes(dades[j])) {
                        idPuntuacio = j;
                        puntuacioAnterior = dades[j].puntuacio;
                    }
                }

                datosFiltrados.push(dades[idPuntuacio]);
            }
        } else if (filtrado == 2) { //Preu decreixent
            for (var i = 0; i < dades.length; i++) {
                var idPreuA = 0;
                var preuAAnterior = 0;
                //mira qué actividad és la siguiente con más puntuación
                for (var j = 0; j < dades.length; j++) {
                    var preu = dades[j].preu.import;
                    preu = preu.replace(" €", "");
                    preu = parseFloat(preu); //Convierto el String a Int
                    if (preu >= preuAAnterior && !datosFiltrados.includes(dades[j])) {
                        idPreuA = j;
                        preuAAnterior = preu;
                    }
                }
                datosFiltrados.push(dades[idPreuA]);
            }
        } else if (filtrado == 3) { //Preu ascendent
            for (var i = 0; i < dades.length; i++) {
                var idPreuD = 0;
                var preuDAnterior = 1000;
                //mira qué actividad és la siguiente con más puntuación
                for (var j = 0; j < dades.length; j++) {
                    var preu = dades[j].preu.import;
                    preu = preu.replace(" €", "");
                    preu = parseFloat(preu); //Convierto el String a Int
                    if (preu < preuDAnterior && !datosFiltrados.includes(dades[j])) {
                        idPreuD = j;
                        preuDAnterior = preu;
                    }
                }
                datosFiltrados.push(dades[idPreuD]);
            }
        }
    } else { // fira, curs, info, vegetariana  o informacio Timeline
        datosFiltrados = dades;
    }
    $("#galeriaPortfoli").html("");
}

//Afegir elements al portfoli de restaurants o supermercats
function addElement(id) {
    var infoElements = []; //array que contiene toda la web semantica de las ** filtradas
    var contador = 0;
    for (var i = 0; i < datosFiltrados.length; i++) {
        if (id == "informacio") {  // timeline
            contador++
            if (contador % 2) {
                var newLi = document.createElement("li")
            } else {
                var newLi = document.createElement("li")
                newLi.setAttribute('class', "timeline-inverted")
            }

            var newDiv = document.createElement("div")  // crea un nuevo div
            newDiv.setAttribute('class', "timeline-image image-cropper-circle ")
            newDiv.setAttribute('data-toggle', "modal")
            newDiv.setAttribute('data-target', "#myModal");
            newDiv.setAttribute('onclick', "desplegable(" + i + ");");
            newLi.appendChild(newDiv)//añade texto al div creado.

            var newimg = document.createElement("img");   // crea un nuevo div
            newimg.setAttribute('class', "rounded-circle img-fluid")
            newimg.setAttribute('src', datosFiltrados[i].imatges[0]) // datos[i].imatges[0]
            newimg.setAttribute('alt', "")
            newDiv.appendChild(newimg)

            var newDiv1 = document.createElement("div")  // crea un nuevo div
            newDiv1.setAttribute('class', "timeline-panel")
            newLi.appendChild(newDiv1)//añade texto al div creado.

            var newDiv2 = document.createElement("div")  // crea un nuevo div
            newDiv2.setAttribute('class', "timeline-heading")
            newDiv2.setAttribute('data-toggle', "modal")
            newDiv2.setAttribute('data-target', "#myModal");
            newDiv2.setAttribute('onclick', "desplegable(" + i + ");");
            newDiv1.appendChild(newDiv2)//añade texto al div creado.

            var newh4 = document.createElement("h4")
            var newContent = document.createTextNode(datosFiltrados[i].nom); //nom Rest datos[i].nom
            newh4.appendChild(newContent)
            newDiv2.appendChild(newh4)

            var newh4_2 = document.createElement("h4")
            newh4_2.setAttribute('class', "subheading")
            var newContent2 = document.createTextNode(datosFiltrados[i].calendari.startDataEvent);
            newh4_2.appendChild(newContent2)
            newDiv2.appendChild(newh4_2)

            var newDiv3 = document.createElement("div")  // crea un nuevo div
            newDiv3.setAttribute('class', "timeline-body")
            newDiv3.setAttribute('data-toggle', "modal")
            newDiv3.setAttribute('href', "#portfolioModal1")
            newDiv1.appendChild(newDiv3)//añade texto al div creado.

            var newp = document.createElement("p")
            newp.setAttribute('class', "text-muted")
            newp.setAttribute('class', "p-justificado")
            var newContent3 = document.createTextNode(datosFiltrados[i].descripcio); //«Va a haber stands de comida vegana, y el domingo haremos unconcurso, además de platos condimentados y talleres, haremos charlas para explicar qué significa ser vegano y como vive un vegano».
            newp.appendChild(newContent3)
            newDiv3.appendChild(newp)


            // añade el elemento creado y su contenido al DOM
            $("#timeLineInfo").append(newLi);

        } else { // portfolio
            if (datosFiltrados[i].tipus == "restaurant" || datosFiltrados[i].tipus == "supermercat" || datosFiltrados[i].tipus == "vegetariano") {
                infoElements[i] = generarJsonLDElement(datosFiltrados[i]); //Web semantica
            }
            var newDiv = document.createElement("div");   // crea un nuevo div
            newDiv.setAttribute('class', "col-lg-4 col-sm-6 mb-4") // definim atributs
            newDiv.setAttribute('id', "elemento-" + i)

            var newDiv1 = document.createElement("div");
            newDiv1.setAttribute('class', "portfolio-item")
            newDiv.appendChild(newDiv1); //afegim node newDiv1 com a fill del pare newDiv

            var newa1 = document.createElement("a");
            newa1.setAttribute('class', "portfolio-link");
            newa1.setAttribute('data-toggle', "modal");
            newa1.setAttribute('data-target', "#myModal");
            newa1.setAttribute('onclick', "desplegable(" + i + ");")

            newDiv1.appendChild(newa1);

            var newDiv2 = document.createElement("div");
            newDiv2.setAttribute('class', "portfolio-hover")

            newa1.appendChild(newDiv2);

            var newDiv3 = document.createElement("div");
            newDiv3.setAttribute('class', "portfolio-hover-content")

            newDiv2.appendChild(newDiv3);

            var newi = document.createElement("i");
            newi.setAttribute('class', "fas fa-plus fa-3x")

            newDiv3.appendChild(newi);

            var newimg = document.createElement("img");
            newimg.setAttribute('class', "img-fluid")
            newimg.setAttribute('src', datosFiltrados[i].imatges[0])
            newimg.setAttribute('alt', "")

            newa1.appendChild(newimg);

            var newDiv4 = document.createElement("div");
            newDiv4.setAttribute('class', "portfolio-caption")

            newDiv1.appendChild(newDiv4);

            var newDiv5 = document.createElement("div");
            newDiv5.setAttribute('class', "portfolio-caption-heading")
            var newContent = document.createTextNode(datosFiltrados[i].nom);
            newDiv5.appendChild(newContent)

            newDiv4.appendChild(newDiv5);

            var newDiv6 = document.createElement("div");
            newDiv6.setAttribute('class', "portfolio-caption-subheading text-muted")
            if (datosFiltrados[i].tipus == "Vegeteriana") {
                var newContent2 = document.createTextNode(datosFiltrados[i].geoposicionament1.city);
                newDiv6.appendChild(newContent2)
            } else {
                var newContent2 = document.createTextNode(datosFiltrados[i].geo1.city);
                newDiv6.appendChild(newContent2)
            }


            newDiv4.appendChild(newDiv6);

            // añade el elemento creado y su contenido al DOM
            $("#galeriaPortfoli").append(newDiv);
        }
    }
    cargarJsonLD(infoElements); //cargar web semantica
}

//WEB SEMANTICA
function generarJsonLDElement(element) {
    var type;
    var geoposicio;
    switch (element.tipus) {
        case "restaurant":
            type = "Restaurant"
            break
        case "supermercat":
            type = "Store"
            break
        case "vegetariano":
            type = "Restaurant"
            break
        default:
            break
    }
    let info = {
        "@context": "http://www.schema.org",
        "@type": type,
        "name": element["nom"],
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": element["geo1"]["lat"],
            "longitude": element["geo1"]["long"]
        },
        "address":
        {
            "@type": "PostalAddress",
            "addressLocality": element["geo1"]["city"],
            "addressCountry": element["geo1"]["Country"],
            "postalCode": element["geo1"]["zip"]
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "itemReviewed": "Thing",
            "bestRating": "5",
            "worstRating": "0",
            "ratingValue": element["puntuacio"],
            "reviewCount": "1"
        },
        "description": element["descripcio"],
        "image": element["imatges"][0],
        "priceRange": element["preu"]["import"],
        "telephone": element["contacte"]["telf"]
    }
    return info;
}


function cargarJsonLD(info) {
    const script = document.createElement('script');
    script.setAttribute('type', 'application/ld+json');
    script.textContent = JSON.stringify(info);
    document.head.appendChild(script);
}


/* Función para eliminar los datos del desplegable y que no aparezcan repetidos */
function eliminarDatosElemento() {
    if (marker != null){
        marker.remove();
    }
    $("#nombreElement").html(""); //limpiar la seccion
    $("#descripcioElement").html("");
    $("#carouselElement").html("");
    $("#horariElement").html("");
    $("#tiempoElemento").html("");
    $("#horarioDesplegable").html("");
    $("#horario").html("");
    $("#horariDll").html("")
    $("#horariDm").html("")
    $("#horariDx").html("")
    $("#horariDj").html("")
    $("#horariDv").html("")
    $("#horariDs").html("")
    $("#horariDg").html("")
    $("#calendar").html("")
    $("#eventNum0").html("")
    $("#eventNum1").html("")
    $("#contactoElemento").html("");
    $("#datosElemento").html("");
    $("#favorito").html("");
    $("#puntuacioPreu").html("");
    $("#enlaces").html("");
    $("#textoDesplegable").html("");

    /*parte de tiempo a continuacion*/
    for (var t = 0; t < 3; t++) {
        $("#diaSetmana" + t).html("");
        $("#actualTemp" + t).html("");
        $("#icono" + t).html("");
        $("#description" + t).html("");
        $("#temp" + t).html("");
    }
}

/* Función que rellena los datos de los desplegables */
function desplegable(i) {
    if ($("#nombreElement").html() !== null) {
        eliminarDatosElemento();
    }

    // Nombre y descripcion:
    var newTitulo = document.createElement("h2");
    newTitulo.setAttribute('class', "portfolio-caption-heading")
    var texto1 = document.createTextNode(datosFiltrados[i].nom);
    newTitulo.appendChild(texto1)

    $("#nombreElement").append(newTitulo);

    var newDescripcio = document.createElement("p");   // Añade la descripción a la ventana emergente
    newDescripcio.setAttribute('class', "item-intro text-mutedg")
    var text2 = document.createTextNode(datosFiltrados[i].descripcio);
    newDescripcio.appendChild(text2)

    $("#descripcioElement").append(newDescripcio);

    // Puntero:

    var long, lat, address;
    if (datosFiltrados[i].tipus == "supermercat" || datosFiltrados[i].tipus == "restaurant" || datosFiltrados[i].tipus == "curs" || datosFiltrados[i].tipus == "info" || datosFiltrados[i].tipus == "vegetariano") {
        long = datosFiltrados[i].geo1.long;
        lat = datosFiltrados[i].geo1.lat;
        address = datosFiltrados[i].geo1.address
    } else {
        long = datosFiltrados[i].geoposicionament1.long;
        lat = datosFiltrados[i].geoposicionament1.lat;
        address = datosFiltrados[i].geoposicionament1.address
    }

    var f
    marker = new mapboxgl.Marker()
        .setLngLat([long, lat])
        .setPopup(
            new mapboxgl.Popup({ offset: 25 })
                .setHTML(
                    '<h4>' +
                    datosFiltrados[i].nom +
                    '</h4><p>' +
                    address +
                    '</p>' +
                    '<img src="' + datosFiltrados[i].imatges[0] + '" style="height: 150px;"/>'
                )
        )
        .addTo(map);

    // Carousel:
    var newCarousel1 = document.createElement("div");
    newCarousel1.setAttribute('class', "carousel slide")
    newCarousel1.setAttribute('id', "myCarousel")
    newCarousel1.setAttribute('data-ride', "carousel")

    var newCarousel2 = document.createElement("ol");
    newCarousel2.setAttribute('class', "carousel-indicators")
    newCarousel1.appendChild(newCarousel2);

    for (var k = 0; k < datosFiltrados[i].imatges.length; k++) {
        var newCarouselLiK = document.createElement("li");
        if (k == 0) {
            newCarouselLiK.setAttribute('class', "active")
        }
        newCarouselLiK.setAttribute('data-target', "#myCarousel")
        newCarouselLiK.setAttribute('data-slide-to', k)
        newCarousel2.appendChild(newCarouselLiK);
    }

    var newCarousel3 = document.createElement("div");
    newCarousel3.setAttribute('class', "carousel-inner")
    newCarousel1.appendChild(newCarousel3);

    var newCarousel4 = document.createElement("div");
    newCarousel4.setAttribute('class', "carousel-item active")
    newCarousel3.appendChild(newCarousel4);

    var newCarouselImg1 = document.createElement("img");
    newCarouselImg1.setAttribute('class', "0-slide")
    newCarouselImg1.setAttribute('src', datosFiltrados[i].imatges[0])
    newCarouselImg1.setAttribute('alt', "0-slide")
    newCarouselImg1.setAttribute('style', "object-fit:scale-down; width:500px; height:300px")
    newCarousel4.appendChild(newCarouselImg1);

    var k = 1

    for (k; k < datosFiltrados[i].imatges.length; k++) {
        var newCarouselK = document.createElement("div");
        newCarouselK.setAttribute('class', "carousel-item")
        newCarousel3.appendChild(newCarouselK);

        var newCarouselImgK = document.createElement("img");
        newCarouselImgK.setAttribute('class', k + "-slide")
        newCarouselImgK.setAttribute('src', datosFiltrados[i].imatges[k])
        newCarouselImgK.setAttribute('alt', k + "-slide")
        newCarouselImgK.setAttribute('style', "object-fit:scale-down; width:500px; height:300px")
        newCarouselK.appendChild(newCarouselImgK);
    }

    var newCarouselA = document.createElement("a");
    newCarouselA.setAttribute('class', "carousel-control-prev")
    newCarouselA.setAttribute('href', "#myCarousel")
    newCarouselA.setAttribute('role', "button")
    newCarouselA.setAttribute('data-slide', "prev")
    newCarousel1.appendChild(newCarouselA);

    var newSpan = document.createElement("span");
    newSpan.setAttribute('class', "carousel-control-prev-icon")
    newSpan.setAttribute('aria-hidden', "true")
    newCarouselA.appendChild(newSpan);

    var newSpan1 = document.createElement("span");
    newSpan1.setAttribute('class', "sr-only")
    newSpan1.setAttribute('id', "num1-slide")
    $("#num1-slide").append("Previous")
    newCarouselA.appendChild(newSpan1);


    var newCarouselA1 = document.createElement("a");
    newCarouselA1.setAttribute('class', "carousel-control-next")
    newCarouselA1.setAttribute('href', "#myCarousel")
    newCarouselA1.setAttribute('role', "button")
    newCarouselA1.setAttribute('data-slide', "next")
    newCarousel1.appendChild(newCarouselA1);

    var newCarouselSpan2 = document.createElement("span");
    newCarouselSpan2.setAttribute('class', "carousel-control-next-icon")
    newCarouselSpan2.setAttribute('aria-hidden', "true")
    newCarouselA1.appendChild(newCarouselSpan2);

    var newCarouselSpan3 = document.createElement("span");
    newCarouselSpan3.setAttribute('class', "sr-only")
    newCarouselSpan3.setAttribute('id', "num2-slide")
    $("#num2-slide").append("Next")
    newCarouselA1.appendChild(newCarouselSpan3);

    $("#carouselElement").append(newCarousel1);


    if (datosFiltrados[i].tipus == "supermercat" || datosFiltrados[i].tipus == "restaurant" || datosFiltrados[i].tipus == "vegetariano") {

        // Disponibilidad horaria:
        var date = new Date();
        var d = date.getDay();
        var h = date.getHours();
        var m = date.getMinutes();
        var hora = h + ":" + m;
        var disponibilidad;

        // Comprueba si en este momento está abierto el local
        switch (d) {
            case 1:
                if (hora >= datosFiltrados[i].horari.di[0].in && hora <= datosFiltrados[i].horari.di[0].out) {
                    disponibilidad = document.createTextNode("Abierto");
                    $("#horario").css({ "background-color": "#B8CD65" });

                } else {
                    disponibilidad = document.createTextNode("Cerrado");
                    $("#horario").css({ "background-color": "#E99565" });
                }
                break;
            case 2:
                if (hora >= datosFiltrados[i].horari.dm[0].in && hora <= datosFiltrados[i].horari.dm[0].out) {
                    disponibilidad = document.createTextNode("Abierto");
                    $("#horario").css({ "background-color": "#B8CD65" });
                } else {
                    disponibilidad = document.createTextNode("Cerrado");
                    $("#horario").css({ "background-color": "#E99565" });
                }
                break;
            case 3:
                if (hora >= datosFiltrados[i].horari.dx[0].in && hora <= datosFiltrados[i].horari.dx[0].out) {
                    disponibilidad = document.createTextNode("Abierto");
                    $("#horario").css({ "background-color": "#B8CD65" });
                } else {
                    disponibilidad = document.createTextNode("Cerrado");
                    $("#horario").css({ "background-color": "#E99565" });
                }
                break;
            case 4:
                if (hora >= datosFiltrados[i].horari.dj[0].in && hora <= datosFiltrados[i].horari.dj[0].out) {
                    disponibilidad = document.createTextNode("Abierto");
                    $("#horario").css({ "background-color": "#B8CD65" });
                } else {
                    disponibilidad = document.createTextNode("Cerrado");
                    $("#horario").css({ "background-color": "#E99565" });
                }
                break;
            case 5:
                if (hora >= datosFiltrados[i].horari.dv[0].in && hora <= datosFiltrados[i].horari.dv[0].out) {
                    disponibilidado = document.createTextNode("Abierto");
                    $("#horario").css({ "background-color": "#B8CD65" });
                } else {
                    disponibilidad = document.createTextNode("Cerrado");
                    $("#horario").css({ "background-color": "#E99565" });
                }
                break;
            case 6:
                if (hora >= datosFiltrados[i].horari.ds[0].in && hora <= datosFiltrados[i].horari.ds[0].out) {
                    disponibilidad = document.createTextNode("Abierto");
                    $("#horario").css({ "background-color": "#B8CD65" });
                } else {
                    disponibilidad = document.createTextNode("Cerrado");
                    $("#horario").css({ "background-color": "#E99565" });
                }
                break;
            case 0:

                if (hora >= datosFiltrados[i].horari.dg[0].in && hora <= datosFiltrados[i].horari.dg[0].out) {
                    disponibilidad = document.createTextNode("Abierto");
                    $("#horario").css({ "background-color": "#B8CD65" });
                } else {
                    disponibilidad = document.createTextNode("Cerrado");
                    $("#horario").css({ "background-color": "#E99565" });
                }
                break;
        }
        $("#horario").append(disponibilidad);
        // Crea el horario desplegable:
        var pDi = document.createElement("p");
        var textDi = document.createTextNode("Dilluns: " + datosFiltrados[i].horari.di[0].in + "-" + datosFiltrados[i].horari.di[0].out + "  " + datosFiltrados[i].horari.di[1].in + "-" + datosFiltrados[i].horari.di[1].out);

        var pDm = document.createElement("p");
        var textDm = document.createTextNode("Dimarts: " + datosFiltrados[i].horari.dm[0].in + "-" + datosFiltrados[i].horari.dm[0].out + "  " + datosFiltrados[i].horari.dm[1].in + "-" + datosFiltrados[i].horari.dm[1].out);

        var pDx = document.createElement("p");
        var textDx = document.createTextNode("Dimecres: " + datosFiltrados[i].horari.dx[0].in + "-" + datosFiltrados[i].horari.dx[0].out + "  " + datosFiltrados[i].horari.dx[1].in + "-" + datosFiltrados[i].horari.dx[1].out);

        var pDj = document.createElement("p");
        var textDj = document.createTextNode("Dijous: " + datosFiltrados[i].horari.dj[0].in + "-" + datosFiltrados[i].horari.dj[0].out + "  " + datosFiltrados[i].horari.dj[1].in + "-" + datosFiltrados[i].horari.dj[1].out);

        var pDv = document.createElement("p");
        var textDv = document.createTextNode("Divendres: " + datosFiltrados[i].horari.dv[0].in + "-" + datosFiltrados[i].horari.dv[0].out + "  " + datosFiltrados[i].horari.dv[1].in + "-" + datosFiltrados[i].horari.dv[1].out);

        var pDs = document.createElement("p");
        var textDs = document.createTextNode("Dissabte: " + datosFiltrados[i].horari.ds[0].in + "-" + datosFiltrados[i].horari.ds[0].out + "  " + datosFiltrados[i].horari.ds[1].in + "-" + datosFiltrados[i].horari.ds[1].out);

        var pDg = document.createElement("p");
        var textDg = document.createTextNode("Diumenge: " + datosFiltrados[i].horari.dg[0].in + "-" + datosFiltrados[i].horari.dg[0].out + "  " + datosFiltrados[i].horari.dg[1].in + "-" + datosFiltrados[i].horari.dg[1].out);

        pDi.appendChild(textDi);
        pDm.appendChild(textDm);
        pDx.appendChild(textDx);
        pDj.appendChild(textDj);
        pDv.appendChild(textDv);
        pDs.appendChild(textDs);
        pDg.appendChild(textDg);
        //Añadimos el horario de cada día al div correspondiente con el id = respectivo
        $("#horariDll").append(pDi);
        $("#horariDm").append(pDm);
        $("#horariDx").append(pDx);
        $("#horariDj").append(pDj);
        $("#horariDv").append(pDv);
        $("#horariDs").append(pDs);
        $("#horariDg").append(pDg);

    } else if (datosFiltrados[i].tipus == "curs") {
        $("#textoDesplegable").append("Horari del curs: ");
        var newButton = document.createElement("button");
        newButton.setAttribute('onclick', "myFunction()")
        newButton.setAttribute('class', "btn btn-primary text-uppercas dropbtn")
        newButton.setAttribute('id', "calendar")
        $("#textoDesplegable").append(newButton);

        disponibilitat = document.createTextNode("Mostra horari");
        $("#calendar").css({ "background-color": "#B8CD65" });
        $("#calendar").append(disponibilitat);


        //Contingut desplegable cursos
        var diaInici = document.createElement("h6");
        var textDiaInici = document.createTextNode("Dia d'inici: ");
        diaInici.appendChild(textDiaInici);
        $("#eventNum" + 0).append(diaInici);


        var diaInici_horari = document.createElement("p");
        var text1_horari = document.createTextNode(datosFiltrados[i].calendari.startDataEvent + " a les " + datosFiltrados[i].calendari.startTimeEvent);
        diaInici_horari.appendChild(text1_horari);
        $("#eventNum" + 0).append(diaInici_horari);

        var diaFi = document.createElement("h6");
        var textDiaFi = document.createTextNode("Dia final: ");
        diaFi.appendChild(textDiaFi);
        $("#eventNum" + 1).append(diaFi);


        var diaFi_horari = document.createElement("p");
        var text2_horari = document.createTextNode(datosFiltrados[i].calendari.endDataEvent + " a les " + datosFiltrados[i].calendari.endTimeEvent);
        diaFi_horari.appendChild(text2_horari);
        $("#eventNum" + 1).append(diaFi_horari);
    } else if(datosFiltrados[i].tipus == "info"){
        
    }
    else {
        $("#textoDesplegable").append("Calendari d'events: ");
        var newButton = document.createElement("button");
        newButton.setAttribute('onclick', "myFunction()")
        newButton.setAttribute('class', "btn btn-primary text-uppercas dropbtn")
        newButton.setAttribute('id', "calendar")
        $("#textoDesplegable").append(newButton);

        disponibilitat = document.createTextNode("Mostra horari");
        $("#calendar").css({ "background-color": "#B8CD65" });
        $("#calendar").append(disponibilitat);
        for (var m = 0; m < datosFiltrados[i].dadesPropies.events.length; m++) {//datos[i].dadesPropies.events.length

            //Contingut desplegable fires
            //event 1:
            var event1 = document.createElement("h6");
            var textEvent1 = document.createTextNode(datosFiltrados[i].dadesPropies.events[m].nom);
            event1.appendChild(textEvent1);
            $("#eventNum" + m).append(event1);


            var event1_preu = document.createElement("p");
            var text2Event1 = document.createTextNode("Preu: " + datosFiltrados[i].dadesPropies.events[m].preu);
            event1_preu.appendChild(text2Event1);
            $("#eventNum" + m).append(event1_preu);

            var event1_descripcio = document.createElement("p");
            var text3Event1 = document.createTextNode(datosFiltrados[i].dadesPropies.events[m].Descripcio);
            event1_descripcio.appendChild(text3Event1);
            $("#eventNum" + m).append(event1_descripcio);

            var event1_calendar = document.createElement("p");
            var text4Event1 = document.createTextNode("Data: " + datosFiltrados[i].dadesPropies.events[m].Calendari.startDateEvent + " a les " + datosFiltrados[i].dadesPropies.events[m].Calendari.startTimeEvent + " fins dia " + datosFiltrados[i].dadesPropies.events[m].Calendari.endDateEvent + " a les " + datosFiltrados[i].dadesPropies.events[m].Calendari.endTimeEvent);
            event1_calendar.appendChild(text4Event1);
            $("#eventNum" + m).append(event1_calendar);
        }
    }
    /*  WEATHER */


    var endpoint =
        "https://api.openweathermap.org/data/2.5/onecall?lat=" + long + "&lon=" + lat + "&lang=es&exclude=alerts&units=metric&appid=d65b0eca8f33e6d27845457213d44750";
    fetch(endpoint)
        .then(function (response) {
            if (200 !== response.status) {
                console.log(
                    "Looks like there was a problem. Status Code: " + response.status
                );
                return;
            }
            response.json().then(function (data) {

                for (var w = 0; w < 3; w++) {
                    var dayname = new Date(data.daily[w].dt * 1000).toLocaleDateString("es", {
                        weekday: "long",
                    });
                    $("#diaSetmana" + w).append(dayname);
                    $("#actualTemp" + w).append(data.daily[w].temp.day + " °C");
                    var icon = data.daily[w].weather[0].icon;
                    $("#icono" + w).attr("src", "https://openweathermap.org/img/wn/" + icon + ".png");
                    $("#description" + w).append(data.daily[w].weather[0].description);

                    var tempMax = data.daily[w].temp.max.toFixed(0);
                    var tempMin = data.daily[w].temp.min.toFixed(0);
                    $("#temp" + w).append(tempMin + " °C - " + tempMax + " °C");

                }
            });
        })


    var newDeteall = document.createElement("p");
    newDeteall.setAttribute('class', "item-intro text-mutedg")
    var textoDetall = document.createTextNode(datosFiltrados[i].detall);
    newDeteall.appendChild(textoDetall)

    var newGeo = document.createElement("p");
    newGeo.setAttribute('class', "item-intro text-mutedg")
    var textoGeo = document.createTextNode(address);
    newGeo.appendChild(textoGeo)

    var newTelefon = document.createElement("p");
    newTelefon.setAttribute('class', "item-intro text-mutedg")
    var textoTelef = document.createTextNode("Telèfon: " + datosFiltrados[i].contacte.telf);
    newTelefon.appendChild(textoTelef)

    $("#datosElemento").append(newDeteall);
    $("#datosElemento").append(newGeo);
    $("#datosElemento").append(newTelefon);

    if (datosFiltrados[i].contacte.xarxes.facebook != "") {
        var newFacebooka = document.createElement("a");
        newFacebooka.setAttribute('class', "btn btn-primary btn-social mx-2");
        newFacebooka.setAttribute('target', "_blank");
        newFacebooka.setAttribute('href', datosFiltrados[i].contacte.xarxes.facebook);

        var newFacebooki = document.createElement("i");
        newFacebooki.setAttribute('class', "fab fa-facebook-f")
        newFacebooka.appendChild(newFacebooki);
        $("#enlaces").append(newFacebooka);
    }

    if (datosFiltrados[i].contacte.xarxes.tripadvisor != "") {
        var newTripAdvisora = document.createElement("a");
        newTripAdvisora.setAttribute('class', "btn btn-primary btn-social mx-2");
        newTripAdvisora.setAttribute('target', "_blank");
        newTripAdvisora.setAttribute('href', datosFiltrados[i].contacte.xarxes.tripadvisor);

        var newTripAdvisori = document.createElement("i");
        newTripAdvisori.setAttribute('class', "fab fa-tripadvisor")
        newTripAdvisora.appendChild(newTripAdvisori);
        $("#enlaces").append(newTripAdvisora);
    }
    if (datosFiltrados[i].contacte.xarxes.instagram != "") {
        var newInstagrama = document.createElement("a");
        newInstagrama.setAttribute('class', "btn btn-primary btn-social mx-2");
        newInstagrama.setAttribute('target', "_blank");
        newInstagrama.setAttribute('href', datosFiltrados[i].contacte.xarxes.instagram);

        var newInstagrami = document.createElement("i");
        newInstagrami.setAttribute('class', "fab fa-instagram")
        newInstagrama.appendChild(newInstagrami);
        $("#enlaces").append(newInstagrama);
    }
    if (datosFiltrados[i].contacte.xarxes.twitter != "") {
        var newTwittera = document.createElement("a");
        newTwittera.setAttribute('class', "btn btn-primary btn-social mx-2");
        newTwittera.setAttribute('target', "_blank");
        newTwittera.setAttribute('href', datosFiltrados[i].contacte.xarxes.twitter);

        var newTwitteri = document.createElement("i");
        newTwitteri.setAttribute('class', "fab fa-twitter")
        newTwittera.appendChild(newTwitteri);
        $("#enlaces").append(newTwittera);
    }
    if (datosFiltrados[i].tipus != "vegetariano") {
        if (datosFiltrados[i].contacte.xarxes.web != "") {
            var newWeba = document.createElement("a");
            newWeba.setAttribute('class', "btn btn-primary btn-social mx-2");
            newWeba.setAttribute('target', "_blank");
            newWeba.setAttribute('href', datosFiltrados[i].contacte.xarxes.web);

            var newWebi = document.createElement("i");
            newWebi.setAttribute('class', "fas fa-at")
            //fas fa-globe-europe">
            newWeba.append(newWebi);
            $("#enlaces").append(newWeba);
        }
    }
    if (datosFiltrados[i].contacte.email != "") {
        var newEmaila = document.createElement("a");
        newEmaila.setAttribute('class', "btn btn-primary btn-social mx-2");
        newEmaila.setAttribute('target', "_blank");
        newEmaila.setAttribute('href', datosFiltrados[i].contacte.email);

        var newEmaili = document.createElement("i");
        newEmaili.setAttribute('class', "fa fa-envelope")
        newEmaila.appendChild(newEmaili);
        $("#enlaces").append(newEmaila);
    }

    // var newA1 = document.createElement("a");
    var newI1 = document.createElement("i");
    newI1.setAttribute('class', "fa fa-heart");
    newI1.setAttribute('onclick', "guardarFav(" + i + ")");
    newI1.setAttribute('id', "fav" + i);

    var dades = {
        id: datosFiltrados[i].nom
    };

    // leemos los favoritos del localStorage
    var favoritos = localStorage.getItem("favoritos") || "[]";
    favoritos = JSON.parse(favoritos);

    //Aquest és el text que surt inicialment:
    var favo = document.getElementById("Textfavorito");
    var newComentFav = document.createElement("p")
    var activo = document.createTextNode("Afegeix a favorits ");
    var inactivo = document.createTextNode("Elimina de favorits ")
    favo.innerHTML = ""; // Limpia el contenido.

    // buscamos el producto en la lista de favoritos
    var posLista = favoritos.findIndex(function (e) { return e.id == dades.id; });
    if (posLista == -1) {
        newI1.setAttribute('style', "color:black");
        //Text inicial
        favo.appendChild(newComentFav);
        newComentFav.appendChild(activo);
    } else {
        newI1.setAttribute('style', "color:red");
        //Text inicial
        favo.appendChild(newComentFav);
        newComentFav.appendChild(inactivo);
    }
    $("#favorito").append(newI1);

    //Poner estrellas hasta que queden 0,5 o ninguna estrella por poner
    //json totes les puntuacions han de ser .5 o senceres
    var estrellas = datosFiltrados[i].puntuacio


    for (var x = 0.5; x < estrellas; estrellas--) {
        var newI1 = document.createElement("i");
        newI1.setAttribute('style', "color:#f8d160");
        newI1.setAttribute('class', "fa fa-star");
        $("#puntuacioPreu").append(newI1);
    }

    //Comrpobar si falta la media estrella
    if (estrellas == 0.5) {
        var newI1 = document.createElement("i");
        newI1.setAttribute('style', "color:#f8d160");
        newI1.setAttribute('class', "fas fa-star-half-alt");
        $("#puntuacioPreu").append(newI1);
    }


    //Poner símbolos de dinero según el precio
    var preu = datosFiltrados[i].preu.import;
    preu = preu.replace("€", "");

    if (preu < 5) { //1 símbol
        num_euros = 1;
    } else if (preu < 10) { //2 símbols
        num_euros = 2;
    } else if (preu < 15) { //3 símbols
        num_euros = 3;
    } else if (preu < 20) {//4 símbols
        num_euros = 4;
    } else { //5 símbols
        num_euros = 5;
    }
    for (var x = 0; x < num_euros; x++) {

        var newI1 = document.createElement("i");
        newI1.setAttribute('style', "color:#212529");
        newI1.setAttribute('class', "fas fa-euro-sign");
        if (x == 0) {
            newI1.setAttribute('class', "ml-3");
        }
        $("#puntuacioPreu").append(newI1);

    }
}

//Función para guardar favoritos
function guardarFav(i) {
    var datos = {
        id: dades[i].nom
    };

    // leemos los favoritos del localStorage
    var favoritos = localStorage.getItem("favoritos") || "[]";
    favoritos = JSON.parse(favoritos);
    //Aquest és el texte que es va canviant depenent de l'estat del coret.
    var favo = document.getElementById("Textfavorito");
    var newComentFav = document.createElement("p")
    var activo = document.createTextNode("Afegeix a favorits ");
    var inactivo = document.createTextNode("Elimina de favorits ")
    favo.innerHTML = ""; // Limpia el contenido.

    // buscamos el producto en la lista de favoritos
    var posLista = favoritos.findIndex(function (e) { return e.id == datos.id; });
    if (posLista > -1) {
        // si está, lo quitamos
        favoritos.splice(posLista, 1);
        //Cambiar Icono
        var ic = document.getElementById("fav" + i);
        ic.setAttribute('style', "color:black");

        favo.appendChild(newComentFav);
        newComentFav.appendChild(activo);
    } else {
        // si no está, lo añadimos
        favoritos.push(datos);
        //Cambiar ICono
        var ic = document.getElementById("fav" + i);
        ic.setAttribute('style', "color:red");

        favo.appendChild(newComentFav);
        newComentFav.appendChild(inactivo);
    }

    // guardamos la lista de favoritos 
    localStorage.setItem("favoritos", JSON.stringify(favoritos));

}



//Funcion del desplegable de horario
/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Si la persona pulsa en otro lado (que no sea el horario) se cierra el dropdown
window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

function closeAllSelect(elmnt) {
    //a function that will close all select boxes in the document,
    //except the current select box:
    var x, y, i, xl, yl, arrNo = [];
    x = document.getElementsByClassName("select-items");
    y = document.getElementsByClassName("select-selected");
    xl = x.length;
    yl = y.length;
    for (i = 0; i < yl; i++) {
        if (elmnt == y[i]) {
            arrNo.push(i)
        } else {
            y[i].classList.remove("select-arrow-active");
        }
    }
    for (i = 0; i < xl; i++) {
        if (arrNo.indexOf(i)) {
            x[i].classList.add("select-hide");
        }
    }
}

//if the user clicks anywhere outside the select box,
//then close all select boxes:
document.addEventListener("click", closeAllSelect);



/* FUNCIONS JQUERY */
(function ($) {
    "use strict"; // Start of use strict
    $("#selectOrdenar").change(function () {
        if ($(this).val() == 0) {
            cargarDades(0); //predeterminat
        }
        if ($(this).val() == 1) {
            cargarDades(1); //més valorat
        }
        if ($(this).val() == 2) {
            cargarDades(2); //preu ascendent
        }
        if ($(this).val() == 3) {
            cargarDades(3); //preu ascendent
        }
    });
})(jQuery); // End of use strict
