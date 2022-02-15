import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '@features/employee/employee.service';
import { Employee } from '@features/employee/employee.model';
import { Observable, forkJoin } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { RolesService } from '../roles.service';
import { UserRolesService } from '../user-roles.service';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-roles-assigning',
  templateUrl: './roles-assigning.component.html'
})
export class RolesAssigningComponent implements OnInit {

  roles = [
  ];
  selectedRole: string = null;
  employees: Employee[];
  employeesOnSelection: Employee[];
  constructor(
    private employeeService: EmployeeService,
    private rolesService: RolesService,
    private userRolesService: UserRolesService,
    private toasterDisplayService: ToasterDisplayService
  ) { }

  ngOnInit(): void {
    forkJoin([this.employeeService.getAll(), this.rolesService.getall(), this.userRolesService.getall()])
      .subscribe((response: any) => {
        this.employees = this.employeesOnSelection = response[0];
        this.roles = response[1].map(role => {
          const employeeWithRole = response[2].filter(userRole => userRole.roleId === role.id);
          const employeesAdded = employeeWithRole.map(userRole => {
            const employee = response[0].find(emp => emp.id === userRole.employeeId);
            return {
              ...employee,
              userRoleId: userRole.id
            };
          });
          return {
            ...role,
            employeesAdded,
          };
        });
        const allAssignedEmployees = this.roles.reduce((empArray, role) => [...empArray, ...role.employeesAdded], []);
        // this.employeesOnSelection = this.employees.filter(employee =>
        //   (allAssignedEmployees.find(emp => emp.id === employee.id) === undefined)
        // );
      });

  }

  formatter = (employee) => employee.fullName;

  search = (text$: Observable<string>) => text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    filter(term => term.length >= 1),
    map(term => this.employeesOnSelection.filter(employee => new RegExp(term, 'mi').test(employee.fullName)).slice(0, 10))
  )

  selected($event, input, selectrole) {
    $event.preventDefault();
    this.userRolesService.insert({ employeeId: $event.item.id, roleId: selectrole.id }).subscribe((res: any) => {
      if (res) {
        this.roles.map(role => {
          if (role.id === selectrole.id) {
            role.employeesAdded.push({ ...$event.item, userRoleId: res.id });
            return role;
          }
        });
        this.employeesOnSelection = this.employeesOnSelection.filter(employee => employee.id !== $event.item.id);
        input.value = '';
        this.toasterDisplayService.showSuccessMessage('User roles updated successfully');
      }
    });
  }
  showInput(currentRole) {
    this.selectedRole = currentRole;
  }
  roleChanged(event, droppedOnRole) {
    this.userRolesService.update({ id: event.dragData.userRoleId, employeeId: event.dragData.id, roleId: droppedOnRole.id })
      .subscribe(res => {
        if (res) {
          this.roles.map(role => {
            role.employeesAdded = role.employeesAdded.filter(employee => employee.id !== event.dragData.id);
            if (role.id === droppedOnRole.id) {
              role.employeesAdded.push(event.dragData);
            }
            return role;
          });
          this.toasterDisplayService.showSuccessMessage('User role updated successfully');
        }
      });

  }
}
