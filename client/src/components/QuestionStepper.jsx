import React, { useState } from 'react';

// Casual, friendly questions
const QUESTIONS = [
    {
        id: 'q1',
        question: "How do you like to spend your free time?",
        options: [
            'Reading or learning new things',
            'Creating art or making stuff',
            'Hanging out with friends',
            'Relaxing and doing nothing',
            'Working on personal projects'
        ]
    },
    {
        id: 'q2',
        question: "What's your favorite color vibe?",
        options: [
            'Warm and cozy (oranges, reds)',
            'Cool and calm (blues, greens)',
            'Bright and energetic (yellows, pinks)',
            'Dark and mysterious (blacks, purples)',
            'Soft and gentle (pastels)'
        ]
    },
    {
        id: 'q3',
        question: "How do you like to have fun?",
        options: [
            'Trying new experiences',
            'Deep conversations',
            'Games and competitions',
            'Quiet activities alone',
            'Adventures and exploring'
        ]
    },
    {
        id: 'q4',
        question: "What kind of environment makes you happy?",
        options: [
            'Clean and organized',
            'Cozy and comfortable',
            'Busy and energetic',
            'Peaceful and quiet',
            'Creative and inspiring'
        ]
    },
    {
        id: 'q5',
        question: "What's your ideal weekend?",
        options: [
            'Productive and getting things done',
            'Social and fun with others',
            'Restful and recharging',
            'Adventurous and spontaneous',
            'Learning and growing'
        ]
    }
];

/**
 * Question stepper component - Shows one question at a time with navigation
 */
export default function QuestionStepper({ answers, onAnswerChange }) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const currentQuestion = QUESTIONS[currentQuestionIndex];

    const handleNext = () => {
        if (currentQuestionIndex < QUESTIONS.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
        }
    };

    const isAnswered = answers[currentQuestion.id] && answers[currentQuestion.id].trim().length > 0;
    const isLastQuestion = currentQuestionIndex === QUESTIONS.length - 1;
    const isFirstQuestion = currentQuestionIndex === 0;

    return (
        <div className="max-w-2xl mx-auto px-4">
            <div className="card-container animate-slide-in">
                {/* Question counter */}
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-amber-700">
                            Question {currentQuestionIndex + 1} of {QUESTIONS.length}
                        </span>
                        <span className="text-sm font-medium text-gray-500">
                            {Math.round(((currentQuestionIndex + 1) / QUESTIONS.length) * 100)}%
                        </span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-amber-500 transition-all duration-500 rounded-full"
                            style={{ width: `${((currentQuestionIndex + 1) / QUESTIONS.length) * 100}%` }}
                        />
                    </div>
                </div>

                {/* Question */}
                <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-800 mb-6 md:mb-8 leading-tight">
                    {currentQuestion.question}
                </h2>

                {/* Options */}
                <div className="space-y-3 mb-8">
                    {currentQuestion.options.map((option) => {
                        const isSelected = answers[currentQuestion.id] === option;
                        return (
                            <label
                                key={option}
                                className={`question-option ${isSelected ? 'question-option-selected' : 'question-option-unselected'
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name={currentQuestion.id}
                                    value={option}
                                    checked={isSelected}
                                    onChange={(e) => onAnswerChange(currentQuestion.id, e.target.value)}
                                    className="sr-only"
                                />

                                <span className="flex items-center">
                                    <span className={`
                                        w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center flex-shrink-0
                                        ${isSelected
                                            ? 'border-amber-500 bg-amber-500'
                                            : 'border-gray-300'
                                        }
                                    `}>
                                        {isSelected && (
                                            <span className="w-2 h-2 bg-white rounded-full"></span>
                                        )}
                                    </span>
                                    <span>{option}</span>
                                </span>
                            </label>
                        );
                    })}
                </div>

                {/* Navigation buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100 gap-3">
                    <button
                        onClick={handlePrevious}
                        disabled={isFirstQuestion}
                        className="btn-secondary disabled:opacity-30 disabled:cursor-not-allowed flex-1 sm:flex-initial"
                    >
                        Previous
                    </button>

                    <button
                        onClick={handleNext}
                        disabled={!isAnswered || isLastQuestion}
                        className="btn-primary disabled:opacity-30 flex-1 sm:flex-initial"
                    >
                        Next
                    </button>
                </div>

                {/* Helper text */}
                {!isAnswered && (
                    <p className="text-center text-sm text-gray-400 mt-4">
                        Please select an option to continue
                    </p>
                )}
            </div>
        </div>
    );
}
