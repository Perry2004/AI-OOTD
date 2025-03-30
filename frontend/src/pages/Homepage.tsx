import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import JournalCard from "@/components/JournalCard";
import { Button } from "@/components/ui/button";
import { PenLine, Search } from "lucide-react";
import { Input } from "@/components/ui/input.tsx";
import Threads from "@/components/ui/threads.tsx";
import axios from "axios";

interface JournalEntry {
  journal: string;
  time: Date;
  imageDataUrl: string;
}

function useLocalStorage(key, initialValue: unknown[]) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: unknown[]) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}

const Homepage = () => {
  // const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [entries, setEntries] = useLocalStorage(
    "journalEntries",
    [] as JournalEntry[]
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [hasLocalEntries, setHasLocalEntries] = useState(entries.length > 0);
  const [loading, setLoading] = useState(true);

  const filteredEntries = entries.filter((entry) => {
    if (!searchQuery) return true;

    const query = searchQuery.toLowerCase();
    return entry.journal.toLowerCase().includes(query);
  });
  const getJournalEntries = async () => {
    try {
      const response = await axios.get("http://localhost:3000/journal");
      setEntries(response.data);

      // local storage stuff
      const entriesForStorage = response.data.map((entry) => ({
        time: entry.time,
        journal: entry.journal,
        // imageDataUrl: entry.imageDataUrl,
        imageDataUrl: undefined,
      }));
      localStorage.setItem("journalEntries", JSON.stringify(entriesForStorage));

      setHasLocalEntries(entriesForStorage.length > 0);
      console.log(response);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getJournalEntries();
  }, []);

  const handleDeleteEntry = (entry: JournalEntry) => {
    // const updatedEntries = entries.filter(entry => entry.id !== id);
    // setEntries(updatedEntries);
    // localStorage.setItem('journalEntries', JSON.stringify(updatedEntries));
    //
    // toast({
    //   title: "Entry deleted",
    //   description: "Your journal entry has been removed",
    // });
  };

  return (
    <>
      <div className={"fixed z-0 inset-0 h-full w-full"}>
        <Threads distance={2} amplitude={5} />
      </div>
      <div className={"fixed z-10 h-full w-full overflow-y-scroll"}>
        <div className={"sticky top-0 z-50"}>
          <Header />
        </div>
        <main className="animate-fade-in-up-fast container py-8 px-4 md:px-8 max-w-7xl z-10 inset-1">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-serif font-medium text-journal-800 mb-1 dark:text-white">
                Your Journal
              </h1>
              <p className="text-journal-600 dark:text-journal-400">
                See all your journals here.
              </p>
            </div>
            <div className="w-full md:w-auto flex gap-3">
              <div className="relative flex-1 md:w-64">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-journal-400 dark:text-journal-600"
                  size={18}
                />
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

          {/* loading, no storage */}
          {loading && !hasLocalEntries && (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-journal-800 dark:border-journal-200 mb-6" />
              <div className={"text-xl font-bold text-black dark:text-white"}>
                Loading your journals...
              </div>
            </div>
          )}

          {/* loading, has storage */}
          {loading && hasLocalEntries && (
            <>
              {entries.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-black rounded-lg border border-journal-100 dark:border-journal-900">
                  <div className="text-center max-w-md mx-auto p-6">
                    <h2 className="text-2xl font-serif font-medium text-journal-800 dark:text-journal-200 mb-3">
                      Start Your Journey
                    </h2>
                    <p className="text-journal-600 mb-6">
                      Take a picture of your outfits, tell your interesting
                      story, and create a beautiful summary of your day.
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
                  {filteredEntries.reverse().map((entry) => (
                    <JournalCard entry={entry} onDelete={handleDeleteEntry} />
                  ))}
                </div>
              )}
            </>
          )}

          {/* completed state */}
          {!loading && (
            <>
              {entries.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-black rounded-lg border border-journal-100 dark:border-journal-900">
                  <div className="text-center max-w-md mx-auto p-6">
                    <h2 className="text-2xl font-serif font-medium text-journal-800 dark:text-journal-200 mb-3">
                      Start Your Journey
                    </h2>
                    <p className="text-journal-600 mb-6">
                      Take a picture of your outfits, tell your interesting
                      story, and create a beautiful summary of your day.
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
                  {filteredEntries.reverse().map((entry) => (
                    <JournalCard entry={entry} onDelete={handleDeleteEntry} />
                  ))}
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </>
  );
};

export default Homepage;
