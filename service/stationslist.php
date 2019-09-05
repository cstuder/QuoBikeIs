<?php

/**
 * Fetch stations list from PubliBike
 *
 * @author Christian Studer <cstuder@existenz.ch>
 */

// Configuation
define('PUBLIBIKEAPI', 'https://api.publibike.ch/v1/public/');
define('CACHEDIR', realpath(__DIR__ . '/cache') . '/');

// Set CORS header
header('Access-Control-Allow-Origin: *');

// Fetch data
$stationslist = file_get_contents(PUBLIBIKEAPI . 'stations');

// Basic error handler
if ($stationslist === FALSE || ($stations = json_decode($stationslist)) === FALSE) {
    http_response_code(400);
    exit();
}

// Gather the station names for all stations
foreach ($stations as $index => $station) {
    // Read from cache
    $cacheFile = CACHEDIR . "{$station->id}.json";

    if (file_exists($cacheFile)) {
        $stationdataRaw = file_get_contents($cacheFile);
    } else {
        $stationdataRaw = FALSE;
    }

    if ($stationdataRaw === FALSE || ($stationdata = json_decode($stationdataRaw)) === FALSE || $stationdata === NULL) {
        // Fetch data
        $stationdataRaw = file_get_contents(PUBLIBIKEAPI . 'stations/' . $station->id);

        if ($stationdataRaw === FALSE || ($stationdata = json_decode($stationdataRaw)) === FALSE) {
            // Neither cache nor service did work, set the name manually
            $stationdata = (object) ['name' => $station->id, 'city' => '???', (object) 'network' => ['name' => '???']];
        } else {
            // Store in cache
            file_put_contents($cacheFile, $stationdataRaw);
        }
    }

    // Augment answer
    $stations[$index]->name = $stationdata->name;
    $stations[$index]->city = $stationdata->city;
    $stations[$index]->network = $stationdata->network->name;
}

// Output response
header('Content-type: application/json');
echo json_encode($stations);
