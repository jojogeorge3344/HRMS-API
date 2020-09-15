import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '@shared/dialogs/confirm-modal/confirm-modal.component';
import { CreateSignatoryComponent } from './create/create.component';
import { EditSignatoryComponent } from './edit/edit.component';
import { BranchSignatoryService } from '../signatory.service';
import { StateService } from '../state.service';
import { CountryService } from '../country.service';

import { ToastrService } from 'ngx-toastr';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'app-signatories',
  templateUrl: './signatories.component.html'
})

export class SignatoriesComponent implements OnInit {

  public signatories: any;
  public branchId: any;
  public countries: any;
  public states: any;

  constructor(
    private signatoryService: BranchSignatoryService,
    private router: Router,
    private route: ActivatedRoute,
    private stateService: StateService,
    private countryService: CountryService,
    public modalService: NgbModal,
    private toastr: ToasterDisplayService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.branchId = params.id;
    });

    this.getSignatories(this.branchId);
    this.getCountires();
    this.getStates();
  }

  getSignatories(branchId) {
    this.signatoryService.getAllByBranch(branchId).subscribe(result => {
      this.signatories = result;
    },
    error => {
      console.error(error);
      this.toastr.showErrorMessage('Unable to fetch the signatories');
    });
  }

  getCountires() {
    this.countryService.getAll().subscribe(result => {
      this.countries = result;
    },
    error => {
      console.error(error);
      this.toastr.showErrorMessage('Unable to fetch the countries');
    });
  }

  getStates() {
    this.stateService.getAll().subscribe(result => {
      this.states = result;
    },
    error => {
      console.error(error);
      this.toastr.showErrorMessage('Unable to fetch the states');
    });
  }

  openCreateSignatory() {
    const modalRef = this.modalService.open(CreateSignatoryComponent,
      { size: 'lg', centered: true, backdrop: 'static' });

    modalRef.componentInstance.branchId = this.branchId;
    modalRef.componentInstance.countries = this.countries;
    modalRef.componentInstance.states = this.states;

    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.getSignatories(this.branchId);
      }
    });
  }

  openEditSignatory(id) {
    const modalRef = this.modalService.open(EditSignatoryComponent,
      { size: 'lg', centered: true, backdrop: 'static' });

    modalRef.componentInstance.signatoryId = id;
    modalRef.componentInstance.countries = this.countries;
    modalRef.componentInstance.states = this.states;

    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.getSignatories(this.branchId);
      }
    });
  }

  deleteSignatory(id: number, name: string) {
    const modalRef = this.modalService.open(ConfirmModalComponent,
      { centered: true, backdrop: 'static' });


    modalRef.componentInstance.confirmationMessage = `Are you sure you want to delete the signatory ${name}?`;

    modalRef.result.then((userResponse) => {
      if (userResponse == true) {
        this.signatoryService.delete(id).subscribe(() => {
          this.toastr.showSuccessMessage('The signatory deleted successfully!');
          this.getSignatories(this.branchId);
        });
      }
    });
  }

  viewBranches() {
    this.router.navigateByUrl('settings/branches/');
  }
}
