import React, { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Loader2, Bot, User, MinusCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { LogoIcon } from '@/components/ui/Logo'

const WELCOME_MESSAGE = {
  role: 'assistant',
  content: "Bonjour 👋 Je suis votre conseiller Assur-Emprunt ! Je suis là pour répondre à toutes vos questions sur l'assurance emprunteur et vous aider à économiser jusqu'à 60% sur votre contrat. Comment puis-je vous aider ?",
}

const QUICK_QUESTIONS = [
  "Comment changer d'assurance ?",
  "Combien puis-je économiser ?",
  "C'est quoi la loi Lemoine ?",
  "Obtenir un devis gratuit",
]

const ChatMessage = ({ message }) => {
  const isBot = message.role === 'assistant'
  return (
    <div className={cn('flex gap-2.5 mb-4', !isBot && 'flex-row-reverse')}>
      {/* Avatar */}
      <div className={cn(
        'w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center',
        isBot ? 'bg-[#0f1f6b]' : 'bg-[#10b981]'
      )}>
        {isBot
          ? <LogoIcon size={18} />
          : <User className="w-4 h-4 text-white" />
        }
      </div>

      {/* Bubble */}
      <div className={cn(
        'max-w-[78%] px-4 py-3 rounded-2xl text-sm leading-relaxed',
        isBot
          ? 'bg-slate-100 text-slate-800 rounded-tl-sm'
          : 'bg-[#0f1f6b] text-white rounded-tr-sm'
      )}>
        {message.content}
      </div>
    </div>
  )
}

const TypingIndicator = () => (
  <div className="flex gap-2.5 mb-4">
    <div className="w-8 h-8 rounded-full bg-[#0f1f6b] flex-shrink-0 flex items-center justify-center">
      <LogoIcon size={18} />
    </div>
    <div className="bg-slate-100 px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  </div>
)

export const ChatWidget = () => {
  const [open, setOpen] = useState(false)
  const [minimized, setMinimized] = useState(false)
  const [messages, setMessages] = useState([WELCOME_MESSAGE])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [hasNewMessage, setHasNewMessage] = useState(true)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (open) {
      setHasNewMessage(false)
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [open])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const sendMessage = async (text) => {
    const userText = text || input.trim()
    if (!userText || loading) return

    const userMessage = { role: 'user', content: userText }
    const updatedMessages = [...messages, userMessage]

    setMessages(updatedMessages)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/.netlify/functions/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages.map(({ role, content }) => ({ role, content })),
        }),
      })

      const data = await res.json()
      setMessages((prev) => [...prev, { role: 'assistant', content: data.content }])
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: "Désolé, une erreur est survenue. Veuillez réessayer dans quelques instants." },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      {/* Notification badge */}
      {!open && hasNewMessage && (
        <div className="fixed bottom-[88px] right-6 z-50 bg-white rounded-xl shadow-lg border border-slate-100 px-4 py-2.5 max-w-[220px] animate-bounce-once">
          <p className="text-xs text-slate-600 font-medium">
            💬 Un conseiller IA est disponible pour vous aider !
          </p>
          <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-white border-r border-b border-slate-100 rotate-45" />
        </div>
      )}

      {/* Launcher button */}
      <button
        onClick={() => { setOpen(!open); setMinimized(false) }}
        className={cn(
          'fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300',
          open ? 'bg-slate-700 rotate-0' : 'bg-[#0f1f6b] hover:scale-110'
        )}
        aria-label="Ouvrir le chat"
      >
        {open
          ? <X className="w-6 h-6 text-white" />
          : (
            <>
              <MessageCircle className="w-6 h-6 text-white" />
              {hasNewMessage && (
                <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-[#10b981] rounded-full border-2 border-white" />
              )}
            </>
          )
        }
      </button>

      {/* Chat window */}
      {open && !minimized && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden"
          style={{ maxHeight: '520px' }}>

          {/* Header */}
          <div className="bg-[#0f1f6b] px-4 py-3.5 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
                <LogoIcon size={20} />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Conseiller Assur-Emprunt</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#10b981]" />
                  <span className="text-white/60 text-xs">En ligne · Répond en quelques secondes</span>
                </div>
              </div>
            </div>
            <button onClick={() => setMinimized(true)} className="text-white/50 hover:text-white transition-colors">
              <MinusCircle className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-1" style={{ minHeight: 0 }}>
            {messages.map((msg, i) => (
              <ChatMessage key={i} message={msg} />
            ))}
            {loading && <TypingIndicator />}
            <div ref={bottomRef} />
          </div>

          {/* Quick questions */}
          {messages.length <= 1 && (
            <div className="px-4 pb-3 flex flex-wrap gap-2 flex-shrink-0">
              {QUICK_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="text-xs bg-[#f0f4ff] text-[#0f1f6b] font-medium px-3 py-1.5 rounded-full hover:bg-[#0f1f6b] hover:text-white transition-colors border border-[#0f1f6b]/10"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="border-t border-slate-100 p-3 flex gap-2 flex-shrink-0">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Posez votre question..."
              className="flex-1 text-sm px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0f1f6b] focus:ring-1 focus:ring-[#0f1f6b]/20 bg-slate-50"
              disabled={loading}
            />
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim() || loading}
              className="w-9 h-9 rounded-xl bg-[#0f1f6b] flex items-center justify-center disabled:opacity-40 hover:bg-[#172b88] transition-colors flex-shrink-0"
            >
              {loading
                ? <Loader2 className="w-4 h-4 text-white animate-spin" />
                : <Send className="w-4 h-4 text-white" />
              }
            </button>
          </div>
        </div>
      )}
    </>
  )
}
