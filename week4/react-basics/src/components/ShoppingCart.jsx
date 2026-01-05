import { useReducer } from "react";

const ACTIONS = {
    ADD_ITEM: 'ADD_ITEM',
    REMOVE_ITEM: 'REMOVE_ITEM',
    UPDATE_QUANTITY: 'UPDATE_QUANTITY',
    APPLY_DISCOUNT: 'APPLY_DISCOUNT',
    CLEAR_CART: 'CLEAR_CART'
}

function cartReducer(state, action) {
    switch (action.type) {
        case ACTIONS.ADD_ITEM: {
            const existingItem = state.items.find(
                item => item.id === action.payload.id
            );

            if (existingItem) {
                return {
                    ...state,
                    items: state.items.map(item =>
                        item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
                    )
                };
            } else {
                return {
                    ...state,
                    items: [...state.items, { ...action.payload, quantity: 1 }]
                };
            }
        }

        case ACTIONS.REMOVE_ITEM:
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload)
            };

        case ACTIONS.UPDATE_QUANTITY:
            return {
                ...state,
                items: state.items.map(item =>
                    item.id === action.payload.id ?
                        { ...item, quantity: Math.max(0, action.payload.quantity) } : item
                ).filter(item => item.quantity > 0)
            };

        case ACTIONS.APPLY_DISCOUNT:
            return {
                ...state,
                discountCode: action.payload.code,
                discountPercent: action.payload.percent
            };

        case ACTIONS.CLEAR_CART:
            return initialState;

        default:
            return state;
    }
}

const initialState = {
    items: [],
    discountCode: null,
    discountPercent: 0
};

const PRODUCTS = [
    { id: 1, name: 'React Course', price: 99.99, image: '📚' },
    { id: 2, name: 'Django Course', price: 89.99, image: '🐍' },
    { id: 3, name: 'Python Book', price: 49.99, image: '📖' },
    { id: 4, name: 'JavaScript Guide', price: 59.99, image: '💛' },
    { id: 5, name: 'TypeScript Pro', price: 79.99, image: '💙' },
];

const DISCOUNTS = {
    'REACT20': 20,
    'SAVE10': 10,
    'FIRST50': 50
}

function ShoppingCart() {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    const subtotal = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
    const discount = subtotal * (state.discountPercent / 100);
    const tax = (subtotal - discount) * 0.1;
    const total = subtotal - discount + tax;

    const addToCart = (product) => {
        dispatch({ type: ACTIONS.ADD_ITEM, payload: product });
    }

    const removeFromCart = (id) => {
        dispatch({ type: ACTIONS.REMOVE_ITEM, payload: id });
    }

    const updateQuantity = (id, quantity) => {
        dispatch({ type: ACTIONS.UPDATE_QUANTITY, payload: { id, quantity } });
    }

    const applyDiscount = (code) => {
        const percent = DISCOUNTS[code.toUpperCase()];
        if (percent) {
            dispatch({
                type: ACTIONS.APPLY_DISCOUNT,
                payload: { code: code.toUpperCase(), percent }
            });
            alert(`✅ ${percent}% discount applied!`);
        } else {
            alert('❌ Invalid discount code');
        }
    }

    const clearCart = () => {
        dispatch({ type: ACTIONS.CLEAR_CART });
    }

    return (
        <div style={{ maxWidth: '1000px', margin: '2rem auto' }}>
            <h1>🛒 Shopping Cart (useReducer Demo)</h1>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                <div>
                    <h2>Products</h2>
                    <div style={{ display: 'grid', gap: '1rem' }}>
                        {PRODUCTS.map(product => (
                            <div key={product.id}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '1rem',
                                    background: 'white',
                                    borderRadius: '8px',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                }}>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    <div style={{ fontSize: '2rem' }}>{product.image}</div>
                                    <div>
                                        <div style={{ fontWeight: 'bold' }}>{product.name}</div>
                                        <div style={{ color: '#27ae60', fontSize: '1.2rem' }}>
                                            ${product.price.toFixed(2)}
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => addToCart(product)}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        background: '#3498db',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/*Cart*/}
                <div>
                    <div
                        style={{
                            background: 'white',
                            padding: '1.5rem',
                            borderRadius: '8px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                            position: 'sticky',
                            top: '2rem'
                        }}
                    >
                        <h2>Cart ({state.items.length})</h2>
                        {state.items.length === 0 ? (
                            <p style={{ color: '#7f8c8d', textAlign: 'center', padding: '2rem' }}>Cart is Empty</p>
                        ) : (
                            <>
                                <div style={{ marginBottom: '1rem' }}>
                                    {state.items.map((item) => (
                                        <div key={item.id}
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                padding: '0.75rem 0',
                                                borderBottom: '1px solid #ecf0f1'
                                            }}>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ fontSize: '0.9rem', color: '#7f8c8d' }}>{item.name}</div>
                                                <div style={{ fontSize: '0.85rem', color: '#7f8c8d' }}>
                                                    ${item.price.toFixed(2)} each
                                                </div>
                                            </div>
                                            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    style={{

                                                        background: '#ecf0f1',
                                                        border: 'none',
                                                        borderRadius: '4px',
                                                        cursor: 'pointer',
                                                        color: '#7f8c8d'
                                                    }}
                                                >
                                                    -
                                                </button>
                                                <span style={{ minWidth: '30px', textAlign: 'center', color: '#7f8c8d' }}>
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    style={{

                                                        background: '#ecf0f1',
                                                        border: 'none',
                                                        borderRadius: '4px',
                                                        cursor: 'pointer',
                                                        color: '#7f8c8d'
                                                    }}
                                                >
                                                    +
                                                </button>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    style={{
                                                        marginLeft: '0.5rem',
                                                        padding: '0.25rem 0.5rem',
                                                        background: '#e74c3c',
                                                        color: 'white',
                                                        border: 'none',
                                                        borderRadius: '4px',
                                                        cursor: 'pointer',
                                                        fontSize: '0.85rem'
                                                    }}
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {/* Discount Code */}
                                <div style={{ marginBottom: '1rem' }}>
                                    <input
                                        type="text"
                                        placeholder="Discount code"
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter') {
                                                applyDiscount(e.target.value);
                                                e.target.value = '';
                                            }
                                        }}
                                        style={{
                                            width: '100%',
                                            padding: '0.5rem',
                                            border: '1px solid #ddd',
                                            borderRadius: '4px',
                                            marginBottom: '0.5rem'
                                        }}
                                    />
                                    <div style={{ fontSize: '0.85rem', color: '#7f8c8d' }}>
                                        Try: REACT20, SAVE10, FIRST50
                                    </div>
                                    {state.discountCode && (
                                        <div style={{
                                            marginTop: '0.5rem',
                                            padding: '0.5rem',
                                            background: '#d4edda',
                                            color: '#155724',
                                            borderRadius: '4px',
                                            fontSize: '0.9rem'
                                        }}>
                                            ✓ {state.discountCode} applied ({state.discountPercent}% off)
                                        </div>
                                    )}
                                </div>

                                {/* Summary */}
                                <div style={{ borderTop: '2px solid #ecf0f1', paddingTop: '1rem', color: '#7f8c8d' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                        <span>Subtotal:</span>
                                        <span style={{ color: '#7f8c8d' }}>${subtotal.toFixed(2)}</span>
                                    </div>
                                    {discount > 0 && (
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: '#27ae60 !important' }}>
                                            <span>Discount ({state.discountPercent}%):</span>
                                            <span>-${discount.toFixed(2)}</span>
                                        </div>
                                    )}
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                        <span>Tax (10%):</span>
                                        <span>${tax.toFixed(2)}</span>
                                    </div>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        paddingTop: '0.5rem',
                                        borderTop: '1px solid #ecf0f1',
                                        fontSize: '1.2rem',
                                        fontWeight: 'bold'
                                    }}>
                                        <span>Total:</span>
                                        <span>${total.toFixed(2)}</span>
                                    </div>
                                </div>

                                {/* Actions */}
                                <button
                                    onClick={clearCart}
                                    style={{
                                        width: '100%',
                                        marginTop: '1rem',
                                        padding: '0.75rem',
                                        background: '#e74c3c',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Clear Cart
                                </button>
                                <button
                                    style={{
                                        width: '100%',
                                        marginTop: '0.5rem',
                                        padding: '0.75rem',
                                        background: '#27ae60',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    Checkout
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShoppingCart;