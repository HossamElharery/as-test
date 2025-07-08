
export interface Cruises {
    id:number;
    name:string;
    slug:string;
    description:string;
    thumb_alt:string;
    thumb:string;
    start_price:string;
    days: number;
    day_number:string;
    day_title:string;
    day_summary:string;
    breakfast:boolean
    lunch:boolean;
    dinner:boolean;
    destination__id:string;
    destination_slug:string;
    rate:number;
    checkin:string;
    checkout:string;
    double_room_price:number;
    single_room_price:number;
    banner:string;

    services:{
      content:string;
    };
    activities:[{
      content:string;
      fact:string;
      overview:string;
      image:string;
    }];

}
