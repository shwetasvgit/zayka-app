import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { CartPage } from '../cart/cart';


@IonicPage()
@Component({
  selector: 'page-creamy-nuts',
  templateUrl: 'creamy-nuts.html',
})

export class CreamyNutsPage
{
  burgers: any;
  toasts: any;
  twistos: any;
  private db: any;
  model: any = {};
  isEditing: boolean = false;
  selectedArray :any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams)
  {    
    this.db = firebase.firestore();    
    this.loadData();
  }

  loadData()
  {
    this.getAllDocuments("Menu/creamyNuts/Burger").then((e)=>{
      this.burgers = e; });
    this.getAllDocuments("Menu/creamyNuts/Toast").then((e)=>{
      this.toasts = e; });
    this.getAllDocuments("Menu/creamyNuts/Twisto").then((e)=>{
      this.twistos = e; });  
  }

getAllDocuments(collection: string): Promise<any>
{
    return new Promise((resolve, reject) => {
        this.db.collection(collection)
            .get()
            .then((querySnapshot) => {
                let arr = [];
                querySnapshot.forEach(function (doc) {
                    var obj = JSON.parse(JSON.stringify(doc.data()));
                    obj.$key = doc.id
                    console.log(obj)
                    arr.push(obj);
                }); 
                if (arr.length > 0) {
                    console.log("Document data:", arr);
                    resolve(arr);
                } else {
                    console.log("No such document!");
                    resolve(null);
                } 
            })
            .catch((error: any) => {
                reject(error);
            });
    });
}

selectMember(data)
{
 if (data.checked == true)
  {
    this.selectedArray.push(data);
  }
  else
  {
     let newArray = this.selectedArray.filter(function(el)
     {
     return el.$key !== data.$key;
     });
    this.selectedArray = newArray;
  } 
}

 orderSummary()
 {
   let user = firebase.auth().currentUser;     
  for(let i in this.selectedArray)
   {
      this.db.collection("users").doc(user.uid).collection("orders").doc(i).set(this.selectedArray[i])
      .then(function() {
          console.log("Document successfully written!");
      })
      .catch(function(error) {
          console.error("Error writing document: ", error);
      });
    }
    this.navCtrl.push(CartPage);
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad CreamyNutsPage');
  }

}
