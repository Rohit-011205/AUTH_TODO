// import React from 'react'
// import useStore from '../store/useStore.js'
// import { useNavigate } from 'react-router-dom'
// import { useEffect } from 'react'
// import { useState } from 'react'
// import { useParams } from 'react-router-dom'
// import API from '../API.js'

// const Task = () => {
//     const navigate = useNavigate()
//     const { user } = useStore()
//     const { ProjectId } = useParams()
//     const [tasks, setTasks] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState('');
//     const [showForm, setShowForm] = useState(false)
//     const [formData, setFormData] = useState({ title: '', description: '', dueDate: '' });

//     const fetchTasks = async () => {
//         setLoading(true);
//         try {
//             const { data } = await API.get(`/tasks/get/${ProjectId}`);
//             setTasks(data.tasks);
//         } catch (err) {
//             setError(err.response?.data?.message || 'Something went wrong');
//         } finally {
//             setLoading(false);
//         }
//     }

//     useEffect(() => {
//         fetchTasks();
//     }, [ProjectId]);

//     const handleCreate = async (e) => {
//         e.preventDefault();
//         try {
//             await API.post(`/tasks/create/${ProjectId}`, formData);
//             setFormData({ title: '', description: '', dueDate: '' });
//             setShowForm(false);
//             fetchTasks();
//         } catch (err) {
//             setError(err.response?.data?.message || 'Something went wrong');
//         }
//     };

//     const handleStatusToggle = async (task, newStatus) => {
//         try {
//             await API.put(`/tasks/update/${task._id}/status`, { status: newStatus });
//             fetchTasks();
//         } catch (err) {
//             setError(err.response?.data?.message || 'Something went wrong');
//         }
//     };

//     const handleDelete = async (id) => {
//         try {
//             await API.delete(`/tasks/delete/${id}`);
//             fetchTasks();
//         } catch (err) {
//             setError(err.response?.data?.message || 'Something went wrong');
//         }
//     };

//     return (
//         <div className="min-h-screen bg-gray-950 text-white">

//             {/* Navbar */}
//             <div className="bg-gray-900 px-6 py-4 flex justify-between items-center shadow">
//                 <h1 className="text-xl font-bold text-blue-400">TaskManager</h1>
//                 <button
//                     onClick={() => navigate('/projects')}
//                     className="text-gray-400 hover:text-white text-sm transition"
//                 >
//                     ← Back to Projects
//                 </button>
//             </div>

//             <div className="max-w-4xl mx-auto px-6 py-8">

//                 {/* Header */}
//                 <div className="flex justify-between items-center mb-6">
//                     <h2 className="text-2xl font-bold">Tasks</h2>
//                     <button
//                         onClick={() => setShowForm(!showForm)}
//                         className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
//                     >
//                         {showForm ? 'Cancel' : '+ New Task'}
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
//                                 placeholder="Task title"
//                                 className="w-full bg-gray-800 text-white rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//                                 required
//                             />
//                         </div>
//                         <div>
//                             <label className="text-gray-400 text-sm mb-1 block">Description</label>
//                             <textarea
//                                 value={formData.description}
//                                 onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//                                 placeholder="Task description (optional)"
//                                 rows={3}
//                                 className="w-full bg-gray-800 text-white rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//                             />
//                         </div>
//                         <div>
//                             <label className="text-gray-400 text-sm mb-1 block">Due Date (optional)</label>
//                             <input
//                                 type="date"
//                                 value={formData.dueDate}
//                                 onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
//                                 className="w-full bg-gray-800 text-white rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
//                             />
//                         </div>
//                         <button
//                             type="submit"
//                             className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
//                         >
//                             Create Task
//                         </button>
//                     </form>
//                 )}

//                 {/* Loading */}
//                 {loading && (
//                     <div className="text-center text-gray-400 py-10">Loading tasks...</div>
//                 )}

//                 {/* Empty */}
//                 {!loading && tasks.length === 0 && (
//                     <div className="text-center text-gray-500 py-10">
//                         No tasks yet. Create one!
//                     </div>
//                 )}

//                 {/* Tasks List */}
//                 <div className="space-y-3">
//                     {tasks.map((task) => (
//                         <div
//                             key={task._id}
//                             className="bg-gray-900 rounded-xl px-6 py-4 flex justify-between items-center"
//                         >
//                             <div className="flex items-center gap-4">
//                                 {/* Checkbox toggle */}
//                                 <select
//     value={task.status}
//     onChange={(e) => handleStatusToggle(task, e.target.value)}
//     className="bg-gray-800 text-white text-xs px-2 py-1 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
// >
//     <option value="pending">Pending</option>
//     <option value="in-progress">In Progress</option>
//     <option value="completed">Completed</option>
// </select>
//                                 <div>
//                                     <p className={`font-medium ${task.status === 'completed' ? 'line-through text-gray-500' : 'text-white'}`}>
//                                         {task.title}
//                                     </p>
//                                     {task.description && (
//                                         <p className="text-gray-400 text-sm">{task.description}</p>
//                                     )}
//                                     {task.dueDate && (
//                                         <p className="text-gray-500 text-xs mt-1">
//                                             Due: {new Date(task.dueDate).toLocaleDateString()}
//                                         </p>
//                                     )}
//                                 </div>
//                             </div>

//                             <div className="flex items-center gap-3">
//                                 <span className={`text-xs px-2 py-1 rounded-full ${task.status === 'completed'
//                                     ? 'bg-green-500/10 text-green-400'
//                                     : task.status === 'in-progress'
//                                         ? 'bg-yellow-500/10 text-yellow-400'
//                                         : 'bg-gray-700 text-gray-400'
//                                     }`}>
//                                     {task.status}
//                                 </span>
//                                 <button
//                                     onClick={() => handleDelete(task._id)}
//                                     className="text-red-400 hover:text-red-500 text-sm transition"
//                                 >
//                                     Delete
//                                 </button>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Task


import React, { useState, useEffect } from 'react';
import useStore from '../Store/useStore.js';
import { useNavigate, useParams } from 'react-router-dom';
import { 
    Plus, 
    Trash2, 
    ArrowLeft, 
    CheckCircle2, 
    Circle, 
    Clock, 
    Calendar, 
    Activity,
    Terminal
} from 'lucide-react';
import API from '../API.js';

const Task = () => {
    const navigate = useNavigate();
    const { user } = useStore();
    const { ProjectId } = useParams();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ title: '', description: '', dueDate: '' });

    const fetchTasks = async () => {
        setLoading(true);
        try {
            const { data } = await API.get(`/tasks/get/${ProjectId}`);
            setTasks(data.tasks);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to sync tasks');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [ProjectId]);

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await API.post(`/tasks/create/${ProjectId}`, formData);
            setFormData({ title: '', description: '', dueDate: '' });
            setShowForm(false);
            fetchTasks();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to initialize task');
        }
    };

    const handleStatusToggle = async (task, newStatus) => {
        try {
            await API.put(`/tasks/update/${task._id}/status`, { status: newStatus });
            fetchTasks();
        } catch (err) {
            setError('Update failed');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Terminate this task?")) return;
        try {
            await API.delete(`/tasks/delete/${id}`);
            fetchTasks();
        } catch (err) {
            setError('Termination failed');
        }
    };

    return (
        <div className="min-h-screen bg-[#0c0c0e] text-[#d4d4d8] font-sans selection:bg-emerald-500/30">
            {/* Top Border Glow */}
            <div className="h-px bg-gradient-to-red from-transparent via-emerald-500 to-transparent opacity-50" />

            {/* Navbar */}
            <nav className="border-b border-zinc-800/50 bg-[#0c0c0e]/80 backdrop-blur-md px-6 py-3 sticky top-0 z-50">
                <div className="max-w-7xl mt-4 mx-auto flex justify-between items-center">
                    <button 
                        onClick={() => navigate('/projects')}
                        className="group flex items-center gap-2 text-xs font-black uppercase tracking-widest text-zinc-500 hover:text-white transition-all"
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                       BACK TO PROJECT
                    </button>
                    
                    
                </div>
            </nav>

            <main className="max-w-5xl mx-auto px-6 py-12">
                {/* Header */}
                <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-2 text-emerald-500 mb-2">
                            <Activity size={14} />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Active Session</span>
                        </div>
                        <h2 className="text-4xl font-extrabold text-white tracking-tighter">Project Execution</h2>
                    </div>
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className={`group relative flex items-center gap-2 px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all border ${
                            showForm 
                            ? 'bg-zinc-900 border-zinc-700 text-zinc-500' 
                            : 'bg-emerald-500 border-emerald-500 text-black hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                        }`}
                    >
                        {showForm ? 'Abort' : <><Plus size={14} strokeWidth={3} /> Add Task</>}
                    </button>
                </header>

                {/* Create Form */}
                {showForm && (
                    <div className="mb-12 bg-zinc-900/30 border border-zinc-800 rounded-2xl p-8 animate-in fade-in slide-in-from-top-4 duration-500">
                        <form onSubmit={handleCreate} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Task Title</label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full bg-black border border-zinc-800 text-white rounded-xl px-4 py-4 focus:border-emerald-500 outline-none transition-all"
                                        placeholder="Define objective..."
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Deadline</label>
                                    <input
                                        type="date"
                                        value={formData.dueDate}
                                        onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                                        className="w-full bg-black border border-zinc-800 text-white rounded-xl px-4 py-4 focus:border-emerald-500 outline-none transition-all color-scheme-dark"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Operational Details</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full bg-black border border-zinc-800 text-white rounded-xl px-4 py-4 focus:border-emerald-500 outline-none transition-all"
                                    placeholder="Technical description (optional)..."
                                    rows={2}
                                />
                            </div>
                            <button type="submit" className="w-full bg-white hover:bg-emerald-500 text-black font-black uppercase tracking-[0.3em] py-4 rounded-xl transition-all">
                                Deploy Task
                            </button>
                        </form>
                    </div>
                )}

                {/* Error Banner */}
                {error && (
                    <div className="mb-8 border-l-2 border-red-500 bg-red-500/5 p-4 text-red-400 text-xs font-bold uppercase tracking-widest">
                        Error: {error}
                    </div>
                )}

                {/* Tasks List */}
                <div className="space-y-4">
                    {loading ? (
                        [1,2,3].map(i => <div key={i} className="h-20 bg-zinc-900/50 rounded-2xl animate-pulse" />)
                    ) : tasks.length === 0 ? (
                        <div className="text-center py-20 border border-dashed border-zinc-800 rounded-3xl">
                            <p className="text-zinc-600 font-black uppercase tracking-widest text-xs">No Data Strings Found</p>
                        </div>
                    ) : (
                        tasks.map((task) => (
                            <div
                                key={task._id}
                                className={`group relative bg-[#111113] border transition-all duration-300 rounded-2xl px-6 py-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 ${
                                    task.status === 'completed' ? 'border-zinc-800 opacity-60' : 'border-zinc-800/50 hover:border-emerald-500/30 shadow-xl'
                                }`}
                            >
                                <div className="flex items-start gap-5">
                                    <div className="mt-1">
                                        <select
                                            value={task.status}
                                            onChange={(e) => handleStatusToggle(task, e.target.value)}
                                            className="appearance-none bg-zinc-800 border border-zinc-700 text-emerald-500 text-[10px] font-black px-3 py-1 rounded-full outline-none hover:bg-zinc-700 cursor-pointer transition-colors uppercase tracking-widest"
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="in-progress">In Progress</option>
                                            <option value="completed">Completed</option>
                                        </select>
                                    </div>
                                    
                                    <div>
                                        <p className={`text-lg font-bold tracking-tight transition-all ${
                                            task.status === 'completed' ? 'line-through text-zinc-600' : 'text-white'
                                        }`}>
                                            {task.title}
                                        </p>
                                        {task.description && (
                                            <p className="text-zinc-500 text-sm mt-1 font-medium">{task.description}</p>
                                        )}
                                        {task.dueDate && (
                                            <div className="flex items-center gap-2 text-zinc-600 text-[10px] font-bold uppercase mt-3">
                                                <Calendar size={12} />
                                                Target: {new Date(task.dueDate).toLocaleDateString()}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center gap-6 w-full md:w-auto justify-between border-t md:border-t-0 border-zinc-800/50 pt-4 md:pt-0">
                                    <div className="flex items-center gap-2">
                                        {task.status === 'completed' ? (
                                            <div className="flex items-center gap-1.5 text-emerald-500 text-[10px] font-black uppercase">
                                                <CheckCircle2 size={14} /> Success
                                            </div>
                                        ) : task.status === 'in-progress' ? (
                                            <div className="flex items-center gap-1.5 text-amber-500 text-[10px] font-black uppercase">
                                                <Clock size={14} className="animate-spin-slow" /> Running
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-1.5 text-zinc-500 text-[10px] font-black uppercase">
                                                <Circle size={14} /> Queued
                                            </div>
                                        )}
                                    </div>
                                    <button
                                        onClick={() => handleDelete(task._id)}
                                        className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-500/5 rounded-lg transition-all"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </main>

            <style dangerouslySetInnerHTML={{ __html: `
                .color-scheme-dark { color-scheme: dark; }
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin-slow { animation: spin-slow 3s linear infinite; }
            `}} />
        </div>
    );
};

export default Task;