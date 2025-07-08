import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-breadcumbs',
    imports: [TranslateModule, RouterLink],
    templateUrl: './breadcumbs.component.html',
    styleUrl: './breadcumbs.component.scss'
})
export class BreadcumbsComponent {

}
