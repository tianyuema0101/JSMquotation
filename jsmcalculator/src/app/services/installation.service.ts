import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

let token = localStorage.getItem('token');
const httpOptions = {
  headers: new HttpHeaders({"authorization": 'Bearer '+token, "Content-Type": "application/json" }),
  };




@Injectable({
  providedIn: 'root'
})
export class InstallationService {

  constructor(private http: HttpClient) { }

  getAllInstallations(){
 
    return this.http.get("/api/v1/install/", httpOptions);
  }

  getInstallation(installationId){
    return this.http.get("/api/v1/install/" + installationId, httpOptions);
  }

  createInstallation(newInstallation){
    return this.http.post("/api/v1/install/", newInstallation, httpOptions);
  }

  updateInstallation(installationId, newInstallation){
    return this.http.patch("/api/v1/install/" + installationId, newInstallation, httpOptions)
  }

  deleteInstallation(installationId){
    return this.http.delete("/api/v1/install/" + installationId, httpOptions)
  }
}
