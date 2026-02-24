export class Route {
  route_id: string;
  agency_id: string;
  route_short_name: string;
  route_long_name: string;
  route_desc: string;
  route_type: number;
  route_url: string;
  route_color: string;
  route_text_color: string;
  route_sort_order: number;

  constructor(
    route_id: string,
    agency_id: string,
    route_short_name: string,
    route_long_name: string,
    route_desc: string,
    route_type: number,
    route_url: string,
    route_color: string,
    route_text_color: string,
    route_sort_order: number,
  ) {
    this.route_id = route_id;
    this.agency_id = agency_id;
    this.route_short_name = route_short_name;
    this.route_long_name = route_long_name;
    this.route_desc = route_desc;
    this.route_type = route_type;
    this.route_url = route_url;
    this.route_color = route_color;
    this.route_text_color = route_text_color;
    this.route_sort_order = route_sort_order;
  }
}
