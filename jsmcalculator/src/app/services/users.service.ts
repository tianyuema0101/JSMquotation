import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getAllUsers(){
    return this.http.get("/api/v1/users/");
  }

  createUser(newUser){
    return this.http.post("/api/v1/users/signup/", newUser, httpOptions)
  }

  getUser(userId){
    return this.http.get("/api/v1/users/" + userId)
  }

  updateUser(userId, newUser){
    return this.http.patch("/api/v1/users/" + userId, newUser, httpOptions);
  }

  deleteUser(userId){
    return this.http.delete("/api/v1/users/" + userId)
  }

  resetPassword(userId, newPassword){
    return this.http.patch("/api/v1/users/updatePassword/" + userId, newPassword, httpOptions);
  }
}
