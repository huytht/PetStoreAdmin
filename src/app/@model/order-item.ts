
export class OrderItem {
    price: number;
    imageUrl: string;
    quantity: number;
    productId: number;
    name: string;

    constructor() {
        this.price = 0;
        this.imageUrl = '';
        this.quantity = 0;
        this.productId = 0;
        this.name = '';
    }
}