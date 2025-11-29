import React, { useState } from 'react';
import QuestionStepper from './components/QuestionStepper';
import NameInput from './components/NameInput';
import PhotoUploader from './components/PhotoUploader';
import GradientPicker from './components/GradientPicker';
import CardPreview from './components/CardPreview';
import LoadingOverlay from './components/LoadingOverlay';
import { generateTagline } from './lib/api';

// Step constants
const STEPS = {
    QUESTIONS: 0,
    NAME: 1,
    PHOTO: 2,
    GRADIENT: 3,
    PREVIEW: 4
};

function App() {
    // Form state
    const [currentStep, setCurrentStep] = useState(STEPS.QUESTIONS);
    const [formData, setFormData] = useState({
        name: '',
        photoFile: null,
        photoPreviewUrl: '',
        imagePosition: 50, // Vertical position 0-100
        gradientId: 'ocean_depth',
        answers: {
            q1: '',
            q2: '',
            q3: '',
            q4: '',
            q5: ''
        }
    });

    // UI state
    const [tagline, setTagline] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Handlers
    const handleAnswerChange = (questionId, answer) => {
        setFormData(prev => ({
            ...prev,
            answers: {
                ...prev.answers,
                [questionId]: answer
            }
        }));
    };

    const handleNameChange = (name) => {
        setFormData(prev => ({ ...prev, name }));
    };

    const handlePhotoChange = (file, previewUrl, position = 50) => {
        setFormData(prev => ({
            ...prev,
            photoFile: file || prev.photoFile,
            photoPreviewUrl: previewUrl,
            imagePosition: position
        }));
    };

    const handleGradientChange = (gradientId) => {
        setFormData(prev => ({ ...prev, gradientId }));
    };

    // Validation functions
    const canProceedFromQuestions = () => {
        const { answers } = formData;
        return Object.values(answers).every(answer => answer.trim().length > 0);
    };

    const canProceedFromName = () => {
        return formData.name.trim().length > 0;
    };

    const canProceedFromPhoto = () => {
        return formData.photoPreviewUrl !== '';
    };

    // Navigation
    const handleNext = async () => {
        if (currentStep === STEPS.QUESTIONS && !canProceedFromQuestions()) {
            setError('Please answer all questions');
            return;
        }
        if (currentStep === STEPS.NAME && !canProceedFromName()) {
            setError('Please enter your name');
            return;
        }
        if (currentStep === STEPS.PHOTO && !canProceedFromPhoto()) {
            setError('Please upload a photo');
            return;
        }

        setError('');

        // If moving from gradient to preview, generate tagline
        if (currentStep === STEPS.GRADIENT) {
            await handleGenerateCard();
        } else {
            setCurrentStep(prev => prev + 1);
        }
    };

    const handleBack = () => {
        setError('');
        setCurrentStep(prev => prev - 1);
    };

    const handleGenerateCard = async () => {
        setLoading(true);
        setError('');

        try {
            const response = await generateTagline({
                name: formData.name,
                answers: formData.answers
            });

            setTagline(response.tagline);
            setCurrentStep(STEPS.PREVIEW);
        } catch (err) {
            setError(err.message || 'Failed to generate tagline. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleStartOver = () => {
        setCurrentStep(STEPS.QUESTIONS);
        setFormData({
            name: '',
            photoFile: null,
            photoPreviewUrl: '',
            imagePosition: 50,
            gradientId: 'ocean_depth',
            answers: {
                q1: '',
                q2: '',
                q3: '',
                q4: '',
                q5: ''
            }
        });
        setTagline('');
        setError('');
    };

    // Render current step
    const renderStep = () => {
        switch (currentStep) {
            case STEPS.QUESTIONS:
                return (
                    <QuestionStepper
                        answers={formData.answers}
                        onAnswerChange={handleAnswerChange}
                    />
                );
            case STEPS.NAME:
                return (
                    <NameInput
                        name={formData.name}
                        onNameChange={handleNameChange}
                    />
                );
            case STEPS.PHOTO:
                return (
                    <PhotoUploader
                        photoPreviewUrl={formData.photoPreviewUrl}
                        onPhotoChange={handlePhotoChange}
                    />
                );
            case STEPS.GRADIENT:
                return (
                    <GradientPicker
                        selectedGradientId={formData.gradientId}
                        onSelectGradient={handleGradientChange}
                    />
                );
            case STEPS.PREVIEW:
                return (
                    <CardPreview
                        name={formData.name}
                        tagline={tagline}
                        gradientId={formData.gradientId}
                        photoPreviewUrl={formData.photoPreviewUrl}
                        imagePosition={formData.imagePosition}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen py-8 md:py-12 px-4">
            {/* Loading overlay */}
            {loading && <LoadingOverlay />}

            {/* Header */}
            <div className="max-w-4xl mx-auto mb-8 md:mb-12 text-center">
                <h1 className="text-4xl md:text-5xl font-semibold text-gray-800 mb-3">
                    CozyCard
                </h1>
                <p className="text-gray-600 text-sm md:text-base">
                    Create your personalized card
                </p>
            </div>

            {/* Progress indicator */}
            {currentStep !== STEPS.PREVIEW && (
                <div className="max-w-md mx-auto mb-8">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs md:text-sm font-medium text-gray-600">
                            Step {currentStep + 1} of 4
                        </span>
                        <span className="text-xs md:text-sm font-medium text-amber-700">
                            {Math.round(((currentStep + 1) / 4) * 100)}%
                        </span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-amber-500 transition-all duration-500 rounded-full"
                            style={{ width: `${((currentStep + 1) / 4) * 100}%` }}
                        ></div>
                    </div>
                </div>
            )}

            {/* Error message */}
            {error && (
                <div className="max-w-md mx-auto mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-2xl text-red-700 text-center font-medium text-sm animate-fade-in">
                    {error}
                </div>
            )}

            {/* Current step content */}
            <div className="mb-8">
                {renderStep()}
            </div>

            {/* Navigation buttons */}
            <div className="max-w-2xl mx-auto px-4">
                <div className="flex justify-between items-center gap-3">
                    {currentStep > STEPS.QUESTIONS && currentStep !== STEPS.PREVIEW && (
                        <button onClick={handleBack} className="btn-secondary flex-shrink-0">
                            Back
                        </button>
                    )}

                    <div className="flex-1"></div>

                    {currentStep === STEPS.PREVIEW ? (
                        <button onClick={handleStartOver} className="btn-secondary">
                            Create Another
                        </button>
                    ) : (
                        <button
                            onClick={handleNext}
                            className="btn-primary flex-shrink-0"
                            disabled={
                                (currentStep === STEPS.QUESTIONS && !canProceedFromQuestions()) ||
                                (currentStep === STEPS.NAME && !canProceedFromName()) ||
                                (currentStep === STEPS.PHOTO && !canProceedFromPhoto())
                            }
                        >
                            {currentStep === STEPS.GRADIENT ? 'Generate Card' : 'Next'}
                        </button>
                    )}
                </div>
            </div>

            {/* Footer */}
            <div className="mt-12 md:mt-16 text-center text-gray-400 text-xs px-4">
                <p>Made with React + Express</p>
            </div>
        </div>
    );
}

export default App;
