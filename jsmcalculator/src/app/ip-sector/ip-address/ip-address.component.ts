import { Component, OnInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ViewChild } from '@angular/core'
import{ IpServiceService} from '../../services/ip-service.service';


export interface IpAddressData{
  location:string;
  ip:string;  
};

@Component({
  selector: 'app-ip-address',
  templateUrl: './ip-address.component.html',
  styleUrls: ['./ip-address.component.css']
})
export class IpAddressComponent implements OnInit {

  displayedColumns: string[] = ['location', 'ip', 'edit'];
  dataSource: MatTableDataSource<IpAddressData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private ipService: IpServiceService) {
    this.ipService.getAllIpAddress().subscribe((result)=>{
      this.dataSource = new MatTableDataSource(result["data"]["ipAddresss"])
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
