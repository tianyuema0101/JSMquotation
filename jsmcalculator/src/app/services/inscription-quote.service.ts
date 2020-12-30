import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

let token = localStorage.getItem('token');
const httpOptions = {
    headers: new HttpHeaders({"authorization": 'Bearer '+ token, "Content-Type": "application/json" }),
  };

@Injectable({
  providedIn: 'root'
})
export class InscriptionQuoteService {

  constructor(private http: HttpClient) { }

  getAllInscriptionQuotes(){
    let token = localStorage.getItem('token');
    const httpOptions1 = {
      headers: new HttpHeaders({"authorization": 'Bearer '+ token, "Content-Type": "application/json" }),
    };
    return this.http.get("/api/v1/inscriptionQuote/", httpOptions1);
  }

  getInscriptionQuote(inscriptionQuoteId){
    return this.http.get("/api/v1/inscriptionQuote/" + inscriptionQuoteId, httpOptions);
  }

  createInscriptionQuote(newInscriptionQuote){
    return this.http.post("/api/v1/inscriptionQuote/", newInscriptionQuote, httpOptions);
  }

  updateStatus(id, newStatus){
    return this.http.patch("/api/v1/inscriptionQuote/"+ id,newStatus, httpOptions );
  }

  checkPhone(phoneNUmber){
    return this.http.get("/api/v1/inscriptionQuote/checkphone/" + phoneNUmber, httpOptions)
  }
}
