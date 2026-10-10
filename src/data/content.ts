import { Joke, Riddle, WouldYouRatherItem, TriviaItem, FactItem, WebsiteGem, OpticalIllusion } from '../types';

export const JOKES: Joke[] = [
  { id: 'j1', setup: 'Why do programmers prefer dark mode?', punchline: 'Because light attracts bugs!' },
  { id: 'j2', setup: 'Why did the coffee file a police report?', punchline: 'It got mugged.' },
  { id: 'j3', setup: 'What do you call a fake noodle?', punchline: 'An impasta!' },
  { id: 'j4', setup: 'How does a penguin build its house?', punchline: 'Igloos it together!' },
  { id: 'j5', setup: 'Why did the scarecrow win an award?', punchline: 'Because he was outstanding in his field!' },
  { id: 'j6', setup: 'What do you call cheese that isn\'t yours?', punchline: 'Nacho cheese.' },
  { id: 'j7', setup: 'Why can\'t you give Elsa a balloon?', punchline: 'Because she will let it go!' },
  { id: 'j8', setup: 'What did one plate say to the other plate?', punchline: 'Dinner is on me tonight.' },
  { id: 'j9', setup: 'Why don\'t scientists trust atoms?', punchline: 'Because they make up everything!' },
  { id: 'j10', setup: 'What do you call a sleeping dinosaur?', punchline: 'A dino-snore!' },
  { id: 'j11', setup: 'Why did the bicycle fall over?', punchline: 'Because it was two-tired.' },
  { id: 'j12', setup: 'How do trees access the internet?', punchline: 'They log in!' },
  { id: 'j13', setup: 'Why was the math book always sad?', punchline: 'Because it had too many problems.' },
  { id: 'j14', setup: 'What kind of music do balloons hate?', punchline: 'Pop music!' },
  { id: 'j15', setup: 'What do you call an alligator in a vest?', punchline: 'An investigator!' },
  { id: 'j16', setup: 'Why did the tomato blush?', punchline: 'Because it saw the salad dressing.' },
  { id: 'j17', setup: 'What do you call a bear with no teeth?', punchline: 'A gummy bear!' },
  { id: 'j18', setup: 'Why did the golfer bring two pairs of pants?', punchline: 'In case he got a hole in one!' },
  { id: 'j19', setup: 'What do you call a factory that makes okay products?', punchline: 'A satisfactory.' },
  { id: 'j20', setup: 'Why did the banana go to the doctor?', punchline: 'Because it wasn\'t peeling well!' },
  { id: 'j21', setup: 'How do you organize a space party?', punchline: 'You planet!' },
  { id: 'j22', setup: 'What do clouds wear under their clothes?', punchline: 'Thunderwear!' },
  { id: 'j23', setup: 'Why did the cookie go to the hospital?', punchline: 'Because it felt crummy.' },
  { id: 'j24', setup: 'What did the ocean say to the shore?', punchline: 'Nothing, it just waved!' },
  { id: 'j25', setup: 'Why did the invisible man turn down the job offer?', punchline: 'He couldn\'t see himself doing it.' },
  { id: 'j26', setup: 'What do you call a pile of cats?', punchline: 'A meowntain!' },
  { id: 'j27', setup: 'Why do hummingbirds hum?', punchline: 'Because they forgot the lyrics!' },
  { id: 'j28', setup: 'What do you call an apology written in dots and dashes?', punchline: 'Re-Morse code!' },
  { id: 'j29', setup: 'Why don\'t oysters donate to charity?', punchline: 'Because they are shellfish.' },
  { id: 'j30', setup: 'What did the big flower say to the little flower?', punchline: 'Hi there, budding!' },
  { id: 'j31', setup: 'Why was Cinderella terrible at soccer?', punchline: 'Because she kept running away from the ball!' },
  { id: 'j32', setup: 'How do astronauts arrange their schedules?', punchline: 'They check their launch calendars.' },
  { id: 'j33', setup: 'What do you call a bee that can\'t make up its mind?', punchline: 'A maybee!' },
  { id: 'j34', setup: 'Why did the stadium get so hot after the game?', punchline: 'All the fans had left!' },
  { id: 'j35', setup: 'What is an astronaut\'s favorite part on a computer?', punchline: 'The space bar!' },
  { id: 'j36', setup: 'Why did the orange stop halfway across the hill?', punchline: 'It ran out of juice.' },
  { id: 'j37', setup: 'What did the limestone say to the geologist?', punchline: 'Don\'t take me for granite!' },
  { id: 'j38', setup: 'How do you make a tissue dance?', punchline: 'You put a little boogie in it.' },
  { id: 'j39', setup: 'Why was the belt sent to jail?', punchline: 'For holding up a pair of pants!' },
  { id: 'j40', setup: 'What kind of key opens a banana?', punchline: 'A mon-key!' },
  { id: 'j41', setup: 'Why did the picture go to jail?', punchline: 'Because it was framed!' },
  { id: 'j42', setup: 'What do you call a magician dog?', punchline: 'A Labracadabrador!' },
  { id: 'j43', setup: 'How do celebrities stay cool?', punchline: 'They surround themselves with fans.' },
  { id: 'j44', setup: 'What did zero say to eight?', punchline: 'Nice belt!' },
  { id: 'j45', setup: 'Why did the skeleton go to the dance alone?', punchline: 'He had no body to go with!' },
  { id: 'j46', setup: 'What kind of tea is hard to swallow?', punchline: 'Reali-tea.' },
  { id: 'j47', setup: 'Why can\'t leopards play hide and seek?', punchline: 'Because they are always spotted!' },
  { id: 'j48', setup: 'What do you call a sleeping wolf?', punchline: 'An un-aware wolf!' },
  { id: 'j49', setup: 'Why did the clock get sent to detention?', punchline: 'It tocked too much!' },
  { id: 'j50', setup: 'What do you call a boomerang that doesn\'t come back?', punchline: 'A stick!' }
];

export const RIDDLES: Riddle[] = [
  { id: 'r1', riddle: 'What has keys but can\'t open locks, space but no room, and allows you to enter but not exit?', answer: 'A keyboard', hint: 'You might be typing on one right now.' },
  { id: 'r2', riddle: 'What comes once in a minute, twice in a moment, but never in a thousand years?', answer: 'The letter M', hint: 'Look closely at the spelling of the words.' },
  { id: 'r3', riddle: 'I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?', answer: 'An echo', hint: 'Call into a canyon and hear it answer.' },
  { id: 'r4', riddle: 'The more of this there is, the less you see. What is it?', answer: 'Darkness', hint: 'It surrounds the night sky.' },
  { id: 'r5', riddle: 'What has hands and a face, but cannot hold anything or smile?', answer: 'A clock', hint: 'Tick tock...' },
  { id: 'r6', riddle: 'What has a head and a tail, is brown, and has no legs?', answer: 'A penny (copper coin)', hint: 'Check your pocket change.' },
  { id: 'r7', riddle: 'What gets wetter and wetter the more it dries?', answer: 'A towel', hint: 'You use it right after stepping out of the shower.' },
  { id: 'r8', riddle: 'What belongs to you, but everyone else uses it much more than you do?', answer: 'Your name', hint: 'People call you by it.' },
  { id: 'r9', riddle: 'I have branches, but no fruit, trunk or leaves. What am I?', answer: 'A bank', hint: 'Think financial, not botanical.' },
  { id: 'r10', riddle: 'What can travel all around the world while staying in a single corner?', answer: 'A postage stamp', hint: 'Stick it on an envelope.' },
  { id: 'r11', riddle: 'What has an eye, but cannot see anything at all?', answer: 'A needle (or storm hurricane)', hint: 'Thread passes right through it.' },
  { id: 'r12', riddle: 'If you have me, you want to share me. If you share me, you haven\'t kept me. What am I?', answer: 'A secret', hint: 'Shhh...' },
  { id: 'r13', riddle: 'What can you break without ever touching it or picking it up?', answer: 'A promise (or silence)', hint: 'It only requires your words.' },
  { id: 'r14', riddle: 'What begins with T, ends with T, and has T inside it?', answer: 'A teapot', hint: 'It brews a warm comforting drink.' },
  { id: 'r15', riddle: 'What is always in front of you, but can never be seen directly?', answer: 'The future', hint: 'It arrives one second at a time.' },
  { id: 'r16', riddle: 'What can fill an entire room without taking up any physical space?', answer: 'Light (or sound)', hint: 'Flip a switch on the wall.' },
  { id: 'r17', riddle: 'What has a neck but no head, two arms but no hands?', answer: 'A shirt (or sweater)', hint: 'You wear it on your torso.' },
  { id: 'r18', riddle: 'What runs all around a backyard without ever moving an inch?', answer: 'A fence', hint: 'It borders the perimeter.' },
  { id: 'r19', riddle: 'What has many teeth, but cannot chew a single bite?', answer: 'A comb (or a saw)', hint: 'Run it through your hair.' },
  { id: 'r20', riddle: 'I am not alive, but I grow; I don\'t have lungs, but I need air; I don\'t have a mouth, but water kills me. What am I?', answer: 'Fire', hint: 'Warm and flickering.' },
  { id: 'r21', riddle: 'What goes up but never ever comes back down?', answer: 'Your age', hint: 'It increases on your birthday.' },
  { id: 'r22', riddle: 'What can you catch, but never throw?', answer: 'A cold', hint: 'Achoo!' },
  { id: 'r23', riddle: 'The person who makes it doesn\'t want it; the person who buys it doesn\'t use it; the person who uses it doesn\'t know it. What is it?', answer: 'A coffin', hint: 'Buried in peace.' },
  { id: 'r24', riddle: 'What has words, but never speaks?', answer: 'A book', hint: 'Turn the pages.' },
  { id: 'r25', riddle: 'What kind of band never plays music?', answer: 'A rubber band', hint: 'Stretchy and elastic.' },
  { id: 'r26', riddle: 'What has one horn and gives milk?', answer: 'A milk truck', hint: 'Honk honk!' },
  { id: 'r27', riddle: 'What has lakes with no water, mountains with no stone, and cities with no buildings?', answer: 'A map', hint: 'Unfold it for navigation.' },
  { id: 'r28', riddle: 'What falls often, but never gets hurt?', answer: 'Rain (or snow)', hint: 'Look out the window on a stormy day.' },
  { id: 'r29', riddle: 'What has four legs, but cannot walk?', answer: 'A table (or chair)', hint: 'Set your cup on it.' },
  { id: 'r30', riddle: 'You see a boat filled with people. It has not sunk, but when you look again you don\'t see a single person on the boat. Why?', answer: 'All the people were married', hint: 'Think about the word "single".' }
];

export const WOULD_YOU_RATHER: WouldYouRatherItem[] = [
  { id: 'wyr1', optionA: 'Be able to teleport anywhere instantly', optionB: 'Be able to pause time for 10 minutes once a day', votesA: 1420, votesB: 1210 },
  { id: 'wyr2', optionA: 'Always have every meal be free and gourmet', optionB: 'Never need more than 2 hours of sleep to feel 100% refreshed', votesA: 980, votesB: 2310 },
  { id: 'wyr3', optionA: 'Have a pet dragon the size of a cat', optionB: 'Have a pet cat the size of a dragon', votesA: 2840, votesB: 410 },
  { id: 'wyr4', optionA: 'Understand all animal languages', optionB: 'Speak every human language fluently', votesA: 1530, votesB: 1940 },
  { id: 'wyr5', optionA: 'Live in a cozy treehouse high in a cloud forest', optionB: 'Live in a luxury submarine overlooking coral reefs', votesA: 1650, votesB: 1420 },
  { id: 'wyr6', optionA: 'Only be able to whisper for the rest of your life', optionB: 'Only be able to shout for the rest of your life', votesA: 2610, votesB: 320 },
  { id: 'wyr7', optionA: 'Have a 10-second rewind button for life mistakes', optionB: 'Have a 24-hour fast-forward button for boring days', votesA: 3100, votesB: 450 },
  { id: 'wyr8', optionA: 'Always find $20 in your pocket when you reach in', optionB: 'Never have your phone battery drop below 50%', votesA: 2780, votesB: 890 },
  { id: 'wyr9', optionA: 'Have hair that changes color based on your mood', optionB: 'Have shoes that make cartoon sound effects whenever you walk', votesA: 2100, votesB: 780 },
  { id: 'wyr10', optionA: 'Live without internet for 1 year with unlimited books & travel', optionB: 'Live in your current house with internet but never travel for 1 year', votesA: 1350, votesB: 1720 },
  { id: 'wyr11', optionA: 'Know the absolute truth about extraterrestrial life', optionB: 'Know the secret to infinite clean energy', votesA: 820, votesB: 2450 },
  { id: 'wyr12', optionA: 'Be an Olympic athlete in any sport you pick', optionB: 'Be a world-famous master musician with any instrument', votesA: 1120, votesB: 1890 },
  { id: 'wyr13', optionA: 'Eat pizza whenever you want with zero calories', optionB: 'Eat dessert whenever you want with zero calories', votesA: 1940, votesB: 1610 },
  { id: 'wyr14', optionA: 'Have an endless cup of perfect hot coffee or tea', optionB: 'Have a phone screen that is completely impossible to crack or scratch', votesA: 1220, votesB: 2010 },
  { id: 'wyr15', optionA: 'Win every board game you ever play against anyone', optionB: 'Never lose a coin flip or rock-paper-scissors match', votesA: 1490, votesB: 1530 },
  { id: 'wyr16', optionA: 'Have cartoon physics apply to you when falling (no harm)', optionB: 'Be able to breathe underwater like a friendly sea creature', votesA: 1100, votesB: 2300 },
  { id: 'wyr17', optionA: 'Have an AI assistant robot that cleans your house forever', optionB: 'Have a magical self-cooking refrigerator that prepares any meal', votesA: 1840, votesB: 2120 },
  { id: 'wyr18', optionA: 'Be able to fly at 20 mph anywhere', optionB: 'Be able to breathe in space and explore galaxies', votesA: 1910, votesB: 1420 },
  { id: 'wyr19', optionA: 'Only be able to listen to 90s music for the rest of your life', optionB: 'Only be able to watch black and white movies', votesA: 2430, votesB: 410 },
  { id: 'wyr20', optionA: 'Have the ability to talk to plant life', optionB: 'Have the ability to speak to electronics and machines', votesA: 950, votesB: 2680 },
  { id: 'wyr21', optionA: 'Live on a floating cloud castle above the Alps', optionB: 'Live on an ancient floating pirate galleon in tropical lagoons', votesA: 1720, votesB: 1490 },
  { id: 'wyr22', optionA: 'Never feel physical fatigue again', optionB: 'Never experience mental brain fog or burnout again', votesA: 1040, votesB: 2950 },
  { id: 'wyr23', optionA: 'Be able to change the color of the sky whenever you choose', optionB: 'Be able to summon gentle warm rain on demand', votesA: 1210, votesB: 1980 },
  { id: 'wyr24', optionA: 'Never have to do dishes or laundry ever again', optionB: 'Never have to sit in bumper-to-bumper traffic again', votesA: 2150, votesB: 1820 }
];

export const TRIVIA_QUESTIONS: TriviaItem[] = [
  {
    id: 't1',
    question: 'Which planet in our solar system spins clockwise (retrograde rotation)?',
    options: ['Mars', 'Venus', 'Saturn', 'Jupiter'],
    correctIndex: 1,
    explanation: 'Venus rotates in retrograde (clockwise) direction on its axis, meaning the Sun rises in the west and sets in the east.',
    topic: 'Space'
  },
  {
    id: 't2',
    question: 'What is the only mammal that is physically capable of true powered flight?',
    options: ['Flying Squirrel', 'Sugar Glider', 'Bat', 'Colugo'],
    correctIndex: 2,
    explanation: 'Bats are the only mammals capable of sustained, powered flight. Animals like flying squirrels only glide.',
    topic: 'Nature'
  },
  {
    id: 't3',
    question: 'How many hearts does an octopus have?',
    options: ['1', '2', '3', '4'],
    correctIndex: 2,
    explanation: 'An octopus has three hearts: two pump blood to the gills, while the third pumps it through the rest of the body.',
    topic: 'Biology'
  },
  {
    id: 't4',
    question: 'In computer science, what does the abbreviation "GUI" stand for?',
    options: ['Global User Internet', 'Graphical User Interface', 'General Utility Index', 'Graphic Universal Input'],
    correctIndex: 1,
    explanation: 'GUI stands for Graphical User Interface, allowing users to interact with visual elements instead of text commands.',
    topic: 'Tech'
  },
  {
    id: 't5',
    question: 'Which chemical element has the symbol "Au" on the periodic table?',
    options: ['Silver', 'Argon', 'Gold', 'Aluminum'],
    correctIndex: 2,
    explanation: 'Gold comes from the Latin word "Aurum", meaning shining dawn, which gives it the symbol Au.',
    topic: 'Science'
  },
  {
    id: 't6',
    question: 'What is the deepest known location on Earth\'s seabed?',
    options: ['Puerto Rico Trench', 'Challenger Deep', 'Java Trench', 'Molloy Deep'],
    correctIndex: 1,
    explanation: 'Challenger Deep in the Mariana Trench reaches approximately 10,928 meters (35,853 feet) deep.',
    topic: 'Geography'
  },
  {
    id: 't7',
    question: 'Which instrument has 88 keys in standard modern layout?',
    options: ['Harpsichord', 'Organ', 'Accordion', 'Piano'],
    correctIndex: 3,
    explanation: 'A standard modern piano has 88 keys: 52 white keys (natural notes) and 36 black keys (accidentals).',
    topic: 'Music'
  },
  {
    id: 't8',
    question: 'Which of the following colors does human vision perceive most shades of?',
    options: ['Red', 'Blue', 'Green', 'Yellow'],
    correctIndex: 2,
    explanation: 'Human eyes possess cone receptors that are most sensitive to wavelengths around 555 nm, distinguishing the most shades of green.',
    topic: 'Science'
  },
  {
    id: 't9',
    question: 'Which country is known as the "Land of the Midnight Sun" during summer?',
    options: ['Norway', 'Iceland', 'Canada', 'Finland'],
    correctIndex: 0,
    explanation: 'Norway, specifically its northern regions above the Arctic Circle, is famously termed the Land of the Midnight Sun.',
    topic: 'Geography'
  },
  {
    id: 't10',
    question: 'What was the first web browser to introduce inline image rendering alongside text?',
    options: ['WorldWideWeb', 'NCSA Mosaic', 'Internet Explorer', 'Lynx'],
    correctIndex: 1,
    explanation: 'Released in 1993 by Marc Andreessen and Eric Bina, NCSA Mosaic was the first to display images inline with text on web pages.',
    topic: 'Tech'
  },
  {
    id: 't11',
    question: 'What is the fastest land animal over short sprints?',
    options: ['Pronghorn', 'Cheetah', 'Quarter Horse', 'Greyhound'],
    correctIndex: 1,
    explanation: 'The cheetah can reach speeds between 60 to 70 mph (97 to 113 km/h) during short bursts.',
    topic: 'Nature'
  },
  {
    id: 't12',
    question: 'Which shape has the maximum interior volume for a given surface area?',
    options: ['Cube', 'Cylinder', 'Sphere', 'Tetrahedron'],
    correctIndex: 2,
    explanation: 'The sphere is the geometric shape with the lowest ratio of surface area to volume in Euclidean 3D space.',
    topic: 'Math'
  },
  {
    id: 't13',
    question: 'What year did the Apollo 11 mission land humans on the Moon?',
    options: ['1967', '1969', '1971', '1973'],
    correctIndex: 1,
    explanation: 'Neil Armstrong and Buzz Aldrin set foot on the lunar surface on July 20, 1969.',
    topic: 'History'
  },
  {
    id: 't14',
    question: 'What is the main atmospheric gas on Mars?',
    options: ['Nitrogen', 'Oxygen', 'Carbon Dioxide', 'Argon'],
    correctIndex: 2,
    explanation: 'Mars\' atmosphere is roughly 95% carbon dioxide (CO2).',
    topic: 'Space'
  },
  {
    id: 't15',
    question: 'In the game of chess, which piece can leap over other pieces?',
    options: ['Rook', 'Bishop', 'Knight', 'Pawn'],
    correctIndex: 2,
    explanation: 'The knight is the only chess piece capable of jumping directly over other friendly or enemy pieces.',
    topic: 'Games'
  },
  {
    id: 't16',
    question: 'What is the speed of light in vacuum approximately in kilometers per second?',
    options: ['150,000 km/s', '300,000 km/s', '500,000 km/s', '1,000,000 km/s'],
    correctIndex: 1,
    explanation: 'The speed of light in vacuum (c) is precisely 299,792.458 km/s, commonly rounded to 300,000 km/s.',
    topic: 'Physics'
  },
  {
    id: 't17',
    question: 'Honey never truly spoils under normal dry conditions. Why?',
    options: ['High acidity only', 'Low moisture and high sugar content osmotic pressure', 'Secret bee enzymes that destroy all matter', 'Freezing points'],
    correctIndex: 1,
    explanation: 'Honey has very low moisture content (~17%) and high acidity/sugar concentration, creating high osmotic pressure where microbes cannot thrive.',
    topic: 'Food'
  },
  {
    id: 't18',
    question: 'Which ancient wonder was located in the city of Alexandria, Egypt?',
    options: ['Colossus of Rhodes', 'Lighthouse of Alexandria', 'Hanging Gardens', 'Temple of Artemis'],
    correctIndex: 1,
    explanation: 'The Lighthouse of Alexandria (Pharos of Alexandria) was built on the island of Pharos in Hellenistic Egypt.',
    topic: 'History'
  },
  {
    id: 't19',
    question: 'How many bones are in an adult human skeletal system?',
    options: ['186', '206', '256', '312'],
    correctIndex: 1,
    explanation: 'An adult human skeleton typically contains 206 bones, while infants are born with around 270 bones that fuse over growth.',
    topic: 'Biology'
  },
  {
    id: 't20',
    question: 'Which programming language created by Brendan Eich in 1995 was originally codenamed "Mocha"?',
    options: ['Python', 'Java', 'JavaScript', 'Ruby'],
    correctIndex: 2,
    explanation: 'JavaScript was created in just 10 days in May 1995 by Brendan Eich under the internal code name Mocha, then LiveScript, then JavaScript.',
    topic: 'Tech'
  },
  {
    id: 't21',
    question: 'What is the largest living organism on Earth by mass?',
    options: ['Blue Whale', 'Pando (Trembling Aspen colony)', 'Great Barrier Reef', 'African Bush Elephant'],
    correctIndex: 1,
    explanation: 'Pando, an interconnected clonal colony of quaking aspen trees in Utah, weighs an estimated 6,000 tonnes sharing a single massive root system.',
    topic: 'Nature'
  },
  {
    id: 't22',
    question: 'Which galaxy is currently on a collision course with our Milky Way in about 4.5 billion years?',
    options: ['Triangulum Galaxy', 'Andromeda Galaxy', 'Whirlpool Galaxy', 'Sombrero Galaxy'],
    correctIndex: 1,
    explanation: 'The Andromeda Galaxy (M31) is approaching the Milky Way at roughly 110 kilometers per second, projected to merge into "Milkomeda".',
    topic: 'Space'
  },
  {
    id: 't23',
    question: 'What is the hardest naturally occurring mineral on the Mohs scale of hardness?',
    options: ['Corundum', 'Topaz', 'Diamond', 'Quartz'],
    correctIndex: 2,
    explanation: 'Diamond is ranked at the maximum 10 on the Mohs mineral scale, possessing the tightest covalent carbon crystal lattices.',
    topic: 'Science'
  },
  {
    id: 't24',
    question: 'What was the first music video broadcast on MTV on August 1, 1981?',
    options: ['Thriller by Michael Jackson', 'Video Killed the Radio Star by The Buggles', 'Take On Me by A-ha', 'Bohemian Rhapsody by Queen'],
    correctIndex: 1,
    explanation: 'The Buggles\' "Video Killed the Radio Star" was symbolically chosen as the debut broadcast on MTV launch day.',
    topic: 'Music'
  },
  {
    id: 't25',
    question: 'What is the only sea on Earth that has no land borders or coastlines?',
    options: ['Sargasso Sea', 'Red Sea', 'Caspian Sea', 'Dead Sea'],
    correctIndex: 0,
    explanation: 'The Sargasso Sea is completely defined by four circulating Atlantic Ocean gyre currents with no terrestrial boundaries.',
    topic: 'Geography'
  },
  {
    id: 't26',
    question: 'Which element makes up the majority of the Sun\'s mass?',
    options: ['Helium', 'Hydrogen', 'Oxygen', 'Carbon'],
    correctIndex: 1,
    explanation: 'Hydrogen accounts for approximately 73% of the Sun\'s mass, continuously fusing into helium in its core.',
    topic: 'Space'
  },
  {
    id: 't27',
    question: 'Who is widely credited as writing the world\'s first published computer algorithm?',
    options: ['Alan Turing', 'Ada Lovelace', 'Charles Babbage', 'Grace Hopper'],
    correctIndex: 1,
    explanation: 'Ada Lovelace drafted the first algorithm for Babbage\'s proposed mechanical Analytical Engine in 1843 to calculate Bernoulli numbers.',
    topic: 'History'
  },
  {
    id: 't28',
    question: 'What color is sunset on Mars when viewed from the Martian surface?',
    options: ['Bright Red', 'Blue', 'Deep Purple', 'Neon Green'],
    correctIndex: 1,
    explanation: 'Fine Martian dust scatters red light efficiently away, allowing blue light to penetrate directly toward an observer during sunsets.',
    topic: 'Space'
  }
];

export const STRANGE_FACTS: FactItem[] = [
  {
    id: 'f1',
    fact: 'Wombat droppings are shaped like cubes. This cube geometry prevents their scent marks from rolling away on tilted rocks.',
    source: 'Georgia Institute of Technology Fluid Dynamics Research (Soft Matter Journal 2018)',
    verified: true,
    topic: 'Zoology'
  },
  {
    id: 'f2',
    fact: 'Bananas are naturally slightly radioactive because they are rich in potassium, specifically containing the isotope Potassium-40.',
    source: 'Health Physics Society / US Nuclear Regulatory Commission',
    verified: true,
    topic: 'Physics'
  },
  {
    id: 'f3',
    fact: 'A single teaspoon of a neutron star would weigh approximately 6 billion tons on Earth.',
    source: 'NASA Goddard Space Flight Center',
    verified: true,
    topic: 'Astrophysics'
  },
  {
    id: 'f4',
    fact: 'Sea otters hold hands while resting or sleeping so they don\'t drift apart in ocean currents, a behavior called a "raft".',
    source: 'Monterey Bay Aquarium Research Archive',
    verified: true,
    topic: 'Marine Biology'
  },
  {
    id: 'f5',
    fact: 'Cleopatra lived closer in time to the Moon landing (1969) than to the construction of the Great Pyramid of Giza (c. 2560 BCE).',
    source: 'British Museum Chronology of Ancient Egypt',
    verified: true,
    topic: 'History'
  },
  {
    id: 'f6',
    fact: 'Oxford University is older than the Aztec Empire. Teaching existed at Oxford in 1096; the Aztec triple alliance formed in 1428.',
    source: 'University of Oxford Historical Archives',
    verified: true,
    topic: 'History'
  },
  {
    id: 'f7',
    fact: 'Clouds look like light puffs of cotton, but an average cumulus cloud weighs about 500,000 kilograms (over 1 million pounds).',
    source: 'US Geological Survey (USGS) Water Science School',
    verified: true,
    topic: 'Meteorology'
  },
  {
    id: 'f8',
    fact: 'Crows can recognize human faces, remember individual humans for years, and teach their offspring which humans are friendly or threatening.',
    source: 'University of Washington Animal Behavior Studies (Marzluff et al.)',
    verified: true,
    topic: 'Animal Intelligence'
  },
  {
    id: 'f9',
    fact: 'The mantis shrimp has 12 to 16 types of color photoreceptor cells in its eyes (humans have only 3), and can detect polarized light.',
    source: 'Nature Scientific Reports / University of Queensland Vision Institute',
    verified: true,
    topic: 'Biology'
  },
  {
    id: 'f10',
    fact: 'Venus is the hottest planet in our solar system (approx 465°C / 870°F), even though Mercury is much closer to the Sun, due to runaway greenhouse effect.',
    source: 'NASA Planetary Fact Sheet',
    verified: true,
    topic: 'Astronomy'
  },
  {
    id: 'f11',
    fact: 'Sharks existed before trees. The earliest shark scales date back roughly 450 million years, while the first land trees appeared ~385 million years ago.',
    source: 'Natural History Museum London Fossil Records',
    verified: true,
    topic: 'Evolution'
  },
  {
    id: 'f12',
    fact: 'Turtles can absorb oxygen through their cloaca (butt) during winter brumation under frozen lakes.',
    source: 'Canadian Journal of Zoology / Herpetological Conservation and Biology',
    verified: true,
    topic: 'Zoology'
  },
  {
    id: 'f13',
    fact: 'There is a species of jellyfish (Turritopsis dohrnii) capable of reverting its cells back to an adolescent polyp stage after maturity, making it biologically immortal.',
    source: 'American Museum of Natural History / Zoological Institute of Kyoto University',
    verified: true,
    topic: 'Biology'
  },
  {
    id: 'f14',
    fact: 'Sound travels roughly 4.3 times faster through ocean water than through air (approx 1,500 m/s versus 343 m/s).',
    source: 'National Oceanic and Atmospheric Administration (NOAA)',
    verified: true,
    topic: 'Physics'
  },
  {
    id: 'f15',
    fact: 'A day on Venus is longer than a year on Venus. It takes Venus 243 Earth days to rotate once on its axis, but only 225 Earth days to orbit the Sun.',
    source: 'NASA Jet Propulsion Laboratory Solar System Exploration',
    verified: true,
    topic: 'Astronomy'
  },
  {
    id: 'f16',
    fact: 'Octopuses do not just have three hearts; their blood is blue because it relies on copper-based hemocyanin to carry oxygen instead of iron-based hemoglobin.',
    source: 'Smithsonian Ocean Portal / Natural History Museum',
    verified: true,
    topic: 'Marine Biology'
  }
];

export const COOL_WEBSITES: WebsiteGem[] = [
  {
    id: 'w1',
    name: 'Astronomy Picture of the Day (APOD)',
    url: 'https://apod.nasa.gov/apod/',
    description: 'Each day a different cosmic image or photograph of our fascinating universe is featured, along with a brief explanation by professional astronomers.',
    category: 'Space & Wonder',
    emoji: '🌌',
    safetyNote: 'Official NASA educational public archive'
  },
  {
    id: 'w2',
    name: 'Radio Garden',
    url: 'https://radio.garden/',
    description: 'Spin a 3D globe and tune into thousands of live local radio stations broadcasting right now anywhere around the world.',
    category: 'Global Exploration',
    emoji: '🌍',
    safetyNote: 'Interactive cultural audio stream'
  },
  {
    id: 'w3',
    name: 'Internet Archive: Wayback Machine',
    url: 'https://web.archive.org/',
    description: 'Digital time machine preserving over 800 billion web pages since the 1990s, vintage software, arcade games, and forgotten websites.',
    category: 'Internet History',
    emoji: '🕰️',
    safetyNote: 'Non-profit digital library preservation'
  },
  {
    id: 'w4',
    name: 'WindowSwap',
    url: 'https://www.window-swap.com/',
    description: 'Open a random window somewhere in the world to gaze out at quiet streets, rain in Tokyo, mountains in Switzerland, or cats on balconies.',
    category: 'Relaxation & Travel',
    emoji: '🪟',
    safetyNote: 'Community-submitted peaceful view loops'
  },
  {
    id: 'w5',
    name: 'Neal.fun',
    url: 'https://neal.fun/',
    description: 'Brilliant collection of visual web toys and interactive essays by creative developer Neal Agarwal, including The Deep Sea and Wonders of Street View.',
    category: 'Interactive Web Art',
    emoji: '💡',
    safetyNote: 'Original indie interactive creations'
  },
  {
    id: 'w6',
    name: 'Quick, Draw! by Google',
    url: 'https://quickdraw.withgoogle.com/',
    description: 'Can a neural network recognize your doodles? You draw a prompt in under 20 seconds while the system guesses what you are sketching.',
    category: 'Doodle Game',
    emoji: '✏️',
    safetyNote: 'AI Experiments interactive doodle challenge'
  },
  {
    id: 'w7',
    name: 'Smithsonian Open Access',
    url: 'https://www.si.edu/openaccess',
    description: 'Freely explore and download over 4.5 million 2D and 3D digital museum artifacts, historical photographs, and scientific specimens.',
    category: 'Culture & Museum',
    emoji: '🏛️',
    safetyNote: 'Smithsonian Institution open public collection'
  },
  {
    id: 'w8',
    name: 'A Soft Murmur',
    url: 'https://asoftmurmur.com/',
    description: 'Customizable ambient sound mixer blending rain, thunder, rolling ocean waves, gusting wind, crackling fire, and birdsong.',
    category: 'Cozy Audio',
    emoji: '🌧️',
    safetyNote: 'Clean ambient sound generator'
  }
];

export const OPTICAL_ILLUSIONS: OpticalIllusion[] = [
  {
    id: 'ill1',
    title: 'The Hermann Grid Illusion',
    description: 'Ghostly gray smudges appear at the white grid intersections, but disappear when you look directly at them.',
    explanation: 'Caused by lateral inhibition in the retinal ganglion cells: receptors stimulated by bright regions inhibit their neighbors, creating false perception of dark dots at intersections.',
    type: 'hermann-grid'
  },
  {
    id: 'ill2',
    title: 'The Café Wall Illusion',
    description: 'The horizontal mortar lines between checkered tiles appear strikingly sloped or angled, yet every single line is strictly parallel.',
    explanation: 'Brain cortex filters process alternating light-dark edges with slight phase shifts, which our visual system misinterprets as an overall wedge slope.',
    type: 'cafe-wall'
  },
  {
    id: 'ill3',
    title: 'The Rotating Snake Motion Rings',
    description: 'Concentric static colored rings appear to twist or pulsate slightly when you gently shift your gaze around the image.',
    explanation: 'Microsaccades (tiny involuntary eye movements) cause asymmetrical neural activation timing across stepped luminance gradients.',
    type: 'motion-rings'
  }
];

export const SILLY_CAPTIONS: string[] = [
  'Me explaining to my cat why I can\'t buy a mansion yet.',
  'My last two brain cells trying to remember if I locked the front door.',
  'When the WiFi disconnects right during the final second of a video.',
  'Looking at my to-do list like it\'s written in ancient hieroglyphics.',
  'Entering a room and immediately forgetting why I walked in here.',
  'That moment when you find a $20 bill in a winter coat you haven\'t worn in a year.',
  'Trying to act normal when your favorite song comes on in a grocery store aisle.',
  'My plant watching me water it with lukewarm tea because I\'m too lazy to walk to the sink.',
  'Staring into the open fridge hoping new snacks magically spawned in the last 4 minutes.',
  'Pretending to text someone so I don\'t make awkward eye contact in an elevator.',
  'Me setting 14 alarms five minutes apart and still waking up late.',
  'Walking out of a store without buying anything and praying the alarm doesn\'t go off.'
];

export const EMOJI_CIPHERS = [
  { id: 'ec1', emojis: '🦁 👑 🌅', answer: 'The Lion King', hint: 'Beloved animated film' },
  { id: 'ec2', emojis: '🕷️ 🧑 🕸️ 🏙️', answer: 'Spider-Man', hint: 'Friendly neighborhood hero' },
  { id: 'ec3', emojis: '🧊 🚢 💔 🌊', answer: 'Titanic', hint: 'Epic romantic sea disaster' },
  { id: 'ec4', emojis: '⚡ 👓 🧙‍♂️ 🚂', answer: 'Harry Potter', hint: 'The boy who lived' },
  { id: 'ec5', emojis: '🦖 🌴 🚙 🧬', answer: 'Jurassic Park', hint: 'Life finds a way' },
  { id: 'ec6', emojis: '👻 🚫 📞 🏢', answer: 'Ghostbusters', hint: 'Who you gonna call?' },
  { id: 'ec7', emojis: '🚀 🌌 👨‍🚀 ⏳ 🪐', answer: 'Interstellar', hint: 'Directed by Christopher Nolan' },
  { id: 'ec8', emojis: '🎈 🏠 👴 👦 🐕', answer: 'Up', hint: 'Pixar floating adventure' },
  { id: 'ec9', emojis: '🦇 🤵 🌃 🃏', answer: 'Batman', hint: 'Dark Knight of Gotham' },
  { id: 'ec10', emojis: '🧙‍♂️ 💍 🌋 🧝‍♂️', answer: 'The Lord of the Rings', hint: 'One ring to rule them all' }
];

export const WORD_SCRAMBLES = [
  { id: 'ws1', scrambled: 'E L P P A', word: 'APPLE', hint: 'A popular crunchy fruit' },
  { id: 'ws2', scrambled: 'T E N L P A', word: 'PLANET', hint: 'Orbits around a star' },
  { id: 'ws3', scrambled: 'M S I C O C', word: 'COSMIC', hint: 'Relating to outer universe' },
  { id: 'ws4', scrambled: 'Z Z E U L P', word: 'PUZZLE', hint: 'A brain challenge' },
  { id: 'ws5', scrambled: 'G N O D A R', word: 'DRAGON', hint: 'Mythical winged beast' },
  { id: 'ws6', scrambled: 'W B I N O A R', word: 'RAINBOW', hint: 'Visible after rainfall in sunlight' },
  { id: 'ws7', scrambled: 'G A L A X Y', word: 'GALAXY', hint: 'Swirling collection of billions of solar systems' },
  { id: 'ws8', scrambled: 'R O B O T', word: 'ROBOT', hint: 'Mechanical automated friend like Cosmo' }
];
