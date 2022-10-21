// Check if a point of coordinates is inside or outside a Polygon
let coordinatesPoliygon: any[] = [[11, 44], [11, 44], [11, 44], [11, 44]];
let coordPoint: number[] = [11, 44];

function inside(point, vs) {
    let x = point[0], y = point[1];

    let inside: Boolean = false;
    for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        let xi = vs[i][0], yi = vs[i][1];
        let xj = vs[j][0], yj = vs[j][1];

        let intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }

    return inside;
};

if (inside(coordPoint, coordinatesPoliygon)) {
    console.log(true);
} else {
    console.log(false);
}

// Check if a point of coordinates is inside or outside a Circle
let spotCoordinates: number[] = [44.000, 11.000];
let center = { lat: 44.000, lng: 11.000 };
let radius = 36

function checkIfInside(spotCoordinates: any) {

    let newRadius = distanceInKmBetweenEarthCoordinates(spotCoordinates[0], spotCoordinates[1], center.lat, center.lng);

    if (newRadius < radius) {
        //point is inside the circle
        return true
    }
    else if (newRadius > radius) {
        //point is outside the circle
        return false
    }
    else {
        //point is on the circle
        return true
    }

}

function distanceInKmBetweenEarthCoordinates(lat1: number, lon1: number, lat2: number, lon2: number) {
    var earthRadiusM: number = 6371000;

    var dLat = degreesToRadians(lat2 - lat1);
    var dLon = degreesToRadians(lon2 - lon1);

    lat1 = degreesToRadians(lat1);
    lat2 = degreesToRadians(lat2);

    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return earthRadiusM * c;
}

function degreesToRadians(degrees: number) {
    return degrees * Math.PI / 180;
}

if (checkIfInside(spotCoordinates)) {
    console.log(true);

} else {
    console.log(false);

}
