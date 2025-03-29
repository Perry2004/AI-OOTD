import React, {useState} from 'react';
import {PenLine, Search} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import {Input} from "@/components/ui/input.tsx";

interface JournalEntry {
    id: string;
    image: string;
    title: string;
    story: string;
    date: Date;
    tags: string[];
}

const Header = () => {
    const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="w-full py-4 px-4 md:px-8 border-b border-journal-100 flex items-center justify-between">
      <Link to="/" className="flex items-center space-x-2">
        <h1 className="text-xl md:text-2xl font-serif font-medium text-journal-800">AI-OOTD</h1>
      </Link>
        <div className="w-full md:w-auto flex gap-3">
            <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-journal-400" size={18} />
                <Input
                    placeholder="Search entries..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 border-journal-200 w-full"
                />
            </div>
            <Link to="/new-entry">
                <Button className="bg-journal-800 hover:bg-journal-900 text-white">
                    <PenLine size={18} className="mr-2" />
                    New Entry
                </Button>
            </Link>
        </div>
    </header>
  );
};

export default Header;
