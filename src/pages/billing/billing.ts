
/*Import Statements*/
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { CreamyNutsPage } from '../creamy-nuts/creamy-nuts';
import { OrderApprovedPage } from '../order-approved/order-approved';



@IonicPage()
@Component({
  selector: 'page-billing',
  templateUrl: 'billing.html',
})
/* Main method of page*/
export class BillingPage {
/* Variable initializations*/
  orderItem: any;
  public buttonClicked: boolean = false;
  private db: any; 
  order: any;
  todaysorder: any;
  itemsArr: any;  
  total: number;
  orderno: any;
  totalsum:number;
  field:number;
  quantity: number;
  billvalue:number;

  /*Actions performed when the page is loaded i.e initialization for firestore database, loading page data*/
  constructor(public navCtrl: NavController, public navParams: NavParams) {
   this.db = firebase.firestore();
   this.loadData();
   this.order = this.navParams.data;  
  }

  /*Loads data from firestore by internally calling a function*/
  loadData()
  {
    let user = firebase.auth().currentUser;
    this.getAllDocuments('users/'+user.uid+'/orders').then((e)=>{
      this.orderItem = e; });
      
  }

  /* Takes firestore collection name as parameter , fetches all the documents listed in that collection.*/
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
                   this.itemsArr= arr;
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
 /* Retrieves the current order number that can be accepted, and if valid writes the order placed at that table in managers side*/
 async manager()
{
  var docRef= this.db.collection('Menu').doc('creamyNuts');
  await docRef.get().then(documentSnapshot => {
  this.orderno = documentSnapshot.get('Tables');  
  });      
  
  if(this.orderno < 9)
  {
  for(let i in this.itemsArr)
   {
      this.db.collection("Manager").doc("2gPM1A66R4TpmqsFtmT9QGNEcml1").collection('Order '+ this.orderno).doc(i).set(this.itemsArr[i])
      .then(function() {
          console.log("Document successfully written to manager!");
      })
      .catch(function(error) {
          console.error("Error writing document: ", error);
      });      
     }
   }
   else
   {
     console.log("Sorry max orders reached");
     this.orderno=0;
   }
  console.log("scopecheck"+ this.orderno);
  return this.orderno;
}

/*Clears previous order at manager side so that overwriting happens correctly*/
async deleteorder()
{ 
 var collectionRef= this.db.collection("Manager").doc("2gPM1A66R4TpmqsFtmT9QGNEcml1").collection('Order '+ this.orderno);
 collectionRef.get()
.then(querySnapshot => {
  querySnapshot.forEach((doc) => {
    doc.ref.delete().then(() => {
      console.log("Document successfully deleted previous order !");
    }).catch(function(error) {
      console.error("Error removing document: ", error);
    });
  });
})
.catch(function(error) {
  console.log("Error getting documents: ", error);
});
}


async copyToManager()
{
  //await this.deleteorder();
  var newOrderno= await this.manager();
  console.log("hi"+ newOrderno);

  var docRef = this.db.collection("Menu").doc("creamyNuts");
return docRef.update({
    Tables: newOrderno+1
})
.then(function() {
    console.log("Document successfully updated!");
})
.catch(function(error) {
    // The document probably doesn't exist.
    console.error("Error updating document: ", error);
});
}

placeFinalOrder()
{
 let user = firebase.auth().currentUser; 

  this.copyToManager();
//  this.manager();

  for(let i in this.itemsArr)
   {
      this.db.collection("users").doc(user.uid).collection("orderPrevious").doc(i).set(this.itemsArr[i])
      .then(function() {
          console.log("Document successfully written 1!");
      })
      .catch(function(error) {
          console.error("Error writing document: ", error);
      });     
   }  


    for(let i in this.itemsArr)
    {
    this.db.collection('users/'+user.uid+'/orders').doc(i).delete().then(function() {
    console.log("Document successfully deleted!");
    })
    .catch(function(error) {
      console.error("Error removing document: ", error);
     });
   }

   this.orderAlert();
 
}
orderAlert()
{
  
 this.navCtrl.push(OrderApprovedPage);   
  
}

sum()
{
  let user = firebase.auth().currentUser;
  this.totalsum=0;
  this.buttonClicked = !this.buttonClicked;


  for(let i in this.itemsArr)
  {
  var docRef= this.db.collection('users/'+user.uid+'/orders').doc(i);
  docRef.get().then(documentSnapshot => {
  this.field = documentSnapshot.get('Price');
  this.quantity = documentSnapshot.get('Quantity');
  this.totalsum = this.totalsum+ (this.field * this.quantity);
  console.log(this.totalsum);
  });
  
 }
   console.log('this.buttonClicked');
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad BillingPage');
  }

}
