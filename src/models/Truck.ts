import {TruckStatus} from "./TruckStatus.ts";
import {LicensePlate} from "./LicensePlate.ts";

export type Truck = {
  truckUUID: { uuid: string };
  licensePlate: LicensePlate;
  truckStatus: TruckStatus;
};
