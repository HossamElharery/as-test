export interface Pages {
    id: number;
    name: string;
    slug: string;
    page_title: string;
    description:string;
    thumb_alt: string;
    category_name: string;
    category_slug: string;
    destination_slug: string;
    category_thumb_alt: string;
    category_thumb: string;

    related_pages_title: string;
    related_blogs_title: string;
    related_packages_title: string;
    related_cruises_title: string;
    related_excursions_title: string;
    related_travel_guides_title: string;
    related_categories_title: string;
    top_sale:any

    thumb: string;
    banner:String;
    category:{
      slug:string;
    };
    destination:{
      slug:string;
    };
    city:{
      slug:string;
    };
    related_pages:[
      {category:{slug:string};
      destination:{slug:string};
          description:string;
          id: number;
          name: string;
          slug: string;
          thumb: string;
          thumb_alt: string;

    }]
}
