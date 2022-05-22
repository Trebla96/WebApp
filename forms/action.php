<?php 
/* Recibimos el contenido de los campos del formulario */
$nombre = htmlspecialchars($_POST['name']);
$comentario = htmlspecialchars($_POST['message']);

/* Definimos la classe comentario, que hay en el JSON */
class Comentario {
    public $name = "";
    public $description = "";
}

/* Creamos un nuevo objeto comentario y añadimos las propiedades que hemos leido */
$coment = new Comentario;
$coment->name = $nombre;
$coment->description = $comentario;

/* Codificamos el objeto en formato JSON */
$objeto_json = json_encode($coment);

$fl = fopen("comentaris.JSON", "r+");

fseek($fl, -1, SEEK_END);

fwrite($fl,",\n".$objeto_json."\n]");

fclose($fl);




/* file_put_contents(
    "comentaris.JSON",
    $objeto_json,
    FILE_APPEND
); */