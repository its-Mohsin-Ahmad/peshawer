import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { Project, ProgressUpdate } from '../../types';
import {
  Video,
  Edit2,
  CheckCircle2,
  Eye,
  ShieldCheck,
  Calendar,
  X,
  HardHat,
  TrendingUp,
  Plus,
  Trash2,
  Layers,
  Sparkles,
} from 'lucide-react';

export const AdminProjectsPage: React.FC = () => {
  const { projects, updateProject, updateTownGardenVideo } = useData();

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [progressModalOpen, setProgressModalOpen] = useState(false);

  // Project Edit Form
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<Project['status']>('Booking Open');
  const [verifiedApproval, setVerifiedApproval] = useState('');
  const [heroImage, setHeroImage] = useState('');

  // Construction Progress Form
  const [progPercent, setProgPercent] = useState<number>(80);
  const [progStatus, setProgStatus] = useState('');
  const [progLastUpdated, setProgLastUpdated] = useState('');
  const [progDescription, setProgDescription] = useState('');
  const [progPublished, setProgPublished] = useState(true);
  const [progPhotosStr, setProgPhotosStr] = useState('');
  const [progHistory, setProgHistory] = useState<ProgressUpdate[]>([]);

  // Add new milestone inputs
  const [newDate, setNewDate] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newPercent, setNewPercent] = useState<number>(80);
  const [newDesc, setNewDesc] = useState('');
  const [newPhoto, setNewPhoto] = useState('');

  // Town Garden Exclusive Video Form
  const townGarden = projects.find((p) => p.slug === 'town-garden');
  const [videoUrl, setVideoUrl] = useState(
    townGarden?.videoUrl || '/assets/projects/town-garden/town-garden-video.mp4'
  );
  const [videoPoster, setVideoPoster] = useState(
    townGarden?.videoPoster || '/assets/projects/town-garden/hero.png'
  );
  const [videoTitle, setVideoTitle] = useState(
    townGarden?.videoTitle || 'Experience Town Garden'
  );
  const [videoDesc, setVideoDesc] = useState(
    townGarden?.videoDescription ||
      'Take a closer look at the architecture, surroundings, and vision of Town Garden, located in University Town, Peshawar.'
  );
  const [videoPublished, setVideoPublished] = useState(townGarden?.hasVideo ?? true);

  const openEditModal = (proj: Project) => {
    setSelectedProject(proj);
    setName(proj.name);
    setLocation(proj.location);
    setTagline(proj.tagline);
    setDescription(proj.description);
    setStatus(proj.status);
    setVerifiedApproval(proj.verifiedApproval || '');
    setHeroImage(proj.heroImage);
    setEditModalOpen(true);
  };

  const openProgressModal = (proj: Project) => {
    setSelectedProject(proj);
    setProgPercent(proj.constructionProgress ?? 80);
    setProgStatus(proj.constructionStatus || 'Finishing & Interior Works');
    setProgLastUpdated(proj.constructionLastUpdated || 'November 2026');
    setProgDescription(proj.constructionDescription || '');
    setProgPublished(proj.constructionProgressPublished !== false);
    setProgPhotosStr((proj.constructionPhotos || []).join('\n'));
    setProgHistory(proj.progressHistory || []);
    setNewDate(new Date().toISOString().split('T')[0]);
    setNewPercent(proj.constructionProgress ?? 80);
    setNewTitle('');
    setNewDesc('');
    setNewPhoto('');
    setProgressModalOpen(true);
  };

  const handleProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProject) return;

    updateProject(selectedProject.id, {
      name,
      location,
      tagline,
      description,
      status,
      verifiedApproval,
      heroImage,
    });

    setEditModalOpen(false);
  };

  const handleProgressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProject) return;

    // Validate percentage 0-100
    const clampedPercent = Math.max(0, Math.min(100, Number(progPercent) || 0));

    const photos = progPhotosStr
      .split('\n')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    updateProject(selectedProject.id, {
      constructionProgress: clampedPercent,
      constructionStatus: progStatus,
      constructionLastUpdated: progLastUpdated,
      constructionDescription: progDescription,
      constructionProgressPublished: progPublished,
      constructionPhotos: photos,
      progressHistory: progHistory,
    });

    setProgressModalOpen(false);
  };

  const handleAddMilestone = () => {
    if (!newTitle.trim()) {
      alert('Please enter a milestone title');
      return;
    }
    const newEntry: ProgressUpdate = {
      id: 'prog-' + Date.now(),
      date: newDate || new Date().toISOString().split('T')[0],
      title: newTitle.trim(),
      percentage: Math.max(0, Math.min(100, Number(newPercent) || 0)),
      description: newDesc.trim(),
      photoUrl: newPhoto.trim() || undefined,
      published: true,
    };
    setProgHistory([newEntry, ...progHistory]);
    setNewTitle('');
    setNewDesc('');
    setNewPhoto('');
  };

  const handleDeleteMilestone = (id: string) => {
    setProgHistory(progHistory.filter((item) => item.id !== id));
  };

  const handleVideoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateTownGardenVideo({
      videoUrl,
      videoPoster,
      videoTitle,
      videoDescription: videoDesc,
      hasVideo: videoPublished,
    });
    setVideoModalOpen(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-premium">
        <div>
          <h1 className="font-heading text-xl sm:text-2xl font-black text-[#022C22] uppercase tracking-tight">
            Development Projects
          </h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            Manage the 4 signature developments, verified construction progress trackers, and Town Garden's video.
          </p>
        </div>

        {townGarden && (
          <button
            onClick={() => setVideoModalOpen(true)}
            className="px-5 py-2.5 rounded-xl bg-[#022C22] text-[#D6A84F] border border-[#D6A84F]/40 text-xs font-heading font-extrabold uppercase tracking-wider flex items-center space-x-2 shadow-sm hover:bg-[#064E3B] hover:text-white transition-all"
          >
            <Video className="w-4 h-4" />
            <span>Manage Town Garden Video</span>
          </button>
        )}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((proj) => {
          const progressVal = proj.constructionProgress ?? 80;
          const isProgressPublished = proj.constructionProgressPublished !== false;

          return (
            <div
              key={proj.id}
              className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-premium flex flex-col justify-between"
            >
              <div>
                {/* Image banner */}
                <div className="relative h-48 bg-[#F8F6EA] flex items-center justify-center p-4 overflow-hidden">
                  <img
                    src={proj.renderBuildingImage}
                    alt={proj.name}
                    className="max-h-full max-w-full object-contain filter drop-shadow-md"
                  />

                  <span
                    className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow ${
                      proj.status === 'Ready for Possession'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#064E3B] text-[#D6A84F]'
                    }`}
                  >
                    {proj.status}
                  </span>

                  {/* Progress Pill on Card */}
                  <div className="absolute top-3 right-3 bg-[#022C22] text-[#D6A84F] text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center space-x-1 shadow border border-[#D6A84F]/30">
                    <HardHat className="w-3 h-3 text-[#D6A84F]" />
                    <span>Progress: {progressVal}%</span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-heading text-lg font-bold text-[#102A24]">
                      {proj.name}
                    </h3>
                    <span className="text-xs text-[#047857] font-semibold">
                      {proj.apartments.length} Configured Plans
                    </span>
                  </div>

                  <div className="text-xs text-[#64748B] font-medium mb-3">
                    {proj.location}
                  </div>

                  <p className="text-xs text-[#64748B] line-clamp-2 leading-relaxed mb-4">
                    {proj.description}
                  </p>

                  {/* Construction Progress Bar Snippet */}
                  <div className="bg-[#F8F6EA] p-3.5 rounded-2xl border border-gray-100 mb-4 space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-[#064E3B] flex items-center space-x-1">
                        <HardHat className="w-3.5 h-3.5 text-[#D6A84F]" />
                        <span>Construction Progress</span>
                      </span>
                      <span className="text-[#D6A84F] font-black">{progressVal}%</span>
                    </div>

                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#064E3B] to-[#D6A84F] rounded-full"
                        style={{ width: `${progressVal}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-[#64748B]">
                      <span className="truncate max-w-[200px]">
                        {proj.constructionStatus || 'Structural & Finishing Phase'}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${isProgressPublished ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                        {isProgressPublished ? 'Published' : 'Hidden'}
                      </span>
                    </div>
                  </div>

                  {proj.verifiedApproval && (
                    <div className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-[#ECFDF5] text-[#047857] text-[11px] font-semibold">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#D6A84F]" />
                      <span>{proj.verifiedApproval}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="p-6 pt-3 border-t border-gray-100 flex flex-wrap items-center justify-between gap-2">
                <a
                  href={`/projects/${proj.slug}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-bold text-[#064E3B] hover:text-[#D6A84F] flex items-center space-x-1"
                >
                  <span>View Public Page</span>
                  <Eye className="w-3.5 h-3.5" />
                </a>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => openProgressModal(proj)}
                    className="px-3.5 py-2 rounded-xl bg-[#F8F6EA] hover:bg-[#ECFDF5] text-[#064E3B] hover:text-[#047857] text-xs font-bold flex items-center space-x-1.5 border border-gray-200 transition-colors"
                    title="Track & Update Construction Progress"
                  >
                    <HardHat className="w-3.5 h-3.5 text-[#D6A84F]" />
                    <span>Progress ({progressVal}%)</span>
                  </button>

                  <button
                    onClick={() => openEditModal(proj)}
                    className="px-4 py-2 rounded-xl bg-[#064E3B] hover:bg-[#022C22] text-white text-xs font-bold flex items-center space-x-1 transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit Project Modal */}
      {editModalOpen && selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60" onClick={() => setEditModalOpen(false)} />
          <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden z-10 max-h-[90vh] flex flex-col">
            <div className="bg-[#022C22] text-white p-5 flex items-center justify-between border-b-2 border-[#D6A84F]">
              <h3 className="font-heading font-bold text-base uppercase">
                Edit {selectedProject.name}
              </h3>
              <button onClick={() => setEditModalOpen(false)} className="text-gray-300">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleProjectSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#102A24] mb-1">
                  Project Title
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#064E3B]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#102A24] mb-1">
                  Location (Official Geographic String)
                </label>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#064E3B]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#102A24] mb-1">
                  Tagline / Catchphrase
                </label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#064E3B]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#102A24] mb-1">
                    Construction / Booking Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as Project['status'])}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs"
                  >
                    <option value="Booking Open">Booking Open</option>
                    <option value="Under Construction">Under Construction</option>
                    <option value="Ready for Possession">Ready for Possession</option>
                    <option value="Upcoming">Upcoming</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#102A24] mb-1">
                    Authority Approval Tag
                  </label>
                  <input
                    type="text"
                    value={verifiedApproval}
                    onChange={(e) => setVerifiedApproval(e.target.value)}
                    placeholder="e.g. TMA Approved Project"
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#102A24] mb-1">
                  Hero Image Path
                </label>
                <input
                  type="text"
                  value={heroImage}
                  onChange={(e) => setHeroImage(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#102A24] mb-1">
                  Overview Description
                </label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs"
                />
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setEditModalOpen(false)}
                  className="px-4 py-2 border rounded-xl text-xs font-bold text-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#064E3B] text-white rounded-xl text-xs font-heading font-extrabold uppercase tracking-wider"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CONSTRUCTION PROGRESS MANAGEMENT MODAL */}
      {progressModalOpen && selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60" onClick={() => setProgressModalOpen(false)} />
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden z-10 max-h-[92vh] flex flex-col">
            {/* Modal Header */}
            <div className="bg-[#022C22] text-white p-5 flex items-center justify-between border-b-2 border-[#D6A84F]">
              <div className="flex items-center space-x-2">
                <HardHat className="w-5 h-5 text-[#D6A84F]" />
                <h3 className="font-heading font-bold text-base uppercase">
                  Construction Progress: {selectedProject.name}
                </h3>
              </div>
              <button onClick={() => setProgressModalOpen(false)} className="text-gray-300 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleProgressSubmit} className="p-6 space-y-6 overflow-y-auto flex-1">
              {/* Notice */}
              <div className="p-3 bg-[#ECFDF5] border border-[#047857]/30 rounded-xl text-xs text-[#064E3B] leading-relaxed">
                <strong>Provisional Figures Notice:</strong> Percentages must be verified by the administrator against actual structural engineering progress reports. Valid range: 0% to 100%.
              </div>

              {/* Live Preview Box */}
              <div className="bg-[#F8F6EA] p-4 rounded-2xl border border-gray-200">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#064E3B] block mb-2">
                  Live Preview on Project Page
                </span>
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 rounded-full bg-[#064E3B] text-[#D6A84F] font-heading font-black text-base flex items-center justify-center border-2 border-[#D6A84F] shrink-0">
                    {progPercent}%
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-[#102A24]">{progStatus || 'Current Status'}</span>
                      <span className="text-[#D6A84F] font-black">{progPercent}%</span>
                    </div>
                    <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#064E3B] to-[#D6A84F] rounded-full"
                        style={{ width: `${Math.max(0, Math.min(100, progPercent))}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-[#64748B]">Updated: {progLastUpdated || 'Current'}</span>
                  </div>
                </div>
              </div>

              {/* Completion Percentage (Number + Range Slider) */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#102A24]">
                    Completion Percentage (0% — 100%) *
                  </label>
                  <div className="flex items-center space-x-1">
                    <input
                      type="number"
                      min={0}
                      max={100}
                      required
                      value={progPercent}
                      onChange={(e) => setProgPercent(Number(e.target.value))}
                      className="w-20 px-3 py-1.5 rounded-lg border border-gray-300 font-heading font-black text-sm text-center text-[#D6A84F] bg-[#022C22]"
                    />
                    <span className="text-xs font-bold text-[#102A24]">%</span>
                  </div>
                </div>

                <input
                  type="range"
                  min={0}
                  max={100}
                  value={progPercent}
                  onChange={(e) => setProgPercent(Number(e.target.value))}
                  className="w-full accent-[#064E3B] cursor-pointer"
                />
              </div>

              {/* Status Label & Last Updated Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#102A24] mb-1">
                    Current Construction Status Label *
                  </label>
                  <input
                    type="text"
                    required
                    value={progStatus}
                    onChange={(e) => setProgStatus(e.target.value)}
                    placeholder="e.g. Finishing & Interior Works"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#064E3B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#102A24] mb-1">
                    Last Updated Date / Month *
                  </label>
                  <input
                    type="text"
                    required
                    value={progLastUpdated}
                    onChange={(e) => setProgLastUpdated(e.target.value)}
                    placeholder="e.g. November 2026"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#064E3B]"
                  />
                </div>
              </div>

              {/* Progress Description */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#102A24] mb-1">
                  Progress Overview Description
                </label>
                <textarea
                  rows={3}
                  value={progDescription}
                  onChange={(e) => setProgDescription(e.target.value)}
                  placeholder="Detail on-site operations, active floors, materials installed..."
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#064E3B]"
                />
              </div>

              {/* Construction Photographs */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#102A24] mb-1">
                  Construction Photographs (One image URL per line)
                </label>
                <textarea
                  rows={3}
                  value={progPhotosStr}
                  onChange={(e) => setProgPhotosStr(e.target.value)}
                  placeholder="/assets/projects/glamorous-heights/exterior/exterior-1.jpg&#10;/assets/projects/glamorous-heights/interior/interior-1.jpg"
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs font-mono focus:outline-none focus:border-[#064E3B]"
                />
              </div>

              {/* Publish Toggle */}
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                <label className="flex items-center space-x-2 text-xs font-bold text-[#102A24] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={progPublished}
                    onChange={(e) => setProgPublished(e.target.checked)}
                    className="rounded text-[#064E3B] w-4 h-4"
                  />
                  <span>Publish & Display Construction Progress on Public Project Page and Homepage Tracker</span>
                </label>
              </div>

              {/* DATED PROGRESS HISTORY SECTION */}
              <div className="border-t border-gray-200 pt-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-heading text-sm font-extrabold uppercase tracking-wider text-[#022C22] flex items-center space-x-1.5">
                    <Layers className="w-4 h-4 text-[#D6A84F]" />
                    <span>Dated Progress Milestone History</span>
                  </h4>
                  <span className="text-[11px] font-bold text-[#064E3B] bg-[#ECFDF5] px-2 py-0.5 rounded">
                    {progHistory.length} Milestones
                  </span>
                </div>

                {/* Add Milestone Form */}
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-3">
                  <span className="text-[11px] font-bold text-[#102A24] block">Add New Dated Milestone</span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <input
                      type="date"
                      value={newDate}
                      onChange={(e) => setNewDate(e.target.value)}
                      className="px-2.5 py-1.5 text-xs rounded-lg border border-gray-300"
                    />
                    <input
                      type="text"
                      placeholder="Milestone Title (e.g. Slabs Cast)"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="px-2.5 py-1.5 text-xs rounded-lg border border-gray-300 col-span-2"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div className="flex items-center space-x-1">
                      <span className="text-[11px] text-[#64748B]">Progress:</span>
                      <input
                        type="number"
                        min={0}
                        max={100}
                        value={newPercent}
                        onChange={(e) => setNewPercent(Number(e.target.value))}
                        className="w-16 px-2 py-1 text-xs rounded-lg border border-gray-300 text-center font-bold"
                      />
                      <span className="text-xs font-bold">%</span>
                    </div>
                    <input
                      type="text"
                      placeholder="Photo URL (optional)"
                      value={newPhoto}
                      onChange={(e) => setNewPhoto(e.target.value)}
                      className="px-2.5 py-1.5 text-xs rounded-lg border border-gray-300 col-span-2"
                    />
                  </div>
                  <textarea
                    rows={2}
                    placeholder="Milestone details and engineering notes..."
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-gray-300"
                  />
                  <button
                    type="button"
                    onClick={handleAddMilestone}
                    className="px-4 py-2 bg-[#064E3B] text-white text-xs font-bold rounded-lg flex items-center space-x-1 hover:bg-[#022C22]"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Milestone to History</span>
                  </button>
                </div>

                {/* Existing Milestones List */}
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {progHistory.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 bg-white rounded-xl border border-gray-200 flex items-center justify-between text-xs"
                    >
                      <div>
                        <div className="flex items-center space-x-2 font-bold text-[#102A24]">
                          <span>{item.title}</span>
                          <span className="text-[#D6A84F] font-black">({item.percentage}%)</span>
                          <span className="text-[10px] text-gray-400 font-normal">{item.date}</span>
                        </div>
                        {item.description && (
                          <p className="text-[11px] text-[#64748B] line-clamp-1 mt-0.5">{item.description}</p>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => handleDeleteMilestone(item.id)}
                        className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg ml-2"
                        title="Delete Milestone"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-gray-100 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setProgressModalOpen(false)}
                  className="px-4 py-2 border rounded-xl text-xs font-bold text-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#064E3B] hover:bg-[#022C22] text-white rounded-xl text-xs font-heading font-extrabold uppercase tracking-wider shadow-md"
                >
                  Save Construction Progress
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Town Garden EXCLUSIVE Video Management Modal */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60" onClick={() => setVideoModalOpen(false)} />
          <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden z-10 max-h-[90vh] flex flex-col">
            <div className="bg-[#022C22] text-white p-5 flex items-center justify-between border-b-2 border-[#D6A84F]">
              <div className="flex items-center space-x-2">
                <Video className="w-5 h-5 text-[#D6A84F]" />
                <h3 className="font-heading font-bold text-base uppercase">
                  Town Garden Exclusive Video Controls
                </h3>
              </div>
              <button onClick={() => setVideoModalOpen(false)} className="text-gray-300">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleVideoSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">
              <div className="p-3 bg-[#ECFDF5] border border-[#047857]/30 rounded-xl text-xs text-[#064E3B]">
                <strong>Exclusive Video Rule:</strong> Town Garden is the only development permitted to feature a primary project video section on its public detail page.
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#102A24] mb-1">
                  Video Source File URL *
                </label>
                <input
                  type="text"
                  required
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="/assets/projects/town-garden/town-garden-video.mp4"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm font-mono text-xs focus:outline-none focus:border-[#064E3B]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#102A24] mb-1">
                  Video Poster Thumbnail
                </label>
                <input
                  type="text"
                  value={videoPoster}
                  onChange={(e) => setVideoPoster(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#102A24] mb-1">
                  Section Heading
                </label>
                <input
                  type="text"
                  value={videoTitle}
                  onChange={(e) => setVideoTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#064E3B]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#102A24] mb-1">
                  Section Description
                </label>
                <textarea
                  rows={3}
                  value={videoDesc}
                  onChange={(e) => setVideoDesc(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs"
                />
              </div>

              <div className="pt-2">
                <label className="flex items-center space-x-2 text-xs font-bold text-[#102A24] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={videoPublished}
                    onChange={(e) => setVideoPublished(e.target.checked)}
                    className="rounded text-[#064E3B]"
                  />
                  <span>Display & Publish Video Section on Town Garden page</span>
                </label>
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setVideoModalOpen(false)}
                  className="px-4 py-2 border rounded-xl text-xs font-bold text-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#064E3B] text-white rounded-xl text-xs font-heading font-extrabold uppercase tracking-wider"
                >
                  Update Video Settings
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
