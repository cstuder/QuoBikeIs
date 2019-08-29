# Quo Bike Is

Schneller Überblick über deine PubliBike-Favoriten-Standorte.

`LIVE`: <https://quobikeis.existenz.ch>

`TEST`: <https://quobikeis-test.existenz.ch>

Unoffizielle Webseite für das Angebot von [PubliBike](https://www.publibike.ch).

Eine Webseite von Christian Studer (<mailto:cstuder@existenz.ch>, [Bureau für digitale Existenz](http://bureau.existenz.ch/)).

## Struktur

Einfach React-App, kreirt mit [Create React App](https://github.com/facebook/create-react-app), Routing mit [React Routing V5](https://reacttraining.com/react-router/).

Um CORS-Sperre zu umgehen wird ein einfacher PHP-Service als Proxy verwendet.

Der Service `stations.php` speichert dabei seine Daten in `/service/cache` damit der Service `stationslist.php` daraus die Stationsnamen auslesen kann. (Der Cache wird von `stations.php` selber nicht benutzt.)

## Development

`npm run dev` ausführen.

Benötigt aktuelle NPM-Version und PHP 7.+.

## Deployment

`npm run deploy-TEST` ausführen für Deployment nach `TEST`.

`npm run deploy-LIVE` ausführen für Deployment nach `LIVE`.

Das Deploymentskript `deploy/action.sh` erwartet zwei Umgebungsvariablen: `APPRISE_URL` für Deployment-Notifikation, `SSH_PRIVATE_KEY` für die Authentifizierung am Server.

Auf dem Server muss die Umgebungsvariabel `REACT_APP_LOCALAPI` im `.env.local` korrekt gesetzt sein.

## Credits

- CSS von [React Bootstrap](https://react-bootstrap.netlify.com/).
- Icon von Nick Roach (<https://www.iconfinder.com/icons/1055112/bike_wheel_wheel_icon>, GPL).

## Lizenz

MIT.
