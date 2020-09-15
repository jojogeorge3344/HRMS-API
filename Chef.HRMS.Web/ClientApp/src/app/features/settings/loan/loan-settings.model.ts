import { Model } from '@shared/models/model';

export interface LoanSettings extends Model {
    isEligibleinAfterProbationPeriod:boolean,
    eligibleDaysFromJoining:number;
    isEligibleBasedonAnnualGrossSalary:boolean,
    salaryFromRange:number;
    salaryToRange:number;
    eligibleinNoticePeriod:number;
    standardInterestRate:number;
    interestCalcutationMethod:number;
    maxNumberofInstallments:number;
}  