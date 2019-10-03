/**
 * Haversine distance between two points
 *
 * @param {Object} start = {latitude: ..., longitude: ...}
 * @param {Object} end = {latitude: ..., longitude: ...}
 * @param {String} unit = [km|meter]
 * @return {Float}
 * @link https://github.com/njj/haversine/blob/36672d19ffa57d404d87592c91bb304ab9eec563/haversine.js
 */
export function haversine(start, end, unit = "meter") {
  const RADII = {
    km: 6371,
    meter: 6371000
  };

  const R = unit in RADII ? RADII[unit] : RADII.meter;

  const dLat = toRad(end.latitude - start.latitude);
  const dLon = toRad(end.longitude - start.longitude);
  const lat1 = toRad(start.latitude);
  const lat2 = toRad(end.latitude);

  const sinLat2 = Math.pow(Math.sin(dLat / 2), 2);
  const sinLon2 = Math.pow(Math.sin(dLon / 2), 2);
  const a = sinLat2 + sinLon2 * Math.cos(lat1) * Math.cos(lat2);
  const dist = 2 * R * Math.asin(Math.sqrt(a));

  return dist;
}

/**
 * Calculate initial bearing between two coordinates
 *
 * @param {Object} start = {latitude: ..., longitude: ...}
 * @param {Object} end = {latitude: ..., longitude: ...}
 * @return {Float}
 * @link https://www.movable-type.co.uk/scripts/latlong.html
 */
export function bearing(start, end) {
  const λ1 = toRad(start.longitude);
  const λ2 = toRad(end.longitude);
  const φ1 = toRad(start.latitude);
  const φ2 = toRad(end.latitude);

  const y = Math.sin(λ2 - λ1) * Math.cos(φ2);
  const x =
    Math.cos(φ1) * Math.sin(φ2) -
    Math.sin(φ1) * Math.cos(φ2) * Math.cos(λ2 - λ1);
  const brng = (Math.atan2(y, x) * 180) / Math.PI;

  return (brng + 360) % 360;
}

/**
 * Convert degrees to radians
 *
 * @param {Float} deg
 * @return {Float}
 */
function toRad(deg) {
  return (deg * Math.PI) / 180;
}
