function Button({ children, onClick, variant = "primary" }) {
    const styles = {
        primary: {
            background: '#3498db',
            color: 'white'
        },
        success: {
            background: '#27ae60',
            color: 'white',
        },
        danger: {
            background: '#e74c3c',
            color: 'white',
        }
    };

    const baseStyle = {
        border: 'none',
        padding: '0.75rem 1.5rem',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '1rem',
        ...styles[variant]
    };

    return <button onClick={onClick} style={baseStyle}>{children}</button>
}

export default Button;