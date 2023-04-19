import { Component, OnInit ,Input} from '@angular/core';
import { OverTimeSlabGroup } from '../overtime-slab-model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'hrms-overtime-slab-view',
  templateUrl: './overtime-slab-view.component.html',
  styleUrls: ['./overtime-slab-view.component.scss']
})
export class OvertimeSlabViewComponent implements OnInit {

  @Input() relDetails: OverTimeSlabGroup;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    debugger
    console.log(this.relDetails)
    if(this.relDetails.valueType=="1"){
      this.relDetails.valueType='Number/%'
    }else{
      this.relDetails.valueType='Number'
    }
  }


}




