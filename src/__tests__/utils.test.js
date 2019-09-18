import { haversine, bearing } from "../utils";

/*
 * Test haversine (Distance between two locations)
 */
const bern = { latitude: 46.948, longitude: 7.4474 };
const zürich = { latitude: 47.3769, longitude: 8.5417 };
const rio = { latitude: -22.9068, longitude: -43.1729 };

test("Staying in place", () => {
  expect(haversine(bern, bern)).toBe(0);
  expect(haversine(zürich, zürich)).toBe(0);
  expect(haversine(rio, rio)).toBe(0);

  expect(haversine(bern, bern, "km")).toBe(0);
  expect(haversine(zürich, zürich, "km")).toBe(0);
  expect(haversine(rio, rio, "km")).toBe(0);
});

test("Distances Bern-Zürich and Bern-Rio", () => {
  const bz = haversine(bern, zürich, "km");
  const zb = haversine(zürich, bern, "km");

  expect(bz).toBeCloseTo(95.5, 1);
  expect(zb).toBeCloseTo(95.5, 1);

  expect(bz).toBe(zb);

  const rb = haversine(bern, rio, "km");
  const br = haversine(rio, bern, "km");

  expect(rb).toBeCloseTo(9276.2, 1);
  expect(br).toBeCloseTo(9276.2, 1);

  expect(rb).toBe(br);
});

test("Unit conversion in distance", () => {
  const bz = haversine(bern, zürich, "km");
  const bz_m = haversine(zürich, bern, "meter");

  expect(bz).toBeCloseTo(bz_m / 1000, 5);
});

test("Bearing in place", () => {
  expect(bearing(bern, bern)).toBe(270);
  expect(bearing(rio, rio)).toBe(270);
});

test("Bearing slightly off", () => {
  const b_n = { ...bern };
  b_n.latitude += 1;

  expect(bearing(bern, b_n)).toBeCloseTo(360, 0);
  expect(bearing(b_n, bern)).toBeCloseTo(180, 0);

  const b_e = { ...bern };
  b_e.longitude += 1;

  expect(bearing(bern, b_e)).toBeCloseTo(270, 0);
  expect(bearing(b_e, bern)).toBeCloseTo(90, 0);
});
