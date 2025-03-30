
import React from 'react';
import { format } from 'date-fns';
import { MoreHorizontal, Edit, Share2, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface JournalEntry {
  journal: string;
  time: Date;
  imageDataUrl: string;
}

interface JournalCardProps {
  entry: JournalEntry;
  // onDelete: (id: string) => void;
}

const JournalCard: React.FC<JournalCardProps> = ({ entry }) => {

  const handleShareClick = () => {
    alert('Sharing functionality would be implemented here');
  };

  return (
    <div className="journal-entry flex flex-col h-full dark:bg-journal-900 dark:border-journal-900">
      <div className="relative">
        <img 
          src={entry.imageDataUrl}
          className="journal-card-image"
        />
        <div className="absolute top-3 right-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-1.5 bg-white/80 rounded-full hover:bg-white">
                <MoreHorizontal size={18} className="text-journal-800" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
              <DropdownMenuItem className="cursor-pointer" asChild>
                  <Edit size={16} className="mr-2" />
                  <span>Edit</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" onClick={handleShareClick}>
                <Share2 size={16} className="mr-2" />
                <span>Share</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="cursor-pointer text-destructive focus:text-destructive"
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
          <span className="text-xs text-journal-500">{format(entry.time, 'MMM d, yyyy')}</span>
        </div>
        
        <p className="text-sm text-journal-600 dark:text-journal-300 mb-3 flex-1">{entry.journal}</p>

      </div>
    </div>
  );
};

export default JournalCard;
