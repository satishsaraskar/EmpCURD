import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/models/employee.model';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent {

  employeeDetails : Employee  = {
    id:'',
    name:'',
    email:'',
    phone:0,
    salary:0,
    department:''
  }
  constructor(
    private empService :EmployeesService,
    private route : ActivatedRoute,
    private router : Router){}

ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.route.paramMap.subscribe({
    next: (params) => {
      const id = params.get('id');
      // console.log(id);
      if(id){
        // call api
        console.log('if block',id);
        this.empService.getEmpoloyeeById(id)
        .subscribe({
          next: (response) =>{
            // console.log("call ",response)
            this.employeeDetails = response;
          }
        })
      }
    }
  })
}



updateEmployee(){
  this.empService.updateEmployee(this.employeeDetails.id , this.employeeDetails)
  .subscribe({
    next:(response) =>  {
      this.router.navigate(['employees'])

    }
  })
}

deleteEmployee(id:string){

  this.empService.deleteEmployee(id)
  .subscribe({
    next:(response) =>{
      this.router.navigate(['employees'])
    }
  })
}
}
