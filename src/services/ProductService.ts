const API_URL = 'https://dummyjson.com';

export interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
    brand: string;
    stock: number;
    thumbnail: string;
    rating: number;
    description: string;
}

export interface Category {
    name: string;
    slug: string;
}

let categoriesCache: Category[] | null = null;
let productsCache: Map<string, Product[]> = new Map();
let searchCache: Map<string, Product[]> = new Map();

const mapDummyJsonProduct = (p: any): Product => ({
    id: p.id,
    name: p.title,
    price: p.price,
    category: p.category,
    brand: p.brand,
    stock: p.stock,
    thumbnail: p.thumbnail,
    rating: p.rating ?? 0,
    description: p.description ?? '',
});

export const getCategories = async (): Promise<Category[]> => {
    if (categoriesCache) return categoriesCache;
    const res = await fetch(`${API_URL}/products/categories`);
    const data = await res.json();
    const categories = data.map((c: any) => ({
        name: c.name,
        slug: c.slug,
    }));
    categoriesCache = categories;
    return categories;
};

export const getProductsByCategory = async (category: string): Promise<Product[]> => {
    if (productsCache.has(category)) return productsCache.get(category)!;
    const res = await fetch(`${API_URL}/products/category/${category}`);
    const data = await res.json();
    const products = data.products.map(mapDummyJsonProduct);
    productsCache.set(category, products);
    return products;
};

export const searchProducts = async (query: string): Promise<Product[]> => {
    if (!query.trim()) return [];
    const key = query.trim().toLowerCase();
    if (searchCache.has(key)) return searchCache.get(key)!;
    const res = await fetch(`${API_URL}/products/search?q=${encodeURIComponent(query)}`);
    const data = await res.json();
    const products = data.products.map(mapDummyJsonProduct);
    searchCache.set(key, products);
    return products;
};

export const getAllProducts = async (): Promise<Product[]> => {
    const res = await fetch(`${API_URL}/products?limit=0`);
    const data = await res.json();
    return data.products.map(mapDummyJsonProduct);
};

export const clearCache = () => {
    categoriesCache = null;
    productsCache.clear();
    searchCache.clear();
};
