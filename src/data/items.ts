import { EntertainmentItem } from '../types';

export const ENTERTAINMENT_ITEMS: EntertainmentItem[] = [
  // --- LOL FACTORY ---
  {
    id: 'lol-jokes',
    title: 'Random Joke Generator',
    description: 'Fresh clean jokes to brighten your screen, complete with instant shuffle and copy to clipboard.',
    category: 'lol',
    tags: ['humor', 'jokes', 'funny', 'laugh', 'quick'],
    timeEstimate: 'Instant',
    timeCategory: '<1',
    icon: '😂',
    componentId: 'jokes',
    featured: true
  },
  {
    id: 'lol-riddle',
    title: 'Riddle of the Mystery',
    description: 'Puzzling riddles with expandable hints and answers. Can your wits crack them?',
    category: 'lol',
    tags: ['riddle', 'mystery', 'brain', 'puzzles', 'humor'],
    timeEstimate: '1 min',
    timeCategory: '<1',
    icon: '❓',
    componentId: 'riddles'
  },
  {
    id: 'lol-wyr',
    title: 'Would You Rather?',
    description: 'Pick between two impossible choices and see real simulated community vote percentages.',
    category: 'lol',
    tags: ['dilemma', 'questions', 'interactive', 'poll', 'social'],
    timeEstimate: '2 min',
    timeCategory: '1-3',
    icon: '⚖️',
    componentId: 'would-you-rather',
    featured: true
  },
  {
    id: 'lol-captions',
    title: 'Silly Caption Sparks',
    description: 'Hilarious relatable captions ready to copy for your camera roll or silly thoughts.',
    category: 'lol',
    tags: ['captions', 'memes', 'relatable', 'copy', 'social'],
    timeEstimate: '1 min',
    timeCategory: '<1',
    icon: '💬',
    componentId: 'captions'
  },

  // --- PLAY ZONE ---
  {
    id: 'play-clicker',
    title: 'Cosmic Star Clicker',
    description: 'Satisfying idle clicker: tap to harvest cosmic stardust, unlock multiplier upgrades and hit milestones.',
    category: 'play',
    tags: ['game', 'clicker', 'stars', 'arcade', 'upgrades'],
    timeEstimate: '2 min',
    timeCategory: '1-3',
    icon: '⭐',
    componentId: 'clicker',
    featured: true
  },
  {
    id: 'play-reaction',
    title: 'Reflex Reaction Timer',
    description: 'Test your human reaction speed in milliseconds when the red cosmic screen flashes emerald green.',
    category: 'play',
    tags: ['game', 'reaction', 'reflex', 'speed', 'test'],
    timeEstimate: '1 min',
    timeCategory: '<1',
    icon: '⚡',
    componentId: 'reaction',
    featured: true
  },
  {
    id: 'play-memory',
    title: 'Cosmic Memory Match',
    description: 'Flip celestial cards to pair identical cosmic icons with move tracking and best score records.',
    category: 'play',
    tags: ['game', 'memory', 'cards', 'pairs', 'brain'],
    timeEstimate: '2-3 min',
    timeCategory: '1-3',
    icon: '🃏',
    componentId: 'memory',
    featured: true
  },
  {
    id: 'play-rps',
    title: 'Rock Paper Scissors Arena',
    description: 'Battle the cosmic Bot in a fast best-of streak with custom win streaks and animated picks.',
    category: 'play',
    tags: ['game', 'arcade', 'classic', 'rps', 'quick'],
    timeEstimate: '1 min',
    timeCategory: '<1',
    icon: '✊',
    componentId: 'rps'
  },
  {
    id: 'play-tictactoe',
    title: 'Tic-Tac-Toe Arena',
    description: 'Play local 2-player or duel our playful smart Bot on a glowing neon grid.',
    category: 'play',
    tags: ['game', 'classic', 'strategy', 'tictactoe', 'grid'],
    timeEstimate: '2 min',
    timeCategory: '1-3',
    icon: '❌',
    componentId: 'tictactoe'
  },
  {
    id: 'play-number',
    title: 'Number Guesser (1-100)',
    description: 'Binary deduction game: guess the secret number using hot/cold higher/lower clues.',
    category: 'play',
    tags: ['game', 'numbers', 'math', 'deduction', 'quick'],
    timeEstimate: '2 min',
    timeCategory: '1-3',
    icon: '🔢',
    componentId: 'number-guess'
  },
  {
    id: 'play-picker',
    title: 'Decision Roulette Picker',
    description: 'Cannot decide what to eat or do? Input your custom options and spin the glowing selector wheel.',
    category: 'play',
    tags: ['utility', 'decisions', 'wheel', 'picker', 'random'],
    timeEstimate: '1 min',
    timeCategory: '<1',
    icon: '🎯',
    componentId: 'picker'
  },
  {
    id: 'play-typing',
    title: '60-Sec Typing Sprint',
    description: 'Type engaging short texts to measure real-time words per minute (WPM) and accuracy score.',
    category: 'play',
    tags: ['game', 'typing', 'wpm', 'speed', 'keyboard'],
    timeEstimate: '1 min',
    timeCategory: '<1',
    icon: '⌨️',
    componentId: 'typing'
  },

  // --- ODDLY SATISFYING ---
  {
    id: 'satisfying-bubbles',
    title: 'Bubble Popper Delight',
    description: 'Infinitely popping virtual bubble wrap with crisp audio pops, haptic feel, and satisfying reset.',
    category: 'satisfying',
    tags: ['sensory', 'bubbles', 'relax', 'satisfying', 'sound'],
    timeEstimate: '1 min',
    timeCategory: '<1',
    icon: '🫧',
    componentId: 'bubbles',
    featured: true
  },
  {
    id: 'satisfying-particles',
    title: 'Luminous Particle Fountain',
    description: 'Interactive physics canvas: move pointer to spawn hundreds of glowing pastel gravity particles.',
    category: 'satisfying',
    tags: ['canvas', 'particles', 'physics', 'visual', 'interactive'],
    timeEstimate: '2-3 min',
    timeCategory: '1-3',
    icon: '✨',
    componentId: 'particles',
    featured: true
  },
  {
    id: 'satisfying-draw',
    title: 'Glow Drawing Canvas',
    description: 'Draw freehand glowing neon brush strokes, rainbow mode, adjust thickness, and export PNG.',
    category: 'satisfying',
    tags: ['drawing', 'art', 'canvas', 'creative', 'glow'],
    timeEstimate: '3-5 min',
    timeCategory: '3-5',
    icon: '🎨',
    componentId: 'draw'
  },
  {
    id: 'satisfying-colormix',
    title: 'RGB & HSL Color Mixer',
    description: 'Fluid color blending sliders with live contrast ratio checkers and hex code copying.',
    category: 'satisfying',
    tags: ['color', 'mixer', 'design', 'rgb', 'tool'],
    timeEstimate: '1 min',
    timeCategory: '<1',
    icon: '🧪',
    componentId: 'color-mix'
  },
  {
    id: 'satisfying-gradients',
    title: 'Cosmic Gradient Lab',
    description: 'Generate silky mesh and multi-stop css linear gradients with one-click CSS code copy.',
    category: 'satisfying',
    tags: ['gradients', 'css', 'design', 'generator', 'colors'],
    timeEstimate: '2 min',
    timeCategory: '1-3',
    icon: '🌈',
    componentId: 'gradients'
  },
  {
    id: 'satisfying-patterns',
    title: 'Generative Pattern Toy',
    description: 'Tweak frequency and geometry controls to construct mesmerizing SVG tessellations.',
    category: 'satisfying',
    tags: ['patterns', 'geometric', 'generative', 'svg', 'math'],
    timeEstimate: '2 min',
    timeCategory: '1-3',
    icon: '💠',
    componentId: 'patterns'
  },
  {
    id: 'satisfying-harmonic',
    title: 'Harmonic Pendulum Visualizer',
    description: 'Watch harmonic wave patterns oscillate in hypnotic geometric synchronization.',
    category: 'satisfying',
    tags: ['waves', 'hypnotic', 'visual', 'physics', 'calm'],
    timeEstimate: '2 min',
    timeCategory: '1-3',
    icon: '🌊',
    componentId: 'harmonic'
  },
  {
    id: 'satisfying-palette',
    title: 'Pastel Palette Generator',
    description: 'Generate locked color palettes with aesthetic harmonies and instant copy hex buttons.',
    category: 'satisfying',
    tags: ['palette', 'aesthetic', 'color', 'design', 'hex'],
    timeEstimate: '1 min',
    timeCategory: '<1',
    icon: '🎨',
    componentId: 'palette'
  },

  // --- BRAIN SNACKS ---
  {
    id: 'brain-daily',
    title: 'Daily Challenge (Riddle & Logic)',
    description: 'One unique, non-repeating riddle or logic puzzle unlocked each day based on a date seed. Track your daily completion streak in localStorage!',
    category: 'brain',
    tags: ['daily', 'challenge', 'riddle', 'logic', 'puzzle', 'streak', 'free'],
    timeEstimate: '2 min',
    timeCategory: '1-3',
    icon: '📅',
    componentId: 'daily-challenge',
    featured: true
  },
  {
    id: 'brain-trivia',
    title: 'General Knowledge Trivia',
    description: 'Curated verified trivia across space, history, science, nature, and tech with explanations.',
    category: 'brain',
    tags: ['quiz', 'trivia', 'knowledge', 'facts', 'questions'],
    timeEstimate: '3 min',
    timeCategory: '1-3',
    icon: '🎓',
    componentId: 'trivia',
    featured: true
  },
  {
    id: 'brain-scramble',
    title: 'Word Unscramble Sprint',
    description: 'Crack scrambled letters into words with letter hints, timer, and score counter.',
    category: 'brain',
    tags: ['words', 'vocabulary', 'puzzle', 'letters', 'anagram'],
    timeEstimate: '2 min',
    timeCategory: '1-3',
    icon: '🔤',
    componentId: 'scramble'
  },
  {
    id: 'brain-emoji',
    title: 'Emoji Movie & Title Guesser',
    description: 'Decode movies and pop culture titles written purely in emoji iconography.',
    category: 'brain',
    tags: ['emoji', 'movies', 'culture', 'cipher', 'guess'],
    timeEstimate: '2 min',
    timeCategory: '1-3',
    icon: '🍿',
    componentId: 'emoji-cipher'
  },
  {
    id: 'brain-truefalse',
    title: 'Fact or Fiction Challenge',
    description: 'Quick-fire true or false statements to test your intuition against surprising scientific realities.',
    category: 'brain',
    tags: ['quiz', 'truefalse', 'facts', 'rapid', 'smart'],
    timeEstimate: '2 min',
    timeCategory: '1-3',
    icon: '✔️',
    componentId: 'true-false'
  },
  {
    id: 'brain-logic',
    title: 'Classic Logic Teasers',
    description: 'Carefully composed deduction puzzles that challenge lateral thinking with verified solutions.',
    category: 'brain',
    tags: ['logic', 'teasers', 'riddles', 'thinking', 'mind'],
    timeEstimate: '4 min',
    timeCategory: '3-5',
    icon: '💡',
    componentId: 'logic'
  },

  // --- MIDNIGHT CORNER ---
  {
    id: 'midnight-sounds',
    title: 'Synthesized Ambience Mixer',
    description: 'Real-time synthesized rain and ocean surf sound with independent volume controls and master stop.',
    category: 'midnight',
    tags: ['audio', 'rain', 'ocean', 'sleep', 'relax', 'calm'],
    timeEstimate: '5 min',
    timeCategory: '3-5',
    icon: '🌧️',
    componentId: 'ambient',
    featured: true
  },
  {
    id: 'midnight-breath',
    title: '4-4-4-4 Box Breathing Guide',
    description: 'Calming visual breathing ring with gentle pace (Inhale 4s, Hold 4s, Exhale 4s, Rest 4s).',
    category: 'midnight',
    tags: ['breathing', 'meditation', 'stress-relief', 'calm', 'night'],
    timeEstimate: '2 min',
    timeCategory: '1-3',
    icon: '🫁',
    componentId: 'breathing'
  },
  {
    id: 'midnight-sky',
    title: 'Night Sky Starfield',
    description: 'Soothing interactive starry expanse with twinkling constellations and quiet wander mode.',
    category: 'midnight',
    tags: ['stars', 'sky', 'night', 'chill', 'visual'],
    timeEstimate: '3 min',
    timeCategory: '1-3',
    icon: '✨',
    componentId: 'starfield'
  },
  {
    id: 'midnight-rituals',
    title: 'Calm Nighttime Prompts',
    description: 'Gentle screen-time wind-down suggestions and comforting micro-rituals for peaceful evenings.',
    category: 'midnight',
    tags: ['sleep', 'wellness', 'calm', 'night', 'rituals'],
    timeEstimate: '2 min',
    timeCategory: '1-3',
    icon: '🍵',
    componentId: 'rituals'
  },

  // --- WEIRD & WONDERFUL ---
  {
    id: 'weird-facts',
    title: 'Strange-But-True Fact Vault',
    description: 'Verified scientific and historical oddities with citations from NASA, USGS, and university labs.',
    category: 'weird',
    tags: ['facts', 'science', 'nature', 'weird', 'verified'],
    timeEstimate: '2 min',
    timeCategory: '1-3',
    icon: '🛸',
    componentId: 'facts',
    featured: true
  },
  {
    id: 'weird-illusions',
    title: 'Interactive Optical Illusions',
    description: 'SVG & CSS illusions (Hermann grid, Cafe wall, Rotating rings) explaining how brain perception works.',
    category: 'weird',
    tags: ['illusions', 'vision', 'optical', 'science', 'perception'],
    timeEstimate: '3 min',
    timeCategory: '1-3',
    icon: '🌀',
    componentId: 'illusions',
    featured: true
  },

  // --- EMOJI & CREATIVE LAB ---
  {
    id: 'creative-emojimix',
    title: 'Emoji Mashup Studio',
    description: 'Combine pairs of emojis to generate whimsical mashed concepts with copyable tags.',
    category: 'creative',
    tags: ['emoji', 'mashup', 'fun', 'creative', 'generator'],
    timeEstimate: '1 min',
    timeCategory: '<1',
    icon: '🧬',
    componentId: 'emoji-mix',
    featured: true
  },
  {
    id: 'creative-username',
    title: 'Cosmic Username Generator',
    description: 'Craft catchy handles with style filters: Cyberpunk, Cozy Cottage, Fantasy, or Minimalist.',
    category: 'creative',
    tags: ['username', 'gamertag', 'generator', 'names', 'copy'],
    timeEstimate: '1 min',
    timeCategory: '<1',
    icon: '🏷️',
    componentId: 'username'
  },
  {
    id: 'creative-ascii',
    title: 'ASCII Art Studio & Stamps',
    description: 'Copy retro text art, customize frames, and convert text into banner stamps.',
    category: 'creative',
    tags: ['ascii', 'text-art', 'retro', 'copypasta', 'creative'],
    timeEstimate: '2 min',
    timeCategory: '1-3',
    icon: '👾',
    componentId: 'ascii'
  },

  // --- CREATOR CORNER ---
  {
    id: 'creator-videospinner',
    title: 'Video Idea Roulette',
    description: 'Spin slot reels combining topic niches, angles, and formats to ignite video ideas.',
    category: 'creator',
    tags: ['creator', 'video', 'youtube', 'ideas', 'spinner'],
    timeEstimate: '1 min',
    timeCategory: '<1',
    icon: '🎰',
    componentId: 'creator-video'
  },
  {
    id: 'creator-hooks',
    title: 'Short-Form Hook Spark',
    description: 'Proven pattern hooks for Reels, TikTok, and Shorts to grab attention in the first 3 seconds.',
    category: 'creator',
    tags: ['hooks', 'shorts', 'reels', 'creator', 'writing'],
    timeEstimate: '1 min',
    timeCategory: '<1',
    icon: '🪝',
    componentId: 'creator-hooks'
  },

  // --- DISCOVER COOL WEBSITES ---
  {
    id: 'websites-directory',
    title: 'Curated Internet Gems',
    description: 'A verified directory of wholesome, artistic, and wondrous websites across the open web.',
    category: 'websites',
    tags: ['directory', 'websites', 'internet', 'links', 'gems'],
    timeEstimate: '4 min',
    timeCategory: '3-5',
    icon: '🌐',
    componentId: 'websites-list'
  }
];
