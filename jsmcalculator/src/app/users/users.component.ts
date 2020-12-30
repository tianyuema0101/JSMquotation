import { Component, OnInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ViewChild } from '@angular/core'
import { UsersService } from '../services/users.service';

export interface UserData{
  name: string;
  email: string;
  role: string;
};

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'role', 'edit/resetPassword'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private usersService: UsersService) { 
    const users = this.usersService.getAllUsers().subscribe((result)=>{
        console.log(result["data"]["users"])
        this.dataSource = new MatTableDataSource(result["data"]["users"])
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
