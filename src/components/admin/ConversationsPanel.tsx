'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { fetchAuthSession } from 'aws-amplify/auth'
import { Send, MessagesSquare } from 'lucide-react'
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
    <div className="flex h-[72vh] min-h-[520px] -mx-6 -my-8 overflow-hidden">

      {/* ── Columna izquierda: lista ── */}
      <div className="w-72 shrink-0 border-r border-neutral-800 flex flex-col bg-neutral-900">
        <div className="px-4 py-3 border-b border-neutral-800 flex items-center gap-2">
          <MessagesSquare size={16} className="text-cyan-400" />
          <span className="text-white font-semibold text-sm">Conversaciones</span>
          {conversations.length > 0 && (
            <span className="ml-auto text-xs bg-neutral-700 text-neutral-300 rounded-full px-2 py-0.5">
              {conversations.length}
            </span>
          )}
        </div>

        <div className="flex-1 overflow-y-auto">
          {conversations.length === 0 ? (
            <p className="text-neutral-500 text-xs text-center mt-10 px-4">
              Sin conversaciones activas
            </p>
          ) : (
            conversations.map(c => (
              <button
                key={c.session_id}
                onClick={() => setSelectedId(c.session_id)}
                className={`w-full text-left px-4 py-3 border-b border-neutral-800/60 transition-colors ${
                  selectedId === c.session_id
                    ? 'bg-neutral-800'
                    : 'hover:bg-neutral-800/50'
                }`}
              >
                <div className="flex items-center justify-between mb-1 gap-2">
                  <span className="text-white text-xs font-semibold truncate">+{c.phone_number}</span>
                  <span className={`shrink-0 text-xs px-1.5 py-0.5 rounded-full font-medium ${
                    c.human_mode
                      ? 'bg-yellow-500/20 text-yellow-400'
                      : 'bg-green-500/20 text-green-400'
                  }`}>
                    {c.human_mode ? 'Humano' : 'Bot'}
                  </span>
                </div>
                <div className="flex items-end justify-between gap-2">
                  <p className="text-neutral-400 text-xs truncate flex-1">
                    {c.last_message_role === 'assistant' ? '↩ ' : ''}{c.last_message}
                  </p>
                  <span className="shrink-0 text-neutral-500 text-xs">{formatRelative(c.last_activity)}</span>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* ── Columna derecha: hilo ── */}
      <div className="flex-1 flex flex-col bg-neutral-950 min-w-0">
        {!selectedId ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-3">
            <MessagesSquare size={36} className="text-neutral-700" />
            <p className="text-neutral-500 text-sm">Seleccioná una conversación</p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="px-5 py-3 border-b border-neutral-800 flex items-center justify-between gap-4 bg-neutral-900 shrink-0">
              <div>
                <p className="text-white font-medium text-sm">
                  +{selectedConv?.phone_number ?? selectedId.replace('whatsapp_', '')}
                </p>
                <p className="text-neutral-500 text-xs">WhatsApp</p>
              </div>
              <button
                onClick={handleToggle}
                disabled={toggling}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors disabled:opacity-50 ${
                  detail?.human_mode
                    ? 'bg-green-500/15 text-green-400 hover:bg-green-500/25'
                    : 'bg-yellow-500/15 text-yellow-400 hover:bg-yellow-500/25'
                }`}
              >
                {detail?.human_mode ? 'Reanudar bot' : 'Pausar bot'}
              </button>
            </div>

            {/* Mensajes */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
              {detail?.messages.map(msg => (
                <div key={msg.sk} className={`flex ${msg.role === 'assistant' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[72%] px-3 py-2 rounded-xl text-sm ${
                    msg.role === 'assistant'
                      ? 'bg-cyan-700 text-white rounded-br-sm'
                      : 'bg-neutral-800 text-neutral-100 rounded-bl-sm'
                  }`}>
                    <p className="whitespace-pre-wrap break-words leading-relaxed">{msg.content}</p>
                    <p className={`text-xs mt-1 text-right ${
                      msg.role === 'assistant' ? 'text-cyan-200/60' : 'text-neutral-500'
                    }`}>
                      {new Date(msg.timestamp * 1000).toLocaleTimeString('es-CR', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="px-4 py-3 border-t border-neutral-800 flex gap-2 items-end bg-neutral-900 shrink-0">
              <textarea
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleSend()
                  }
                }}
                placeholder="Escribí un mensaje... (Enter para enviar)"
                rows={1}
                className="flex-1 bg-neutral-800 text-white text-sm rounded-lg px-3 py-2 resize-none outline-none border border-neutral-700 focus:border-cyan-500/50 placeholder:text-neutral-500 min-h-[38px] max-h-[120px]"
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
                className="p-2.5 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg transition-colors shrink-0"
                title="Enviar"
              >
                <Send size={15} className="text-white" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
