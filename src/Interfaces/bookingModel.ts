import rentItemModel from "./rentItemModel";

export default interface bookingModel {
    id?: number;
    userId?: string;
    rentItems?: rentItemModel[];
    stripePaymentIntentId?: any;
    clientSecret?: any;
    total?: number;
}