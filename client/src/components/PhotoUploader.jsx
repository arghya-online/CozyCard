import React, { useRef, useState } from 'react';

/**
 * Photo uploader component with Twitter-style drag positioning
 */
export default function PhotoUploader({ photoPreviewUrl, onPhotoChange }) {
    const fileInputRef = useRef(null);
    const [imagePosition, setImagePosition] = useState(50); // Vertical position (0-100)
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState(0);
    const containerRef = useRef(null);
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            validateAndSetPhoto(file);
        }
    };

    const validateAndSetPhoto = (file) => {
        // Validate file type
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        if (!validTypes.includes(file.type)) {
            alert('Please upload a valid image file (JPG, PNG, or WebP)');
            return;
        }

        // Validate file size
        if (file.size > MAX_FILE_SIZE) {
            alert('File size must be less than 5MB');
            return;
        }

        // Create preview URL
        const previewUrl = URL.createObjectURL(file);
        setImagePosition(50); // Reset to center
        onPhotoChange(file, previewUrl, 50);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const file = e.dataTransfer.files?.[0];
        if (file) {
            validateAndSetPhoto(file);
        }
    };

    // Image positioning drag handlers
    const handleMouseDown = (e) => {
        if (!photoPreviewUrl) return;
        setIsDragging(true);
        setDragStart(e.clientY);
        e.preventDefault();
    };

    const handleMouseMove = (e) => {
        if (!isDragging || !containerRef.current) return;

        const container = containerRef.current;
        const rect = container.getBoundingClientRect();
        const deltaY = e.clientY - dragStart;
        const containerHeight = rect.height;

        // Calculate new position (percentage)
        const deltaPercent = (deltaY / containerHeight) * 100;
        const newPosition = Math.max(0, Math.min(100, imagePosition - deltaPercent));

        setImagePosition(newPosition);
        setDragStart(e.clientY);
        onPhotoChange(null, photoPreviewUrl, newPosition);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleTouchStart = (e) => {
        if (!photoPreviewUrl) return;
        setIsDragging(true);
        setDragStart(e.touches[0].clientY);
        e.preventDefault();
    };

    const handleTouchMove = (e) => {
        if (!isDragging || !containerRef.current) return;

        const container = containerRef.current;
        const rect = container.getBoundingClientRect();
        const deltaY = e.touches[0].clientY - dragStart;
        const containerHeight = rect.height;

        const deltaPercent = (deltaY / containerHeight) * 100;
        const newPosition = Math.max(0, Math.min(100, imagePosition - deltaPercent));

        setImagePosition(newPosition);
        setDragStart(e.touches[0].clientY);
        onPhotoChange(null, photoPreviewUrl, newPosition);
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
    };

    // Add global mouse listeners when dragging
    React.useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
            window.addEventListener('touchmove', handleTouchMove);
            window.addEventListener('touchend', handleTouchEnd);

            return () => {
                window.removeEventListener('mousemove', handleMouseMove);
                window.removeEventListener('mouseup', handleMouseUp);
                window.removeEventListener('touchmove', handleTouchMove);
                window.removeEventListener('touchend', handleTouchEnd);
            };
        }
    }, [isDragging, dragStart, imagePosition]);

    return (
        <div className="max-w-2xl mx-auto px-4">
            <div className="card-container animate-slide-in">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-800 mb-3">
                    Upload your photo
                </h2>
                <p className="text-gray-600 mb-6">
                    {photoPreviewUrl ? 'Drag the image to adjust position' : 'Choose a photo that represents you'}
                </p>

                {/* Upload/Preview area */}
                <div
                    onClick={() => !photoPreviewUrl && fileInputRef.current?.click()}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    className={`relative border-2 border-dashed border-gray-300 rounded-lg p-6 md:p-12 text-center transition-all duration-200 ${!photoPreviewUrl ? 'cursor-pointer hover:border-amber-400 hover:bg-amber-50/30' : ''
                        }`}
                >
                    {photoPreviewUrl ? (
                        <div className="space-y-4">
                            <div
                                ref={containerRef}
                                className={`relative w-full max-w-xs mx-auto aspect-[2/3] overflow-hidden rounded-lg bg-black ${isDragging ? 'cursor-grabbing' : 'cursor-grab'
                                    }`}
                                onMouseDown={handleMouseDown}
                                onTouchStart={handleTouchStart}
                            >
                                <img
                                    src={photoPreviewUrl}
                                    alt="Preview"
                                    className="absolute w-full h-auto min-h-full object-cover pointer-events-none select-none"
                                    style={{
                                        top: '50%',
                                        transform: `translateY(calc(-50% + ${(50 - imagePosition) * 2}%))`,
                                        transition: isDragging ? 'none' : 'transform 0.1s ease-out'
                                    }}
                                    draggable={false}
                                />

                                {/* Drag hint overlay */}
                                {!isDragging && (
                                    <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
                                        <div className="opacity-0 hover:opacity-100 transition-opacity duration-200 bg-black bg-opacity-70 px-4 py-2 rounded-lg">
                                            <p className="text-white text-sm font-medium">Drag to adjust</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="w-20 h-20 mx-auto bg-amber-100 rounded-full flex items-center justify-center">
                                <span className="text-4xl">📸</span>
                            </div>
                            <div>
                                <p className="text-gray-700 font-semibold">Click or drag to upload</p>
                                <p className="text-sm text-gray-500 mt-2">JPG, PNG or WebP (max 5MB)</p>
                            </div>
                        </div>
                    )}

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/jpeg,image/jpg,image/png,image/webp"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                </div>

                {/* Change photo button */}
                {photoPreviewUrl && (
                    <div className="mt-4 text-center">
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="text-sm text-amber-600 hover:text-amber-700 font-medium underline"
                        >
                            Change photo
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
