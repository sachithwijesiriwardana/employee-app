import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MasterServicesService } from '../../service/master-services.service';
import { Employee } from '../../model/Employee';
import { Observable } from 'rxjs';
import { EmployeeService } from '../../service/employee.service';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, AsyncPipe, NgFor],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent {
  currentView: string = "List";
  projectForm: FormGroup = new FormGroup({});
  employeeService = inject(EmployeeService);

  //Here i have used the observable to get the data from the service and then bind it to the template using async pipe.
  //This is a good practice to use async pipe in angular as it helps to manage the subscription and unsubscription of the observable automatically.
  employeeData$: Observable<Employee[]> = new Observable<Employee[]>();
  constructor() {
    this.initializeForm();
    this.employeeData$ = this.employeeService.getAllEmployee();
  }

  initializeForm() {

    this.projectForm = new FormGroup({
      projectName: new FormControl(0),
      projectId: new FormControl(''),
      clientName: new FormControl(''),
      startDate: new FormControl(''),
      leadByEmpId: new FormControl(''),
      contactPerson: new FormControl(''),
      contactNo: new FormControl(''),
      emailId: new FormControl(''),

    });
  }
}
