import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Project } from '../../types';
import { X, Plus, Trash2, Briefcase, CheckCircle2 } from 'lucide-react';

export const PostProjectModal: React.FC = () => {
  const { isPostProjectOpen, setIsPostProjectOpen, createProject } = useApp();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Project['category']>('Brand Identity');
  const [budgetKes, setBudgetKes] = useState(35000);
  const [deadline, setDeadline] = useState('2026-04-30');
  const [description, setDescription] = useState('');
  const [deliverables, setDeliverables] = useState<string[]>([
    'High-resolution vector files (.AI, .SVG, .PNG)',
    'Brand guidelines manual (.PDF)',
  ]);
  const [newDeliverable, setNewDeliverable] = useState('');
  const [successMsg, setSuccessMsg] = useState(false);

  if (!isPostProjectOpen) return null;

  const handleAddDeliverable = () => {
    if (newDeliverable.trim()) {
      setDeliverables([...deliverables, newDeliverable.trim()]);
      setNewDeliverable('');
    }
  };

  const handleRemoveDeliverable = (index: number) => {
    setDeliverables(deliverables.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || budgetKes <= 0) return;

    createProject({
      title,
      category,
      budgetKes: Number(budgetKes),
      deadline,
      description,
      deliverablesRequired: deliverables.length > 0 ? deliverables : ['Completed Design Deliverables'],
    });

    setSuccessMsg(true);
    setTimeout(() => {
      setSuccessMsg(false);
      setIsPostProjectOpen(false);
      setTitle('');
      setDescription('');
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-slate-900 animate-in fade-in zoom-in-95 duration-200">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-900 flex items-center justify-center">
              <Briefcase className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900">Post New Design Project</h3>
              <p className="text-[11px] text-slate-500">Connect with qualified designers and receive bids</p>
            </div>
          </div>
          <button
            onClick={() => setIsPostProjectOpen(false)}
            className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {successMsg ? (
          <div className="p-8 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-blue-900 mx-auto animate-bounce" />
            <h4 className="text-base font-bold text-slate-900">Project Published Successfully!</h4>
            <p className="text-xs text-slate-600">
              Your project is now live in the MYDMS marketplace. Qualified designers will submit proposals.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Project Title</label>
              <input
                type="text"
                required
                placeholder="e.g. Modern Brand Identity & Packaging for Nairobi Roastery"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Design Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Project['category'])}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900 bg-white"
                >
                  <option value="Brand Identity">Brand Identity</option>
                  <option value="UI/UX Design">UI/UX Design</option>
                  <option value="Packaging Design">Packaging Design</option>
                  <option value="Print & Publication">Print & Publication</option>
                  <option value="Social Media Creatives">Social Media Creatives</option>
                  <option value="Illustration & 3D">Illustration & 3D</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Proposed Budget (KES)</label>
                <input
                  type="number"
                  min="5000"
                  step="1000"
                  required
                  value={budgetKes}
                  onChange={(e) => setBudgetKes(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Project Deadline</label>
              <input
                type="date"
                required
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Detailed Creative Brief</label>
              <textarea
                required
                rows={4}
                placeholder="Explain the background, target audience, style preferences, colors, and specific requirements..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900 leading-relaxed"
              />
            </div>

            {/* Expected Deliverables */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Required Deliverables
              </label>
              <div className="space-y-1.5 mb-2">
                {deliverables.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between text-xs px-2.5 py-1.5 bg-slate-50 rounded-md border border-slate-200"
                  >
                    <span>{item}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveDeliverable(idx)}
                      className="text-slate-400 hover:text-red-600 p-0.5"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add item (e.g. Exported 3D GLTF asset or Print CMYK)"
                  value={newDeliverable}
                  onChange={(e) => setNewDeliverable(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddDeliverable();
                    }
                  }}
                  className="flex-1 px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-900"
                />
                <button
                  type="button"
                  onClick={handleAddDeliverable}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setIsPostProjectOpen(false)}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-medium text-white bg-blue-900 hover:bg-blue-950 rounded-lg shadow-sm transition-colors"
              >
                Publish Project
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
