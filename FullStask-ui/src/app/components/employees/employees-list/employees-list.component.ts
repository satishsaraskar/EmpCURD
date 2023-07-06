import { Component } from '@angular/core';
import { Employee } from 'src/app/models/employee.model';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent {

employees : Employee[] = [
  // {
  //   id:'1',
  //   name:'satish',
  //   email:'sa',
  //   phone:232,
  //   salary:2323,
  //   department:'human'
  // }
]
constructor(private empService :EmployeesService){}

ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.empService.getAllEmployees()
  .subscribe({
    next: (employees) =>{
      // console.log(employees);
      this.employees= employees
    },
    error:(response)=>{
      console.log(response)
    }
  })
}

}
