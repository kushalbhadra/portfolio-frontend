import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../api/axiosConfig';

function Messages() {
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const res = await API.get('/api/messages');
            setMessages(res.data);
        } catch (err) {
            console.error('Error fetching messages');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        marginBottom: '1.5rem',
        borderBottom: '1px solid #1a1a3e',
        paddingBottom: '1.5rem'
    }}>
        <button
            onClick={() => navigate('/admin/dashboard')}
            style={{
                background: 'transparent',
                color: '#aaa',
                border: '1px solid #333',
                padding: '0.4rem 1rem',
                borderRadius: '20px',
                cursor: 'pointer',
                fontSize: '0.85rem',
                width: 'fit-content',
            }}>
            ← Back to Dashboard
        </button>
        <h1 style={styles.title}>Contact Messages</h1>
        <p style={styles.count}>
            Total: {messages.length} messages
        </p>
    </div>
            {loading ? (
                <p style={{color:'#aaa'}}>Loading...</p>
            ) : messages.length === 0 ? (
                <p style={{color:'#aaa'}}>No messages yet.</p>
            ) : (
                <div style={styles.list}>
                    {messages.map((msg) => (
                        <div key={msg.id} style={styles.card}>
                            <div style={styles.header}>
                                <h3 style={styles.name}>{msg.name}</h3>
                                <span style={styles.date}>
                                    {new Date(msg.createdAt)
                                        .toLocaleDateString()}
                                </span>
                            </div>
                            <p style={styles.email}>{msg.email}</p>
                            <p style={styles.msgText}>{msg.message}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

const styles = {
    container: {
        padding: '2rem',
        backgroundColor: '#0f3460',
        minHeight: '90vh',
        color: 'white',
    },
    title: { fontSize: '2rem', color: '#e94560', marginBottom: '0.5rem' },
    count: { color: '#aaa', marginBottom: '1.5rem' },
    list: { display: 'flex', flexDirection: 'column', gap: '1rem' },
    card: {
        backgroundColor: '#1a1a2e',
        padding: '1.5rem',
        borderRadius: '10px',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '0.5rem',
    },
    name: { color: '#e94560', margin: 0 },
    date: { color: '#aaa', fontSize: '0.85rem' },
    email: { color: '#aaa', fontSize: '0.9rem', marginBottom: '0.75rem' },
    msgText: { color: 'white', lineHeight: '1.6' }
};

export default Messages;