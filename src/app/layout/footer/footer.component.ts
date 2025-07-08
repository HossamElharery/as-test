import { LayoutService } from './../services/layout.service';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { HomeserviceService } from '../../core/services/homeservice.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { socials } from '../../core/interfaces/socials';
import { DatePipe } from '@angular/common';


@Component({
    selector: 'app-footer',
    imports: [
        RouterModule,
        TranslateModule,
        ReactiveFormsModule,
        FormsModule,
        DatePipe
    ],
    providers: [LayoutService],
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  date = new Date();
  socialsContainer: socials[] = [];

  subscribe = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  twister: boolean=false;

  constructor(private _footer: LayoutService , private _home:HomeserviceService ) {
  }

  ngOnInit(): void {
    this._footer.getSocials().subscribe((result) => (this.socialsContainer = result.data));
  }
  clickLink(e:any){
    this._home.Add.next(e)
  }

  save():void{
    if(this.subscribe.valid){
      this._footer.getSubscribe(this.subscribe.value).subscribe(() => {
     this.twister=true
     this.subscribe.reset()
        setTimeout(() => {
           this.twister=false
        }, 3000);
      })
    }
  }
}
