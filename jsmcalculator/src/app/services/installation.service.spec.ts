import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

let token = localStorage.getItem('token');
const httpOptions = {
  headers: new HttpHeaders({"authorization": 'Bearer '+token, "Content-Type": "application/json" }),
  };




@Injectable({
  providedIn: 'root'
})
export class InscriptionService {

  constructor(private http: HttpClient) { }

  getAllInscriptions(){
 
    return this.http.get("/api/v1/inscription/", httpOptions);
  }

  getInscription(inscriptionId){
    return this.http.get("/api/v1/inscription/" + inscriptionId, httpOptions);
  }

  createInscription(newInscription){
    return this.http.post("/api/v1/inscription/", newInscription, httpOptions);
  }

  updateInscription(inscriptionId, newInscription){
    return this.http.patch("/api/v1/inscription/" + inscriptionId, newInscription, httpOptions)
  }

  deleteInscription(inscriptionId){
    return this.http.delete("/api/v1/inscription/" + inscriptionId, httpOptions)
  }
}
