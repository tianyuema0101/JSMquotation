import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

let token = localStorage.getItem('token');
const httpOptions = {
    headers: new HttpHeaders({"authorization": 'Bearer '+ token, "Content-Type": "application/json" }),
  };
  


@Injectable({
  providedIn: 'root'
})
export class QuoteService {

  constructor(private http: HttpClient) { }

  getAllQuotes(){
    let token = localStorage.getItem('token');
    const httpOptions1 = {
      headers: new HttpHeaders({"authorization": 'Bearer '+ token, "Content-Type": "application/json" }),
    };
    return this.http.get("/api/v1/quote/", httpOptions1);
  }

  getQuote(quoteId){
    return this.http.get("/api/v1/quote/" + quoteId, httpOptions);
  }

  createQuote(newQuote){
    return this.http.post("/api/v1/quote/", newQuote, httpOptions);
  }

  updateStatus(id, newStatus){
    return this.http.patch("/api/v1/quote/"+ id,newStatus, httpOptions );
  }

  checkPhone(phoneNUmber){
    return this.http.get("/api/v1/quote/checkphone/" + phoneNUmber, httpOptions)
  }
}
