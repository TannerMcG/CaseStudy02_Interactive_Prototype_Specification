export type PartCategory =
    | 'CPU'
    | 'GPU'
    | 'Motherboard'
    | 'RAM'
    | 'Storage'
    | 'Power Supply'
    | 'Cooling'

export type SortOption =
    | 'default'
    | 'price-low'
    | 'price-high'
    | 'name'

export interface PartItem {
    id: string;
    name: string;
    category: PartCategory;
    price: number;
    description: string;
    specs: Record<string, string>;
    stock: number;
}

export interface FilterState {
    search: string;
    category: 'All' | PartCategory;
    maxPrice: number | null;
    sort: SortOption;
}

export interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    category: PartCategory;
}

export interface ProfileForm {
    name: string;
    email: string;
    phone: string;
    address: string;
    zip: string;
}

export type ProfileErrors = Partial<Record<keyof ProfileForm, string>>