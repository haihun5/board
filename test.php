<?php
$data = json_decode(file_get_contents('php://input'));
$data->id += 1;
echo json_encode($data);
