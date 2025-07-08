import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { includes } from '../../../../../core/interfaces/includes';

@Component({
    imports: [CommonModule, TranslateModule],
    selector: 'app-hightlightes.',
    templateUrl: './hightlightes.component.html',
    styleUrls: ['./hightlightes.component.css']
})
export class HightlightesComponent implements OnInit {
  @Input() lights:includes[]=[]



  constructor() { }

  ngOnInit(): void {


  }
}
