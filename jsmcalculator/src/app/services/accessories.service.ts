import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

let token = localStorage.getItem('token');
const httpOptions = {
  headers: new HttpHeaders({"authorization": 'Bearer '+token, "Content-Type": "application/json" }),
};




@Injectable({
  providedIn: 'root'
})
export class AccessoriesService {

  constructor(private http: HttpClient) { }

  getAllAccessoriess(){
 
    return this.http.get("/api/v1/accessories/", httpOptions);
  }

  getAccessories(accessoriesId){
    return this.http.get("/api/v1/accessories/" + accessoriesId, httpOptions);
  }

  createAccessories(newAccessories){
    return this.http.post("/api/v1/accessories/", newAccessories, httpOptions);
  }

  updateAccessories(accessoriesId, newAccessories){
    return this.http.patch("/api/v1/accessories/" + accessoriesId, newAccessories, httpOptions)
  }

  deleteAccessories(accessoriesId){
    return this.http.delete("/api/v1/accessories/" + accessoriesId, httpOptions)
  }

  getAccessoriesByOther(params){
    return this.http.get("/api/v1/accessories/" + params, httpOptions);
  }
}
