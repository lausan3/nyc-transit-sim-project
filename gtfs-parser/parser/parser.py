import csv
import json
import os


class GTFSParser:
    def __init__(self, path: str):
        self.path = path

        print(f"Parsing GTFS data from folder: {self.path}")

    def parse_file(
        self,
        file_name: str,
        rows_to_take: list[str] | None = None,
    ) -> list[dict[str, str]]:
        file_path = self.path + "/" + file_name

        if not os.path.exists(file_path):
            print(f"File {file_name} does not exist in the provided path: {self.path}")
            return []

        out = []

        with open(file_path, "r") as file:
            reader = csv.DictReader(file)

            for row in reader:
                if rows_to_take is not None:
                    row = {
                        key: value for key, value in row.items() if key in rows_to_take
                    }

                out.append(row)

        return out

    def _get_stops_per_route(self) -> list[dict]:
        """
        Returns a list of dictionaries where each dictionary contains a route_id and a list of stop_ids that are on that route.
        """

        stops_per_route = {}
        routes = self.parse_file(
            "routes.txt",
            rows_to_take=[
                "route_id",
                "route_short_name",
                "route_color",
                "route_text_color",
                "route_desc",
            ],
        )
        stops = self.parse_file(
            "stops.txt",
            rows_to_take=[
                "stop_id",
                "stop_name",
                "stop_lon",
                "stop_lat",
                "parent_station",
            ],
        )
        stops = {
            stop["stop_id"]: {
                "stop_name": stop["stop_name"],
                "stop_lon": stop["stop_lon"],
                "stop_lat": stop["stop_lat"],
                "parent_station": stop["parent_station"],
            }
            for stop in stops
        }

        trips = self.parse_file("trips.txt", rows_to_take=["route_id", "trip_id"])
        stop_times = self.parse_file(
            "stop_times.txt", rows_to_take=["trip_id", "stop_id", "stop_sequence"]
        )

        for route in routes:
            route_id = route["route_id"]
            stops_per_route[route_id] = list()

        # group stop_times by trip_id
        stop_times_by_trip = {}
        for stop_time in stop_times:
            trip_id = stop_time["trip_id"]
            if trip_id not in stop_times_by_trip:
                stop_times_by_trip[trip_id] = []

            stop = stops[stop_time["stop_id"]]

            stop_times_by_trip[trip_id].append(
                {
                    "stop_id": stop_time["stop_id"],
                    "stop_name": stop["stop_name"],
                    "stop_lon": stop["stop_lon"],
                    "stop_lat": stop["stop_lat"],
                    "parent_station": stop["parent_station"],
                    "stop_sequence": stop_time["stop_sequence"],
                }
            )

        for trip_id, stop_times in stop_times_by_trip.items():
            stop_times_by_trip[trip_id] = sorted(
                stop_times, key=lambda x: int(x["stop_sequence"])
            )

        for trip in trips:
            route_id = trip["route_id"]
            trip_id = trip["trip_id"]

            if (
                route_id in stops_per_route
                and len(stops_per_route[route_id]) == 0
                and trip_id in stop_times_by_trip
            ):
                stops_per_route[route_id] = stop_times_by_trip[trip_id]

        return [
            {
                "route_id": route_id,
                "stop_ids": stop_ids,
                **next(route for route in routes if route["route_id"] == route_id),
            }
            for route_id, stop_ids in stops_per_route.items()
        ]

    """
    Writes the data parsed from the GTFS files to JSON Serialized files in the output folder. 
    The output folder will be created if it does not exist. 
    The JSON files will be named routes.json and stops.json respectively.
    """

    def dump_to_json(self, output_path: str) -> bool:
        if not os.path.exists(output_path):
            os.makedirs(output_path)

        routes_file_path = f"{output_path}/routes_and_stops.json"

        with open(routes_file_path, "w+", newline="") as file:
            routes_to_stops = self._get_stops_per_route()
            json.dump(routes_to_stops, file, indent=4)

        return True
