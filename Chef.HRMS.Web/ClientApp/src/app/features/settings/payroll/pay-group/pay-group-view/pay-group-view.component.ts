import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PayGroupService } from '../pay-group.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Months } from './../../../../../models/common/types/months';
import { PayGroup } from '../pay-group.model';
import { PayrollCalendar } from '../../payroll-calendar/payroll-calendar.model';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';


@Component({
  selector: 'hrms-pay-group-view',
  templateUrl: './pay-group-view.component.html',
  styleUrls: ['./pay-group-view.component.scss']
})
export class PayGroupViewComponent implements OnInit {
  editForm: FormGroup;
  currentUserId: number;
  calender:any;
  currency:any;
  currencies:any;;

  @Input() calenders: PayrollCalendar[];
  @Input() payGroup: PayGroup;
  @Input() isReadOnly: boolean;
  @Input() isDisabled: boolean;
  @Input() payGroupNames: string[];
  @Input() payGroupCodes: string[];


  weeks = [...Array(52).keys()].map(n => n + 1);
  years: number[];
  months = Months;
  monthKeys: number[];
  isStartingMonth = false;
  constructor(
    private payGroupService: PayGroupService,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService) {
    const d = new Date();
    this.years = [...Array(11).keys()].map(n => n + d.getFullYear());
    this.monthKeys = Object.keys(this.months).filter(Number).map(Number);

  }

  ngOnInit(): void {
    this.currentUserId = getCurrentUserId();
    this.calenders=this.calenders.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
    if (this.calenders.find(calender => this.payGroup.payrollCalendarId == calender.id) && this.calenders.find(calender => this.payGroup.payrollCalendarId == calender.id).periodType == 1) {
      this.isStartingMonth = false;
    } else {
      this.isStartingMonth = true;
    }
    debugger
    this.calender=this.calenders.filter(item=>item.id==this.payGroup.payrollCalendarId)

    this.payGroupService.getCurrencies()
    .subscribe((result)=>{
      this.currencies=result;
      this.currency=this.currencies.filter(item=>item.id==this.payGroup.currencyId)
    })


  }



}
