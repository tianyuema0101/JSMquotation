import { Component, OnInit } from '@angular/core';
import { IpServiceService } from '../../services/ip-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-ip-register',
  templateUrl: './ip-register.component.html',
  styleUrls: ['./ip-register.component.css']
})
export class IpRegisterComponent implements OnInit {
  currentIp =  {location:"",ip:"", email:"", password:""};
  constructor(private ipService: IpServiceService,
              private router: Router) {
    this.ipService.getIPAddress().subscribe(res=>{
      this.currentIp.ip = res['ip'];
      console.log(this.currentIp);
    })
   }

  ngOnInit(): void {
  }

  save(newIpAddress){
    console.log(newIpAddress);
    this.ipService.registerIpAddress(newIpAddress).subscribe(result=>{
          this.router.navigate(['/'])
    });
  }

}
