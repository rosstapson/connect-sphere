import { Link } from "wouter";
import { Search, Home, Users, Briefcase, MessageSquare, Bell, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import myAvatar from "@assets/stock_images/professional_headsho_6a369208.jpg";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-border px-4 h-[52px] flex items-center justify-center" data-testid="navbar">
      <div className="max-w-[1128px] w-full flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/">
            <a className="text-primary" data-testid="logo-link">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-9 h-9">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </Link>
          <div className="relative hidden md:block">
            <Search className="absolute left-2.5 top-1.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search" 
              className="pl-9 bg-[#eef3f8] border-none h-[34px] w-[280px] focus-visible:ring-1 focus-visible:ring-primary transition-all duration-300"
              data-testid="input-search"
            />
          </div>
        </div>

        <ul className="flex items-center gap-1 sm:gap-6 h-full">
          <NavItem icon={Home} label="Home" active />
          <NavItem icon={Users} label="My Network" />
          <NavItem icon={Briefcase} label="Jobs" />
          <NavItem icon={MessageSquare} label="Messaging" />
          <NavItem icon={Bell} label="Notifications" />
          <li className="flex flex-col items-center justify-center cursor-pointer text-muted-foreground hover:text-foreground transition-colors group">
             <Avatar className="h-6 w-6 mb-0.5">
                <AvatarImage src={myAvatar} />
                <AvatarFallback>ME</AvatarFallback>
             </Avatar>
             <span className="text-[12px] hidden md:block group-hover:underline">Me</span>
          </li>
        </ul>
      </div>
    </nav>
  );
}

function NavItem({ icon: Icon, label, active }: { icon: any, label: string, active?: boolean }) {
  return (
    <li className={`flex flex-col items-center justify-center cursor-pointer px-2 h-full border-b-2 ${active ? 'border-foreground text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground/30'} transition-all`} data-testid={`nav-item-${label.toLowerCase()}`}>
      <Icon className={`h-6 w-6 ${active ? 'fill-current' : ''}`} />
      <span className="text-[12px] hidden md:block">{label}</span>
    </li>
  );
}
