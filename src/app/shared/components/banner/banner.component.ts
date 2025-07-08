import { TranslateModule } from '@ngx-translate/core';
import { Component } from '@angular/core';
import { AskExpertBtnComponent } from '../ask-expert-btn/ask-expert-btn.component';

@Component({
    selector: 'app-banner',
    imports: [
        TranslateModule,
        AskExpertBtnComponent
    ],
    templateUrl: './banner.component.html',
    styleUrl: './banner.component.scss'
})
export class BannerComponent {

}
