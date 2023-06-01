import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WpsUser } from '../wps-user.model';
import { EmployeeWpsUserService } from '../employee-wps-user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeWpsService } from '@settings/wps/employee-wps.service';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { result } from 'lodash';
import { EmployeeWpsBankerService } from '../employee-wps-bank.service';

@Component({
  selector: 'hrms-employee-wps-details-create',
  templateUrl: './employee-wps-details-create.component.html',
  styleUrls: ['./employee-wps-details-create.component.scss']
})
export class EmployeeWpsDetailsCreateComponent implements OnInit {

  wpsUserDetails: WpsUser[] = [];
  addForm: FormGroup;
  editForm: FormGroup;
  groupId: any;
  currentUserId: number;
  id: any;
  wpsId: any;
  molId:any;
  routingId:any;
  salaryCardNo:any;
  bankId:any;
  accountNo:any
  bankList: any;
  detailsUpdate: any;
  wpsGroupObj:any;
  bankObj:any;

  @Output() wpsDetailsForm = new EventEmitter<any>();
  @Input() passEmployeeId:any
  employeeId:any

  constructor(
    private route: ActivatedRoute,
    private employeeWpsUserService: EmployeeWpsUserService,
    private toastr: ToasterDisplayService,
    public modalService: NgbModal,
    private formBuilder: FormBuilder,
    private employeeWpsService: EmployeeWpsService,
    private employeeWpsBankerService: EmployeeWpsBankerService,
  ) { }

  ngOnInit(): void {
    this.currentUserId = getCurrentUserId();
    this.addForm = this.createFormGroup();
    this.route.params.subscribe((params: any) => {
      if(params.empId){
      this.employeeId = parseInt(params.empId, 10);
      this.employeeWpsUserService.get(this.employeeId).subscribe(result => {
        this.addForm.patchValue(result[0]);
      },)
      }else{
        this.employeeId = parseInt(this.passEmployeeId, 10);
      }
    });
    this.getWPSGrouplist();
    // this.getWPSUserlistById();
    // this.getMolId(this.id)
    this.getWPSBanklist()
  }

  getWPSGrouplist() {
    this.employeeWpsService.getAll().subscribe(result => {
      let temp = { id: undefined, groupName: 'test', isLastRow: true }
      // lastrow
      this.groupId = [...result, temp];
      this.wpsGroupObj = result.find((item) => this.addForm.get('groupId').value == item.id)
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the WPS Group List Details');
      });
  }

  // getWPSUserlistById() {
  //   this.employeeWpsUserService.get(this.id).subscribe(result => {
  //     this.wpsUserDetails = result;
  //     this.wpsId=result[0].wpsId;
  //     this.detailsUpdate=result[0].id
  //     this.addForm.patchValue(result[0]);
  //   },
  //     error => {
  //       console.error(error);
  //       this.toastr.showErrorMessage('Unable to fetch the WPS List Details');
  //     });
  // }

  onSubmit() {
   debugger
      const addWpsDetails = this.addForm.value;
      addWpsDetails.employeeId = parseInt(this.employeeId, 10);
      this.employeeWpsUserService.add(addWpsDetails).subscribe((result:any) => {
        this.toastr.showSuccessMessage('WPS Details added successfully!');
        // this.getWPSUserlistById();
      })
    this.wpsDetailsForm.emit(addWpsDetails)

  }

  getWPSBanklist() {
    this.employeeWpsBankerService.getBank().subscribe(result => {
      this.bankList = result.filter(x=>x.status=="Active")
      let temp = { id: undefined,status:'Active', name: 'test', isLastRow: true }
      // lastrow
      this.bankList = [...result.filter(x=>x.status=="Active"), temp];
      this.bankObj = result.find((item) => this.addForm.get('bankId').value == item.id)

    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the WPS Group List Details');
      });
  }

  keyPressNumbers(event) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }
  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      employeeId: [''],
      groupId: ['', [
        Validators.maxLength(60),
        Validators.required
      ]],
      wpsId: ['', [
      // Validators.pattern(/^\d{1,14}$/),
        Validators.required,
         Validators.maxLength(30),
        
      ]],
      molId: ['', [
        Validators.maxLength(18),
        Validators.required
      ]],
      routingId: ['', [
        Validators.maxLength(18),
        Validators.required
      ]],
      salaryCardNo: ['', [
        Validators.maxLength(18),
        Validators.required
      ]],
      bankId: ['', [
        Validators.required
      ]],
      accountNo: ['', [
        Validators.maxLength(18),
        Validators.required
      ]],
    });
  }
selectWpsGroup(args){

}
selectBank(args){

}
refreshWpsGroup(event){

}
refreshBank(event){

}
}



