/**
 * Personality questions (self-help style)
 * Each question is:
 * [questionText, option1, option2, option3, option4]
 */
export const QUESTIONS = {
    q1: [
        "On most days, you would describe your overall state as:",
        "Calm and steady",
        "Driven and focused",
        "Thoughtful and introspective",
        "Stressed but managing"
    ],

    q2: [
        "When you have free time, you are more likely to:",
        "Create, write, design or build something",
        "Plan, organize or work toward a goal",
        "Read, reflect or journal",
        "Rest and recharge quietly"
    ],

    q3: [
        "Your ideal environment feels:",
        "Simple and uncluttered",
        "Structured and efficient",
        "Expressive and full of ideas",
        "Quiet and spacious for thinking"
    ],

    q4: [
        "You feel most grounded when:",
        "You follow a clear routine",
        "You have time alone to think",
        "You are working on something meaningful",
        "You are processing your thoughts deeply"
    ],

    q5: [
        "Right now, your mindset is closest to:",
        "Hopeful and future-focused",
        "Grateful and present",
        "Tired but still committed",
        "Questioning and trying to understand yourself better"
    ]
};

/**
 * Curated tagline dataset organized by personality traits
 * Each category contains taglines that match specific personality combinations
 */

const TAGLINES = {
    // Calm + Introspective
    calm_introspective: [
        "I choose calm over chaos",
        "Stillness is my strength",
        "Quiet work, deep progress",
        "Grounded, even when life isn’t",
        "I honor my inner pace"
    ],

    // Creative + Expressive
    creative_expressive: [
        "I turn ideas into action",
        "My life is a work in progress I’m shaping",
        "Expression is how I heal and grow",
        "I create what I wish existed",
        "My ideas deserve to be seen"
    ],

    // Productive + Focused
    productive_focused: [
        "Small disciplined steps, big direction",
        "I show up even when I don’t feel like it",
        "Focus today, freedom tomorrow",
        "I am building quietly, consistently",
        "My effort compounds over time"
    ],

    // Thoughtful + Deep
    thoughtful_deep: [
        "I am learning to understand myself, not just fix myself",
        "My questions matter as much as my answers",
        "I grow by looking beneath the surface",
        "I make space for depth, not just speed",
        "I am willing to sit with my thoughts"
    ],

    // Minimal + Clean
    minimal_clean: [
        "I keep what serves me and release what doesn’t",
        "Clarity begins with less noise",
        "Simple choices, intentional life",
        "I protect my energy by simplifying",
        "Space in my surroundings, space in my mind"
    ],

    // Hopeful + Optimistic
    hopeful_optimistic: [
        "I trust that better days are ahead",
        "I am allowed to outgrow older versions of myself",
        "Even slow progress is still progress",
        "Hope is a habit I practice daily",
        "I am not behind, I am in process"
    ],

    // Tired but Resilient
    tired_resilient: [
        "I can be exhausted and still keep going",
        "Rest is part of my resilience, not a weakness",
        "I have survived every hard day so far",
        "I am tired, but I haven’t given up on myself",
        "My persistence is my quiet strength"
    ],

    // Default/Universal
    universal: [
        "I am a work in progress, and that’s enough",
        "I am learning as I move forward",
        "I don’t have it all figured out, and that’s okay",
        "I am allowed to start over as many times as I need",
        "I am becoming someone I can trust",
        "I grow a little more every day",
        "I am figuring life out at my own pace",
        "I am allowed to take up space while I learn",
        "I honor the season I am in",
        "I am not perfect, I am evolving"
    ]
};

/**
 * Maps personality answers to tagline categories
 * @param {Object} answers - User's answers to personality questions
 * @returns {string} - Category key for tagline selection
 */
function mapAnswersToCategory(answers) {
    const { q1, q2, q3, q4, q5 } = answers;

    // Calm + Introspective patterns
    if (
        (q1 === "Calm and steady" || q1 === "Thoughtful and introspective") &&
        (q4 === "You have time alone to think" || q4 === "You are processing your thoughts deeply")
    ) {
        return "calm_introspective";
    }

    // Creative + Expressive patterns
    if (
        (q2 === "Create, write, design or build something" || q3 === "Expressive and full of ideas") &&
        (q3 === "Expressive and full of ideas" || q4 === "You are working on something meaningful")
    ) {
        return "creative_expressive";
    }

    // Productive + Focused patterns
    if (
        (q1 === "Driven and focused" || q2 === "Plan, organize or work toward a goal") &&
        (q3 === "Structured and efficient" || q4 === "You follow a clear routine")
    ) {
        return "productive_focused";
    }

    // Thoughtful + Deep patterns
    if (
        (q1 === "Thoughtful and introspective" || q4 === "You are processing your thoughts deeply") &&
        (q5 === "Questioning and trying to understand yourself better" || q2 === "Read, reflect or journal")
    ) {
        return "thoughtful_deep";
    }

    // Minimal + Clean patterns
    if (
        q3 === "Simple and uncluttered" &&
        (
            q2 === "Read, reflect or journal" ||
            q3 === "Structured and efficient" ||
            q4 === "You follow a clear routine"
        )
    ) {
        return "minimal_clean";
    }

    // Hopeful + Optimistic patterns
    if (q5 === "Hopeful and future-focused" || q5 === "Grateful and present") {
        return "hopeful_optimistic";
    }

    // Tired but Resilient patterns
    if (q5 === "Tired but still committed" || q1 === "Stressed but managing") {
        return "tired_resilient";
    }

    // Default to universal
    return "universal";
}

/**
 * Generates a personalized tagline based on user answers
 * @param {Object} params - Parameters for tagline generation
 * @param {string} params.name - User's name
 * @param {Object} params.answers - User's answers to personality questions
 * @returns {string} - Selected tagline
 */
export function generateTagline({ name, answers }) {
    // Map answers to category
    const category = mapAnswersToCategory(answers);

    // Get taglines for the category
    const taglines = TAGLINES[category] || TAGLINES.universal;

    // Randomly select a tagline
    const randomIndex = Math.floor(Math.random() * taglines.length);
    const tagline = taglines[randomIndex];

    return tagline;
}
