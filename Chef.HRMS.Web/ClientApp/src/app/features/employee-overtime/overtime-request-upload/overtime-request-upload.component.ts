import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx'; 
@Component({
  selector: 'hrms-overtime-request-upload',
  templateUrl: './overtime-request-upload.component.html',
  styleUrls: ['./overtime-request-upload.component.scss']
})
export class OvertimeRequestUploadComponent implements OnInit {
  overtimerequests:any=[]
  file:File;
  arrayBuffer:any;
  fileName = '';
  constructor() { }

  ngOnInit(): void {
  }


  addfile(event)     
  { 
      
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
            console.log('this.overtimerequests', this.overtimerequests)       
    }    
  
 
} 
removeFile(){

}

}
