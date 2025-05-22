import { useEffect, useRef, useState } from 'react'
import { URL } from './constants';
import RecentSearch from './components/recentSearch';
import QuestionAnswer from './components/questionAnswer';
import InputField from './components/InputField';


const processApiResponse = (text) => {

  if (text.includes('**') || text.includes(':\n')) {

    return {
      structured: true,
      content: text
    };
  } else {

    const items = text.split('* ').map(item => item.trim()).filter(item => item);
    return {
      structured: false,
      content: items
    };
  }
};

function App() {

  

  const [result, setResult] = useState([]);
  const [recentHistory, setRecentHistory] = useState(JSON.parse(localStorage.getItem('history')) || []);
  const [selectedHistory, setSelectedHistory] = useState('');
  const [lastAnsweredQuestion, setLastAnsweredQuestion] = useState('');
  

  const scrollToAns = useRef();
  const [loader, setLoader] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showGreeting, setShowGreeting] = useState(true);
  

  const currentQuestionRef = useRef('');

  const askQuestion = async (questionText = null) => {

    if (!questionText && !selectedHistory) {
      return false
    }


    const currentQ = questionText ? questionText : selectedHistory;
    currentQuestionRef.current = currentQ;


    if (questionText) {
      const timestamp = new Date().toISOString();
      const newHistoryItem = {
        text: questionText,
        date: timestamp
      };
      
      const history = JSON.parse(localStorage.getItem('history')) || [];
      const updatedHistory = [newHistoryItem, ...history];
      localStorage.setItem('history', JSON.stringify(updatedHistory));
      setRecentHistory(updatedHistory);
    }


    const payload = {
      "contents": [{
        "parts": [{ "text": currentQ }]
      }]
    }

    try {
      setLoader(true);
      const response = await fetch(URL, {
        method: "POST",
        body: JSON.stringify(payload)
      });

      const responseData = await response.json();
      const dataString = responseData.candidates[0].content.parts[0].text;
      

      const formattedData = dataString.split("* ").map(item => item.trim()).filter(item => item);
      

      const newResult = [
        { type: 'q', text: currentQ }, 
        { 
          type: 'a', 
          text: formattedData,
          rawText: dataString,
          structuredFormat: true
        }
      ];
      

      const updatedResult = [...result, ...newResult];
      setResult(updatedResult);
      

      setLastAnsweredQuestion(currentQ);
      

      setTimeout(() => {
        if (scrollToAns.current) {
          scrollToAns.current.scrollTop = scrollToAns.current.scrollHeight;
        }
      }, 300);
    } catch (error) {
      console.error('Error fetching answer:', error);
    } finally {
      setLoader(false);
    }
  }





  useEffect(() => {
    if (selectedHistory) {
      askQuestion();
    }
  }, [selectedHistory])


  useEffect(() => {
    document.documentElement.classList.add('dark')
  }, [])
  

  useEffect(() => {
    if (result.length > 0) {
      setShowGreeting(false);
    }
  }, [result])

  return (
    <div className="dark" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      <div className='relative h-screen flex flex-col md:flex-row'>
        

        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className='md:hidden fixed top-4 left-4 z-20 p-2 rounded-full bg-zinc-800 text-zinc-300'
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        

        <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 fixed md:relative z-10 w-64 h-full md:w-1/5 md:block sidebar`} style={{ backgroundColor: '#180B0B' }}>
          <RecentSearch 
            recentHistory={recentHistory} 
            setRecentHistory={setRecentHistory} 
            setSelectedHistory={setSelectedHistory} 
            closeSidebar={() => setSidebarOpen(false)}
          />
        </div>
        

        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-0 md:hidden" 
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}
        

        <div className='flex-1 md:w-4/5 p-0 overflow-hidden flex flex-col' style={{ backgroundColor: '#1E0F0F', color: '#F1D9D9' }}>

          <div className='sticky top-0 z-10 py-4 px-6 border-b border-zinc-900/50' style={{ backgroundColor: '#1E0F0F' }}>
            {lastAnsweredQuestion ? (
              <h2 className='text-lg font-medium flex items-center' style={{ color: '#F1D9D9', fontWeight: 500 }}>
                <img src="/Neura.svg" alt="Neura Icon" className="w-5 h-5 mr-2" />
                {lastAnsweredQuestion.charAt(0).toUpperCase() + lastAnsweredQuestion.slice(1)}
              </h2>
            ) : null}
          </div>

          <div ref={scrollToAns} className='container flex-1 overflow-auto px-6 py-4 pb-6'>
            <div className='text-zinc-300'>
              {showGreeting && result.length === 0 ? (
                <div className='text-center py-16'>
                  <img src="/Neura.svg" alt="Neura Logo" className="w-28 h-28 mx-auto mb-8" />
                  <h2 className='text-2xl font-semibold mb-4 text-zinc-100'>Welcome to Neura</h2>
                  <p className='text-lg text-zinc-400 max-w-lg mx-auto mb-5'>Your intelligent assistant ready to answer all your questions.</p>
                  <p className='text-zinc-500'>Type something below to get started!</p>
                </div>
              ) : (
                <ul className="space-y-6">
                  {result.map((item, index) => (
                    <QuestionAnswer key={index} item={item} index={index}/>
                  ))}
                </ul>
              )}
            </div>
          </div>


          <div className="py-2 border-t border-zinc-800/30">

            {loader && (
              <div className="flex justify-center mb-3">
                <div className="bg-[#211D1D] rounded-full px-4 py-2 shadow-lg flex items-center">
                  <svg aria-hidden="true" className="w-5 h-5 text-gray-600 animate-spin fill-[#F1D9D9]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                  </svg>
                  <span className="text-[#F1D9D9] ml-2 text-sm">Thinking...</span>
                </div>
              </div>
            )}
            

            <InputField onSubmit={askQuestion} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App