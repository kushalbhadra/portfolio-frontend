import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import API from '../../api/axiosConfig';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await API.post('/api/auth/login', {
                username,
                password
            });

            // Save token via AuthContext
            login(response.data.token);

            // Redirect to dashboard
            navigate('/admin/dashboard');

        } catch (err) {
            setError('Invalid username or password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>Admin Login</h2>

                {error && (
                    <div style={styles.error}>{error}</div>
                )}

                <form onSubmit={handleLogin}>
                    <div style={styles.field}>
                        <label style={styles.label}>Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            style={styles.input}
                            placeholder="Enter username"
                            required
                        />
                    </div>

                    <div style={styles.field}>
                        <label style={styles.label}>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={styles.input}
                            placeholder="Enter password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        style={styles.button}
                        disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '90vh',
        backgroundColor: '#0f3460',
    },
    card: {
        backgroundColor: '#1a1a2e',
        padding: '2rem',
        borderRadius: '10px',
        width: '100%',
        maxWidth: '400px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
    },
    title: {
        color: '#e94560',
        textAlign: 'center',
        marginBottom: '1.5rem',
        fontSize: '1.8rem',
    },
    error: {
        backgroundColor: '#ff4444',
        color: 'white',
        padding: '0.75rem',
        borderRadius: '5px',
        marginBottom: '1rem',
        textAlign: 'center',
    },
    field: {
        marginBottom: '1rem',
    },
    label: {
        display: 'block',
        color: 'white',
        marginBottom: '0.5rem',
        fontSize: '0.9rem',
    },
    input: {
        width: '100%',
        padding: '0.75rem',
        borderRadius: '5px',
        border: '1px solid #e94560',
        backgroundColor: '#0f3460',
        color: 'white',
        fontSize: '1rem',
        boxSizing: 'border-box',
    },
    button: {
        width: '100%',
        padding: '0.75rem',
        backgroundColor: '#e94560',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        fontSize: '1rem',
        cursor: 'pointer',
        marginTop: '0.5rem',
    }
};

export default Login;