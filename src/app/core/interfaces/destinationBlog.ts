export interface destinationBlog {
      id: number;
      name: string;
      description: string;
      thumb_alt: string;
      thumb: string;
      slug: string;
      blog_id: number;
      blog_name: string;
      blog_description: string;
      blog_thumb_alt: string;
      blog_thumb: string;
      blog_slug: string;

  destination:
    {
      id: number;
      slug: string;
    }
  ;
  blog_created_at: string;
  destination__id: number;
  destination_name: string;
  destination_description: string;
  destination_slug: string;
  destination_seo_title: null;
  destination_seo_keywords: string;
  destination_seo_robots: string;
  destination_seo_description: string;
  destination_facebook_description: string;
  destination_twitter_title: string;
  destination_twitter_description: string;
  destination_twitter_image: string;
  destination_facebook_image: null;
}
