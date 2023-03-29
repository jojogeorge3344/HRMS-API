import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '@settings/branch/country.service';
import { StateService } from '@settings/branch/state.service';
import { EmployeeAddressService } from '../employee-address-edit/employee-address.service';
@Component({
  selector: 'hrms-employee-address-view',
  templateUrl: './employee-address-view.component.html',
  styleUrls: ['./employee-address-view.component.scss']
})
export class EmployeeAddressViewComponent implements OnInit {

  editForm: FormGroup;
  id:any
  viewForm: any;
  public countries: any;
  public states: any;
  public currentstatesByCountry: any;
  public permanentstatesByCountry: any;
  getStateValue: any;

  constructor(private formBuilder: FormBuilder,private addressService: EmployeeAddressService,
    private route: ActivatedRoute,
    private stateService: StateService,
    private countryService: CountryService,) { }

  ngOnInit(): void {
    this.editForm = this.createFormGroup();
    this.route.params.subscribe((params: any) => {
      this.id = parseInt(params.id, 10);
      });

      this.getCountires()
      this.getStates()
  
  }
  getCountires() {
    this.countryService.getAll().subscribe(result => {
      this.countries = result;
    },
      error => {
        console.error(error);
      });
      this.getStates()
  }

  getStates() {
    this.stateService.getAll().subscribe(result => {
      this.states = result;
      this.getAll()
    },
      error => {
        console.error(error);
      });
  }
  getAll(){
    this.addressService.get(this.id).subscribe((res)=>{
    
      this.editForm.value.currentCountry=res[0].currentCountry
      this.editForm.patchValue({
        currentState:res[0].currentState ? res[0]?.currentState : "",
        permanentState: res[0].permanentState ?  res[0]?.permanentState : "",
      })
      if(this.editForm.value.currentCountry){
      this.getStatesByCountry(this.editForm.value.currentCountry, 'current');
      this.getStatesByCountry(this.editForm.value.currentCountry, 'permenant');
      }
      this.getStateValue=res[0].id
     
      
        this.editForm.patchValue({
          employeeId: res[0].employeeId,
          currentAddressLine1:res[0].currentAddressLine1,
          currentAddressLine2:res[0].currentAddressLine2,
          currentCountry: res[0].currentCountry,
          currentState: res[0].currentState ? res[0]?.currentState : "",
          currentPinCode: res[0].currentPinCode,
          permanentAddressLine1: res[0].permanentAddressLine1,
          permanentAddressLine2: res[0].permanentAddressLine2,
          permanentCountry: res[0].permanentCountry,
          permanentState: res[0].permanentState ?  res[0]?.permanentState : "",
          permanentPinCode: res[0].permanentPinCode,
          //id:res[0].id
        });
      
    
       
    
    })


  }

getStatesByCountry(countryId, addressType) {
  debugger
  if (addressType === 'current') {
    this.currentstatesByCountry = this.states?.filter((state) => state.countryId == countryId);
    this.setpermanentAsCurrent(this.editForm.controls.currentCountry.value, 'permanentCountry');
    if (this.editForm.controls.ispermanentSameAsCurrent.value) {
      this.permanentstatesByCountry = this.states?.filter((state) => state.countryId == countryId);
    }
  } else {
    this.permanentstatesByCountry = this.states?.filter((state) => state.countryId == countryId);
  }
}
currentAspermanent() {
  if (this.editForm.controls.ispermanentSameAsCurrent.value) {
    this.setpermanentAsCurrent(this.editForm.controls.currentAddressLine1.value, 'permanentAddressLine1');
    this.setpermanentAsCurrent(this.editForm.controls.currentAddressLine2.value, 'permanentAddressLine2');
    this.setpermanentAsCurrent(this.editForm.controls.currentCountry.value, 'permanentCountry');
    this.getStatesByCountry(this.editForm.controls.currentCountry.value, 'permanent');
    this.setpermanentAsCurrent(this.editForm.controls.currentState.value, 'permanentState');
    this.setpermanentAsCurrent(this.editForm.controls.currentPinCode.value, 'permanentPinCode');


    this.editForm.controls.permanentAddressLine1.disable();
    this.editForm.controls.permanentAddressLine2.disable();
    this.editForm.controls.permanentCountry.disable();
    this.editForm.controls.permanentPinCode.disable();
    this.editForm.controls.permanentState.disable();
  } else {
    this.editForm.controls.permanentAddressLine1.enable();
    this.editForm.controls.permanentAddressLine2.enable();
    this.editForm.controls.permanentCountry.enable();
    this.editForm.controls.permanentPinCode.enable();
    this.editForm.controls.permanentState.enable();
  }
}
setpermanentAsCurrent(value: any, field: string) {
  if (this.editForm.controls.ispermanentSameAsCurrent.value) {
    const updatevalue = {};
    updatevalue[field] = value;
    this.editForm.patchValue(updatevalue);
  }

}

createFormGroup(): FormGroup {
  return this.formBuilder.group({
    currentAddressLine1: ['', [
      Validators.required,
      Validators.maxLength(128),
    ]],
    currentAddressLine2: ['', [
      Validators.maxLength(128),
    ]],
    currentCountry: ['', [
      Validators.required,
      Validators.maxLength(32),
    ]],
    currentPinCode: ['', [
      Validators.required,
      Validators.maxLength(16),
      Validators.pattern("^[0-9]*$")
    ]],
    currentState: ['', [
      Validators.required,
    ]],
    permanentAddressLine1: ['', [
      Validators.required,
      Validators.maxLength(128),
    ]],
    permanentAddressLine2: ['', [
      Validators.maxLength(128),
    ]],
    permanentCountry: ['', [
      Validators.required,
      Validators.maxLength(32),
    ]],
    permanentPinCode: ['', [
      Validators.required,
      Validators.maxLength(16),
      Validators.pattern("^[0-9]*$"),
    ]],
    permanentState: ['', [
      Validators.required,
    ]],
    ispermanentSameAsCurrent: [false],
    createdDate: []
   

  });
}
 
  
}
