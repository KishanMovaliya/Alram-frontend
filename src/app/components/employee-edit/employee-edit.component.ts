
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from './../../service/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Employee } from 'src/app/model/employee';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.scss']
})

export class EmployeeEditComponent implements OnInit {
  submitted = false;
  editForm: FormGroup;
  employeeData: Employee[];
  EmployeeProfile: any = ['Finance', 'BDM', 'HR', 'Sales', 'Admin']

  constructor(
    public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.updateEmployee();
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.getEmployee(id);
    this.editForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      designation: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    })
  }

  //------------------Choose options with select-dropdown-----------------------------------
  updateProfile(e) {
    this.editForm.get('designation').setValue(e, {
      onlySelf: true
    })
  }

  //-------------------Getter to access form control-----------------------------------------
  get myForm() {
    return this.editForm.controls;
  }

  //--------------------Get Id wise employeeee-----------------------------------------------
  getEmployee(id) {
    this.apiService.getEmployee(id).subscribe(data => {
      this.editForm.setValue({
        name: data['name'],
        email: data['email'],
        designation: data['designation'],
        phoneNumber: data['phoneNumber'],
      });
    });
  }

  //------------------update Employee-------------------------------------------------
  updateEmployee() {
    this.editForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      designation: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    })
  }


  //------------------submit--------------------------------------------------------------
  onSubmit() {
    this.submitted = true;
    if (!this.editForm.valid) {
      return false;
    } else {
      Swal.fire({

        title: 'Are you sure want to Update?',
  
        text: 'You will Back to Home !',
  
        icon: 'warning',
  
        showCancelButton: true,
  
        confirmButtonText: 'Yes, Update it!',
  
        cancelButtonText: 'No, keep it'
  
      }).then((result) => {
        if (result.value) {
            let id = this.actRoute.snapshot.paramMap.get('id');
            this.apiService.updateEmployee(id, this.editForm.value)
              .subscribe(res => {
                this.router.navigateByUrl('/employees-list');
                Swal.fire('Content updated successfully!')
              }, (error) => {
               Swal.fire(error)
              })
  
        } else if (result.dismiss === Swal.DismissReason.cancel) {
  
          Swal.fire(
  
            'Cancelled',
  
            'welcomeback :)',
  
            'error'
  
          )
  
        }
  
      })
    }
  }

}