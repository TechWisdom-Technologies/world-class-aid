import { useState } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const notifications = [
  { id: 1, message: "Student Yelim Ro's visa has been approved!", time: "2 hours ago", type: "success" as const, read: false },
  { id: 2, message: "Missing documents for Khaled Hisham's application.", time: "5 hours ago", type: "warning" as const, read: false },
  { id: 3, message: "Commission of $500 cleared and added to your wallet.", time: "1 day ago", type: "info" as const, read: false },
  { id: 4, message: "New intake deadline: UTM Fall 2026 closes June 15.", time: "2 days ago", type: "info" as const, read: true },
  { id: 5, message: "Student Maria Santos's offer letter received!", time: "3 days ago", type: "success" as const, read: true },
];

const typeStyles = {
  success: "bg-success/10 border-success/20",
  warning: "bg-warning/10 border-warning/20",
  info: "bg-secondary/10 border-secondary/20",
};

const dotStyles = {
  success: "bg-success",
  warning: "bg-warning",
  info: "bg-secondary",
};

export function NotificationCenter() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(notifications);

  const unreadCount = items.filter((n) => !n.read).length;

  const markAllRead = () => {
    setItems(items.map((n) => ({ ...n, read: true })));
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 h-4.5 w-4.5 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold flex items-center justify-center min-w-[18px] h-[18px] animate-scale-in">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between p-3 border-b">
          <h3 className="font-semibold text-sm">Notifications</h3>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" className="text-xs text-secondary h-auto py-1" onClick={markAllRead}>
              Mark all read
            </Button>
          )}
        </div>
        <div className="max-h-80 overflow-y-auto">
          {items.map((n, i) => (
            <div
              key={n.id}
              className={`p-3 border-b last:border-0 transition-colors ${!n.read ? "bg-muted/30" : ""} animate-fade-in`}
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="flex items-start gap-2.5">
                <div className={`h-2 w-2 rounded-full mt-1.5 flex-shrink-0 ${dotStyles[n.type]}`} />
                <div className="flex-1 min-w-0">
                  <p className={`text-xs leading-relaxed ${!n.read ? "font-medium" : "text-muted-foreground"}`}>
                    {n.message}
                  </p>
                  <p className="text-[10px] text-muted-foreground mt-1">{n.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
