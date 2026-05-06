import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import API from '../../api/axiosConfig';

function ManageSkills() {
    const navigate = useNavigate();
    const [skills, setSkills] = useState([]);
    const [form, setForm] = useState({ name: '', level: '' });
    const [editId, setEditId] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchSkills();
    }, []);

    const fetchSkills = async () => {
        try {
            const res = await API.get('/api/skills');
            setSkills(res.data);
        } catch (err) {
            console.error('Error fetching skills');
        }
    };

   const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        if (editId) {
            await API.put(`/api/skills/${editId}`, form);
            setMessage('✅ Skill updated successfully!');
        } else {
            await API.post('/api/skills', form);
            setMessage('✅ Skill added successfully!');
        }
        setForm({ name: '', level: '' });
        setEditId(null);
        fetchSkills();
        // Auto hide message after 3 seconds
        setTimeout(() => setMessage(''), 3000);
    } catch (err) {
        setMessage('❌ Error saving skill. Try again.');
    }
};

    const handleDelete = async (id) => {
        if (window.confirm('Delete this skill?')) {
            try {
                await API.delete(`/api/skills/${id}`);
                setMessage('Skill deleted!');
                fetchSkills();
            } catch (err) {
                setMessage('Error deleting skill');
            }
        }
    };


    return (
        <div style={styles.container}>

    {/* Header with Back Button */}
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
        <h1 style={styles.title}>Manage Skills</h1>
    </div>

    {message && (
        <div style={styles.message}>{message}</div>
    )}

            <div style={styles.formCard}>
                <h2 style={styles.formTitle}>
                    {editId ? 'Edit Skill' : 'Add Skill'}
                </h2>
                <form onSubmit={handleSubmit}>
                    <div style={styles.field}>
                        <label style={styles.label}>Skill Name</label>
                        <input
                            value={form.name}
                            onChange={(e) =>
                                setForm({...form, name: e.target.value})}
                            style={styles.input}
                            placeholder="e.g. Java, React, MySQL"
                            required
                        />
                    </div>
                    <div style={styles.field}>
                        <label style={styles.label}>Level</label>
                        <select
                            value={form.level}
                            onChange={(e) =>
                                setForm({...form, level: e.target.value})}
                            style={styles.input}
                            required>
                            <option value="">Select level</option>
                            <option value="BEGINNER">Beginner</option>
                            <option value="INTERMEDIATE">Intermediate</option>
                            <option value="EXPERT">Expert</option>
                        </select>
                    </div>
                    <button type="submit" style={styles.btnPrimary}>
                        {editId ? 'Update' : 'Add Skill'}
                    </button>
                </form>
            </div>

            <div style={styles.list}>
                {skills.map((skill) => (
                    <div key={skill.id} style={styles.card}>
                        <div>
                            <h3 style={styles.cardTitle}>{skill.name}</h3>
                            <p style={styles.cardText}>{skill.level}</p>
                        </div>
                        <div style={styles.btnRow}>
                            <button
                                onClick={() => {
                                    setEditId(skill.id);
                                    setForm({
                                        name: skill.name,
                                        level: skill.level
                                    });
                                }}
                                style={styles.btnEdit}>
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(skill.id)}
                                style={styles.btnDelete}>
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
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
    title: { fontSize: '2rem', color: '#e94560', marginBottom: '1rem' },
    message: {
    padding: '0.85rem 1.25rem',
    borderRadius: '8px',
    marginBottom: '1rem',
    color: 'white',
    fontSize: '0.95rem',
    backgroundColor: '#1a3a1a',
    borderLeft: '4px solid #4caf50',
},
    formCard: {
        backgroundColor: '#1a1a2e',
        padding: '1.5rem',
        borderRadius: '10px',
        marginBottom: '2rem',
    },
    formTitle: { color: '#e94560', marginBottom: '1rem' },
    field: { marginBottom: '1rem' },
    label: { display: 'block', color: '#aaa', marginBottom: '0.3rem' },
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
    btnPrimary: {
        padding: '0.75rem 1.5rem',
        backgroundColor: '#e94560',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    list: { display: 'flex', flexDirection: 'column', gap: '1rem' },
    card: {
        backgroundColor: '#1a1a2e',
        padding: '1.5rem',
        borderRadius: '10px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardTitle: { color: '#e94560', marginBottom: '0.5rem' },
    cardText: { color: '#aaa', fontSize: '0.9rem' },
    btnRow: { display: 'flex', gap: '1rem' },
    btnEdit: {
        padding: '0.5rem 1rem',
        backgroundColor: '#0f3460',
        color: 'white',
        border: '1px solid #e94560',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    btnDelete: {
        padding: '0.5rem 1rem',
        backgroundColor: '#e94560',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    }
};

export default ManageSkills;