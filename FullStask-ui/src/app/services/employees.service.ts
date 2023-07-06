import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Employee } from '../models/employee.model';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  // public baseApi_Url : string = environment.baseApiUrl
  public baseApi_Url:string = "https://localhost:7147"

  constructor(private http :HttpClient ) { }

  // getAllEmployees(): Observable<Employee[]>{
  //   this.http.get<Employee[]>(this.baseApiUrl+'/api/Employees')
  // }

  public getAllEmployees() : Observable<Employee[]> {
    return this.http.get<Employee[]>(this.baseApi_Url+'/api/Employees');
   }


   addEmployee(addEmployeeRequest:Employee):Observable<Employee> {
    addEmployeeRequest.id = '00000000-0000-0000-0000-000000000000';
    return this.http.post<Employee>(this.baseApi_Url +'/api/Employees',addEmployeeRequest );
   }

   public getEmpoloyeeById(id:string):Observable<Employee> {
   return this.http.get<Employee>(this.baseApi_Url + '/api/Employees/'+ id);
   }

   updateEmployee(id:string,updateEmployeeRequest : Employee):Observable<Employee>
   {
    return this.http.put<Employee>(this.baseApi_Url + '/api/Employees/'+ id ,updateEmployeeRequest)
   }


   deleteEmployee(id:string):Observable<Employee>
   {
    // console.log("deleteEmployee",id)
    return this.http.delete<Employee>(this.baseApi_Url + '/api/Employees/' + id)
   }




}
