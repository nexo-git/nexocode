'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { fetchAuthSession } from 'aws-amplify/auth'
import { Send, MessagesSquare, ArrowLeft } from 'lucide-react'
import type { BotConversation, BotConversationDetail, BotMessage } from '@/types/bot'

async function getIdToken(): Promise<string> {
  const session = await fetchAuthSession()
  return session.tokens?.idToken?.toString() ?? ''
}

function formatRelative(ts: number): string {
  const diff = Math.floor(Date.now() / 1000) - ts
  if (diff < 60) return 'ahora'
  if (diff < 3600) return `${Math.floor(diff / 60)}m`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h`
  return `${Math.floor(diff / 86400)}d`
}

export default function ConversationsPanel() {
  const [conversations, setConversations] = useState<BotConversation[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [detail, setDetail] = useState<BotConversationDetail | null>(null)
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const [toggling, setToggling] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const fetchConversations = useCallback(async () => {
    try {
      const token = await getIdToken()
      const res = await fetch('/api/admin/bot/conversations', {
        headers: { Authorization: token },
      })
      if (res.ok) {
        const data = await res.json()
        setConversations(data.conversations ?? [])
      }
    } catch { /* silencioso */ }
  }, [])

  const fetchDetail = useCallback(async (id: string) => {
    try {
      const token = await getIdToken()
      const res = await fetch(`/api/admin/bot/conversations/${id}`, {
        headers: { Authorization: token },
      })
      if (res.ok) {
        const data = await res.json()
        setDetail(data)
      }
    } catch { /* silencioso */ }
  }, [])

  useEffect(() => {
    fetchConversations()
    const id = setInterval(fetchConversations, 5000)
    return () => clearInterval(id)
  }, [fetchConversations])

  useEffect(() => {
    if (!selectedId) { setDetail(null); return }
    fetchDetail(selectedId)
    const id = setInterval(() => fetchDetail(selectedId), 3000)
    return () => clearInterval(id)
  }, [selectedId, fetchDetail])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [detail?.messages.length])

  const handleToggle = async () => {
    if (!detail || toggling) return
    const action = detail.human_mode ? 'resume' : 'pause'
    const prevMode = detail.human_mode
    setDetail(d => d ? { ...d, human_mode: !d.human_mode } : d)
    setConversations(cs => cs.map(c =>
      c.session_id === detail.session_id ? { ...c, human_mode: !c.human_mode } : c
    ))
    setToggling(true)
    try {
      const token = await getIdToken()
      const res = await fetch('/api/admin/bot/handoff', {
        method: 'POST',
        headers: { Authorization: token, 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: detail.session_id, action }),
      })
      if (!res.ok) {
        setDetail(d => d ? { ...d, human_mode: prevMode } : d)
        setConversations(cs => cs.map(c =>
          c.session_id === detail.session_id ? { ...c, human_mode: prevMode } : c
        ))
      }
    } catch {
      setDetail(d => d ? { ...d, human_mode: prevMode } : d)
    } finally {
      setToggling(false)
    }
  }

  const handleSend = async () => {
    if (!input.trim() || !selectedId || !detail || sending) return
    const msg: BotMessage = {
      sk: `${Date.now()}#local`,
      role: 'assistant',
      content: input.trim(),
      timestamp: Math.floor(Date.now() / 1000),
    }
    const prevMessages = detail.messages
    setDetail(d => d ? { ...d, messages: [...d.messages, msg] } : d)
    setInput('')
    setSending(true)
    try {
      const token = await getIdToken()
      const res = await fetch('/api/admin/bot/reply', {
        method: 'POST',
        headers: { Authorization: token, 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: selectedId, message: msg.content }),
      })
      if (!res.ok) {
        setDetail(d => d ? { ...d, messages: prevMessages } : d)
        setInput(msg.content)
      }
    } catch {
      setDetail(d => d ? { ...d, messages: prevMessages } : d)
      setInput(msg.content)
    } finally {
      setSending(false)
    }
  }

  const selectedConv = conversations.find(c => c.session_id === selectedId)

  return (
    <div className="flex h-[calc(100vh-160px)] min-h-[520px] -mx-6 overflow-hidden rounded-xl border border-white/10">

      {/* ── Lista de conversaciones ── */}
      <div className={`
        border-r border-white/5 flex-col bg-midnight
        w-full md:w-72 md:shrink-0 md:flex
        ${selectedId ? 'hidden' : 'flex'}
      `}>
        {/* Header lista */}
        <div className="px-4 py-3 border-b border-white/5 flex items-center gap-2">
          <MessagesSquare size={16} className="text-cyan" />
          <span className="text-ghost font-semibold text-sm">Chats</span>
          {conversations.length > 0 && (
            <span className="ml-auto text-xs bg-cyan/10 text-cyan rounded-full px-2 py-0.5 font-medium">
              {conversations.length}
            </span>
          )}
        </div>

        <div className="flex-1 overflow-y-auto">
          {conversations.length === 0 ? (
            <p className="text-slate text-xs text-center mt-10 px-4">
              Sin conversaciones activas
            </p>
          ) : (
            conversations.map(c => (
              <button
                key={c.session_id}
                onClick={() => setSelectedId(c.session_id)}
                className={`w-full text-left px-4 py-3 border-b border-white/5 transition-colors ${
                  selectedId === c.session_id ? 'bg-white/5' : 'hover:bg-white/5'
                }`}
              >
                <div className="flex items-center justify-between mb-1 gap-2">
                  <span className="text-ghost text-xs font-semibold truncate">+{c.phone_number}</span>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${
                      c.human_mode
                        ? 'bg-status-yellow/10 text-status-yellow'
                        : 'bg-status-green/10 text-status-green'
                    }`}>
                      {c.human_mode ? 'Humano' : 'Bot'}
                    </span>
                    <span className="text-slate text-xs">{formatRelative(c.last_activity)}</span>
                  </div>
                </div>
                <p className="text-slate text-xs truncate">
                  {c.last_message_role === 'assistant' ? '↩ ' : ''}{c.last_message}
                </p>
              </button>
            ))
          )}
        </div>
      </div>

      {/* ── Hilo de mensajes ── */}
      <div className={`
        flex-col bg-space-black min-w-0
        w-full md:flex-1 md:flex
        ${selectedId ? 'flex' : 'hidden'}
      `}>
        {!selectedId ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-3">
            <MessagesSquare size={36} className="text-white/10" />
            <p className="text-slate text-sm">Seleccioná una conversación</p>
          </div>
        ) : (
          <>
            {/* Header chat */}
            <div className="px-4 py-3 border-b border-white/5 flex items-center gap-3 bg-midnight shrink-0">
              <button
                onClick={() => setSelectedId(null)}
                className="md:hidden p-1.5 -ml-1 text-slate hover:text-ghost transition-colors rounded-lg hover:bg-white/5"
              >
                <ArrowLeft size={18} />
              </button>

              <div className="flex-1 min-w-0">
                <p className="text-ghost font-medium text-sm truncate">
                  +{selectedConv?.phone_number ?? selectedId.replace('whatsapp_', '')}
                </p>
                <p className="text-slate text-xs">WhatsApp</p>
              </div>

              <button
                onClick={handleToggle}
                disabled={toggling}
                className={`shrink-0 text-xs px-3 py-1.5 rounded-lg font-medium transition-colors disabled:opacity-50 ${
                  detail?.human_mode
                    ? 'bg-status-green/10 text-status-green hover:bg-status-green/20'
                    : 'bg-status-yellow/10 text-status-yellow hover:bg-status-yellow/20'
                }`}
              >
                {detail?.human_mode ? 'Reanudar bot' : 'Pausar bot'}
              </button>
            </div>

            {/* Mensajes */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {detail?.messages.map(msg => (
                <div key={msg.sk} className={`flex ${msg.role === 'assistant' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] md:max-w-[72%] px-3 py-2 rounded-xl text-sm ${
                    msg.role === 'assistant'
                      ? 'bg-cyan text-space-black rounded-br-sm'
                      : 'bg-midnight text-ghost border border-white/5 rounded-bl-sm'
                  }`}>
                    <p className="whitespace-pre-wrap break-words leading-relaxed">{msg.content}</p>
                    <p className={`text-xs mt-1 text-right ${
                      msg.role === 'assistant' ? 'text-space-black/50' : 'text-slate'
                    }`}>
                      {new Date(msg.timestamp * 1000).toLocaleTimeString('es-CR', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="px-4 py-3 border-t border-white/5 flex gap-2 items-end bg-midnight shrink-0">
              <textarea
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleSend()
                  }
                }}
                placeholder="Escribí un mensaje..."
                rows={1}
                className="flex-1 bg-space-black text-ghost text-sm rounded-lg px-3 py-2 resize-none outline-none border border-white/10 focus:border-cyan/50 placeholder:text-slate min-h-[38px] max-h-[120px]"
                style={{ height: 'auto' }}
                onInput={e => {
                  const t = e.currentTarget
                  t.style.height = 'auto'
                  t.style.height = `${Math.min(t.scrollHeight, 120)}px`
                }}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || sending}
                className="p-2.5 bg-cyan hover:bg-cyan/80 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg transition-colors shrink-0"
                title="Enviar"
              >
                <Send size={15} className="text-space-black" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
