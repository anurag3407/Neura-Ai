import { useEffect, useState } from "react";
import { checkHeading, replaceHeadingStarts } from "../helper";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

import ReactMarkdown from 'react-markdown'

const Answer = ({ ans, totalResult, index,type }) => {

    const [heading, setHeading] = useState(false);
    const [answer, setAnswer] = useState(ans);
 

    useEffect(() => {
        if (checkHeading(ans)) {
            setHeading(true);
            setAnswer(replaceHeadingStarts(ans))
        }

    }, [])

    const renderer = {
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <SyntaxHighlighter
              {...props}
              children={String(children).replace(/\n$/, '')}
              language={match[1]}
              style={dark}
              PreTag="div"
            />
          ) : (
            <code {...props} className={className}>
              {children}
            </code>
          );
        },
      };

    return (
        <>
            {
                index === 0 && totalResult > 1 ? 
                    <span className="text-xl font-semibold block text-white mb-1">{answer}</span> :
                heading ? 
                    <span className="text-lg font-medium block text-white">{answer}</span> :
                <span className="text-base">  
                    <ReactMarkdown components={renderer}>{answer}</ReactMarkdown>
                </span>
            }
        </>
    )
}

export default Answer