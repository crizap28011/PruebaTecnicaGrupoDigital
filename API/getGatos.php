<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    $bd = include_once "common.php";
    $sentencia = $bd->prepare("SELECT *  FROM gatos");
    $sentencia->execute();
    $resultado = $sentencia->fetchAll(PDO::FETCH_OBJ);
    echo json_encode($resultado);
