import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { Container } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from "react-router-dom";
import Hetsno from "./Hetsno.js";

function AppRouter() {
  return (
    <Router>
      <Container>
        <Switch>
          <Route path="/" exact component={Index} />
          <Route path="/hetsno/:ids" component={Hetsno} />
          <Route path="/hetsno" component={Hetsno} />
          <Route component={RedirectToIndex} />
        </Switch>
      </Container>
    </Router>
  );
}

function Index() {
  var appUrl = `${window.location.origin.toString()}/hetsno/`;

  return (
    <>
      <h2>Quo Bike Is</h2>
      <p>
        Schneller Überblick über deine PubliBike-Favoriten-Standorte. Zeigt dir
        alle aktuellen verfügbaren Velos und E-Bikes an.
      </p>
      <p>
        Unoffizielle Webseite für das Angebot von{" "}
        <a href="https://www.publibike.ch">PubliBike</a>.
      </p>

      <p>
        Eine Webseite von{" "}
        <a href="mailto:cstuder@existenz.ch">Christian Studer</a> &ndash;{" "}
        <a href="http://bureau.existenz.ch/">Bureau für digitale Existenz</a>.
      </p>

      <h3>Anleitung</h3>

      <ol>
        <li>
          Auf der PubliBike-API{" "}
          <a href="https://api.publibike.ch/v1/public/stations">
            Stations-Service
          </a>{" "}
          die gewünschten <code>id</code> der Stationen notieren. Oder
          alternativ die <code>id</code> in den Netzwerkrequests auf{" "}
          <code>api.publibike.ch</code> beim Aufklappen der Stationsdetails
          auslesen.
        </li>
        <li>
          Alle <code>id</code>'s komma-separiert an die URL{" "}
          <Link to="/hetsno">{appUrl}</Link> anhängen.
        </li>
        <li>Auf die Seite gehen und zu den Bookmarks hinzufügen. Fertig.</li>
      </ol>
      <p>
        Beispiel:{" "}
        <Link to="/hetsno/217,105,165,25,233,58,146">
          {appUrl}217,105,165,25,233,58,146
        </Link>
      </p>
    </>
  );
}

function RedirectToIndex() {
  return <Redirect to="/" />;
}

export default AppRouter;
