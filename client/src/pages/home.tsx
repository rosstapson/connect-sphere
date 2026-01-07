import { Navbar } from "@/components/layout/Navbar";
import { LeftSidebar } from "@/components/sidebar/LeftSidebar";
import { RightSidebar } from "@/components/sidebar/RightSidebar";
import { CreatePost, FeedPost } from "@/components/feed/Feed";
import officeImage from "@assets/stock_images/modern_office_techno_19264389.jpg";
import stockWoman from "@assets/stock_images/professional_headsho_70fefec9.jpg";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F3F2EF] dark:bg-black font-sans">
      <Navbar />
      
      <main className="flex justify-center pt-6 px-0 md:px-4 pb-10">
        <div className="w-full max-w-[1128px] grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Left Sidebar - Hidden on mobile, 3 cols wide on desktop */}
          <div className="hidden md:block md:col-span-3 lg:col-span-2 xl:col-span-3">
             <LeftSidebar />
          </div>

          {/* Main Feed - 12 cols on mobile, 6 cols on desktop */}
          <div className="col-span-1 md:col-span-9 lg:col-span-6 xl:col-span-6">
            <CreatePost />
            
            <div className="flex items-center gap-2 mb-2 px-1">
                <div className="h-[1px] flex-1 bg-gray-300"></div>
                <span className="text-xs text-muted-foreground font-medium">Sort by: <span className="font-bold text-foreground cursor-pointer">Top</span></span>
            </div>

            <FeedPost 
                author={{
                    name: "Sarah Miller",
                    title: "Product Designer at Creative Solutions | UX/UI Enthusiast",
                    avatar: stockWoman,
                    time: "2h"
                }}
                content={`Just finished a major redesign of our core product dashboard! 🚀\n\nIt’s been a challenging few months, but seeing the user engagement metrics go up by 40% in just one week makes it all worth it.\n\nKey takeaways:\n1. Simplify, simplify, simplify.\n2. Listen to your users, they know what they need.\n3. Performance is a feature.\n\n#UXDesign #ProductDesign #Tech #Redesign #UserExperience`}
                image={officeImage}
                stats={{
                    likes: 142,
                    comments: 24,
                    reposts: 12
                }}
            />

            <FeedPost 
                author={{
                    name: "David Chen",
                    title: "Frontend Architect | Open Source Contributor",
                    avatar: "https://github.com/shadcn.png",
                    time: "5h"
                }}
                content={`I just open-sourced a new React library for handling complex state management with zero boilerplate. \n\nCheck it out on GitHub! It’s lightweight, fast, and fully typed.\n\nFeedback is welcome! 👇`}
                stats={{
                    likes: 856,
                    comments: 102,
                    reposts: 430
                }}
            />
             <FeedPost 
                author={{
                    name: "TechCrunch",
                    title: "Technology News and Analysis",
                    avatar: "https://upload.wikimedia.org/wikipedia/commons/b/b9/TechCrunch_logo.jpg",
                    time: "1d"
                }}
                content={`Breaking: Major tech company announces breakthrough in quantum computing stability. This could change everything we know about encryption and processing speed. Full story in the comments.`}
                stats={{
                    likes: 2100,
                    comments: 450,
                    reposts: 890
                }}
            />
          </div>

          {/* Right Sidebar - Hidden on tablet/mobile, 3 cols wide on desktop */}
          <div className="hidden lg:block lg:col-span-4 xl:col-span-3">
             <RightSidebar />
          </div>
        </div>
      </main>
    </div>
  );
}
