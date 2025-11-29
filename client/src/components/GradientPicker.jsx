import React from 'react';

// Professional gradient options
export const GRADIENTS = [
    {
        id: 'ocean_depth',
        label: 'Ocean Depth',
        className: 'from-blue-900 via-blue-700 to-cyan-500'
    },
    {
        id: 'forest_mist',
        label: 'Forest Mist',
        className: 'from-emerald-900 via-teal-700 to-green-400'
    },
    {
        id: 'sunset_amber',
        label: 'Sunset Amber',
        className: 'from-orange-800 via-amber-600 to-yellow-400'
    },
    {
        id: 'midnight_sky',
        label: 'Midnight Sky',
        className: 'from-slate-900 via-blue-900 to-indigo-800'
    },
    {
        id: 'autumn_leaves',
        label: 'Autumn Leaves',
        className: 'from-red-900 via-orange-700 to-amber-500'
    },
    {
        id: 'arctic_ice',
        label: 'Arctic Ice',
        className: 'from-slate-700 via-cyan-600 to-sky-400'
    },
];

/**
 * Gradient picker component - Light mode friendly styling
 */
export default function GradientPicker({ selectedGradientId, onSelectGradient }) {
    return (
        <div className="max-w-2xl mx-auto px-4">
            <div className="card-container animate-slide-in">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-800 mb-3">
                    Pick your card style
                </h2>
                <p className="text-gray-600 mb-6">
                    Choose a gradient that matches your vibe
                </p>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {GRADIENTS.map((gradient) => (
                        <button
                            key={gradient.id}
                            onClick={() => onSelectGradient(gradient.id)}
                            className={`
                                relative h-32 md:h-36 bg-gradient-to-br ${gradient.className} rounded-lg
                                transition-all duration-200 overflow-hidden
                                ${selectedGradientId === gradient.id
                                    ? 'ring-2 ring-amber-500 ring-offset-2 shadow-lg'
                                    : 'opacity-90 hover:opacity-100 shadow-md'
                                }
                            `}
                            aria-label={`Select ${gradient.label} gradient`}
                        >
                            {/* Label */}
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white text-sm font-semibold py-3 px-2">
                                {gradient.label}
                            </div>

                            {/* Selected indicator */}
                            {selectedGradientId === gradient.id && (
                                <div className="absolute top-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md">
                                    <span className="text-amber-600 text-sm font-bold">✓</span>
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
