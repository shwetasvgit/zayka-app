import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderApprovedPage } from './order-approved';

@NgModule({
  declarations: [
    OrderApprovedPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderApprovedPage),
  ],
})
export class OrderApprovedPageModule {}
