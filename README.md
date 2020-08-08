# Wo het's no Bike

Schneller Überblick über deine PubliBike-Favoriten-Standorte.

`LIVE`: <https://wohetsno.existenz.ch>

`TEST`: <https://wohetsno-test.existenz.ch>

Unoffizielle Webseite für das Angebot von [PubliBike](https://www.publibike.ch).

Eine Webseite von Christian Studer ([cstuder@existenz.ch](mailto:cstuder@existenz.ch), [Bureau für digitale Existenz](http://bureau.existenz.ch/)).

(Vormals gehostet unter der Domain `wohetsno.bike`. Die war lustig aber hatte keine Lust mehr zu zahlen.)

## Struktur

Einfach React-App, kreiert mit [Create React App](https://github.com/facebook/create-react-app), Routing mit [React Routing V5](https://reacttraining.com/react-router/).

Um CORS-Sperre zu umgehen wird ein kleiner PHP-Service als Proxy verwendet.

Der Service `stations.php` speichert dabei seine Daten in `/service/cache`. Der Service `stationslist.php` liest daraus die Stationsnamen aus. (Der Cache wird von `stations.php` selber nicht benutzt.)

## Development

`npm run dev` ausführen.

Benötigt aktuelle NPM-Version und PHP 7.+.

## Deployment

`npm run deploy-TEST` ausführen für Deployment nach `TEST`.

`npm run deploy-LIVE` ausführen für Deployment nach `LIVE`.

Das Deploymentskript `deploy/action.sh` erwartet zwei Umgebungsvariablen: `APPRISE_URL` für Deployment-Notifikation, `SSH_PRIVATE_KEY` für die Authentifizierung am Server.

Auf dem Server muss die Umgebungsvariable `REACT_APP_LOCALAPI` im `.env.local` korrekt gesetzt sein.

## Credits

- CSS von [React Bootstrap](https://react-bootstrap.netlify.com/).
- Icon von Nick Roach (<https://www.iconfinder.com/icons/1055112/bike_wheel_wheel_icon>, GPL).

## Lizenz

MIT.
