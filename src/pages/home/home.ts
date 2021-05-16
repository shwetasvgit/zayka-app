import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
// tabBarElement: any;
  splash = true;

  constructor(public navCtrl: NavController) {

  }

    ionViewDidLoad() {
  //  this.tabBarElement.style.display = 'none';
    setTimeout(() => {
      this.splash = false;
   //   this.tabBarElement.style.display = 'flex';
    }, 4000);
  }
}
