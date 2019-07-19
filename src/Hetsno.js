import React from "react";
import BikeStatus from "./BikeStatus.js";
import { Link } from "react-router-dom";

function Hetsno(props) {
  const ids = props.match.params.ids.split(",");

  return (
    <>
      <BikeStatusList ids={ids} />
      <Link to="/">Quo Bike Is</Link> - Zurück zu Anleitung
    </>
  );
}

function BikeStatusList(props) {
  return props.ids.map(id => <BikeStatus id={id} />);
}

export default Hetsno;
