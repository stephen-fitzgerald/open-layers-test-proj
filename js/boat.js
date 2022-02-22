/**
 * Position, as returned by navigator.geolocation.getCurrentPosition
 * @argument [object] args
 * @argument [number] args.latitude, as decimal number
 * @argument [number] args.longitude, as decimal number
 * @argument [number] args.accuracy, in ?
 * @argument [number] args.altitude, in meters, if available
 * @argument [number] args.altitudeAccuracy, in ?, if available
 * @argument [number] args.speed, in m/s, if available
 * @argument [number] args.heading, degrees clockwise from north, if available
 */
export class Coords {
    constructor(args = {}) {
        this.latitude = args.latitude || 0.0;  
        this.longitude = args.longitude || 0.0; // longitude as decimal number
        this.accuracy = args.accuracy || 0.0; // in m 
        this.altitude = args.altitude || 0.0; // in meters, if available
        this.altitudeAccuracy = args.altitudeAccuracy || 0.0; // in m, if available
        this.speed = args.speed || 0.0; // in m/s, if available
        this.heading = args.heading || 0.0; // degrees clockwise from north, if available
    }
}

export class Position {
    constructor(args = {}) {
        this.timestamp = args.timestamp || new Date();
        this.coords = new Coords(args.coords);
    }
}

export class Boat {
    static _n_boats = 0;

    constructor(args = {}) {
        _n_boats++;
        this.name = args.name || "boat-" + leadingZeroInt(_n_boats);
        this.loa = args.loa || 8.0;
        this.beam = args.beam || 2.5;
        this.tackingAngle = 45.0;
        this.position = args.position || new Position();
    }

}

function leadingZeroInt( num, minLength = 3 ){
    let ret = "" + Math.round(num);
    for(let i=minLength - s.length; i>0; i--){
        ret = "0" + s;
    }
    return ret;
}