import React, {useState} from 'react';

interface SettingsProps {
    lastActive: string | null;
    onCheckIn: () => void;
}

const Settings: React.FC<SettingsProps> = ({ lastActive, onCheckIn }) => {
    const [confirmed, setConfirmed] = useState(false);

    const handleCheckIn = () => {
        onCheckIn();
        setConfirmed(true);
        setTimeout(() => setConfirmed(false), 3000);
    }

    const lastActiveDate = lastActive ? new Date(lastActive) : new Date();
    const deliveryDate = new Date(lastActiveDate);
    deliveryDate.setDate(deliveryDate.getDate() + 365);

    return (
        <div className="max-w-2xl mx-auto bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700">
            <h2 className="text-3xl font-bold text-white">Settings & Activity</h2>
            <p className="text-gray-400 mt-2">
                Manage your account's inactivity timer.
            </p>

            <div className="mt-8 space-y-6">
                <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-700">
                    <h3 className="text-lg font-semibold text-indigo-400">Inactivity Protocol</h3>
                    <p className="text-gray-300 mt-2">
                        To ensure your messages are only sent when intended, this service uses an inactivity timer. If you do not log in or "check in" for a period of 365 days, your stored messages will be dispatched to their recipients.
                    </p>
                </div>

                <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-700">
                     <h3 className="text-lg font-semibold text-white">Your Current Status</h3>
                     <div className="mt-4 space-y-2 text-sm">
                        <p><span className="font-medium text-gray-400">Last Activity Recorded:</span> {lastActiveDate.toLocaleString()}</p>
                        <p><span className="font-medium text-gray-400">Messages will be sent after:</span> <span className="text-amber-400">{deliveryDate.toLocaleDateString()}</span></p>
                    </div>
                </div>

                <div className="text-center">
                    <button
                        onClick={handleCheckIn}
                        className="w-full md:w-auto px-8 py-4 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-indigo-500/30"
                    >
                        I'm Still Here (Reset Activity Timer)
                    </button>
                    {confirmed && (
                        <p className="mt-4 text-indigo-400 animate-pulse">
                            Timer successfully reset! Your vault is secure for another year.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Settings;
