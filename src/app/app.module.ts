import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { OdenModule } from '@ericsson/oden/modules';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatrixModule } from './matrix/matrix.module';
import { RouteLoaderServiceMock } from './matrix/shared/services/route-loader.service.mock';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    OdenModule.forRoot(),
    HttpModule,
    FormsModule,
    AppRoutingModule,
    MatrixModule
  ], 
  providers: [RouteLoaderServiceMock],
  bootstrap: [AppComponent]
})
export class AppModule { }
