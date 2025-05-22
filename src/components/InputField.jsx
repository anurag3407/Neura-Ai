import { useState } from 'react';

const InputField = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSubmit(inputValue);
      setInputValue('');
    }
  };
  
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSubmit(event);
    }
  };
  
  return (
    <form 
      onSubmit={handleSubmit} 
      className='w-full max-w-[90%] md:max-w-[75%] lg:max-w-[65%] flex items-center mx-auto mt-4' 
    >
      <div className='flex-1 relative rounded-l-full rounded-r-none p-px h-12 border border-r-0 border-zinc-800/70' style={{ backgroundColor: '#211D1D' }}>
        <input 
          type="text" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className='w-full h-full rounded-l-full pl-4 pr-2 focus:outline-none bg-transparent'
          placeholder='Ask anything...'
          onKeyDown={handleKeyDown}
          autoComplete="off"
          style={{ caretColor: '#F1D9D9', color: '#F1D9D9' }}
        />
      </div>
      <button 
        onClick={handleSubmit} 
        className='h-12 min-w-[70px] rounded-r-full flex items-center justify-center transition-all duration-200 hover:bg-[#2c2828]'
        style={{ backgroundColor: '#211D1D', border: '1px solid rgba(255,255,255,0.15)', borderLeft: 'none', boxShadow: '0 2px 6px rgba(0,0,0,0.2)' }}
      >
        <div className='flex items-center px-3'>
          <span className='mr-2 text-sm font-medium' style={{ letterSpacing: '0.5px' }}>Send</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="#F1D9D9" className="bi bi-arrow-up-right" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M14 2.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0 0 1h4.793L2.146 13.146a.5.5 0 0 0 .708.708L13 3.707V8.5a.5.5 0 0 0 1 0z"/>
          </svg>
        </div>
      </button>
    </form>
  );
};

export default InputField;
