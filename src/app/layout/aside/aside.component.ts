
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../core/services/auth/auth.service';
import { MessagesService } from '../../core/services/messages/messages.service';
import { AuthorizeDirective } from '../../shared/directive/authorize/authorize.directive';

@Component({
    selector: 'app-aside',
    imports: [
        RouterModule,
        TranslateModule,
        AuthorizeDirective
    ],
    templateUrl: './aside.component.html',
    styleUrls: [
        './aside.component.scss'
    ]
})
export class AsideComponent implements OnDestroy, OnInit {

  isOpened: boolean = !!JSON.parse(localStorage.getItem('isOpened') || 'false');
  isLoading: boolean = false;
  private subscription: Subscription = new Subscription();
  public screenWidth!: number;

  constructor(

  ) { }



  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }






}
