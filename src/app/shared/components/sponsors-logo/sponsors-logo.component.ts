import { Component, OnInit } from '@angular/core';
import { sponsors } from 'src/app/core/interfaces/sponsors';
import { HomeserviceService } from 'src/app/core/services/homeservice.service';

@Component({
    selector: 'app-sponsors-logo',
    templateUrl: './sponsors-logo.component.html',
    styleUrls: ['./sponsors-logo.component.css'],
    standalone: false
})
export class SponsorsLogoComponent implements OnInit {
  logo:sponsors[]=[]
  flag:any;
  showed=[]
  show=[{img:``, link:``}]
  constructor( private _sponsors:HomeserviceService) { }

  ngOnInit(): void {
    this._sponsors.getLogo().subscribe(result => {
      this.logo = result.data;

      this.logo.forEach(s=>{

        if(s.showed_on_large_slider==true){

          this.show.push({img:`${s.large_image}`,link:`${s.link}`} )


        }else{
          null
        }
      })

})
  }



}
