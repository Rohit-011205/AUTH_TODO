import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, Folder, LogOut, ChevronRight, Hash, Activity } from 'lucide-react';
import API from '../API.js';
import useStore from '../Store/useStore.js';

const Projects = () => {
    const navigate = useNavigate();
    const { user, logout } = useStore();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ title: '', description: '' });

    const fetchProjects = async () => {
        setLoading(true);
        try {
            const { data } = await API.get('/projects/get');
            setProjects(data.projects || []);
            setProjects(data.projects);
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await API.post('/projects/create', formData);
            setFormData({ title: '', description: '' });
            setShowForm(false);
            fetchProjects();
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong');
        }
    };

    const handleDelete = async (id) => {
        try {
            await API.delete(`/projects/delete/${id}`);
            fetchProjects();
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong');
        }
    };

    const handleLogout = () => {
        const confirm = window.confirm("Are you sure you want to exit?");
        if (confirm) {
            logout();
            navigate('/login');
        }
    };

    return (
        <div className="min-h-screen bg-[#0c0c0e] text-[#d4d4d8] font-sans selection:bg-emerald-500/30">

            <div className="h-1 bg-gradient-to-red from-emerald-500 via-teal-400 to-emerald-600 shadow-[0_0_15px_rgba(16,185,129,0.5)]" />

            <nav className="border-b border-zinc-800/50 bg-[#0c0c0e]/80 backdrop-blur-md px-6 py-3 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-emerald-500 rounded-md flex items-center justify-center rotate-3">
                            <Hash size={18} className="text-[#0c0c0e] font-bold" />
                        </div>
                        <h1 className="text-lg font-black tracking-tighter text-white uppercase italic">Task.Base</h1>
                    </div>

                    <div className="flex items-center gap-5">
                        <div className="hidden sm:flex flex-col items-end leading-none">
                            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-1">Authenticated</span>
                            <span className="text-sm font-medium text-zinc-200">{user?.name}</span>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-4 py-2 rounded-lg text-xs font-bold transition-all border border-zinc-700"
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            </nav>

            <main className="max-w-6xl mx-auto px-6 py-12">

                <header className="mb-16 flex flex-col md:flex-row md:items-center justify-between gap-8">
                    <div>
                        <div className="flex items-center gap-2 text-emerald-500 mb-2">
                            <Activity size={16} />
                            <span className="text-xs font-black uppercase tracking-[0.2em]">Overview</span>
                        </div>
                        <h2 className="text-5xl font-extrabold text-white tracking-tight">Your Projects</h2>
                    </div>
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className={`group relative overflow-hidden px-8 py-4 rounded-xl font-black uppercase tracking-widest text-xs transition-all duration-300 ${showForm ? 'bg-zinc-800 text-zinc-400' : 'bg-white text-black hover:scale-105 active:scale-95'
                            }`}
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            {showForm ? 'Close Editor' : <><Plus size={18} strokeWidth={3} /> New Project</>}
                        </span>
                    </button>
                </header>


                {showForm && (
                    <div className="mb-16 bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 animate-in fade-in zoom-in duration-300">
                        <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2 md:col-span-1">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">Title</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    placeholder="Project Name..."
                                    className="w-full bg-[#0c0c0e] border border-zinc-800 text-white rounded-xl px-4 py-4 outline-none focus:border-emerald-500 transition-colors"
                                    required
                                />
                            </div>
                            <div className="space-y-2 md:col-span-1">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">Context</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="Short description..."
                                    rows={1}
                                    className="w-full bg-[#0c0c0e] border border-zinc-800 text-white rounded-xl px-4 py-4 outline-none focus:border-emerald-500 transition-colors"
                                />
                            </div>
                            <button type="submit" className="md:col-span-2 bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase tracking-widest py-4 rounded-xl transition-all">
                                Initialize Project
                            </button>
                        </form>
                    </div>
                )}

                {error && (
                    <div className="mb-8 border-l-4 border-red-500 bg-red-500/10 p-4 text-red-400 text-sm font-bold">
                        {error}
                    </div>
                )}


                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-50">
                        {[1, 2, 3].map(i => <div key={i} className="h-48 bg-zinc-900 rounded-2xl animate-pulse" />)}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.map((project) => (
                            <div
                                key={project._id}
                                onClick={() => navigate(`/tasks/${project._id}/tasks`)}
                                className="group bg-[#16161a] border border-zinc-800 rounded-2xl p-6 flex flex-col justify-between hover:border-emerald-500/50 transition-all duration-300 cursor-pointer relative overflow-hidden"
                            >

                                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-[50px] group-hover:bg-emerald-500/10 transition-all" />

                                <div>
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="p-2 bg-zinc-800 rounded-lg text-zinc-400 group-hover:text-emerald-500 transition-colors">
                                            <Folder size={20} />
                                        </div>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDelete(project._id)
                                            }}
                                            className="z-40 opacity-100 p-2 text-zinc-600"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2 leading-tight tracking-tight group-hover:translate-x-1 transition-transform">
                                        {project.title}
                                    </h3>
                                    <p className="text-zinc-500 text-sm line-clamp-2 leading-relaxed">
                                        {project.description || "No description provided."}
                                    </p>
                                </div>

                                <div className="mt-8 flex items-center justify-between">
                                    <div className="flex -space-x-2">

                                        <div className="w-6 h-6 rounded-full bg-zinc-700 border-2 border-[#16161a]" />
                                        <div className="w-6 h-6 rounded-full bg-zinc-800 border-2 border-[#16161a]" />
                                    </div>
                                    <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-emerald-500 group-hover:gap-2 transition-all">
                                        Enter <ChevronRight size={14} />
                                    </div>
                                </div>
                            </div>
                        ))}

                        {!loading && projects.length === 0 && (
                            <div className="md:col-span-full py-20 border-2 border-dashed border-zinc-800 rounded-3xl text-center">
                                <p className="text-zinc-400 mt-2">Start  creating a new objective.</p>
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
};

export default Projects;