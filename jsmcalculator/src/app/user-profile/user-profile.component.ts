import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  roles: string[] = ['user', 'guide', 'lead-guide', 'admin'];
  currentUser = {};
  id;
  editProfile = true;
  resetPassword = false;
  comfirmPassworError = false;

  constructor(private usersService: UsersService,
              private router: Router,
              private route: ActivatedRoute) { 

      this.id = this.route.snapshot.paramMap.get('id');
      if(this.id) {

        this.usersService.getUser(this.id).subscribe(result=>{
          this.currentUser =result['data']['user'];
        });
      }
      else{
        this.resetPassword = true;
      }
      let url = this.router.url;
      if(url.split('/')[1] === "resetpassword"){
        this.editProfile = false;
        this.resetPassword = true;
      }
  }

  ngOnInit() {
  }
  
  //create user
  save(newUser){
    if(this.id) {
      this.usersService.updateUser(this.id,newUser).subscribe(result=>{
        this.router.navigate(['/userslist'])
      });
    }
    else{
      if(newUser.password === newUser.passwordConfirm){
        this.comfirmPassworError = false;
        this.usersService.createUser(newUser).subscribe(result=>{
          this.router.navigate(['/userslist'])
        });
      }else{
        this.comfirmPassworError = true;
      }
    }
  }

  deleteUser(){
    if(confirm('Are you sure you want to delete this product?')){
      console.log("works")
      this.usersService.deleteUser(this.id).subscribe(result=>{
        this.router.navigate(['/userslist'])
      });
    }
    return
  }

  changePassword(newPassword){
    if(newPassword.password === newPassword.passwordConfirm){
      this.comfirmPassworError = false;
      this.usersService.resetPassword(this.id, newPassword).subscribe(result=>{
        this.router.navigate(['/userslist'])
      })
    }else{
      this.comfirmPassworError = true;
    }
    
  }

}
