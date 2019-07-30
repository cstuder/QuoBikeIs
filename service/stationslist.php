<?php
/**
 * Fetch stations list from PubliBike
 *
 * @author Christian Studer <cstuder@existenz.ch>
 */

// Configuation
define('PUBLIBIKEAPI', 'https://api.publibike.ch/v1/public/');
define('CACHEDIR', realpath(__DIR__ . '/cache') . '/');

//define('STATIONSSERVICE', str_replace('stationslist.php', "stations.php", (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://{$_SERVER['HTTP_HOST']}{$_SERVER['REQUEST_URI']}"));
define('STATIONSSERVICE', 'http://localhost:8001/stations.php');
// Fetch data
$stationslist = file_get_contents(PUBLIBIKEAPI . 'stations');

// Set CORS header
header('Access-Control-Allow-Origin: *');

// Basic error handler
if($stationslist === FALSE) {
    http_response_code(400);
    exit();
}
ini_set('max_execution_time', 300); 
// Gather the station names for all stations
$stations = json_decode($stationslist);

foreach($stations as $index => $station) {
    $stationdataRaw = file_get_contents(CACHEDIR . "{$station->id}.json");

    if($stationdataRaw === FALSE || ($stationdata = json_decode($stationdataRaw)) === FALSE) {
        // Fetch station data from the stations service, wherever it is
        $stationdataRaw = file_get_contents(STATIONSSERVICE . "?id={$station->id}");

        if($stationdataRaw === FALSE || ($stationdata = json_decode($stationdataRaw)) === FALSE) {
            // Neither cache nor service did work, set the name manually
            $stationdata = (object) ['name' => $station->id, 'city' => '???'];
        }
    }

    // Augment answer
    $stations[$index]->name = $stationdata->name;
    $stations[$index]->city = $stationdata->city;
}

// Output response
header('Content-type: application/json');
echo json_encode($stations);
