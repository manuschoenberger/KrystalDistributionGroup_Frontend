import {PurchaseOrderLine} from "./PurchaseOrderLine.ts";
import {Party} from "./Party.ts";

export type PurchaseOrder = {
    poNumber: string;
    referenceUUID: { uuid: string };
    customerParty: Party;
    sellerParty: Party;
    vesselNumber: string;
    purchaseOrderLines: PurchaseOrderLine[];
    arrived: boolean;
    totalAmount: number;
}