import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { PayrollProcessSalaryService } from '../payroll-process-salary.service';
import { PayrollProcessSalaryEditComponent } from '../payroll-process-salary-edit/payroll-process-salary-edit.component';
import { PayrollProcessService } from '../../payroll-process.service';
import { PayrollBasicComponent } from '../payroll-process-salary.model';
import { Months } from 'src/app/models/common/types/months';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-payroll-process-salary-list',
  templateUrl: './payroll-process-salary-list.component.html'
})
export class PayrollProcessSalaryListComponent implements OnInit {
  @Output() selectTab = new EventEmitter<number>();
  date: any;
  paygroupId: number;
  id: number;
  searchParameter = '';
  employeeComponent: { id: number, values: PayrollBasicComponent[] }[] = [];
  employeeComponentOnDisplay: { id: number, values: PayrollBasicComponent[] }[] = [];
  componentsArray = [];
  selectedYear: any;
  selectedMonth: any;
  months = Months;
  constructor(
    private payrollProcessService: PayrollProcessService,
    public modalService: NgbModal,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToasterDisplayService,
    private payrollProcessSalaryService: PayrollProcessSalaryService
  ) {
    this.route.queryParams.subscribe(params => {
      this.date = params.date;
      this.selectedYear = params.date.split('-')[1];
      this.selectedMonth = params.date.split('-')[0];
      this.paygroupId = parseInt(params.payGroup, 10);
      this.id = parseInt(params.id, 10);
    });
  }

  ngOnInit(): void {
    this.getSalaryConfigurations();

  }
  // @HostListener('window:beforeunload', ['$event']) unloadHandler(event: Event) {
  //   console.log('Processing beforeunload...');
  //   // Do more processing...
  //   event.returnValue = false;
  // }
  getSalaryConfigurations() {
    this.payrollProcessService.get(this.id).subscribe(payrollProcess => {
      let apiToCall;
      if (payrollProcess.processedStep >= 2) {
        apiToCall = this.payrollProcessSalaryService.getByProcessId(this.id);

      } else {
        apiToCall = this.payrollProcessSalaryService.getAll(this.paygroupId, this.months[this.selectedMonth], this.selectedYear);
      }
      apiToCall.subscribe(res => {
        const component = new Set();
        res.map(employee => {
          employee.values.map((comp: any) => {
            employee[comp.shortCode] = comp.monthlyAmount;
            component.add(comp.shortCode);
          });
        });

        this.employeeComponent = this.employeeComponentOnDisplay = res;
        this.componentsArray = Array.from(component);
      });
    });
  }
  compareFn(a, b) {
    if (b.formula && b.formula.indexOf(a.shortCode) !== -1) {
      return -1;
    }
    if (b.formula && b.formula.indexOf(a.shortCode) === -1) {
      return 1;
    }
    return 0;
  }
  openEditSalaryConfiguration(salary) {
    const modalRef = this.modalService.open(PayrollProcessSalaryEditComponent,
      { size: 'lg', centered: true, backdrop: 'static' });
    salary.values = salary.values.sort((a, b) => this.compareFn(a, b));
    modalRef.componentInstance.salary = salary;
    const components = Object.keys(salary);
    components.shift();
    components.shift();
    modalRef.componentInstance.components = components;
    modalRef.result.then((result) => {
      if (result && result.values && result.values.length) {
        result.values.map((comp: any) => {
          result[comp.shortCode] = comp.monthlyAmount;
        });
        this.employeeComponent.map(employee => {
          if (result.id === employee.id) {
            return result;
          } else {
            return employee;
          }
        });
        this.employeeComponentOnDisplay.map(employee => {
          if (result.id === employee.id) {
            return result;
          } else {
            return employee;
          }
        });
      }

    }, error => {
      console.log(error);
    });

  }

  filterArray() {
    if (!this.searchParameter) {
      this.employeeComponentOnDisplay = this.employeeComponent;
    } else {
      const searchResult = [];
      const delimiter = '~!~';
      this.employeeComponent.forEach(employee => {
        let combinedString = employee.values[0].employeeName + delimiter + employee.values[0].employeeCode + delimiter;
        this.componentsArray.forEach(component => {
          combinedString += employee[component] + delimiter;
        });
        if (combinedString.toLowerCase().indexOf(this.searchParameter.toLowerCase()) !== -1) {
          searchResult.push(employee);
        }
      });
      this.employeeComponentOnDisplay = searchResult;
    }
  }
  onSubmit(status) {
    let comp: any = this.employeeComponent.map(emp => [...emp.values]).flat();
    comp = comp.map((component: PayrollBasicComponent) => {
      return {
        employeeCode: component.employeeCode,
        employeeId: component.employeeId,
        employeeName: component.employeeName,
        payrollComponentId: component.payrollComponentId,
        payrollComponentName: component.payrollComponentName,
        payrollStructureId: component.payrollStructureId,
        monthlyAmount: component.monthlyAmount,
        shortCode: component.shortCode,
        paygroupId: this.paygroupId,
        payrollProcessingMethodId: this.id,
        status: 1
      };
    });
    this.payrollProcessSalaryService.update(comp).subscribe(res => {
      if (res) {
        this.payrollProcessService.updateProcessedStep(this.id, 2, { id: this.id, stepNumber: 2 })
          .subscribe(() => {
            this.toastr.showSuccessMessage('Payroll Salary Component Processing Completed');
            if (status === 'continue') {
              this.selectTab.emit(3);
            } else {
              this.router.navigate(['../'], { relativeTo: this.route });
            }
          });
      }
    });
  }

}
