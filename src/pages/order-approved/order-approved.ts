import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import 'firebase/firestore';


@IonicPage()
@Component({
  selector: 'page-order-approved',
  templateUrl: 'order-approved.html',
})
export class OrderApprovedPage {
 tableno: number;
  private db: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
   this.db = firebase.firestore();
   this.display();
  }


  async display()
  {
  var docRef= this.db.collection("Menu").doc("creamyNuts");
  await docRef.get().then(documentSnapshot => {
  this.tableno = documentSnapshot.get('Tables');  
  
  });
  console.log("bye"+ this.tableno)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderApprovedPage');
  }

}
