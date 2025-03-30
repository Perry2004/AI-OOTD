import React from 'react';
import Aurora from "@/components/ui/aurora.tsx";
import {PenLine} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";

const Index = () => {
    const handleClick = () => {
        window.location.href = "/home";
    };

    return (
        <>
            <div className={"fixed inset-0 z-0 bg-black h-full w-full"}>
                <Aurora amplitude={10} blend={40} speed={1} />
            </div>
            <div className={"fixed inset-0 z-0 bg-black/10 h-full w-full"} />
            <div className={"fixed z-10 w-full h-full bg-black/50 items-center justify-center flex flex-col"}>
                <div className="animate-fade-in">
                    <h1 className={"flex font-bold text-white text-7xl transition-all"}>OOTDscribe</h1>
                    <h3 className={"flex font-semibold text-white text-3xl "}>Document your journey, one outfit and story at a time.</h3>
                </div>
                <div className={"animate-fade-in-up-slow flex flex-col pt-8"}>
                    <Button className="cursor-pointer bg-journal-800  hover:bg-journal-900 hover:scale-105 transition-all text-white"
                            size={"xl"}
                            onClick={handleClick}>
                        <PenLine size={28} strokeWidth={2.5} className="mr-1" />
                        <h1 className={"text-xl"}>Begin my journey</h1>
                    </Button>
                </div>
            </div>
            </>
    );
}

export default Index;