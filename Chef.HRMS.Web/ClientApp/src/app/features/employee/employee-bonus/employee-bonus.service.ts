import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmployeeBonus } from './employee-bonus.model';
import { BonusTypes } from './bonus-types.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeBonusService {

  public baseUrl: string;
  public http: HttpClient;
  bonusTypeUrl: string;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.bonusTypeUrl = `${baseUrl}api/settings/payroll/BonusType/`;
    this.baseUrl = `${baseUrl}api/settings/EmployeeBonus/`;
  }

  getAll() {
    return this.http.get<EmployeeBonus[]>(this.baseUrl + 'getAll/').pipe(map(response => { return response; }));
  }

  getBonusTypes() {
    return this.http.get<BonusTypes[]>(this.bonusTypeUrl + 'GetAll').pipe(map(response => { return response; }));
  }

  getBonusByPaygroup( processId: number) {
    return this.http.get<EmployeeBonus[]>(this.baseUrl + 'GetAllBonusByPayGroupId/' + processId).pipe(map(response => { return response; }));
  }

  getBonusByEmployee(id: number) {
    return this.http.get<EmployeeBonus[]>(this.baseUrl + 'GetAllBonusByEmployeeId/' + id).pipe(map(response => { return response; }));
  }
  getBonusByEmployeeId(employeeId: number, processId: number) {
    return this.http.get<EmployeeBonus[]>(this.baseUrl + 'GetAllBonusByEmployeeIdAndPayrollProcessingMethodId/' + employeeId + '/' + processId).pipe(map(response => { return response; }));
  }

  deletebonusOfEmployee(id: number) {
    return this.http.delete(this.baseUrl + 'DeleteAllBonusByEmployeeId/' + id).pipe(map(response => { return response; }));
  }

  add(bonus: EmployeeBonus) {
    return this.http.post(this.baseUrl + 'insert', bonus).pipe(map(response => { return response; }));
  }

  update(bonus: EmployeeBonus) {
    return this.http.put<number>(this.baseUrl + 'update', bonus).pipe(map(response => { return response; }));
  }

  delete(id: number) {
    return this.http.delete(this.baseUrl + 'delete/' + id).pipe(map(response => { return response; }));
  }
}