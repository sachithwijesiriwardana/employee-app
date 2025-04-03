import { Component, inject, OnInit, signal } from '@angular/core';
import { MasterServicesService } from '../../service/master-services.service';
import {
  APIresponse,
  CDepartment,
  Employee,
  PDepartment,
} from '../../model/Employee';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../service/employee.service';
import { error } from 'node:console';

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
  employeeList: Employee[] = [];
  employeeObj: Employee = new Employee();
  isSidePanelOpen = signal<boolean>(true);
  ngOnInit(): void {
    this.getParentDept();
    this.getEmployees();
  }
  addNew() {
    this.isSidePanelOpen.set(true);
  }

  close() {
    this.isSidePanelOpen.set(false);
  }

  OnEdit(obj: Employee) {
    this.employeeObj = obj;



  }

  getParentDept() {
    this.masterService.getParentDept().subscribe((res: APIresponse) => {
      this.parentDeptList = res.data;
    });
  }

  getEmployees() {
    this.employeeService.getAllEmployee().subscribe((res: Employee[]) => {
      this.employeeList = res;
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
      .subscribe((res: Employee) => {
        debugger;

        alert('Employee Creation Success');
        this.getEmployees();
      }, error => {
        alert('Error Form API');
      })
  };
  onUpdateEmp() {
    this.employeeService
      .updateEmployee(this.employeeObj)
      .subscribe((res: Employee) => {
        debugger;

        alert('Employee update Success');
        this.getEmployees();
      }, error => {
        alert('Error Form API');
      })
  }

  onDelete(id: number) {
    console.log('helloo');
    const result = confirm('Are you sure you want to delete this employee?');
    if (result) {

      this.employeeService
        .deleteEmployee(id)
        .subscribe((res: Employee) => {
          debugger;

          alert('Employee Deleted Success');
          this.getEmployees();
        }, error => {
          alert('Error Form API');
        })
    }

  }


}
