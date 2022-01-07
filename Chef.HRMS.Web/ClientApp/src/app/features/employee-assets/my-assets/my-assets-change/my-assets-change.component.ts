import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '@shared/dialogs/confirm-modal/confirm-modal.component';
import { MyAssets } from '../my-assets.model';
import { MyAssetsViewComponent } from '../my-assets-view/my-assets-view.component';
import { MyAssetsReturnComponent } from '../my-assets-return/my-assets-return.component';
import { MyAssetsService } from '../my-assets.service';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { getCurrentUserId } from '@shared/utils/utils.functions';

@Component({
  selector: 'hrms-my-assets-change',
  templateUrl: './my-assets-change.component.html'
})
export class MyAssetsChangeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
