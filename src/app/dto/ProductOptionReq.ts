export interface ProductOptionReq{
    createdDate: string;
    lastModifiedDate: string;
    createdBy: number;
    lastModifiedBy: number;
    productId: number;
    ram: number;
    storageCapacity: number;
    color: string;
    image: string;
    price: number;
    quantity: number;
    status: boolean;
}