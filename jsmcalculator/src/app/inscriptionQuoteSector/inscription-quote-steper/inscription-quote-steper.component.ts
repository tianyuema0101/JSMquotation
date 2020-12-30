import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';
import { InscriptionService } from 'src/app/services/inscription.service';
import { AuthService } from 'src/app/services/auth.service';
import { InscriptionQuoteService } from 'src/app/services/inscription-quote.service';


@Component({
  selector: 'app-inscription-quote-steper',
  templateUrl: './inscription-quote-steper.component.html',
  styleUrls: ['./inscription-quote-steper.component.css']
})
export class InscriptionQuoteSteperComponent implements OnInit {

  monumentStyles = ['Lawn', 'Single', 'Double', 'Family'];
  
  inscriptionTypeList: string[] = ['English', 'Chinese', 'Arabic', 'Decoration'];
  doorList;
  currentQuote = {
    name: "",
    phone: "",
    email: "",
    cemetary: "",
    section: "",
    inscription: [],
    note: "",
    funeralProvider: "",
    advertisement: "",
    extraFee: 0,
    permitFee: 0
  };

  customerFormGroup: FormGroup;
  styleFormGroup: FormGroup;
  permitFormGroup: FormGroup;
  inscriptionFormGroup: FormGroup;
  
  extraFeeFormGroup: FormGroup;


  inscriptionList = [];
  inscriptionCollection = [{"inscriptionNumber":0}];
  inscriptionNameCollection = [[]]
  inscription_id = 0;


  constructor(private _formBuilder: FormBuilder,
    private inscriptionService: InscriptionService,
    private authService: AuthService,
    private inscriptionQuoteService: InscriptionQuoteService,
    private router: Router) { }

  ngOnInit() {
    this.customerFormGroup = this._formBuilder.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: [''],
      cemetery: [''],
      section: [''],
      funeralProvider: [''],
      advertisement: [''],
      row:[''],
      grave_no:[''],
    });
    this.styleFormGroup = this._formBuilder.group({
      monumentStyle: ['', Validators.required]
    });

    this.permitFormGroup = this._formBuilder.group({
      permitFee: ['', Validators.required]
    });

   

    this.inscriptionFormGroup = this._formBuilder.group({
      inscriptionType0: ['',],
      inscription0: ['',],
      inscriptionNumber0: ['',],
    });

    this.extraFeeFormGroup = this._formBuilder.group({
      extraFee: ['', Validators.required]
    });

    this.extraFeeFormGroup = this._formBuilder.group({
      extraFee: ['', Validators.required]
    });
  }

  
  //inscription part
  filterInscription(type, index) {
    this.inscriptionNameCollection[index] = [];
    this.getInscription(type, index);
  }

  getInscription(type, index) {
    let params = '?type=' + type;
    this.inscriptionService.getInscriptionByOther(params).subscribe(result => {
      result['data']['inscription'].forEach(element => {
        this.inscriptionNameCollection[index].push({ name: element.name, _id: element._id });
      })
    })
  }

  addInscription() {
    this.inscription_id += 1;
    this.inscriptionFormGroup.addControl(('inscriptionType' + this.inscription_id), this._formBuilder.control(''));
    this.inscriptionFormGroup.addControl(('inscription' + this.inscription_id), this._formBuilder.control(''));
    this.inscriptionFormGroup.addControl(('inscriptionNumber' + this.inscription_id), this._formBuilder.control(''));
    this.inscriptionCollection.push({"inscriptionNumber":0});
  }

  removeInscription(index) {
    this.inscriptionCollection.splice(index, 1);
  }

  


  submitData() {
    let customerData = this.customerFormGroup.value;
    let monumentType = this.styleFormGroup.value;
    let permitData = this.permitFormGroup.value;
    let extraData = this.extraFeeFormGroup.value;
    

    let quoteData = { ...customerData, ...monumentType, ...permitData, ...extraData};
    
    quoteData.accessories = [];
    quoteData.monument = [];
    quoteData.inscription = [];
    quoteData.casting =[];
    

    if (this.inscriptionCollection[0]['inscriptionId'] != undefined && this.inscriptionCollection[0]['inscriptionNumber'] != undefined ) {
      this.inscriptionCollection.forEach(element => {
        if (element['inscriptionNumber'] != undefined && element['inscriptionId'] != undefined) {
          quoteData.inscription.push({
            inscriptionId: element['inscriptionId'],
            inscriptionNumber: element['inscriptionNumber']
          })
        }
      })
    }
    quoteData.staff = this.authService.currentUserId();
    this.clean(quoteData);
    console.log(quoteData)
    this.inscriptionQuoteService.checkPhone(quoteData.phone).subscribe(res=>{
      if(res['status']== 'old'){
        if(confirm('This Customer got a quote from ' + res['data']['name'])){
          this.inscriptionQuoteService.createInscriptionQuote(quoteData).subscribe((result)=>{
            if(result['data']['quoteId']){
              let quoteId = result['data']['quoteId']
               this.router.navigate(['/InscriptionQuotesDetail/' + quoteId])
            }
        });
        }
      }
      else{
        this.inscriptionQuoteService.createInscriptionQuote(quoteData).subscribe((result)=>{
          if(result['data']['quoteId']){
            let quoteId = result['data']['quoteId']
            this.router.navigate(['/InscriptionQuotesDetail/' + quoteId])
            console.log(quoteData);
      }
    })
    return
      }
    })

  }
  clean(obj) {
    for (var propName in obj) {
      if (obj[propName] === "" || (Array.isArray(obj[propName]) && obj[propName].length == 0)) {
        delete obj[propName];
      }
    }
  }

}
