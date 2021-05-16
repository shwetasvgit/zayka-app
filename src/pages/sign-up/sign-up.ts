import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFireAuth} from 'angularfire2/auth';
import { User } from "../../models/user";
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {

  user = {} as User ;
  constructor(private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
  }
 
    async signUp(user : User) {
    const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
    console.log(result);
    if(result)
    {
    this.navCtrl.push(LoginPage);

    }
    } 

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }


}
