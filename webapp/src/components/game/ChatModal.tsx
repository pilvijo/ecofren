import { Dispatch, SetStateAction, useState } from 'react'
import OpenAI from 'openai'
import { ChatCompletion } from 'openai/resources/index.mjs'
import { ChatCompletionMessage } from 'openai/src/resources/index.js'

interface Message {
  id: number
  text: string
  sender: 'user' | 'assistant'
  timestamp: Date
}

interface ChatModalProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  problemId?: string
}

export default function ChatModal({ isOpen, setIsOpen, problemId }: ChatModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Welcome to your eco-mission! I'm here to help you make sustainable choices. What would you like to know about this challenge?",
      sender: 'assistant',
      timestamp: new Date()
    }
  ])
  const [newMessage, setNewMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Initialize the OpenAI SDK
  const openai = new OpenAI({
    apiKey: "",
    dangerouslyAllowBrowser: true
  })

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return

    // Create a new user message and update state
    const userMessage: Message = {
      id: messages.length + 1,
      text: newMessage,
      sender: 'user',
      timestamp: new Date()
    }
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setNewMessage('')
    setIsLoading(true)

    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content:
              "You are a helpful agent that listens to the user's choices throughout the day and reviews them. Provide thoughtful insights and sustainable advice based on the conversation."
          },
          ...updatedMessages.map(m => ({
            role: m.sender === 'assistant' ? 'assistant' : 'user',
            content: m.text
          }))
        ] as ChatCompletionMessage[]
      })

      const assistantReply = response.choices[0].message?.content?.trim()
      if (assistantReply) {
        const assistantMessage: Message = {
          id: updatedMessages.length + 1,
          text: assistantReply,
          sender: 'assistant',
          timestamp: new Date()
        }
        setMessages(prev => [...prev, assistantMessage])
      }
    } catch (error) {
      console.error("Error fetching assistant response: ", error)
      const errorMessage: Message = {
        id: updatedMessages.length + 1,
        text: "Sorry, there was an error processing your request.",
        sender: 'assistant',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Chat modal */}
      <div
        className={`
          fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]
          bg-[#0c0c1d] rounded-xl shadow-2xl transition-all duration-300 z-50 border border-[#1a1b2e]
          ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}
        `}
      >
        {/* Header */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#627eea]/10 to-[#454a75]/10 rounded-xl pointer-events-none" />
        <div className="relative border-b border-[#1a1b2e] p-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-200">Mission Chat</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-gray-200 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="p-4 h-[calc(100%-8rem)] overflow-y-auto space-y-4">
          {messages.map(message => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`
                  max-w-[80%] rounded-lg p-3
                  ${message.sender === 'user'
                    ? 'bg-[#627eea] text-white'
                    : 'bg-[#1a1b2e] text-gray-200'
                  }
                `}
              >
                {message.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-lg p-3 bg-[#1a1b2e] text-gray-200">
                Thinking...
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#1a1b2e] bg-[#0c0c1d]">
          <div className="flex space-x-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()}
              placeholder="Type your message..."
              disabled={isLoading}
              className="flex-1 bg-[#1a1b2e] text-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#627eea]/50 disabled:opacity-50"
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading}
              className="bg-[#627eea] text-white p-2 rounded-lg hover:bg-[#4c63bb] transition-colors disabled:opacity-50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 rotate-90" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
