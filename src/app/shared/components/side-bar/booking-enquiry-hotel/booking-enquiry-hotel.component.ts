import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, RouterLink } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HomeserviceService } from '../../../../core/services/homeservice.service';

import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-booking-enquiry-hotel',
    imports: [
        TranslateModule
    ],
    templateUrl: './booking-enquiry-hotel.component.html',
    styleUrls: ['./booking-enquiry-hotel.component.css']
})
export class BookingEnquiryHotelComponent implements OnInit {

  @Input() package = false
  @Input() cruise = false

  @Input() id : any

  idPack: any;

  cruiseId:any
  alert:boolean=false
    public profileForm = new UntypedFormGroup({
      name: new UntypedFormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
      phone: new UntypedFormControl(null,[Validators.required,Validators.pattern("^[0-9]*$"),Validators.maxLength(15)]),
      email: new UntypedFormControl(null,[Validators.required,Validators.email]),
      comment: new UntypedFormControl(null,[Validators.required]),

  //  ,Validators.pattern("^[0-9]*$"),
    });
  idCruise: any;

    constructor(private ngMod:NgbModal ,private _booking:HomeserviceService,private _active: ActivatedRoute) {
    }

    ngOnInit(): void {


    }

    openVerticallyCentered(content:any) {
      this.ngMod.open(content, { centered: true , backdrop: 'static'  });

    }

    openVertically(Trip:any) {
      this.ngMod.open(Trip, { centered: false , backdrop: 'static'  });

    }

    onSubmit(profileForm: any , id:any) {
  if(profileForm.valid==true){
    this._booking.postForm(this.profileForm.value,id).subscribe(data=>{
      this.alert=true;
      data = profileForm.value

  })
  }

    }

}
