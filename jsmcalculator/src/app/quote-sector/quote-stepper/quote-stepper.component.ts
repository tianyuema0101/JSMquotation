import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MonumentService } from '../../services/monument.service';
import { Router, ActivatedRoute } from '@angular/router';
import { InstallationService } from 'src/app/services/installation.service';
import { FoundationService } from 'src/app/services/foundation.service';
import { AccessoriesService } from 'src/app/services/accessories.service';
import { InscriptionService } from 'src/app/services/inscription.service';
import { CastingService } from 'src/app/services/casting.service';
import { element } from 'protractor';
import { AuthService } from 'src/app/services/auth.service';
import { QuoteService } from 'src/app/services/quote.service';

@Component({
  selector: 'app-quote-stepper',
  templateUrl: './quote-stepper.component.html',
  styleUrls: ['./quote-stepper.component.css']
})
export class QuoteStepperComponent implements OnInit {
  monumentStyles = ['Lawn', 'Single', 'Double', 'Family'];
  colorList = [{ name: 'Black', displayName: 'Black' },
  { name: 'Grey', displayName: 'Grey' },
  { name: 'White', displayName: 'White' },
  { name: 'Red', displayName: 'Red' },
  { name: 'Other', displayName: 'Other Color' },];
  inscriptionTypeList: string[] = ['English', 'Chinese', 'Arabic', 'Decoration'];
  doorList;
  currentQuote = {
    name: "",
    phone: "",
    email: "",
    cemetary: "",
    section: "",
    monument: [],
    installation: "",
    additionalInstallation: [],
    inscription: [],
    casting:[],
    foundation: "",
    additionalFoundation: [],
    accessories: [],
    discount: 0,
    note: "",
    funeralProvider: "",
    advertisement: "",
    extraFee: 0,
    permitFee: 0
  };

  customerFormGroup: FormGroup;
  styleFormGroup: FormGroup;
  permitFormGroup: FormGroup;
  materialFormGroup: FormGroup;
  inscriptionFormGroup: FormGroup;
  photoFormGroup: FormGroup;
  doorFormGroup: FormGroup;
  accessoriesFormGroup: FormGroup;
  castingFormGroup: FormGroup;
  extraFeeFormGroup: FormGroup;
  installationFormGroup: FormGroup;
  foundationFormGroup: FormGroup;
  discountFormGroup: FormGroup;

  monumentCollection = [{}];
  monumentNameCollection = [[]];
  monumentSizeCollection = [];
  monument_id = 0;

  inscriptionList = [];
  inscriptionCollection = [{"inscriptionNumber":0}];
  inscriptionNameCollection = [[]]
  inscription_id = 0;

  castingCollection = [{}];
  castingNameCollection = [];
  castingSizeCollection = [[]];
  casting_id = 0;

  doorCollection = [{}];
  doorNameCollection = [];
  doorSizeCollection = [[]];
  door_id = 0;

  photoCollection = [{}];
  photoNameCollection = [];
  photoSizeCollection = [[]];
  photo_id = 0;

  accessoriesCollection = [{}];
  accessoriesNameCollection = [];
  accessoriesSizeCollection = [[]];
  accessories_id = 0;

  installationCollection = [];
  additionalInstallationCollection = [];
  deliveryCollection = [];

  foundationCollection = []
  additionalFoundationCollection = [];

  constructor(private _formBuilder: FormBuilder,
    private monumentService: MonumentService,
    private inscriptionService: InscriptionService,
    private accessoriesService: AccessoriesService,
    private installationService: InstallationService,
    private CastingService: CastingService,
    private foundationService: FoundationService,
    private authService: AuthService,
    private quoteService: QuoteService,
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

    this.materialFormGroup = this._formBuilder.group({
      color0: ['',],
      monument0: ['',],
      size0: ['',],
      number0: ['',],
    });

    this.inscriptionFormGroup = this._formBuilder.group({
      inscriptionType0: ['',],
      inscription0: ['',],
      inscriptionNumber0: ['',],
    });

    this.doorFormGroup = this._formBuilder.group({
      doorName0: ['',],
      doorSize0: ['',],
      doorNumber0: ['',]
    })

    this.photoFormGroup = this._formBuilder.group({
      photoName0: ['',],
      photoSize0: ['',],
      photoNumber0: ['',]
    })

    this.accessoriesFormGroup = this._formBuilder.group({
      accessoriesName0: ['',],
      accessoriesSize0: ['',],
      accessoriesNumber0: ['',]
    })

    this.castingFormGroup = this._formBuilder.group({
      castingName0: ['',],
      castingSize0: ['',],
      castingNumber0: ['',]
    })

    this.installationFormGroup = this._formBuilder.group({
      installation: ['',],
      additionalInstallation: ['',],
      delivery: ['',],
    })

    this.foundationFormGroup = this._formBuilder.group({
      foundation: ['',],
      additionalFoundation: ['',]
    })

    this.extraFeeFormGroup = this._formBuilder.group({
      extraFee: ['', Validators.required]
    });

    this.extraFeeFormGroup = this._formBuilder.group({
      extraFee: ['', Validators.required]
    });

    this.discountFormGroup = this._formBuilder.group({
      discount: ['',]
    })

    let doorParams = '?accessoriesType=' + 'door';
    this.accessoriesService.getAccessoriesByOther(doorParams).subscribe(result => {
      result['data']['accessories'].forEach(element => {
        if (!this.doorNameCollection.some(e => e.name == element.name)) {
          this.doorNameCollection.push({ name: element.name, displayName: element.name, sizes: [{ size: element.size, _id: element._id }] })
        }
        else {
          let accessIndex = this.doorNameCollection.findIndex(e => e.name == element.name);
          if (accessIndex != -1) {
            this.doorNameCollection[accessIndex].sizes.push({ size: element.size, _id: element._id })
          }
        }
      })
    })
    let photoParams = '?accessoriesType=' + 'photo';
    this.accessoriesService.getAccessoriesByOther(photoParams).subscribe(result => {
      result['data']['accessories'].forEach(element => {
        if (!this.photoNameCollection.some(e => e.name == element.name)) {
          this.photoNameCollection.push({ name: element.name, displayName: element.name, sizes: [{ size: element.size, _id: element._id }] })
        }
        else {
          let accessIndex = this.photoNameCollection.findIndex(e => e.name == element.name);
          if (accessIndex != -1) {
            this.photoNameCollection[accessIndex].sizes.push({ size: element.size, _id: element._id })
          }
        }
      })
    })
    let accessoriesParams = '?accessoriesType=' + 'accessories';
    this.accessoriesService.getAccessoriesByOther(accessoriesParams).subscribe(result => {
      result['data']['accessories'].forEach(element => {
        if (!this.accessoriesNameCollection.some(e => e.name == element.name)) {
          this.accessoriesNameCollection.push({ name: element.name, displayName: element.name, sizes: [{ size: element.size, _id: element._id }] })
        }
        else {
          let accessIndex = this.accessoriesNameCollection.findIndex(e => e.name == element.name);
          if (accessIndex != -1) {
            this.accessoriesNameCollection[accessIndex].sizes.push({ size: element.size, _id: element._id })
          }
        }
      })
    })


    //installation and foundation
    this.installationService.getAllInstallations().subscribe(result => {
      result['data']['installation'].forEach(element => {
        if (element.monumentType != 'Additional Charge' && element.monumentType != 'Delivery' ) {
          this.installationCollection.push({ id: element._id, name: element.name })
        }
        else if (element.monumentType != 'Delivery' ) {
          this.additionalInstallationCollection.push({ id: element._id, name: element.name })
        }
        else if (element.monumentType != 'Additional Charge'){
          this.deliveryCollection.push({ id: element._id, name: element.name })
        }
      })
    });
    
    this.CastingService.getAllCastings().subscribe(result=>{
      result['data']['casting'].forEach(element=>{
        if(!this.castingNameCollection.some(e=> e.name == element.name) ){
          this.castingNameCollection.push({name:element.name, sizes:[{size:element.size, _id: element._id}]})
        }
        else{
          let castingIndex = this.castingNameCollection.findIndex(e=>e.name == element.name);
          if(castingIndex != -1){
            this.castingNameCollection[castingIndex].sizes.push({size:element.size, _id: element._id})
          }
        }
      })
    })
    this.foundationService.getAllFoundations().subscribe(result => {
      result['data']['foundation'].forEach(element => {
        if (element.type != 'Additional Charge') {
          this.foundationCollection.push({ id: element._id, name: element.name })
        }
        else {
          this.additionalFoundationCollection.push({ id: element._id, name: element.name })
        }
      })
    });

  }
  //casting
  addCasting(){
    this.casting_id += 1;
    this.castingFormGroup.addControl(('castingName' + this.casting_id), this._formBuilder.control(''));
    this.castingFormGroup.addControl(('castingSize' + this.casting_id), this._formBuilder.control(''));
    this.castingFormGroup.addControl(('castingNumber' + this.casting_id), this._formBuilder.control(''));
    this.castingCollection.push([]);
  }
  removeCasting(index){
    this.castingCollection.splice(index, 1);
    this.castingSizeCollection.splice(index,1);
  }

  filterCastingSize(name,index){
    console.log(this.castingNameCollection.find(e => e.name == name))
    this.castingSizeCollection[index] = [];
    this.castingSizeCollection[index] = this.castingNameCollection.find(e => e.name == name).sizes;
  }

  //material part
  getMonumentName(color, index) {
    let params = '?color=' + color;
    this.monumentService.getMonumentByOther(params).subscribe(result => {
      result['data']['monuments'].forEach(element => {
        if (!this.monumentNameCollection[index].some(e => e.name == element.englishName)) {
          this.monumentNameCollection[index].push({ name: element.englishName, displayName: element.englishName + "/" + element.chineseName, sizes: [{ size: element.size, _id: element._id }] });
        }
        else {
          let monumentIndex = this.monumentNameCollection[index].findIndex(e => e.name == element.englishName);
          if (monumentIndex != -1) {
            this.monumentNameCollection[index][monumentIndex].sizes.push({ size: element.size, _id: element._id });
          }
        }
      })
    })
  }

  addMonument() {
    this.monument_id += 1;
    this.materialFormGroup.addControl(('color' + this.monument_id), this._formBuilder.control(''))
    this.materialFormGroup.addControl(('monument' + this.monument_id), this._formBuilder.control(''))
    this.materialFormGroup.addControl(('size' + this.monument_id), this._formBuilder.control(''))
    this.materialFormGroup.addControl(('number' + this.monument_id), this._formBuilder.control(''))
    this.monumentCollection.push({});
    this.monumentNameCollection.push([]);
  }

  removeMonument(index) {
    this.monumentCollection.splice(index, 1);
    this.monumentNameCollection.splice(index, 1);
  }

  filterMonument(color, index) {
    this.monumentNameCollection[index] = [];
    this.getMonumentName(color, index);
  }

  filterMonumentSize(name, index) {
    this.monumentSizeCollection[index] = [];
    this.monumentSizeCollection[index] = this.monumentNameCollection[index].find(e => e.name == name).sizes;
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

  //door part
  addDoor() {
    this.door_id += 1;
    this.doorFormGroup.addControl(('doorName' + this.door_id), this._formBuilder.control(''));
    this.doorFormGroup.addControl(('doorSize' + this.door_id), this._formBuilder.control(''));
    this.doorFormGroup.addControl(('doorNumber' + this.door_id), this._formBuilder.control(''));
    this.doorCollection.push([]);
    // console.log(this.doorSizeCollection);
    // console.log(this.doorNameCollection);
  }

  removeDoor(index) {
    this.doorCollection.splice(index, 1);
  }

  filterDoorSize(name, index) {
    this.doorSizeCollection[index] = [];
    this.doorSizeCollection[index] = this.doorNameCollection.find(e => e.name == name).sizes;
    // console.log(this.doorSizeCollection);
    // console.log(this.doorNameCollection);
  }

  //photo part
  addPhoto() {
    this.photo_id += 1;
    this.photoFormGroup.addControl(('photoName' + this.photo_id), this._formBuilder.control(''));
    this.photoFormGroup.addControl(('photoSize' + this.photo_id), this._formBuilder.control(''));
    this.photoFormGroup.addControl(('photoNumber' + this.photo_id), this._formBuilder.control(''));
    this.photoCollection.push([]);
  }

  removePhoto(index) {
    this.photoCollection.splice(index, 1);
  }

  filterPhotoSize(name, index) {
    this.photoSizeCollection[index] = [];
    this.photoSizeCollection[index] = this.photoNameCollection.find(e => e.name == name).sizes;
  }

  //accessories part
  addAccessories() {
    this.accessories_id += 1;
    this.accessoriesFormGroup.addControl(('accessoriesName' + this.accessories_id), this._formBuilder.control(''));
    this.accessoriesFormGroup.addControl(('accessoriesSize' + this.accessories_id), this._formBuilder.control(''));
    this.accessoriesFormGroup.addControl(('accessoriesNumber' + this.accessories_id), this._formBuilder.control(''));
    this.accessoriesCollection.push([]);
  }

  removeAccessories(index) {
    this.accessoriesCollection.splice(index, 1);
  }

  filterAccessoriesSize(name, index) {
    this.accessoriesSizeCollection[index] = [];
    this.accessoriesSizeCollection[index] = this.accessoriesNameCollection.find(e => e.name == name).sizes;
  }



  submitData() {
    let customerData = this.customerFormGroup.value;
    let monumentType = this.styleFormGroup.value;
    let permitData = this.permitFormGroup.value;
    let installationData = this.installationFormGroup.value;
    let fondationData = this.foundationFormGroup.value;
    let extraFeeData = this.extraFeeFormGroup.value;
    let discountData = this.discountFormGroup.value;

    let quoteData = { ...customerData, ...monumentType, ...permitData, ...installationData, ...fondationData, ...extraFeeData, ...discountData};
    if(quoteData['delivery'].length != 0){
      quoteData['delivery'].forEach(element=>{
        quoteData['additionalInstallation'].push(element)
      })
      delete quoteData['delivery'];
    }
    quoteData.accessories = [];
    quoteData.monument = [];
    quoteData.inscription = [];
    quoteData.casting =[];
    if (this.accessoriesCollection[0]['accessoriesNumber'] != undefined && this.accessoriesCollection[0]['accessoriesId'] != undefined) {
      this.accessoriesCollection.forEach(element => {
        if (element['accessoriesNumber'] != undefined && element['accessoriesId'] != undefined) {
          quoteData.accessories.push({
            accessoriesId: element['accessoriesId'],
            accessoriesNumber: element['accessoriesNumber']
          })
        }
      })
    }
    if (this.photoCollection[0]['accessoriesNumber'] != undefined && this.photoCollection[0]['accessoriesId'] != undefined) {
      this.photoCollection.forEach(element => {
        if (element['accessoriesNumber'] != undefined && element['accessoriesId'] != undefined) {
          quoteData.accessories.push({
            accessoriesId: element['accessoriesId'],
            accessoriesNumber: element['accessoriesNumber']
          })
        }
      })
    }
    if (this.doorCollection[0]['accessoriesNumber'] != undefined && this.doorCollection[0]['accessoriesId'] != undefined) {
      this.doorCollection.forEach(element => {
        if (element['accessoriesNumber'] != undefined && element['accessoriesId'] != undefined) {
          quoteData.accessories.push({
            accessoriesId: element['accessoriesId'],
            accessoriesNumber: element['accessoriesNumber']
          })
        }
      })
    }

    if (this.monumentCollection[0]['number'] != undefined && this.monumentCollection[0]['size'] != undefined) {
      this.monumentCollection.forEach(element => {
        if (element['size'] != undefined && element['number'] != undefined) {
          quoteData.monument.push({
            monumentId: element['size'],
            monumentNumber: element['number']
          })
        }
      })
    }
    console.log(this.castingCollection[0]['castingNumber'] != undefined)
    if (this.castingCollection[0]['castingNumber'] != undefined && this.castingCollection[0]['castingId'] != undefined) {
      console.log(this.castingCollection[0]['castingNumber'], this.castingCollection[0]['castingId'])
      this.castingCollection.forEach(element => {
        if (element['castingId'] != undefined && element['castingNumber'] != undefined) {
          quoteData.casting.push({
            castingId: element['castingId'],
            castingNumber: element['castingNumber']
          })
        }
      })
    }

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
    this.quoteService.checkPhone(quoteData.phone).subscribe(res=>{
      if(res['status']== 'old'){
        if(confirm('This Customer got a quote from ' + res['data']['name'])){
          this.quoteService.createQuote(quoteData).subscribe((result)=>{
            if(result['data']['quoteId']){
              let quoteId = result['data']['quoteId']
               this.router.navigate(['/quotedetail/' + quoteId])
            }
        });
        }
      }
      else{
        this.quoteService.createQuote(quoteData).subscribe((result)=>{
          if(result['data']['quoteId']){
            let quoteId = result['data']['quoteId']
            this.router.navigate(['/quotedetail/' + quoteId])
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
