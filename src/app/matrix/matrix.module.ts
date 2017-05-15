import { DashboardComponent } from './dashboard/dashboard.component';
import { MhWebComponent } from './mhweb/mhweb.component';
import { ListMhWebComponent } from './mhweb/list/list-mhweb.component';
import { NgModule, OpaqueToken } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OdenModule } from '@ericsson/oden/modules';
import { MatrixRoutingModule } from './matrix.routing';
import { MatrixComponent } from './matrix.component';
import { BaseService } from './shared/services/base.service';
import { EventBusService } from './shared/services/event-bus.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardDataService } from './shared/services/dashboard.service';
import { ChartModule } from 'angular2-highcharts';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';

const Highcharts = require('highcharts');
Highcharts.setOptions({
  colors: ['#F1C40F', '#3498DB', '#23649E', '#E74C3C', '#1ABC9C']
});

export function highchartsFactory() {
  var hc = Highcharts;
  var hcm = require('highcharts/highcharts-more');
  var sg = require('highcharts/modules/solid-gauge');
  hcm(hc);
  sg(hc);
  return hc;
}

/*export function highchartsGaugeFactory() {
  return require('highcharts/modules/solid-gauge');
}*/

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    OdenModule.forRoot(),
    MatrixRoutingModule,
    ChartModule
  ],
  declarations: [
    MatrixComponent,
    DashboardComponent,
    MhWebComponent,
    ListMhWebComponent
  ],
  providers: [
    BaseService,
    EventBusService,
    DashboardDataService,
    {
      provide: HighchartsStatic,
      useFactory: highchartsFactory
    }
  ],
  entryComponents: [
  ]
})
export class MatrixModule { }
