import { Model } from '@shared/models/model';

export interface Signatory extends Model {
  branchId: number;
  fullName: string;
  fatherName: string;
  designation: string;
  panNumber: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  stateOrProvince: number;
  country: number;
  stateName: string;
  countryName: string;
  pincode: string;
  email: string;
  phone: string;
  fax: string;
}