import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { NgbActiveModal, NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';

import { NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { OvertimeRequestService } from '../overtime-request.service';
import { OvertimePolicyConfigurationService } from '@settings/overtime/overtime-policy-configuration/overtime-policy-configuration.service';
import { Employee } from '@features/employee/employee.model';
import { OvertimeRequest } from '../overtime-request.model';
import { EmployeeService } from '@features/employee/employee.service';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { OvertimePolicyConfiguration } from '@settings/overtime/overtime-policy-configuration/overtime-policy-configuration.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: './overtime-request-edit.component.html',
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class OvertimeRequestEditComponent implements OnInit {

  editForm: FormGroup;
  currentUserId: number;
  minDateFrom: NgbDate;
  maxDateFrom: NgbDate;
  minDateTo: NgbDate;
  maxDateTo: NgbDate;
  markDisabled;
  employeeList: Employee[];
  selectedItems = [];
  alreadySelectedItem=[];
  overtimeConfiguration: OvertimePolicyConfiguration;
  employeeDetails: any;
  employeeDetailsCheck: boolean;
  selectEnable: boolean;
  employeeLogin: any;
  notifyPersonList:any=[]


  @Input() overtimeRequest: OvertimeRequest;

  @ViewChild('notifyPersonnel') notifyPersonnel: ElementRef;

  constructor(
    private overtimeRequestService: OvertimeRequestService,
    private employeeService: EmployeeService,
    private overtimePolicyConfigurationService: OvertimePolicyConfigurationService,
    private calendar: NgbCalendar,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    debugger
    this.markDisabled = (date: NgbDate) => this.calendar.getWeekday(date) >= 6;
    this.currentUserId = getCurrentUserId();
    this.editForm = this.createFormGroup();
    this.editForm.patchValue(this.overtimeRequest);
    this.editForm.patchValue({
      fromDate: new Date(this.overtimeRequest.fromDate),
      toDate: new Date(this.overtimeRequest.toDate)
    });
    let b=this.router.routerState.snapshot.url;
    if(b=="/my-overtime"){
      this.employeeDetailsCheck=true
    }else{
      this.employeeDetailsCheck=false  
     
    }
    this.getOvertimeConfiguration();
    this.getEmployeeList();
    this.getLoginEmployeeDetail()
    //this.getAllOvertimeDetails()
  }
  getOvertimeConfiguration() {
    this.overtimePolicyConfigurationService.getOvertimeConfiguration(this.currentUserId).subscribe(result => {
      this.overtimeConfiguration = result;
      if(result.isOvertimeSlab==true){
        this.editForm.get("normalOverTime").enable();
        this.editForm.get("holidayOverTime").enable();
        this.editForm.get("specialOverTime").disable();
      }else{
        this.editForm.get("normalOverTime").enable();
        this.editForm.get("holidayOverTime").enable();
        this.editForm.get("specialOverTime").enable();
      }
      this.editForm.patchValue({ overTimePolicyId: this.overtimeConfiguration.overTimePolicyId });
      if (this.overtimeConfiguration.isCommentRequired) {
        this.editForm.get('reason').setValidators([Validators.required, Validators.maxLength(250)]);
      }
    },
      error => {
        console.error(error);
      });
  }

  getOvertimeNotifyPersonnelByOvertimeId(){
    this.overtimeRequestService.getOvertimeNotifyPersonnelByOvertimeId(this.overtimeRequest.id).subscribe((res:any) =>{
      this.selectedItems = this.employeeList?.filter(({ id: id1 }) => res.some(({ notifyPersonnel: id2 }) => id2 === id1));
      this.alreadySelectedItem = [...this.selectedItems]
      this.notifyPersonList = res
      
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the Notify personnel');
      });
    }

  getEmployeeList() {
    this.employeeService.getAll().subscribe(result => {
      debugger
      this.employeeList = result.filter(employee => employee.id !== this.overtimeRequest.employeeId);
      if(this.employeeDetailsCheck==false){
        this.employeeDetails=result
        this.selectEnable=true
      }
      if(this.overtimeRequest.employeeId){
        let a= this.employeeDetails.filter(x=>x.id==this.overtimeRequest.employeeId)
        this.editForm.patchValue({
          employeeName:a[0].firstName
        });
      }
      this.getOvertimeNotifyPersonnelByOvertimeId();
    },
      error => {
        console.error(error);
      });
  }
  getEmployeeId(event){
    debugger
    let a=this.employeeDetails.filter(x=>x.firstName==event)
    this.editForm.patchValue({
      employeeId:a[0].id,
      employeeName:a[0].firstName

    })
  }
  formatter = (employee) => employee.firstName;

  search = (text$: Observable<string>) => text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    filter(term => term.length >= 2),
    map(term => this.employeeList.filter(employee => new RegExp(term, 'mi').test(employee.firstName)).slice(0, 10))
  )

  selected($event) {
    $event.preventDefault();
    if (this.selectedItems.indexOf($event.item) === -1) {
      this.selectedItems.push($event.item);
    }
    this.notifyPersonnel.nativeElement.value = '';
  }

  remove(item) {
    this.selectedItems.splice(this.selectedItems.indexOf(item), 1);
  }

  onFromDateSelection(date) {

  }

  onToDateSelection(date) {

  }

  onSubmit() {
    if(this.editForm.invalid){

      return
         
       }
    this.editForm.value.requestStatus=4
    this.overtimeRequestService.update(this.editForm.value).subscribe((result: any) => {      
      if (result.id !== -1) {
        
        const notifyPersonnelForm = this.selectedItems.map(notifyPerson => ({
          overtimeId: this.overtimeRequest.id,
          notifyPersonnel: notifyPerson.id,
          isarchived:false,
          id:0
        }));

     
        this.selectedItems.forEach( array1Ttem => {

          this.alreadySelectedItem.forEach( array2Item => {
    
             if(array1Ttem.id != array2Item.id){
              var data = {overtimeId: this.overtimeRequest.id,'notifyPersonnel':array2Item.id, isarchived: true,id:0}
              notifyPersonnelForm.push(data)
            }
           
    
          })
        })
        


        notifyPersonnelForm.forEach(obj1 =>{
          this.notifyPersonList.forEach(obj2 =>{
            if(obj1.notifyPersonnel == obj2.notifyPersonnel){
              obj1.id = obj2.id
            }
          })
        })
        
        
        this.overtimeRequestService.UpdateNotifyPersonal(notifyPersonnelForm).subscribe(() => {
          this.toastr.showSuccessMessage('Overtime request updated successfully!');
          this.activeModal.close('submit');
        });
      }
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to update the overtime request ');
      });
  }
  draftSave() {
    if(this.editForm.invalid){

      return
         
       }
    this.editForm.value.requestStatus=1
    this.overtimeRequestService.update(this.editForm.value).subscribe((result: any) => {      
      if (result.id !== -1) {
        
        const notifyPersonnelForm = this.selectedItems.map(notifyPerson => ({
          overtimeId: this.overtimeRequest.id,
          notifyPersonnel: notifyPerson.id,
          isarchived:false,
          id:0
        }));

     
        this.selectedItems.forEach( array1Ttem => {

          this.alreadySelectedItem.forEach( array2Item => {
    
             if(array1Ttem.id != array2Item.id){
              var data = {overtimeId: this.overtimeRequest.id,'notifyPersonnel':array2Item.id, isarchived: true,id:0}
              notifyPersonnelForm.push(data)
            }
           
    
          })
        })
        


        notifyPersonnelForm.forEach(obj1 =>{
          this.notifyPersonList.forEach(obj2 =>{
            if(obj1.notifyPersonnel == obj2.notifyPersonnel){
              obj1.id = obj2.id
            }
          })
        })
        
        
        this.overtimeRequestService.UpdateNotifyPersonal(notifyPersonnelForm).subscribe(() => {
          this.toastr.showSuccessMessage('Overtime request updated successfully!');
          this.activeModal.close('submit');
        });
      }
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to update the overtime request ');
      });
  }
  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      id: [],
      overTimePolicyId: [null],
      fromDate: ['', [
        Validators.required
      ]],
      toDate: ['', [
        Validators.required
      ]],
      numberOfHours: [null, [
        //Validators.required,
        Validators.max(524)
      ]],
      reason: ['', [
        Validators.required,
        Validators.maxLength(128),
      ]],
      employeeId: [],
      requestStatus: [0],
      createdDate: [],
      normalOverTime:[null],
      holidayOverTime:[null],
      specialOverTime:[null],
      employeeName:[null]
    });
  }
  getLoginEmployeeDetail(){
    debugger
    this.employeeService.getLoginEmployee(this.currentUserId).subscribe(res=>{
      this.employeeLogin=res
      if(this.employeeDetailsCheck==true){
        this.editForm.patchValue({
          employeeName:this.employeeLogin.firstName
        })
        this.getOvertimeNotifyPersonnelByOvertimeId();
      }
    })
  }
  // getAllOvertimeDetails(){
  //   debugger
  //   this.overtimeRequestService.getAllOvertimeDetailsById(this.editForm.value.employeeId).subscribe(res=>{
  //    console.log(res)
  //   })
  // }
}
