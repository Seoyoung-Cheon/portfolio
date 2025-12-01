import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface LanyardData {
  success: boolean;
  data: {
    discord_user: {
      id: string;
      username: string;
      display_name: string;
      avatar: string;
    };
    discord_status: "online" | "idle" | "dnd" | "offline";
    activities: Array<{
      name: string;
      type: number;
      state?: string;
      details?: string;
      timestamps?: {
        start?: number;
      };
      assets?: {
        large_image?: string;
        large_text?: string;
      };
    }>;
    spotify?: {
      track_id: string;
      timestamps: {
        start: number;
        end: number;
      };
      song: string;
      artist: string;
      album_art_url: string;
      album: string;
    };
  };
}

interface LanyardProps {
  userId?: string;
  className?: string;
}

export default function Lanyard({ userId = "YOUR_DISCORD_USER_ID", className }: LanyardProps) {
  const [data, setData] = useState<LanyardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLanyard = async () => {
      try {
        const response = await fetch(`https://api.lanyard.rest/v1/users/${userId}`);
        const json: LanyardData = await response.json();
        setData(json);
      } catch (error) {
        console.error("Failed to fetch Lanyard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLanyard();
    const interval = setInterval(fetchLanyard, 30000); // 30초마다 업데이트

    return () => clearInterval(interval);
  }, [userId]);

  if (loading) {
    return (
      <Card className={cn("w-80", className)}>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-muted animate-pulse" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-muted rounded animate-pulse" />
              <div className="h-3 bg-muted rounded w-2/3 animate-pulse" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!data?.success || !data.data) {
    return null;
  }

  const { discord_user, discord_status, activities, spotify } = data.data;

  const statusColors = {
    online: "bg-green-500",
    idle: "bg-yellow-500",
    dnd: "bg-red-500",
    offline: "bg-gray-500",
  };

  const statusLabels = {
    online: "온라인",
    idle: "자리 비움",
    dnd: "방해 금지",
    offline: "오프라인",
  };

  const avatarUrl = `https://cdn.discordapp.com/avatars/${discord_user.id}/${discord_user.avatar}.png?size=128`;

  return (
    <Card className={cn("w-80", className)}>
      <CardContent className="p-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="relative">
            <img
              src={avatarUrl}
              alt={discord_user.username}
              className="w-12 h-12 rounded-full"
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://cdn.discordapp.com/embed/avatars/${parseInt(discord_user.id) % 5}.png`;
              }}
            />
            <div
              className={cn(
                "absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-background",
                statusColors[discord_status]
              )}
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm truncate">
              {discord_user.display_name || discord_user.username}
            </p>
            <p className="text-xs text-muted-foreground">{statusLabels[discord_status]}</p>
          </div>
        </div>

        {spotify && (
          <div className="mt-4 p-3 bg-green-500/10 rounded-lg border border-green-500/20">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-4 h-4 text-green-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z" />
              </svg>
              <span className="text-xs font-semibold text-green-500">Spotify에서 재생 중</span>
            </div>
            <p className="text-sm font-medium truncate">{spotify.song}</p>
            <p className="text-xs text-muted-foreground truncate">{spotify.artist}</p>
          </div>
        )}

        {activities && activities.length > 0 && !spotify && (
          <div className="mt-4 space-y-2">
            {activities.map((activity, index) => (
              <div key={index} className="p-3 bg-muted/50 rounded-lg">
                <p className="text-xs font-semibold mb-1">{activity.name}</p>
                {activity.details && (
                  <p className="text-xs text-muted-foreground truncate">{activity.details}</p>
                )}
                {activity.state && (
                  <p className="text-xs text-muted-foreground truncate">{activity.state}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

