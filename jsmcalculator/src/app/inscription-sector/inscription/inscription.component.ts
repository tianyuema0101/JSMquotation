import { Component, OnInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ViewChild } from '@angular/core'
import { InscriptionService } from '../../services/inscription.service';


export interface InscriptionData{
  name: string;
  type: string;
  price:number
};

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {

  displayedColumns: string[] = ['name', 'type', 'price', 'edit'];
  dataSource: MatTableDataSource<InscriptionData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private inscriptionService: InscriptionService) {
    this.inscriptionService.getAllInscriptions().subscribe((result)=>{
      console.log(result);
      this.dataSource = new MatTableDataSource(result["data"]["inscription"])
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

}
