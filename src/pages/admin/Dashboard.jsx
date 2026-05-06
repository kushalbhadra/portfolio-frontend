import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const navigate = useNavigate();

    const cards = [
        {
            title: 'Manage Projects',
            description: 'Add, edit or delete your portfolio projects',
            path: '/admin/projects',
            icon: '🚀',
            gradient: 'linear-gradient(135deg, #e94560, #c62a47)',
        },
        {
            title: 'Manage Skills',
            description: 'Update your technical skills and expertise',
            path: '/admin/skills',
            icon: '⚡',
            gradient: 'linear-gradient(135deg, #533483, #3a2468)',
        },
        {
            title: 'View Messages',
            description: 'Read messages sent through contact form',
            path: '/admin/messages',
            icon: '✉️',
            gradient: 'linear-gradient(135deg, #0f3460, #0a2440)',
        },
    ];

    return (
        <div style={styles.page}>
            {/* Header */}
            <div style={styles.header}>
                <div>
                    <h1 style={styles.title}>Admin Dashboard</h1>
                    <p style={styles.subtitle}>
                        Manage your portfolio content
                    </p>
                </div>
                <div style={styles.badge}>Admin</div>
            </div>

            {/* Stats Bar */}
            <div style={styles.statsBar}>
                <div style={styles.stat}>
                    <span style={styles.statIcon}>🚀</span>
                    <span style={styles.statLabel}>Projects</span>
                </div>
                <div style={styles.statDivider} />
                <div style={styles.stat}>
                    <span style={styles.statIcon}>⚡</span>
                    <span style={styles.statLabel}>Skills</span>
                </div>
                <div style={styles.statDivider} />
                <div style={styles.stat}>
                    <span style={styles.statIcon}>✉️</span>
                    <span style={styles.statLabel}>Messages</span>
                </div>
            </div>

            {/* Cards */}
            <div style={styles.grid}>
                {cards.map((card) => (
                    <div
                        key={card.title}
                        style={{
                            ...styles.card,
                            background: card.gradient,
                        }}
                        onClick={() => navigate(card.path)}
                        onMouseEnter={e => {
                            e.currentTarget.style.transform = 'translateY(-8px)';
                            e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.4)';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
                        }}>
                        <div style={styles.cardIcon}>{card.icon}</div>
                        <h2 style={styles.cardTitle}>{card.title}</h2>
                        <p style={styles.cardDesc}>{card.description}</p>
                        <div style={styles.cardFooter}>
                            <span style={styles.cardLink}>
                                Go to {card.title} →
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

const styles = {
    page: {
        padding: '2rem',
        backgroundColor: '#070720',
        minHeight: '90vh',
        color: 'white',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
        borderBottom: '1px solid #1a1a3e',
        paddingBottom: '1.5rem',
    },
    title: {
        fontSize: '2.2rem',
        color: '#e94560',
        margin: 0,
        fontWeight: '700',
    },
    subtitle: {
        color: '#888',
        margin: '0.3rem 0 0 0',
        fontSize: '1rem',
    },
    badge: {
        backgroundColor: '#e94560',
        color: 'white',
        padding: '0.4rem 1.2rem',
        borderRadius: '20px',
        fontSize: '0.85rem',
        fontWeight: 'bold',
        letterSpacing: '1px',
    },
    statsBar: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#1a1a2e',
        borderRadius: '12px',
        padding: '1rem 2rem',
        marginBottom: '2rem',
        gap: '2rem',
    },
    stat: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
    },
    statIcon: {
        fontSize: '1.2rem',
    },
    statLabel: {
        color: '#aaa',
        fontSize: '0.95rem',
    },
    statDivider: {
        width: '1px',
        height: '24px',
        backgroundColor: '#333',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1.5rem',
    },
    card: {
        padding: '2rem',
        borderRadius: '16px',
        cursor: 'pointer',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
    },
    cardIcon: {
        fontSize: '2.5rem',
        marginBottom: '0.5rem',
    },
    cardTitle: {
        fontSize: '1.3rem',
        margin: 0,
        fontWeight: '700',
        color: 'white',
    },
    cardDesc: {
        color: 'rgba(255,255,255,0.75)',
        fontSize: '0.9rem',
        lineHeight: '1.5',
        margin: 0,
        flexGrow: 1,
    },
    cardFooter: {
        marginTop: '1rem',
        borderTop: '1px solid rgba(255,255,255,0.15)',
        paddingTop: '1rem',
    },
    cardLink: {
        color: 'rgba(255,255,255,0.9)',
        fontSize: '0.9rem',
        fontWeight: '600',
    },
};

export default Dashboard;