export interface BasketItem {
    productId: number;
    name: string;
    price: number;
    pictureUrl: string;
    brand: string;
    type: string;
    quantity: number;
}

export interface Basket {
    id: number;
    buyerId: string;
    items: BasketItem[];
    paymentIntentId?: string;
    clientSecret?: string;
}

// create a basket class with a constructor that takes in a basket object
// and assigns the properties of the basket object to the properties of the class
export class Basket implements Basket {
    id: number = 0;
    buyerId: string = '';
    items: BasketItem[] = [];
    paymentIntentId?: string = '';
    clientSecret?: string = '';
}