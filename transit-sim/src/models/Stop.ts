export class Stop {
  stop_id: string;
  stop_name: string;
  stop_lat: number;
  stop_lon: number;
  location_type: number;
  parent_station: string;

  constructor(
    stop_id: string,
    stop_name: string,
    stop_lat: number,
    stop_lon: number,
    location_type: number,
    parent_station: string,
  ) {
    this.stop_id = stop_id;
    this.stop_name = stop_name;
    this.stop_lat = stop_lat;
    this.stop_lon = stop_lon;
    this.location_type = location_type;
    this.parent_station = parent_station;
  }
}
