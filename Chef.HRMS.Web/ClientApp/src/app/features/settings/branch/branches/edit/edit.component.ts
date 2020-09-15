import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BranchService } from '../../branch.service';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'branch-edit',
  templateUrl: './edit.component.html'
})
export class EditBranchComponent implements OnInit {

  branchForm: FormGroup;

  @Input() branchId: any;
  @Input() countries: any;
  @Input() states: any;

  public statesByCountry: any;

  constructor(
    private branchService: BranchService,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService) {
  }

  ngOnInit(): void {
    this.branchForm = this.createFormGroup();
    this.branchService.get(this.branchId).subscribe(result => {
      this.getStatesByCountry(result.country);
      const code = result.phone.split('-')[0].substr(1);
      result.phone = result.phone.split('-')[1];
      this.branchForm.patchValue(result);
      this.branchForm.patchValue({ phoneCode: code });
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the branch');
      });
  }

  getStatesByCountry(countryId) {
    this.statesByCountry = this.states.filter((state) => state.countryId == countryId);
  }

  onSubmit() {
    const branchForm = this.branchForm.value;
    branchForm.phone = `+${branchForm.phoneCode}-${branchForm.phone}`;
    if (branchForm.stateOrProvince) {
      branchForm.stateName = this.states.find(i => i.id === branchForm.stateOrProvince).name;
    }
    if (branchForm.country) {
      branchForm.countryName = this.countries.find(i => i.id === branchForm.country).name;
    }

    this.branchService.update(branchForm).subscribe(result => {
      this.toastr.showSuccessMessage('The branch is updated successfully!');
      this.activeModal.close('submit');
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('There is an error in updating branch');
      });
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      id: [''],
      companyId: [''],
      shortName: ['', [
        Validators.required, Validators.maxLength(16)
      ]],
      timeZoneId: ['', [
        Validators.required, Validators.maxLength(8)
      ]],
      addressLine1: ['', [
        Validators.required, Validators.maxLength(128)
      ]],
      addressLine2: ['', [Validators.maxLength(128)]],
      city: ['', [
        Validators.required, Validators.maxLength(32)
      ]],
      stateOrProvince: [0],
      stateName: [''],
      countryName: [''],
      country: ['', [
        Validators.required
      ]],
      pincode: ['', [
        Validators.required, Validators.maxLength(64)
      ]],
      email: ['', [
        Validators.email
      ]],
      phone: ['', [
        Validators.pattern(/^\d{1,11}$/)
        // PhoneNumberValidator
      ]],
      phoneCode: ['', [Validators.pattern(/^\d{1,3}$/)]],
      fax: ['', [Validators.maxLength(16), Validators.pattern(/^\d{1,16}$/)]]
    });
  }
}
