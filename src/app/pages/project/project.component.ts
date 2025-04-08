import { AsyncPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import {
  Component,
  ElementRef,
  inject,
  OnInit,
  Pipe,
  ViewChild,
  viewChild,
} from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Employee, Project, ProjectEmployee } from '../../model/Employee';
import { Observable } from 'rxjs';
import { EmployeeService } from '../../service/employee.service';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, AsyncPipe, NgFor, DatePipe, FormsModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css',
})
export class ProjectComponent implements OnInit {
  @ViewChild('myPopModl') employeeModal: ElementRef | undefined;

  currentView: string = 'List';
  projectForm: FormGroup = new FormGroup({});
  employeeService = inject(EmployeeService);
  projectEmployee: ProjectEmployee = new ProjectEmployee();

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

  onAddEmployee(id: number) {
    this.projectEmployee.empId = id;
    if (this.employeeModal) {
      this.employeeModal.nativeElement.style.display = 'block';
    }
  }
  onCloseModal() {
    if (this.employeeModal) {
      this.employeeModal.nativeElement.style.display = 'none';
    }
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
      contactPerson: new FormControl(
        projectData ? projectData.contactPerson : ''
      ),
      contactNo: new FormControl(projectData ? projectData.contactNo : ''),
      emailId: new FormControl(projectData ? projectData.emailId : ''),
    });
    this.currentView = 'Create';
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

  onAddEmp() {
    this.employeeService.addNewProjectEmployee(this.projectEmployee).subscribe(
      (res: ProjectEmployee) => {
        alert('Employee Added  to Project Successfully');
        this.getAllProjects();
      },
      (error) => {
        console.error('Error adding employee:', error);
        alert('Failed to add employee');
      }
    );
  }

  getAllProjects() {
    this.employeeService.getProjects().subscribe((res: Project[]) => {
      this.projectList = res;
      console.log(this.projectList);
    });
  }


}
