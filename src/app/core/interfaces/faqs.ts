export interface Faqs {
  faq_id: string;
  type:string;
  name:string;
  banner:string
  category_name:string;
  faq_name: string;
  faqs:[{
    myth:string;
    fact:string;
    overview:string;
    image:string;
  }];
  description:any
  faq_slug: string;
  faq_description: string;
  faq_overview:string;
  faq_thumb_alt: string;
  faq_thumb: string;
  faq_created_at: string;
  destination__id: string;
  destination_name: string;
  destination_description: string;
  destination_slug: string;
  destination_seo_title: string;
  destination_seo_keywords: string;
  destination_seo_robots: string;
  destination_seo_description: string;
  destination_facebook_description: string;
  destination_twitter_title: string;
  destination_twitter_description: string;
  destination_twitter_image: string;
  destination_facebook_image: string;
  destination_banner:string
}
