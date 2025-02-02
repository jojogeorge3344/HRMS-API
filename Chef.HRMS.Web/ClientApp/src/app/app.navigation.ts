export const NavigationItems = [
  {
    title: "Home",
    tags: "application home dashboard",
    icon: "fal fa-home",
    items: [
      {
        title: "Dashboard",
        tags: "home-dashboard",
        routerLink: "/home/dashboard",
      },
      {
        title: "Inbox",
        tags: "home-inbox",
        routerLink: "/home/inbox",
      },
    ],
  },
  {
    title: "Me",
    tags: "Me",
    icon: "ni ni-user",
    items: [
      {
        title: "My Profile",
        tags: "me-myprofile",
        routerLink: "/my-profile",
      },
      {
        title: "My Documents",
        tags: "me-mydocuments",
        routerLink: "/my-documents",
      },
      {
        title: "Leave",
        tags: "me-leave",
        routerLink: "/leave",
      },
      {
        title: "Attendance",
        tags: "me-attendance",
        routerLink: "/attendance",
      },
      {
        title: "Overtime",
        tags: "me-overtime",
        routerLink: "/my-overtime",
      },
      {
        title: "Expense",
        tags: "me-expense",
        routerLink: "/my-expenses",
      },
      {
        title: "Loan",
        tags: "me-loan",
        routerLink: "/my-loan",
      },
      {
        title: "My Assets",
        tags: "settings-expense",
        routerLink: "/my-assets",
      },
    ],
  },
  {
    title: "Team",
    tags: "Team",
    icon: "ni ni-users",
    items: [
      {
        title: "Attendance",
        tags: "Team-attendance",
        routerLink: "/team-attendance",
      },
    ],
  },
  {
    title: "Finance",
    tags: "finance",
    icon: "ni ni-credit-card",
    items: [
      {
        title: "Expense Payout",
        tags: "finance-expensepayout",
        routerLink: "/finance/expense",
      },
    ],
  },
  {
    title: "Settings",
    tags: "settings",
    icon: "fal fa-cog",
    items: [
      {
        title: "Company",
        tags: "settings company general",
        routerLink: "/settings/company/general",
      },
      {
        title: "Branches",
        tags: "settings branch bank signatories",
        routerLink: "/settings/branches",
      },
      {
        title: "Employee Settings",
        tags: "settings-employee",
        routerLink: "/settings/employee",
      },
      {
        title: "Holidays",
        tags: "settings-holiday",
        routerLink: "/settings/holiday",
      },
      {
        title: "Leave",
        tags: "settings-leave",
        routerLink: "/settings/leave",
      },
      {
        title: "Attendance",
        tags: "settings-attendance",
        routerLink: "/settings/attendance",
      },
      {
        title: "Expense",
        tags: "settings-expense",
        routerLink: "/settings/expense",
      },
      {
        title: "Overtime",
        tags: "settings-overtime",
        routerLink: "/settings/overtime",
      },
      {
        title: "Loan",
        tags: "settings-loan",
        routerLink: "/settings/loan",
      },
      {
        title: "Payroll",
        tags: "settings-payroll",
        routerLink: "/settings/payroll",
      },
      {
        title: "User Roles",
        tags: "settings-assignroles",
        routerLink: "/settings/roles",
      },
      {
        title: "WPS",
        tags: "settings-expense",
        routerLink: "/settings/wps",
      },
      {
        title: "Asset",
        tags: "settings-expense",
        routerLink: "/settings/asset",
      },
      {
        title: "Religion",
        tags: "settings-expense",
        routerLink: "/settings/religion",
      },
      {
        title: "Document Type",
        tags: "settings-expense",
        routerLink: "/settings/document-type",
      },
      {
        title: "Bank",
        tags: "settings-expense",
        routerLink: "/settings/bank",
      },
      {
        title: "EOS",
        tags: "settings-expense",
        routerLink: "/settings/eos",
      },
    ],
  },
  {
    title: "Organization",
    tags: "organization",
    icon: "ni ni-loop",
    items: [
      {
        title: "Employee Master",
        tags: "organization-employeedirectory ",
        routerLink: "/employee",
      },
      {
        title: "Employee Leave",
        tags: "employee-leave",
        routerLink: "/employee-leave",
      },
      {
        title: "Employee Loan",
        tags: "me-loan",
        routerLink: "/org-employee-loan",
      },
      {
        title: "Payroll Processing",
        tags: "organization-PayrollProcessing",
        routerLink: "/payroll-processing",
      },
      {
        title: "Employee Wise Asset",
        tags: "settings-expense",
        routerLink: "/asset-employee-wise",
      },
      {
        title: "Employee Leave",
        tags: "me-leave",
        routerLink: "/asset-employee-leave",
      },
      {
        title: "Employee Overtime",
        tags: "me-overtime",
        routerLink: "/asset-employee-overtimewise",
      },
      {
        title: 'ADOC Earnings & Deductions',
        tags: 'settings-expense',
        routerLink: '/adoc-earnings-and-deduction'
      },
      {
        title: 'Employee Payroll Parameter Details',
        tags: 'settings-expense',
        routerLink: '/employee-payroll-parameter-details'
      },
      // {
      //   title: 'Employee Overtime',
      //   tags: 'me-overtime',
      //   routerLink: '/asset-employee-overtimewise'
      // },
      {
        title: 'Employee Revision Management',
        tags: 'settings-expense',
        routerLink: '/employee-revision-management'
      },
      {
        title: 'Generate Accruals',
        tags: 'settings-expense',
        routerLink: '/generate-accruals'
      },
      {
        title: 'Payslip Components',
        tags: 'settings-expense',
        routerLink: '/payslip-components'
      },
      {
        title: 'Employee Encashment',
        tags: 'settings-expense',
        routerLink: '/org-employee-encashment'
      },
    ]
  },
  {
    title: "Reports",
    tags: "report",
    icon: "fal fa-download",
    items: [
      {
        title: "Employee Payslip",
        tags: "report-employeelist",
        routerLink: "/reports/employeepayslip",
      },
      {
        title: "Employee Payroll Report",
        tags: "report-employeelist",
        routerLink: "/reports/employeepayroll",
      },
      {
        title: "Leave Details",
        tags: "report-employeelist",
        routerLink: "/reports/leavedetails",
      },
      {
        title: "Employee Register",
        tags: "report-employeelist",
        routerLink: "/reports/employeeList",
      },
      {
        title: "Salary Report - Basic Component",
        tags: "report-employeebasiccomponentbreakup",
        routerLink: "/reports/basicList",
      },
      {
        title: "Salary Report - Processed ",
        tags: "report-processedsalary",
        routerLink: "/reports/processedsalarylist",
      },
      {
        title: "Attendance Register",
        tags: "report-attendancereport",
        routerLink: "/reports/attendancelist",
      },
      {
        title: "Leave Register",
        tags: "report-leavereport",
        routerLink: "/reports/leavelist",
      },
      {
        title: "Overtime Report",
        tags: "report-employeelist",
        routerLink: "/reports/employeeovertimelist",
      },
    ],
  },
];
