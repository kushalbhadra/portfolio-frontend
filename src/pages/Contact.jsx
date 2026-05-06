import { useState } from 'react';
import API from '../api/axiosConfig';
import { ReactComponent as EmailIcon } from '../assets/email-svgrepo-com.svg';
import { ReactComponent as LinkedinIcon } from '../assets/linkedin-svgrepo-com.svg';
import { ReactComponent as GithubIcon } from '../assets/github-142-svgrepo-com.svg';
import { ReactComponent as LocationIcon } from '../assets/location-svgrepo-com.svg';
function Contact() {
    const [form, setForm] = useState({
        name: '', email: '', message: ''
    });
    const [status, setStatus] = useState('');
    const [statusType, setStatusType] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await API.post('/api/contact', form);
            setStatus('✅ Message sent! I will get back to you soon.');
            setStatusType('success');
            setForm({ name: '', email: '', message: '' });
        } catch (err) {
            setStatus('❌ Failed to send. Please try again.');
            setStatusType('error');
        } finally {
            setLoading(false);
            setTimeout(() => setStatus(''), 5000);
        }
    };

    const contactInfo = [
    {
        icon: <EmailIcon width={20} height={20} fill="#7c3aed" />,
        label: 'Email',
        value: 'kushalbhadra001@gmail.com',
        color: '#7c3aed',
        url: 'mailto:kushalbhadra001@gmail.com',
    },
    {
        icon: <LinkedinIcon width={20} height={20} fill="#22d3ee" />,
        label: 'LinkedIn',
        value: 'linkedin.com/in/kushalbhadra',
        color: '#22d3ee',
        url: 'https://linkedin.com/in/kushalbhadra',
    },
    {
        icon: <GithubIcon width={20} height={20} fill="#f97316" />,
        label: 'GitHub',
        value: 'github.com/kushalbhadra',
        color: '#f97316',
        url: 'https://github.com/kushalbhadra',
    },
    {
        icon: <LocationIcon width={20} height={20} fill="#a78bfa" />,
        label: 'Location',
        value: 'Ranchi, Jharkhand, India',
        color: '#a78bfa',
        url: 'https://maps.google.com/?q=Ranchi,Jharkhand,India',
    },
];

    return (
        <div style={styles.page}>
            <div style={styles.orb1} />
            <div style={styles.orb2} />

            {/* Header */}
            <div style={styles.header}>
                <p style={styles.subtitle}>GET IN TOUCH</p>
                <h1 style={styles.title}>Contact Me</h1>
                <div style={styles.titleLine} />
                <p style={styles.desc}>
                    Have a project in mind or want to hire me?
                    Feel free to reach out!
                </p>
            </div>

            <div style={styles.grid}>

                {/* Left — Contact Info */}
                <div style={styles.infoSection}>
                    <h2 style={styles.infoTitle}>Let's Talk</h2>
                    <p style={styles.infoText}>
                        I'm always open to discussing new projects,
                        creative ideas, or opportunities to be part
                        of your vision.
                    </p>

                    <div style={styles.infoCards}>
    {contactInfo.map((info) => (
        <a
            key={info.label}
            href={info.url}
            target="_blank"
            rel="noreferrer"
            style={{
                ...styles.infoCard,
                textDecoration: 'none',
            }}
            onMouseEnter={e => {
                e.currentTarget.style.borderColor = info.color;
                e.currentTarget.style.transform = 'translateX(6px)';
                e.currentTarget.style.boxShadow = `0 4px 15px ${info.color}30`;
            }}
            onMouseLeave={e => {
                e.currentTarget.style.borderColor = '#2a1a4e';
                e.currentTarget.style.transform = 'translateX(0)';
                e.currentTarget.style.boxShadow = 'none';
            }}>
            <div style={{
                ...styles.infoIcon,
                background: `${info.color}20`,
                border: `1px solid ${info.color}40`,
            }}>
                {info.icon}
            </div>
            <div>
                <p style={styles.infoLabel}>{info.label}</p>
                <p style={{
                    ...styles.infoValue,
                    color: info.color,
                }}>
                    {info.value}
                </p>
            </div>

            {/* Arrow indicator */}
            <div style={{
                marginLeft: 'auto',
                color: info.color,
                fontSize: '14px',
                opacity: 0.6,
            }}>
                →
            </div>
        </a>
    ))}
</div>

                    {/* Availability card */}
                    <div style={styles.availCard}>
                        <div style={styles.availDot} />
                        <div>
                            <p style={styles.availTitle}>
                                Available for Work
                            </p>
                            <p style={styles.availText}>
                                Open to full-time, part-time, and
                                freelance opportunities.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right — Contact Form */}
                <div style={styles.formCard}>
                    <h2 style={styles.formTitle}>Send a Message</h2>

                    {status && (
                        <div style={{
                            ...styles.toast,
                            background: statusType === 'success'
                                ? '#1a3a1a' : '#3a1a1a',
                            borderLeft: statusType === 'success'
                                ? '4px solid #4caf50'
                                : '4px solid #e94560',
                        }}>
                            {status}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div style={styles.field}>
                            <label style={styles.label}>
                                Your Name *
                            </label>
                            <input
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                style={styles.input}
                                placeholder="Enter your name"
                                required
                                onFocus={e => {
                                    e.target.style.borderColor = '#7c3aed';
                                }}
                                onBlur={e => {
                                    e.target.style.borderColor = '#2a1a4e';
                                }}
                            />
                        </div>

                        <div style={styles.field}>
                            <label style={styles.label}>
                                Your Email *
                            </label>
                            <input
                                name="email"
                                type="email"
                                value={form.email}
                                onChange={handleChange}
                                style={styles.input}
                                placeholder="Enter your email"
                                required
                                onFocus={e => {
                                    e.target.style.borderColor = '#7c3aed';
                                }}
                                onBlur={e => {
                                    e.target.style.borderColor = '#2a1a4e';
                                }}
                            />
                        </div>

                        <div style={styles.field}>
                            <label style={styles.label}>
                                Your Message *
                            </label>
                            <textarea
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                style={{
                                    ...styles.input,
                                    height: '140px',
                                    resize: 'vertical',
                                }}
                                placeholder="Tell me about your project..."
                                required
                                onFocus={e => {
                                    e.target.style.borderColor = '#7c3aed';
                                }}
                                onBlur={e => {
                                    e.target.style.borderColor = '#2a1a4e';
                                }}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                ...styles.submitBtn,
                                opacity: loading ? 0.7 : 1,
                                cursor: loading
                                    ? 'not-allowed' : 'pointer',
                            }}
                            onMouseEnter={e => {
                                if (!loading) {
                                    e.target.style.transform = 'translateY(-3px)';
                                    e.target.style.boxShadow = '0 8px 25px rgba(124,58,237,0.5)';
                                }
                            }}
                            onMouseLeave={e => {
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = 'none';
                            }}>
                            {loading ? 'Sending...' : 'Send Message →'}
                        </button>
                    </form>
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
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
    },
    orb1: {
        position: 'absolute',
        top: '-40px',
        right: '80px',
        width: '280px',
        height: '280px',
        background: 'radial-gradient(circle,rgba(124,58,237,0.1),transparent 70%)',
        pointerEvents: 'none',
    },
    orb2: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '200px',
        height: '200px',
        background: 'radial-gradient(circle,rgba(34,211,238,0.07),transparent 70%)',
        pointerEvents: 'none',
    },
    header: {
        marginBottom: '2.5rem',
    },
    subtitle: {
        color: '#7c3aed',
        fontSize: '11px',
        letterSpacing: '3px',
        margin: '0 0 6px',
    },
    title: {
        color: 'white',
        fontSize: '2.2rem',
        fontWeight: '600',
        margin: '0 0 8px',
    },
    titleLine: {
        width: '50px',
        height: '3px',
        background: 'linear-gradient(90deg, #7c3aed, #22d3ee)',
        borderRadius: '2px',
        marginBottom: '12px',
    },
    desc: {
        color: '#666',
        fontSize: '0.9rem',
        lineHeight: '1.6',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1.3fr',
        gap: '2rem',
    },
    infoSection: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    },
    infoTitle: {
        color: 'white',
        fontSize: '1.3rem',
        fontWeight: '500',
        margin: 0,
    },
    infoText: {
        color: '#777',
        fontSize: '0.9rem',
        lineHeight: '1.7',
        margin: 0,
    },
    infoCards: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    },
    infoCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    background: '#0d0520',
    border: '1px solid #2a1a4e',
    borderRadius: '10px',
    transition: 'border-color 0.3s, transform 0.3s, box-shadow 0.3s',
    cursor: 'pointer',        // ← add this
    color: 'white',           // ← add this
    textDecoration: 'none',   // ← add this
},
    infoIcon: {
        width: '38px',
        height: '38px',
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '18px',
        flexShrink: 0,
    },
    infoLabel: {
        color: '#666',
        fontSize: '10px',
        letterSpacing: '1px',
        margin: '0 0 2px',
    },
    infoValue: {
        fontSize: '12px',
        fontWeight: '500',
        margin: 0,
    },
    availCard: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        padding: '14px 16px',
        background: 'rgba(34,211,238,0.05)',
        border: '1px solid rgba(34,211,238,0.2)',
        borderRadius: '10px',
        marginTop: '4px',
    },
    availDot: {
        width: '10px',
        height: '10px',
        background: '#22d3ee',
        borderRadius: '50%',
        flexShrink: 0,
        marginTop: '4px',
    },
    availTitle: {
        color: '#22d3ee',
        fontSize: '13px',
        fontWeight: '500',
        margin: '0 0 4px',
    },
    availText: {
        color: '#666',
        fontSize: '12px',
        margin: 0,
        lineHeight: '1.5',
    },
    formCard: {
        background: '#0d0520',
        border: '1px solid #2a1a4e',
        borderRadius: '14px',
        padding: '2rem',
    },
    formTitle: {
        color: 'white',
        fontSize: '1.3rem',
        fontWeight: '500',
        margin: '0 0 1.5rem',
    },
    toast: {
        padding: '0.85rem 1.25rem',
        borderRadius: '8px',
        marginBottom: '1.25rem',
        color: 'white',
        fontSize: '0.9rem',
    },
    field: {
        marginBottom: '1.25rem',
    },
    label: {
        display: 'block',
        color: '#888',
        fontSize: '0.8rem',
        marginBottom: '6px',
        letterSpacing: '0.5px',
    },
    input: {
        width: '100%',
        padding: '10px 14px',
        background: '#080014',
        border: '1px solid #2a1a4e',
        borderRadius: '8px',
        color: 'white',
        fontSize: '0.9rem',
        boxSizing: 'border-box',
        outline: 'none',
        transition: 'border-color 0.3s',
        fontFamily: 'inherit',
    },
    submitBtn: {
        width: '100%',
        padding: '12px',
        background: 'linear-gradient(135deg, #7c3aed, #22d3ee)',
        color: 'white',
        border: 'none',
        borderRadius: '10px',
        fontSize: '0.95rem',
        fontWeight: '500',
        transition: 'transform 0.2s, box-shadow 0.2s',
    },
};

export default Contact;