import React from "react";
import axios from "axios";
import * as Config from "./config";
import { Spinner } from "react-bootstrap";
import { haversine, bearing } from "./utils";

export function BikeStatusList(props) {
  return props.ids.map(id => (
    <BikeStatus id={id} key={id} location={props.location} />
  ));
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
        <a href={mapurl}>{data.name}</a> ({data.network.name})
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
      <span>
        {bikes} 🚲 / {ebikes} 🔋
      </span>
    );

    let distance = null;

    if (this.props.location) {
      let d = Math.ceil(haversine(data, this.props.location));
      let b = Math.ceil(bearing(data, this.props.location));
      let bFixed = b - 90; // The arrow is heading towards 90°...

      let rotation = {
        transform: `rotate(${bFixed}deg)`,
        display: "inline-block"
      };

      distance = (
        <>
          <span>{d} m</span>{" "}
          <span style={rotation} title={b + "°"}>
            ➤
          </span>
        </>
      );
    }

    return (
      <p>
        {name} {distance} &ndash; {status}
      </p>
    );
  }
}

export default BikeStatus;
