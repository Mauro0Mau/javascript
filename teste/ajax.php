<?php

$produtos = array(
        0 => array(
                "codigo" => 1,
                "produto" => "Arroz",
                "valor" => 12.50
        ),

        1 => array(
                "codigo" => 2,
                "produto" => "Feijao",
                "valor"=>8.9
        )
        
);

echo json_encode($produtos);

?>