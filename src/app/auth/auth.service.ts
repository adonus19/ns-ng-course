import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
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
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient) { }

  get user() {
    return this._user.asObservable();
  }

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_API_KEY}`,
      { email: email, password: password, returnSecureToken: true })
      .pipe(catchError(errRes => {
        this.handleError(errRes.error.error.message);
        return throwError(errRes);
      }),
        tap(res => {
          if (res && res.idToken) {
            this.handleLogin(email, res.idToken, res.localId, parseInt(res.expiresIn));
          }
        }));
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`,
      { email: email, password: password, returnSecureToken: true })
      .pipe(catchError(errRes => {
        this.handleError(errRes.error.error.message);
        return throwError(errRes);
      }),
        tap(res => {
          if (res && res.idToken) {
            this.handleLogin(email, res.idToken, res.localId, parseInt(res.expiresIn));
          }
        }));
  }

  private handleLogin(email: string, token: string, userId: string, expiresIn: number) {
    const expiration = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expiration);
    this._user.next(user);
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