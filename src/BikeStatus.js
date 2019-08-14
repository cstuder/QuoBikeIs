import React from "react";
import axios from "axios";
import * as Config from "./config";
import { Spinner } from "react-bootstrap";

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
    const name = (
      <span>
        {data.name} ({data.network.name})
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

    return (
      <p>
        {name} &ndash; {status}
      </p>
    );
  }
}

export default BikeStatus;
