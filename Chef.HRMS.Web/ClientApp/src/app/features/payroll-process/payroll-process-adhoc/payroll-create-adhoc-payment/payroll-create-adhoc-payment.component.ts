import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PayrollProcessAdhocService } from '../payroll-process-adhoc.service';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Employee } from '@features/employee/employee.model';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { PayGroupService } from '@settings/payroll/pay-group/pay-group.service';
import { ActivatedRoute } from '@angular/router';
import { AdhocDeductionView } from '../payroll-process-adhoc-deduction-view.model';
import { duplicateNameValidator } from '@shared/utils/validators.functions';
import { Months } from 'src/app/models/common/types/months';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-payroll-create-adhoc-payment',
  templateUrl: './payroll-create-adhoc-payment.component.html'
})
export class PayrollCreateAdhocPaymentComponent implements OnInit {

  addForm: FormGroup;
  employees: Employee[];
  selectedEmployee: string;
  selectedEmployeeCode: string;
  @Input() processId: any;
  @Input() payGroupProcessAdhocDeductionList: AdhocDeductionView[] = [];
  currentUserId: number;
  paygroupId: any;
  id: any;
  fromDate: string;
  toDate: string;
  deductioName: string[];
  selectedYear: any;
  selectedMonth: any;
  months = Months;
  searchFailed: boolean;
  constructor(
    public activeModal: NgbActiveModal,
    private toastr: ToasterDisplayService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private payrollProcessAdhocService: PayrollProcessAdhocService,
    private payGroupService: PayGroupService
  ) { }

  ngOnInit(): void {
    this.currentUserId = getCurrentUserId();
    this.addForm = this.createFormGroup();
    this.route.queryParams.subscribe(params => {
      this.paygroupId = params.payGroup;
      this.id = params.id;
      this.selectedYear = params.date.split('-')[1];
      this.selectedMonth = this.months[params.date.split('-')[0]];
    });
    this.getEmployeeDetails();
  }

  // api/settings/payroll/PayGroup/GetAllEmployeeByPayGroupId

  getEmployeeDetails() {
    this.payGroupService.getAllByPaygroup(this.paygroupId, this.selectedYear, this.selectedMonth).subscribe((result: Employee[]) => {
      this.employees = result;
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the Employee Details');
      });
  }

  nameFormatter = (employee) => employee.firstName;
  codeFormatter = (employee) => employee.employeeNumber;

  search = (text: Observable<string>) => {
    return text.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => {
        const searchitem = (this.employees.filter((v) => v.firstName.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));
        if (searchitem.length == 0) {
          this.searchFailed = true;
          return;
        } else {
          this.searchFailed = false;
          return term.length <= 1 ? [].slice() : this.employees.filter((v) => v.firstName.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10);
        }

      })
    );
  }
  selected($event) {
    $event.preventDefault();
    this.selectedEmployee = $event.item.firstName;
    this.selectedEmployeeCode = $event.item.employeeNumber;
    this.addForm.patchValue({
      employeeId: $event.item.id,
      employeeCode: this.selectedEmployeeCode

    });
    if (this.payGroupProcessAdhocDeductionList.length != 0) {
      const filterEmployee = this.payGroupProcessAdhocDeductionList.filter(x => x.employeeId === $event.item.id);
      this.deductioName = filterEmployee.map(e => e.deductionName.toLowerCase());
      this.addForm.get('deductionName').setValidators(duplicateNameValidator(this.deductioName));
      this.addForm.get('deductionName').updateValueAndValidity();
    }

  }

  onSubmit() {
    this.payrollProcessAdhocService.add(this.addForm.value).subscribe(result => {
      this.toastr.showSuccessMessage('Adhoc Deduction Added successfully');
      this.activeModal.close('submit');
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to add Adhoc Deduction ');
      });
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      payrollProcessingMethodId: this.processId,
      employeeId: ['', [
        Validators.required,Validators.maxLength(10)
      ]],
      employeeCode: ['', [
        Validators.required,Validators.maxLength(50)
      ]],
      deductionName: ['', [
        Validators.required,
        Validators.maxLength(32)
      ]],
      description: ['', [
        Validators.required,
        Validators.maxLength(128)
      ]],
      currency: ['INR', [
        Validators.required
      ]],
      amount: [null, [
        Validators.required,
        Validators.max(999999999)
      ]]
    });
  }

}
