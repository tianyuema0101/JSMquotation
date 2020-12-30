import { Component, OnInit, Inject } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ViewChild } from '@angular/core'
import { InscriptionQuoteService } from '../../services/inscription-quote.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';

export interface DialogData {
  reason: string;
  status: string;
}

export interface QuoteData{
  name: string;
  phone: string;
  cemetery:string;
  advertisement: string;
  modifiedDate: string;
  status;
  staff;
};

@Component({
  selector: 'app-inscription-quote',
  templateUrl: './inscription-quote.component.html',
  styleUrls: ['./inscription-quote.component.css']
})
export class InscriptionQuoteComponent implements OnInit {

  displayedColumns: string[] = ['name', 'phone', 'cemetery', 'advertisement', 'modifiedDate', 'status', 'staff','edit'];
  dataSource: MatTableDataSource<QuoteData>;
  
  status: string;
  reason: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private quoteService: InscriptionQuoteService,
              private router: Router,
              public dialog: MatDialog) { 
    this.quoteService.getAllInscriptionQuotes().subscribe((result)=>{
      console.log(result)
      let data = result["data"]["inscriptionQuote"];
      data.forEach(element => {
        element['staff'] = element['staff']['name'];
        console.log(element)
      });
      this.dataSource = new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
  }

  updateSuccess(id, newStatus){
    this.quoteService.updateStatus(id,newStatus).subscribe(result=>{
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/inscriptionQuoteslist']);
    }); 
    })
  }

  openDialog(quote): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog1, {
      width: '450px',
      data: {reason: quote.reason, status:quote.status}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result)
      this.updateSuccess(quote._id, result);
    });
  }

}

@Component({
    selector: 'dialog-overview-example-dialog1',
    templateUrl: 'dialog-overview-example-dialog.html',
    styleUrls: ['./inscription-quote.component.css']
  })
export class DialogOverviewExampleDialog1 {
  constructor(
      public dialogRef: MatDialogRef<DialogOverviewExampleDialog1>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
}