import {Component, OnInit, ViewChild} from '@angular/core';
import {Department, DepartmentsAndPositionsService} from '../../common-services/departments-and-positions.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.sass']
})
export class DepartmentListComponent implements OnInit {
    displayedColumns: string[] = [
        'name',
        'lastEdit',
        'author',
        'actions',
    ];

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;
    department = new MatTableDataSource<Department[]>();

    constructor(private departmentService: DepartmentsAndPositionsService) {
        this.departmentService.getDepartments()
            .subscribe(response => {
                console.log(response);
                this.department = response.data.items;
            });
    }

    ngOnInit() {
    }


}
