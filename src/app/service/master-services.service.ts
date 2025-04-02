import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIresponse } from '../model/Employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MasterServicesService {
  constructor(private http: HttpClient) {}

  getParentDept() {
    return this.http.get<APIresponse>(
      'https://projectapi.gerasim.in/api/EmployeeManagement/GetParentDepartment'
    );
  }
  getChildDeptByParentId(id: number): Observable<APIresponse> {
    return this.http.get<APIresponse>(
      'https://projectapi.gerasim.in/api/EmployeeManagement/GetChildDepartmentByParentId?deptId=' +
        id
    );
  }
}
