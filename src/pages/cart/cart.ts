import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { BillingPage } from '../billing/billing';


@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage
{
  orderno :any;
  orderItem: any;
  private db: any;
  order: any;
  quantity: any;
  quant: 1;
  order1: any;
  orderQuant: any;
 

  constructor(public navCtrl: NavController, public navParams: NavParams)
  {  
   this.db = firebase.firestore();  
   this.loadData();
   this.order = this.navParams.data;
   
  }

  loadData()
  {
    let user = firebase.auth().currentUser;
    this.getAllDocuments('users/'+user.uid+'/orders').then((e)=>{
    this.orderItem = e; });
    
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



/*update(order)
{
 /*let user = firebase.auth().currentUser;
    var itemRef1 = this.db.collection('users/'+user.uid+'/orders').doc(order.$key);
  //  await this.dynamicViewCart(order);
    return this.db.runTransaction(function(transaction)
    {    
        return transaction.get(itemRef1).then(function(doc)
        {
            if (!doc.exists)
            {
              throw "Document does not exist!";
            }
            var newQuantity = this.Quantity1;
           // this.quant= newQuantity;
            transaction.update(itemRef1, { Quantity: newQuantity });
        });
    }).then(function()
    {
      console.log("Transaction successfully committed!");
      
    }).catch(function(error)
    {
      console.log("Transaction failed: ", error);
    });

}*/
 async addItem(order)
{
   this.orderQuant = order.Quantity;
   this.orderQuant= this.orderQuant+1;
    let user = firebase.auth().currentUser;
    var itemRef1 = this.db.collection('users/'+user.uid+'/orders').doc(order.$key);
  //  await this.dynamicViewCart(order);
    return this.db.runTransaction(function(transaction)
    {    
        return transaction.get(itemRef1).then(function(doc)
        {
            if (!doc.exists)
            {
              throw "Document does not exist!";
            }
            var newQuantity = doc.data().Quantity + 1;
           // this.quant= newQuantity;
            transaction.update(itemRef1, { Quantity: newQuantity });
        });
    }).then(function()
    {
      console.log("Transaction successfully committed!");
      
    }).catch(function(error)
    {
      console.log("Transaction failed: ", error);
    });

    
}

/*async dynamicViewCart(order)
{
  let user = firebase.auth().currentUser;
  var docRef = this.db.collection('users/'+user.uid+'/orders').doc(order.$key);
  await docRef.get().then(documentSnapshot => {
  this.quant = documentSnapshot.get('Quantity');
  console.log('quantity'+ this.quant);
  });
 // console.log('quantity'+ this.quant);
}*/

 async removeItem(order)
{
    this.orderQuant = order.Quantity;
    this.orderQuant = this.orderQuant-1;
    let user = firebase.auth().currentUser;
    var itemRef = this.db.collection('users/'+user.uid+'/orders').doc(order.$key);
  //  await this.dynamicViewCart(order);
    return this.db.runTransaction(function(transaction)
    {    
        return transaction.get(itemRef).then(function(doc)
        {
            if (!doc.exists)
            {
              throw "Document does not exist!";
            }
            var newQuantity = doc.data().Quantity - 1;
           // this.quant= newQuantity;
            transaction.update(itemRef, { Quantity: newQuantity });
        });
    }).then(function()
    {
      console.log("Transaction successfully committed!");
    }).catch(function(error)
    {
      console.log("Transaction failed: ", error);
    });

 //   this.dynamicViewCart(order);
   
  }

async submitOrder(order)
 {
   var docRef= this.db.collection('Menu').doc('creamyNuts');
   await docRef.get().then(documentSnapshot => {
   this.orderno = documentSnapshot.get('Tables');  
  });
  //this.update(order);
 // console.log("order"+order.Name+order.Quantity);
 /*************************Delete previous order*****************/
 var collectionRef= this.db.collection("Manager").doc("2gPM1A66R4TpmqsFtmT9QGNEcml1").collection('Order '+ this.orderno);
     collectionRef.get()
.      then(querySnapshot => {
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
  this.navCtrl.push(BillingPage);   
  }


  updateQuant(){
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
   // this.dynamicViewCart(order);
    }

}
