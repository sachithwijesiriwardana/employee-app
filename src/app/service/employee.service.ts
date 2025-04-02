import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIresponse, Employee } from '../model/Employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  createNewEmployee(obj: Employee) {
    return this.http.post<APIresponse>(
      'https://projectapi.gerasim.in/api/EmployeeManagement/CreateEmployee',
      obj
    );
  }
}
