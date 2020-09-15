import { Component, OnInit } from '@angular/core';
import { NgbDateAdapter, NgbDateNativeAdapter, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Chart } from 'chart.js';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';
import { EmployeeRegularLoginService } from '../employee-regular-login/employee-regular-login.service';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { EmployeeRegularLogin } from '../employee-regular-login/employee-regular-login.model';

@Component({
  selector: 'hrms-employee-attendance-stats',
  templateUrl: './employee-attendance-stats.component.html'
})
export class EmployeeAttendanceStatsComponent implements OnInit {

  chart: any;
  currentUserId: number;
  attendanceId =1;
  attendanceStats: EmployeeRegularLogin;
  selectWeek
  selectMonth
  statsAverageAttendance: EmployeeRegularLogin;
  statsOnTime: EmployeeRegularLogin;
  constructor(
    public modalService: NgbModal,
    private toastr: ToastrService,
    private employeeRegularLoginService: EmployeeRegularLoginService
  ) { }

  ngOnInit(): void {
    this.currentUserId = getCurrentUserId();
    this.statsFilter(1);
    this.drawLeaveAverageChart();
    // this.labelStatsChartPlugin();
    this.drawLeaveOnTimeChart();
  }

  statsFilter(id) {
    forkJoin(this.employeeRegularLoginService.getAverageAttendanceById(this.currentUserId, id),
      this.employeeRegularLoginService.getAverageOnTimeDetails(this.currentUserId, id))
      .subscribe(([averageAttendance, onTime]) => {
        this.statsAverageAttendance = averageAttendance;
        this.statsOnTime = onTime;
      })
  }

  labelStatsChartPlugin() {
    Chart.pluginService.register({
      beforeDraw: function (chart) {
        var width = chart.chart.width,
          height = chart.chart.height,
          ctx = chart.chart.ctx;

        ctx.restore();
        var fontSize = (height / 114).toFixed(2);
        ctx.font = fontSize + "em sans-serif";
        ctx.textBaseline = "middle";

        var text = `${this.attendanceStats} hrs`,
          textX = Math.round((width - ctx.measureText(text).width) / 2),
          textY = height / 2;

        ctx.fillText(text, textX, textY);
        ctx.save();
      }
    });
  }

  drawLeaveAverageChart() {
    this.chart = new Chart('average', {
      type: 'doughnut',
      data: {
        labels: ['Average', 'total'],
        datasets: [
          {
            data: [this.attendanceStats,],
            backgroundColor: ['rgb(51, 86, 203)', 'rgb(215, 215, 215)'],
            fill: false
          },
        ]
      },
      options: {
        legend: {
          display: false
        },
        tooltips: {
          enabled: true
        },
        cutoutPercentage: 80,
      }
    });
  }

  drawLeaveOnTimeChart() {
    this.chart = new Chart('ontime', {
      type: 'doughnut',
      data: {
        labels: ['Available', 'Consumed'],
        datasets: [
          {
            data: [6, 4],
            backgroundColor: ['rgb(50, 182, 63)', 'rgb(215, 215, 215)'],
            fill: false
          },
        ]
      },
      options: {
        legend: {
          display: false
        },
        tooltips: {
          enabled: true
        },
        cutoutPercentage: 80,
      }
    });
  }

}
