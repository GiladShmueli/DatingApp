import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// This means that this service can be injected into other components or other services in our application.
@Injectable({ 
  providedIn: 'root'
})
export class AccountService {
  baseUrl = 'https://localhost:5001/api/';

  constructor(private http: HttpClient) { }

  login(model: any)
  {
    return this.http.post(this.baseUrl + 'account/login', model);
  }
}
