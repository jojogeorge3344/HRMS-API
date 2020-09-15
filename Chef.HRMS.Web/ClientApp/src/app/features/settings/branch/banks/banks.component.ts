import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '@shared/dialogs/confirm-modal/confirm-modal.component';
import { CreateBankComponent } from './create/create.component';
import { EditBankComponent } from './edit/edit.component';
import { BranchBankService } from '../bank.service';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';


@Component({
  selector: 'app-banks',
  templateUrl: './banks.component.html'
})
export class BanksComponent implements OnInit {

  public banks: any;
  public branchId: any;

  constructor(
    private bankService: BranchBankService,
    private router: Router,
    private route: ActivatedRoute,
    public modalService: NgbModal,
    private toastr: ToasterDisplayService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.branchId = params['id'];
    });

    this.getBanks(this.branchId);
  }

  getBanks(branchId) {
    this.bankService.getAllByBranch(branchId).subscribe(result => {
      this.banks = result;
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the banks');
      });
  }

  openCreateBank() {
    const modalRef = this.modalService.open(CreateBankComponent,
      { size: 'lg', centered: true, backdrop: 'static' });

    modalRef.componentInstance.branchId = this.branchId;

    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.getBanks(this.branchId);
      }
    });
  }

  openEditBank(id) {
    const modalRef = this.modalService.open(EditBankComponent,
      { size: 'lg', centered: true, backdrop: 'static' });

    modalRef.componentInstance.bankId = id;

    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.getBanks(this.branchId);
      }
    });
  }

  deleteBank(id: number, name: string) {
    const modalRef = this.modalService.open(ConfirmModalComponent,
      { centered: true, backdrop: 'static' });


    modalRef.componentInstance.confirmationMessage = `Are you sure you want to delete the bank ${name}?`;

    modalRef.result.then((userResponse) => {
      if (userResponse == true) {
        this.bankService.delete(id).subscribe(() => {
          this.toastr.showSuccessMessage('The bank deleted successfully!');
          this.getBanks(this.branchId);
        });
      }
    });
  }

  viewBranches() {
    this.router.navigateByUrl('settings/branches/');
  }

}
