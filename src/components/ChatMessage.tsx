import { Leaf, User } from 'lucide-react';

interface ChatMessageProps {
  message: string;
  isBot: boolean;
  image?: string;
  timestamp: Date;
}

export const ChatMessage = ({ message, isBot, image, timestamp }: ChatMessageProps) => {
  return (
    <div className={`flex gap-3 ${isBot ? '' : 'flex-row-reverse'} animate-slide-up`}>
      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
        isBot ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'
      }`}>
        {isBot ? <Leaf className="w-5 h-5" /> : <User className="w-5 h-5" />}
      </div>
      <div className={`flex flex-col max-w-[80%] ${isBot ? 'items-start' : 'items-end'}`}>
        {image && (
          <img
            src={image}
            alt="Plant capture"
            className="rounded-xl mb-2 max-w-full h-auto shadow-soft"
            style={{ maxHeight: '200px' }}
          />
        )}
        <div className={`rounded-2xl px-4 py-3 shadow-soft ${
          isBot 
            ? 'bg-card text-card-foreground rounded-tl-md' 
            : 'bg-primary text-primary-foreground rounded-tr-md'
        }`}>
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message}</p>
        </div>
        <span className="text-xs text-muted-foreground mt-1 px-2">
          {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
};
