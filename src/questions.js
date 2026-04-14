export const QUESTIONS = [
  {
    id: "initiator",
    text: "Who initiated this interaction?",
    options: ["They reached out", "I reached out", "It was mutual or coincidental"],
    weights: [3, 1, 2],
  },
  {
    id: "duration",
    text: "Roughly how long did it last?",
    options: ["Under 15 minutes", "15 to 60 minutes", "1 to 3 hours", "More than 3 hours"],
    weights: [1, 2, 3, 3],
  },
  {
    id: "balance",
    text: "How balanced was the conversation or activity?",
    options: ["Mostly about them", "Roughly equal", "Mostly about me"],
    weights: [1, 3, 1],
  },
  {
    id: "energy",
    text: "How did you feel directly afterward?",
    options: ["Energised or happy", "Content", "Indifferent", "Drained or low"],
    weights: [3, 3, 1, 0],
  },
  {
    id: "recall",
    text: "Did they remember something you had mentioned in a past conversation?",
    options: ["Yes, without prompting", "Yes, when reminded", "No", "Not applicable"],
    weights: [3, 2, 0, 2],
  },
  {
    id: "next",
    text: "Were any concrete plans made to connect again?",
    options: ["Yes, with a specific date or plan", "Vaguely mentioned", "No"],
    weights: [3, 2, 1],
  },
];

export const MAX_SCORE = QUESTIONS.reduce((s, q) => s + Math.max(...q.weights), 0);
