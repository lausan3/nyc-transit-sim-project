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

  parseFromCSVRow(row: string): Stop {
    const parts = row.split(",");

    if (parts.length != 6) {
      throw new Error(
        `Invalid CSV row for Stop: expected 6 fields, got ${parts.length}. Row: ${row}`,
      );
    }

    return new Stop(
      parts[0],
      parts[1],
      parseFloat(parts[2]),
      parseFloat(parts[3]),
      parseInt(parts[4]),
      parts[5],
    );
  }
}
