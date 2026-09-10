import { useState } from 'react'
import { CheckIcon, CopyIcon } from '@primer/octicons-react'
import type { CodeExample as CodeExampleData } from '../content'

interface CodeExampleProps {
  example: CodeExampleData
}

export function CodeExample({ example }: CodeExampleProps) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    await navigator.clipboard.writeText(example.code)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  return (
    <div className="code-example">
      <div className="code-example__header">
        <div>
          <strong>{example.title}</strong>
          <span>{example.language}</span>
        </div>
        <button type="button" className="copy-button" onClick={copy}>
          {copied ? <CheckIcon /> : <CopyIcon />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre tabIndex={0} aria-label={`${example.title} code`}>
        <code>{example.code}</code>
      </pre>
      {example.note ? <p className="code-example__note">{example.note}</p> : null}
    </div>
  )
}
