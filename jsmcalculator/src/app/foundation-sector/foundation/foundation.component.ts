import { Component, OnInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ViewChild } from '@angular/core'
import { FoundationService } from '../../services/foundation.service';


export interface FoundationData{
  name: string;
  description: string;
  price:number
};

@Component({
  selector: 'app-foundation',
  templateUrl: './foundation.component.html',
  styleUrls: ['./foundation.component.css']
})
export class FoundationComponent implements OnInit {

  displayedColumns: string[] = ['name', 'description', 'price', 'edit'];
  dataSource: MatTableDataSource<FoundationData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private foundationService: FoundationService) {
    this.foundationService.getAllFoundations().subscribe((result)=>{
      console.log(result);
      this.dataSource = new MatTableDataSource(result["data"]["foundation"])
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
