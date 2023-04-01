import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { getCurrentUserId } from "@shared/utils/utils.functions";

@Component({
  templateUrl: "./employee-documents-container.component.html",
  selector: "employee-documents-container",
})
export class EmployeeDocumentsContainerComponent implements OnInit {
  employeeId: number;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const currentUserId = getCurrentUserId();
    this.route.params.subscribe((params: any) => {
      this.employeeId = params.id ? parseInt(params.id, 10) : currentUserId;
    });
  }
}
