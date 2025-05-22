import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const StructuredResponse = ({ content }) => {
  // Custom renderer components for markdown
  const renderers = {
    // Style headings
    h1: ({ node, ...props }) => <h1 className="text-2xl font-bold text-zinc-100 mb-3 mt-1" {...props} />,
    h2: ({ node, ...props }) => <h2 className="text-xl font-semibold text-zinc-100 mb-2 mt-3" {...props} />,
    h3: ({ node, ...props }) => <h3 className="text-lg font-medium text-zinc-200 mb-2 mt-2" {...props} />,
    
    // Style paragraphs
    p: ({ node, ...props }) => <p className="text-zinc-300 mb-2" {...props} />,
    
    // Style lists
    ul: ({ node, ...props }) => <ul className="list-disc pl-5 mb-3 text-zinc-300" {...props} />,
    ol: ({ node, ...props }) => <ol className="list-decimal pl-5 mb-3 text-zinc-300" {...props} />,
    li: ({ node, ...props }) => <li className="mb-1" {...props} />,
    
    // Style emphasis
    em: ({ node, ...props }) => <em className="text-zinc-200 italic" {...props} />,
    strong: ({ node, ...props }) => <strong className="text-zinc-100 font-semibold" {...props} />,
    
    // Style code blocks
    code: ({ node, inline, className, children, ...props }) => {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <SyntaxHighlighter
          {...props}
          children={String(children).replace(/\n$/, '')}
          language={match[1]}
          style={dark}
          PreTag="div"
          className="my-3 rounded-md"
        />
      ) : (
        <code className="bg-zinc-700 px-1 rounded text-zinc-200" {...props}>
          {children}
        </code>
      );
    },
    
    // Style horizontal rule
    hr: () => <hr className="border-zinc-700 my-4" />,
  };

  // Process content to enhance styling for specific formats
  const processContent = () => {
    // If content includes asterisks, format properly for bold
    let processed = content;
    
    // Return processed content
    return processed;
  };

  return (
    <div className="structured-response">
      <ReactMarkdown components={renderers}>
        {processContent()}
      </ReactMarkdown>
    </div>
  );
};

export default StructuredResponse;
