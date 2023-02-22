import { Component } from '@angular/core';
import { APODService } from './providers/apod.service';

@Component({
  selector: 'apod',
  templateUrl: './apod.component.html',
  styleUrls: ['./apod.component.css'],
})
export class APODComponent {
  constructor(private apodService: APODService) {}

  apodData$ = this.apodService.getAPOD();
  apodGetSix$ = this.apodService.getAll(6);

  ngOnInit() {
    this.apodGetSix$.subscribe(console.log);
  }
}
