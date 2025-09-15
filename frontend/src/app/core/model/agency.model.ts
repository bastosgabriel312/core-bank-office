export interface Agency {
  id: number;
  name: string;
  code: string;
  address: string;
  state: string;
  createdAt?: Date;


  posX?: number;
  posY?: number;
}
