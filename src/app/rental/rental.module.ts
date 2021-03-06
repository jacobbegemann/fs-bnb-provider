import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RentalPage } from './rental.page';
import { PipeModuleModule } from '../pipe-module/pipe-module.module';

const routes: Routes = [
  {
    path: '',
    component: RentalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipeModuleModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RentalPage]
})
export class RentalPageModule {}
