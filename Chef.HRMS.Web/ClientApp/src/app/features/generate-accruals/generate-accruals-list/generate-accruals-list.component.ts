import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '@shared/dialogs/confirm-modal/confirm-modal.component';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GenerateAccrualsService } from '../generate-accruals.service';
import { ModeOfPayrollProcessType } from '../../../models/common/types/modeofpayrollprocesstype';
@Component({
  selector: 'hrms-generate-accruals-list',
  templateUrl: './generate-accruals-list.component.html',
  styleUrls: ['./generate-accruals-list.component.scss']
})
export class GenerateAccrualsListComponent implements OnInit {
  accrualsList:any=[]
  modeOfPayrollProcessType = ModeOfPayrollProcessType;
  constructor(
    public modalService: NgbModal,
    private generateAccrualsService:GenerateAccrualsService,
    private toastr: ToasterDisplayService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getAccrualsList()
  }

  getAccrualsList() {
    this.accrualsList =[]
    this.generateAccrualsService.getAccrualsList().subscribe(result => {
      this.accrualsList = result;
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch Accruals');
      });
  }
  processSetup(item){
    let id = item.payGroupId
    let IorV = 'I'
    this.router.navigate([ "./" +
    id +'/'+ IorV +
    "/generate/"], { relativeTo: this.route.parent });
  }

  viewAccruals(item){
    let id = item.payGroupId
    let IorV = 'V'
    this.router.navigate([ "./" +
    id + '/' + IorV +
    "/generate/"], { relativeTo: this.route.parent });
  }

}


