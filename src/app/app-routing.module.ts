import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', redirectTo: 'metrics', pathMatch: 'full' }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
