function Alert({ type = "info", message, onClose }) {
    const styles = {
        info: { background: '#d1ecf1', color: '#0c5460', border: '#bee5eb' },
        success: { background: '#d4edda', color: '#155724', border: '#c3e6cb' },
        warning: { background: '#fff3cd', color: '#856404', border: '#ffeaa7' },
        danger: { background: '#f8d7da', color: '#721c24', border: '#f5c6cb' }
    };

    const style = styles[type];

    return (
        <div style={{
            padding: '1rem',
            borderRadius: '4px',
            marginBottom: '1rem',
            border: `1px solid ${style.border}`,
            background: style.background,
            color: style.color,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            <span>{message}</span>
            {
                onClose && (
                    <button onClick={onClose} style={{
                        background: 'transparent',
                        border: 'none',
                        fontSize: '1.2rem',
                        cursor: 'pointer',
                        color: style.color
                    }}>×</button>
                )
            }
        </div>
    );
}

export default Alert;