
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, ChevronDown, Plus, X } from 'lucide-react';
import ImageUpload from './ImageUpload';
import { useToast } from '@/hooks/use-toast';

interface JournalEntry {
  id: string;
  image: string;
  title: string;
  story: string;
  date: Date;
  tags: string[];
}

interface NewEntryFormProps {
  onSave: (entry: JournalEntry) => void;
}

const PRESET_TAGS = [
  'Casual', 'Formal', 'Work', 'Evening', 'Spring', 'Summer', 
  'Fall', 'Winter', 'Vintage', 'Minimalist', 'Colorful', 'Monochrome'
];

const NewEntryForm: React.FC<NewEntryFormProps> = ({ onSave }) => {
  const [title, setTitle] = useState('');
  const [story, setStory] = useState('');
  const [date, setDate] = useState<Date>(new Date());
  const [image, setImage] = useState<File | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [customTag, setCustomTag] = useState('');
  const { toast } = useToast();

  const handleImageUpload = (file: File) => {
    setImage(file);
  };

  const handleTagSelect = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleTagRemove = (tag: string) => {
    setSelectedTags(selectedTags.filter(t => t !== tag));
  };

  const handleAddCustomTag = () => {
    if (customTag.trim() && !selectedTags.includes(customTag.trim())) {
      setSelectedTags([...selectedTags, customTag.trim()]);
      setCustomTag('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !story || !image) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would upload the image to a server and get a URL
    // For this demo, we'll use a placeholder
    const imageUrl = URL.createObjectURL(image);
    
    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      image: imageUrl,
      title,
      story,
      date,
      tags: selectedTags,
    };
    
    onSave(newEntry);
    
    toast({
      title: "Success!",
      description: "Your journal entry has been created",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <Label htmlFor="title" className="text-journal-700 font-medium mb-1 block">Title</Label>
            <Input
              id="title"
              placeholder="Title your outfit journal"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border-journal-200 focus-visible:ring-journal-500"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="story" className="text-journal-700 font-medium mb-1 block">Your Outfit Story</Label>
            <Textarea
              id="story"
              placeholder="Share the story behind your outfit - what inspired you, how it makes you feel, where you're going..."
              value={story}
              onChange={(e) => setStory(e.target.value)}
              className="min-h-[200px] border-journal-200 focus-visible:ring-journal-500"
              required
            />
          </div>
          
          <div>
            <Label className="text-journal-700 font-medium mb-1 block">Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left border-journal-200 hover:bg-journal-50"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(date) => date && setDate(date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div>
            <Label className="text-journal-700 font-medium mb-3 block">Tags</Label>
            <div className="flex flex-wrap gap-2 mb-3">
              {selectedTags.map(tag => (
                <div key={tag} className="tag flex items-center">
                  <span>{tag}</span>
                  <button 
                    type="button"
                    onClick={() => handleTagRemove(tag)}
                    className="ml-1 text-journal-500 hover:text-journal-700"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
            
            <div className="flex gap-2">
              <Input
                placeholder="Add custom tag"
                value={customTag}
                onChange={(e) => setCustomTag(e.target.value)}
                className="border-journal-200 focus-visible:ring-journal-500"
              />
              <Button 
                type="button" 
                variant="outline"
                onClick={handleAddCustomTag}
                className="border-journal-200 hover:bg-journal-50"
              >
                <Plus size={18} />
              </Button>
            </div>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="mt-2 w-full justify-between border-journal-200 hover:bg-journal-50"
                  type="button"
                >
                  <span>Select from preset tags</span>
                  <ChevronDown size={16} />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-2">
                <div className="flex flex-wrap gap-1.5">
                  {PRESET_TAGS.map(tag => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => handleTagSelect(tag)}
                      className={`tag cursor-pointer ${
                        selectedTags.includes(tag) ? 'bg-journal-200' : ''
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        
        <div>
          <Label className="text-journal-700 font-medium mb-3 block">Upload Your Outfit</Label>
          <ImageUpload onImageUpload={handleImageUpload} />
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button 
          type="submit"
          className="bg-journal-800 hover:bg-journal-900 text-white px-8"
        >
          Save Journal Entry
        </Button>
      </div>
    </form>
  );
};

export default NewEntryForm;
