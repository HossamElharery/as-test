import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { sponsors } from '../../../core/interfaces/sponsors';
import { HomeserviceService } from '../../../core/services/homeservice.service';

@Component({
  selector: 'app-sponsors',
  standalone: true,
  imports: [CommonModule, CarouselModule],
  templateUrl: './sponsors.component.html',
  styleUrls: ['./sponsors.component.css']
})
export class SponsorsComponent implements OnInit {
  logo: sponsors[] = []
  loading: boolean = true
  customOptions!: OwlOptions
  mobile: boolean = false;

  constructor(private _sponsors: HomeserviceService) { }

  ngOnInit(): void {
    this._sponsors.getLogo().subscribe(result => {
      this.logo = result.data
      this.loading = false
    })

    this.customOptions = {
      loop: true,
      mouseDrag: true,
      touchDrag: true,
      autoplay: true,
      margin: 25,
      pullDrag: true,
      dots: false,
      navSpeed: 700,
      responsive: {
        0: {
          items: 1
        },
        400: {
          items: 2
        },
        740: {
          items: 4
        },
        940: {
          items: 6
        }
      },
      nav: false
    }
  }

  numSequence(n: number): Array<number> {
    return Array(n);
  }
}
