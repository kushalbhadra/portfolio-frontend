import { useState, useEffect } from 'react';
import API from '../api/axiosConfig';

function Skills() {
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState('All');

    useEffect(() => {
        fetchSkills();
    }, []);

    const fetchSkills = async () => {
        try {
            const res = await API.get('/api/skills');
            setSkills(res.data);
        } catch (err) {
            console.error('Error fetching skills');
        } finally {
            setLoading(false);
        }
    };

    const levelConfig = {
        BEGINNER: { color: '#22d3ee', pct: 30, label: 'Beginner' },
        INTERMEDIATE: { color: '#7c3aed', pct: 65, label: 'Intermediate' },
        EXPERT: { color: '#f97316', pct: 90, label: 'Expert' },
    };

    const filters = ['All', 'BEGINNER', 'INTERMEDIATE', 'EXPERT'];

    const filtered = activeFilter === 'All'
        ? skills
        : skills.filter(s => s.level === activeFilter);

    return (
        <div style={styles.page}>
            <div style={styles.orb1} />
            <div style={styles.orb2} />

            {/* Header */}
            <div style={styles.header}>
                <p style={styles.subtitle}>WHAT I KNOW</p>
                <h1 style={styles.title}>Technical Skills</h1>
                <div style={styles.titleLine} />
                <p style={styles.desc}>
                    Technologies and tools I use to build
                    production-level applications.
                </p>
            </div>

            {/* Filter */}
            <div style={styles.filters}>
                {filters.map(f => (
                    <button
                        key={f}
                        onClick={() => setActiveFilter(f)}
                        style={{
                            ...styles.filterBtn,
                            background: activeFilter === f
                                ? 'linear-gradient(135deg, #7c3aed, #22d3ee)'
                                : '#0d0520',
                            color: activeFilter === f ? 'white' : '#a78bfa',
                            border: activeFilter === f
                                ? 'none' : '1px solid #2a1a4e',
                        }}>
                        {f === 'All' ? 'All Skills' : f.charAt(0) + f.slice(1).toLowerCase()}
                    </button>
                ))}
            </div>

            {/* Stats summary */}
            <div style={styles.summary}>
                {filters.slice(1).map(f => (
                    <div key={f} style={styles.summaryCard}>
                        <p style={{
                            ...styles.summaryNum,
                            color: levelConfig[f].color
                        }}>
                            {skills.filter(s => s.level === f).length}
                        </p>
                        <p style={styles.summaryLabel}>
                            {f.charAt(0) + f.slice(1).toLowerCase()}
                        </p>
                    </div>
                ))}
                <div style={styles.summaryCard}>
                    <p style={{ ...styles.summaryNum, color: '#fff' }}>
                        {skills.length}
                    </p>
                    <p style={styles.summaryLabel}>Total Skills</p>
                </div>
            </div>

            {/* Skills Grid */}
            {loading ? (
                <div style={styles.grid}>
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} style={styles.skeleton} />
                    ))}
                </div>
            ) : filtered.length === 0 ? (
                <div style={styles.empty}>
                    <p>No skills found. Add from admin panel!</p>
                </div>
            ) : (
                <div style={styles.grid}>
                    {filtered.map((skill) => {
                        const config = levelConfig[skill.level]
                            || levelConfig.BEGINNER;
                        return (
                            <div
                                key={skill.id}
                                style={styles.card}
                                onMouseEnter={e => {
                                    e.currentTarget.style.transform = 'translateY(-6px)';
                                    e.currentTarget.style.borderColor = config.color;
                                    e.currentTarget.style.boxShadow = `0 10px 30px ${config.color}30`;
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.borderColor = '#2a1a4e';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}>

                                {/* Top accent */}
                                <div style={{
                                    height: '3px',
                                    background: `linear-gradient(90deg, ${config.color}, transparent)`,
                                    margin: '-1.25rem -1.25rem 1rem',
                                    borderRadius: '12px 12px 0 0',
                                }} />

                                {/* Skill name + level badge */}
                                <div style={styles.cardHeader}>
                                    <h3 style={styles.skillName}>
                                        {skill.name}
                                    </h3>
                                    <span style={{
                                        ...styles.levelBadge,
                                        background: `${config.color}20`,
                                        color: config.color,
                                        border: `1px solid ${config.color}40`,
                                    }}>
                                        {config.label}
                                    </span>
                                </div>

                                {/* Progress bar */}
                                <div style={styles.barBg}>
                                    <div style={{
                                        height: '100%',
                                        width: `${config.pct}%`,
                                        background: `linear-gradient(90deg, ${config.color}, ${config.color}80)`,
                                        borderRadius: '10px',
                                        transition: 'width 1s ease',
                                    }} />
                                </div>

                                <div style={styles.barLabels}>
                                    <span style={{ color: '#555', fontSize: '10px' }}>
                                        Proficiency
                                    </span>
                                    <span style={{
                                        color: config.color,
                                        fontSize: '11px',
                                        fontWeight: '500'
                                    }}>
                                        {config.pct}%
                                    </span>
                                </div>
                            </div>
                        );
                    })}
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
        bottom: 0,
        left: 0,
        width: '200px',
        height: '200px',
        background: 'radial-gradient(circle,rgba(34,211,238,0.07),transparent 70%)',
        pointerEvents: 'none',
    },
    header: {
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
        marginBottom: '12px',
    },
    desc: {
        color: '#666',
        fontSize: '0.9rem',
        maxWidth: '400px',
        lineHeight: '1.6',
    },
    filters: {
        display: 'flex',
        gap: '8px',
        marginBottom: '1.5rem',
        flexWrap: 'wrap',
    },
    filterBtn: {
        padding: '6px 18px',
        borderRadius: '20px',
        fontSize: '12px',
        cursor: 'pointer',
        fontWeight: '500',
        transition: 'all 0.2s',
    },
    summary: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '12px',
        marginBottom: '2rem',
    },
    summaryCard: {
        background: '#0d0520',
        border: '1px solid #1a0a2e',
        borderRadius: '10px',
        padding: '12px',
        textAlign: 'center',
    },
    summaryNum: {
        fontSize: '1.8rem',
        fontWeight: '600',
        margin: 0,
    },
    summaryLabel: {
        color: '#666',
        fontSize: '11px',
        margin: '4px 0 0',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1.25rem',
    },
    skeleton: {
        height: '120px',
        background: '#0d0520',
        borderRadius: '12px',
        border: '1px solid #1a0a2e',
    },
    empty: {
        textAlign: 'center',
        padding: '3rem',
        background: '#0d0520',
        borderRadius: '12px',
        border: '1px dashed #2a1a4e',
        color: '#888',
    },
    card: {
        background: '#0d0520',
        border: '1px solid #2a1a4e',
        borderRadius: '12px',
        padding: '1.25rem',
        transition: 'transform 0.3s, border-color 0.3s, box-shadow 0.3s',
        cursor: 'default',
    },
    cardHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '12px',
    },
    skillName: {
        color: 'white',
        fontSize: '1rem',
        fontWeight: '500',
        margin: 0,
    },
    levelBadge: {
        padding: '2px 10px',
        borderRadius: '20px',
        fontSize: '10px',
        fontWeight: '500',
    },
    barBg: {
        background: '#1a0a2e',
        borderRadius: '10px',
        height: '6px',
        overflow: 'hidden',
        marginBottom: '6px',
    },
    barLabels: {
        display: 'flex',
        justifyContent: 'space-between',
    },
};

export default Skills;