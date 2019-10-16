import React from "react";
import { Link } from "react-router-dom";

/**
 * Provide layout around an element
 *
 * @var Object menu = {"url": "text"}
 */
export default function LayoutContainer(props) {
  return (
    <div className="hetsno">
      <div className="hetsnoDings">
        <img src="/img/wohetsno.svg" alt="Logo" />
        <h1 className="mainTitle">wohetsno.bike</h1>
        {Object.entries(props.menu).map(([key, value]) => (
          <Link to={key}>{value}</Link>
        ))}
      </div>
      <div className="hetsnoContainer">
        <div>{props.children}</div>
      </div>
    </div>
  );
}
