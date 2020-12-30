import { Component, OnInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ViewChild } from '@angular/core'
import { CastingService } from '../../services/casting.service';

export interface CastingData{
  name: string;
  size: string;
  price:number
};

@Component({
  selector: 'app-casting',
  templateUrl: './casting.component.html',
  styleUrls: ['./casting.component.css']
})
export class CastingComponent implements OnInit {

  displayedColumns: string[] = ['name', 'size', 'price', 'edit'];
  dataSource: MatTableDataSource<CastingData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private castingService: CastingService) {
    this.castingService.getAllCastings().subscribe((result)=>{
      this.dataSource = new MatTableDataSource(result["data"]["casting"])
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
