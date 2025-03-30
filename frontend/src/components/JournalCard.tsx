import React from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { MoreHorizontal, Edit, Share2, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface JournalEntry {
  journal: string;
  time: Date;
  imageDataUrl: string;
}

interface JournalCardProps {
  entry: JournalEntry;
  onDelete: (entry: JournalEntry) => void;
}

const JournalCard: React.FC<JournalCardProps> = ({ entry, onDelete }) => {

  const handleShareClick = () => {
    alert("Share clicked");
  }

  return (
    <div className="journal-entry flex flex-col h-full dark:bg-journal-900 dark:border-journal-900">
      <div className="relative">
        {entry.imageDataUrl ? (
          <img
            src={entry.imageDataUrl}
            className="journal-card-image"
            alt="Journal entry"
          />
        ) : (
          <div className="journal-card-image relative overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-950 dark:via-purple-950 dark:to-pink-950 flex items-center justify-center">
            {/* Shimmering overlay */}
            <div className="absolute inset-0 w-full h-full animate-pulse opacity-50">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent shimmer-animation"></div>
            </div>

            {/* Glowing icon */}
            <div className="flex flex-col items-center z-10">
              <div className="p-3 rounded-full bg-white/10 backdrop-blur-sm animate-pulse-slow shadow-lg glow-effect">
                <ImageIcon
                  size={32}
                  className="text-indigo-300 dark:text-indigo-400"
                />
              </div>
              <span className="text-sm mt-3 font-medium text-gray-500 dark:text-gray-400">
                Loading image...
              </span>
            </div>

            <style>
              {`
                @keyframes shimmer {
                  0% {
                    transform: translateX(-100%);
                  }
                  100% {
                    transform: translateX(100%);
                  }
                }

                .shimmer-animation {
                  animation: shimmer 2s infinite;
                }

                .glow-effect {
                  box-shadow: 0 0 15px 2px rgba(139, 92, 246, 0.5);
                }

                .animate-pulse-slow {
                  animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
              `}
            </style>
          </div>
        )}
        <div className="absolute top-3 right-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-1.5 bg-white/80 rounded-full hover:bg-white">
                <MoreHorizontal size={18} className="text-journal-800" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
              <DropdownMenuItem className="cursor-pointer" asChild>
                <Link to={`/edit`} className="w-full flex items-center">
                  <Edit size={16} className="mr-2" />
                  <span>Edit</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={handleShareClick}
              >
                <Share2 size={16} className="mr-2" />
                <span>Share</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                  className="cursor-pointer text-destructive focus:text-destructive"
                  onClick={() => onDelete(entry)}
              >
                <Trash2 size={16} className="mr-2" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-journal-500">
            {format(entry.time, "MMM d, yyyy")}
          </span>
        </div>

        <p className="text-sm text-journal-600 dark:text-journal-300 mb-3 flex-1">
          {entry.journal}
        </p>
      </div>
    </div>
  );
};

export default JournalCard;
