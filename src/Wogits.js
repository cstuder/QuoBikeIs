import React from "react";
import axios from "axios";
import * as Config from "./config";
import { Form, Spinner, Button } from "react-bootstrap";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
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
    const columns = [
      {
        dataField: "id",
        text: "Stations ID",
        sort: true,
        filter: textFilter()
      },
      {
        dataField: "state.name",
        text: "Status",
        sort: true,
        filter: textFilter({
          placeholder: "Status eingeben"
        })
      },
      {
        dataField: "latitude",
        text: "Lat",
        sort: true,
        formatter: this.roundingFormatter
      },
      {
        dataField: "longitude",
        text: "Lon",
        sort: true,
        formatter: this.roundingFormatter
      },
      {
        dataField: "actions",
        text: "Hinzufügen",
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
      <>
        <Form.Control
          type="text"
          value={this.state.selectedStations.join(",")}
          disabled
        />
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
                striped
                bordered
                hover
                defaultSorted={[{ dataField: "id", order: "asc" }]}
                filter={filterFactory()}
                {...paginationTableProps}
              />
              <PaginationListStandalone {...paginationProps} />
            </div>
          )}
        </PaginationProvider>
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
