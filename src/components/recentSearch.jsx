function RecentSearch({recentHistory, setRecentHistory, setSelectedHistory, closeSidebar}) {

    const clearHistory = () => {
        localStorage.clear();
        setRecentHistory([])
    }
    
    const handleItemClick = (item) => {
        setSelectedHistory(item.text || item);
        if (closeSidebar) {
            closeSidebar();
        }
    }
    

    const formatDate = (dateString) => {
        if (!dateString) return '';
        
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric',
                year: 'numeric'
            });
        } catch (e) {
            return '';
        }
    }

    return (
        <>
            <div className='min-h-screen border-r border-zinc-800/50 shadow-xl' style={{ backgroundColor: '#180B0B' }}>
                <div className="dark:text-zinc-200 p-5">
                    <div className='flex items-center justify-between mb-8'>
                        <h1 className='text-2xl flex items-center' style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, color: '#F1D9D9' }}>
                            <img src="/Neura.svg" alt="Neura Logo" className="w-9 h-9 mr-2" />
                            Neura
                        </h1>
                        <button onClick={clearHistory} className="text-gray-400 hover:text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                        </button>
                    </div>
                    <h2 className='text-lg mb-4' style={{ color: '#F1D9D9', fontWeight: 500 }}>Previous Questions</h2>
                    {recentHistory && recentHistory.length > 0 ? (
                        <ul className='space-y-4 mb-4 max-h-[calc(100vh-150px)] overflow-y-auto'>
                            {recentHistory.map((search, idx) => {
                                // Check if the search item is in the new format or old format
                                const searchText = search.text || search;
                                const searchDate = search.date ? formatDate(search.date) : '';
                                
                                return (
                                    <li key={idx} className='text-sm border-b border-zinc-800/30 pb-2 mb-2'>
                                        <button
                                            onClick={() => {
                                                handleItemClick(search);
                                            }}
                                            className='truncate hover:text-white text-left w-full py-1'
                                            style={{ color: '#F1D9D9', fontWeight: 'normal' }}
                                        >
                                            {searchText}
                                        </button>
                                        {searchDate && (
                                            <div className='text-xs text-gray-500'>
                                                {searchDate}
                                            </div>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    ) : (
                        <p className='text-gray-500 text-sm'>No recent questions</p>
                    )}
                </div>
            </div>
        </>
    )

}

export default RecentSearch