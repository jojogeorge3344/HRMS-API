import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { forkJoin } from 'rxjs';

import { EmployeeBasicDetailsService } from '../employee-basic-details/employee-basic-details.service';
import { EmployeeJobDetailsService } from '../employee-job-details/employee-job-details.service';
import { EmployeeJobFilingService } from '../employee-job-filing/employee-job-filing.service';
import { EmployeeNumbersService } from '@settings/employee/employee-numbers/employee-numbers.service';
import { BranchService } from '@settings/branch/branch.service';
import { AuthService } from 'src/app/services/auth/auth.service';

import { Branch } from '@settings/branch/branch';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-employee-create-container',
  templateUrl: './employee-create-container.component.html'
})
export class EmployeeCreateContainerComponent implements OnInit {

  basicDetailsForm: any = null;
  jobDetailsForm: any = null;
  jobFilingsForm: any = null;
  activeId = 1;
  branches: Branch[];
  numberSeriesId: any;
  disableTabFrom = 1;

  constructor(
    private employeeBasicDetailsService: EmployeeBasicDetailsService,
    private employeeJobDetailsService: EmployeeJobDetailsService,
    private employeeJobFilingService: EmployeeJobFilingService,
    private branchService: BranchService,
    private employeeNumbersService: EmployeeNumbersService,
    private authService: AuthService,
    private toastr: ToasterDisplayService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getBranches();
    this.getEmployeeNumber();    
  }

  getBranches() {
    this.branchService.getAll().subscribe(result => {
      this.branches = result;
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the branches');
      });
  }

  getEmployeeNumber() {
    this.employeeNumbersService.getAll().subscribe(result => {
      this.numberSeriesId = result;
      this.numberSeriesId.nextNumber = this.numberSeriesId.nextNumber + 1;
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the Number Series Details');
      });
  }

  onSubmitBasicDetails(basicDetailsForm) {
    debugger
    this.basicDetailsForm = basicDetailsForm;
    this.activeId = this.disableTabFrom = 2;
    console.log('jobdtslsform1',this.basicDetailsForm);

  }

  onSubmitJobDetails(jobDetailsForm) {
    this.jobDetailsForm = jobDetailsForm;
    this.activeId = this.disableTabFrom = 3;
    console.log('jobdtslsform',this.jobDetailsForm);

  }

  onSubmitJobFilings(jobFilingsForm) {
debugger
    this.jobFilingsForm = jobFilingsForm;

    this.employeeBasicDetailsService.add(this.basicDetailsForm).subscribe((result) => {


     
      this.jobDetailsForm.employeeId = result;
      if (this.jobDetailsForm.employeeId == 0){
        this.toastr.showErrorMessage('Employee added Failed!');
        return
      }else{

    
      this.jobDetailsForm.branchId = this.jobDetailsForm.location;
      this.jobDetailsForm.companyId = this.branches.find(c => c.id == this.jobDetailsForm.branchId).companyId;
 
      this.jobFilingsForm.employeeId = result;
      console.log(this.jobFilingsForm.employeeId)
      this.jobDetailsForm.numberSeriesId = parseInt(this.jobDetailsForm.numberSeriesId, 10);
      const numberSeriesValue = this.numberSeriesId.find((employeeNumber) => employeeNumber.id == this.jobDetailsForm.numberSeriesId);
      numberSeriesValue.nextNumber = numberSeriesValue.nextNumber + 1;

      forkJoin([this.employeeJobDetailsService.add(this.jobDetailsForm), this.employeeJobFilingService.add(this.jobFilingsForm)])
        .subscribe(([details, filing]) => {
          this.employeeNumbersService.update(numberSeriesValue).subscribe(() => {
          });
          // const newUserCredentails = {
          //   email: this.basicDetailsForm.email,
          //   password: 'test',
          //   token: 'testtoken',
          //   employeeId: this.jobDetailsForm.employeeId
          // };
          // this.authService.insertNewUser(newUserCredentails).subscribe(() => {
          // });
          this.toastr.showSuccessMessage('Employee added successfully!');
          this.router.navigateByUrl('/employee');
        });
      }
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the form lists');
      });
  }


}
