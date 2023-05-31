import { DatePipe } from '@angular/common';
import { Component, OnInit ,ViewChild,ElementRef} from '@angular/core';
import * as XLSX from 'xlsx'; 
import { OvertimeRequestService } from '../overtime-request.service';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
@Component({
  selector: 'hrms-overtime-request-upload',
  templateUrl: './overtime-request-upload.component.html',
  styleUrls: ['./overtime-request-upload.component.scss']
})
export class OvertimeRequestUploadComponent implements OnInit {
  @ViewChild('fileUploader') fileUploader:ElementRef;
  overtimerequests:any=[]
  overtimerequestList:any=[]
  overTimeValidatedData:any=[]
  overTimeSaveData :any=[]
  file:File;
  arrayBuffer:any;
  fileName = '';
  invalidRowCount:number =0
  constructor(
    private datePipe: DatePipe,
    private overtimeRequestService: OvertimeRequestService,
    private toastr: ToasterDisplayService,
  ) {
    
   }

  ngOnInit(): void {
  }


  addfile(event)     
  { 
    this.overtimerequests = [];
    this.overtimerequestList = []
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
          const overtimerequests = XLSX.utils.sheet_to_json(worksheet,{raw:true})
         
            this.overtimerequests = (overtimerequests)   
            for(let i=0;i<this.overtimerequests.length;i++){
              this.overtimerequestList.push({
              fromDate:new Date((this.overtimerequests[i]['From Date']-25569)*86400000),
              toDate:new Date((this.overtimerequests[i]['To Date']-25569)*86400000),
              reason:this.overtimerequests[i].Reason,
              employeeId:0,
              requestStatus:1,
              normalOverTime:this.overtimerequests[i]['Normal OverTime'] ? this.overtimerequests[i]['Normal OverTime'] : 0,
              specialOverTime:this.overtimerequests[i]['Special OverTime'] ? this.overtimerequests[i]['Special OverTime'] : 0,
              holidayOverTime:this.overtimerequests[i]['Holiday OverTime'] ? this.overtimerequests[i]['Holiday OverTime'] : 0,
              employeeName:this.overtimerequests[i]['Employee Name'],
              employeeNumber:this.overtimerequests[i]['Employee Code'],
              isValid:true,
              errorMessage:''
            })
            }  

            this.validateExcelFile()    
    } 
} 
    removeFile(){
   
    this.fileName =''
    this.file =null
    this.overTimeValidatedData =[]
    this.overtimerequests=[]
    this.overTimeSaveData=[]
    this.fileUploader.nativeElement.value = null;
    }


    validateExcelFile (){
      this.invalidRowCount =0
      this.overTimeValidatedData=[]
      this.overtimeRequestService.validateExcelFile(this.overtimerequestList)
      .subscribe(result => {
        this.overTimeValidatedData = result  
        this.overTimeValidatedData.forEach((x) => {
         if(!x.isValid){
           this.invalidRowCount = this.invalidRowCount + 1
         }
        })
        console.log('invalidroe',this.invalidRowCount)
      },
        error => {
          console.error(error);
          this.toastr.showErrorMessage('Unable to Validate Excel File.');
          return
        });

        
    }


    saveExcelReport(){
      for(let i=0;i < this.overTimeValidatedData.length;i++){
         this.overTimeSaveData.push({
          id:0,
          createdDate:new Date(),
          modifiedDate:new Date(),
          createdBy:'',
          modifiedBy:'',
          isArchived:false,
          overTimePolicyId:0,
          fromDate: this.overTimeValidatedData[i].fromDate,
          toDate:this.overTimeValidatedData[i].toDate,
          numberOfHours:0,
          reason:this.overTimeValidatedData[i].reason,
          employeeId:this.overTimeValidatedData[i].employeeId,
          requestStatus:1,
          normalOverTime:this.overTimeValidatedData[i].normalOverTime,
          specialOverTime:this.overTimeValidatedData[i].specialOverTime,
          holidayOverTime:this.overTimeValidatedData[i].holidayOverTime,
          employeeName:this.overTimeValidatedData[i].employeeName,
          employeeNumber:this.overTimeValidatedData[i].employeeNumber
         })
      }
      this.overtimeRequestService.saveExcelReport(this.overTimeSaveData)
      .subscribe(result => {
        this.toastr.showSuccessMessage('Excel Report Saved Successfully.');
      },
        error => {
          console.error(error);
          this.toastr.showErrorMessage('Unable to Validate Excel File.');
          return
        });
      
    }

}
