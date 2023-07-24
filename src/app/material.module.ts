import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatDividerModule,
    MatProgressBarModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  exports: [
    CommonModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatDividerModule,
    MatProgressBarModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
  ],
})
export class MaterialModule {}
