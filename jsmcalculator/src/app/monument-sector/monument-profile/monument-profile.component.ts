import { Component, OnInit } from '@angular/core';
import { MonumentService } from '../../services/monument.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-monument-profile',
  templateUrl: './monument-profile.component.html',
  styleUrls: ['./monument-profile.component.css']
})
export class MonumentProfileComponent implements OnInit {
  sizes: string[] = ['0.15-0.35 Cubic', '0.35-0.91 Cubic', '0.91-1.7 Cubic'];
  currentMonument =  {englishName:"",chineseName:"",color:"",origin:"",size:"",price:0};
  id;

  constructor(private monumentService: MonumentService,
              private router: Router,
              private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id) {
       this.monumentService.getMonument(this.id).subscribe(result=>{
         console.log(result['data']['monument']);
          this.currentMonument =result['data']['monument'];
      });
    }
  }

  ngOnInit(): void {
  }

  save(newMonument){
    if(this.id) {
      this.monumentService.updateMonument(this.id,newMonument).subscribe(result=>{
        this.router.navigate(['/monumentslist'])
      });
    }
    else{
        this.monumentService.createMonument(newMonument).subscribe(result=>{
          this.router.navigate(['/monumentslist'])
    });
      
    }
  }

  deleteMonument(){
    if(confirm('Are you sure you want to delete this product?')){
      this.monumentService.deleteMonument(this.id).subscribe(result=>{
        this.router.navigate(['/monumentslist'])
      });
    }
    return
  }
}
