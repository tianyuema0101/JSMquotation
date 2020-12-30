import { Component, OnInit, Inject } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ViewChild } from '@angular/core'
import { QuoteService } from '../../services/quote.service';
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
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.css']
})
export class QuoteComponent implements OnInit {
  displayedColumns: string[] = ['name', 'phone', 'cemetery', 'advertisement', 'modifiedDate', 'status', 'staff','edit'];
  dataSource: MatTableDataSource<QuoteData>;
  
  status: string;
  reason: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private quoteService: QuoteService,
              private router: Router,
              public dialog: MatDialog) { 
    this.quoteService.getAllQuotes().subscribe((result)=>{
      let data = result["data"]["quote"];
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
        this.router.navigate(['/quoteslist']);
    }); 
    })
  }

  openDialog(quote): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
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
    selector: 'dialog-overview-example-dialog',
    templateUrl: 'dialog-overview-example-dialog.html',
    styleUrls: ['./quote.component.css']
  })
export class DialogOverviewExampleDialog {
  constructor(
      public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
}


