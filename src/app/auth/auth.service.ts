import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { alert } from 'tns-core-modules/ui/dialogs';
import { User } from './user.model';

const FIREBASE_API_KEY = 'AIzaSyD0PS53CO7OBhZbzz8EfPMVBvGfDrVHfZs';

interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(private http: HttpClient) { }

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_API_KEY}`,
      { email: email, password: password, returnSecureToken: true })
      .pipe(catchError(errRes => {
        this.handleError(errRes.error.error.message);
        return throwError(errRes);
      }),
        tap(res => {
          if (res && res.idToken) {
            const expiration = new Date(new Date().getTime() + parseInt(res.expiresIn) * 1000);
            const user = new User(email, res.localId, res.idToken, expiration);
          }
        }));
  }

  login(email: string, password: string) {
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`,
      { email: email, password: password, returnSecureToken: true })
      .pipe(catchError(errRes => {
        this.handleError(errRes.error.error.message);
        return throwError(errRes);
      }));
  }

  private handleError(errorMessage: string) {
    switch (errorMessage) {
      case 'EMAIL_EXISTS':
        alert('This email exists already');
        break;
      case 'EMAIL_NOT_FOUND':
        alert('Email not found');
        break;
      case 'INVALID_PASSWORD':
        alert('Your password is invalid');
        break;
      default:
        alert('Authentication failed, check your credentials');
    }
  }
}