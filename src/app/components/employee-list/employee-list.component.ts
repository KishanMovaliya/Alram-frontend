import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ApiService } from './../../service/api.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})

export class EmployeeListComponent implements OnInit {
  
  Employee:any = [];

  constructor(private apiService: ApiService) { 
    this.readEmployee();
  }

  ngOnInit() {}

  //-------------read employee---------------------------------------
  readEmployee(){ 
    this.apiService.getEmployees().subscribe((data) => {
     this.Employee = data;
    })    
  }

  //-------------delete employee-----------------------------------------
  removeEmployee(employee, index) {

    Swal.fire({

      title: 'Are you sure want to Delete Employee?',

      text: 'Delete The Employee !',

      icon: 'warning',

      showCancelButton: true,

      confirmButtonText: 'Yes, Delete it!',

      cancelButtonText: 'No, keep it'

    }).then((result) => {
      if (result.value) {

        this.apiService.deleteEmployee(employee._id).subscribe((data) => {
          this.Employee.splice(index, 1);
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