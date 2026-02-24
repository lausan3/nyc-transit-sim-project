export type ParsedStop = {
  stop_id: string;
  stop_name: string;
  stop_lat: string;
  stop_lon: string;
  parent_station: string;
  stop_sequence: string;
};

export type ParsedRoute = {
  route_id: string;
  route_short_name: string;
  route_desc: string;
  route_color: string;
  route_text_color: string;
  stop_ids: ParsedStop[];
};
