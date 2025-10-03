import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import UserSwitcher, { USERS, type User } from "./UserSwitcher";
import AdaptiveCard from "./AdaptiveCard";
import { format } from "date-fns";

interface Message {
  id: string;
  sender: {
    id: string;
    name: string;
    avatar?: string;
    isBot?: boolean;
  };
  content: string;
  timestamp: Date;
  type: "text" | "card";
  cardData?: any;
  cardType?: "user" | "app" | "anomaly" | "approval" | "token-help";
}

export default function TeamsChat() {
  const [currentUser, setCurrentUser] = useState<User>(USERS[0]);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: {
        id: "accessbot",
        name: "AccessBot",
        isBot: true
      },
      content: "Hello! I'm AccessBot. Type @AccessBot followed by a command to get started. Available commands include: show user, reset password, token help, app lookup, and find anomalies.",
      timestamp: new Date(Date.now() - 300000),
      type: "text"
    }
  ]);
  const [pendingApprovals, setPendingApprovals] = useState<any[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      sender: {
        id: currentUser.id,
        name: currentUser.name,
        avatar: currentUser.avatar
      },
      content,
      timestamp: new Date(),
      type: "text"
    };

    setMessages(prev => [...prev, newMessage]);

    // Process bot commands
    if (content.includes("@AccessBot")) {
      processBotCommand(content);
    }
  };

  const processBotCommand = (command: string) => {
    const cmd = command.replace("@AccessBot", "").trim();
    
    setTimeout(() => {
      if (cmd.startsWith("show user")) {
        const username = cmd.split("show user ")[1];
        handleShowUser(username);
      } else if (cmd.startsWith("reset password")) {
        const username = cmd.split("reset password ")[1];
        handleResetPassword(username);
      } else if (cmd.startsWith("token help")) {
        const username = cmd.split("token help ")[1];
        handleTokenHelp(username);
      } else if (cmd.startsWith("app ")) {
        const appname = cmd.split("app ")[1];
        handleAppLookup(appname);
      } else if (cmd === "find anomalies") {
        handleFindAnomalies();
      } else {
        // Unknown command
        const botMessage: Message = {
          id: Date.now().toString(),
          sender: {
            id: "accessbot",
            name: "AccessBot",
            isBot: true
          },
          content: "I don't recognize that command. Available commands: show user {username}, reset password {username}, token help {username}, app {appname}, find anomalies",
          timestamp: new Date(),
          type: "text"
        };
        setMessages(prev => [...prev, botMessage]);
      }
    }, 1000);
  };

  const handleShowUser = (username: string) => {
    const userData = {
      username: username || "alice.w",
      fullname: username === "alice.w" ? "Alice Walker" : "Sample User",
      adStatus: "Enabled" as const,
      lastLogon: "2025-09-22T08:30:00Z",
      groups: ["Finance", "VPN-Users"],
      vpnAssigned: true,
      applications: [
        { name: "Payroll", status: "Active" as const, adminUrl: "https://payroll.example/admin" },
        { name: "CRM", status: "Inactive" as const, adminUrl: "https://crm.example/admin" }
      ],
      supportContacts: [
        { role: "Supervisor", name: "Jane Doe", email: "jane.doe@example.com" }
      ]
    };

    const botMessage: Message = {
      id: Date.now().toString(),
      sender: {
        id: "accessbot",
        name: "AccessBot",
        isBot: true
      },
      content: `Here's the user information for ${username}:`,
      timestamp: new Date(),
      type: "card",
      cardType: "user",
      cardData: userData
    };

    setMessages(prev => [...prev, botMessage]);
  };

  const handleResetPassword = (username: string) => {
    const botMessage: Message = {
      id: Date.now().toString(),
      sender: {
        id: "accessbot",
        name: "AccessBot",
        isBot: true
      },
      content: `Password reset options for ${username}. Please select one:`,
      timestamp: new Date(),
      type: "text"
    };

    setMessages(prev => [...prev, botMessage]);

    // Show reset options
    setTimeout(() => {
      const optionsMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: {
          id: "accessbot",
          name: "AccessBot",
          isBot: true
        },
        content: "Available reset options:\na. Lakebaas Reset (GH approval required)\nb. Network AD password reset (Supervisor approval required)\nc. Eyemal reset (GH approval required)\nd. Application Name Unlock/Reset/Update/Create\n\nClick on an option to proceed:",
        timestamp: new Date(),
        type: "text"
      };
      setMessages(prev => [...prev, optionsMessage]);
    }, 500);
  };

  const handleTokenHelp = (username: string) => {
    const botMessage: Message = {
      id: Date.now().toString(),
      sender: {
        id: "accessbot",
        name: "AccessBot",
        isBot: true
      },
      content: `Token onboarding help for ${username}:`,
      timestamp: new Date(),
      type: "card",
      cardType: "token-help"
    };

    setMessages(prev => [...prev, botMessage]);
  };

  const handleAppLookup = (appname: string) => {
    const appData = {
      name: appname || "Payroll",
      adminUrl: "https://payroll.example/admin",
      userUrl: "https://payroll.example",
      description: "This app is used for bulk journal posting",
      dbType: "Oracle",
      owner: "Jane Doe; e-operations; branch",
      thirdParty: false,
      supportEmail: "payroll-support@example.com"
    };

    const botMessage: Message = {
      id: Date.now().toString(),
      sender: {
        id: "accessbot",
        name: "AccessBot",
        isBot: true
      },
      content: `Application information for ${appname}:`,
      timestamp: new Date(),
      type: "card",
      cardType: "app",
      cardData: appData
    };

    setMessages(prev => [...prev, botMessage]);
  };

  const handleFindAnomalies = () => {
    const anomalies = [
      {
        username: "dan.j",
        score: 0.92,
        reason: "Admin group assigned but last logon > 120 days",
        recommendedAction: "Disable or review"
      },
      {
        username: "sam.k", 
        score: 0.87,
        reason: "Multiple suspicious app roles added in <7 days",
        recommendedAction: "Revoke roles & escalate"
      }
    ];

    const botMessage: Message = {
      id: Date.now().toString(),
      sender: {
        id: "accessbot",
        name: "AccessBot",
        isBot: true
      },
      content: "Found 2 security anomalies requiring attention:",
      timestamp: new Date(),
      type: "text"
    };

    setMessages(prev => [...prev, botMessage]);

    // Add anomaly cards
    anomalies.forEach((anomaly, index) => {
      setTimeout(() => {
        const anomalyMessage: Message = {
          id: (Date.now() + index + 1).toString(),
          sender: {
            id: "accessbot",
            name: "AccessBot",
            isBot: true
          },
          content: `Anomaly ${index + 1}:`,
          timestamp: new Date(),
          type: "card",
          cardType: "anomaly",
          cardData: anomaly
        };
        setMessages(prev => [...prev, anomalyMessage]);
      }, (index + 1) * 500);
    });
  };

  const handleCardAction = (action: string, data?: any) => {
    console.log('Card action triggered:', action, data);
    
    if (action === "approve" || action === "reject") {
      const response = action === "approve" ? "approved" : "rejected";
      const auditId = `AUD-${format(new Date(), 'yyyyMMdd')}-${Math.floor(Math.random() * 9999).toString().padStart(4, '0')}`;
      
      const confirmationMessage: Message = {
        id: Date.now().toString(),
        sender: {
          id: "accessbot",
          name: "AccessBot",
          isBot: true
        },
        content: `Request ${data?.requestId} has been ${response}. Audit ID: ${auditId}`,
        timestamp: new Date(),
        type: "text"
      };
      
      setMessages(prev => [...prev, confirmationMessage]);
    }
    
    if (action === "view-user") {
      handleShowUser(data?.username);
    }
    
    if (action === "check-token-status") {
      const statusMessage: Message = {
        id: Date.now().toString(),
        sender: {
          id: "accessbot",
          name: "AccessBot",
          isBot: true
        },
        content: "Token Status: Not registered. Next step: Follow step 2 to register your token.",
        timestamp: new Date(),
        type: "text"
      };
      
      setMessages(prev => [...prev, statusMessage]);
    }
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Card className="w-80 rounded-none border-r border-card-border bg-sidebar flex flex-col">
        <div className="p-4 border-b border-sidebar-border">
          <h1 className="text-lg font-semibold text-sidebar-foreground">Access Bot</h1>
          <p className="text-sm text-muted-foreground">Teams Chat</p>
        </div>
        
        <div className="p-4 border-b border-sidebar-border">
          <UserSwitcher 
            currentUser={currentUser}
            onUserChange={setCurrentUser}
          />
        </div>
        
        <div className="flex-1 p-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-sidebar-foreground">Quick Commands</h3>
            <div className="space-y-1 text-xs text-muted-foreground">
              <div>• @AccessBot show user {"{username}"}</div>
              <div>• @AccessBot reset password {"{username}"}</div>
              <div>• @AccessBot token help {"{username}"}</div>
              <div>• @AccessBot app {"{appname}"}</div>
              <div>• @AccessBot find anomalies</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b border-border bg-card">
          <h2 className="font-semibold text-card-foreground">Access Management Chat</h2>
          <p className="text-sm text-muted-foreground">
            Logged in as: {currentUser.name} ({currentUser.role})
          </p>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id}>
              {message.type === "text" ? (
                <ChatMessage
                  id={message.id}
                  sender={message.sender}
                  content={message.content}
                  timestamp={message.timestamp}
                  isOwnMessage={message.sender.id === currentUser.id}
                />
              ) : (
                <div className="flex gap-3">
                  <div className="w-8" /> {/* Space for alignment */}
                  <AdaptiveCard
                    type={message.cardType!}
                    data={message.cardData}
                    onAction={handleCardAction}
                  />
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        <div className="p-4 border-t border-border bg-card">
          <ChatInput onSendMessage={handleSendMessage} />
        </div>
      </div>
    </div>
  );
}