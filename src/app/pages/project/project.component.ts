import { AsyncPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit, Pipe } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MasterServicesService } from '../../service/master-services.service';
import { Employee, Project } from '../../model/Employee';
import { Observable } from 'rxjs';
import { EmployeeService } from '../../service/employee.service';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, AsyncPipe, NgFor, DatePipe],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css',
})
export class ProjectComponent implements OnInit {
  currentView: string = 'List';
  projectForm: FormGroup = new FormGroup({});
  employeeService = inject(EmployeeService);

  projectList: Project[] = [];

  //Here i have used the observable to get the data from the service and then bind it to the template using async pipe.
  //This is a good practice to use async pipe in angular as it helps to manage the subscription and unsubscription of the observable automatically.
  employeeData$: Observable<Employee[]> = new Observable<Employee[]>();
  constructor() {
    this.initializeForm();
    this.employeeData$ = this.employeeService.getAllEmployee();
  }
  ngOnInit(): void {
    this.getAllProjects();
  }
  onEditProject(projectData: Project) {
    this.initializeForm(projectData);
  }

  initializeForm(projectData?: Project) {
    this.projectForm = new FormGroup({
      projectName: new FormControl(projectData ? projectData.projectName : 0),
      projectId: new FormControl(projectData ? projectData.projectId : ''),
      clientName: new FormControl(projectData ? projectData.clientName : ''),
      startDate: new FormControl(projectData ? projectData.startDate : ''),
      leadByEmpId: new FormControl(projectData ? projectData.leadByEmpId : ''),
      contactPerson: new FormControl(projectData ? projectData.contactPerson : ''),
      contactNo: new FormControl(projectData ? projectData.contactNo : ''),
      emailId: new FormControl(projectData ? projectData.emailId : ''),
    });
    this.currentView = "Create";
  }

  onSaveProject() {
    const formValue = this.projectForm.value;
    if (formValue.projectId == 0) {
      this.employeeService.createNewProject(formValue).subscribe(
        (res: Project) => {
          alert('project Created Sucessfully');
          this.getAllProjects();
        },
        (error) => { }
      );

    } else {
      this.employeeService.updateProject(formValue).subscribe(
        (res: Project) => {
          alert('project Updated Sucessfully');
          this.getAllProjects();
        },
        (error) => { }
      );

    }

  }
  getAllProjects() {
    this.employeeService.getProjects().subscribe((res: Project[]) => {
      this.projectList = res;
      console.log(this.projectList);
    });
  }

}
