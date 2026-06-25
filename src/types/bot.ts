export interface BotMessage {
  sk: string
  role: 'user' | 'assistant'
  content: string
  timestamp: number
}

export interface BotConversation {
  session_id: string
  phone_number: string
  human_mode: boolean
  last_message: string
  last_message_role: 'user' | 'assistant'
  last_activity: number
}

export interface BotConversationDetail {
  session_id: string
  human_mode: boolean
  messages: BotMessage[]
}
