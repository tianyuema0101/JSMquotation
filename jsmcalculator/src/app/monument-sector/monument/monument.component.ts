import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ViewChild } from '@angular/core'
import { MonumentService } from '../../services/monument.service';

import { Router, ActivatedRoute } from '@angular/router';

export interface MonumentData {
  englishName: string;
  chineseName: string;
  color: string;
  origin: string;
  size: string;
  price: number
};

@Component({
  selector: 'app-monument',
  templateUrl: './monument.component.html',
  styleUrls: ['./monument.component.css']
})
export class MonumentComponent implements AfterViewInit {
  totalPriceDiscount = 0;
  displayedColumns: string[] = ['englishName', 'chineseName', 'color', 'origin', 'size', 'price', 'currentPrice', 'edit'];
  dataSource: MatTableDataSource<MonumentData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private monumentService: MonumentService,
    private router: Router) {
    this.monumentService.getMateiralDiscount().subscribe(result => {
      this.totalPriceDiscount = result['data']['materialDiscount']['materialDiscount']
    })
    this.monumentService.getAllMonuments().subscribe((result) => {
      this.dataSource = new MatTableDataSource(result["data"]["monuments"])
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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

  updateDiscount() {
    if (confirm('Are you sure you want to update total discount?')) {
      this.monumentService.updateMateiralDiscount({
        materialDiscount: this.totalPriceDiscount
      }).subscribe(result => {
        this.router.navigate(['/monumentslist'])
      })
    }
    return
  }
}
