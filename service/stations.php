<?php
/**
 * Fetch stations details from PubliBike
 *
 * @param int $id
 * @author Christian Studer <cstuder@existenz.ch>
 */

// Configuation
define('PUBLIBIKEAPI', 'https://api.publibike.ch/v1/public/');

// Get parameters
$id = $_GET['id'] ?? null;
$idclean = intval($id);

// Fetch data
$station = file_get_contents(PUBLIBIKEAPI . 'stations/' . $idclean);

// Set CORS header
header('Access-Control-Allow-Origin: *');

// Basic error handler
if($station === FALSE) {
    http_response_code(400);
    exit();
}

// Output response
header('Content-type: application/json');
echo $station;
