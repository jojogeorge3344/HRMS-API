import { Model } from '@shared/models/model';

export interface Branch extends Model {
  companyId: number;
  shortName: string;
  timeZoneId: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  stateOrProvince: number;
  stateName: string;
  countryName: string;
  country: number;
  pincode: string;
  email: string;
  phone: string;
  fax: string;
}

