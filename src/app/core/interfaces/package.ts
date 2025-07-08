export interface packages {
    id:number;
    name:string;
    slug:string;
    description:string;
    thumb_alt:string;
    thumb:string;
    start_price:string;
    days: number;
    reviews:number;
    destination__id:string;
    destination_slug:string;
    destination:{
      slug:string;
    };
  }
