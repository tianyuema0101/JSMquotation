import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';

let token = localStorage.getItem('token');
const httpOptions = {
  headers: new HttpHeaders({"authorization": 'Bearer '+ token, "Content-Type": "application/json" }),
};

@Injectable({
  providedIn: 'root'
})
export class IpServiceService {

  constructor(private http:HttpClient) { }  

  getIPAddress()  
  {  
    return this.http.get("https://jsonip.com"); 
  }

  isIpPermission(permissionData){
    return this.http.post("/api/v1/ipAddress/ipPermision", permissionData)
  }

  getAllIpAddress(){
    return this.http.get("/api/v1/ipAddress/", httpOptions);
  }

  getIpAddress(ipAddressId){
    return this.http.get("/api/v1/ipAddress/" + ipAddressId, httpOptions);
  }

  createIpAddress(newIpAddress){
    return this.http.post("/api/v1/ipAddress/", newIpAddress, httpOptions);
  }

  updateIpAddress(ipAddressId, newIpAddress){
    return this.http.patch("/api/v1/ipAddress/" + ipAddressId, newIpAddress, httpOptions)
  }

  deleteIpAddress(ipAddressId){
    return this.http.delete("/api/v1/ipAddress/" + ipAddressId, httpOptions)
  }

  getIpAddressByOther(params){
    return this.http.get("/api/v1/ipAddress/" + params, httpOptions )
  }

  registerIpAddress(newData){
    return this.http.post("/api/v1/ipAddress/register", newData);
  }
}
