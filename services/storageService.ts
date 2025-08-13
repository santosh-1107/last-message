
import { v4 as uuidv4 } from 'uuid';
import { User, Message } from '../types';

const LOGGED_IN_USER_KEY = 'etherealEchoesUser';

const getUserStorageKey = (email: string) => `etherealEchoes_${email}`;

// --- User Management ---

export const getLoggedInUser = (): User | null => {
    const userJson = localStorage.getItem(LOGGED_IN_USER_KEY);
    return userJson ? JSON.parse(userJson) : null;
};

export const loginUser = (user: User) => {
    localStorage.setItem(LOGGED_IN_USER_KEY, JSON.stringify(user));
    const userStorageKey = getUserStorageKey(user.email);
    if (!localStorage.getItem(userStorageKey)) {
        localStorage.setItem(userStorageKey, JSON.stringify({ messages: [], lastActive: null }));
    }
};

export const logoutUser = () => {
    localStorage.removeItem(LOGGED_IN_USER_KEY);
};


// --- User Data Management ---

const getUserData = (email: string): { messages: Message[], lastActive: string | null } => {
    const dataJson = localStorage.getItem(getUserStorageKey(email));
    if (dataJson) {
        return JSON.parse(dataJson);
    }
    return { messages: [], lastActive: null };
}

const saveUserData = (email: string, data: { messages: Message[], lastActive: string | null }) => {
    localStorage.setItem(getUserStorageKey(email), JSON.stringify(data));
}

// --- Message Management ---

export const getMessages = (email: string): Message[] => {
    return getUserData(email).messages;
};

export const saveMessage = (email: string, message: Partial<Message> & { content: string; recipients: string[] }) => {
    const data = getUserData(email);
    if (message.id) {
        // Update existing message
        data.messages = data.messages.map(m => m.id === message.id ? { ...m, ...message } : m);
    } else {
        // Create new message
        const newMessage: Message = {
            id: uuidv4(),
            createdAt: new Date().toISOString(),
            ...message
        };
        data.messages.push(newMessage);
    }
    saveUserData(email, data);
};


export const deleteMessage = (email: string, messageId: string) => {
    const data = getUserData(email);
    data.messages = data.messages.filter(m => m.id !== messageId);
    saveUserData(email, data);
};


// --- Inactivity Tracking ---

export const getLastActiveDate = (email: string): string | null => {
    return getUserData(email).lastActive;
};

export const updateLastActiveDate = (email: string) => {
    const data = getUserData(email);
    data.lastActive = new Date().toISOString();
    saveUserData(email, data);
};
