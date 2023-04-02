import { Model } from '@shared/models/model';

export interface EosGroup extends Model {
      bfCode: string,
      bfName: string,
      retrospectiveAccrual: boolean,
      includeLOPDays: boolean,
      includeProbationDays: boolean,
      includedBenefits: string,
      eosSettlementBFCode: string
}