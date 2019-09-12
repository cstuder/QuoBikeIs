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
    <div className="hetsno">
      <div className="hetsnoDings">
        <img src="/img/wohetsno.svg" alt="Logo" />
        <h1>wohetsno.bike</h1>
        <Link to="/">Zurück zum Start</Link> -{" "}
        <Link to="/wogits">Zur Stationsauswahl</Link> -{" "}
        <Link to="/hieume">Nächstgelegene Stationen</Link>
      </div>
      <div className="hetsnoContainer">
        <div><BikeStatusList ids={ids} /></div>
      </div>
      
    </div>
  );
}

export default Hetsno;
