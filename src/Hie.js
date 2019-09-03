import React from "react";
import axios from "axios";
import * as Config from "./config";
import { Spinner } from "react-bootstrap";
import { geolocated } from "react-geolocated";
import { Link } from "react-router-dom";
import { BikeStatusList } from "./BikeStatus";

class Hie extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {},
            isLoading: true,
            error: null
        };
    }

    componentDidMount() {
        this.setState({ isLoading: true });

        const url = Config.LOCALAPI + "stationslist.php";

        axios
            .get(url)
            .then(result =>
                this.setState({
                    data: result.data,
                    isLoading: false
                })
            )
            .catch(error =>
                this.setState({
                    error,
                    isLoading: false
                })
            );
    }

    render() {
        const { data, isLoading, error } = this.state;

        if (error) {
            return (
                <p>
                    Stationsliste nicht gefunden oder Netzwerkproblem. ({error.message})
        </p>
            );
        }

        if (isLoading) {
            return <Spinner animation="border" />;
        }

        // Data available
        return !this.props.isGeolocationAvailable
            ? <div>Dein Browser hat kein GPS, sorry... <Link to="/">Zurück zum Start.</Link></div>
            : !this.props.isGeolocationEnabled
                ? <div>Das GPS in deinem Browser ist abgeschaltet, sorry... <Link to="/">Zurück zum Start.</Link></div>
                : this.props.coords
                    ? <>
                        <BikeStatusList ids={this.findClosestStations(data, this.props.coords)} />
                        Wohetsno.bike - <Link to="/">Zurück zum Start</Link> -{" "}
                        <Link to="/wogits">Zur Stationsauswahl</Link>
                    </>
                    : <div>Versuche dich mit dem GPS zu lokalisieren... <Link to="/">Abbrechen.</Link></div>;
    }

    /**
     * Find the closest stations to these coordinates
     * 
     * @param {Array} stations
     * @param {Object} coordinates
     * @return {Array} 
     */
    findClosestStations(stations, coordinates) {
        let distances = [];

        for (let s in stations) {
            distances.push([stations[s].id, this.haversine(stations[s], coordinates)]);
        }

        let sorted = distances.sort((a, b) => a[1] - b[1]);
        let top10 = sorted.slice(0, 10).map(s => s[0]);

        return top10;
    }

    /**
     * Haversine distance between two points
     * 
     * @param {Object} start = {latitude: ..., longitude: ...}
     * @param {Object} end = {latitude: ..., longitude: ...}
     * @param {String} unit = [km|meter]
     * @return {Float}
     * @link https://github.com/njj/haversine/blob/36672d19ffa57d404d87592c91bb304ab9eec563/haversine.js
     */
    haversine(start, end, unit = "meter") {
        const RADII = {
            km: 6371,
            meter: 6371000,
        }

        // convert to radians
        let toRad = function (num) {
            return num * Math.PI / 180
        }

        const R = unit in RADII
            ? RADII[unit]
            : RADII.meter;

        const dLat = toRad(end.latitude - start.latitude)
        const dLon = toRad(end.longitude - start.longitude)
        const lat1 = toRad(start.latitude)
        const lat2 = toRad(end.latitude)

        const sinLat2 = Math.pow(Math.sin(dLat / 2), 2)
        const sinLon2 = Math.pow(Math.sin(dLon / 2), 2)
        const a = sinLat2 + sinLon2 * Math.cos(lat1) * Math.cos(lat2)
        const dist = 2 * R * Math.asin(Math.sqrt(a))


        return dist
    }
}


export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})(Hie);
