import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthguardGuard } from '../core/authguard/authguard.guard';
import { CustomListComponent } from './custom-list/custom-list.component';
import { FormComponent } from './form/form.component';
import { HomeComponent } from './home.component';
import { MaterialListContainerComponent } from './material-list-container/material-list-container.component';
import { MaterialListComponent } from './material-list/material-list.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent,
    children: [
      {
        path: '', redirectTo: 'custom-list', pathMatch: 'full'
      },
      {
        path: 'form', component: FormComponent, canActivate: [AuthguardGuard]
      },
      {
        path: 'custom-list', component: CustomListComponent, canActivate: [AuthguardGuard]
      },
      {
        path: 'material-list', component: MaterialListComponent, canActivate: [AuthguardGuard]
      },
      {
        path: 'mvp-list', component : MaterialListContainerComponent, canActivate: [AuthguardGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
