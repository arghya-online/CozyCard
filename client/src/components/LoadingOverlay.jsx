import React from 'react';

/**
 * Loading overlay component - Light mode friendly styling
 */
export default function LoadingOverlay({ message = "Creating your card..." }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm mx-4">
                <div className="flex flex-col items-center space-y-4">
                    {/* Animated spinner */}
                    <div className="relative w-16 h-16">
                        <div className="absolute inset-0 border-4 border-amber-100 rounded-full"></div>
                        <div className="absolute inset-0 border-4 border-transparent border-t-amber-500 rounded-full animate-spin"></div>
                    </div>

                    {/* Message */}
                    <p className="text-gray-700 font-semibold text-center">{message}</p>
                </div>
            </div>
        </div>
    );
}
