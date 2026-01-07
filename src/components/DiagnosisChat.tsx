import { useState, useRef, useEffect } from 'react';
import { Camera, Send, Leaf, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ChatMessage } from '@/components/ChatMessage';
import { CameraCapture } from '@/components/CameraCapture';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  image?: string;
  timestamp: Date;
}

interface DiagnosisChatProps {
  onBack: () => void;
}

export const DiagnosisChat = ({ onBack }: DiagnosisChatProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your CropCare assistant 🌱\n\nI can help you identify pests, diseases, and provide solutions for your crops. You can:\n\n📸 Take a photo of your plant\n💬 Describe your crop issue\n\nHow can I help you today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [showCamera, setShowCamera] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotResponse = (userMessage: string, hasImage: boolean): string => {
    if (hasImage) {
      const responses = [
        "I can see your plant image! 🔍\n\nBased on the visual signs, here's what I notice:\n\n🐛 **Possible Issue**: This could be an aphid infestation or early signs of leaf spot disease.\n\n**Recommended Actions:**\n1. Check undersides of leaves for small insects\n2. Remove affected leaves if less than 30% are damaged\n3. Apply neem oil spray (2-3 tbsp per liter of water)\n4. Ensure good air circulation around plants\n\nWould you like more specific treatment options?",
        "Thanks for sharing the image! 📸\n\n**Analysis Results:**\n\n🌿 The yellowing pattern suggests possible nutrient deficiency, likely nitrogen or iron.\n\n**Quick Solutions:**\n1. Test your soil pH (should be 6.0-7.0 for most crops)\n2. Apply balanced NPK fertilizer\n3. Add compost to improve soil health\n4. Water deeply but less frequently\n\nDo you want me to recommend specific fertilizers?",
        "I've analyzed your plant photo! 🌾\n\n**Detection**: Signs of fungal infection (possibly powdery mildew)\n\n**Treatment Plan:**\n1. Remove and destroy infected leaves\n2. Apply sulfur-based fungicide\n3. Avoid overhead watering\n4. Space plants for better airflow\n5. Apply in early morning or evening\n\nShall I explain any of these steps in detail?"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }

    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('pest') || lowerMessage.includes('insect') || lowerMessage.includes('bug')) {
      return "For pest control, here are some effective organic solutions:\n\n🌿 **Neem Oil Spray**: Mix 2 tbsp neem oil + 1 tbsp dish soap in 1 liter water\n\n🧄 **Garlic Spray**: Blend 2 garlic bulbs, steep overnight, strain and spray\n\n🌶️ **Chili Spray**: Mix chili powder with water and a drop of soap\n\nWould you like to share a photo so I can identify the specific pest?";
    }
    
    if (lowerMessage.includes('yellow') || lowerMessage.includes('leaf')) {
      return "Yellow leaves can indicate several issues:\n\n💧 **Overwatering**: Let soil dry between watering\n🌱 **Nitrogen Deficiency**: Add nitrogen-rich fertilizer\n☀️ **Sunlight Issues**: Ensure adequate sunlight (6-8 hours)\n🐛 **Pest Damage**: Check for insects\n\nCan you describe which leaves are yellowing (old or new)? Or share a photo?";
    }
    
    if (lowerMessage.includes('disease') || lowerMessage.includes('fungus') || lowerMessage.includes('rot')) {
      return "For plant diseases, prevention is key!\n\n**Common Treatments:**\n1. 🧪 Copper-based fungicide for bacterial issues\n2. 🍃 Baking soda spray (1 tbsp per gallon) for mild fungus\n3. ✂️ Prune affected areas and sterilize tools\n4. 💨 Improve air circulation\n\nPlease share a photo for accurate disease identification!";
    }

    return "I'd be happy to help with your crop concern! 🌻\n\nFor the most accurate diagnosis, please:\n\n📸 **Share a photo** of the affected plant\n📝 **Describe symptoms** (color changes, spots, wilting, etc.)\n🌍 **Mention your location** and crop type\n\nThe more details you provide, the better I can assist you!";
  };

  const sendMessage = (text: string, image?: string) => {
    if (!text.trim() && !image) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text || "Here's a photo of my plant",
      isBot: false,
      image,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(text, !!image),
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleCapture = (imageData: string) => {
    setShowCamera(false);
    sendMessage('', imageData);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputText);
  };

  return (
    <div className="fixed inset-0 bg-background flex flex-col animate-fade-in">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 py-3 flex items-center gap-3 shadow-soft">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="w-10 h-10 rounded-full gradient-hero flex items-center justify-center">
          <Leaf className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="font-bold text-foreground">CropCare Assistant</h1>
          <p className="text-xs text-muted-foreground">
            {isTyping ? 'Analyzing...' : 'Online • Ready to help'}
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(message => (
          <ChatMessage
            key={message.id}
            message={message.text}
            isBot={message.isBot}
            image={message.image}
            timestamp={message.timestamp}
          />
        ))}
        {isTyping && (
          <div className="flex gap-3 animate-fade-in">
            <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
              <Leaf className="w-5 h-5" />
            </div>
            <div className="bg-card rounded-2xl rounded-tl-md px-4 py-3 shadow-soft">
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 bg-card border-t border-border">
        <div className="flex gap-2">
          <Button
            type="button"
            variant="secondary"
            size="icon"
            onClick={() => setShowCamera(true)}
            className="flex-shrink-0"
          >
            <Camera className="w-5 h-5" />
          </Button>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Describe your crop issue..."
            className="flex-1 bg-muted rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <Button type="submit" variant="hero" size="icon" disabled={!inputText.trim()}>
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </form>

      {/* Camera Modal */}
      {showCamera && (
        <CameraCapture
          onCapture={handleCapture}
          onClose={() => setShowCamera(false)}
        />
      )}
    </div>
  );
};
