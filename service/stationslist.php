<?php
/**
 * Fetch stations list from PubliBike
 *
 * @author Christian Studer <cstuder@existenz.ch>
 */

// Configuation
define('PUBLIBIKEAPI', 'https://api.publibike.ch/v1/public/');

// Fetch data
$stationslist = file_get_contents(PUBLIBIKEAPI . 'stations');

// Set CORS header
header('Access-Control-Allow-Origin: *');

// Basic error handler
if($stationslist === FALSE) {
    http_response_code(400);
    exit();
}

// Output response
header('Content-type: application/json');
echo $stationslist;
