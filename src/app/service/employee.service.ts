import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIresponse, Employee } from '../model/Employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) { }

  createNewEmployee(obj: Employee) {
    return this.http.post<Employee>(
      'https://projectapi.gerasim.in/api/EmployeeManagement/CreateEmployee',
      obj
    );
  }

  getAllEmployee() {
    return this.http.get<Employee[]>(
      'https://projectapi.gerasim.in/api/EmployeeManagement/GetAllEmployees',
    );
  }

  deleteEmployee(id: number) {
    return this.http.delete<Employee>(
      'https://projectapi.gerasim.in/api/EmployeeManagement/DeleteEmployee/' + id,
    );
  }

  updateEmployee(obj: Employee) {
    return this.http.put<Employee>(
      'https://projectapi.gerasim.in/api/EmployeeManagement/UpdateEmployee' + obj.employeeId,
      obj
    );
  }
}
