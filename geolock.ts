// Check if a point of coordinates is inside or outside a Polygon
let coordinatesPoliygon: any[] = [
  [11, 44],
  [11, 44],
  [11, 44],
  [11, 44],
];
let coordPoint: number[] = [11, 44];

function inside(point, vs) {
  let x = point[0],
    y = point[1];

  let inside: Boolean = false;
  for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
    let xi = vs[i][0],
      yi = vs[i][1];
    let xj = vs[j][0],
      yj = vs[j][1];

    let intersect =
      yi > y != yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }

  return inside;
}

if (inside(coordPoint, coordinatesPoliygon)) {
  console.log(true);
} else {
  console.log(false);
}

// Check if a point of coordinates is inside or outside a Circle
let spotCoordinates: number[] = [44.0, 11.0];
let center = { lat: 44.0, lng: 11.0 };
let radius = 36;

function checkIfInside(spotCoordinates: any) {
  let newRadius = distanceInKmBetweenEarthCoordinates(
    spotCoordinates[0],
    spotCoordinates[1],
    center.lat,
    center.lng
  );

  if (newRadius < radius) {
    //point is inside the circle
    return true;
  } else if (newRadius > radius) {
    //point is outside the circle
    return false;
  } else {
    //point is on the circle
    return true;
  }
}

function distanceInKmBetweenEarthCoordinates(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  var earthRadiusM: number = 6371000;

  var dLat = degreesToRadians(lat2 - lat1);
  var dLon = degreesToRadians(lon2 - lon1);

  lat1 = degreesToRadians(lat1);
  lat2 = degreesToRadians(lat2);

  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return earthRadiusM * c;
}

function degreesToRadians(degrees: number) {
  return (degrees * Math.PI) / 180;
}

if (checkIfInside(spotCoordinates)) {
  console.log(true);
} else {
  console.log(false);
}

// Check if a point of coordinates is on a LineString
function distance(UNO: any, DUE: any) {
  // Funzione per convertire gradi in radianti
  function toRadians(degrees: any) {
    return degrees * (Math.PI / 180);
  }

  var R = 6371; // Raggio della Terra in chilometri

  // Calcolo delle differenze in radianti
  var dLat = toRadians(DUE.lat - UNO.lat);
  var dLng = toRadians(DUE.lng - UNO.lng);

  // Calcolo della distanza utilizzando la formula di Haversine
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(UNO.lat)) *
      Math.cos(toRadians(DUE.lat)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  var distanza = R * c;
  // console.log(distanza);

  return distanza;
}

var A = {
  lat: 11,
  lng: 44,
}; // Esempio di coordinate per A

var B = {
  lat: 13,
  lng: 46,
}; // Esempio di coordinate per B

var C = { lat: 12, lng: 45 }; // Esempio di coordinate per C

if (Math.abs(distance(A, C) + distance(B, C) - distance(A, B)) < 0.0001) {
  return true; // C è sulla linea.
} else {
  return false;
  // C non è sulla linea.
}
