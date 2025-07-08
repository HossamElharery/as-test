export interface Blog {
    id:number;
    name:string;
    slug:string;
    overview:string;
    thumb_alt:string;
    thumb:string;
    created_at:string;
    banner:string;
    banner_alt:string;
    start_price:string;
    days:string;
    rate:string;
    duration:string;
    slug_destination:string;
    category:{
      slug:string;
    };

    city:{
      slug:string;
    };
    destination:{
      slug:string;
    };
  }
