import { useState } from 'react';

interface TabProps {
    titles: string[]; // Titles of each tab
    children: React.ReactElement[]; // Content of each tab
}

export default function Tabs({ titles, children }: TabProps) {
    const [activeIndex, setActiveIndex] = useState(0);

    function handleTabClick (index: number) {
        setActiveIndex(index);
    };

    return (
        <div>
            <div className="tab-titles">
                {titles.map((title, index) => (
                    <button
                        key={index}
                        className={`tab-title ${index === activeIndex ? 'active' : ''}`}
                        onClick={() => handleTabClick(index)}
                    >
                        {title}
                    </button>
                ))}
            </div>
            <div className="tab-content">
                {children[activeIndex]}
            </div>
        </div>
    );
};