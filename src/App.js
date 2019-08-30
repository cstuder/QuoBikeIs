import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.scss";
import { Container } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from "react-router-dom";
import Hetsno from "./Hetsno";
import Wogits from "./Wogits";

function AppRouter() {
  return (
    <Router>
      <Container>
        <Switch>
          <Route path="/" exact component={Index} />
          <Route path="/hetsno/:ids" component={Hetsno} />
          <Route path="/hetsno" component={Hetsno} />
          <Route path="/wogits" component={Wogits} />
          <Route component={RedirectToIndex} />
        </Switch>
      </Container>
    </Router>
  );
}

function Index() {
  const appUrl = `${window.location.origin.toString()}/hetsno/`;

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

      <h3>Anleitung</h3>

      <ol>
        <li>
          Auf der <Link to="/wogits">Stationsseite</Link> deine
          Lieblingsstationen auswählen.
        </li>
        <li>Den erstellten Link klicken.</li>
        <li>Die Seite zu deinen Lesezeichen hinzufügen. Fertig.</li>
      </ol>
      <p>
        Beispiel:{" "}
        <Link to="/hetsno/217,105,165,25,233,58,146">
          {appUrl}217,105,165,25,233,58,146
        </Link>
      </p>

      <h3>Über</h3>

      <p>
        Eine Webseite von{" "}
        <a href="mailto:cstuder@existenz.ch">Christian Studer</a> &ndash;{" "}
        <a href="http://bureau.existenz.ch/">Bureau für digitale Existenz</a>.
      </p>
      <p>
        Quellcode:{" "}
        <a href="https://github.com/cstuder/QuoBikeIs/">
          https://github.com/cstuder/QuoBikeIs/
        </a>
      </p>
    </>
  );
}

function RedirectToIndex() {
  return <Redirect to="/" />;
}

export default AppRouter;
