import React from "react";
import axios from "axios";
import * as Config from "./config";
import { Spinner } from "react-bootstrap";
import { haversine, bearing } from "./utils";

export function BikeStatusList(props) {
  return props.ids.map(id =>
    isNaN(id) ? (
      <hr />
    ) : (
      <BikeStatus id={id} key={id} location={props.location} />
    )
  );
}

class BikeStatus extends React.Component {
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

    const url = Config.LOCALAPI + "stations.php?id=" + this.props.id;

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
        <p>Station nicht gefunden oder hat ein Problem. ({error.message})</p>
      );
    }

    if (isLoading) {
      return (
        <p>
          <Spinner animation="border" size="sm" />
        </p>
      );
    }

    // Data is there, count bikes
    const mapurl = `https://www.google.com/maps/search/?api=1&query=${data.latitude},${data.longitude}`;
    const name = (
      <span>
        <a href={mapurl}>
          <span className="locName">{data.name}</span>
          <span className="locCity">{data.city}</span>
        </a>
      </span>
    );
    var bikes = 0;
    var ebikes = 0;

    data.vehicles.forEach(v => {
      if (v.type.id === Config.PUBLIBIKE_ID_BIKE) {
        bikes++;
      }

      if (v.type.id === Config.PUBLIBIKE_ID_EBIKE) {
        ebikes++;
      }
    });

    const status = (
      <span class="bikeIndicator">
        <span role="img" aria-label="Normale Bikes">
          💪
        </span>
        &nbsp;{bikes}&nbsp;|&nbsp;{ebikes}&nbsp;
        <span role="img" aria-label="E-Bikes">
          ⚡️
        </span>
      </span>
    );

    let distance = null;

    if (this.props.location) {
      let d = Math.ceil(haversine(this.props.location, data));
      let u = "m";

      if (d >= 1000) {
        d = Math.ceil(d / 100) / 10;
        u = "km";
      }

      let b = Math.ceil(bearing(this.props.location, data));
      let bFixed = b - 90; // The arrow is bearing towards 90° too.

      let rotation = {
        transform: `rotate(${bFixed}deg)`,
        display: "inline-block"
      };

      distance = (
        <>
          <span>
            {d} {u}
          </span>{" "}
          <span style={rotation} title={b + "°"}>
            ➤
          </span>
        </>
      );
    }

    return (
      <p className="locationEntry">
        {name} {distance} {status}
      </p>
    );
  }
}

export default BikeStatus;
