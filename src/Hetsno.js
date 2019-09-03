import React from "react";
import BikeStatus from "./BikeStatus";
import { Link } from "react-router-dom";

function Hetsno(props) {
  if (!props.match.params.ids)
    return (
      <>
        <Link to="/wogits">
          Keine Stations-Ids gefunden, bitte aus der Liste auswählen.
        </Link>
        <br />
        Wohetsno.bike
      </>
    );

  const ids = props.match.params.ids.split(",");

  return (
    <>
      <BikeStatusList ids={ids} />
      Wohetsno.bike - <Link to="/">Zurück zu Anleitung</Link> -{" "}
      <Link to="/wogits">Zur Stationsliste</Link>
    </>
  );
}

function BikeStatusList(props) {
  return props.ids.map(id => <BikeStatus id={id} key={id} />);
}

export default Hetsno;
