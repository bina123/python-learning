function Card({ title, children }) {
    return (
        <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            marginBottom: '1rem'
        }}>
            {title && <h2 style={{ marginBottom: '1rem' }}>{title}</h2>}
            {children}
        </div>
    )
}

export default Card;