
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import NewEntryForm from '@/components/NewEntryForm';

interface JournalEntry {
  id: string;
  image: string;
  title: string;
  story: string;
  date: Date;
  tags: string[];
}

const EditEntry = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [entry, setEntry] = useState<JournalEntry | null>(null);

  useEffect(() => {
    const savedEntries = localStorage.getItem('journalEntries');
    if (savedEntries) {
      try {
        const parsedEntries = JSON.parse(savedEntries);
        const entriesWithDates = parsedEntries.map((entry: any) => ({
          ...entry,
          date: new Date(entry.date)
        }));
        
        const foundEntry = entriesWithDates.find((e: JournalEntry) => e.id === id);
        if (foundEntry) {
          setEntry(foundEntry);
        } else {
          toast({
            title: "Entry not found",
            description: "The journal entry you're trying to edit doesn't exist",
            variant: "destructive",
          });
          navigate('/');
        }
      } catch (error) {
        console.error('Error parsing saved entries:', error);
        navigate('/');
      }
    } else {
      navigate('/');
    }
  }, [id, navigate, toast]);

  const handleSave = (updatedEntry: JournalEntry) => {
    const savedEntries = localStorage.getItem('journalEntries');
    if (savedEntries) {
      try {
        const entries = JSON.parse(savedEntries);
        const updatedEntries = entries.map((e: any) => 
          e.id === id ? { ...updatedEntry, id } : e
        );
        
        localStorage.setItem('journalEntries', JSON.stringify(updatedEntries));
        toast({
          title: "Changes saved",
          description: "Your journal entry has been updated",
        });
        navigate('/');
      } catch (error) {
        console.error('Error updating entry:', error);
      }
    }
  };

  if (!entry) {
    return (
      <div className="min-h-screen bg-journal-50">
        <Header />
        <main className="container py-8 px-4 md:px-8 max-w-5xl">
          <p>Loading entry...</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-journal-50">
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
          <h1 className="text-2xl md:text-3xl font-serif font-medium text-journal-800 mb-6">Edit Journal Entry</h1>
          <NewEntryForm onSave={handleSave} />
        </div>
      </main>
    </div>
  );
};

export default EditEntry;
