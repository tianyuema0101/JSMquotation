import { Component, OnInit } from '@angular/core';
import { InstallationService } from '../../services/installation.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-installation-profile',
  templateUrl: './installation-profile.component.html',
  styleUrls: ['./installation-profile.component.css']
})
export class InstallationProfileComponent implements OnInit {

  types: string[] = ['Lawn', 'Single', 'Double', 'Additional Charge', 'Delivery', 'Other'];
  currentInstallation =  {name:"",monumentType:"",price:0};
  id;

  constructor(private installationService: InstallationService,
              private router: Router,
              private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id) {
       this.installationService.getInstallation(this.id).subscribe(result=>{
         //console.log(result['data']['installation']);
          this.currentInstallation =result['data']['installation'];
      });
    }
  }

  ngOnInit(): void {
  }

  save(newInstallation){
    if(this.id) {
      this.installationService.updateInstallation(this.id,newInstallation).subscribe(result=>{
        this.router.navigate(['/installationslist'])
      });
    }
    else{
        this.installationService.createInstallation(newInstallation).subscribe(result=>{
          this.router.navigate(['/installationslist'])
    });
      
    }
  }

  deleteInstallation(){
    if(confirm('Are you sure you want to delete this product?')){
      this.installationService.deleteInstallation(this.id).subscribe(result=>{
        this.router.navigate(['/installationslist'])
      });
    }
    return
  }
}
