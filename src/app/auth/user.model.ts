export class User {
  constructor(public email: string, public id: string, public _token: string, public _tokenExpirationDate: Date) { }

  get token() {
    return this._token;
  }
}