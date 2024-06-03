

export interface Cart{

    order_id: string,
    quantity: number,
    discount: number,
    delivery_charges: number,
    refundable_deposit: number,
    productid: string ,
    product_price: number

}

export interface AddCart{
  productid:string,
  userid:string,
  quantity:number,
}
export interface DeleteCart{
  productid:string,
  userid:string,
  quantity:number,
}

