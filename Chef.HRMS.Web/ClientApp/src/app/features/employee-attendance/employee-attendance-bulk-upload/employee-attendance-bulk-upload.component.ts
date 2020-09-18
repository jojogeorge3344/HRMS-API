import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';  
import { NgbModal, NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-employee-attendance-bulk-upload',
  templateUrl: './employee-attendance-bulk-upload.component.html',
  styleUrls: ['./employee-attendance-bulk-upload.component.scss'],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]

})
export class EmployeeAttendanceBulkUploadComponent implements OnInit {
  title = 'XLXSRead';
  file:File;
  arrayBuffer:any;
  filelist:any;
  fileName = '';
  fromDateFilter = null;
  toDateFilter = null;
  attendanceFilter= null;
  fromDate: string;
  toDate: string;
  minDateFrom;
  maxDateFrom;
  minDateTo;
  maxDateTo;
  userAttendance: any[]=[];

  ngOnInit(): void {
  }
  constructor(
    private toastr: ToasterDisplayService,
  ) {
  }

  addfile(event)     
  {   
    console.log("filter",this.attendanceFilter, this.fromDateFilter, this.toDateFilter)
  // if(this.attendanceFilter != null && this.fromDateFilter != null  && this.toDateFilter != null ){
    this.file= event.target.files[0]; 
    this.fileName =this.file.name;
    let fileReader = new FileReader();    
    fileReader.readAsArrayBuffer(this.file);     
    fileReader.onload = (e) => {    
        this.arrayBuffer = fileReader.result;    
        var data = new Uint8Array(this.arrayBuffer);    
        var arr = new Array();    
        for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);    
        var bstr = arr.join("");    
        var workbook = XLSX.read(bstr, {type:"binary"});    
        var first_sheet_name = workbook.SheetNames[0];    
        var worksheet = workbook.Sheets[first_sheet_name];    
        console.log(XLSX.utils.sheet_to_json(worksheet,{raw:true}));    
          const attendanceData = XLSX.utils.sheet_to_json(worksheet,{raw:true}).map((attendance:any) =>{
            return {
              ...attendance,
            isApproved: 1
          }
          });   
          if(this.filterLog(attendanceData).length !== attendanceData.length){
            this.toastr.showErrorMessage('Check Filter and Uploaded Data is Matching or Not');
          }
          else{
            this.userAttendance = this.filterLog(attendanceData)
          }
          console.log("userAttendance",this.userAttendance)
          this.filelist = [];          
    }    
  
  //   else{
  //   console.log('error')
  //   // this.toastr.showErrorMessage('Select Bulk Upload Filters');
  //   return;
  // } 
} 

getDate(date) {
  const d = new Date(date);
  return {
    year: d.getFullYear(),
    month: d.getMonth() + 1,
    day: d.getDate()
  };
}

filterLog(attendanceData) {
  let fromDate: NgbDate;
  let toDate: NgbDate;
  if (!this.attendanceFilter && !this.fromDateFilter && !this.toDateFilter) {
    return attendanceData;
  }
  if (this.fromDateFilter && typeof this.fromDateFilter === 'object') {
    fromDate = new NgbDate(this.fromDateFilter.getFullYear(), this.fromDateFilter.getMonth() + 1, this.fromDateFilter.getDate());
  }
  if (this.toDateFilter && typeof this.toDateFilter === 'object') {
    toDate = new NgbDate(this.toDateFilter.getFullYear(), this.toDateFilter.getMonth() + 1, this.toDateFilter.getDate());
  }

  return attendanceData.filter(element => {
    return (
      (!this.attendanceFilter || this.attendanceFilter == 'null' || element.attendanceType == this.attendanceFilter)
      &&
      (!this.fromDateFilter || typeof this.fromDateFilter !== 'object' ||
        fromDate.before(this.getDate(element.Date)) || fromDate.equals(this.getDate(element.Date)))
      &&
      (!this.toDateFilter || typeof this.toDateFilter !== 'object' ||
        toDate.after(this.getDate(element.Date)) || toDate.equals(this.getDate(element.Date)))
    );
  });
}

}
