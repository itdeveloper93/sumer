import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {DepartmentsAndPositionsService} from '../../common-services/departments-and-positions.service';

@Component({
  selector: 'app-update-department',
  templateUrl: './create-update-department.component.html',
  styleUrls: ['./create-update-department.component.sass']
})
export class CreateUpdateDepartmentComponent implements OnInit {

    public heading = true;
    isRequesting: boolean;
    updateDepartment = new FormGroup({
        id: new FormControl(''),
        name: new FormControl(''),
        isActive: new FormControl(true),
    });
    private id: string;
  constructor(
      @Inject(MAT_DIALOG_DATA) public data: any,
      private route: ActivatedRoute,
      private http: HttpClient,
      private router: Router,
      private dialogRef: MatDialogRef<CreateUpdateDepartmentComponent>,
      private snackbar: MatSnackBar,
      private departmentSrevice: DepartmentsAndPositionsService,
  ) {

  }

  ngOnInit() {
      if (this.data.id) {
          this.heading = false;
          this.isRequesting = true;
          this.departmentSrevice.getDepartmentsById(this.data.id)
              .subscribe((res) => {
                  // @ts-ignore
                  this.updateDepartment.patchValue({
                      id: this.data.id,
                      name: this.data.name,
                      // @ts-ignore
                      isActive: res.data.isActive
                  });
              },
                  () => {
                      this.isRequesting = false;
                      },

                      () => {
                      this.isRequesting = false;
              }
                  );
      }
  }

    onSubmit() {
      if (this.updateDepartment.invalid) {
          this.snackbar.open('В форме содержатся ошибки');
          return false;
      }
      if (this.data.id) {
          this.isRequesting = true;
          this.departmentSrevice.updateDepartment(this.updateDepartment.value)
              .subscribe((response) => {
                  this.dialogRef.close();
              },
                  () => {
                      this.isRequesting = false;
                  },

                  () => {
                      this.isRequesting = false;
                  });
      } else {
          this.isRequesting = true;
          const {name, isActive} = this.updateDepartment.value;
          this.departmentSrevice.createDepartment(name, isActive)
              .subscribe((response) => {
                  this.dialogRef.close();
              },
                  () => {
                      this.isRequesting = false;
                  },

                  () => {
                      this.isRequesting = false;
                  });

      }
    }

}
