import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BranchService } from '@settings/branch/branch.service';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'branch-create',
  templateUrl: './create.component.html'
})
export class CreateBranchComponent implements OnInit {

  branchForm: FormGroup;

  @Input() companyId: any;
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
    this.branchForm.patchValue({ companyId: this.companyId });
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

    this.branchService.add(branchForm).subscribe(result => {
      this.toastr.showSuccessMessage('The branch added successfully!');
      this.activeModal.close('submit');
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to add the branch');
      });
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
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
        Validators.required
      ]],
      email: ['', [
        Validators.email, Validators.maxLength(64)
      ]],
      phone: ['', [
        Validators.pattern(/^\d{1,13}$/)
        // PhoneNumberValidator
      ]],
      phoneCode: ['', [Validators.pattern(/^\d{1,3}$/)]],
      fax: ['', [Validators.maxLength(16), Validators.pattern(/^\d{1,16}$/)]],
    });
  }
}
