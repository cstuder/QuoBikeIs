import React from "react";
import { BikeStatusList } from "./BikeStatus";
import { Link } from "react-router-dom";
import LayoutContainer from "./LayoutContainer";

function Hetsno(props) {
  const menu = {
    "/": "Zurück zum Start",
    "/wogits": "zur Stationsauswahl",
    "/hieume": "Nächstgelegene Stationen"
  };

  if (!props.match.params.ids)
    return (
      <LayoutContainer menu={menu}>
        <Link to="/wogits">
          Keine Stations-Ids gefunden, bitte aus der Liste auswählen.
        </Link>
      </LayoutContainer>
    );

  const ids = props.match.params.ids.split(",");

  return (
    <LayoutContainer menu={menu}>
      <BikeStatusList ids={ids} />
    </LayoutContainer>
  );
}

export default Hetsno;
