import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Image, Calendar, Newspaper, MessageSquare, ThumbsUp, Repeat, Send, MoreHorizontal, X } from "lucide-react";
import myAvatar from "@assets/stock_images/professional_headsho_6a369208.jpg";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function CreatePost() {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="bg-card rounded-lg border border-border p-3 shadow-sm mb-2" data-testid="create-post-widget">
      <div className="flex gap-3 mb-2">
        <Avatar className="h-12 w-12 cursor-pointer">
          <AvatarImage src={myAvatar} />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div className="flex-1">
            <button 
                className="w-full text-left bg-transparent border border-muted hover:bg-muted/30 rounded-full h-12 px-4 text-sm font-medium text-muted-foreground transition-colors"
                onClick={() => setIsFocused(true)}
                data-testid="button-start-post"
            >
                Start a post
            </button>
        </div>
      </div>
      <div className="flex justify-between items-center px-2">
         <ActionButton icon={Image} label="Media" color="text-blue-500" />
         <ActionButton icon={Calendar} label="Event" color="text-orange-700" />
         <ActionButton icon={Newspaper} label="Write article" color="text-orange-600" />
      </div>
    </div>
  );
}

function ActionButton({ icon: Icon, label, color }: { icon: any, label: string, color: string }) {
    return (
        <button className="flex items-center gap-3 py-3 px-2 rounded hover:bg-muted/50 transition-colors flex-1 justify-center">
            <Icon className={`h-5 w-5 ${color}`} />
            <span className="text-sm font-medium text-muted-foreground">{label}</span>
        </button>
    )
}

interface PostProps {
    author: {
        name: string;
        title: string;
        avatar: string;
        time: string;
    };
    content: string;
    image?: string;
    stats: {
        likes: number;
        comments: number;
        reposts: number;
    }
}

export function FeedPost({ author, content, image, stats }: PostProps) {
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(stats.likes);

    const handleLike = () => {
        if (liked) {
            setLikeCount(prev => prev - 1);
        } else {
            setLikeCount(prev => prev + 1);
        }
        setLiked(!liked);
    }

    return (
        <div className="bg-card rounded-lg border border-border mb-2 shadow-sm overflow-hidden" data-testid={`post-${author.name.replace(/\s+/g, '-').toLowerCase()}`}>
            {/* Header */}
            <div className="p-3 pb-2 flex gap-3">
                <Avatar className="h-12 w-12 cursor-pointer">
                    <AvatarImage src={author.avatar} />
                    <AvatarFallback>{author.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                    <div className="flex justify-between items-start">
                        <div>
                             <h3 className="text-sm font-semibold hover:underline hover:text-primary cursor-pointer">{author.name}</h3>
                             <p className="text-xs text-muted-foreground line-clamp-1">{author.title}</p>
                             <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                                <span>{author.time}</span>
                                <span>•</span>
                                <UsersIcon className="h-3 w-3" />
                             </div>
                        </div>
                        <button className="text-muted-foreground hover:bg-muted rounded-full p-1">
                            <MoreHorizontal className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="px-4 pb-2">
                <p className="text-sm whitespace-pre-line leading-relaxed">{content}</p>
            </div>

            {/* Media */}
            {image && (
                <div className="w-full bg-muted/20">
                    <img src={image} alt="Post content" className="w-full object-cover max-h-[500px]" />
                </div>
            )}

            {/* Stats */}
            <div className="px-4 py-2 border-b border-border/50">
                <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <div className="flex items-center gap-1 hover:text-primary hover:underline cursor-pointer">
                        <div className="flex -space-x-1">
                            <div className="bg-blue-500 rounded-full p-[2px]">
                                <ThumbsUp className="h-2 w-2 text-white fill-current" />
                            </div>
                        </div>
                        <span>{likeCount}</span>
                    </div>
                    <div className="flex gap-2">
                        <span className="hover:text-primary hover:underline cursor-pointer">{stats.comments} comments</span>
                        <span>•</span>
                        <span className="hover:text-primary hover:underline cursor-pointer">{stats.reposts} reposts</span>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="px-2 py-1 flex justify-between">
                <PostAction 
                    icon={ThumbsUp} 
                    label="Like" 
                    active={liked} 
                    onClick={handleLike} 
                    activeColor="text-blue-600 fill-blue-600"
                />
                <PostAction icon={MessageSquare} label="Comment" />
                <PostAction icon={Repeat} label="Repost" />
                <PostAction icon={Send} label="Send" />
            </div>
        </div>
    )
}

function PostAction({ icon: Icon, label, active, onClick, activeColor }: { icon: any, label: string, active?: boolean, onClick?: () => void, activeColor?: string }) {
    return (
        <button 
            className={`flex items-center justify-center gap-2 py-3 px-2 rounded hover:bg-muted/50 transition-colors flex-1 ${active ? activeColor : 'text-muted-foreground hover:bg-muted/60'}`}
            onClick={onClick}
            data-testid={`button-post-${label.toLowerCase()}`}
        >
            <Icon className={`h-5 w-5 ${active ? '' : ''}`} />
            <span className="text-sm font-semibold">{label}</span>
        </button>
    )
}

function UsersIcon({className}: {className?: string}) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className={className}>
          <path d="M8.5 7A2.5 2.5 0 1 0 6 4.5 2.5 2.5 0 0 0 8.5 7zM11 9H6a3 3 0 0 0-3 3v2h11v-2a3 3 0 0 0-3-3z"/>
        </svg>
    )
}
