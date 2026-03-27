import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import oneDark from 'react-syntax-highlighter/dist/esm/styles/prism/one-dark'
import './chat-response.scss'
import clsx from 'clsx'
import { omit } from '@/shared/utils'

export function ChatResponse({ content }: { content: string }) {
  return (
    <div className="chat-response__wrapper">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '')
            const resultProps = omit(props, ['node'])
            return match ? (
              <code>
                <SyntaxHighlighter
                  // @ts-expect-error кривые типы в syntax-highlighter
                  style={oneDark}
                  language={match[1]}
                  PreTag="div"
                  {...resultProps}
                >
                  {String(children)}
                </SyntaxHighlighter>
              </code>
            ) : (
              <code
                className={clsx(className, 'chat-response__simple-code')}
                {...resultProps}
              >
                {children}
              </code>
            )
          },
          table({ children }) {
            return (
              <div className="chat-response__table-wrapper">
                <table>{children}</table>
              </div>
            )
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
