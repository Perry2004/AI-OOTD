
import React from 'react';
import { format } from 'date-fns';
import { MoreHorizontal, Edit, Share2, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link } from 'react-router-dom';

interface JournalEntry {
  id: string;
  image: string;
  title: string;
  story: string;
  date: Date;
  tags: string[];
}

interface JournalCardProps {
  entry: JournalEntry;
  onDelete: (id: string) => void;
}

const JournalCard: React.FC<JournalCardProps> = ({ entry, onDelete }) => {
  const truncateStory = (text: string, maxLength: number = 150) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  };

  const handleShareClick = () => {
    // In a real app, this would open a share dialog
    alert('Sharing functionality would be implemented here');
  };

  return (
    <div className="journal-entry flex flex-col h-full">
      <div className="relative">
        <img 
          src={entry.image} 
          alt={entry.title} 
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
                <Link to={`/edit/${entry.id}`} className="w-full flex items-center">
                  <Edit size={16} className="mr-2" />
                  <span>Edit</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" onClick={handleShareClick}>
                <Share2 size={16} className="mr-2" />
                <span>Share</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="cursor-pointer text-destructive focus:text-destructive" 
                onClick={() => onDelete(entry.id)}
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
          <h3 className="font-serif text-lg font-medium text-journal-800">{entry.title}</h3>
          <span className="text-xs text-journal-500">{format(entry.date, 'MMM d, yyyy')}</span>
        </div>
        
        <p className="text-sm text-journal-600 mb-3 flex-1">{truncateStory(entry.story)}</p>
        
        <div className="flex flex-wrap">
          {entry.tags.map(tag => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JournalCard;
