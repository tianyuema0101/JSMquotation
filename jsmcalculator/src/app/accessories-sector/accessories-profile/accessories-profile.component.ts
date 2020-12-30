import { Component, OnInit } from '@angular/core';
import { AccessoriesService } from '../../services/accessories.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-accessories-profile',
  templateUrl: './accessories-profile.component.html',
  styleUrls: ['./accessories-profile.component.css']
})
export class AccessoriesProfileComponent implements OnInit {
  currentAccessories =  {name:"",description:"",accessoriesType:"",size:"",price:0};
  id;
  accessoriesType = ['accessories', 'door', 'photo'];

  constructor(private accessoriesService: AccessoriesService,
              private router: Router,
              private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id) {
       this.accessoriesService.getAccessories(this.id).subscribe(result=>{
         console.log(result['data']['accessories']);
          this.currentAccessories =result['data']['accessories'];
      });
    }
  }

  ngOnInit(): void {
  }

  save(newAccessories){
    if(this.id) {
      this.accessoriesService.updateAccessories(this.id,newAccessories).subscribe(result=>{
        this.router.navigate(['/accessorieslist'])
      });
    }
    else{
        this.accessoriesService.createAccessories(newAccessories).subscribe(result=>{
          this.router.navigate(['/accessorieslist'])
    });
      
    }
  }

  deleteAccessories(){
    if(confirm('Are you sure you want to delete this product?')){
      this.accessoriesService.deleteAccessories(this.id).subscribe(result=>{
        this.router.navigate(['/accessorieslist'])
      });
    }
    return
  }
}
