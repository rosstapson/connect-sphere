import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import stockWoman from "@assets/stock_images/professional_headsho_70fefec9.jpg";

export function RightSidebar() {
  return (
    <div className="space-y-2">
      <div className="bg-card rounded-lg border border-border p-4 shadow-sm" data-testid="news-widget">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-sm font-semibold">LinkedIn News</h2>
          <Info className="h-4 w-4 text-muted-foreground fill-current cursor-pointer" />
        </div>
        <ul className="space-y-4">
            <NewsItem 
                title="Tech hiring stabilizes" 
                time="2h ago" 
                readers="12,093 readers"
            />
             <NewsItem 
                title="AI regulation talks heat up" 
                time="4h ago" 
                readers="8,402 readers"
            />
             <NewsItem 
                title="Remote work trends 2026" 
                time="12h ago" 
                readers="45,201 readers"
            />
             <NewsItem 
                title="New startup unicorn emerges" 
                time="1d ago" 
                readers="6,300 readers"
            />
             <NewsItem 
                title="Stocks reach all-time high" 
                time="1d ago" 
                readers="123,029 readers"
            />
        </ul>
        <Button variant="ghost" className="mt-2 h-8 text-muted-foreground text-sm font-semibold flex items-center gap-1 pl-1 hover:bg-muted/50">
            Show more
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" className="fill-current">
                <path d="M1 5l7 4.61L15 5v2.39L8 12 1 7.39z"/>
            </svg>
        </Button>
      </div>

      <div className="bg-card rounded-lg border border-border p-4 shadow-sm sticky top-20" data-testid="ad-widget">
         <div className="text-right text-xs text-muted-foreground mb-2">Ad</div>
         <div className="text-center">
            <p className="text-xs text-muted-foreground mb-3">John, unlock your full potential with Premium</p>
            <div className="flex justify-center gap-4 mb-3">
                <Avatar className="h-16 w-16 rounded-md">
                   <AvatarImage src={stockWoman} className="object-cover" />
                   <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                 <div className="h-16 w-16 bg-blue-100 rounded-md flex items-center justify-center border border-blue-200">
                    <svg className="h-8 w-8 text-primary fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                 </div>
            </div>
            <p className="text-sm text-muted-foreground mb-3">See who's viewed your profile in the last 90 days</p>
            <Button variant="outline" className="rounded-full border-primary text-primary hover:bg-blue-50 hover:text-primary font-semibold">Try for free</Button>
         </div>
      </div>
    </div>
  );
}

function NewsItem({ title, time, readers }: { title: string, time: string, readers: string }) {
    return (
        <li className="cursor-pointer group">
            <div className="flex items-start gap-2">
                <div className="mt-2 h-1 w-1 rounded-full bg-foreground/60"></div>
                <div>
                    <h3 className="text-sm font-semibold group-hover:underline text-foreground/90">{title}</h3>
                    <p className="text-xs text-muted-foreground">{time} • {readers}</p>
                </div>
            </div>
        </li>
    )
}
