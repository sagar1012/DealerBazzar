import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthguardGuard } from './core/authguard/authguard.guard';
import { LoginComponent } from './core/login/login.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { 
	  path: '', redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: 'home', loadChildren: () => import('./home/home.module').then(m=> m.HomeModule),
  },
  {
    path: 'login', component: LoginComponent,
  },
  
  
  { path: 'upload-file', loadChildren: () => import('./upload-file/upload-file.module').then(m => m.UploadFileModule) },
  { path: 'books', loadChildren: () => import('./books/books.module').then(m => m.BooksModule) },
  // { path: 'dev-table', loadChildren: () => import('./dev-table/dev-table.module').then(m => m.DevTableModule) }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
