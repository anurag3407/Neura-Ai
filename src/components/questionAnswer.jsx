import Answer from './Answers';
import StructuredResponse from './StructuredResponse';

const QuestionAnswer = ({ item, index }) => {
    return (
        <>
            <div key={index + Math.random()} className={item.type === 'q' ? 'flex justify-end mb-6' : 'mb-6'}>
                {
                    item.type === 'q' ? (
                        <li key={index + Math.random()}
                            className='text-right p-4 user-message max-w-[85%] md:max-w-[65%] w-fit shadow-md animate-messageIn'
                            style={{ fontWeight: 500, color: '#F1D9D9', backgroundColor: '#211D1D' }}
                        >
                            <Answer ans={item.text} totalResult={1} index={index} type={item.type} />
                        </li>
                    ) : (
                        <div className="ml-2 animate-messageIn w-full">
                            {item.structuredFormat ? (
                                <li className='text-left p-5 assistant-message max-w-[95%] md:max-w-[95%] w-fit shadow-md' style={{ backgroundColor: '#211D1D', color: '#F1D9D9' }}>
                                    <StructuredResponse content={item.rawText} />
                                </li>
                            ) : (
                                item.text.map((ansItem, ansIndex) => (
                                    <li key={ansIndex + Math.random()}
                                        className={`text-left p-4 assistant-message max-w-[95%] md:max-w-[95%] w-fit shadow-md ${ansIndex > 0 ? 'mt-3' : ''}`}
                                        style={{ backgroundColor: '#211D1D', color: '#F1D9D9' }}
                                    >
                                        <Answer ans={ansItem} totalResult={item.text.length} type={item.type} index={ansIndex} />
                                    </li>
                                ))
                            )}
                        </div>
                    )
                }
            </div>
        </>
    )
}

export default QuestionAnswer;