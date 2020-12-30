import { Component, OnInit } from '@angular/core';
import { InscriptionService } from '../../services/inscription.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-inscription-profile',
  templateUrl: './inscription-profile.component.html',
  styleUrls: ['./inscription-profile.component.css']
})
export class InscriptionProfileComponent implements OnInit {
  currentInscription =  {name:"",type:"",price:0};
  id;

  constructor(private inscriptionService: InscriptionService,
              private router: Router,
              private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id) {
       this.inscriptionService.getInscription(this.id).subscribe(result=>{
         console.log(result['data']['inscription']);
          this.currentInscription =result['data']['inscription'];
      });
    }
  }

  ngOnInit(): void {
  }

  save(newInscription){
    if(this.id) {
      this.inscriptionService.updateInscription(this.id,newInscription).subscribe(result=>{
        this.router.navigate(['/inscriptionslist'])
      });
    }
    else{
        this.inscriptionService.createInscription(newInscription).subscribe(result=>{
          this.router.navigate(['/inscriptionslist'])
    });
      
    }
  }

  deleteInscription(){
    if(confirm('Are you sure you want to delete this product?')){
      this.inscriptionService.deleteInscription(this.id).subscribe(result=>{
        this.router.navigate(['/inscriptionslist'])
      });
    }
    return
  }
}
