import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface MoodSliderProps {
    onChange?: (level: number) => void;
    initialLevel?: number|null;
    className?: string;
}

const MoodSlider: React.FC<MoodSliderProps> = ({
                                                   onChange,
                                                   initialLevel = null,
                                                   className = '',
                                               }) => {
    const [selectedLevel, setSelectedLevel] = useState(initialLevel);

    const levels = [
        { color: '#FF4136', label: 'Very Bad' },  // Red
        { color: '#FF851B', label: 'Bad' },       // Orange
        { color: '#FFDC00', label: 'Neutral' },   // Yellow
        { color: '#7FDB8E', label: 'Good' },      // Light Green
        { color: '#2ECC40', label: 'Very Good' }, // Green
    ];

    const handleLevelClick = (level: number) => {
        setSelectedLevel(level);
        if (onChange) onChange(level);
    };

    return (
        <div className={`flex flex-col items-center ${className}`}>
            <div className="flex justify-between w-full max-w-xs mb-1">
                {levels.map((level, index) => (
                    <motion.button
                        key={index}
                        className={`w-16 h-14 flex items-center justify-center border border-journal-200 dark:border-journal-800 hover:border-2 transition-all
                            ${(index===4) ? 'rounded-r-full': ''} ${(index===0) ? 'rounded-l-full': ''}`
                    }
                        style={{
                            backgroundColor: selectedLevel === index + 1 ? level.color : 'transparent',
                        }}
                        whileHover={{ scale: 1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleLevelClick(index + 1)}
                        aria-label={`Mood level ${index + 1}: ${level.label}`}
                    >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="text-black dark:text-white font-bold"
                            >
                                {index + 1}
                            </motion.div>

                    </motion.button>
                ))}
            </div>
        </div>
    );
};

export default MoodSlider;