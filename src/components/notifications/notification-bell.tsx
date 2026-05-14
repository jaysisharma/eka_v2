"use client";

import {
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";

import {
  Bell,
  Info,
  AlertTriangle,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

import {
  getNotifications,
  markAsRead,
  markAllAsRead,
} from "@/server/actions/notifications";

import Link from "next/link";
import { useRouter } from "next/navigation";

export function NotificationBell() {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const [notifications, setNotifications] = useState<any[]>([]);

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.isRead).length,
    [notifications]
  );

  const fetchNotifications = useCallback(async () => {
    try {
      const data = await getNotifications();

      setNotifications(data);
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error(
          "[NOTIFICATION_FETCH_ERROR]",
          error
        );
      }
    }
  }, []);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const data = await getNotifications();

        if (mounted) {
          setNotifications(data);
        }
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          console.error(error);
        }
      }
    };

    load();

    // Poll ONLY while popup is open
    if (!isOpen) return;

    const interval = setInterval(() => {
      if (document.visibilityState === "visible") {
        fetchNotifications();
      }
    }, 60000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [isOpen, fetchNotifications]);

  const handleMarkRead = useCallback(
    async (id: string) => {
      try {
        await markAsRead(id);

        setNotifications((prev) =>
          prev.map((n) =>
            n.id === id
              ? { ...n, isRead: true }
              : n
          )
        );
      } catch (error) {
        console.error(error);
      }
    },
    []
  );

  const handleMarkAllRead = useCallback(async () => {
    try {
      await markAllAsRead();

      setNotifications((prev) =>
        prev.map((n) => ({
          ...n,
          isRead: true,
        }))
      );
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <div className="relative">
      <button
        onClick={() =>
          setIsOpen((prev) => !prev)
        }
        className="p-2 hover:bg-white/5 rounded-full transition-all relative group"
      >
        <Bell
          className={`w-5 h-5 ${unreadCount > 0
              ? "text-primary"
              : "text-slate-400"
            } group-hover:text-primary transition-colors`}
        />

        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full ring-2 ring-[#020617]" />
        )}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-[110]"
            onClick={() => setIsOpen(false)}
          />

          <div className="absolute right-0 mt-4 w-96 glass-panel rounded-[2rem] border border-white/10 shadow-2xl z-[120] overflow-hidden">

            <header className="p-6 border-b border-white/5 flex justify-between items-center bg-white/5">
              <h3 className="text-sm font-black text-white uppercase tracking-widest">
                Operational Alerts
              </h3>

              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllRead}
                  className="text-[10px] font-black text-primary uppercase tracking-tighter hover:underline"
                >
                  Mark all as read
                </button>
              )}
            </header>

            <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
              {notifications.length > 0 ? (
                notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`p-5 border-b border-white/5 flex gap-4 hover:bg-white/5 transition-colors cursor-pointer relative ${!n.isRead
                        ? "bg-primary/5"
                        : ""
                      }`}
                    onClick={() => {
                      if (n.link) {
                        router.push(n.link);
                      } else {
                        handleMarkRead(n.id);
                      }
                    }}
                  >
                    <div
                      className={`p-2 rounded-xl h-fit ${getTypeColor(
                        n.type
                      )}`}
                    >
                      {getIcon(n.type)}
                    </div>

                    <div className="flex-1 space-y-1">
                      <div className="flex justify-between items-start">
                        <h4
                          className={`text-xs font-bold ${!n.isRead
                              ? "text-white"
                              : "text-slate-400"
                            }`}
                        >
                          {n.title}
                        </h4>

                        <span className="text-[9px] text-slate-600 font-bold uppercase">
                          {getTimeAgo(n.createdAt)}
                        </span>
                      </div>

                      <p className="text-[11px] text-slate-500 leading-relaxed">
                        {n.message}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-12 text-center text-slate-600 text-xs italic">
                  No active notifications in the terminal.
                </div>
              )}
            </div>

            <footer className="p-4 bg-white/2 text-center border-t border-white/5">
              <Link
                href="/notifications"
                className="text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-white transition-colors"
              >
                View Mission Logs
              </Link>
            </footer>
          </div>
        </>
      )}
    </div>
  );
}

function getIcon(type: string) {
  switch (type) {
    case "SUCCESS":
      return <CheckCircle2 className="w-4 h-4" />;
    case "ERROR":
      return <AlertCircle className="w-4 h-4" />;
    case "WARNING":
      return <AlertTriangle className="w-4 h-4" />;
    default:
      return <Info className="w-4 h-4" />;
  }
}

function getTypeColor(type: string) {
  switch (type) {
    case "SUCCESS":
      return "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";
    case "ERROR":
      return "bg-red-500/10 text-red-400 border border-red-500/20";
    case "WARNING":
      return "bg-amber-500/10 text-amber-400 border border-amber-500/20";
    default:
      return "bg-primary/10 text-primary border border-primary/20";
  }
}

function getTimeAgo(date: Date) {
  const seconds = Math.floor(
    (new Date().getTime() - new Date(date).getTime()) / 1000
  );
  if (seconds < 60) return "Just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return new Date(date).toLocaleDateString();
}