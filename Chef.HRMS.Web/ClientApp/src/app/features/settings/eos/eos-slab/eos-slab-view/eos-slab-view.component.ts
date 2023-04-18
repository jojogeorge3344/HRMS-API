import { Component, OnInit,Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EosSlabService } from '../eos-slab.service';
import { EosSlabGroup } from '../eos-slab.model';
import { EosService } from '@settings/eos/eos.service';
@Component({
  selector: 'hrms-eos-slab-view',
  templateUrl: './eos-slab-view.component.html',
  styleUrls: ['./eos-slab-view.component.scss']
})
export class EosSlabViewComponent implements OnInit {
  @Input() relDetails: EosSlabGroup;

  constructor
  (
    public activeModal: NgbActiveModal,
    private eosService:EosService,
  ) 
  { }

  ngOnInit() {

    console.log('data',this.relDetails)
  }

}
