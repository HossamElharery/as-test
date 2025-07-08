import { SlicePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { destination } from '../../../../core/interfaces/destination';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';
import { HomeService } from '../../services/home.service';

@Component({
    selector: 'app-top-destination',
    imports: [
        SlicePipe,
        TranslateModule,
        RouterLink
    ],
    templateUrl: './top-destination.component.html',
    styleUrls: ['./top-destination.component.scss'],
    // Disable animations for better performance & SEO
    host: { '[@.disabled]': 'true' }
})
export class TopDestinationComponent implements OnInit, OnDestroy {
  destinationContainer: destination[] = [];
  private unSub!: Subscription
  loading: boolean = true

  constructor(
    private _destination: HomeService
  ) { }

  ngOnInit(): void {
    this.unSub = this._destination.getAlldestination().subscribe(result => {

      this.destinationContainer = result.data

      this.loading = false

    })
  }

  ngOnDestroy(): void {
    this.unSub.unsubscribe()
  }

}
