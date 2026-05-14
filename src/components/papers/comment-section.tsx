"use client";

import { useState, useCallback } from "react";

import {
  Send,
  Loader2,
  User,
} from "lucide-react";

import { addComment } from "@/server/actions/engagement";

interface CommentSectionProps {
  paperId: string;
  initialComments: any[];
}

export function CommentSection({
  paperId,
  initialComments,
}: CommentSectionProps) {
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!comment.trim() || isLoading) {
        return;
      }

      try {
        setIsLoading(true);

        const result = await addComment(
          paperId,
          comment.trim()
        );

        if (result.success) {
          setComment("");
        }
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          console.error(
            "[COMMENT_SUBMIT_ERROR]",
            error
          );
        }
      } finally {
        setIsLoading(false);
      }
    },
    [comment, isLoading, paperId]
  );

  return (
    <div className="space-y-10 mt-20">

      <h3 className="text-xl font-bold text-white uppercase tracking-widest flex items-center gap-3">
        <span className="w-8 h-px bg-primary/30" />
        Discussion ({initialComments.length})
      </h3>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="glass-panel p-6 rounded-3xl border border-white/5 space-y-4"
      >
        <div className="flex gap-4">

          <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
            <User className="w-5 h-5 text-primary" />
          </div>

          <textarea
            value={comment}
            onChange={(e) =>
              setComment(e.target.value)
            }
            placeholder="Share your technical analysis or inquiry..."
            className="flex-1 bg-slate-900/50 border border-slate-800 rounded-2xl p-4 text-sm text-white focus:outline-none focus:border-primary/50 transition-all resize-none"
            rows={3}
          />

        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={
              isLoading || !comment.trim()
            }
            className="bg-primary text-primary-foreground px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:scale-105 transition-transform disabled:opacity-50 glow-border"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <Send className="w-4 h-4" />
                Post Comment
              </>
            )}
          </button>
        </div>
      </form>

      {/* Comments */}
      <div className="space-y-8">

        {initialComments.map((c) => (
          <div
            key={c.id}
            className="flex gap-4 group"
          >

            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
              <User className="w-5 h-5 text-slate-500" />
            </div>

            <div className="flex-1 space-y-2">

              <div className="flex items-center justify-between">

                <span className="text-xs font-bold text-white uppercase tracking-widest">
                  {c.user?.name || "Researcher"}
                </span>

                <span className="text-[10px] text-slate-600 font-bold uppercase">
                  {new Date(
                    c.createdAt
                  ).toLocaleDateString()}
                </span>

              </div>

              <p className="text-sm text-slate-400 leading-relaxed bg-white/5 p-4 rounded-2xl border border-white/5">
                {c.content}
              </p>

            </div>
          </div>
        ))}

        {initialComments.length === 0 && (
          <div className="text-center py-12 text-slate-600 text-sm italic">
            No technical discussions started yet.
          </div>
        )}

      </div>
    </div>
  );
}