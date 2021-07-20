import { Component } from '@angular/core';
import axios from 'axios';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  strikeCheckout:any = null;
  stripeKey = 'pk_test_51JCZJNGQvqXDs7J1RxmKDzaMkfcXD1vSYWUVHUcAUMT1OWBmDonpnAtq0BvV5G4dxDoT0vTRWhpciEVPfpKc1W8800XSlzHDpm';
  checkoutUrl = 'https://checkout.stripe.com/checkout.js';
  isPaymentDone = false;
  isSuccess = false;
  constructor() { }

  ngOnInit() {
    this.stripePaymentGateway();
  }
  
  checkout(amount: number) {
    const strikeCheckout = (<any>window).StripeCheckout.configure({
      key: this.stripeKey,
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log(stripeToken)
        axios.post('https://dhhadac5f1t2b.cloudfront.net/api/v1/users/charge', { stripeToken, amount: amount * 100 }).then((res: any) => {
          this.isPaymentDone = true;
          if(res.success === 1) {
            this.isSuccess = true;
            }
            this.isSuccess = false;
        })
        // alert('Stripe token generated!');
      }
    });
  
    strikeCheckout.open({
      name: 'Offpeak Media',
      description: 'Offpeak Media One Time Charge',
      amount: amount * 100
    });
  }
  
  stripePaymentGateway() {
    if(!window.document.getElementById('stripe-script')) {
      const scr = window.document.createElement("script");
      scr.id = "stripe-script";
      scr.type = "text/javascript";
      scr.src = this.checkoutUrl;

      scr.onload = () => {
        this.strikeCheckout = (<any>window).StripeCheckout.configure({
          key: this.stripeKey,
          locale: 'auto',
          token: function (token: any) {
            console.log(token)
    
          }
        });
      }
        
      window.document.body.appendChild(scr);
    }
  }
}
