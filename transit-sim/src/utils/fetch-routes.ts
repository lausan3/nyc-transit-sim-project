import type { ParsedRoute } from "../models/Parsed";

export default async function FetchRoutes(
  filepath: string,
): Promise<ParsedRoute[]> {
  const routes_to_stops = fetch(filepath)
    .then((response) => response.json())
    .catch(console.error);

  return routes_to_stops;
}
