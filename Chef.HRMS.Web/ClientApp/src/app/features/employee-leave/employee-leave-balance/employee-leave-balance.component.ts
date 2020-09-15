import { Component, OnInit, ElementRef, ViewChildren, QueryList, Input, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { getCurrentUserId } from '@shared/utils/utils.functions';

@Component({
  selector: 'hrms-employee-leave-balance',
  templateUrl: './employee-leave-balance.component.html'
})
export class EmployeeLeaveBalanceComponent implements OnInit, AfterViewInit {

  @Input() item: any;
  chart: any;
  charts;
  currentUserId: number;
  leaveBalance: any;
  colors = [
    ['rgb(220, 146, 232)', 'rgb(215, 215, 215)'],
    ['rgb(56, 247, 241)', 'rgb(215, 215, 215)'],
    ['rgb(244, 124, 44)', 'rgb(215, 215, 215)'],

    ['rgb(198, 85, 119)', 'rgb(215, 215, 215)'],
    ['rgb(242, 242, 82)', 'rgb(215, 215, 215)'],
    ['rgb(172, 232, 129)', 'rgb(215, 215, 215)']

  ];

  @ViewChildren('chartValue') canvasRef: QueryList<any>;

  constructor(
    public modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.currentUserId = getCurrentUserId();
    // this.getLeaveBalance();
  }

  ngAfterViewInit() {
    this.canvasRef.changes.subscribe((comps: QueryList<any>) => {
      comps.forEach((element: ElementRef) => {
        const chartElement = element.nativeElement.children[0];
        const leaveComponent = this.getLeaveComponent(element.nativeElement.children[0].id);
        this.drawLeaveBalanceChart(chartElement, leaveComponent);
        // this.labelBalanceChartPlugin(chartElement, leaveComponent);
      });
    });
  }

  getLeaveComponent(leaveComponentId) {
    return this.item.filter((leaveComponent) => leaveComponent.leaveComponentId == leaveComponentId)[0];
  }

  labelBalanceChartPlugin(element, leaveComponent) {
    Chart.pluginService.register({
      beforeDraw(chart) {
        let width = chart.chart.width,
          height = chart.chart.height,
          ctx = chart.chart.ctx;

        ctx.restore();
        let fontSize = (height / 114).toFixed(2);
        ctx.font = fontSize + 'em sans-serif';
        ctx.textBaseline = 'middle';

        let text = `${leaveComponent.annualLeaveQuota - leaveComponent.leaveBalance} Days`,
          textX = Math.round((width - ctx.measureText(text).width) / 2),
          textY = height / 2;

        ctx.fillText(text, textX, textY);
        ctx.save();
      }
    });
  }

  drawLeaveBalanceChart(element, leaveComponent) {
    this.chart = new Chart(element, {
      type: 'doughnut',
      data: {
        labels: ['Available', 'Consumed'],
        datasets: [
          {
            data: [leaveComponent.leaveBalance, leaveComponent.annualLeaveQuota - leaveComponent.leaveBalance],
            backgroundColor: this.colors[leaveComponent.leaveComponentId % 5],
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
        cutoutPercentage: 85,
      }
    });
  }

}
