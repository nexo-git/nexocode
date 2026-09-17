export interface BotMessage {
  sk: string
  role: 'user' | 'assistant'
  content: string
  /** epoch en MILISEGUNDOS (hora real de envío del cliente cuando el canal la reporta) */
  timestamp: number
}

export interface BotConversation {
  session_id: string
  phone_number: string
  human_mode: boolean
  last_message: string
  last_message_role: 'user' | 'assistant'
  /** epoch en MILISEGUNDOS */
  last_activity: number
}

export interface BotConversationDetail {
  session_id: string
  human_mode: boolean
  messages: BotMessage[]
}
