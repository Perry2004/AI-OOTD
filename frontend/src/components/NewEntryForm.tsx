
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
import MoodSlider from "@/components/MoodSlider.tsx";

interface JournalEntry {
  id: string;
  image: string;
  story: string;
  date: Date;
  mood: string;
}

interface NewEntryFormProps {
  onSave: (entry: JournalEntry) => void;
}

const NewEntryForm: React.FC<NewEntryFormProps> = ({ onSave }) => {
  const [story, setStory] = useState('');
  const [date, setDate] = useState<Date>(new Date());
  const [image, setImage] = useState<File | null>(null);
  const [mood, setMood] = useState<string | null>(null);
  const { toast } = useToast();

  const handleImageUpload = (file: File) => {
    setImage(file);
  };

  // const handleMoodChange = (level: number) => {
  //   setMood(level);
  // }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!story || !image || !mood) {
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
    console.log(imageUrl);
    
    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      image: imageUrl,
      story,
      date,
      mood,
    };
    
    onSave(newEntry);
    
    toast({
      title: "Success!",
      description: "Your journal entry has been created",
    });
  };

  return (
    <form className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          
          <div>
            <Label htmlFor="story" className="text-journal-700 dark:text-journal-50 font-medium mb-3 block">One Interesting Story For Today</Label>
            <Textarea
              id="story"
              placeholder="Share the story behind your outfit - what inspired you, how it makes you feel, where you're going..."
              value={story}
              onChange={(e) => setStory(e.target.value)}
              className="min-h-[350px] border-journal-200 dark:border-journal-800 focus-visible:ring-journal-500"
            />
          </div>
          
          <div>
            <Label className="text-journal-700 dark:text-journal-50 font-medium mb-3 block">Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left border-journal-200 dark:border-journal-800 hover:bg-journal-50 dark:hover:bg-journal-900"
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
             <Label className="text-journal-700 dark:text-journal-50 font-medium mb-3 block">Your Mood</Label>
              {/*<MoodSlider onChange={handleMoodChange} />*/}
            <Textarea id={"mood"}
                      placeholder={"How do you feel today?"}
                      value={mood}
                      onChange={(e) => setMood(e.target.value)}
                      className={"min-h-2"}
                      />
          </div>
        </div>
        
        <div>
          <Label className="text-journal-700 dark:text-journal-50 font-medium mb-3 block">Upload Your Outfit</Label>
          <ImageUpload onImageUpload={handleImageUpload} />
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button 
          type="submit"
          className="bg-journal-800 hover:bg-journal-900 text-white px-8"
          onClick={handleSubmit}
        >
          Generate Journal Entry
        </Button>
      </div>
    </form>
  );
};

export default NewEntryForm;
