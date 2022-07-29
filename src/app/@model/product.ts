import { Breed } from "./breed";
import { Category } from "./category";
import { Origin } from "./origin";

export class Product {
    id: number;
    name: string;
    age: number;
    amount: number;
    origins: Origin[];
    description: string;
    images: string[];
    price: number;
    gender: boolean;
    status: boolean;
    breed: Breed;
    category: Category;
}