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
import Hie from "./Hie";

function AppRouter() {
  return (
    <Router>
      <Container fluid={true}>
        <Switch>
          <Route path="/" exact component={Index} />
          <Route path="/hetsno/:ids" component={Hetsno} />
          <Route path="/hetsno" component={Hetsno} />
          <Route path="/wogits" component={Wogits} />
          <Route path="/hieume" component={Hie} />
          <Route component={RedirectToIndex} />
        </Switch>
      </Container>
    </Router>
  );
}

function Index() {
  const appUrl = `${window.location.origin.toString()}/hetsno/`;

  return (
    <div className="index">
      <div className="intro">
        <div className="introContent">
          <h2 class="introTitle">Wohetsno.bike</h2>
          <p>
            Schneller Überblick über PubliBike-Standorte. Zeigt dir alle aktuellen
            verfügbaren Velos und E-Bikes an.
      </p>
          <p>
            Unoffizielle Webseite für das Angebot von{" "}
            <a href="https://www.publibike.ch">PubliBike</a>.
      </p>
          <h3 className="subTitle">Nahegelegene Stationen finden</h3>
          <p>
            Klick auf den <Link to="/hieume">Nächstgelegenen Link hier</Link> um die
            dir 10 nächstgelegenen Stationen zu finden.
      </p>
          <h3 className="subTitle">Favoriten zusammenstellen</h3>
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
            <Link to="/hetsno/217,105,165,-,25,233,58,146">
              {appUrl}217,105,165,-,25,233,58,146
        </Link>
          </p>
          <h3 className="subTitle">Über</h3>
          <p>
            Eine Webseite von{" "}
            <a href="mailto:cstuder@existenz.ch">Christian Studer</a> &ndash;{" "}
            <a href="https://bureau.existenz.ch/">Bureau für digitale Existenz</a>.
      </p>
          <p>
            Diese Webseite zeichnet keine Besuche auf, speichert deine Position
            nicht und hat keine Werbung installiert.
      </p>
          <p>
            Quellcode:{" "}
            <a href="https://github.com/cstuder/QuoBikeIs/">
              https://github.com/cstuder/QuoBikeIs/
        </a>
          </p>
        </div>
      </div>
      <div className="lander">
        <div className="landerContent">
          <img src="img/wohetsno.svg" alt="Logo" />
          <h1>wohetsno.bike</h1>
        </div>
      </div>
    </div>
  );
}

function RedirectToIndex() {
  return <Redirect to="/" />;
}

export default AppRouter;
