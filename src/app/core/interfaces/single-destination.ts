export interface singleDestination {
  destination__id: number;
  package__id: number;
  destination_slug: string;
  slug: string;
  destination_name: string;
  name: string;
  destination_description: string;
  description: string;
  destination_alt: string;
  thumb_alt: string;
  destination_banner:string;
  thumb: string;
  start_price: string;
  category_name: string;
  location_package_map: string;
  duration_in_days: number;
  discount: number;
  tour_type: [
    {
      destination:{
        slug:string
      }

      name:string
      slug:string
      icon:string
    }
  ];
  number_highlights: number;
  itinerary: number;
  meals: number;
  accommodations: number;
  flights: number;
  guid_tour: number;
  hot_offer: boolean;
  top_sale: boolean;
  reviews:any;
  rate:any;

}
