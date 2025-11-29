import React from 'react';

export default function NameInput({ name, onNameChange }) {
    return (
        <div className="max-w-2xl mx-auto px-4">
            <div className="card-container animate-slide-in">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-800 mb-3">
                    What's your name?
                </h2>
                <p className="text-gray-600 mb-6">
                    We'll personalize your card with your name
                </p>

                <input
                    type="text"
                    value={name}
                    onChange={(e) => onNameChange(e.target.value)}
                    placeholder="Enter your name..."
                    className="input-field text-lg"
                    autoFocus
                />
            </div>
        </div>
    );
}
