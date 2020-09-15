import { Model } from "@shared/models/model";

export interface TeamAttendanceStats extends Model {
    attendanceType: string;
    count: number;
}
