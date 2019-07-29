import React from "react";
import axios from "axios";
import * as Config from "./config";
import { Table, Spinner } from "react-bootstrap";

class Wogits extends React.Component {
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

    // Data aviable
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Stadt</th>
            <th>Station</th>
            <th>Id</th>
          </tr>
        </thead>
        <tbody>
          {data.map(d => (
            <tr>
              <td>{d.id}</td>
              <td>{d.id}</td>
              <td>{d.id}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
}

export default Wogits;
