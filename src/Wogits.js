import React from "react";
import axios from "axios";
import * as Config from "./config";
import { Spinner } from "react-bootstrap";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

class Wogits extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      isLoading: true,
      error: null,
      selectedStations: []
    };

    this.handleDragEnd = this.handleDragEnd.bind(this);
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    const url = Config.LOCALAPI + "stationslist.php";

    axios
      .get(url)
      .then(result =>
        this.setState({
          data: result.data,
          isLoading: false,
          selectedStations: result.data.map((s, i) => i)
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
    const { data, selectedStations, isLoading, error } = this.state;

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
      <DragDropContext onDragEnd={this.handleDragEnd}>
        <Droppable droppableId="ul">
          {(provided, snapshot) => (
            <ul ref={provided.innerRef}>
              {selectedStations.map((s, i) => (
                <Draggable key={data[s].id} draggableId={data[s].id} index={i}>
                  {(provided, snapshot) => (
                    <li
                      ref={provided.innerRef}
                      key={data[s].id}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {data[s].name} ({data[s].city})
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    );
  }

  handleDragEnd(event) {
    // dropped outside the list
    if (!event.destination) {
      return;
    }

    const newOrder = reorder(
      this.state.selectedStations,
      event.source.index,
      event.destination.index
    );

    this.setState({
      selectedStations: newOrder
    });
  }
}

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export default Wogits;
