import { Component, OnInit } from '@angular/core';
import { MonumentService } from '../../services/monument.service';
import { Router, ActivatedRoute } from '@angular/router';
import { InstallationService } from 'src/app/services/installation.service';
import { FoundationService } from 'src/app/services/foundation.service';
import { AccessoriesService } from 'src/app/services/accessories.service';
import { InscriptionService } from 'src/app/services/inscription.service';
import { element } from 'protractor';
import { AuthService } from 'src/app/services/auth.service';
import { QuoteService } from 'src/app/services/quote.service';


@Component({
  selector: 'app-quote-profile',
  templateUrl: './quote-profile.component.html',
  styleUrls: ['./quote-profile.component.css']
})
export class QuoteProfileComponent implements OnInit {
  colorList = [{name:'Black', displayName:'Black'},
               {name:'Grey', displayName:'Grey'},
               {name:'White', displayName:'White'},
               {name:'Red', displayName:'Red'},
               {name:'Other', displayName:'Other Color'},]
  accessoriesTypeList: string[] = ['accessories', 'door', 'photo', 'other'];
  inscriptionTypeList: string[] = ['In Yard', 'Asian']
  currentQuote =  {
    name: "",
    phone: "",
    email: "",
    cemetary: "",
    section: "",
    monument: [],
    installation:"",
    additionalInstallation:[],
    inscription:[],
    foundation: "",
    additionalFoundation:[],
    accessories: [],
    discount: 0,
    note:"",
    funeralProvider:"",
    advertisement:"",
    extraFee:0,
    permitFee:0
  };

  monumentCollection=[{}];
  monumentNameCollection =[[]];
  monumentSizeCollection = [];
  monument_id = 0;


  installationCollection=[];
  additionalInstallationCollection=[];
  foundationCollection =[]
  additionalFoundationCollection=[];
  

  accessoriesCollection =[{}];
  accessoriesNameCollection=[[]]
  accessoriesSizeCollection = [[]];
  accessories_id = 0;

  inscriptionList = [];
  inscriptionCollection = [{}];
  inscriptionNameCollection = [[]]
  inscription_id = 0;

  constructor(private monumentService: MonumentService,
              private installationService: InstallationService,
              private foundationService: FoundationService,
              private accessoriesService: AccessoriesService,
              private inscriptionService: InscriptionService,
              private authService: AuthService,
              private quoteService: QuoteService,
              private router: Router,) {
    this.installationService.getAllInstallations().subscribe(result =>{
      result['data']['installation'].forEach(element => {
        if(element.monumentType != 'Additional Charge'){
          this.installationCollection.push({id:element._id, name: element.name})
        }
        else{
          this.additionalInstallationCollection.push({id:element._id, name: element.name})
        }
      })
    });

    this.foundationService.getAllFoundations().subscribe(result =>{
      result['data']['foundation'].forEach(element => {
        if(element.type != 'Additional Charge'){
          this.foundationCollection.push({id:element._id, name: element.name})
        }
        else{
          this.additionalFoundationCollection.push({id:element._id, name: element.name})
        }
      })
    });
    
    this.inscriptionService.getAllInscriptions().subscribe(result=>{
      result['data']['inscription'].forEach(element=>{
        this.inscriptionList.push({id:element._id, name:element.name})
      })
    })
  }

  ngOnInit(): void {
  }

  getMonumentName(color, index){
    let params = '?color=' + color;
    this.monumentService.getMonumentByOther(params).subscribe(result=>{
      result['data']['monuments'].forEach(element => {
        if(!this.monumentNameCollection[index].some(e=>e.name == element.englishName)){
          this.monumentNameCollection[index].push({name:element.englishName, displayName: element.englishName + "/" + element.chineseName, sizes: [{size: element.size, _id:element._id}]});
        }
        else{
          let monumentIndex = this.monumentNameCollection[index].findIndex(e=>e.name == element.englishName);
          if(monumentIndex != -1){
            this.monumentNameCollection[index][monumentIndex].sizes.push({size: element.size, _id:element._id});
          }
        }
      })
    })
  }

  addMonument(){
    this.monumentCollection.push({});
    this.monumentNameCollection.push([]);
    this.monument_id += 1;
  }

  removeMonument(index){
    this.monumentCollection.splice(index,1);
    this.monumentNameCollection.splice(index,1);
  }

  getAccessoriesName(type,index){
    let params = '?accessoriesType=' + type;
    this.accessoriesService.getAccessoriesByOther(params).subscribe(result=>{
      result['data']['accessories'].forEach(element=>{
        if(!this.accessoriesNameCollection[index].some(e=>e.name == element.name)){
          this.accessoriesNameCollection[index].push({name:element.name, displayName:element.name, sizes: [{size: element.size, _id:element._id}]})
        }
        else{
          let accessIndex = this.accessoriesNameCollection[index].findIndex(e=>e.name == element.name);
          if(accessIndex != -1){
            this.accessoriesNameCollection[index][accessIndex].sizes.push({size: element.size, _id:element._id})
          }
        }
      })
    })
  };

  filterMonument(color,index){
    this.monumentNameCollection[index] = [];
    this.getMonumentName(color,index);
  }

  filterMonumentSize(name,index){
    this.monumentSizeCollection[index] = [];
    this.monumentSizeCollection[index] = this.monumentNameCollection[index].find(e=>e.name == name).sizes;
  }

  addAccessories(){
    this.accessoriesCollection.push([]);
    this.accessoriesNameCollection.push([]);
    this.accessories_id += 1;
  }

  removeAccessories(index){
    this.accessoriesCollection.splice(index,1);
    this.accessoriesNameCollection.splice(index,1);
  }

  filterAccessories(type, index){
    this.accessoriesNameCollection[index] = [];
    this.getAccessoriesName(type,index);
  }

  filterAccessoriesSize(name, index){
    this.accessoriesSizeCollection[index] = [];
    this.accessoriesSizeCollection[index] = this.accessoriesNameCollection[index].find(e=>e.name==name).sizes;
  }

  filterInscription(type, index){
    this.inscriptionNameCollection[index] = [];
    this.getInscription(type,index);
  }

  getInscription(type, index){
    let params = '?type=' + type;
    this.inscriptionService.getInscriptionByOther(params).subscribe(result=>{
      result['data']['inscription'].forEach(element => {
        this.inscriptionNameCollection[index].push({name: element.name, _id:element._id});
      })
    })
  }

  addInscription(){
    this.inscriptionCollection.push({});
    this.inscription_id += 1;
  }

  removeInscription(index){
    this.inscriptionCollection.splice(index,1);
  }

  save(value){
    let formData =  {
      name: value.name,
      phone: value.phone,
      email: value.email,
      cemetary: value.cemetary,
      section: value.section,
      monument: [],
      installation:value.installation,
      additionalInstallation:value.additionalInstallation,
      inscription:[],
      foundation: value.foundation,
      additionalFoundation:value.additionalFoundation,
      accessories: [],
      staff:"",
      discount: value.discount,
      note: value.note,
      advertisement: value.advertisement,
      funeralProvider:value.funeralProvider,
      extraFee: value.extraFee,
      permitFee: value.permitFee
    }
    if(this.accessoriesCollection[0]['size'] != undefined){
      this.accessoriesCollection.forEach(element=>{
        if(element['size'] != undefined){
          formData.accessories.push({
            accessoriesId:element['size'],
            accessoriesNumber: element['number']
          })
      }
      })
    }

    if(this.monumentCollection[0]['size'] != undefined){
      this.monumentCollection.forEach(element=>{
        console.log(element);
        if(element['size'] != undefined){
          formData.monument.push({
            monumentId:element['size'],
            monumentNumber: element['number']
          })
      }
      })
    }

    if(this.inscriptionCollection[0]['inscriptionId'] != undefined){
      formData.inscription = this.inscriptionCollection.filter(e=>{
        if(Object.keys(e).length ===0)
          return false;
        else return true;
      });
    }
    formData.staff = this.authService.currentUserId();
    this.clean(formData);
    this.quoteService.checkPhone(formData.phone).subscribe(res=>{
      if(res['status']== 'old'){
        if(confirm('This Customer got a quote from ' + res['data']['name'])){
          this.quoteService.createQuote(formData).subscribe((result)=>{
            if(result['data']['quoteId']){
              let quoteId = result['data']['quoteId']
               this.router.navigate(['/quotedetail/' + quoteId])
            }
        });
        console.log(formData);
        }
      }
      else{
        this.quoteService.createQuote(formData).subscribe((result)=>{
          if(result['data']['quoteId']){
            let quoteId = result['data']['quoteId']
            this.router.navigate(['/quotedetail/' + quoteId])
            console.log(formData);
      }
    })
    return
      }
    })
  }

clean(obj) {
  for (var propName in obj) { 
    if (obj[propName] === "" || (Array.isArray(obj[propName]) && obj[propName].length==0)) {
      delete obj[propName];
    }
  }
}
}