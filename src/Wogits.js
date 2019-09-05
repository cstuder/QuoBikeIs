import React from "react";
import axios from "axios";
import * as Config from "./config";
import { Form, Spinner, Button } from "react-bootstrap";

class Wogits extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      isLoading: true,
      error: null,
      selectedStations: []
    };

    this.addStationToSelected = this.addStationToSelected.bind(this);
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

    return (
      <>
        <ul>
          {data.map(s => (
            <li key={s.id}>
              {s.name} ({s.city})
            </li>
          ))}
        </ul>
      </>
    );
  }

  roundingFormatter = cell => {
    return cell.toFixed(3);
  };

  addStationToSelected(station) {
    const id = station.id;

    if (this.state.selectedStations.includes(id)) return;

    this.setState({
      selectedStations: this.state.selectedStations.concat(id)
    });
  }
}

class AddButton extends React.Component {
  render() {
    return (
      <Button onClick={() => this.props.onClick(this.props.row)}>
        Hinzufügen
      </Button>
    );
  }
}

export default Wogits;
