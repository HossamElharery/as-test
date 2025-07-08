
import { Component, Input, OnInit } from '@angular/core';
import { ReactiveFormsModule, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { HomeserviceService } from '../../../../core/services/homeservice.service';
import { NgOptimizedImage } from '@angular/common';

@Component({
    imports: [TranslateModule, ReactiveFormsModule],
    selector: 'app-tour-booking',
    templateUrl: './tour-booking.component.html',
    styleUrls: ['./tour-booking.component.css']
})
export class TourBookingComponent implements OnInit {
  @Input() package = false
  @Input() cruise = false
  @Input() id : any
  idPack: any;
  cruiseId:any
  alert:boolean=false
  idCruise: any;

    public profileForm = new UntypedFormGroup({
      name: new UntypedFormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
      phone: new UntypedFormControl(null,[Validators.required,Validators.pattern("^[0-9]*$"),Validators.maxLength(15)]),
      email: new UntypedFormControl(null,[Validators.required,Validators.email]),
      // comment: new UntypedFormControl(null,[Validators.required]),
      // comment: new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z0-9]*$')])
      comment: new UntypedFormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z0-9\\s]*$')])
    });

    constructor(private ngMod:NgbModal ,private _booking:HomeserviceService) {
    }

    ngOnInit(): void {


    }

    openVerticallyCentered(content:any) {
      this.ngMod.open(content, { centered: true , backdrop: 'static' });

    }

    openVertically(Trip:any) {
      this.ngMod.open(Trip, { centered: false , backdrop: 'static'});

    }

    onSubmit(profileForm: any , id:any) {
  if(profileForm.valid==true){
    this._booking.postForm(this.profileForm.value,id).subscribe(data=>{
      this.alert=true;
      data = profileForm.value
      this.profileForm.reset();

  })
  }

    }
  }


