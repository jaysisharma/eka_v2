"use client";

import { useState } from "react";
import { 
  Search, 
  Mail, 
  User, 
  Clock, 
  Trash2, 
  CheckCircle2, 
  Inbox,
  Reply,
  Send,
  X,
  Loader2,
  AlertTriangle,
  LayoutGrid,
  CircleDot
} from "lucide-react";
import { format } from "date-fns";
import { deleteMessage, markMessageAsRead, replyToMessage } from "./admin-actions";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject?: string | null;
  message: string;
  status: string;
  createdAt: Date | string;
}

type FilterStatus = "ALL" | "READ" | "UNREAD";

export function MessagesClient({ initialMessages: messages }: { initialMessages: ContactMessage[] }) {
  const [selectedId, setSelectedId] = useState<string | null>(messages[0]?.id || null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("ALL");
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Dialog State
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [idToDelete, setIdToDelete] = useState<string | null>(null);

  const filteredMessages = messages.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         m.message.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "ALL" || m.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const selectedMessage = messages.find(m => m.id === selectedId);

  async function handleConfirmDelete() {
    if (!idToDelete) return;
    setIsSubmitting(true);
    const res = await deleteMessage(idToDelete);
    if (res.success) {
      if (selectedId === idToDelete) setSelectedId(messages.find(m => m.id !== idToDelete)?.id || null);
      setShowDeleteDialog(false);
      setIdToDelete(null);
    }
    setIsSubmitting(false);
  }

  function triggerDelete(id: string) {
    setIdToDelete(id);
    setShowDeleteDialog(true);
  }

  async function handleMarkAsRead(id: string) {
    await markMessageAsRead(id);
  }

  async function handleSendReply() {
    if (!selectedId || !replyText.trim()) return;
    setIsSubmitting(true);
    const res = await replyToMessage(selectedId, replyText);
    if (res.success) {
      setIsReplying(false);
      setReplyText("");
    }
    setIsSubmitting(false);
  }

  return (
    <div className="flex h-full bg-white border border-slate-200 rounded-[2rem] overflow-hidden shadow-sm relative">
      
      {/* Custom Institutional Dialog (Modal) */}
      {showDeleteDialog && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-6 bg-[#020617]/40 backdrop-blur-md animate-in fade-in duration-300">
          <div className="w-full max-w-[400px] bg-white rounded-[2.5rem] shadow-2xl shadow-black/20 p-10 space-y-8 animate-in zoom-in-95 duration-300">
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center ring-8 ring-red-50/50">
                <AlertTriangle className="w-10 h-10 text-red-500" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Delete Message?</h3>
                <p className="text-sm text-slate-500 font-medium leading-relaxed px-4">
                  This action will permanently remove this inquiry from the mission registry. This cannot be undone.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col gap-3">
              <button 
                onClick={handleConfirmDelete}
                disabled={isSubmitting}
                className="w-full bg-red-500 text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-red-600 transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Confirm Deletion"}
              </button>
              <button 
                onClick={() => {
                  setShowDeleteDialog(false);
                  setIdToDelete(null);
                }}
                disabled={isSubmitting}
                className="w-full bg-slate-50 text-slate-500 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-slate-100 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Left Pane - List */}
      <div className="w-[380px] border-r border-slate-100 flex flex-col bg-slate-50/30">
        <div className="p-6 border-b border-slate-100 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Inbox</h2>
            <div className="bg-emerald-500/10 text-emerald-600 text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-widest">
              {messages.filter(m => m.status === "UNREAD").length} New
            </div>
          </div>

          {/* Status Tabs */}
          <div className="flex bg-slate-100 p-1 rounded-xl gap-1">
            <button 
              onClick={() => setFilterStatus("ALL")}
              className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${
                filterStatus === "ALL" ? "bg-white text-slate-900 shadow-sm" : "text-slate-400 hover:text-slate-600"
              }`}
            >
              All
            </button>
            <button 
              onClick={() => setFilterStatus("UNREAD")}
              className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all flex items-center justify-center gap-2 ${
                filterStatus === "UNREAD" ? "bg-white text-emerald-600 shadow-sm" : "text-slate-400 hover:text-slate-600"
              }`}
            >
              <CircleDot className="w-2.5 h-2.5" />
              Unread
            </button>
            <button 
              onClick={() => setFilterStatus("READ")}
              className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${
                filterStatus === "READ" ? "bg-white text-slate-900 shadow-sm" : "text-slate-400 hover:text-slate-600"
              }`}
            >
              Read
            </button>
          </div>

          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Search registry..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200 py-2.5 pl-10 pr-4 text-xs rounded-xl outline-none focus:border-emerald-500 transition-all shadow-sm"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-slate-100 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
          {filteredMessages.map((message) => (
            <button
              key={message.id}
              onClick={() => {
                setSelectedId(message.id);
                setIsReplying(false);
              }}
              className={`w-full text-left p-6 transition-all relative hover:bg-white group ${
                selectedId === message.id ? "bg-white shadow-[inset_4px_0_0_0_#10b981]" : ""
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-black uppercase tracking-widest ${
                    message.status === "UNREAD" ? "text-emerald-500" : "text-slate-400"
                  }`}>
                    {message.status === "UNREAD" ? "• New Inquiry" : "Processed"}
                  </span>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">
                    {format(new Date(message.createdAt), "MMM d")}
                  </span>
                </div>
                <h3 className={`font-bold text-slate-900 truncate ${selectedId === message.id ? "text-emerald-600" : ""}`}>
                  {message.name}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-1 font-medium">
                  {message.message}
                </p>
              </div>
            </button>
          ))}
          {filteredMessages.length === 0 && (
            <div className="p-12 text-center space-y-3">
               <Inbox className="w-8 h-8 text-slate-200 mx-auto" />
               <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">No {filterStatus.toLowerCase()} messages</p>
            </div>
          )}
        </div>
      </div>

      {/* Right Pane - Detail */}
      <div className="flex-1 flex flex-col bg-white">
        {selectedMessage ? (
          <>
            <div className="h-[70px] border-b border-slate-100 flex items-center justify-between px-8 shrink-0">
               <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                   <User className="w-5 h-5 text-slate-400" />
                 </div>
                 <div className="space-y-0.5">
                   <div className="flex items-center gap-3">
                     <h3 className="text-sm font-bold text-slate-900">{selectedMessage.name}</h3>
                     <span className="text-[8px] font-black uppercase tracking-widest text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full border border-slate-100">
                       {format(new Date(selectedMessage.createdAt), "MMM d, yyyy • HH:mm")}
                     </span>
                   </div>
                   <p className="text-[10px] text-slate-500 font-medium">{selectedMessage.email}</p>
                 </div>
               </div>

               <div className="flex items-center gap-2">
                 {selectedMessage.status === "UNREAD" && (
                    <button 
                      onClick={() => handleMarkAsRead(selectedMessage.id)}
                      className="p-2.5 text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 rounded-xl transition-all" 
                      title="Mark as Read"
                    >
                      <CheckCircle2 className="w-5 h-5" />
                    </button>
                 )}
                 <button 
                  onClick={() => triggerDelete(selectedMessage.id)}
                  className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all" 
                  title="Delete"
                >
                   <Trash2 className="w-5 h-5" />
                 </button>
                 <div className="w-px h-6 bg-slate-100 mx-2" />
                 <button 
                  onClick={() => setIsReplying(!isReplying)}
                  className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all ${
                    isReplying ? "bg-slate-100 text-slate-600" : "bg-slate-900 text-white hover:bg-emerald-500 shadow-lg shadow-black/5"
                  }`}
                >
                    {isReplying ? <X className="w-3.5 h-3.5" /> : <Reply className="w-3.5 h-3.5" />}
                    {isReplying ? "Cancel" : "Reply"}
                 </button>
               </div>
            </div>

            <div className="flex-1 overflow-y-auto p-12 space-y-12 bg-white/50 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
              <div className="max-w-[800px] space-y-12 animate-in slide-in-from-bottom-4 duration-500">
                
                {/* Message Content */}
                <div className="space-y-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500">Subject</span>
                      <div className="flex-1 h-px bg-slate-100" />
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight leading-tight">
                      {selectedMessage.subject || "Institutional Inquiry"}
                    </h1>
                  </div>

                  <div className="p-10 bg-slate-50/50 rounded-[2.5rem] border border-slate-100 relative group">
                     <div className="absolute top-8 left-[-10px] w-[20px] h-[20px] bg-slate-50 border-l border-t border-slate-100 rotate-[-45deg]" />
                     <p className="text-slate-700 leading-[1.8] font-medium whitespace-pre-wrap text-[15px]">
                       {selectedMessage.message}
                     </p>
                  </div>
                </div>

                {/* Reply Interface */}
                {isReplying && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-500">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Institutional Response</span>
                      <div className="flex-1 h-px bg-slate-100" />
                    </div>
                    <div className="space-y-4 bg-[#0B1120] p-1 rounded-[2.5rem] shadow-2xl">
                      <textarea
                        autoFocus
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Type your response as Eka Aerospace..."
                        className="w-full bg-transparent text-white p-8 text-sm outline-none resize-none min-h-[200px] placeholder:text-slate-600 font-medium"
                      />
                      <div className="flex items-center justify-between p-4 bg-white/5 rounded-b-[2.4rem] border-t border-white/5">
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest pl-4">
                          Sending to: {selectedMessage.email}
                        </p>
                        <button 
                          onClick={handleSendReply}
                          disabled={!replyText.trim() || isSubmitting}
                          className="bg-emerald-500 text-black px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 hover:bg-white transition-all disabled:opacity-50"
                        >
                          {isSubmitting ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <><Send className="w-3.5 h-3.5" /> Transmit</>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center space-y-6">
            <div className="w-24 h-24 bg-slate-50 rounded-[2rem] flex items-center justify-center text-slate-200">
              <Mail className="w-10 h-10" />
            </div>
            <div className="text-center space-y-1">
              <p className="text-slate-900 font-bold">Select an inquiry</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Choose a message to review details</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
