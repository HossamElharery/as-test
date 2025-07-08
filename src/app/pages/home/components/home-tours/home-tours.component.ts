import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { packages } from '../../../../core/interfaces/package';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { HomeService } from '../../services/home.service';

@Component({
    selector: 'app-home-tours',
    imports: [RouterLink, TranslateModule],
    templateUrl: './home-tours.component.html',
    styleUrls: ['./home-tours.component.scss'],
    // Disable Angular animations for this component for better performance & SEO
    host: { '[@.disabled]': 'true' }
})
export class HomeToursComponent {
  private unSub!:Subscription
  packageContainer:packages[] = []
  image = "../../../../../../assets/imgs/default.png"
  loading: boolean = true;

  constructor(private _package:HomeService) { }

  ngOnInit(): void {
    this.unSub=  this._package.getPackages().subscribe(result => {
      this.packageContainer = result.data.packages
      this.loading=false


    })
  }


  ngOnDestroy(): void {
    this.unSub.unsubscribe()
  }

  numSequence(n: number): Array<number> {
    return Array(n);
  }
  trackBy(index:number, el:any) {
    return el.id;
   }
}
