import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import NewEntryForm from "@/components/NewEntryForm";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import Threads from "@/components/ui/threads.tsx";

interface JournalEntry {
  image: File;
  story: string;
  mood: string;
}

const NewEntry = () => {
  const navigate = useNavigate();

  const handleSave = async (entry: JournalEntry) => {
    const formDatatoGemini = new FormData();
    formDatatoGemini.append("ootdImage", entry.image);
    formDatatoGemini.append("interestingThing", entry.story);
    formDatatoGemini.append("mood", entry.mood);

    navigate("/loading");

    // Save the entry to the server
    try {
      const responseFromGermini = await api.post("/journal", formDatatoGemini, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const formDatatoMongoDB = new FormData();
      formDatatoMongoDB.append("ootdImage", entry.image);
      formDatatoMongoDB.append("journal", responseFromGermini.data);

      const mongoDB = await api.put("/journal", formDatatoMongoDB, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Update local storage with the new entry
      const updatedEntries = JSON.parse(
        localStorage.getItem("journalEntries") || "[]"
      );
      const newEntry = {
        journal: responseFromGermini.data,
        time: new Date().toISOString(), // just use it for now, will be updated by fetch
      };
      updatedEntries.push(newEntry);
      localStorage.setItem("journalEntries", JSON.stringify(updatedEntries));

      console.log("Journal entry saved successfully");
    } catch (error) {
      console.log(error);
    }

    // Navigate back to home page
    navigate("/home");
  };

  return (
    <>
      <div className={"fixed z-0 inset-0 h-full w-full"}>
        <Threads distance={2} amplitude={5} />
      </div>
      <div className="fixed z-10 h-full w-full min-h-screen">
        <Header />
        <main className="container py-5 px-4 md:px-8 max-w-5xl animate-fade-in-up-fast">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-6 text-journal-600 hover:text-journal-800 black:hover:text-journal-200 hover:bg-journal-100"
          >
            <ArrowLeft size={18} className="mr-2" />
            Back
          </Button>

          <div className="z-10 bg-white dark:bg-black rounded-lg border border-journal-100 dark:border-journal-900 p-6 md:p-8">
            <h1 className="text-2xl md:text-3xl font-serif font-medium text-journal-800 dark:text-journal-200 mb-6">
              Create New Journal Entry
            </h1>
            <NewEntryForm onSave={handleSave} />
          </div>
        </main>
      </div>
    </>
  );
};

export default NewEntry;
