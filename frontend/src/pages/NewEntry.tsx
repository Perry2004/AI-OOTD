
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import NewEntryForm from '@/components/NewEntryForm';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface JournalEntry {
  id: string;
  image: string;
  title: string;
  story: string;
  date: Date;
  tags: string[];
}

const NewEntry = () => {
  const navigate = useNavigate();
  
  const handleSave = (entry: JournalEntry) => {
    // Save the new entry to localStorage
    const savedEntries = localStorage.getItem('journalEntries');
    let entries: JournalEntry[] = [];
    
    if (savedEntries) {
      try {
        entries = JSON.parse(savedEntries);
      } catch (error) {
        console.error('Error parsing saved entries:', error);
      }
    }
    
    entries.unshift(entry);
    localStorage.setItem('journalEntries', JSON.stringify(entries));
    
    // Navigate back to home page
    navigate('/home');
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container py-8 px-4 md:px-8 max-w-5xl">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-6 text-journal-600 hover:text-journal-800 hover:bg-journal-100"
        >
          <ArrowLeft size={18} className="mr-2" />
          Back
        </Button>
        
        <div className="bg-white rounded-lg border border-journal-100 p-6 md:p-8">
          <h1 className="text-2xl md:text-3xl font-serif font-medium text-journal-800 mb-6">Create New Journal Entry</h1>
          <NewEntryForm onSave={handleSave} />
        </div>
      </main>
    </div>
  );
};

export default NewEntry;
