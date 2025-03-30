import React from 'react';
import Orb from '@/components/ui/orb.tsx';

const Loading: React.FC = () => (
    <>
    <div className="fixed w-full h-[600px] z-0 inset-0 bg-black min-h-screen items-center justify-center animate-fade-in">
        <Orb />
    </div>
    <div className="fixed h-full w-full z-10 items-center justify-center flex">
        <div className={"font-bold text-6xl mt-5 text-white animate-fade-in-up-fast"}>
            Generating your journal...
        </div>
    </div>
    </>
)

export default Loading;