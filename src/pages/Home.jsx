import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
    const [roleIndex, setRoleIndex] = useState(0);
    const [displayed, setDisplayed] = useState('');
    const [deleting, setDeleting] = useState(false);

    const roles = [
        'Java Backend Developer',
        'Spring Boot Expert',
        'REST API Builder',
        'JWT Security Specialist',
        'Full Stack Developer'
    ];

    // Typewriter effect
    useEffect(() => {
        const currentRole = roles[roleIndex];
        let timeout;

        if (!deleting && displayed.length < currentRole.length) {
            timeout = setTimeout(() => {
                setDisplayed(currentRole.slice(0, displayed.length + 1));
            }, 80);
        } else if (!deleting && displayed.length === currentRole.length) {
            timeout = setTimeout(() => setDeleting(true), 1500);
        } else if (deleting && displayed.length > 0) {
            timeout = setTimeout(() => {
                setDisplayed(displayed.slice(0, -1));
            }, 50);
        } else if (deleting && displayed.length === 0) {
            setDeleting(false);
            setRoleIndex((prev) => (prev + 1) % roles.length);
        }

        return () => clearTimeout(timeout);
    }, [displayed, deleting, roleIndex]);

    const stats = [
        { value: '2+', label: 'Years Learning', color: '#7c3aed' },
        { value: '5+', label: 'Projects Built', color: '#22d3ee' },
        { value: '10+', label: 'Technologies', color: '#f97316' },
        { value: '100%', label: 'Dedication', color: '#a78bfa' },
    ];

    const socialLinks = [
        { icon: '🐙', label: 'GitHub', url: 'https://github.com/kushalbhadra' },
        { icon: '💼', label: 'LinkedIn', url: 'https://linkedin.com/in/kushalbhadra' },
        { icon: '📧', label: 'Email', url: 'mailto:kushal@gmail.com' },
    ];

    return (
        <div style={styles.page}>

            {/* Background orbs */}
            <div style={styles.orb1} />
            <div style={styles.orb2} />

            {/* Hero Section */}
            <div style={styles.hero}>

                {/* Left Content */}
                <div style={styles.heroLeft}>

                    {/* Available badge */}
                    <div style={styles.availableBadge}>
                        <div style={styles.dot} />
                        <span style={styles.availableText}>
                            AVAILABLE FOR WORK
                        </span>
                    </div>

                    <p style={styles.helloText}>HELLO, I AM</p>

                    {/* Gradient Name */}
                    <h1 style={styles.name}>Kushal Bhadra</h1>

                    {/* Typewriter role */}
                    <div style={styles.roleContainer}>
                        <span style={styles.roleText}>{displayed}</span>
                        <span style={styles.cursor}>|</span>
                    </div>

                    <p style={styles.bio}>
                        Passionate Java Backend Developer building
                        production-level REST APIs with Spring Boot,
                        JWT Security, and MySQL. Open to exciting
                        opportunities.
                    </p>

                    {/* CTA Buttons */}
                    <div style={styles.btnRow}>
                        <button
                            onClick={() => navigate('/projects')}
                            style={styles.primaryBtn}
                            onMouseEnter={e => {
                                e.target.style.transform = 'translateY(-3px)';
                                e.target.style.boxShadow = '0 8px 25px rgba(124,58,237,0.5)';
                            }}
                            onMouseLeave={e => {
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = 'none';
                            }}>
                            View My Work
                        </button>

                        {/* CV Download Button */}
                        <a
                            href="YOUR_GOOGLE_DRIVE_CV_LINK_HERE"
                            target="_blank"
                            rel="noreferrer"
                            style={styles.cvBtn} >
                            Download CV ↓
                        </a>

                        <button
                            onClick={() => navigate('/contact')}
                            style={styles.outlineBtn}>
                            Hire Me
                        </button>
                    </div>

                    {/* Social Links */}
                    <div style={styles.socialRow}>
                        <span style={styles.findMe}>Find me on:</span>
                        {socialLinks.map((s) => (
    <a
        key={s.label}
        href={s.url}
        target="_blank"
        rel="noreferrer"
        style={styles.socialBtn}
        onMouseEnter={e => {
            e.currentTarget.style.background = '#7c3aed';
            e.currentTarget.style.borderColor = '#7c3aed';
            e.currentTarget.style.transform = 'scale(1.15)';
        }}
        onMouseLeave={e => {
            e.currentTarget.style.background = '#1a0a2e';
            e.currentTarget.style.borderColor = '#2a1a4e';
            e.currentTarget.style.transform = 'scale(1)';
        }}>
        {s.icon}
    </a>
))}
                    </div>
                </div>

                {/* Right: Avatar */}
                <div style={styles.avatarWrapper}>

                    {/* Outer rotating ring */}
                    <div style={styles.ringOuter} />

                    {/* Inner gradient ring */}
                    <div style={styles.ringInner} />

                    {/* Photo circle */}
                    <div style={styles.avatarCircle}>
                        <img
                            src="YOUR_PHOTO_URL_HERE"
                            alt="Kushal Bhadra"
                            style={styles.photo}
                            onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                            }}
                        />
                        {/* Fallback initials */}
                        <div style={styles.initials}>
                            <span style={styles.initialsText}>KB</span>
                            <span style={styles.initialsRole}>Java Dev</span>
                        </div>
                    </div>

                    {/* Floating tech badges */}
                    <div style={{...styles.badge, top: '-8px', right: '-8px', background: '#7c3aed'}}>
                        Spring Boot
                    </div>
                    <div style={{...styles.badge, bottom: '-8px', left: '-16px', background: '#0891b2'}}>
                        MySQL
                    </div>
                    <div style={{...styles.badge, top: '50%', right: '-24px', background: '#6d28d9', transform: 'translateY(-50%)'}}>
                        JWT
                    </div>
                    <div style={{...styles.badge, top: '50%', left: '-20px', background: '#c2410c', transform: 'translateY(-50%)'}}>
                        React
                    </div>
                </div>
            </div>

            {/* Stats Bar */}
            <div style={styles.statsBar}>
                {stats.map((stat) => (
                    <div
                        key={stat.label}
                        style={styles.statCard}
                        onMouseEnter={e => {
                            e.currentTarget.style.transform = 'scale(1.05)';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.transform = 'scale(1)';
                        }}>
                        <p style={{
                            ...styles.statValue,
                            color: stat.color
                        }}>
                            {stat.value}
                        </p>
                        <p style={styles.statLabel}>{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Quick Links */}
            <div style={styles.quickLinks}>
                <div
                    style={styles.quickCard}
                    onClick={() => navigate('/projects')}
                    onMouseEnter={e => {
                        e.currentTarget.style.borderColor = '#7c3aed';
                        e.currentTarget.style.transform = 'translateY(-4px)';
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.borderColor = '#2a1a4e';
                        e.currentTarget.style.transform = 'translateY(0)';
                    }}>
                    <span style={styles.quickIcon}>🚀</span>
                    <p style={styles.quickTitle}>My Projects</p>
                    <p style={styles.quickSub}>See what I've built</p>
                </div>
                <div
                    style={styles.quickCard}
                    onClick={() => navigate('/skills')}
                    onMouseEnter={e => {
                        e.currentTarget.style.borderColor = '#22d3ee';
                        e.currentTarget.style.transform = 'translateY(-4px)';
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.borderColor = '#2a1a4e';
                        e.currentTarget.style.transform = 'translateY(0)';
                    }}>
                    <span style={styles.quickIcon}>⚡</span>
                    <p style={styles.quickTitle}>My Skills</p>
                    <p style={styles.quickSub}>Technologies I use</p>
                </div>
                <div
                    style={styles.quickCard}
                    onClick={() => navigate('/contact')}
                    onMouseEnter={e => {
                        e.currentTarget.style.borderColor = '#f97316';
                        e.currentTarget.style.transform = 'translateY(-4px)';
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.borderColor = '#2a1a4e';
                        e.currentTarget.style.transform = 'translateY(0)';
                    }}>
                    <span style={styles.quickIcon}>✉️</span>
                    <p style={styles.quickTitle}>Contact Me</p>
                    <p style={styles.quickSub}>Let's work together</p>
                </div>
            </div>
        </div>
    );
}

const styles = {
    page: {
        background: '#080014',
        minHeight: '90vh',
        padding: '2rem',
        position: 'relative',
        overflow: 'hidden',
        color: 'white',
    },
    orb1: {
        position: 'absolute',
        top: '-60px',
        right: '100px',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(124,58,237,0.12), transparent 70%)',
        pointerEvents: 'none',
    },
    orb2: {
        position: 'absolute',
        bottom: '0',
        left: '80px',
        width: '200px',
        height: '200px',
        background: 'radial-gradient(circle, rgba(34,211,238,0.08), transparent 70%)',
        pointerEvents: 'none',
    },
    hero: {
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        gap: '3rem',
        alignItems: 'center',
        marginBottom: '2.5rem',
        position: 'relative',
    },
    heroLeft: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0',
    },
    availableBadge: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        background: '#0d0520',
        border: '1px solid #1a0a2e',
        padding: '5px 14px',
        borderRadius: '20px',
        marginBottom: '16px',
        width: 'fit-content',
    },
    dot: {
        width: '7px',
        height: '7px',
        background: '#22d3ee',
        borderRadius: '50%',
        animation: 'pulse 1.5s infinite',
    },
    availableText: {
        color: '#22d3ee',
        fontSize: '10px',
        letterSpacing: '2px',
    },
    helloText: {
        color: '#a78bfa',
        fontSize: '11px',
        letterSpacing: '3px',
        margin: '0 0 8px',
    },
    name: {
        background: 'linear-gradient(135deg, #ffffff, #a78bfa, #22d3ee)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontSize: '3rem',
        fontWeight: '600',
        margin: '0 0 12px',
        lineHeight: '1.1',
    },
    roleContainer: {
        height: '28px',
        marginBottom: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '2px',
    },
    roleText: {
        background: 'linear-gradient(90deg, #7c3aed, #22d3ee, #f97316)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontSize: '1.1rem',
        fontWeight: '500',
    },
    cursor: {
        color: '#7c3aed',
        fontSize: '1.2rem',
        animation: 'pulse 1s infinite',
    },
    bio: {
        color: '#777',
        fontSize: '0.9rem',
        lineHeight: '1.7',
        maxWidth: '420px',
        margin: '0 0 24px',
    },
    btnRow: {
        display: 'flex',
        gap: '12px',
        flexWrap: 'wrap',
        marginBottom: '20px',
        alignItems: 'center',
    },
    primaryBtn: {
        padding: '10px 24px',
        background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
        color: 'white',
        border: 'none',
        borderRadius: '22px',
        fontSize: '0.9rem',
        cursor: 'pointer',
        fontWeight: '500',
        transition: 'transform 0.2s, box-shadow 0.2s',
    },
    cvBtn: {
        padding: '10px 24px',
        background: 'linear-gradient(135deg, #22d3ee, #0891b2)',
        color: 'white',
        border: 'none',
        borderRadius: '22px',
        fontSize: '0.9rem',
        cursor: 'pointer',
        fontWeight: '500',
        textDecoration: 'none',
        display: 'inline-block',
        transition: 'transform 0.2s',
    },
    outlineBtn: {
        padding: '10px 24px',
        background: 'transparent',
        color: '#a78bfa',
        border: '1px solid #7c3aed',
        borderRadius: '22px',
        fontSize: '0.9rem',
        cursor: 'pointer',
        transition: 'transform 0.2s',
    },
    socialRow: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
    },
    findMe: {
        color: '#555',
        fontSize: '11px',
    },
    socialBtn: {
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'transform 0.2s, background 0.2s',
        fontSize: '16px',
        background: '#1a0a2e',
        border: '1px solid #2a1a4e',
        textDecoration: 'none',
    },
    avatarWrapper: {
        position: 'relative',
        width: '200px',
        height: '200px',
        flexShrink: 0,
    },
    ringOuter: {
        position: 'absolute',
        inset: '-14px',
        borderRadius: '50%',
        border: '2px dashed rgba(124,58,237,0.3)',
        animation: 'ringRotate 12s linear infinite',
    },
    ringInner: {
        position: 'absolute',
        inset: '-5px',
        borderRadius: '50%',
        border: '2px solid transparent',
        background: 'linear-gradient(#080014, #080014) padding-box, linear-gradient(135deg, #7c3aed, #22d3ee, #f97316) border-box',
        animation: 'ringRotateReverse 8s linear infinite',
    },
    avatarCircle: {
        position: 'absolute',
        inset: 0,
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #1a0a2e, #0d0520)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    photo: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        borderRadius: '50%',
    },
    initials: {
        display: 'none',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    initialsText: {
        fontSize: '2.5rem',
        fontWeight: '500',
        background: 'linear-gradient(135deg, #7c3aed, #22d3ee)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
    },
    initialsRole: {
        color: '#a78bfa',
        fontSize: '10px',
        letterSpacing: '1px',
    },
    badge: {
        position: 'absolute',
        color: 'white',
        fontSize: '9px',
        padding: '3px 8px',
        borderRadius: '10px',
        whiteSpace: 'nowrap',
        fontWeight: '500',
    },
    statsBar: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '12px',
        marginBottom: '2rem',
    },
    statCard: {
        textAlign: 'center',
        padding: '14px',
        background: '#0d0520',
        borderRadius: '12px',
        border: '1px solid #1a0a2e',
        cursor: 'default',
        transition: 'transform 0.2s',
    },
    statValue: {
        fontSize: '1.6rem',
        fontWeight: '500',
        margin: '0',
    },
    statLabel: {
        color: '#666',
        fontSize: '11px',
        margin: '4px 0 0',
    },
    quickLinks: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1rem',
    },
    quickCard: {
        background: '#0d0520',
        border: '1px solid #2a1a4e',
        borderRadius: '12px',
        padding: '1.5rem',
        cursor: 'pointer',
        transition: 'border-color 0.3s, transform 0.3s',
        textAlign: 'center',
    },
    quickIcon: {
        fontSize: '2rem',
        display: 'block',
        marginBottom: '0.5rem',
    },
    quickTitle: {
        color: 'white',
        fontSize: '1rem',
        fontWeight: '500',
        margin: '0 0 4px',
    },
    quickSub: {
        color: '#666',
        fontSize: '0.85rem',
        margin: 0,
    },
};

export default Home;