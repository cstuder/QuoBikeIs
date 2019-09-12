import React from "react";
import axios from "axios";
import * as Config from "./config";
import { Spinner } from "react-bootstrap";
import { geolocated } from "react-geolocated";
import { Link } from "react-router-dom";
import { BikeStatusList } from "./BikeStatus";
import { haversine } from "./utils";

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
    return !this.props.isGeolocationAvailable ? (
      <div>
        Dein Browser hat kein GPS, sorry...{" "}
        <Link to="/">Zurück zum Start.</Link>
      </div>
    ) : !this.props.isGeolocationEnabled ? (
      <div>
        Das GPS in deinem Browser ist abgeschaltet, sorry...{" "}
        <Link to="/">Zurück zum Start.</Link>
      </div>
    ) : this.props.coords ? (
      <div className="hieume">
        <BikeStatusList
          ids={this.findClosestStations(data, this.props.coords)}
          location={this.props.coords}
        />
        Wohetsno.bike - <Link to="/">Zurück zum Start</Link> -{" "}
        <Link to="/wogits">Zur Stationsauswahl</Link>
      </div>
    ) : (
      <div>
        Versuche dich mit dem GPS zu lokalisieren...{" "}
        <Link to="/">Abbrechen.</Link>
      </div>
    );
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
      distances.push([stations[s].id, haversine(stations[s], coordinates)]);
    }

    let sorted = distances.sort((a, b) => a[1] - b[1]);
    let top10 = sorted.slice(0, 10).map(s => s[0]);

    return top10;
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false
  },
  userDecisionTimeout: 5000
})(Hie);
