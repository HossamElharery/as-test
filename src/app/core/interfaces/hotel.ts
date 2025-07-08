export interface Hotel {
id: number;
name: string;
slug: string;
description:string;
thumb_alt: string;
thumb: string;
rate: number;
overview: string;
country: string;
banner_alt: string;
checkin: string;
checkout: string;
services:{
   content:string;
}
activities:[{
   content:string;
}]
amenities:{
  category:[{
    content:string;
  }]
  food_drink:[{
    content:string;
  }]

  accessibility:[{
    content:string;
  }]

  safety_security:[{
    content:string;
  }]


  activities:[{
    content:string;
  }]

  business_facilities:[{
    content:string;
  }]

  bathroom_amenities:[{
    content:string;
  }]
}
destination:{
  slug:string;
};

location_map: string;
logo: string;
banner: string;
gallery: string;
start_price:any



free_barking: number;
free_wifi: number;
air_condition: number;
pool: number;
gym: number;
bathtub: number;

bar: number;
spa_and_wellness_centre: number;
family_rooms: number;
}
