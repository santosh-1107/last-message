import React from 'react';
import { User, Message } from '../types';
import { PlusIcon, MailIcon } from './icons';
import MessageCard from './MessageCard';

interface DashboardProps {
    user: User;
    messages: Message[];
    lastActive: string | null;
    onNewMessage: () => void;
    onEditMessage: (message: Message) => void;
    onDeleteMessage: (id: string) => void;
}

const InactivityNotice: React.FC<{ lastActive: string | null }> = ({ lastActive }) => {
    if (!lastActive) {
        return (
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <p>Welcome! This is your first session. We've started tracking your activity now.</p>
            </div>
        );
    }
    
    const lastActiveDate = new Date(lastActive);
    const deliveryDate = new Date(lastActiveDate);
    deliveryDate.setDate(deliveryDate.getDate() + 365);

    return (
        <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 shadow-lg">
            <h3 className="text-lg font-semibold text-indigo-400">Activity Status</h3>
            <p className="text-gray-300 mt-2">
                Your vault is active. To keep it sealed, please sign in at least once a year.
            </p>
            <div className="mt-4 space-y-2 text-sm">
                <p><span className="font-medium text-gray-400">Last Check-in:</span> {lastActiveDate.toLocaleString()}</p>
                <p><span className="font-medium text-gray-400">Messages Scheduled for Delivery After:</span> <span className="text-amber-400">{deliveryDate.toLocaleDateString()}</span></p>
            </div>
             <p className="mt-4 text-xs text-gray-500">
               Note: Automatic email delivery is a conceptual feature. In this demo, you can simulate delivery manually. Visit Settings to reset your activity timer.
            </p>
        </div>
    )
}

const Dashboard: React.FC<DashboardProps> = ({ user, messages, lastActive, onNewMessage, onEditMessage, onDeleteMessage }) => {
    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-bold text-white">Welcome back, {user.name.split(' ')[0]}</h2>
            
            <InactivityNotice lastActive={lastActive} />

            <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold text-white">Your Messages</h3>
                <button
                    onClick={onNewMessage}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-indigo-500/20"
                >
                    <PlusIcon className="w-5 h-5" />
                    New Message
                </button>
            </div>

            {messages.length === 0 ? (
                <div className="text-center py-16 px-6 bg-gray-800/50 rounded-lg border-2 border-dashed border-gray-700">
                    <MailIcon className="mx-auto h-12 w-12 text-gray-500" />
                    <h3 className="mt-4 text-xl font-medium text-gray-300">Your vault is empty</h3>
                    <p className="mt-2 text-gray-400">Create your first message to be stored securely.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {messages.map(msg => (
                        <MessageCard 
                            key={msg.id} 
                            message={msg}
                            onEdit={() => onEditMessage(msg)}
                            onDelete={() => onDeleteMessage(msg.id)}
                            senderName={user.name}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dashboard;