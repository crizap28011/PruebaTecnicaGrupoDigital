<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
$json = json_decode(file_get_contents("php://input"), true);
if (!$json) {
    exit("No hay datos mdafaka");
}
$bd = include_once "common.php";
$sentencia = $bd->prepare("DELETE FROM gatos WHERE id = ?" );
$resultado = $sentencia->execute([$json['id']]);
echo json_encode([
    "resultado" => $resultado,
]);
?>