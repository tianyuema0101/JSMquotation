import { Component, OnInit } from '@angular/core';
import { CastingService } from '../../services/casting.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-casting-profile',
  templateUrl: './casting-profile.component.html',
  styleUrls: ['./casting-profile.component.css']
})
export class CastingProfileComponent implements OnInit {
  currentCasting =  {name:"",size:"",price:0};
  id;

  constructor(private castingService: CastingService,
              private router: Router,
              private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id) {
       this.castingService.getCasting(this.id).subscribe(result=>{
         //console.log(result['data']['casting']);
          this.currentCasting =result['data']['casting'];
      });
    }
  }

  ngOnInit(): void {
  }

  save(newCasting){
    if(this.id) {
      this.castingService.updateCasting(this.id,newCasting).subscribe(result=>{
        this.router.navigate(['/castingslist'])
      });
    }
    else{
        this.castingService.createCasting(newCasting).subscribe(result=>{
          this.router.navigate(['/castingslist'])
    });
      
    }
  }

  deleteCasting(){
    if(confirm('Are you sure you want to delete this product?')){
      this.castingService.deleteCasting(this.id).subscribe(result=>{
        this.router.navigate(['/castingslist'])
      });
    }
    return
  }

}
