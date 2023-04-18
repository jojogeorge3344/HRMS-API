import { Component, OnInit ,Input} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EosService } from '../eos.service';
import { EosGroup } from '../eos.model';
@Component({
  selector: 'hrms-eos-view',
  templateUrl: './eos-view.component.html',
  styleUrls: ['./eos-view.component.scss']
})
export class EosViewComponent implements OnInit {
  @Input() relDetails: EosGroup;
  EOSAccrualTypeDetails: any;
  employeeEOSAccrualType:string;
  EOSPaymentTypeDetails:any;
  employeeEOSpaymentType:string;
  constructor
  (
    public activeModal: NgbActiveModal,
    private eosService:EosService,
  ) 
  { }

  ngOnInit() {
    this.getEmployeeEOSAccrualTypeDetail()
    this.getEmployeeEOSpaymentTypeDetail()
    
  }
  getEmployeeEOSAccrualTypeDetail(){
    this.eosService.getEmployeeEOSAccrual().subscribe(res=>{
      this.EOSAccrualTypeDetails=res
     for(let i=0;i< this.EOSAccrualTypeDetails.length;i++){
       if(this.EOSAccrualTypeDetails[i].id == this.relDetails.employeeEOSAccrualType){
         this.employeeEOSAccrualType = this.EOSAccrualTypeDetails[i].name
       }
     }
  })

  }
  getEmployeeEOSpaymentTypeDetail(){
    this.eosService.getEmployeeEOSpaymentType().subscribe(res=>{
      this.EOSPaymentTypeDetails=res
      for(let i=0;i< this.EOSPaymentTypeDetails.length;i++){
        if(this.EOSPaymentTypeDetails[i].id == this.relDetails.employeeEOSpaymentType){
          this.employeeEOSpaymentType = this.EOSPaymentTypeDetails[i].name
        }
      }
    })
  }
}
