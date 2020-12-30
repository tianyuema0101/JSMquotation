import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

let token = localStorage.getItem('token');
const httpOptions = {
  headers: new HttpHeaders({"authorization": 'Bearer '+token, "Content-Type": "application/json" }),
  };




@Injectable({
  providedIn: 'root'
})
export class FoundationService {

  constructor(private http: HttpClient) { }

  getAllFoundations(){
 
    return this.http.get("/api/v1/foundation/", httpOptions);
  }

  getFoundation(foundationId){
    return this.http.get("/api/v1/foundation/" + foundationId, httpOptions);
  }

  createFoundation(newFoundation){
    return this.http.post("/api/v1/foundation/", newFoundation, httpOptions);
  }

  updateFoundation(foundationId, newFoundation){
    return this.http.patch("/api/v1/foundation/" + foundationId, newFoundation, httpOptions)
  }

  deleteFoundation(foundationId){
    return this.http.delete("/api/v1/foundation/" + foundationId, httpOptions)
  }
}
