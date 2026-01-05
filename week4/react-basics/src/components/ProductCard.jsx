import Alert from "./Alert";
import { useState } from "react";

function ProductCard({
    name,
    price,
    image,
    inStock = true,
    onBuy
}) {

    const [alerts, setAlerts] = useState([
        { id: 1, type: 'success', message: 'Login successful!' },
        { id: 2, type: 'info', message: 'You have 3 new messages' },
        { id: 3, type: 'warning', message: 'Your session will expire soon' }
    ]);

    const removeAlert = (id) => {
        setAlerts(alerts.filter(alert => alert.id !== id));
    }
    return (
        <>
            <div className="container">
                <h1>Alerts Demo</h1>

                {alerts.map(alert => (
                    <Alert
                        key={alert.id}
                        {...alert}  // Spread operator: passes all properties as props
                        onClose={() => removeAlert(alert.id)}
                    />
                ))}
            </div>
            <div style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '1rem',
                marginBottom: '1rem'
            }}>
                <img src={image} alt={name} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '4px' }} />

                <h3 style={{ margin: ' 1rem 0 0.5rem' }}>{name}</h3>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '1rem'
                }}>
                    <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#27ae60' }}>
                        ${price}
                    </span>
                    {
                        inStock ? (
                            <button onClick={() => onBuy(name, price)}
                                style={{
                                    background: '#3498db',
                                    color: 'white',
                                    border: 'none',
                                    padding: '0.5rem 1rem',
                                    borderRadius: '4px',
                                    cursor: 'pointer'
                                }}>
                                Buy Now
                            </button>
                        ) : (
                            <span style={{ color: '#e74c3c' }}>Out of Stock</span>
                        )
                    }
                </div>
            </div>
        </>
    );
}

export default ProductCard;