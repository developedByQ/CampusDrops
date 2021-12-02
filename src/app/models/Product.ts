export interface Product {
  name: string;
  price: number;
  vendor: string;
  category: string;
  id: string;
  description: string;
  imageURL: any;
  status:string;

}
export interface CountList {
  total: number;
  inProgress: number;
  onRoute: number;
  completed: number;

}


