import { Component, OnInit } from '@angular/core';
import { FoundationService } from '../../services/foundation.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-foundation-profile',
  templateUrl: './foundation-profile.component.html',
  styleUrls: ['./foundation-profile.component.css']
})
export class FoundationProfileComponent implements OnInit {
  currentFoundation =  {name:"",description:"",price:0};
  id;

  constructor(private foundationService: FoundationService,
              private router: Router,
              private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id) {
       this.foundationService.getFoundation(this.id).subscribe(result=>{
         console.log(result['data']['foundation']);
          this.currentFoundation =result['data']['foundation'];
      });
    }
  }

  ngOnInit(): void {
  }

  save(newFoundation){
    if(this.id) {
      this.foundationService.updateFoundation(this.id,newFoundation).subscribe(result=>{
        this.router.navigate(['/foundationslist'])
      });
    }
    else{
        this.foundationService.createFoundation(newFoundation).subscribe(result=>{
          this.router.navigate(['/foundationslist'])
    });
      
    }
  }

  deleteFoundation(){
    if(confirm('Are you sure you want to delete this product?')){
      this.foundationService.deleteFoundation(this.id).subscribe(result=>{
        this.router.navigate(['/foundationslist'])
      });
    }
    return
  }
}
