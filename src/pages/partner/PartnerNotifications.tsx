import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, CheckCheck, Circle, Filter } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDistanceToNow } from "date-fns";

interface Notification {
  id: string;
  partner_id: string;
  student_id: string | null;
  title: string;
  message: string;
  type: string;
  read: boolean;
  created_at: string;
}

const typeBadge: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  success: { label: "Success", variant: "default" },
  warning: { label: "Action Needed", variant: "destructive" },
  info: { label: "Info", variant: "secondary" },
};

export default function PartnerNotifications() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  const fetchNotifications = async () => {
    if (!user) return;
    setLoading(true);
    const { data, error } = await supabase
      .from("partner_notifications" as any)
      .select("*")
      .eq("partner_id", user.id)
      .order("created_at", { ascending: false });

    if (!error && data) setNotifications(data as unknown as Notification[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchNotifications();
  }, [user]);

  // Realtime subscription
  useEffect(() => {
    if (!user) return;
    const channel = supabase
      .channel("partner-notifs")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "partner_notifications", filter: `partner_id=eq.${user.id}` },
        (payload) => {
          setNotifications((prev) => [payload.new as unknown as Notification, ...prev]);
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [user]);

  const markAllRead = async () => {
    if (!user) return;
    await supabase
      .from("partner_notifications" as any)
      .update({ read: true } as any)
      .eq("partner_id", user.id)
      .eq("read", false);
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markRead = async (id: string) => {
    await supabase
      .from("partner_notifications" as any)
      .update({ read: true } as any)
      .eq("id", id);
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const filtered = filter === "all" ? notifications : notifications.filter((n) => (filter === "unread" ? !n.read : n.type === filter));
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Bell className="h-6 w-6 text-primary" />
            Notifications
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-1">{unreadCount} new</Badge>
            )}
          </h1>
          <p className="text-muted-foreground text-sm mt-1">Student status updates and important alerts</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[150px]">
              <Filter className="h-4 w-4 mr-1" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="unread">Unread</SelectItem>
              <SelectItem value="success">Success</SelectItem>
              <SelectItem value="warning">Warnings</SelectItem>
              <SelectItem value="info">Info</SelectItem>
            </SelectContent>
          </Select>
          {unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={markAllRead}>
              <CheckCheck className="h-4 w-4 mr-1" /> Mark all read
            </Button>
          )}
        </div>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Activity Feed</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="space-y-4 p-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-3">
                  <Skeleton className="h-3 w-3 rounded-full mt-1" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Bell className="h-10 w-10 mx-auto mb-3 opacity-30" />
              <p className="font-medium">No notifications yet</p>
              <p className="text-sm">Status updates for your students will appear here</p>
            </div>
          ) : (
            <div className="divide-y">
              {filtered.map((n) => {
                const badge = typeBadge[n.type] || typeBadge.info;
                return (
                  <div
                    key={n.id}
                    className={`p-4 flex items-start gap-3 transition-colors hover:bg-muted/30 cursor-pointer ${!n.read ? "bg-muted/20" : ""}`}
                    onClick={() => !n.read && markRead(n.id)}
                  >
                    <Circle className={`h-2.5 w-2.5 mt-1.5 flex-shrink-0 ${!n.read ? "fill-primary text-primary" : "fill-muted text-muted"}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className={`text-sm ${!n.read ? "font-semibold" : "font-medium"}`}>{n.title}</span>
                        <Badge variant={badge.variant} className="text-[10px] h-5">{badge.label}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{n.message}</p>
                      <p className="text-xs text-muted-foreground/60 mt-1">
                        {formatDistanceToNow(new Date(n.created_at), { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
