<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
$input = json_decode(file_get_contents("php://input"));
if (!$input) {
    exit("No hay datos");
}
$bd = include_once "common.php";
$sentencia = $bd->prepare("INSERT INTO gatos VALUES (NULL, ?)");
$resultado = $sentencia->execute([$input->url]);
echo json_encode([
    "resultado" => $resultado,
]);
?>