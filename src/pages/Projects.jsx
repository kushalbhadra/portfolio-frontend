import { useState, useEffect } from 'react';
import API from '../api/axiosConfig';

function Projects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const res = await API.get('/api/projects');
            setProjects(res.data);
        } catch (err) {
            console.error('Error fetching projects');
        } finally {
            setLoading(false);
        }
    };

    const allTechs = ['All', ...new Set(
        projects.flatMap(p =>
            p.techStack ? p.techStack.split(',').map(t => t.trim()) : []
        )
    )];

    const filtered = filter === 'All'
        ? projects
        : projects.filter(p =>
            p.techStack && p.techStack.includes(filter)
        );

    const cardColors = [
        'linear-gradient(135deg, #7c3aed, #6d28d9)',
        'linear-gradient(135deg, #0e7490, #0891b2)',
        'linear-gradient(135deg, #c2410c, #ea580c)',
        'linear-gradient(135deg, #065f46, #047857)',
        'linear-gradient(135deg, #1e40af, #1d4ed8)',
        'linear-gradient(135deg, #9d174d, #be185d)',
    ];

    return (
        <div style={styles.page}>

            {/* Background orbs */}
            <div style={styles.orb1} />
            <div style={styles.orb2} />

            {/* Header */}
            <div style={styles.header}>
                <div>
                    <p style={styles.subtitle}>MY WORK</p>
                    <h1 style={styles.title}>Featured Projects</h1>
                    <div style={styles.titleLine} />
                </div>
                <p style={styles.desc}>
                    Projects built with real-world architecture,
                    clean code, and production-level thinking.
                </p>
            </div>

            {/* Filter Tags */}
            <div style={styles.filters}>
                {allTechs.map(tech => (
                    <button
                        key={tech}
                        onClick={() => setFilter(tech)}
                        style={{
                            ...styles.filterBtn,
                            background: filter === tech
                                ? 'linear-gradient(135deg, #7c3aed, #22d3ee)'
                                : '#0d0520',
                            color: filter === tech ? 'white' : '#a78bfa',
                            border: filter === tech
                                ? 'none'
                                : '1px solid #2a1a4e',
                        }}>
                        {tech}
                    </button>
                ))}
            </div>

            {/* Projects Grid */}
            {loading ? (
                <div style={styles.loadingRow}>
                    {[1, 2, 3].map(i => (
                        <div key={i} style={styles.skeleton} />
                    ))}
                </div>
            ) : filtered.length === 0 ? (
                <div style={styles.empty}>
                    <p style={{ fontSize: '2rem' }}>🚀</p>
                    <p style={{ color: '#888', marginTop: '1rem' }}>
                        No projects yet. Add some from the admin panel!
                    </p>
                </div>
            ) : (
                <div style={styles.grid}>
                    {filtered.map((project, index) => (
                        <div
                            key={project.id}
                            style={styles.card}
                            onMouseEnter={e => {
                                e.currentTarget.style.transform = 'translateY(-8px)';
                                e.currentTarget.style.boxShadow = '0 20px 40px rgba(124,58,237,0.3)';
                                e.currentTarget.style.borderColor = '#7c3aed';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                                e.currentTarget.style.borderColor = '#2a1a4e';
                            }}>

                            {/* Card top gradient bar */}
                            <div style={{
                                height: '4px',
                                background: cardColors[index % cardColors.length],
                                borderRadius: '12px 12px 0 0',
                                margin: '-1.5rem -1.5rem 1.2rem',
                            }} />

                            {/* Project icon */}
                            <div style={{
                                ...styles.cardIcon,
                                background: cardColors[index % cardColors.length],
                            }}>
                                🚀
                            </div>

                            {/* Title */}
                            <h2 style={styles.cardTitle}>{project.title}</h2>

                            {/* Description */}
                            <p style={styles.cardDesc}>
                                {project.description ||
                                    'A production-level project built with modern technologies.'}
                            </p>

                            {/* Tech tags */}
                            {project.techStack && (
                                <div style={styles.tags}>
                                    {project.techStack
                                        .split(',')
                                        .map((tech, i) => (
                                            <span key={i} style={styles.tag}>
                                                {tech.trim()}
                                            </span>
                                        ))}
                                </div>
                            )}

                            {/* Links */}
                            <div style={styles.cardLinks}>
                                {project.githubLink && (
                                    <a
                                        href={project.githubLink}
                                        target="_blank"
                                        rel="noreferrer"
                                        style={styles.linkBtn}>
                                        🐙 GitHub
                                    </a>
                                )}
                                {project.liveLink && (
                                    <a
                                        href={project.liveLink}
                                        target="_blank"
                                        rel="noreferrer"
                                        style={{
                                            ...styles.linkBtn,
                                            color: '#22d3ee',
                                            borderColor: '#22d3ee',
                                        }}>
                                        ↗ Live Demo
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
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
        bottom: '0',
        left: '0',
        width: '200px',
        height: '200px',
        background: 'radial-gradient(circle,rgba(34,211,238,0.07),transparent 70%)',
        pointerEvents: 'none',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: '2rem',
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
    },
    desc: {
        color: '#666',
        fontSize: '0.9rem',
        maxWidth: '280px',
        textAlign: 'right',
        lineHeight: '1.6',
    },
    filters: {
        display: 'flex',
        gap: '8px',
        flexWrap: 'wrap',
        marginBottom: '2rem',
    },
    filterBtn: {
        padding: '6px 16px',
        borderRadius: '20px',
        fontSize: '12px',
        cursor: 'pointer',
        fontWeight: '500',
        transition: 'all 0.2s',
    },
    loadingRow: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1.5rem',
    },
    skeleton: {
        height: '280px',
        background: 'linear-gradient(90deg, #0d0520 25%, #1a0a2e 50%, #0d0520 75%)',
        backgroundSize: '200% 100%',
        borderRadius: '12px',
        animation: 'shimmer 1.5s infinite',
    },
    empty: {
        textAlign: 'center',
        padding: '4rem',
        background: '#0d0520',
        borderRadius: '12px',
        border: '1px dashed #2a1a4e',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1.5rem',
    },
    card: {
        background: '#0d0520',
        border: '1px solid #2a1a4e',
        borderRadius: '12px',
        padding: '1.5rem',
        transition: 'transform 0.3s, box-shadow 0.3s, border-color 0.3s',
        cursor: 'default',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
    },
    cardIcon: {
        width: '42px',
        height: '42px',
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '20px',
    },
    cardTitle: {
        color: 'white',
        fontSize: '1.1rem',
        fontWeight: '500',
        margin: 0,
    },
    cardDesc: {
        color: '#777',
        fontSize: '0.85rem',
        lineHeight: '1.6',
        margin: 0,
        flexGrow: 1,
    },
    tags: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '6px',
    },
    tag: {
        background: '#1a0a2e',
        color: '#a78bfa',
        border: '1px solid #2a1a4e',
        padding: '3px 10px',
        borderRadius: '20px',
        fontSize: '11px',
    },
    cardLinks: {
        display: 'flex',
        gap: '10px',
        marginTop: '4px',
    },
    linkBtn: {
        color: '#a78bfa',
        border: '1px solid #7c3aed',
        padding: '5px 14px',
        borderRadius: '20px',
        fontSize: '11px',
        textDecoration: 'none',
        transition: 'background 0.2s',
    },
};

export default Projects;