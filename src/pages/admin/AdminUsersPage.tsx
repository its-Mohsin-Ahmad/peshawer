import React, { useState, useEffect } from 'react';
import {
  Users,
  Search,
  Plus,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Edit2,
  Trash2,
  Eye,
  Check,
  X,
  ExternalLink,
  Copy,
  MessageCircle,
  Filter,
} from 'lucide-react';
import { UserProfile } from '../../types/user';
import { userService } from '../../services/userService';

export const AdminUsersPage: React.FC = () => {
  const [users, setUsers] = useState<UserProfile[]>(() => userService.getAllUsers());
  const [search, setSearch] = useState('');
  const [providerFilter, setProviderFilter] = useState<'all' | 'google' | 'github' | 'email'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Modals
  const [viewUser, setViewUser] = useState<UserProfile | null>(null);
  const [editingUser, setEditingUser] = useState<UserProfile | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Add Client Form State
  const [newClient, setNewClient] = useState({
    fullName: '',
    email: '',
    phone: '+92 300 ',
    city: 'Peshawar',
    address: 'University Town, Peshawar',
    role: 'customer' as const,
  });

  // Keep synced with userService events
  useEffect(() => {
    const handleUpdate = () => {
      setUsers(userService.getAllUsers());
    };
    window.addEventListener('peshawer_users_updated', handleUpdate);
    return () => window.removeEventListener('peshawer_users_updated', handleUpdate);
  }, []);

  const handleCopyEmail = (email: string, id: string) => {
    navigator.clipboard.writeText(email);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDeleteUser = (id: string, name: string) => {
    if (confirm(`Are you sure you want to remove user "${name}" from the system?`)) {
      userService.deleteUser(id);
      setUsers(userService.getAllUsers());
    }
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;

    userService.updateUser(editingUser.id, editingUser);
    setUsers(userService.getAllUsers());
    setEditingUser(null);
  };

  const handleCreateClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClient.fullName.trim() || !newClient.email.trim()) return;

    userService.saveUser({
      id: `usr-${Date.now()}`,
      fullName: newClient.fullName.trim(),
      email: newClient.email.trim().toLowerCase(),
      phone: newClient.phone.trim(),
      city: newClient.city.trim() || 'Peshawar',
      address: newClient.address.trim() || 'Peshawar, KP',
      role: newClient.role,
      provider: 'email',
      createdAt: new Date().toISOString(),
      savedPropertyIds: [],
      ownedPropertyIds: [],
      status: 'active',
    });

    setUsers(userService.getAllUsers());
    setIsAddModalOpen(false);
    setNewClient({
      fullName: '',
      email: '',
      phone: '+92 300 ',
      city: 'Peshawar',
      address: 'University Town, Peshawar',
      role: 'customer',
    });
  };

  // Filter users
  const filteredUsers = users.filter((u) => {
    if (providerFilter !== 'all' && u.provider !== providerFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        u.fullName.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        (u.phone && u.phone.toLowerCase().includes(q)) ||
        (u.city && u.city.toLowerCase().includes(q)) ||
        (u.address && u.address.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const totalUsers = users.length;
  const googleUsers = users.filter((u) => u.provider === 'google').length;
  const githubUsers = users.filter((u) => u.provider === 'github').length;
  const emailUsers = users.filter((u) => u.provider === 'email' || !u.provider).length;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 1. Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-50 text-emerald-700">
              User Directory
            </span>
            <span className="text-xs text-gray-400">•</span>
            <span className="text-xs text-gray-500 font-semibold">{totalUsers} Active Profiles</span>
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl font-black text-[#022C22] tracking-tight">
            Registered Users & Clients
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] mt-1">
            Real-time synchronization of all authenticated users, Google & GitHub accounts, and clients.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-[#064E3B] hover:bg-[#022C22] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Client</span>
        </button>
      </div>

      {/* 2. KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Users */}
        <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Clients</span>
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-heading font-black text-[#022C22]">{totalUsers}</div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-1">Synchronized real-time</div>
        </div>

        {/* Google Logins */}
        <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Google Sign-Ins</span>
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              G
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-heading font-black text-[#022C22]">{googleUsers}</div>
          <div className="text-[11px] text-blue-600 font-semibold mt-1">Verified Gmail users</div>
        </div>

        {/* GitHub Logins */}
        <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">GitHub Sign-Ins</span>
            <div className="w-10 h-10 rounded-2xl bg-gray-100 text-gray-800 flex items-center justify-center">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-heading font-black text-[#022C22]">{githubUsers}</div>
          <div className="text-[11px] text-gray-600 font-semibold mt-1">Developer accounts</div>
        </div>

        {/* Email Accounts */}
        <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Email & Password</span>
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-heading font-black text-[#022C22]">{emailUsers}</div>
          <div className="text-[11px] text-amber-600 font-semibold mt-1">Direct registrations</div>
        </div>
      </div>

      {/* 3. Search and Filter Bar */}
      <div className="bg-white rounded-3xl p-4 border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, gmail, phone, city..."
            className="w-full pl-10 pr-4 py-2.5 bg-[#F8F7F2] rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#064E3B]"
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
          <Filter className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-xs text-gray-500 font-medium">Provider:</span>
          <select
            value={providerFilter}
            onChange={(e) => setProviderFilter(e.target.value as any)}
            className="text-xs font-semibold px-3 py-2 rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-[#064E3B]"
          >
            <option value="all">All Providers ({totalUsers})</option>
            <option value="google">Google ({googleUsers})</option>
            <option value="github">GitHub ({githubUsers})</option>
            <option value="email">Email ({emailUsers})</option>
          </select>
        </div>
      </div>

      {/* 4. Users Table */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 bg-[#FAF9F5] text-[11px] uppercase tracking-wider text-gray-500 font-bold">
                <th className="py-4 px-6">User / Client</th>
                <th className="py-4 px-6">Gmail / Email</th>
                <th className="py-4 px-6">Phone Number</th>
                <th className="py-4 px-6">Address & City</th>
                <th className="py-4 px-6">Auth Provider</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-400 font-medium">
                    No users found matching your search.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => {
                  const isGoogle = user.provider === 'google';
                  const isGithub = user.provider === 'github';

                  return (
                    <tr key={user.id} className="hover:bg-gray-50/70 transition-colors">
                      {/* Name & Avatar */}
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-full overflow-hidden bg-[#064E3B] text-[#D6A84F] font-bold text-xs flex items-center justify-center border-2 border-[#064E3B]/20 shrink-0 shadow-xs">
                            {user.avatarUrl ? (
                              <img src={user.avatarUrl} alt={user.fullName} className="w-full h-full object-cover" />
                            ) : (
                              <span>
                                {user.fullName
                                  .split(' ')
                                  .map((n) => n[0])
                                  .slice(0, 2)
                                  .join('')
                                  .toUpperCase()}
                              </span>
                            )}
                          </div>
                          <div>
                            <div className="font-heading font-black text-xs text-[#022C22]">{user.fullName}</div>
                            <div className="text-[10px] text-gray-400 capitalize">{user.role || 'Client'}</div>
                          </div>
                        </div>
                      </td>

                      {/* Gmail / Email */}
                      <td className="py-4 px-6 font-mono text-[11px] text-gray-700">
                        <div className="flex items-center space-x-1.5">
                          <span>{user.email}</span>
                          <button
                            type="button"
                            onClick={() => handleCopyEmail(user.email, user.id)}
                            className="p-1 text-gray-400 hover:text-emerald-700 transition-colors"
                            title="Copy email"
                          >
                            {copiedId === user.id ? (
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </td>

                      {/* Phone */}
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-1.5">
                          <Phone className="w-3.5 h-3.5 text-emerald-700" />
                          <span className="font-semibold text-gray-800">{user.phone || '+92 300 0000000'}</span>
                          {user.phone && (
                            <a
                              href={`https://wa.me/${user.phone.replace(/[^0-9]/g, '')}`}
                              target="_blank"
                              rel="noreferrer"
                              className="p-1 text-emerald-600 hover:text-emerald-800"
                              title="Chat on WhatsApp"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                      </td>

                      {/* Address & City */}
                      <td className="py-4 px-6 max-w-xs">
                        <div className="flex items-start space-x-1 text-gray-600 truncate">
                          <MapPin className="w-3.5 h-3.5 text-[#D6A84F] shrink-0 mt-0.5" />
                          <span className="truncate">
                            {user.address || 'University Town'}, <span className="font-bold">{user.city || 'Peshawar'}</span>
                          </span>
                        </div>
                      </td>

                      {/* Auth Provider */}
                      <td className="py-4 px-6">
                        {isGoogle ? (
                          <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                            <span className="w-3 h-3 flex items-center justify-center font-black">G</span>
                            <span>Google</span>
                          </span>
                        ) : isGithub ? (
                          <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-gray-100 text-gray-800 border border-gray-200">
                            <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                            </svg>
                            <span>GitHub</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                            <Mail className="w-3 h-3" />
                            <span>Email Auth</span>
                          </span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block" />
                          <span>Active</span>
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end space-x-1">
                          <button
                            type="button"
                            onClick={() => setViewUser(user)}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-[#064E3B] hover:bg-emerald-50 transition-colors"
                            title="View Dossier"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditingUser(user)}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                            title="Edit User"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteUser(user.id, user.fullName)}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL 1: VIEW USER DOSSIER */}
      {viewUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 sm:p-8 border border-gray-100 overflow-hidden">
            <button
              onClick={() => setViewUser(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-[#064E3B] text-[#D6A84F] font-bold text-lg flex items-center justify-center border-2 border-[#064E3B]/20 shadow-md">
                {viewUser.avatarUrl ? (
                  <img src={viewUser.avatarUrl} alt={viewUser.fullName} className="w-full h-full object-cover" />
                ) : (
                  <span>
                    {viewUser.fullName
                      .split(' ')
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join('')
                      .toUpperCase()}
                  </span>
                )}
              </div>
              <div>
                <h3 className="font-heading font-black text-xl text-[#022C22]">{viewUser.fullName}</h3>
                <p className="text-xs text-gray-500 font-mono">{viewUser.email}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700">
                    {viewUser.role || 'Client'}
                  </span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-500 capitalize">via {viewUser.provider || 'email'}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 bg-[#FAF9F5] p-5 rounded-2xl border border-gray-100 text-xs">
              <div className="flex justify-between py-1 border-b border-gray-200/60">
                <span className="text-gray-500 font-semibold">Phone Contact:</span>
                <span className="font-bold text-gray-800">{viewUser.phone || 'N/A'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-200/60">
                <span className="text-gray-500 font-semibold">Residential City:</span>
                <span className="font-bold text-gray-800">{viewUser.city || 'Peshawar'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-200/60">
                <span className="text-gray-500 font-semibold">Address:</span>
                <span className="font-bold text-gray-800 text-right max-w-[240px] truncate">{viewUser.address || 'Peshawar, KP'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-200/60">
                <span className="text-gray-500 font-semibold">Registered On:</span>
                <span className="font-bold text-gray-800">
                  {new Date(viewUser.createdAt).toLocaleDateString('en-PK', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-gray-500 font-semibold">Saved Wishlist:</span>
                <span className="font-bold text-emerald-700">
                  {viewUser.savedPropertyIds?.length || 0} Properties
                </span>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setViewUser(null)}
                className="px-6 py-2.5 rounded-xl bg-[#064E3B] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#022C22] transition-colors"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: EDIT USER */}
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 sm:p-8 border border-gray-100">
            <button
              onClick={() => setEditingUser(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-heading font-black text-xl text-[#022C22] mb-1">Edit Client Profile</h3>
            <p className="text-xs text-gray-500 mb-5">Update personal records and contact info.</p>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={editingUser.fullName}
                  onChange={(e) => setEditingUser({ ...editingUser, fullName: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-[#064E3B]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={editingUser.phone || ''}
                  onChange={(e) => setEditingUser({ ...editingUser, phone: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-[#064E3B]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={editingUser.city || ''}
                    onChange={(e) => setEditingUser({ ...editingUser, city: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-[#064E3B]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Role
                  </label>
                  <select
                    value={editingUser.role || 'customer'}
                    onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-[#064E3B]"
                  >
                    <option value="customer">Customer</option>
                    <option value="client">Client</option>
                    <option value="investor">Investor</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  value={editingUser.address || ''}
                  onChange={(e) => setEditingUser({ ...editingUser, address: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-[#064E3B]"
                />
              </div>

              <div className="pt-3 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="px-4 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#064E3B] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#022C22]"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: ADD NEW CLIENT */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 sm:p-8 border border-gray-100">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-heading font-black text-xl text-[#022C22] mb-1">Register New Client</h3>
            <p className="text-xs text-gray-500 mb-5">Create a customer profile directly in the admin portal.</p>

            <form onSubmit={handleCreateClient} className="space-y-3.5">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={newClient.fullName}
                  onChange={(e) => setNewClient({ ...newClient, fullName: e.target.value })}
                  placeholder="e.g. Asad Ullah"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-[#064E3B]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Gmail / Email
                </label>
                <input
                  type="email"
                  required
                  value={newClient.email}
                  onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                  placeholder="asadullah@gmail.com"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-[#064E3B]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={newClient.phone}
                    onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
                    placeholder="+92 300 1234567"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-[#064E3B]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={newClient.city}
                    onChange={(e) => setNewClient({ ...newClient, city: e.target.value })}
                    placeholder="Peshawar"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-[#064E3B]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  value={newClient.address}
                  onChange={(e) => setNewClient({ ...newClient, address: e.target.value })}
                  placeholder="e.g. Phase 7, Hayatabad, Peshawar"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-[#064E3B]"
                />
              </div>

              <div className="pt-3 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#064E3B] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#022C22]"
                >
                  Add Client
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

