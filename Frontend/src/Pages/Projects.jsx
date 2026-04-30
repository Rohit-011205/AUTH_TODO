// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import API from '../API.js';
// import useStore from '../store/useStore';

// const Projects = () => {
//     const navigate = useNavigate();
//     const { user, logout } = useStore();
//     const [projects, setProjects] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState('');
//     const [showForm, setShowForm] = useState(false);
//     const [formData, setFormData] = useState({ title: '', description: '' });

//     const fetchProjects = async () => {
//         setLoading(true);
//         try {
//             const { data } = await API.get('/projects/get');
//             setProjects(data.projects);
//         } catch (err) {
//             setError(err.response?.data?.message || 'Something went wrong');
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchProjects();
//     }, []);

//     const handleCreate = async (e) => {
//         e.preventDefault();
//         try {
//             await API.post('/projects/create', formData);
//             setFormData({ title: '', description: '' });
//             setShowForm(false);
//             fetchProjects();
//         } catch (err) {
//             setError(err.response?.data?.message || 'Something went wrong');
//         }
//     };

//     const handleDelete = async (id) => {
//         try {
//             await API.delete(`/projects/delete/${id}`);
//             fetchProjects();
//         } catch (err) {
//             setError(err.response?.data?.message || 'Something went wrong');
//         }
//     };

//     const handleLogout = () => {
//         logout();
//         navigate('/login');
//     };

//     return (
//         <div className="min-h-screen bg-gray-950 text-white">

//             {/* Navbar */}
//             <div className="bg-gray-900 px-6 py-4 flex justify-between items-center shadow">
//                 <h1 className="text-xl font-bold text-blue-400">TaskManager</h1>
//                 <div className="flex items-center gap-4">
//                     <span className="text-gray-400 text-sm">Hey, {user?.name}</span>
//                     <button
//                         onClick={handleLogout}
//                         className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded-lg transition"
//                     >
//                         Logout
//                     </button>
//                 </div>
//             </div>

//             <div className="max-w-4xl mx-auto px-6 py-8">

//                 {/* Header */}
//                 <div className="flex justify-between items-center mb-6">
//                     <h2 className="text-2xl font-bold">My Projects</h2>
//                     <button
//                         onClick={() => setShowForm(!showForm)}
//                         className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
//                     >
//                         {showForm ? 'Cancel' : '+ New Project'}
//                     </button>
//                 </div>

//                 {/* Error */}
//                 {error && (
//                     <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-lg mb-4 text-sm">
//                         {error}
//                     </div>
//                 )}

//                 {/* Create Form */}
//                 {showForm && (
//                     <form onSubmit={handleCreate} className="bg-gray-900 rounded-xl p-6 mb-6 space-y-4">
//                         <div>
//                             <label className="text-gray-400 text-sm mb-1 block">Title</label>
//                             <input
//                                 type="text"
//                                 value={formData.title}
//                                 onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//                                 placeholder="Project title"
//                                 className="w-full bg-gray-800 text-white rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//                                 required
//                             />
//                         </div>
//                         <div>
//                             <label className="text-gray-400 text-sm mb-1 block">Description</label>
//                             <textarea
//                                 value={formData.description}
//                                 onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//                                 placeholder="Project description"
//                                 rows={3}
//                                 className="w-full bg-gray-800 text-white rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//                             />
//                         </div>
//                         <button
//                             type="submit"
//                             className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
//                         >
//                             Create Project
//                         </button>
//                     </form>
//                 )}

//                 {/* Loading */}
//                 {loading && (
//                     <div className="text-center text-gray-400 py-10">Loading projects...</div>
//                 )}

//                 {/* Projects List */}
//                 {!loading && projects.length === 0 && (
//                     <div className="text-center text-gray-500 py-10">
//                         No projects yet. Create one!
//                     </div>
//                 )}

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     {projects.map((project) => (
//                         <div
//                             key={project._id}
//                             className="bg-gray-900 rounded-xl p-6 hover:ring-2 hover:ring-blue-500 transition cursor-pointer"
//                         >
//                             <div className="flex justify-between items-start">
//                                 <div onClick={() => navigate(`/tasks/${project._id}/tasks`)} className="flex-1">
//                                     <h3 className="text-lg font-semibold text-white">{project.title}</h3>
//                                     <p className="text-gray-400 text-sm mt-1">{project.description}</p>
//                                 </div>
//                                 <button
//                                     onClick={() => handleDelete(project._id)}
//                                     className="text-red-400 hover:text-red-500 text-sm ml-4"
//                                 >
//                                     Delete
//                                 </button>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Projects;


// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Plus, Trash2, Folder, LogOut, LayoutGrid, Clock } from 'lucide-react'; // Added icons
// import API from '../API.js';
// import useStore from '../Store/useStore.js';

// const Projects = () => {
//     const navigate = useNavigate();
//     const { user, logout } = useStore();
//     const [projects, setProjects] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState('');
//     const [showForm, setShowForm] = useState(false);
//     const [formData, setFormData] = useState({ title: '', description: '' });

//     const fetchProjects = async () => {
//         setLoading(true);
//         try {
//             const { data } = await API.get('/projects/get');
//             setProjects(data.projects);
//         } catch (err) {
//             setError(err.response?.data?.message || 'Something went wrong');
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchProjects();
//     }, []);

//     const handleCreate = async (e) => {
//         e.preventDefault();
//         try {
//             await API.post('/projects/create', formData);
//             setFormData({ title: '', description: '' });
//             setShowForm(false);
//             fetchProjects();
//         } catch (err) {
//             setError(err.response?.data?.message || 'Something went wrong');
//         }
//     };

//     const handleDelete = async (e, id) => {
//         e.stopPropagation(); // Prevents navigating to tasks when clicking delete
//         try {
//             await API.delete(`/projects/delete/${id}`);
//             fetchProjects();
//         } catch (err) {
//             setError(err.response?.data?.message || 'Something went wrong');
//         }
//     };

//     const handleLogout = () => {
//         logout();
//         navigate('/login');
//     };

//     return (
//         <div className="min-h-screen bg-[#050505] text-slate-200 selection:bg-blue-500/30">
//             {/* Soft Background Glows */}
//             <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
//                 <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[120px]" />
//                 <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/10 blur-[120px]" />
//             </div>

//             {/* Navbar */}
//             <nav className="sticky top-0 z-50 border-b border-white/5 bg-black/60 backdrop-blur-xl px-8 py-4">
//                 <div className="max-w-6xl mx-auto flex justify-between items-center">
//                     <div className="flex items-center gap-2">
//                         <div className="bg-blue-600 p-1.5 rounded-lg">
//                             <LayoutGrid size={20} className="text-white" />
//                         </div>
//                         <h1 className="text-xl font-bold tracking-tight text-white">Task<span className="text-blue-500">Flow</span></h1>
//                     </div>
                    
//                     <div className="flex items-center gap-6">
//                         <div className="text-right hidden sm:block">
//                             <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Welcome back</p>
//                             <p className="text-sm font-semibold text-slate-200">{user?.name}</p>
//                         </div>
//                         <button
//                             onClick={handleLogout}
//                             className="group flex items-center gap-2 bg-white/5 hover:bg-red-500/10 border border-white/10 hover:border-red-500/50 px-4 py-2 rounded-xl transition-all duration-300"
//                         >
//                             <LogOut size={16} className="group-hover:text-red-500" />
//                             <span className="text-sm font-medium group-hover:text-red-500">Logout</span>
//                         </button>
//                     </div>
//                 </div>
//             </nav>

//             <main className="relative max-w-5xl mx-auto px-6 py-12">
//                 {/* Header Section */}
//                 <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
//                     <div>
//                         <h2 className="text-4xl font-extrabold text-white tracking-tight">Workspace</h2>
//                         <p className="text-slate-400 mt-2">Manage your projects and team productivity.</p>
//                     </div>
//                     <button
//                         onClick={() => setShowForm(!showForm)}
//                         className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all duration-300 shadow-lg shadow-blue-600/20 ${
//                             showForm ? 'bg-slate-800 text-white' : 'bg-blue-600 hover:bg-blue-500 text-white hover:-translate-y-1'
//                         }`}
//                     >
//                         {showForm ? 'Cancel' : <><Plus size={20} /> Create Project</>}
//                     </button>
//                 </div>

//                 {/* Create Form - Animated style */}
//                 {showForm && (
//                     <div className="mb-12 p-8 rounded-3xl bg-gradient-to-b from-slate-900 to-black border border-white/10 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-500">
//                         <form onSubmit={handleCreate} className="space-y-6">
//                             <div className="grid grid-cols-1 gap-6">
//                                 <div>
//                                     <label className="text-sm font-semibold text-slate-300 ml-1">Project Title</label>
//                                     <input
//                                         type="text"
//                                         value={formData.title}
//                                         onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//                                         placeholder="e.g. Website Redesign"
//                                         className="w-full mt-2 bg-white/5 border border-white/10 text-white rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
//                                         required
//                                     />
//                                 </div>
//                                 <div>
//                                     <label className="text-sm font-semibold text-slate-300 ml-1">Description</label>
//                                     <textarea
//                                         value={formData.description}
//                                         onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//                                         placeholder="What is this project about?"
//                                         rows={3}
//                                         className="w-full mt-2 bg-white/5 border border-white/10 text-white rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
//                                     />
//                                 </div>
//                             </div>
//                             <button type="submit" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-bold px-10 py-4 rounded-2xl transition-all shadow-lg shadow-blue-600/20">
//                                 Launch Project
//                             </button>
//                         </form>
//                     </div>
//                 )}

//                 {/* Error State */}
//                 {error && (
//                     <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-6 py-4 rounded-2xl mb-8 flex items-center gap-3">
//                         <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
//                         {error}
//                     </div>
//                 )}

//                 {/* Projects Grid */}
//                 {loading ? (
//                     <div className="flex flex-col items-center justify-center py-20 gap-4">
//                         <div className="w-10 h-10 border-4 border-blue-600/30 border-t-blue-600 rounded-full animate-spin" />
//                         <p className="text-slate-400 font-medium">Synchronizing workspace...</p>
//                     </div>
//                 ) : projects.length === 0 ? (
//                     <div className="text-center py-20 rounded-3xl border-2 border-dashed border-white/5 bg-white/[0.02]">
//                         <div className="bg-slate-900 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
//                             <Folder className="text-slate-500" size={32} />
//                         </div>
//                         <h3 className="text-xl font-bold text-white">No projects found</h3>
//                         <p className="text-slate-500 mt-2">Get started by creating your first project.</p>
//                     </div>
//                 ) : (
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         {projects.map((project) => (
//                             <div
//                                 key={project._id}
//                                 onClick={() => navigate(`/tasks/${project._id}/tasks`)}
//                                 className="group relative bg-[#0f0f0f] border border-white/5 rounded-[2rem] p-8 hover:bg-[#141414] hover:border-blue-500/30 transition-all duration-500 cursor-pointer shadow-xl hover:-translate-y-1"
//                             >
//                                 <div className="absolute top-6 right-8 opacity-0 group-hover:opacity-100 transition-opacity">
//                                     <button
//                                         onClick={(e) => handleDelete(e, project._id)}
//                                         className="p-2.5 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all"
//                                     >
//                                         <Trash2 size={18} />
//                                     </button>
//                                 </div>

//                                 <div className="flex flex-col h-full">
//                                     <div className="bg-blue-600/10 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
//                                         <Folder size={24} className="text-blue-500" />
//                                     </div>
                                    
//                                     <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
//                                         {project.title}
//                                     </h3>
//                                     <p className="text-slate-400 mt-3 line-clamp-2 text-sm leading-relaxed flex-grow">
//                                         {project.description || "No description provided for this project."}
//                                     </p>

//                                     <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
//                                         <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-widest">
//                                             <Clock size={14} />
//                                             Active
//                                         </div>
//                                         <div className="text-blue-500 text-sm font-bold group-hover:translate-x-1 transition-transform">
//                                             View Tasks →
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 )}
//             </main>
//         </div>
//     );
// };

// export default Projects;

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
            {/* Elegant Top Border Glow */}
            <div className="h-1 bg-gradient-to-red from-emerald-500 via-teal-400 to-emerald-600 shadow-[0_0_15px_rgba(16,185,129,0.5)]" />

            {/* Navbar */}
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
                {/* Intro Header */}
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
                        className={`group relative overflow-hidden px-8 py-4 rounded-xl font-black uppercase tracking-widest text-xs transition-all duration-300 ${
                            showForm ? 'bg-zinc-800 text-zinc-400' : 'bg-white text-black hover:scale-105 active:scale-95'
                        }`}
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            {showForm ? 'Close Editor' : <><Plus size={18} strokeWidth={3} /> New Project</>}
                        </span>
                    </button>
                </header>

                {/* Inline Form - Sleek Design */}
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

                {/* Error Banner */}
                {error && (
                    <div className="mb-8 border-l-4 border-red-500 bg-red-500/10 p-4 text-red-400 text-sm font-bold">
                        {error}
                    </div>
                )}

                {/* Loading Grid */}
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
                                {/* Subtle Hover Background */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-[50px] group-hover:bg-emerald-500/10 transition-all" />

                                <div>
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="p-2 bg-zinc-800 rounded-lg text-zinc-400 group-hover:text-emerald-500 transition-colors">
                                            <Folder size={20} />
                                        </div>
                                        <button
                                            onClick={(e) =>  {e.stopPropagation() ;
                                                handleDelete(project._id)}}
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
                                        {/* Purely decorative 'user' bubbles */}
                                        <div className="w-6 h-6 rounded-full bg-zinc-700 border-2 border-[#16161a]" />
                                        <div className="w-6 h-6 rounded-full bg-zinc-800 border-2 border-[#16161a]" />
                                    </div>
                                    <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-emerald-500 group-hover:gap-2 transition-all">
                                        Enter <ChevronRight size={14} />
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Empty State Card */}
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