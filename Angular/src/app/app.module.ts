import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DxDropDownBoxModule } from 'devextreme-angular/ui/drop-down-box';
import { DxListModule } from 'devextreme-angular/ui/list';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DxDropDownBoxModule,
    DxListModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
