import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-ask-expert-btn',
    imports: [TranslateModule, RouterLink],
    templateUrl: './ask-expert-btn.component.html',
    styleUrl: './ask-expert-btn.component.scss'
})
export class AskExpertBtnComponent {

}
