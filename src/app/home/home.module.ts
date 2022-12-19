import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MaterialListComponent } from './material-list/material-list.component';
import { FormComponent } from './form/form.component';
import { CustomListComponent } from './custom-list/custom-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';  
import { MatIconModule } from '@angular/material/icon';  
import { MatButtonModule } from '@angular/material/button';
import { MaterialListContainerComponent } from './material-list-container/material-list-container.component';
import { MaterialListPresentationComponent } from './material-list-container/material-list-presentation/material-list-presentation.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SharedModule } from '../shared/shared.module';
import { SearchPipe } from './pipe/search.pipe';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DragDropModule } from '@angular/cdk/drag-drop';


@NgModule({
  declarations: [
    HomeComponent,
    MaterialListComponent,
    FormComponent,
    CustomListComponent,
    MaterialListContainerComponent,
    MaterialListPresentationComponent,
    SearchPipe
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    NgxSpinnerModule,
    DragDropModule,
    SharedModule
  ]
})
export class HomeModule { }
