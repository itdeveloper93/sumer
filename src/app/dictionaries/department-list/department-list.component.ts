import {Component, OnInit, ViewChild} from '@angular/core';
import {Department, DepartmentsAndPositionsService} from '../../common-services/departments-and-positions.service';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {CreateUpdateDepartmentComponent} from '../create-update-department/create-update-department.component';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.sass']
})
export class DepartmentListComponent implements OnInit {
    isRequesting: boolean;
    displayedColumns: string[] = [
        'name',
        'lastEdit',
        'author',
        'actions',
    ];

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;
    department = new MatTableDataSource<Department[]>();
    private id: any;

    constructor(private departmentService: DepartmentsAndPositionsService, public dialog: MatDialog) {
    }

    openDialogUpdate(id?: string, name?: string): void {
        const dialogRef = this.dialog.open(CreateUpdateDepartmentComponent, { data: { id, name }});
        dialogRef.afterClosed().subscribe(result => {
            this.departmentService.getDepartments()
                .subscribe(response => {
                    this.department = response.data.items;
                    this.id = response.data.items.id;
                });
        });
    }
    ngOnInit() {
        this.isRequesting = true;
        this.departmentService.getDepartments()
            .subscribe(response => {
                this.department = response.data.items;
                this.id = response.data.items.id;
            },
                (error: Response) => {
                    this.isRequesting = false;
                },
                () => {
                    this.isRequesting = false;
                }
                );
    }


}
