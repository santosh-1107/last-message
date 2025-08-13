import React from 'react';
import { User, AppView } from '../types';
import { LogoutIcon, UserIcon, SettingsIcon } from './icons';

interface HeaderProps {
    user: User;
    onLogout: () => void;
    onNavigate: (view: AppView) => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout, onNavigate }) => {
    return (
        <header className="bg-gray-900/60 backdrop-blur-lg sticky top-0 z-40 border-b border-gray-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <h1 onClick={() => onNavigate('dashboard')} className="text-2xl font-bold text-white cursor-pointer hover:text-gray-200 transition-colors">Ethereal Echoes</h1>
                    </div>
                    <div className="flex items-center space-x-4">
                         <button
                            onClick={() => onNavigate('settings')}
                            className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
                            title="Settings"
                        >
                            <SettingsIcon className="w-6 h-6" />
                        </button>
                        <div className="flex items-center space-x-2 text-gray-300">
                            <UserIcon className="w-5 h-5 text-gray-400" />
                            <span className="text-sm font-medium hidden sm:block">{user.name}</span>
                        </div>
                         <button
                            onClick={onLogout}
                            className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-red-500/20 transition-colors"
                            title="Logout"
                        >
                            <LogoutIcon className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;