import React, { useState, useEffect } from 'react';
import { Message } from '../types';

interface MessageEditorProps {
    message: Message | null;
    onSave: (message: Omit<Message, 'id' | 'createdAt'>) => void;
    onCancel: () => void;
}

const MessageEditor: React.FC<MessageEditorProps> = ({ message, onSave, onCancel }) => {
    const [content, setContent] = useState('');
    const [recipients, setRecipients] = useState('');

    useEffect(() => {
        if (message) {
            setContent(message.content);
            setRecipients(message.recipients.join(', '));
        } else {
            setContent('');
            setRecipients('');
        }
    }, [message]);

    const handleSave = () => {
        const recipientList = recipients.split(',').map(e => e.trim()).filter(e => e);
        if (content.trim() && recipientList.length > 0) {
            onSave({ content, recipients: recipientList });
        } else {
            alert('Please fill in the message content and at least one recipient.');
        }
    };

    return (
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-6">
                {message ? 'Edit Your Message' : 'Compose a New Message'}
            </h2>
            <div className="space-y-6">
                <div>
                    <label htmlFor="content" className="block text-sm font-medium text-gray-300 mb-2">
                        Your Message
                    </label>
                    <textarea
                        id="content"
                        rows={10}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full p-3 bg-gray-900 border border-gray-600 rounded-md text-gray-200 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                        placeholder="Write your message here. Speak from the heart..."
                    ></textarea>
                </div>
                <div>
                    <label htmlFor="recipients" className="block text-sm font-medium text-gray-300 mb-2">
                        Recipient Emails
                    </label>
                    <input
                        type="text"
                        id="recipients"
                        value={recipients}
                        onChange={(e) => setRecipients(e.target.value)}
                        className="w-full p-3 bg-gray-900 border border-gray-600 rounded-md text-gray-200 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                        placeholder="recipient1@example.com, recipient2@example.com"
                    />
                    <p className="text-xs text-gray-500 mt-2">Separate multiple emails with a comma.</p>
                </div>
            </div>
            <div className="mt-8 flex justify-end gap-4">
                <button
                    onClick={onCancel}
                    className="px-6 py-2 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors"
                >
                    Cancel
                </button>
                <button
                    onClick={handleSave}
                    className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
                >
                    Save Message
                </button>
            </div>
        </div>
    );
};

export default MessageEditor;