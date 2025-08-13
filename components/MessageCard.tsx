import React, { useState } from 'react';
import { Message } from '../types';
import { EditIcon, TrashIcon, MailIcon, Spinner } from './icons';
import * as geminiService from '../services/geminiService';

interface MessageCardProps {
    message: Message;
    onEdit: () => void;
    onDelete: () => void;
    senderName: string;
}

const DeliverySimulationModal: React.FC<{ message: Message, senderName: string, onClose: () => void }> = ({ message, senderName, onClose }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [emailContent, setEmailContent] = useState('');

    React.useEffect(() => {
        const generateEmail = async () => {
            setIsLoading(true);
            const content = await geminiService.generateDeliveryEmail(senderName, message.content);
            setEmailContent(content);
            setIsLoading(false);
        };
        generateEmail();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [message, senderName]);

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl border border-gray-700 max-h-[90vh] flex flex-col">
                <div className="p-4 border-b border-gray-700 flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-white">Delivery Simulation</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-white">&times;</button>
                </div>
                <div className="p-6 overflow-y-auto">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                            <Spinner className="w-10 h-10 text-indigo-500"/>
                            <p className="mt-4">Crafting a compassionate delivery email...</p>
                        </div>
                    ) : (
                        <div className="prose prose-invert prose-sm max-w-none bg-gray-900 p-4 rounded-md border border-gray-700">
                           <pre className="whitespace-pre-wrap font-sans text-gray-300">{emailContent}</pre>
                        </div>
                    )}
                </div>
                <div className="p-4 border-t border-gray-700 text-right">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};


const MessageCard: React.FC<MessageCardProps> = ({ message, onEdit, onDelete, senderName }) => {
    const [showModal, setShowModal] = useState(false);
    
    return (
        <>
        <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 flex flex-col justify-between hover:border-indigo-500/70 transition-all duration-300">
            <div className="p-6">
                <p className="text-gray-300 h-24 overflow-hidden text-ellipsis">
                    {message.content}
                </p>
                <div className="mt-4">
                    <h4 className="text-sm font-semibold text-gray-400">Recipients:</h4>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {message.recipients.map((email, index) => (
                            <span key={index} className="px-2 py-1 bg-gray-700 text-xs text-gray-300 rounded-full">
                                {email}
                            </span>
                        ))}
                    </div>
                </div>
                 <p className="text-xs text-gray-500 mt-4">Created: {new Date(message.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="bg-gray-800/50 border-t border-gray-700 p-2 flex justify-between items-center rounded-b-lg">
                <button 
                    onClick={() => setShowModal(true)}
                    className="flex-1 flex items-center justify-center gap-2 p-2 text-sm text-indigo-400 hover:bg-indigo-500/10 rounded-md transition-colors">
                    <MailIcon className="w-4 h-4" />
                    Simulate
                </button>
                <div className="flex-shrink-0 flex items-center">
                    <button onClick={onEdit} className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-full transition-colors" title="Edit"><EditIcon className="w-4 h-4" /></button>
                    <button onClick={onDelete} className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-full transition-colors" title="Delete"><TrashIcon className="w-4 h-4" /></button>
                </div>
            </div>
        </div>
        {showModal && <DeliverySimulationModal message={message} senderName={senderName} onClose={() => setShowModal(false)} />}
        </>
    );
};

export default MessageCard;