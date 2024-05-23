import { DecimalPipe } from "@angular/common";

export interface Cart{

    order_id: string,
    quantity: number,
    discount: number,
    delivery_charges: number,
    refundable_deposit: number,
    productid: string ,
    product_price: number

}
