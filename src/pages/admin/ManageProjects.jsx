import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../api/axiosConfig';

function ManageProjects() {
    const [projects, setProjects] = useState([]);
    const [form, setForm] = useState({
        title: '', description: '', techStack: '',
        githubLink: '', liveLink: '', imageUrl: ''
    });
    const [editId, setEditId] = useState(null);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [showForm, setShowForm] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const res = await API.get('/api/projects');
            setProjects(res.data);
        } catch (err) {
            showMessage('Error fetching projects', 'error');
        }
    };

    const showMessage = (text, type) => {
        setMessage(text);
        setMessageType(type);
        setTimeout(() => setMessage(''), 3000);
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editId) {
                await API.put(`/api/projects/${editId}`, form);
                showMessage('✅ Project updated successfully!', 'success');
            } else {
                await API.post('/api/projects', form);
                showMessage('✅ Project added successfully!', 'success');
            }
            resetForm();
            fetchProjects();
        } catch (err) {
            showMessage('❌ Error saving project. Try again.', 'error');
        }
    };

    const handleEdit = (project) => {
        setEditId(project.id);
        setForm({
            title: project.title,
            description: project.description,
            techStack: project.techStack,
            githubLink: project.githubLink,
            liveLink: project.liveLink,
            imageUrl: project.imageUrl
        });
        setShowForm(true);
        // Scroll to top of form
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
                await API.delete(`/api/projects/${id}`);
                showMessage('🗑️ Project deleted successfully!', 'success');
                fetchProjects();
            } catch (err) {
                showMessage('❌ Error deleting project.', 'error');
            }
        }
    };

    const resetForm = () => {
        setForm({
            title: '', description: '', techStack: '',
            githubLink: '', liveLink: '', imageUrl: ''
        });
        setEditId(null);
        setShowForm(false);
    };

    const fields = [
        { name: 'title', label: 'Project Title', required: true },
        { name: 'description', label: 'Description', required: false },
        { name: 'techStack', label: 'Tech Stack (e.g. Java, React)', required: false },
        { name: 'githubLink', label: 'GitHub Link', required: false },
        { name: 'liveLink', label: 'Live Demo Link', required: false },
        { name: 'imageUrl', label: 'Image URL', required: false },
    ];

    return (
        <div style={styles.container}>

            {/* Header */}
            <div style={styles.header}>
                <div style={styles.headerLeft}>
                    <button
                        onClick={() => navigate('/admin/dashboard')}
                        style={styles.backBtn}>
                        ← Back to Dashboard
                    </button>
                    <h1 style={styles.title}>Manage Projects</h1>
                </div>
                <button
                    onClick={() => {
                        resetForm();
                        setShowForm(!showForm);
                    }}
                    style={styles.addBtn}>
                    {showForm ? '✕ Cancel' : '+ Add New Project'}
                </button>
            </div>

            {/* Message Toast */}
            {message && (
                <div style={{
                    ...styles.toast,
                    backgroundColor: messageType === 'success'
                        ? '#1a3a1a' : '#3a1a1a',
                    borderLeft: messageType === 'success'
                        ? '4px solid #4caf50' : '4px solid #e94560',
                }}>
                    {message}
                </div>
            )}

            {/* Add/Edit Form */}
            {showForm && (
                <div style={styles.formCard}>
                    <h2 style={styles.formTitle}>
                        {editId
                            ? `✏️ Editing: ${form.title || 'Project'}`
                            : '➕ Add New Project'}
                    </h2>

                    {editId && (
                        <div style={styles.editBanner}>
                            You are editing an existing project.
                            <button
                                onClick={resetForm}
                                style={styles.cancelEditBtn}>
                                Cancel Edit
                            </button>
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div style={styles.formGrid}>
                            {fields.map((field) => (
                                <div
                                    key={field.name}
                                    style={field.name === 'description'
                                        ? styles.fullWidth : styles.field}>
                                    <label style={styles.label}>
                                        {field.label}
                                        {field.required && (
                                            <span style={styles.required}>
                                                *
                                            </span>
                                        )}
                                    </label>
                                    {field.name === 'description' ? (
                                        <textarea
                                            name={field.name}
                                            value={form[field.name]}
                                            onChange={handleChange}
                                            style={{
                                                ...styles.input,
                                                height: '100px',
                                                resize: 'vertical'
                                            }}
                                            placeholder={`Enter ${field.label}`}
                                        />
                                    ) : (
                                        <input
                                            name={field.name}
                                            value={form[field.name]}
                                            onChange={handleChange}
                                            style={styles.input}
                                            placeholder={`Enter ${field.label}`}
                                            required={field.required}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>

                        <div style={styles.btnRow}>
                            <button
                                type="submit"
                                style={styles.btnPrimary}>
                                {editId
                                    ? '💾 Update Project'
                                    : '➕ Add Project'}
                            </button>
                            <button
                                type="button"
                                onClick={resetForm}
                                style={styles.btnSecondary}>
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Projects Count */}
            <p style={styles.count}>
                Total Projects: {projects.length}
            </p>

            {/* Projects List */}
            {projects.length === 0 ? (
                <div style={styles.emptyState}>
                    <p>No projects yet. Click "Add New Project" to get started!</p>
                </div>
            ) : (
                <div style={styles.list}>
                    {projects.map((project) => (
                        <div key={project.id} style={styles.card}>
                            <div style={styles.cardLeft}>
                                <div style={styles.cardId}>#{project.id}</div>
                                <div>
                                    <h3 style={styles.cardTitle}>
                                        {project.title}
                                    </h3>
                                    <p style={styles.cardText}>
                                        {project.description}
                                    </p>
                                    {project.techStack && (
                                        <div style={styles.tags}>
                                            {project.techStack
                                                .split(',')
                                                .map((tech, i) => (
                                                    <span
                                                        key={i}
                                                        style={styles.tag}>
                                                        {tech.trim()}
                                                    </span>
                                                ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div style={styles.cardActions}>
                                <button
                                    onClick={() => handleEdit(project)}
                                    style={styles.btnEdit}>
                                    ✏️ Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(project.id)}
                                    style={styles.btnDelete}>
                                    🗑️ Delete
                                </button>
                            </div>
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
        backgroundColor: '#070720',
        minHeight: '90vh',
        color: 'white',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '1.5rem',
        borderBottom: '1px solid #1a1a3e',
        paddingBottom: '1.5rem',
    },
    headerLeft: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
    },
    backBtn: {
        background: 'transparent',
        color: '#aaa',
        border: '1px solid #333',
        padding: '0.4rem 1rem',
        borderRadius: '20px',
        cursor: 'pointer',
        fontSize: '0.85rem',
        width: 'fit-content',
    },
    title: {
        fontSize: '2rem',
        color: '#e94560',
        margin: 0,
    },
    addBtn: {
        backgroundColor: '#e94560',
        color: 'white',
        border: 'none',
        padding: '0.6rem 1.5rem',
        borderRadius: '20px',
        cursor: 'pointer',
        fontSize: '0.95rem',
        fontWeight: '500',
    },
    toast: {
        padding: '0.85rem 1.25rem',
        borderRadius: '8px',
        marginBottom: '1.5rem',
        color: 'white',
        fontSize: '0.95rem',
    },
    formCard: {
        backgroundColor: '#1a1a2e',
        padding: '1.5rem',
        borderRadius: '12px',
        marginBottom: '2rem',
        border: '1px solid #2a2a4e',
    },
    formTitle: {
        color: '#e94560',
        marginBottom: '1rem',
        fontSize: '1.2rem',
    },
    editBanner: {
        backgroundColor: '#2a2a0e',
        border: '1px solid #e9a020',
        color: '#e9a020',
        padding: '0.6rem 1rem',
        borderRadius: '8px',
        marginBottom: '1rem',
        fontSize: '0.9rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cancelEditBtn: {
        background: 'transparent',
        color: '#e9a020',
        border: '1px solid #e9a020',
        padding: '0.2rem 0.75rem',
        borderRadius: '20px',
        cursor: 'pointer',
        fontSize: '0.8rem',
    },
    formGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1rem',
    },
    field: {},
    fullWidth: {
        gridColumn: '1 / -1',
    },
    label: {
        display: 'block',
        color: '#aaa',
        marginBottom: '0.4rem',
        fontSize: '0.85rem',
    },
    required: {
        color: '#e94560',
        marginLeft: '3px',
    },
    input: {
        width: '100%',
        padding: '0.7rem 1rem',
        borderRadius: '8px',
        border: '1px solid #2a2a4e',
        backgroundColor: '#070720',
        color: 'white',
        fontSize: '0.95rem',
        boxSizing: 'border-box',
        outline: 'none',
    },
    btnRow: {
        display: 'flex',
        gap: '1rem',
        marginTop: '1.5rem',
    },
    btnPrimary: {
        padding: '0.7rem 1.5rem',
        backgroundColor: '#e94560',
        color: 'white',
        border: 'none',
        borderRadius: '20px',
        cursor: 'pointer',
        fontSize: '0.95rem',
        fontWeight: '500',
    },
    btnSecondary: {
        padding: '0.7rem 1.5rem',
        backgroundColor: 'transparent',
        color: '#aaa',
        border: '1px solid #333',
        borderRadius: '20px',
        cursor: 'pointer',
        fontSize: '0.95rem',
    },
    count: {
        color: '#888',
        fontSize: '0.9rem',
        marginBottom: '1rem',
    },
    emptyState: {
        backgroundColor: '#1a1a2e',
        padding: '3rem',
        borderRadius: '12px',
        textAlign: 'center',
        color: '#888',
    },
    list: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    },
    card: {
        backgroundColor: '#1a1a2e',
        padding: '1.5rem',
        borderRadius: '12px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        border: '1px solid #2a2a4e',
        gap: '1rem',
    },
    cardLeft: {
        display: 'flex',
        gap: '1rem',
        alignItems: 'flex-start',
        flex: 1,
    },
    cardId: {
        backgroundColor: '#0f3460',
        color: '#e94560',
        padding: '0.3rem 0.6rem',
        borderRadius: '6px',
        fontSize: '0.8rem',
        whiteSpace: 'nowrap',
    },
    cardTitle: {
        color: 'white',
        margin: '0 0 0.4rem',
        fontSize: '1rem',
    },
    cardText: {
        color: '#888',
        fontSize: '0.85rem',
        margin: '0 0 0.5rem',
    },
    tags: {
        display: 'flex',
        gap: '0.4rem',
        flexWrap: 'wrap',
    },
    tag: {
        backgroundColor: '#0f3460',
        color: '#e94560',
        padding: '0.2rem 0.6rem',
        borderRadius: '20px',
        fontSize: '0.75rem',
    },
    cardActions: {
        display: 'flex',
        gap: '0.5rem',
        flexShrink: 0,
    },
    btnEdit: {
        padding: '0.5rem 1rem',
        backgroundColor: 'transparent',
        color: 'white',
        border: '1px solid #2a2a4e',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '0.85rem',
    },
    btnDelete: {
        padding: '0.5rem 1rem',
        backgroundColor: '#3a1a1a',
        color: '#e94560',
        border: '1px solid #e94560',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '0.85rem',
    },
};

export default ManageProjects;