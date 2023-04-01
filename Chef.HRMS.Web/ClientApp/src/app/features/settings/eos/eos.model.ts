import { Model } from '@shared/models/model';

export interface EosGroup extends Model {
      benefitName:string
      retrospectiveAccrual:string
      includeLopDays:string
      includeProbationDays:string
      eosSettlement:string
      includedBenefits:string
}