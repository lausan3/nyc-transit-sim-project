export type ParsedStop = {
  stop_id: string;
  stop_name: string;
  stop_lat: string;
  stop_lon: string;
  parent_stop: string;
  stop_sequence: number;
};

export type ParsedRoute = {
  route_id: string;
  route_short_name: string;
  route_desc: string;
  route_color: string;
  route_text_color: string;
  stop_ids: ParsedStop[];
};
