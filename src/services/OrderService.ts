const API_URL = 'https://dummyjson.com/carts';

export interface CartProduct {
    id: number;
    title: string;
    price: number;
    quantity: number;
    total: number;
    discountPercentage: number;
    discountedTotal: number;
    thumbnail: string;
}

export interface CreateOrderResponse {
    id: number;
    products: CartProduct[];
    total: number;
    discountedTotal: number;
    userId: number;
    totalProducts: number;
    totalQuantity: number;
}

export interface OrderItem {
    id: number;
    quantity: number;
}

export const createOrder = async (userId: number, products: OrderItem[]): Promise<CreateOrderResponse> => {
    const res = await fetch(`${API_URL}/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            userId,
            products,
        }),
    });

    if (!res.ok) {
        throw new Error('Error al procesar el pedido');
    }

    return await res.json();
};

export const getUserCarts = async (userId: number) => {
    const res = await fetch(`${API_URL}/user/${userId}`);
    if (!res.ok) {
        throw new Error('Error al obtener pedidos');
    }
    return await res.json();
};
