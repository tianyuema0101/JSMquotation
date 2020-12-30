import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { IpServiceService } from './ip-service.service'; 
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class IpGuard implements CanActivate {
  ip;
  constructor(private router: Router,
    private ipService: IpServiceService) { }

  canActivate(){
    return this.ipService.getIPAddress().pipe(map(res=>{ 
      let ipaddress =res['ip'];
      console.log({ip:ipaddress});
      if(ipaddress){
        this.ipService.isIpPermission({ip:ipaddress}).subscribe(res=>{
          console.log(res['status'])
          if(res['status'])
            return res['status'];
          else{
            this.router.navigate(['/nopermission']);
            return res['status'];
          }
        })
      }
      else return false; }
    ))
  }
}
