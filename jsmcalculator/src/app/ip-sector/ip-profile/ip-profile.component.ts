import { Component, OnInit } from '@angular/core';
import { IpServiceService } from '../../services/ip-service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ip-profile',
  templateUrl: './ip-profile.component.html',
  styleUrls: ['./ip-profile.component.css']
})
export class IpProfileComponent implements OnInit {
  currentIp =  {location:"",ip:""};
  id;
  
  constructor(private ipService: IpServiceService,
              private router: Router,
              private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id) {
       this.ipService.getIpAddress(this.id).subscribe(result=>{
         console.log(result['data']['ipAddress']);
          this.currentIp =result['data']['ipAddress'];
      });
    }
  }

  ngOnInit(): void {
  }
   save(newIpAddress){
    if(this.id) {
      this.ipService.updateIpAddress(this.id,newIpAddress).subscribe(result=>{
        this.router.navigate(['/ipslist'])
      });
    }
    else{
        this.ipService.createIpAddress(newIpAddress).subscribe(result=>{
          this.router.navigate(['/ipslist'])
    });
      
    }
  }

  deleteIpAddress(){
    if(confirm('Are you sure you want to delete this product?')){
      this.ipService.deleteIpAddress(this.id).subscribe(result=>{
        this.router.navigate(['/ipslist'])
      });
    }
    return
  }


}
