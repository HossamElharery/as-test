export interface Guide {
    id: number;
    name: string;
    description:string;
    slug: string;
    overview: string;
    thumb_alt: string;
    thumb: string;
    created_at: string;
    banner: string;
    banner_alt: string;
    category:{
      slug:string;
    };
    destination:{
      slug:string;
    };

    related_travel_guides:[{
      destination:{
        slug:string
      };
      id: number;
      name: string;
      description:string;
      slug: string;
      thumb_alt: string;
      thumb: string;
    }]

    related_pages:[{
      destination:{
        slug:string
      };
      category:{
        slug:string

      }
      id: number;
      name: string;
      description:string;
      slug: string;
      thumb_alt: string;
      thumb: string;
    }]

    related_packages:[{
      destination:{
        slug:string
      };
      id: number;
      name: string;
      description:string;
      slug: string;
      thumb_alt: string;
      thumb: string;
      top_sale?:number;
    }]
}

