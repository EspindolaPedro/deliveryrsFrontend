import React from "react";

type CartItem = {
    product_id: number;
    amount: number;
    observation?: number;
};

type CLientInfo = {
    name: string;
    phone: string;
    street: string;
    number: string;
    neighborhood: string;
    complement?:string;    
}

type CartContextType = {
    cartItems: CartItem[];
    clientInfo: CLientInfo | null;
    orderObservation: string;
    paymentMethod: string,
    addItem: (product_id: number, amount: number, observation?: string) => void;
    removeItem: (product_id: number) => void;
    updateItem: (product_id: number, amount: number, observation?: string) => void;
    setClientInfo: (info: CLientInfo) => void;
    setOrderObservation: (obs: string) => void;
    setPaymentMethod: (method: string) => void;
    createOrderPayload: () => object;
}

    const addItem = (product_id, amount, observation) => {

    }
  const removeItem = () => {
        
    }

const CartContext = React.createContext<CartContextType>({} as CartContextType);
    const [cartItems, setCartItems] = React.useState<CartItem[]>([]);
    const [clientInfo, setClientInfo] = React.useState<CLientInfo | null>(null);
    const [orderObservation, setOrderObservation] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');

export const CartProvider = ({children}: {children: React.ReactNode})=>{
    return (
        <CartContext.Provider value={{
            cartItems,
            clientInfo,
            orderObservation,
            paymentMethod
        }}>

        </CartContext.Provider>
    )
}