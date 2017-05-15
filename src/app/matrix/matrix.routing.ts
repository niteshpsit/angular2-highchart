import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatrixComponent }    from './matrix.component';
import { DashboardComponent }    from './dashboard/dashboard.component';

@NgModule({
  imports: [
  RouterModule.forChild([
      {
        path: '', component: MatrixComponent,
        children: [
            { path: '', component: DashboardComponent }
        ]
      }
    ])
  ],
  exports: [
    RouterModule
  ]
})

export class MatrixRoutingModule {}