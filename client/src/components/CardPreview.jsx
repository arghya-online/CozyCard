import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import { GRADIENTS } from './GradientPicker';

/**
 * Card preview component - Shows final card with gradient (NO filter over photo)
 */
export default function CardPreview({ name, tagline, gradientId, photoPreviewUrl }) {
    const cardRef = useRef(null);

    // Find the selected gradient
    const gradient = GRADIENTS.find(g => g.id === gradientId) || GRADIENTS[0];

    const handleDownload = async () => {
        if (!cardRef.current) return;

        try {
            const canvas = await html2canvas(cardRef.current, {
                scale: 3,
                useCORS: true,
                allowTaint: true,
                backgroundColor: '#000000',
                logging: false
            });

            canvas.toBlob((blob) => {
                if (!blob) {
                    alert('Failed to create image');
                    return;
                }

                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.download = `${name.toLowerCase().replace(/\s+/g, '-') || 'card'}.png`;
                link.href = url;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                setTimeout(() => URL.revokeObjectURL(url), 100);
            }, 'image/png', 1.0);

        } catch (error) {
            console.error('Failed to download card:', error);
            alert('Failed to download card. Please try again.');
        }
    };

    return (
        <div className="max-w-2xl mx-auto px-4">
            <div className="card-container">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-800 mb-6 text-center">
                    Your card is ready!
                </h2>

                {/* Card - Professional design */}
                <div
                    ref={cardRef}
                    className="relative mx-auto bg-black overflow-hidden"
                    style={{
                        width: '100%',
                        maxWidth: '400px',
                        aspectRatio: '2/3',
                        fontFamily: 'Courier New, monospace'
                    }}
                >
                    {/* Large Photo - 75% of card - Shows entire image */}
                    {photoPreviewUrl && (
                        <div className="relative w-full h-[75%] overflow-hidden bg-black">
                            <img
                                src={photoPreviewUrl}
                                alt={name}
                                className="w-full h-full object-contain"
                                crossOrigin="anonymous"
                            />
                        </div>
                    )}

                    {/* Info Section - 25% of card - GRADIENT ONLY HERE */}
                    <div className={`relative h-[25%] bg-gradient-to-br ${gradient.className} p-6 flex flex-col justify-between`}>
                        <div className="absolute top-0 left-0 right-0 h-1 bg-white"></div>

                        <div className="flex-1 flex flex-col justify-center">
                            <h1 style={{
                                fontSize: '24px',
                                fontFamily: 'Courier New, monospace',
                                fontWeight: 'bold',
                                color: 'white',
                                textAlign: 'center',
                                marginBottom: '8px',
                                textTransform: 'uppercase',
                                letterSpacing: '0.2em',
                                textShadow: '0 4px 6px rgba(0,0,0,0.3)'
                            }}>
                                {name}
                            </h1>

                            {tagline && (
                                <div className="relative">
                                    <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-8 bg-white opacity-50"></div>
                                    <p style={{
                                        fontSize: '14px',
                                        fontFamily: 'Courier New, monospace',
                                        color: 'white',
                                        textAlign: 'center',
                                        padding: '0 16px',
                                        lineHeight: '1.5',
                                        textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                                    }}>
                                        {tagline}
                                    </p>
                                    <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-1 h-8 bg-white opacity-50"></div>
                                </div>
                            )}
                        </div>

                        <div className="flex items-center justify-center space-x-2 pt-3 border-t border-white border-opacity-30">
                            <div className="w-8 h-px bg-white opacity-50"></div>
                            <p style={{
                                fontSize: '10px',
                                fontFamily: 'Courier New, monospace',
                                color: 'white',
                                opacity: 0.7,
                                textTransform: 'uppercase',
                                letterSpacing: '0.2em'
                            }}>
                                COZYCARD
                            </p>
                            <div className="w-8 h-px bg-white opacity-50"></div>
                        </div>
                    </div>
                </div>

                {/* Download button */}
                <div className="mt-8 text-center">
                    <button
                        onClick={handleDownload}
                        className="btn-primary inline-flex items-center space-x-2"
                    >
                        <span>Download Card</span>
                    </button>
                    <p className="text-xs text-gray-500 mt-2">400x600px • High Quality PNG</p>
                </div>
            </div>
        </div>
    );
}
