import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { APODService } from './providers/apod.service';
import { HttpClientModule } from '@angular/common/http';
import { APODComponent } from './apod.component';

@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule],
  providers: [APODService],
  declarations: [AppComponent, APODComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
