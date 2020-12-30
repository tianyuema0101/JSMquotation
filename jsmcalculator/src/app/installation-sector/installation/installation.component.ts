import { Component, OnInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ViewChild } from '@angular/core'
import { InstallationService } from '../../services/installation.service';


export interface InstallationData{
  name: string;
  type: string;
  price:number
};

@Component({
  selector: 'app-installation',
  templateUrl: './installation.component.html',
  styleUrls: ['./installation.component.css']
})
export class InstallationComponent implements OnInit {

  displayedColumns: string[] = ['name', 'monumentType', 'price', 'edit'];
  dataSource: MatTableDataSource<InstallationData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private installationService: InstallationService) {
    this.installationService.getAllInstallations().subscribe((result)=>{
      this.dataSource = new MatTableDataSource(result["data"]["installation"])
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
