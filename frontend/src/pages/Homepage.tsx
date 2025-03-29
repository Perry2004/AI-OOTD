
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import JournalCard from '@/components/JournalCard';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

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
    <div>
      <Header />
      
      <main className="animate-fade-in-up-fast container py-8 px-4 md:px-8 max-w-7xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-serif font-medium text-journal-800 mb-1">Your Journal</h1>
            <p className="text-journal-600">See all your journey here.</p>
          </div>
        </div>
        
        {entries.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-lg border border-journal-100">
            <div className="text-center max-w-md mx-auto p-6">
              <h2 className="text-2xl font-serif font-medium text-journal-800 mb-3">Start Your Fashion Journey</h2>
              <p className="text-journal-600 mb-6">
                Document your outfits, tell your style story, and create a beautiful visual journal of your personal fashion evolution.
              </p>
              <Link to="/new-entry">
                <Button className="bg-journal-800 hover:bg-journal-900 text-white">
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
  );
};

export default Homepage;
