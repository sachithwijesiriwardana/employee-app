import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIresponse, Employee, Project, } from '../model/Employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  apiUrl: string = 'https://projectapi.gerasim.in/api/EmployeeManagement/';
  constructor(private http: HttpClient) { }

  createNewEmployee(obj: Employee) {
    return this.http.post<Employee>(this.apiUrl + 'CreateEmployee', obj);
  }

  getAllEmployee() {
    return this.http.get<Employee[]>(this.apiUrl + 'GetAllEmployees');
  }

  deleteEmployee(id: number) {
    return this.http.delete<Employee>(this.apiUrl + 'DeleteEmployee/' + id);
  }

  createNewProject(obj: Project) {
    return this.http.post<Project>(`${this.apiUrl} + 'CreateProject'`, obj);
  }

  getProjects() {
    return this.http.get<Project[]>(this.apiUrl + 'GetAllProjects');
  }
  updateEmployee(obj: Employee) {
    return this.http.put<Employee>(
      this.apiUrl + 'UpdateEmployee' + obj.employeeId,
      obj
    );
  }
}
