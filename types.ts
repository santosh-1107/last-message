
export interface User {
    email: string;
    name: string;
}

export interface Message {
    id: string;
    content: string;
    recipients: string[];
    createdAt: string;
}

export type AppView = 'dashboard' | 'messageEditor' | 'settings';
