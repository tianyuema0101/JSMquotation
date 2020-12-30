import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
let token = localStorage.getItem('token');
const httpOptions = {
    headers: new HttpHeaders({"authorization": 'Bearer '+token, "Content-Type": "application/json" }),
  };


@Injectable({
  providedIn: 'root'
})
export class MonumentService {

  constructor(private http: HttpClient) { }

  getAllMonuments(){
    return this.http.get("/api/v1/monument/", httpOptions);
  }

  getMonument(monumentId){
    return this.http.get("/api/v1/monument/" + monumentId, httpOptions);
  }

  createMonument(newMonument){
    return this.http.post("/api/v1/monument/", newMonument, httpOptions);
  }

  updateMonument(monumentId, newMonument){
    return this.http.patch("/api/v1/monument/" + monumentId, newMonument, httpOptions)
  }

  deleteMonument(monumentId){
    return this.http.delete("/api/v1/monument/" + monumentId, httpOptions)
  }

  getMonumentByOther(params){
    return this.http.get("/api/v1/monument/" + params, httpOptions )
  }

  getMateiralDiscount(){
    return this.http.get("/api/v1/monument/discount/"+ "5fd988833f005c069b66f844", httpOptions)
  }

  updateMateiralDiscount(newDiscount){
    return this.http.patch("/api/v1/monument/discount/"+ "5fd988833f005c069b66f844", newDiscount, httpOptions)
  }
}
