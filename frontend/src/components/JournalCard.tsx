import React from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { MoreHorizontal, Edit, Share2, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface JournalEntry {
  _id: string;
  journal: string;
  time: Date;
  imageDataUrl: string;
}

interface JournalCardProps {
  entry: JournalEntry;
  onDelete: (_id: string) => void;
}

const JournalCard: React.FC<JournalCardProps> = ({ entry, onDelete }) => {
  const handleEditClick = () => {
    alert("Edit clicked");
  };

  const handleShareClick = () => {
    alert("Share clicked");
  };

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
            <div className="flex flex-col items-center justify-center w-full h-full">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-white/90 dark:bg-journal-800/90 flex items-center justify-center glow-effect">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-300 via-indigo-300 to-pink-300 dark:from-purple-600 dark:via-indigo-600 dark:to-pink-600 flex items-center justify-center animate-spin duration-2000">
                    <div className="w-14 h-14 rounded-full bg-white/90 dark:bg-journal-800/90 flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-purple-500 dark:text-purple-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <span className="text-sm mt-4 font-medium text-gray-600 dark:text-gray-300 animate-pulse">
                Loading...
              </span>
            </div>

            <style>{`
              .animate-spin {
                animation: spin 1.5s linear infinite;
              }

              @keyframes spin {
                from {
                  transform: rotate(0deg);
                }
                to {
                  transform: rotate(360deg);
                }
              }
            `}</style>

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
              <DropdownMenuItem className="cursor-pointer" onClick={handleEditClick}>
                  <Edit size={16} className="mr-2" />
                  <span>Edit</span>
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
                onClick={() => onDelete(entry._id)}
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
