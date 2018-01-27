import { NgModule } from '@angular/core';
import {
  MatToolbarModule,
  MatCheckboxModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatCardModule,
  MatListModule
} from '@angular/material';

const modules = [
  MatToolbarModule,
  MatCheckboxModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatCardModule
];

@NgModule({
  imports: [...modules],
  exports: [...modules],
  declarations: []
})
export class MaterialModule {}
