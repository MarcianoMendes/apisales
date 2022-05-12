export default interface IProduct {
  id: string;
  price: number;
  quantity: number;
}

export default interface IRequest {
  customer_id: string;
  products: IProduct[];
}
