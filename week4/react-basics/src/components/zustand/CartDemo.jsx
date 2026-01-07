// src/components/zustand/CartDemo.jsx

import useCartStore from '../../stores/cartStore';

const PRODUCTS = [
    { id: 1, name: 'React Course', price: 99.99, image: '📚' },
    { id: 2, name: 'Django Course', price: 89.99, image: '🐍' },
    { id: 3, name: 'JavaScript Book', price: 49.99, image: '💛' },
    { id: 4, name: 'Python Book', price: 59.99, image: '📖' },
    { id: 5, name: 'TypeScript Guide', price: 79.99, image: '💙' },
];

const DISCOUNTS = {
    'SAVE10': 10,
    'SAVE20': 20,
    'HALF': 50,
};

function CartDemo() {
    const items = useCartStore((state) => state.items);
    const addItem = useCartStore((state) => state.addItem);
    const removeItem = useCartStore((state) => state.removeItem);
    const updateQuantity = useCartStore((state) => state.updateQuantity);
    const clearCart = useCartStore((state) => state.clearCart);
    const applyDiscount = useCartStore((state) => state.applyDiscount);
    const removeDiscount = useCartStore((state) => state.removeDiscount);
    const discountCode = useCartStore((state) => state.discountCode);

    const subtotal = useCartStore((state) => state.getSubtotal());
    const discount = useCartStore((state) => state.getDiscount());
    const tax = useCartStore((state) => state.getTax());
    const total = useCartStore((state) => state.getTotal());
    const itemCount = useCartStore((state) => state.getItemCount());

    const handleApplyDiscount = (code) => {
        const percent = DISCOUNTS[code.toUpperCase()];
        if (percent) {
            applyDiscount(code.toUpperCase(), percent);
            alert(`✅ ${percent}% discount applied!`);
        } else {
            alert('❌ Invalid discount code');
        }
    };

    return (
        <div style={{ maxWidth: '1200px', margin: '2rem auto' }}>
            <h1>Shopping Cart with Zustand</h1>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                {/* Products */}
                <div>
                    <h2>Products</h2>
                    <div style={{ display: 'grid', gap: '1rem' }}>
                        {PRODUCTS.map((product) => (
                            <div
                                key={product.id}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '1.5rem',
                                    background: 'white',
                                    borderRadius: '8px',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                }}
                            >
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    <div style={{ fontSize: '2.5rem' }}>{product.image}</div>
                                    <div>
                                        <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                                            {product.name}
                                        </div>
                                        <div style={{ color: '#27ae60', fontSize: '1.3rem', marginTop: '0.25rem' }}>
                                            ${product.price.toFixed(2)}
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => addItem(product)}
                                    style={{
                                        padding: '0.75rem 1.5rem',
                                        background: '#3498db',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Cart */}
                <div>
                    <div
                        style={{
                            background: 'white',
                            padding: '1.5rem',
                            borderRadius: '8px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                            position: 'sticky',
                            top: '2rem',
                        }}
                    >
                        <h2>Cart ({itemCount})</h2>

                        {items.length === 0 ? (
                            <p style={{ textAlign: 'center', padding: '2rem', color: '#7f8c8d' }}>
                                Cart is empty
                            </p>
                        ) : (
                            <>
                                {/* Cart Items */}
                                <div style={{ marginBottom: '1.5rem' }}>
                                    {items.map((item) => (
                                        <div
                                            key={item.id}
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                padding: '0.75rem 0',
                                                borderBottom: '1px solid #ecf0f1',
                                            }}
                                        >
                                            <div style={{ flex: 1 }}>
                                                <div style={{ fontSize: '0.9rem' }}>{item.name}</div>
                                                <div style={{ fontSize: '0.85rem', color: '#7f8c8d' }}>
                                                    ${item.price.toFixed(2)} each
                                                </div>
                                            </div>
                                            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    style={{
                                                        width: '24px',
                                                        height: '24px',
                                                        background: '#ecf0f1',
                                                        border: 'none',
                                                        borderRadius: '4px',
                                                        cursor: 'pointer',
                                                    }}
                                                >
                                                    -
                                                </button>
                                                <span style={{ minWidth: '30px', textAlign: 'center' }}>
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    style={{
                                                        width: '24px',
                                                        height: '24px',
                                                        background: '#ecf0f1',
                                                        border: 'none',
                                                        borderRadius: '4px',
                                                        cursor: 'pointer',
                                                    }}
                                                >
                                                    +
                                                </button>
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    style={{
                                                        marginLeft: '0.5rem',
                                                        padding: '0.25rem 0.5rem',
                                                        background: '#e74c3c',
                                                        color: 'white',
                                                        border: 'none',
                                                        borderRadius: '4px',
                                                        cursor: 'pointer',
                                                        fontSize: '0.85rem',
                                                    }}
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Discount Code */}
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <input
                                        type="text"
                                        placeholder="Discount code"
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter') {
                                                handleApplyDiscount(e.target.value);
                                                e.target.value = '';
                                            }
                                        }}
                                        style={{
                                            width: '100%',
                                            padding: '0.5rem',
                                            border: '1px solid #ddd',
                                            borderRadius: '4px',
                                            marginBottom: '0.5rem',
                                        }}
                                    />
                                    <div style={{ fontSize: '0.85rem', color: '#7f8c8d' }}>
                                        Try: SAVE10, SAVE20, HALF
                                    </div>
                                    {discountCode && (
                                        <div
                                            style={{
                                                marginTop: '0.5rem',
                                                padding: '0.5rem',
                                                background: '#d4edda',
                                                color: '#155724',
                                                borderRadius: '4px',
                                                fontSize: '0.9rem',
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <span>✓ {discountCode} applied</span>
                                            <button
                                                onClick={removeDiscount}
                                                style={{
                                                    background: 'transparent',
                                                    border: 'none',
                                                    color: '#155724',
                                                    cursor: 'pointer',
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* Summary */}
                                <div style={{ borderTop: '2px solid #ecf0f1', paddingTop: '1rem' }}>
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            marginBottom: '0.5rem',
                                        }}
                                    >
                                        <span>Subtotal:</span>
                                        <span>${subtotal.toFixed(2)}</span>
                                    </div>
                                    {discount > 0 && (
                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                marginBottom: '0.5rem',
                                                color: '#27ae60',
                                            }}
                                        >
                                            <span>Discount:</span>
                                            <span>-${discount.toFixed(2)}</span>
                                        </div>
                                    )}
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            marginBottom: '0.5rem',
                                        }}
                                    >
                                        <span>Tax (10%):</span>
                                        <span>${tax.toFixed(2)}</span>
                                    </div>
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            paddingTop: '0.5rem',
                                            borderTop: '1px solid #ecf0f1',
                                            fontSize: '1.2rem',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        <span>Total:</span>
                                        <span>${total.toFixed(2)}</span>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <button
                                        onClick={clearCart}
                                        style={{
                                            padding: '0.75rem',
                                            background: '#e74c3c',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        Clear Cart
                                    </button>
                                    <button
                                        style={{
                                            padding: '1rem',
                                            background: '#27ae60',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                            fontWeight: 'bold',
                                            fontSize: '1rem',
                                        }}
                                    >
                                        Checkout
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartDemo;