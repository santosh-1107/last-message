
import React, { useState, useEffect, useCallback } from 'react';
import { User, Message, AppView } from './types';
import * as storage from './services/storageService';
import LoginScreen from './components/LoginScreen';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import MessageEditor from './components/MessageEditor';
import Settings from './components/Settings';

const App: React.FC = () => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [currentView, setCurrentView] = useState<AppView>('dashboard');
    const [messages, setMessages] = useState<Message[]>([]);
    const [editingMessage, setEditingMessage] = useState<Message | null>(null);
    const [lastActive, setLastActive] = useState<string | null>(null);

    const refreshData = useCallback(() => {
        if (currentUser) {
            setMessages(storage.getMessages(currentUser.email));
            setLastActive(storage.getLastActiveDate(currentUser.email));
        }
    }, [currentUser]);

    useEffect(() => {
        const user = storage.getLoggedInUser();
        if (user) {
            setCurrentUser(user);
            storage.updateLastActiveDate(user.email);
            refreshData();
        }
    }, [refreshData]);
    
    useEffect(() => {
        if(currentUser){
            refreshData();
        }
    }, [currentUser, refreshData]);

    const handleLogin = (user: User) => {
        storage.loginUser(user);
        setCurrentUser(user);
        storage.updateLastActiveDate(user.email);
        refreshData();
        setCurrentView('dashboard');
    };

    const handleLogout = () => {
        storage.logoutUser();
        setCurrentUser(null);
        setMessages([]);
        setLastActive(null);
        setCurrentView('dashboard');
    };

    const handleNavigate = (view: AppView) => {
        setCurrentView(view);
    };

    const handleEditMessage = (message: Message) => {
        setEditingMessage(message);
        setCurrentView('messageEditor');
    };
    
    const handleNewMessage = () => {
        setEditingMessage(null);
        setCurrentView('messageEditor');
    };

    const handleSaveMessage = (message: Omit<Message, 'id' | 'createdAt'>) => {
        if (currentUser) {
            storage.saveMessage(currentUser.email, { ...editingMessage, ...message });
            refreshData();
            setCurrentView('dashboard');
            setEditingMessage(null);
        }
    };
    
    const handleDeleteMessage = (id: string) => {
        if (currentUser) {
            storage.deleteMessage(currentUser.email, id);
            refreshData();
        }
    };
    
    const handleCheckIn = () => {
        if(currentUser) {
            storage.updateLastActiveDate(currentUser.email);
            refreshData();
        }
    };


    if (!currentUser) {
        return <LoginScreen onLogin={handleLogin} />;
    }

    const renderContent = () => {
        switch (currentView) {
            case 'dashboard':
                return <Dashboard 
                            user={currentUser} 
                            messages={messages} 
                            lastActive={lastActive}
                            onNewMessage={handleNewMessage}
                            onEditMessage={handleEditMessage}
                            onDeleteMessage={handleDeleteMessage}
                        />;
            case 'messageEditor':
                return <MessageEditor 
                            message={editingMessage} 
                            onSave={handleSaveMessage} 
                            onCancel={() => setCurrentView('dashboard')} 
                        />;
            case 'settings':
                return <Settings 
                            lastActive={lastActive}
                            onCheckIn={handleCheckIn}
                        />;
            default:
                return <Dashboard 
                            user={currentUser} 
                            messages={messages} 
                            lastActive={lastActive}
                            onNewMessage={handleNewMessage}
                            onEditMessage={handleEditMessage}
                            onDeleteMessage={handleDeleteMessage}
                        />;
        }
    };

    return (
        <div className="min-h-screen bg-slate-900">
            <Header user={currentUser} onLogout={handleLogout} onNavigate={handleNavigate} />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {renderContent()}
            </main>
        </div>
    );
};

export default App;
