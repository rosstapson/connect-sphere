import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Bookmark, Square } from "lucide-react";
import myAvatar from "@assets/stock_images/professional_headsho_6a369208.jpg";

export function LeftSidebar() {
  return (
    <div className="space-y-2">
      <div className="bg-card rounded-lg border border-border overflow-hidden shadow-sm" data-testid="profile-card">
        <div className="h-14 bg-gradient-to-r from-blue-400 to-blue-600 relative">
        </div>
        <div className="px-4 pb-4 relative">
          <Avatar className="h-[72px] w-[72px] border-2 border-white absolute -top-9 cursor-pointer hover:opacity-90 transition-opacity">
            <AvatarImage src={myAvatar} />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          
          <div className="mt-12 mb-4">
            <h2 className="font-semibold text-base hover:underline cursor-pointer" data-testid="text-username">John Doe</h2>
            <p className="text-xs text-muted-foreground">Senior Software Engineer at Tech Corp | React | TypeScript | Node.js</p>
          </div>
          
          <Separator className="my-3" />
          
          <div className="space-y-1 py-1">
            <div className="flex justify-between items-center text-xs font-medium cursor-pointer hover:bg-muted/50 p-1 rounded-sm -mx-1 transition-colors">
              <span className="text-muted-foreground">Profile viewers</span>
              <span className="text-primary">142</span>
            </div>
            <div className="flex justify-between items-center text-xs font-medium cursor-pointer hover:bg-muted/50 p-1 rounded-sm -mx-1 transition-colors">
              <span className="text-muted-foreground">Post impressions</span>
              <span className="text-primary">1,204</span>
            </div>
          </div>

          <Separator className="my-3" />

          <div className="group cursor-pointer hover:bg-muted/50 p-1 rounded-sm -mx-1 transition-colors">
            <p className="text-xs text-muted-foreground">Access exclusive tools & insights</p>
            <div className="flex items-center gap-2 mt-1">
               <div className="h-3 w-3 bg-yellow-600 rounded-[2px]"></div>
               <span className="text-xs font-semibold hover:text-primary decoration-primary group-hover:underline">Try Premium for $0</span>
            </div>
          </div>

          <Separator className="my-3" />
          
          <div className="flex items-center gap-2 text-xs font-semibold cursor-pointer hover:bg-muted/50 p-1 rounded-sm -mx-1 transition-colors">
            <Bookmark className="h-4 w-4 text-muted-foreground" />
            <span>My Items</span>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg border border-border p-4 shadow-sm sticky top-20" data-testid="community-panel">
         <div className="space-y-4">
            <div>
               <h3 className="text-xs font-medium text-primary hover:underline cursor-pointer">Groups</h3>
            </div>
            <div className="flex justify-between items-center">
               <h3 className="text-xs font-medium text-primary hover:underline cursor-pointer">Events</h3>
               <span className="text-muted-foreground hover:bg-muted p-1 rounded cursor-pointer">+</span>
            </div>
             <div>
               <h3 className="text-xs font-medium text-primary hover:underline cursor-pointer">Followed Hashtags</h3>
            </div>
         </div>
         <Separator className="my-3" />
         <div className="text-center">
            <span className="text-sm font-semibold text-muted-foreground hover:text-foreground cursor-pointer transition-colors">Discover more</span>
         </div>
      </div>
    </div>
  );
}
