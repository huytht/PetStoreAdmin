
export class OrderItem {
    price: number;
    imageUrl: string;
    quantity: number;
    productId: string;
    name: string;

    constructor() {
        this.price = 0;
        this.imageUrl = '';
        this.quantity = 0;
        this.productId = '';
        this.name = '';
    }
}