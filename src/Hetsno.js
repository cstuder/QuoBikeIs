import React from "react";
import { BikeStatusList } from "./BikeStatus";
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
      Wohetsno.bike - <Link to="/">Zurück zum Start</Link> -{" "}
      <Link to="/wogits">Zur Stationsauswahl</Link> -{" "}
      <Link to="/hie">Nächstgelegene Stationen</Link>
    </>
  );
}

export default Hetsno;
