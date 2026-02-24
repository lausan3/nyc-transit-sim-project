import parser.parser as parser
import argparse


def main():
    app = argparse.ArgumentParser(
        prog="GTFS Data Parser",
        description="A tool to parse GTFS data and convert it to JSON format.",
    )

    app.add_argument(
        "-f",
        "--file",
        help="Path to the GTFS data folder. It must have routes.txt, stops.txt, trips.txt, and stop_times.txt",
        required=False,
    )
    app.add_argument(
        "-o", "--output", help="Path to the output JSON file", required=False
    )
    app.add_argument(
        "-m",
        "--mta",
        help='Name of the MTA GTFS dataset. Including this argument makes the parser assume that your GTFS dataset is in "data/mta_gtfs/"',
        required=False,
    )

    args = app.parse_args()

    data_path = ""
    output_path = ""

    if args.mta:
        data_path = f"data/mta_gtfs/{args.mta}"
    elif args.file:
        data_path = args.file
    else:
        print(
            "No GTFS data file provided. Please provide a file path using the -f or --file argument, or specify an MTA dataset using the -m or --mta argument."
        )
        return

    if args.mta:
        output_path = "output/" + args.mta
    elif args.output:
        output_path = args.output
    else:
        print(
            "No output path provided. Please provide an output path using the -o or --output argument, or specify an MTA dataset using the -m or --mta argument."
        )
        return

    gtfs_parser = parser.GTFSParser(data_path)

    gtfs_parser.dump_to_json(output_path)


if __name__ == "__main__":
    main()
