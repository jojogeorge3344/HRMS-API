// import { Component, OnInit } from '@angular/core';

// @Component({
//   // selector: 'hrms-document-view-modal',
//   template: '
  
//   ',
//   styleUrls: ['./document-view-modal.component.scss']
// })
// export class DocumentViewModalComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }

import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'hrms-document-view-modal',
  template: `
    <div class="modal-header">
      <!-- <h4 class="modal-title">{{confirmationBoxTitle}}</h4> -->
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">

    <iframe [src] ="url"> </iframe>
      <p class="lead"></p>
    </div>
    <!-- <div class="modal-footer">
      <button type="button" class="btn btn-primary" (click)="activeModal.close(true)">Yes</button>
      <button type="button" class="btn btn-warning" (click)="activeModal.close(false)">No</button>
    </div> -->
`
})

export class DocumentViewModalComponent {
  @Input() confirmationBoxTitle;
  @Input() confirmationMessage;
  @Input() url;
 

  constructor(public activeModal: NgbActiveModal) { }
}