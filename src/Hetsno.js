import React from "react";
import BikeStatus from "./BikeStatus";
import { Link } from "react-router-dom";

function Hetsno(props) {
  if (!props.match.params.ids)
    return <Link to="/">Quo Bike Is (Keine Stations-Ids gefunden)</Link>;

  const ids = props.match.params.ids.split(",");

  return (
    <>
      <BikeStatusList ids={ids} />
      Quo Bike Is - <Link to="/">Zurück zu Anleitung</Link>
    </>
  );
}

function BikeStatusList(props) {
  return props.ids.map(id => <BikeStatus id={id} key={id} />);
}

export default Hetsno;
