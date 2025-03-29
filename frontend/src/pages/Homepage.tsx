
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import JournalCard from '@/components/JournalCard';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {PenLine, Search} from "lucide-react";
import {Input} from "@/components/ui/input.tsx";
import Threads from '@/components/ui/threads.tsx';

interface JournalEntry {
  id: string;
  image: string;
  title: string;
  story: string;
  date: Date;
  tags: string[];
}

const Homepage = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  const filteredEntries = entries.filter(entry => {
    if (!searchQuery) return true;

    const query = searchQuery.toLowerCase();
    return (
        entry.title.toLowerCase().includes(query) ||
        entry.story.toLowerCase().includes(query) ||
        entry.tags.some(tag => tag.toLowerCase().includes(query))
    );
  });

  // Load entries from localStorage on mount
  useEffect(() => {
    const savedEntries = localStorage.getItem('journalEntries');
    if (savedEntries) {
      try {
        const parsed = JSON.parse(savedEntries);
        // Convert string dates back to Date objects
        const entriesWithDates = parsed.map((entry: JournalEntry) => ({
          ...entry,
          date: new Date(entry.date)
        }));
        setEntries(entriesWithDates);
      } catch (error) {
        console.error('Error parsing saved entries:', error);
      }
    }
  }, []);

  const handleDeleteEntry = (id: string) => {
    const updatedEntries = entries.filter(entry => entry.id !== id);
    setEntries(updatedEntries);
    localStorage.setItem('journalEntries', JSON.stringify(updatedEntries));
    
    toast({
      title: "Entry deleted",
      description: "Your journal entry has been removed",
    });
  };

  return (
      <>
        <div className={"fixed z-0 inset-0 h-full w-full"}>
            <Threads distance={2} amplitude={5}/>
        </div>
        <div className={"fixed z-10 h-full w-full"}>
          <Header />
          <main className="animate-fade-in-up-fast container py-8 px-4 md:px-8 max-w-7xl z-10 inset-1">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="text-3xl md:text-4xl font-serif font-medium text-journal-800 mb-1 dark:text-white">Your Journal</h1>
                <p className="text-journal-600 dark:text-journal-400">See all your journals here.</p>
              </div>
              <div className="w-full md:w-auto flex gap-3">
                <div className="relative flex-1 md:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-journal-400 dark:text-journal-600" size={18} />
                  <Input
                      placeholder="Search entries..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 border-journal-200 dark:border-journal-800 w-full"
                  />
                </div>
                <Link to="/new-entry">
                  <Button className="bg-journal-800 hover:bg-journal-900 dark:bg-journal-200 dark:hover:bg-journal-100 text-white dark:text-black">
                    <PenLine size={18} className="mr-2" />
                    New Entry
                  </Button>
                </Link>
              </div>
            </div>

            {entries.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-black rounded-lg border border-journal-100 dark:border-journal-900">
                  <div className="text-center max-w-md mx-auto p-6">
                    <h2 className="text-2xl font-serif font-medium text-journal-800 dark:text-journal-200 mb-3">Start Your Journey</h2>
                    <p className="text-journal-600 mb-6">
                      Take a picture of your outfits, tell your interesting story, and create a beautiful summary of your day.
                    </p>
                    <Link to="/new-entry">
                      <Button className="bg-journal-800 dark:bg-journal-200 hover:bg-journal-900 dark:hover:bg-journal-100 text-white dark:text-black">
                        Create Your First Entry
                      </Button>
                    </Link>
                  </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredEntries.map(entry => (
                      <JournalCard
                          key={entry.id}
                          entry={entry}
                          onDelete={handleDeleteEntry}
                      />
                  ))}
                </div>
            )}
          </main>
        </div>
      </>

  );
};

export default Homepage;
