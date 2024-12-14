import {WarehouseActivityData} from "./WarehouseActivityData.ts"
import {RawMaterialData} from "./RawMaterialData.ts";

export type WarehouseActivity = {
  warehouseActivityUUID: string;
  warehouseActivityData: WarehouseActivityData;
  amount: number;
  time: Date;
  amountShipped: number;
  rawMaterialData: RawMaterialData;
};
