import { Model } from '@shared/models/model';
import { PaymentMode } from 'src/app/models/common/types/paymentmode';
import { PaymentAccount } from 'src/app/models/common/types/paymentaccount';

export interface ExpensePayout extends Model {
    expenseRequestId: number;
    expenseTypeId: number;
    expenseTypeName: string;
    name: string;
    expenseDate: Date;
    amount: number;
    employeeId: number;
    comment: string;
    paymentMode: PaymentMode;
    paymentAccount: PaymentAccount;
}
