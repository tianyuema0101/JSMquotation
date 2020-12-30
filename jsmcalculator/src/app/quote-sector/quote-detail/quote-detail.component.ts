import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { QuoteService } from '../../services/quote.service'
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-quote-detail',
  templateUrl: './quote-detail.component.html',
  styleUrls: ['./quote-detail.component.css']
})
export class QuoteDetailComponent implements OnInit {
  id;
  currentQuote={};
  constructor(private quoteService: QuoteService,
              private router: Router,
              private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id) {
      this.quoteService.getQuote(this.id).subscribe(result=>{
        this.currentQuote = result['data'];
        console.log(result['data'].quote.additionalFoundation.length);
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
