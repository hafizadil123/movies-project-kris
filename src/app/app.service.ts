import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  //public
 
  /**
   *
   * @param {HttpClient} _http
   * @param {ToastrService} _toastrService
   */
  constructor(private _http: HttpClient, private _toastrService: ToastrService) {
   
  }

  
  /**
   *  Confirms if user is admin
   */
 


  /**
   * User login
   *
   * @param email
   * @param password
   * @returns user
   */
  charge(token: string, amount: any) {
    return this._http
      .post<any>(`${environment.BASE_URL}/users/charge`, { stripeToken: token, amount })
      .pipe(
        map(user => {
          // login successful if there's a jwt token in the response
          if (user) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('payment', 'true');

            // Display welcome toast!
            setTimeout(() => {
              this._toastrService.success(
                'Your Payment has been made, you can download now',
                '!',
                { toastClass: 'toast ngx-toastr', closeButton: true }
              );
            }, 2500);

          } else {
            setTimeout(() => {
              this._toastrService.error(
                'please check your details again, payment not paid',
              );
              
            }, 2500);

            // this.currentUserSubject.next(user);
          }

          return user;
        })
      );
  }
}

   