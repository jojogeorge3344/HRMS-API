import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BranchService } from '../branch.service';
import { StateService } from '../state.service';
import { CountryService } from '../country.service';
import { CreateBranchComponent } from './create/create.component';
import { ConfirmModalComponent } from '@shared/dialogs/confirm-modal/confirm-modal.component';
import { EditBranchComponent } from './edit/edit.component';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html'
})

export class BranchesComponent implements OnInit {

  public branches: any;
  public countries: any;
  public states: any;

  constructor(
    private branchService: BranchService,
    private stateService: StateService,
    private countryService: CountryService,
    private router: Router,
    public modalService: NgbModal,
    private toastr: ToasterDisplayService) {
  }

  ngOnInit(): void {
    this.getBranches();
    this.getCountries();
    this.getStates();
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

  getCountries() {
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

  openCreateBranch() {
    const modalRef = this.modalService.open(CreateBranchComponent,
      { size: 'lg', centered: true, backdrop: 'static' });

    modalRef.componentInstance.companyId = 1;
    modalRef.componentInstance.countries = this.countries;
    modalRef.componentInstance.states = this.states;

    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.getBranches();
      }
    });
  }

  openEditBranch(id) {
    const modalRef = this.modalService.open(EditBranchComponent,
      { size: 'lg', centered: true, backdrop: 'static' });

    modalRef.componentInstance.branchId = id;
    modalRef.componentInstance.countries = this.countries;
    modalRef.componentInstance.states = this.states;

    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.getBranches();
      }
    });
  }

  deleteBranch(id: number, name: string) {
    const modalRef = this.modalService.open(ConfirmModalComponent,
      { centered: true, backdrop: 'static' });


    modalRef.componentInstance.confirmationMessage = `Are you sure you want to delete the branch ${name}?`;

    modalRef.result.then((userResponse) => {
      if (userResponse == true) {
        this.branchService.delete(id).subscribe(() => {
          this.toastr.showSuccessMessage('The branch deleted successfully!');
          this.getBranches();
        });
      }
    });
  }

  openBanks(id: number) {
    this.router.navigateByUrl('settings/branches/banks/' + id);
  }

  openSignatories(id: number) {
    this.router.navigateByUrl('settings/branches/signatories/' + id);
  }
}
