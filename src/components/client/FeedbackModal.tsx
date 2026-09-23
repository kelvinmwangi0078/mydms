import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Star, X, CheckCircle2 } from 'lucide-react';

export const FeedbackModal: React.FC = () => {
  const { feedbackModalData, setFeedbackModalData, submitFeedback, currentUser } = useApp();

  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!feedbackModalData?.isOpen || !feedbackModalData.project) return null;

  const project = feedbackModalData.project;
  const designerId = project.assignedDesignerId || 'designer-1';
  const designerName = project.assignedDesignerName || 'Kelvin Mwangi Wambui';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    submitFeedback(project.id, designerId, rating, comment.trim());

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setFeedbackModalData(null);
      setComment('');
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-slate-900 animate-in fade-in zoom-in-95 duration-200">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <h3 className="font-bold text-sm text-slate-900">Rate & Review Designer</h3>
            <p className="text-[11px] text-slate-500">
              For: <span className="font-semibold text-slate-700">{designerName}</span>
            </p>
          </div>
          <button
            onClick={() => setFeedbackModalData(null)}
            className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="p-8 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-blue-900 mx-auto animate-bounce" />
            <h4 className="text-base font-bold text-slate-900">Feedback Recorded!</h4>
            <p className="text-xs text-slate-600">
              Thank you for evaluating {designerName}. Your rating contributes to community trust and quality assurance.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">
                Completed Project
              </span>
              <p className="text-xs font-semibold text-slate-900">{project.title}</p>
            </div>

            <div className="text-center space-y-2">
              <label className="block text-xs font-semibold text-slate-700">Select Overall Rating</label>
              <div className="flex items-center justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 text-amber-400 hover:scale-110 transition-transform"
                  >
                    <Star
                      className={`w-7 h-7 ${
                        (hoverRating || rating) >= star
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-slate-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
              <p className="text-xs font-semibold text-amber-600">
                {rating === 5 && 'Outstanding work (5.0 / 5.0)'}
                {rating === 4 && 'Very Good (4.0 / 5.0)'}
                {rating === 3 && 'Average Quality (3.0 / 5.0)'}
                {rating === 2 && 'Needs Improvement (2.0 / 5.0)'}
                {rating === 1 && 'Unsatisfactory (1.0 / 5.0)'}
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Client Review & Feedback Comments
              </label>
              <textarea
                required
                rows={4}
                placeholder="Share your experience regarding responsiveness, adherence to creative brief, speed of revisions, and deliverable quality..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 leading-relaxed"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setFeedbackModalData(null)}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-medium text-white bg-blue-900 hover:bg-blue-950 rounded-lg shadow-sm transition-colors"
              >
                Submit Feedback
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
