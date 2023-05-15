import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmployeeLeaveRequest } from './employee-leave-request.model';
import { EmployeeLeaveBalance } from './employee-leave-balance.model';
import { EmployeeLeaveSettingsViewModel } from './employee-leave-settings.model';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeLeaveService {

  public baseUrl: string;
  public http: HttpClient;
  allholiday: BehaviorSubject<any>=new BehaviorSubject(null);

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl + 'api/leave/';
  }
  setListDetails(data: any) {

    this.allholiday.next(data);
    console.log("allthedate",data);
    

  }

  add(leave: EmployeeLeaveRequest) {
    return this.http.post<EmployeeLeaveRequest>(this.baseUrl + 'insert', leave).pipe(map(response => response));
  }

  getAll() {
    return this.http.get<EmployeeLeaveRequest[]>(this.baseUrl + 'getAll').pipe(map(response => response));
  }

  update(leave: EmployeeLeaveRequest) {
    return this.http.post<EmployeeLeaveRequest>(this.baseUrl + 'update', leave).pipe(map(response => response));
  }

  delete(id: number) {
    return this.http.delete<EmployeeLeaveRequest>(this.baseUrl + 'delete/' + id).pipe(map(response => response));
  }

  get(id) {
    return this.http.get<EmployeeLeaveRequest>(this.baseUrl + 'get/' + id).pipe(map(response => response));
  }

  getAllByID(id) {
    return this.http.get<EmployeeLeaveRequest[]>(this.baseUrl + 'getAllLeaveDetailsById/' + id).pipe(map(response => response));
  }

  getAllLeaveBalance(id) {
    return this.http.get<EmployeeLeaveBalance[]>(this.baseUrl + 'getAllLeaveBalanceById/' + id)
      .pipe(
        map(res => res.filter(component => {
          return ((component.restrictedToGender &&
            (component.gender === component.restrictedToGender)) || !component.isRestrictedToGender) &&
            ((component.restrictedToMaritalStatus &&
              (component.maritalStatus === component.restrictedToMaritalStatus)) || !component.isRestrictedToMaritalStatus);
        }))
      );
  }

  getAllLeaveSettings(id) {
    return this.http.get<EmployeeLeaveSettingsViewModel[]>(this.baseUrl + 'GetAllLeaveSettingsById/' + id).pipe(map(response => response));
  }

  addNotifyPersonnel(notifyPersonnel) {
    return this.http.post(this.baseUrl + 'insertNotifyPersonnel/', notifyPersonnel).pipe(map(response => response));
  }
  getApproverById(leaveRequestId) {
    return this.http.get<any[]>(this.baseUrl + 'getapproverbyid/' + leaveRequestId).pipe(map(response => response));
  }
  getAllNotifyPersonnals(leaveRequestId) {
    return this.http.get<any[]>(this.baseUrl + 'GetAllNotifyPersonnelById/' + leaveRequestId).pipe(map(response => response));
  }
  getunapprovedLeaves(userId) {
    return this.http.get<any[]>(this.baseUrl + 'GetAllUnApprovedLeaveById/' + userId).pipe(map(response => response));

  }

  getAllInfoLeave(employeeId) {
    return this.http.get<EmployeeLeaveRequest[]>(this.baseUrl + 'GetAllLeaveInfoByEmployeeId/' + employeeId).pipe(map(response => response));
  }

  getAllNotifyPersonnalsIndividual(leaveRequestId) {
    return this.http.get<any[]>(this.baseUrl + 'GetAllNotifyPersonnelById/' + leaveRequestId).pipe(map(response => response));
  }
  updateNotifyPersonnel(notifyPersonnel) {
    return this.http.post(this.baseUrl + 'UpdateNotifyPersonnel/', notifyPersonnel).pipe(map(response => response));
  }

}
