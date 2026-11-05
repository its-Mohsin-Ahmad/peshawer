import React, { useState } from 'react';
import { Send, MessageSquare } from 'lucide-react';
import { useUserAuth } from '../../contexts/UserAuthContext';

export const UserMessagesPage: React.FC = () => {
  const { messages, sendMessage, user } = useUserAuth();
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input.trim());
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-6 md:p-8 h-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#022C22]">Messages</h1>
        <p className="text-[#64748B] mt-1">Communication with the Peshawer Real Estate team</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col" style={{ height: 'calc(100vh - 220px)', minHeight: '400px' }}>
        {/* Header */}
        <div className="flex items-center gap-3 p-4 border-b border-gray-100">
          <div className="w-10 h-10 rounded-full bg-[#064E3B] flex items-center justify-center flex-shrink-0">
            <MessageSquare className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-semibold text-[#022C22] text-sm">Peshawer Real Estate</p>
            <p className="text-xs text-green-500 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
              Online
            </p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-14 h-14 bg-[#ECFDF5] rounded-full flex items-center justify-center mb-3">
                <MessageSquare className="w-7 h-7 text-[#064E3B]" />
              </div>
              <p className="font-semibold text-[#022C22] mb-1">No messages yet</p>
              <p className="text-sm text-[#64748B]">Start a conversation with our team.</p>
            </div>
          ) : (
            messages.map((msg) => {
              // Agent messages have senderRole === 'Agent', user messages have senderRole === 'User'
              const isUser = msg.senderRole === 'User';
              return (
                <div key={msg.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                  {!isUser && (
                    <div className="w-7 h-7 rounded-full bg-[#064E3B] flex items-center justify-center mr-2 mt-auto flex-shrink-0">
                      <span className="text-white text-xs font-bold">P</span>
                    </div>
                  )}
                  <div className={`max-w-xs lg:max-w-md ${isUser ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                    {!isUser && (
                      <span className="text-xs text-[#64748B] font-medium">{msg.senderName}</span>
                    )}
                    {msg.propertyTitle && (
                      <div className={`text-xs px-3 py-1 rounded-full ${isUser ? 'bg-[#D6A84F]/20 text-[#B88628]' : 'bg-[#ECFDF5] text-[#047857]'} font-medium`}>
                        Re: {msg.propertyTitle}
                      </div>
                    )}
                    <div className={`px-4 py-2.5 rounded-2xl text-sm ${
                      isUser
                        ? 'bg-[#064E3B] text-white rounded-tr-sm'
                        : 'bg-[#F8F6EA] text-[#022C22] rounded-tl-sm'
                    }`}>
                      {msg.content}
                    </div>
                    <span className="text-[10px] text-[#64748B]">
                      {new Date(msg.timestamp).toLocaleString('en-PK', { hour: '2-digit', minute: '2-digit', month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message… (Enter to send)"
              rows={1}
              className="flex-1 resize-none rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-[#022C22] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#064E3B]/30 focus:border-[#064E3B]"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="p-2.5 rounded-xl bg-[#064E3B] text-white hover:bg-[#047857] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserMessagesPage;
