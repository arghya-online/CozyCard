import React, { useRef } from 'react';

/**
 * Photo uploader component - simple version without positioning
 */
export default function PhotoUploader({ photoPreviewUrl, onPhotoChange }) {
    const fileInputRef = useRef(null);
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
        onPhotoChange(file, previewUrl);
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

    return (
        <div className="max-w-2xl mx-auto px-4">
            <div className="card-container animate-slide-in">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-800 mb-3">
                    Upload your photo
                </h2>
                <p className="text-gray-600 mb-6">
                    Choose a photo that represents you
                </p>

                {/* Upload area */}
                <div
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 md:p-12 text-center cursor-pointer hover:border-amber-400 hover:bg-amber-50/30 transition-all duration-200"
                >
                    {photoPreviewUrl ? (
                        <div className="space-y-4">
                            <div className="relative w-full max-w-xs mx-auto aspect-[2/3] overflow-hidden rounded-lg bg-gray-100">
                                <img
                                    src={photoPreviewUrl}
                                    alt="Preview"
                                    className="w-full h-full object-contain bg-black"
                                />
                            </div>
                            <p className="text-sm text-gray-500">Click to change photo</p>
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
            </div>
        </div>
    );
}
