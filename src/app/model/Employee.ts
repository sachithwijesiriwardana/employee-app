export interface APIresponse {
  result: string;
  message: string;
  data: any;
}

export class Employee {
  employeeId: number;
  employeeName: string;
  contactNo: string;
  emailId: string;
  deptId: number;
  password: string;
  gender: string;
  role: string;
  createdDate: Date;

  constructor() {
    this.employeeId = 0;
    this.employeeName = '';
    this.contactNo = '';
    this.emailId = '';
    this.deptId = 0;
    this.password = '';
    this.gender = '';
    this.role = 'Employee';
    this.createdDate = new Date();
  }
}

export interface PDepartment {
  departmentId: number;
  departmentName: string;
  departmentLogo: string;
}

export interface CDepartment {
  childDeptId: number;
  parentDeptId: number;
  departmentName: string;
}

export interface Project {
  projectId: number;
  projectName: string;
  clientName: string;
  startDate: string;
  leadByEmpId: number;
  contactPerson: string;
  contactNo: string;
  emailId: string;
  employeeName: string;
}
export class ProjectEmployee {
  empProjectId: number
  projectId: number
  empId: number
  assignedDate: string
  role: string
  isActive: boolean

  constructor() {
    this.empProjectId = 0
    this.projectId = 0
    this.empId = 0
    this.assignedDate = ''
    this.role = ''
    this.isActive = true
  }
}
