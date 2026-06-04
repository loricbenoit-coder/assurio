import React, { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Loader2, User, MinusCircle } from 'lucide-react'
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

const FOLLOWUP_QUESTIONS = [
  "En savoir plus",
  "Obtenir un devis",
  "Parler à un conseiller",
  "Autre question",
]

const ChatMessage = ({ message }) => {
  const isBot = message.role === 'assistant'
  return (
    <div className={cn('flex gap-2.5 mb-4', !isBot && 'flex-row-reverse')}>
      <div className={cn(
        'w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center',
        isBot ? 'bg-[#0f1f6b]' : 'bg-[#10b981]'
      )}>
        {isBot
          ? <LogoIcon size={18} />
          : <User className="w-4 h-4 text-white" />
        }
      </div>
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
  const [showFollowups, setShowFollowups] = useState(false)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  // Permet d'ouvrir le chat depuis n'importe quel bouton du site
  useEffect(() => {
    const handleOpenChat = () => {
      setOpen(true)
      setMinimized(false)
    }
    window.addEventListener('openChat', handleOpenChat)
    return () => window.removeEventListener('openChat', handleOpenChat)
  }, [])

  useEffect(() => {
    if (open) {
      setHasNewMessage(false)
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [open])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading, showFollowups])

  const sendMessage = async (text) => {
    const userText = text || input.trim()
    if (!userText || loading) return

    setShowFollowups(false)
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
      setShowFollowups(true)
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

  const isFirstMessage = messages.length === 1
  const suggestions = isFirstMessage ? QUICK_QUESTIONS : FOLLOWUP_QUESTIONS
  const showSuggestions = isFirstMessage || showFollowups

  return (
    <>
      {/* Notification badge supprimée */}

      {/* Launcher button */}
      <button
        onClick={() => { setOpen(!open); setMinimized(false) }}
        className={cn(
          'fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-50 w-13 h-13 sm:w-14 sm:h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300',
          open ? 'bg-slate-700' : 'bg-[#0f1f6b] hover:scale-110'
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
        <div
          className="fixed bottom-20 right-2 left-2 sm:left-auto sm:right-6 sm:w-[360px] z-50 bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden"
          style={{ maxHeight: '75vh' }}
        >
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
          <div className="flex-1 overflow-y-auto p-4" style={{ minHeight: 0 }}>
            {messages.map((msg, i) => (
              <ChatMessage key={i} message={msg} />
            ))}
            {loading && <TypingIndicator />}

            {/* Questions suggérées — au démarrage ET après chaque réponse */}
            {showSuggestions && !loading && (
              <div className="mt-1 mb-2">
                <p className="text-xs text-slate-400 mb-2 ml-11">
                  {isFirstMessage ? 'Questions fréquentes :' : 'Suggestions :'}
                </p>
                <div className="ml-11 flex flex-wrap gap-2">
                  {suggestions.map((q) => (
                    <button
                      key={q}
                      onClick={() => sendMessage(q)}
                      className="text-xs bg-[#f0f4ff] text-[#0f1f6b] font-medium px-3 py-1.5 rounded-full hover:bg-[#0f1f6b] hover:text-white transition-colors border border-[#0f1f6b]/10"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="border-t border-slate-100 p-3 flex gap-2 flex-shrink-0 bg-white">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Écrivez votre question..."
              className="flex-1 text-sm px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0f1f6b] focus:ring-1 focus:ring-[#0f1f6b]/20 bg-slate-50"
              disabled={loading}
            />
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim() || loading}
              className="w-10 h-10 rounded-xl bg-[#0f1f6b] flex items-center justify-center disabled:opacity-40 hover:bg-[#172b88] transition-colors flex-shrink-0"
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
