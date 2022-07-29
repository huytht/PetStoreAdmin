import { Address } from "./address";
import { OrderItem } from "./order-item";
import { OrderStatus } from "./order-status";

export class Order {

    id: number;
    orderTrackingNumber: string;
    orderDate: string;
    orderStatus: OrderStatus;
    orderItems: OrderItem[];
    totalPrice: number;
    totalQuantity: number;
    paymentId: number;
    shippingAdress: Address;

    constructor() {
        this.orderTrackingNumber = '';
        this.orderDate = '';
        this.orderStatus = new OrderStatus();
        this.orderItems = [];
        this.totalPrice = 0;
        this.totalQuantity = 0;
        this.paymentId = 0;
        this.shippingAdress = new Address();
    }
}