import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

let token = localStorage.getItem('token');
const httpOptions = {
  headers: new HttpHeaders({"authorization": 'Bearer '+token, "Content-Type": "application/json" }),
  };




@Injectable({
  providedIn: 'root'
})
export class CastingService {

  constructor(private http: HttpClient) { }

  getAllCastings(){
 
    return this.http.get("/api/v1/casting/", httpOptions);
  }

  getCasting(castingId){
    return this.http.get("/api/v1/casting/" + castingId, httpOptions);
  }

  createCasting(newCasting){
    return this.http.post("/api/v1/casting/", newCasting, httpOptions);
  }

  updateCasting(castingId, newCasting){
    return this.http.patch("/api/v1/casting/" + castingId, newCasting, httpOptions)
  }

  deleteCasting(castingId){
    return this.http.delete("/api/v1/casting/" + castingId, httpOptions)
  }
}
