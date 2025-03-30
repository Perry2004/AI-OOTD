import React from 'react';
import MagnetLines from "@/components/ui/magnetic-lines.tsx";

const Loading: React.FC = () => (
    <>
    <div className="fixed z-10 min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-journal-800"></div>
        <div className={"font-bold text-xl mt-5"}>
            Generating your journal...
        </div>
    </div>
    </>
)

export default Loading;