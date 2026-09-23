import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import {
  MessageSquare,
  Send,
  User,
  Clock,
  Briefcase,
  Paperclip,
  CheckCheck,
} from 'lucide-react';

export const MessagesView: React.FC = () => {
  const { currentUser, messages, sendMessage, clients, designers, admins, projects } = useApp();

  const allUsers = [...clients, ...designers, ...admins].filter((u) => u.id !== currentUser.id);

  // Default active contact
  const [selectedUserId, setSelectedUserId] = useState<string>(() => {
    return allUsers[0]?.id || '';
  });

  const [inputMessage, setInputMessage] = useState('');

  const selectedContact = allUsers.find((u) => u.id === selectedUserId) || allUsers[0];

  // Messages between currentUser and selectedContact
  const threadMessages = messages.filter(
    (m) =>
      (m.senderId === currentUser.id && m.receiverId === selectedContact?.id) ||
      (m.senderId === selectedContact?.id && m.receiverId === currentUser.id)
  );

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || !selectedContact) return;

    sendMessage(selectedContact.id, inputMessage.trim());
    setInputMessage('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden h-[75vh] flex flex-col md:flex-row">
        {/* Left pane: Contacts list */}
        <div className="w-full md:w-80 border-r border-slate-200 flex flex-col bg-slate-50/50">
          <div className="p-4 border-b border-slate-200 bg-white">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-blue-900" />
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Direct Messages & Collab
              </h3>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Logged in as <span className="font-semibold text-slate-800">{currentUser.fullName}</span>
            </p>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {allUsers.map((user) => {
              const isSelected = user.id === selectedContact?.id;
              const userLastMsg = messages
                .filter(
                  (m) =>
                    (m.senderId === currentUser.id && m.receiverId === user.id) ||
                    (m.senderId === user.id && m.receiverId === currentUser.id)
                )
                .slice(-1)[0];

              return (
                <button
                  key={user.id}
                  onClick={() => setSelectedUserId(user.id)}
                  className={`w-full p-3.5 text-left flex items-start gap-3 transition-colors ${
                    isSelected ? 'bg-white shadow-xs border-l-4 border-blue-900' : 'hover:bg-slate-100/60'
                  }`}
                >
                  <img
                    src={
                      user.avatarUrl ||
                      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
                    }
                    alt={user.fullName}
                    className="w-10 h-10 rounded-full object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-slate-900 truncate">{user.fullName}</h4>
                      <span className="text-[10px] text-slate-400 capitalize font-mono">{user.role}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">
                      {userLastMsg ? userLastMsg.content : 'Start collaboration message...'}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right pane: Chat Thread */}
        <div className="flex-1 flex flex-col bg-white">
          {selectedContact ? (
            <>
              {/* Thread Header */}
              <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-white">
                <div className="flex items-center gap-3">
                  <img
                    src={
                      selectedContact.avatarUrl ||
                      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
                    }
                    alt={selectedContact.fullName}
                    className="w-9 h-9 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 leading-tight">
                      {selectedContact.fullName}
                    </h4>
                    <span className="text-[10px] text-blue-900 font-semibold capitalize">
                      {selectedContact.role} · Active in MYDMS
                    </span>
                  </div>
                </div>

                <div className="text-xs text-slate-400 font-mono hidden sm:block">
                  Encrypted Project Communication
                </div>
              </div>

              {/* Message List */}
              <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-slate-50/30">
                {threadMessages.length === 0 ? (
                  <div className="py-12 text-center space-y-2">
                    <MessageSquare className="w-8 h-8 text-slate-300 mx-auto" />
                    <p className="text-xs font-bold text-slate-700">No Messages in this Thread</p>
                    <p className="text-[11px] text-slate-500 max-w-xs mx-auto">
                      Send a message below to coordinate creative design briefs, clarify feedback, or discuss milestones.
                    </p>
                  </div>
                ) : (
                  threadMessages.map((msg) => {
                    const isMe = msg.senderId === currentUser.id;

                    return (
                      <div
                        key={msg.id}
                        className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                      >
                        <div className="flex items-baseline gap-2 mb-1 px-1">
                          <span className="text-[10px] font-semibold text-slate-600">
                            {isMe ? 'You' : msg.senderName}
                          </span>
                          <span className="text-[9px] text-slate-400 font-mono">
                            {new Date(msg.dateSent).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        </div>

                        <div
                          className={`max-w-md p-3 rounded-2xl text-xs leading-relaxed shadow-xs ${
                            isMe
                              ? 'bg-blue-900 text-white rounded-tr-none'
                              : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
                          }`}
                        >
                          <p>{msg.content}</p>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Composer Input Bar */}
              <form onSubmit={handleSend} className="p-3 border-t border-slate-200 bg-white flex items-center gap-2">
                <input
                  type="text"
                  placeholder={`Write a message to ${selectedContact.fullName}...`}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900"
                />
                <button
                  type="submit"
                  disabled={!inputMessage.trim()}
                  className="px-4 py-2 bg-blue-900 hover:bg-blue-950 disabled:opacity-50 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Send</span>
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center p-8 text-center text-slate-500 text-xs">
              Select a user to begin messaging.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
