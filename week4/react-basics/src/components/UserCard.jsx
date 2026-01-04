function UserCard({ name, role, avatar, bio }) {
    return (
        <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            marginBottom: '1rem'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: '#3498db',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    color: 'white'
                }}>
                    {avatar}
                </div>
                <div>
                    <h3 style={{ margin: 0 }}>{name}</h3>
                    <p style={{ margin: '0.25rem 0', color: '#7f8c8d' }}>{role}</p>
                </div>
            </div>
            {bio && <p style={{ marginTop: '1rem' }}>{bio}</p>}
        </div>
    )
}

export default UserCard;