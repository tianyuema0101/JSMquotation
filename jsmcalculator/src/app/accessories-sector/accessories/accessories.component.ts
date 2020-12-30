import { Component, OnInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ViewChild } from '@angular/core'
import { AccessoriesService } from '../../services/accessories.service';


export interface AccessoriesData{
  name: string;
  description: string;
  accessoriesType:string;
  size: string;
  price:number
};

@Component({
  selector: 'app-accessories',
  templateUrl: './accessories.component.html',
  styleUrls: ['./accessories.component.css']
})
export class AccessoriesComponent implements OnInit {

  displayedColumns: string[] = ['name', 'description', 'accessoriesType', 'size', 'price', 'edit'];
  dataSource: MatTableDataSource<AccessoriesData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private accessoriesService: AccessoriesService) {
    this.accessoriesService.getAllAccessoriess().subscribe((result)=>{
      console.log(result);
      this.dataSource = new MatTableDataSource(result["data"]["accessories"])
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
