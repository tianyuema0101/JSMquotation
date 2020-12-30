import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InscriptionQuoteService } from '../../services/inscription-quote.service'
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-inscription-quote-detail',
  templateUrl: './inscription-quote-detail.component.html',
  styleUrls: ['./inscription-quote-detail.component.css']
})
export class InscriptionQuoteDetailComponent implements OnInit {

  id;
  currentQuote={};
  constructor(private quoteService: InscriptionQuoteService,
              private router: Router,
              private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id) {
      this.quoteService.getInscriptionQuote(this.id).subscribe(result=>{
        this.currentQuote = result['data'];
        console.log(this.currentQuote);
      })
    }

  }

  ngOnInit(): void {
  }

  exportAsPDF(){
    let data = document.getElementById("download_id");  
    console.log(data)
    html2canvas(data).then(canvas => {
      const contentDataURL = canvas.toDataURL('image/png') 
      console.log(contentDataURL) 
      let pdf = new jsPDF('p', 'cm', 'a4'); //Generates  PDF in portrait mode
      var width = pdf.internal.pageSize.getWidth();
      var height = pdf.internal.pageSize.getHeight();
      pdf.addImage(contentDataURL, 'PNG', 0, 0, width, height*0.9);  
      pdf.save('Quote_' + this.currentQuote['quote']['name'] +'.pdf');   
    }); 
  }

}