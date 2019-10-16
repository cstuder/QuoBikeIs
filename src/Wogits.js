import React from "react";
import axios from "axios";
import * as Config from "./config";
import { Form, Spinner, Button } from "react-bootstrap";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, {
  textFilter,
  selectFilter
} from "react-bootstrap-table2-filter";
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
  PaginationTotalStandalone,
  SizePerPageDropdownStandalone
} from "react-bootstrap-table2-paginator";

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
    this.handleButtonClick = this.handleButtonClick.bind(this);
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
          <br />
          Probier's einfach nochmal.
        </p>
      );
    }

    if (isLoading) {
      return <Spinner animation="border" />;
    }

    // Data available
    const cities = [...new Set(data.map(i => i.city))].sort();
    const networks = [...new Set(data.map(i => i.network))].sort();

    const columns = [
      {
        dataField: "network",
        text: "Netz",
        sort: "true",
        filter: selectFilter({
          options: networks.map(c => ({ value: c, label: c })),
          placeholder: "Nach Netz filtern..."
        })
      },
      {
        dataField: "city",
        text: "Ortschaft",
        sort: true,
        filter: selectFilter({
          options: cities.map(c => ({ value: c, label: c })),
          placeholder: "Nach Ortschaft filtern..."
        })
      },
      {
        dataField: "name",
        text: "Adresse",
        sort: true,
        filter: textFilter({
          placeholder: "Nach Adresse suchen..."
        })
      },
      {
        dataField: "actions",
        text: "",
        isDummyField: true,
        formatter: (cell, row) => (
          <AddButton row={row} onClick={this.addStationToSelected} />
        )
      }
    ];

    const paginationOptions = {
      custom: true,
      totalSize: data.length
    };

    return (
      <div className="wogits">
        <div className="lander">
          <div className="landerContent">
            <img src="img/wohetsno.svg" alt="Logo" />
            <h2 className="mainTitle">Deine Stationsnummern:</h2>
          </div>
          <Form.Control
            type="text"
            value={this.state.selectedStations.join(",")}
            disabled
          />
          <button className="btn btn-primary" onClick={this.handleButtonClick}>
            Zu deinen Stationen
          </button>
        </div>
        <div className="inputContainer">
          <h1 className="introTitle">Wähle deine Stationen</h1>
          <PaginationProvider pagination={paginationFactory(paginationOptions)}>
            {({ paginationProps, paginationTableProps }) => (
              <div>
                <PaginationTotalStandalone {...paginationProps} />{" "}
                <SizePerPageDropdownStandalone {...paginationProps} />
                <BootstrapTable
                  keyField="id"
                  data={data}
                  columns={columns}
                  bootstrap4
                  defaultSorted={[
                    { dataField: "city", order: "asc" },
                    { dataField: "name", order: "asc" }
                  ]}
                  filter={filterFactory()}
                  {...paginationTableProps}
                />
                <PaginationListStandalone {...paginationProps} />
              </div>
            )}
          </PaginationProvider>
        </div>
      </div>
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

  handleButtonClick() {
    const url = "/hetsno/" + this.state.selectedStations.join(",");

    this.props.history.push(url);
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
