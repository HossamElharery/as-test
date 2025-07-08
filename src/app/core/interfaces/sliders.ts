export interface sliders {
    id:number;
    title:string;
    alt:string;
    slider_data:{
      title:string
      small_text:string;
      call_to_action_title:string;
      call_to_action_link:string;
      image:string;
    };
    ImageOrVideo:{
      type:string;
      url:string;
    };
  }
