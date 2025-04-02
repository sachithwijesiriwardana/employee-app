import { Component, inject, OnInit } from '@angular/core';
import { MasterServicesService } from '../../service/master-services.service';
import {
  APIresponse,
  CDepartment,
  Employee,
  PDepartment,
} from '../../model/Employee';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../service/employee.service';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css',
})
export class EmployeeComponent implements OnInit {
  masterService = inject(MasterServicesService);
  employeeService = inject(EmployeeService);
  parentDeptList: PDepartment[] = [];
  childDeptList: CDepartment[] = [];
  deptId: number = 0;

  employeeObj: Employee = new Employee();

  ngOnInit(): void {
    this.getParentDept();
  }

  getParentDept() {
    this.masterService.getParentDept().subscribe((res: APIresponse) => {
      this.parentDeptList = res.data;
    });
  }

  OnDeptChange() {
    this.masterService
      .getChildDeptByParentId(this.deptId)
      .subscribe((res: APIresponse) => {
        this.childDeptList = res.data;
      });
  }
  onSaveEmp() {
    debugger;
    this.employeeService
      .createNewEmployee(this.employeeObj)
      .subscribe((res: APIresponse) => {
        debugger;
        if (res.result) {
          alert('Employee Creation Success');
        } else {
          alert(res.message);
        }
      });
  }
}
