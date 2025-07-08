import { Component, Input } from '@angular/core';
import { ShimmerTypes } from './shimmer.model';
import { CommonModule } from '@angular/common';
import { ShimmerBorderRadiusPipe, ShimmerHeightPipe } from './shimmer.pipe';

@Component({
    selector: 'shimmer',
    imports: [
        CommonModule,
        ShimmerHeightPipe
    ],
    templateUrl: './shimmer.component.html',
    styleUrls: ['./shimmer.component.scss']
})
export class ShimmerComponent {

  @Input() type: ShimmerTypes = ShimmerTypes.LINE;
  @Input() width = '100%';
  @Input() height = '12px';
  @Input() duration = '1s';
  @Input() rounded = false;
  @Input() borderRadius = '0px';

}
