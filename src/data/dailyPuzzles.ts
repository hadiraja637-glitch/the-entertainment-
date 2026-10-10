export interface DailyPuzzle {
  id: string;
  type: 'logic' | 'riddle' | 'lateral' | 'math';
  title: string;
  difficulty: 'Quick & Clever' | 'Moderate Deduction' | 'Cosmic Mind-Bender';
  question: string;
  hint: string;
  answer: string;
  acceptableKeywords: string[];
  options: string[];
  correctOptionIndex: number;
  explanation: string;
  funFact?: string;
}

export const DAILY_PUZZLES: DailyPuzzle[] = [
  {
    id: 'dp-1',
    type: 'logic',
    title: 'The Three Switches and the Closed Room',
    difficulty: 'Moderate Deduction',
    question: 'You are standing outside a closed, windowless room with three light switches in the "OFF" position labeled A, B, and C. Inside the room is a single incandescent lightbulb. You can flip the switches however you like, but once you open the door and enter the room, you cannot touch the switches again. How do you determine with 100% certainty which switch controls the lightbulb with just one entry?',
    hint: 'Incandescent lightbulbs emit something else in addition to visible light when left on.',
    answer: 'Turn on switch A for 5 minutes, turn it off, then turn on switch B and enter.',
    acceptableKeywords: ['heat', 'warm', 'hot', 'temperature', 'touch', 'feel', 'switch a', 'switch b', 'burn', 'warmth'],
    options: [
      'Flip Switch A and wait; if off, flip B and enter immediately',
      'Turn on A for a few minutes, turn it off, turn on B, then go in and feel the bulb',
      'Turn on all three switches simultaneously, then turn off B and C',
      'Flip A and C together, leave B off, and check if light is flickering'
    ],
    correctOptionIndex: 1,
    explanation: 'Turn Switch A ON and wait 5–10 minutes so the filament heats up. Then turn Switch A OFF and turn Switch B ON. Open the door and enter: If the light is ON, Switch B controls it. If the light is OFF, touch the bulb: if it is HOT, Switch A controls it. If it is cold and OFF, Switch C controls it!',
    funFact: 'This classic puzzle relies on using a second physical sensor (touch/heat) when sight alone only yields a binary state.'
  },
  {
    id: 'dp-2',
    type: 'riddle',
    title: 'The Silent Traveler',
    difficulty: 'Quick & Clever',
    question: 'I have cities without houses, forests without trees, and oceans without water. You can hold me in your hands or unfold me on a table, yet I can guide you across the entire globe. What am I?',
    hint: 'Explorers and sailors never left port without one.',
    answer: 'A map',
    acceptableKeywords: ['map', 'atlas', 'globe', 'cartography', 'a map', 'world map'],
    options: ['A photograph', 'A dream', 'A map', 'A painting'],
    correctOptionIndex: 2,
    explanation: 'A map depicts cities, mountains, roads, and oceans symbolically with ink and contours, containing all global geography without any physical mass.',
    funFact: 'The oldest known surviving map in the world is the Babylonian Imago Mundi, dating back to roughly 600 BCE on a clay tablet.'
  },
  {
    id: 'dp-3',
    type: 'lateral',
    title: 'The River Crossing with Wolf, Goat, and Cabbage',
    difficulty: 'Moderate Deduction',
    question: 'A traveler needs to cross a river with a wolf, a goat, and a basket of cabbage. The small boat can only carry the traveler and one item at a time. If left unattended together, the wolf will eat the goat, or the goat will eat the cabbage. How can the traveler get all three safely across?',
    hint: 'Remember that you can bring an item back with you on the return trip!',
    answer: 'Take the goat first, return empty, take the wolf, bring the goat back, take the cabbage, return empty, take the goat.',
    acceptableKeywords: ['goat first', 'bring goat back', 'take goat', 'carry goat', 'goat'],
    options: [
      'Take the wolf first, then the cabbage, then the goat',
      'Take the goat first, bring it back when taking the cabbage or wolf, then return for it',
      'Take the cabbage first, leave the wolf and goat tied apart',
      'Travel with wolf and cabbage together, then come back for the goat'
    ],
    correctOptionIndex: 1,
    explanation: 'Step 1: Take the goat across (wolf & cabbage are safe together). Step 2: Return alone. Step 3: Take the wolf across. Step 4: Bring the goat back to the start! Step 5: Leave the goat and take the cabbage across. Step 6: Return alone. Step 7: Take the goat across. All three arrive unharmed!',
    funFact: 'This river crossing dilemma was first recorded in the 8th century Latin manuscript "Propositiones ad Acuendos Juvenes" attributed to Alcuin of York.'
  },
  {
    id: 'dp-4',
    type: 'math',
    title: 'The Snail in the Well',
    difficulty: 'Moderate Deduction',
    question: 'A snail is at the bottom of a 30-foot deep well. Each day it climbs up 3 feet, but each night while sleeping it slides back down 2 feet. On which day will the snail finally reach the top and climb out of the well?',
    hint: 'Once the snail reaches the top edge during the day, it climbs out immediately and does not slide down that night!',
    answer: 'Day 28',
    acceptableKeywords: ['28', '28th', 'day 28', '28 days', 'twenty eight', 'twenty-eight'],
    options: ['Day 30', 'Day 29', 'Day 28', 'Day 27'],
    correctOptionIndex: 2,
    explanation: 'During the first 27 days, the snail makes net progress of 1 foot per 24 hours (climbing 3, slipping 2), reaching 27 feet at the end of the 27th night. On the morning of Day 28, it climbs 3 feet: 27 + 3 = 30 feet! It reaches the lip of the well and escapes before slipping!',
    funFact: 'This is a famous boundary condition puzzle where the termination event prevents the standard cycle from completing.'
  },
  {
    id: 'dp-5',
    type: 'riddle',
    title: 'The Living Treasury',
    difficulty: 'Quick & Clever',
    question: 'What belongs to you, but other people use it far more often than you ever do?',
    hint: 'People use it whenever they want to get your attention across a crowded room.',
    answer: 'Your name',
    acceptableKeywords: ['name', 'my name', 'your name', 'first name'],
    options: ['Your phone number', 'Your name', 'Your shadow', 'Your money'],
    correctOptionIndex: 1,
    explanation: 'Your name was given to you and belongs to your identity, but everyone else speaks and refers to it continually to address you.',
    funFact: 'Hearing your own name activates distinct patterns in the left hemisphere of your brain (prefrontal cortex and temporal lobe).'
  },
  {
    id: 'dp-6',
    type: 'logic',
    title: 'The Island of Knights and Knaves',
    difficulty: 'Moderate Deduction',
    question: 'You arrive at an island where Knights always tell the truth and Knaves always lie. You meet two inhabitants, Alan and Ben. Alan says: "At least one of us is a Knave." What are Alan and Ben?',
    hint: 'Can Alan be a Knave? If a Knave says a statement, the statement must be completely false.',
    answer: 'Alan is a Knight and Ben is a Knave',
    acceptableKeywords: ['alan knight', 'ben knave', 'alan is a knight', 'ben is a knave', 'knight and knave'],
    options: [
      'Both Alan and Ben are Knights',
      'Both Alan and Ben are Knaves',
      'Alan is a Knight and Ben is a Knave',
      'Alan is a Knave and Ben is a Knight'
    ],
    correctOptionIndex: 2,
    explanation: 'If Alan were a Knave, his statement ("At least one of us is a Knave") would be true. But Knaves never tell the truth! Thus Alan cannot be a Knave; Alan MUST be a Knight. Since Alan is a Knight, his statement is true. To make "at least one of us is a Knave" true when Alan is a Knight, Ben must be a Knave!',
    funFact: 'Raymond Smullyan, a renowned American mathematician and magician, popularized Knight-and-Knave logic puzzles in books like "What Is the Name of This Book?".'
  },
  {
    id: 'dp-7',
    type: 'lateral',
    title: 'The Man in the Elevator',
    difficulty: 'Quick & Clever',
    question: 'A man lives on the 10th floor of an apartment building. Every morning he takes the elevator all the way down to the ground floor to go to work. In the evening, when coming back home, he takes the elevator to the 7th floor and walks up the remaining 3 flights of stairs, UNLESS it is raining or there are other people in the elevator. Why?',
    hint: 'Consider his physical stature and what tool he might have on a rainy day.',
    answer: 'He is a person of short stature and cannot reach the button for the 10th floor without an umbrella or someone to help.',
    acceptableKeywords: ['short', 'reach', 'button', 'umbrella', 'dwarf', 'height', 'cannot reach', 'cant reach'],
    options: [
      'He exercises only 3 flights every evening',
      'The elevator has a weight restriction after 6 PM',
      'He is too short to reach the 10th floor button, but uses an umbrella on rainy days',
      'The 8th and 9th floors have bad elevator cables'
    ],
    correctOptionIndex: 2,
    explanation: 'The man is short and can only reach up to the button for the 7th floor. When it rains, he carries an umbrella and can poke the 10th-floor button. When other people ride with him, he asks them to press 10 for him!',
    funFact: 'This is one of the most widely celebrated lateral thinking puzzles formulated by Edward de Bono in the 1960s.'
  },
  {
    id: 'dp-8',
    type: 'riddle',
    title: 'The Paradoxical Box',
    difficulty: 'Quick & Clever',
    question: 'The person who makes it doesn\'t want it. The person who buys it doesn\'t need it for themselves. The person who uses it never knows they are using it. What is it?',
    hint: 'It is manufactured for eternal rest.',
    answer: 'A coffin',
    acceptableKeywords: ['coffin', 'casket', 'a coffin', 'a casket', 'grave box'],
    options: ['A tombstone', 'A coffin', 'A crib', 'A hospital bed'],
    correctOptionIndex: 1,
    explanation: 'A coffin is crafted to sell, purchased by family/relatives on behalf of the deceased, and used by the deceased person who has no awareness of it.',
    funFact: 'The English word "coffin" derives from the Greek "kophinos", which originally meant a simple basket.'
  },
  {
    id: 'dp-9',
    type: 'logic',
    title: 'The Burning Ropes Timer',
    difficulty: 'Cosmic Mind-Bender',
    question: 'You have two distinct ropes and a box of matches. Each rope takes exactly 60 minutes to burn completely from end to end. However, the ropes burn irregularly (e.g. half the rope might burn in 10 minutes and the other half in 50 minutes). How can you precisely measure 45 minutes using only these two ropes and matches?',
    hint: 'What happens to the total burn time if you light both ends of a rope simultaneously?',
    answer: 'Light both ends of rope 1 and one end of rope 2. When rope 1 finishes (30 min), light the second end of rope 2 (burning for another 15 min).',
    acceptableKeywords: ['both ends', 'two ends', '30 minutes', '15 minutes', 'light both ends', 'second end'],
    options: [
      'Fold rope 1 in half and rope 2 into quarters, then burn sequentially',
      'Light both ends of Rope 1 and one end of Rope 2; when Rope 1 burns out (30 min), light the other end of Rope 2',
      'Cut Rope 1 into three 20-minute sections and Rope 2 into four 15-minute sections',
      'Light Rope 1 at one end and Rope 2 at both ends; extinguish when Rope 2 reaches midpoint'
    ],
    correctOptionIndex: 1,
    explanation: 'Lighting both ends of a 60-minute rope burns it in exactly 30 minutes. At time = 0, light BOTH ends of Rope 1 AND one end of Rope 2. When Rope 1 completely burns out, exactly 30 minutes have passed, and Rope 2 has exactly 30 minutes of fuel left. At that exact moment, light the other end of Rope 2! The remaining 30 minutes will burn down in 15 minutes. 30 + 15 = 45 minutes exactly!',
    funFact: 'This puzzle has been a staple in technical logic interviews at MIT and Silicon Valley for decades.'
  },
  {
    id: 'dp-10',
    type: 'math',
    title: 'The Counterfeit Coin on the Balance Scale',
    difficulty: 'Moderate Deduction',
    question: 'You have 9 identical-looking gold coins, but one is counterfeit and weighs slightly LESS than the other 8 genuine coins. Using a two-pan balance scale, what is the MINIMUM number of weighings guaranteed to pinpoint the fake coin?',
    hint: 'Divide the coins into groups of three instead of halves!',
    answer: '2 weighings',
    acceptableKeywords: ['2', 'two', '2 weighings', 'two weighings', '2 times'],
    options: ['1 weighing', '2 weighings', '3 weighings', '4 weighings'],
    correctOptionIndex: 1,
    explanation: 'Divide the 9 coins into 3 groups of 3 (A, B, C). Weighing 1: Put group A on the left pan and group B on the right pan. If they balance, the fake is in group C. If one side is lighter, the fake is in that group. You have now isolated 3 coins. Weighing 2: Take 2 coins from the suspect trio and put one on each pan. If one is lighter, that is the fake. If they balance, the unweighed 3rd coin is the fake! Exactly 2 weighings.',
    funFact: 'In information theory, a balance scale with 3 outcomes (left heavier, right heavier, balanced) provides log3(N) units of information per measurement.'
  },
  {
    id: 'dp-11',
    type: 'riddle',
    title: 'The Reversible Vessel',
    difficulty: 'Quick & Clever',
    question: 'I am light as a feather, yet the strongest person in the world cannot hold me for much longer than five minutes. What am I?',
    hint: 'Take a deep breath and ponder this one.',
    answer: 'Your breath',
    acceptableKeywords: ['breath', 'breathing', 'your breath', 'air'],
    options: ['Water', 'Your breath', 'A bubble', 'Silence'],
    correctOptionIndex: 1,
    explanation: 'Breath has virtually zero weight, yet biological demand for oxygen prevents even elite athletes from holding it for more than several minutes.',
    funFact: 'The Guinness World Record for voluntarily holding breath underwater (after breathing pure oxygen) is 24 minutes and 37 seconds by Budimir Šobat.'
  },
  {
    id: 'dp-12',
    type: 'logic',
    title: 'The Two Guarded Doors (Heaven and Hell)',
    difficulty: 'Moderate Deduction',
    question: 'You stand before two doors: one leads to freedom and paradise, the other to permanent doom. Two guards stand before the doors. One guard ALWAYS tells the truth, and the other guard ALWAYS lies. You do not know which guard is which, and you do not know which door is which. You are allowed to ask ONE guard exactly ONE question. What single question guarantees you find the door to freedom?',
    hint: 'Ask what the OTHER guard would say.',
    answer: '"Which door would the other guard tell me leads to freedom?" (and pick the opposite door)',
    acceptableKeywords: ['other guard', 'other guard say', 'opposite', 'what would the other', 'ask other'],
    options: [
      '"Are you the truth teller or the liar?"',
      '"Which door leads to paradise?"',
      '"If I ask the other guard which door leads to freedom, what will they say?" — and then pick the OTHER door',
      '"Which door would you walk through if your life depended on it?"'
    ],
    correctOptionIndex: 2,
    explanation: 'If you ask Guard X: "Which door would the other guard say leads to freedom?", both guards will point to the DOOM door! The truth-teller honestly reports the liar\'s falsehood (pointing to doom). The liar falsely reverses the truth-teller\'s honesty (pointing to doom). Therefore, whichever door the guard names, you simply choose the OPPOSITE door to find freedom!',
    funFact: 'This double-negation logic puzzle was famously featured in the 1986 fantasy film "Labyrinth" starring David Bowie.'
  },
  {
    id: 'dp-13',
    type: 'lateral',
    title: 'The Two Buckets (Die Hard Puzzle)',
    difficulty: 'Moderate Deduction',
    question: 'You stand next to an infinite mountain water spring with two empty unmarked jugs: one holds exactly 5 liters and the other holds exactly 3 liters. How can you measure out PRECISELY 4 liters of water?',
    hint: 'Fill the 5-liter jug, pour into the 3-liter jug until full, leaving 2 liters...',
    answer: 'Fill 5L, pour into 3L (2L left in 5L). Empty 3L, pour the 2L into 3L. Fill 5L again, pour into 3L until full (1L transfer). Exactly 4L remains in the 5L jug!',
    acceptableKeywords: ['4 liters', 'fill 5', 'pour 3', 'fill 5l', 'empty 3', '2 liters'],
    options: [
      'Fill 3L twice and pour half into the 5L jug',
      'Fill 5L, pour to fill 3L (leaves 2L in 5L). Empty 3L, pour 2L into 3L. Fill 5L, pour into 3L until full: 4L remains in 5L jug',
      'Fill both jugs halfway and combine their volumes into 5L',
      'Fill 3L, pour into 5L, then fill 3L again and stop when 5L reaches top'
    ],
    correctOptionIndex: 1,
    explanation: '1. Fill the 5L jug completely. 2. Pour water from 5L into 3L until full; 2L remains in the 5L jug. 3. Empty the 3L jug. 4. Pour the 2L into the 3L jug (it now has 1L of space left). 5. Fill the 5L jug completely. 6. Pour from 5L into 3L until 3L is full (which takes exactly 1L). Result: The 5L jug now contains exactly 5 - 1 = 4 liters!',
    funFact: 'John McClane (Bruce Willis) and Zeus Carver (Samuel L. Jackson) had to solve this exact water jug puzzle in "Die Hard with a Vengeance".'
  },
  {
    id: 'dp-14',
    type: 'riddle',
    title: 'The Timeless Ancient',
    difficulty: 'Quick & Clever',
    question: 'Forward I am heavy, backward I am not. What am I?',
    hint: 'Spelled backwards, it is a word meaning negation.',
    answer: 'A ton (spelled backward is "not")',
    acceptableKeywords: ['ton', 'a ton', 'not'],
    options: ['Lead', 'A ton', 'An anchor', 'Gold'],
    correctOptionIndex: 1,
    explanation: 'The word "ton" spells out a unit of massive weight forward (2,000 lbs). Spelled backward, "t-o-n" becomes "n-o-t" ("not").',
    funFact: 'This is a classic orthographic riddle that relies on reverse spelling symmetry.'
  },
  {
    id: 'dp-15',
    type: 'math',
    title: 'The Missing Dollar Mystery',
    difficulty: 'Quick & Clever',
    question: 'Three guests rent a hotel room costing $30. Each guest pays $10. Later, the hotel clerk realizes the room was actually only $25 and gives $5 to the bellhop to return. The bellhop cannot divide $5 equally among 3 guests, so he pockets $2 and gives $1 back to each guest. Now, each guest paid $9 (totaling $27), and the bellhop kept $2, making $29. Where did the missing $1 go?',
    hint: 'Think about who holds what money. Should you be ADDING or SUBTRACTING the bellhop\'s $2 from the $27?',
    answer: 'There is no missing dollar; the $2 bellhop money is ALREADY inside the $27 paid by the guests ($25 hotel + $2 bellhop = $27).',
    acceptableKeywords: ['no missing dollar', 'already included', 'subtraction', 'accounting error', 'wrong calculation', 'false math', 'trick'],
    options: [
      'The hotel manager kept it as a service charge',
      'The bellhop actually kept $3 instead of $2',
      'The math is flawed: the $2 is part of the $27 paid ($25 room + $2 stolen = $27), not to be added to it',
      'Taxes were deducted before giving the refund'
    ],
    correctOptionIndex: 2,
    explanation: 'The premise deceptively adds the bellhop\'s $2 to the $27 paid, but the bellhop\'s $2 is ALREADY part of the $27! Total paid by guests: $27. Where did that $27 go? $25 to the hotel register + $2 into the bellhop\'s pocket = $27! The other $3 went back to the guests ($27 + $3 = $30). The accounting balances perfectly.',
    funFact: 'Known as the "Missing Dollar Riddle", this informal fallacy demonstrates how false framing can create an illusion of paradox.'
  },
  {
    id: 'dp-16',
    type: 'logic',
    title: 'The Bridge Crossing in the Dark',
    difficulty: 'Cosmic Mind-Bender',
    question: 'Four travelers (A, B, C, D) must cross a fragile suspension bridge at night. They have one flashlight. The bridge holds at most TWO people at once, and anyone crossing must carry the flashlight. Traveler A takes 1 minute to cross, B takes 2 minutes, C takes 7 minutes, and D takes 10 minutes. When two people cross together, they must move at the slower person\'s pace. What is the minimum time needed for all 4 to cross?',
    hint: 'Have the two slowest people cross together so their slow times overlap, instead of having the fastest person escort everyone!',
    answer: '17 minutes',
    acceptableKeywords: ['17', '17 min', '17 minutes', 'seventeen'],
    options: ['19 minutes', '17 minutes', '21 minutes', '15 minutes'],
    correctOptionIndex: 1,
    explanation: 'Trip 1: A (1) and B (2) cross together = 2 min. Trip 2: A returns with the flashlight = 1 min (total 3 min). Trip 3: C (7) and D (10) cross together = 10 min (total 13 min). Trip 4: B returns with the flashlight = 2 min (total 15 min). Trip 5: A and B cross together again = 2 min. Total: 2 + 1 + 10 + 2 + 2 = 17 minutes!',
    funFact: 'Grouping C and D together saves massive time because C\'s 7 minutes are completely absorbed into D\'s 10 minutes without extra return trips.'
  },
  {
    id: 'dp-17',
    type: 'riddle',
    title: 'The Silent Whisperer',
    difficulty: 'Quick & Clever',
    question: 'I speak without a mouth and hear without ears. I have no body, but I come alive with the wind. What am I?',
    hint: 'Shout into a vast canyon and listen.',
    answer: 'An echo',
    acceptableKeywords: ['echo', 'an echo', 'sound echo'],
    options: ['A cloud', 'An echo', 'The wind', 'A ghost'],
    correctOptionIndex: 1,
    explanation: 'An echo reproduces your spoken words by sound wave reflection off cliff faces, possessing no physical anatomy yet answering with clarity.',
    funFact: 'In Greek mythology, Echo was an Oread nymph cursed by Hera so she could only repeat the last words spoken by others.'
  },
  {
    id: 'dp-18',
    type: 'logic',
    title: 'The Three Mislabelled Crates',
    difficulty: 'Moderate Deduction',
    question: 'You have three fruit crates. One contains only APPLES, one contains only ORANGES, and one contains BOTH apples and oranges. Every single crate is labeled INCORRECTLY (e.g. "Apples", "Oranges", "Apples & Oranges"). You can reach into ONE crate and pick out just ONE fruit without looking inside. Which crate should you sample to determine the true contents of all three crates?',
    hint: 'Remember that EVERY crate label is 100% false. Which label gives you the strongest guarantee?',
    answer: 'The crate labeled "Apples & Oranges"',
    acceptableKeywords: ['apples & oranges', 'apples and oranges', 'both', 'mixed', 'label apples & oranges'],
    options: [
      'The crate labeled "Apples"',
      'The crate labeled "Oranges"',
      'The crate labeled "Apples & Oranges"',
      'Any crate chosen at random'
    ],
    correctOptionIndex: 2,
    explanation: 'Sample the crate labeled "Apples & Oranges". Since all labels are wrong, this crate CANNOT be mixed; it must be either all apples or all oranges! If you pull out an apple, this crate is 100% APPLES. Then the crate labeled "Oranges" must be "Apples & Oranges" (since it can\'t be oranges), and the crate labeled "Apples" must be "Oranges". Solved with just 1 fruit!',
    funFact: 'Because the "Both" label cannot be both, a single observation collapses all possible permutations into a single truth state.'
  },
  {
    id: 'dp-19',
    type: 'lateral',
    title: 'The Two Coins Dilemma',
    difficulty: 'Quick & Clever',
    question: 'Two US coins add up to 30 cents, and one of them is NOT a nickel. What are the two coins?',
    hint: 'Read the wording with precision: "ONE of them is not a nickel"...',
    answer: 'A quarter (25¢) and a nickel (5¢)',
    acceptableKeywords: ['quarter and nickel', 'quarter and a nickel', 'quarter nickel', '25 and 5', 'quarter', 'nickel'],
    options: [
      'Two dimes and two nickels',
      'A quarter and a nickel (the OTHER coin is the nickel!)',
      'Three dimes',
      'It is mathematically impossible with valid US coins'
    ],
    correctOptionIndex: 1,
    explanation: 'A quarter (25¢) and a nickel (5¢). One of the coins is indeed NOT a nickel (it\'s a quarter!). The other coin is the nickel!',
    funFact: 'This riddle tests syntactic parsing: the condition applies to one element of the pair, not both.'
  },
  {
    id: 'dp-20',
    type: 'riddle',
    title: 'The Vanishing Footprint',
    difficulty: 'Quick & Clever',
    question: 'The more you take of me, the more you leave behind. What am I?',
    hint: 'Look back at where you just walked on a snowy path.',
    answer: 'Footsteps (or steps)',
    acceptableKeywords: ['footsteps', 'steps', 'footstep', 'step', 'footprints'],
    options: ['Time', 'Footsteps', 'Breath', 'Memories'],
    correctOptionIndex: 1,
    explanation: 'Every step you take forward physically leaves another footprint behind on the ground.',
    funFact: 'The Apollo astronauts\' footprints on the lunar regolith could remain preserved for millions of years because the Moon has no atmosphere or wind erosion.'
  },
  {
    id: 'dp-21',
    type: 'logic',
    title: 'The Four Men in Hats in a Line',
    difficulty: 'Moderate Deduction',
    question: 'Four men (A, B, C, D) are buried up to their necks in sand. A and B are on one side of a solid brick wall; C and D are on the other. They are arranged in a straight line: A, [WALL], B, C, D. All face the wall. D sees B and C; C sees only B; B sees only the wall; A sees only the wall. They know there are 2 black hats and 2 white hats, and they wear one each. They cannot speak or move, but the first person who can logically deduce their own hat color must shout it out. Who speaks first and knows their color for sure?',
    hint: 'If D (who sees both B and C) saw two hats of the SAME color, he would know his own immediately. What does D\'s silence tell C?',
    answer: 'Man C (wearing the opposite color of B)',
    acceptableKeywords: ['c', 'man c', 'person c'],
    options: ['Man A', 'Man B', 'Man C', 'Man D'],
    correctOptionIndex: 2,
    explanation: 'D can see both B and C. If B and C were wearing the same color (e.g. both white), D would immediately know he was wearing black and shout out. But D stays silent because B and C are wearing DIFFERENT colors. C realizes D is silent, which proves to C that his own hat is the OPPOSITE color of B\'s hat! Since C can see B\'s hat, C shouts out his own color with 100% certainty.',
    funFact: 'This is a foundational example of common knowledge and deductive reasoning from another agent\'s non-action (epistemic logic).'
  },
  {
    id: 'dp-22',
    type: 'math',
    title: 'The Bat and Ball Total',
    difficulty: 'Quick & Clever',
    question: 'A baseball bat and a ball together cost $1.10. The bat costs $1.00 more than the ball. How much does the ball cost alone?',
    hint: 'Your intuitive gut might say 10 cents, but if the ball were 10 cents, the bat ($1.10) plus the ball ($0.10) would equal $1.20!',
    answer: '5 cents ($0.05)',
    acceptableKeywords: ['5 cents', '0.05', '$0.05', '5 cent', 'five cents', '0.05 dollars'],
    options: ['10 cents ($0.10)', '5 cents ($0.05)', '1 cent ($0.01)', '15 cents ($0.15)'],
    correctOptionIndex: 1,
    explanation: 'Let Bat = B and Ball = b. B + b = 1.10, and B = b + 1.00. Substituting gives: (b + 1.00) + b = 1.10 => 2b = 0.10 => b = $0.05 (5 cents). The bat costs $1.05, and the ball costs $0.05. $1.05 + $0.05 = $1.10!',
    funFact: 'Nobel laureate Daniel Kahneman introduced this in "Thinking, Fast and Slow" as a classic example of System 1 heuristic jumping ahead of System 2 analytical verification.'
  },
  {
    id: 'dp-23',
    type: 'riddle',
    title: 'The Eternal Consumer',
    difficulty: 'Quick & Clever',
    question: 'I am not alive, but I grow; I do not have lungs, but I require air; I do not have a mouth, but water kills me. What am I?',
    hint: 'Strike a match to summon me.',
    answer: 'Fire',
    acceptableKeywords: ['fire', 'flame', 'a fire', 'campfire'],
    options: ['Rust', 'Fire', 'A storm', 'Shadow'],
    correctOptionIndex: 1,
    explanation: 'Fire consumes fuel and oxygen (air) to expand, releases energy, but is extinguished upon contact with water.',
    funFact: 'Fire requires the fire tetrahedron to burn: oxygen, heat, fuel, and an uninhibited chemical chain reaction.'
  },
  {
    id: 'dp-24',
    type: 'lateral',
    title: 'The Rope Ladder on the Ship',
    difficulty: 'Quick & Clever',
    question: 'A ship is anchored in a harbor. A rope ladder hangs over the side, with its rungs spaced 12 inches (1 foot) apart. At low tide, the ocean water just touches the bottom rung of the ladder. If the tide rises at a steady rate of 6 inches per hour, how many rungs will be submerged after 4 hours?',
    hint: 'What happens to a floating ship as the tide rises?',
    answer: 'Zero rungs (the ship and its ladder rise with the tide)',
    acceptableKeywords: ['zero', 'none', '0', 'no rungs', 'ship rises', 'boat rises', 'floats'],
    options: ['2 rungs', '3 rungs', '4 rungs', 'Zero (the ship floats on top of the rising water)'],
    correctOptionIndex: 3,
    explanation: 'Because the ship is buoyant and floating on the water, as the tide rises, the entire vessel and its attached ladder rise with it! The water remains at the exact same level relative to the ladder.',
    funFact: 'Archimedes\' principle of buoyancy dictates that floating objects displace their own weight in water regardless of tidal elevation.'
  },
  {
    id: 'dp-25',
    type: 'logic',
    title: 'The Two Hourglasses Timer',
    difficulty: 'Moderate Deduction',
    question: 'You are boiling an egg that requires precisely 9 minutes of cooking time. You have only two hourglasses: one runs for 4 minutes, and the other runs for 7 minutes. How can you time exactly 9 minutes without guessing?',
    hint: 'Start both hourglasses when you drop the egg into boiling water...',
    answer: 'Start both. At 4 min, flip the 4-min timer. At 7 min, 1 min is left in 4-min timer. Flip 7-min timer immediately when 4-min runs out (1 min passed). Total = 9 min!',
    acceptableKeywords: ['9 minutes', 'both', 'flip', '4 and 7', 'hourglass'],
    options: [
      'Run the 7-minute hourglass once, then half of the 4-minute hourglass by eye',
      'Start both at once. When 4 min finishes, flip it (4 min passed). When 7 min finishes, flip 7 min again. When 4 min finishes second time (8 min), flip 7 min back: 1 min runs out = 9 min!',
      'Run 4-min twice, then estimate 1 minute extra',
      'Flip 7-min, then after 2 minutes flip 4-min'
    ],
    correctOptionIndex: 1,
    explanation: '1. Start both timers together. 2. At 4 min: 4-min runs out (flip it). 3. At 7 min: 7-min runs out (the 4-min timer has 1 min left). 4. At 8 min: 4-min timer runs out. Flip the 7-min timer! 5. The 7-min timer has exactly 1 minute of sand on its top side from step 3 to 4. When that runs down, exactly 8 + 1 = 9 minutes have elapsed!',
    funFact: 'Hourglass timer problems are formal examples of linear Diophantine equations: 4x + 7y = target.'
  },
  {
    id: 'dp-26',
    type: 'riddle',
    title: 'The Silent Keyhole',
    difficulty: 'Quick & Clever',
    question: 'What has keys but opens no doors, has space but no room, and allows you to enter but never walk in?',
    hint: 'You are using one right now to interface with this app.',
    answer: 'A keyboard',
    acceptableKeywords: ['keyboard', 'computer keyboard', 'a keyboard', 'piano keyboard'],
    options: ['A piano', 'A computer keyboard', 'A lockbox', 'A spaceship'],
    correctOptionIndex: 1,
    explanation: 'A computer keyboard has letter keys, a Space bar, and an Enter key, yet contains no physical doorways.',
    funFact: 'The QWERTY layout was engineered in the early 1870s by Christopher Latham Sholes to prevent typewriter mechanical hammers from jamming.'
  },
  {
    id: 'dp-27',
    type: 'logic',
    title: 'The Poisoned Cup at the Royal Banquet',
    difficulty: 'Moderate Deduction',
    question: 'A royal tester knows that 1 of 8 bottles of wine is poisoned. The poison takes 24 hours to exhibit symptoms. The king needs the answer in exactly 24 hours. Using test mice (where each mouse can drink a droplet mixture from multiple bottles simultaneously), what is the minimum number of mice needed to identify the exact poisoned bottle?',
    hint: 'Think in binary: 2 to what power equals 8?',
    answer: '3 mice',
    acceptableKeywords: ['3', 'three', '3 mice', 'three mice'],
    options: ['2 mice', '3 mice', '4 mice', '7 mice'],
    correctOptionIndex: 1,
    explanation: 'Number the bottles 0 to 7 in binary (000 to 111). You only need 3 mice! Mouse 1 drinks from bottles whose binary code has a 1 in the 1st bit (bottles 1, 3, 5, 7). Mouse 2 drinks from bottles with a 1 in the 2nd bit (bottles 2, 3, 6, 7). Mouse 3 drinks from bottles with a 1 in the 3rd bit (bottles 4, 5, 6, 7). After 24 hours, the combination of surviving and deceased mice forms a 3-bit binary number pinpointing the exact poisoned bottle!',
    funFact: 'Binary search trees and error-correcting Hamming codes use this exact dimensional partition.'
  },
  {
    id: 'dp-28',
    type: 'riddle',
    title: 'The Uncatchable Runner',
    difficulty: 'Quick & Clever',
    question: 'What runs around the entire backyard without ever taking a single step?',
    hint: 'It marks the property boundary between neighbors.',
    answer: 'A fence',
    acceptableKeywords: ['fence', 'a fence', 'backyard fence', 'garden fence', 'perimeter fence'],
    options: ['A sprinkler', 'A fence', 'A dog', 'A path'],
    correctOptionIndex: 1,
    explanation: 'A fence borders and runs along the perimeter of an entire yard while remaining firmly rooted in the ground.',
    funFact: 'The longest fence in the world is the Dingo Fence in Australia, stretching over 3,488 miles (5,614 km).'
  },
  {
    id: 'dp-29',
    type: 'math',
    title: 'The Lily Pad Exponential Pond',
    difficulty: 'Quick & Clever',
    question: 'A patch of lily pads in a pond doubles in area every day. If it takes 48 days for the lily pads to completely cover the entire pond, on which day was the pond half-covered?',
    hint: 'Work backwards by one single day from full coverage!',
    answer: 'Day 47',
    acceptableKeywords: ['47', 'day 47', '47th day', 'forty seven', 'forty-seven'],
    options: ['Day 24', 'Day 47', 'Day 46', 'Day 36'],
    correctOptionIndex: 1,
    explanation: 'Because the patch doubles every day, on the day immediately before total coverage (Day 47), the lily pads covered exactly half the pond! When they doubled on Day 48, the pond became 100% full.',
    funFact: 'This riddle illustrates how human intuition struggles with non-linear exponential growth rates.'
  },
  {
    id: 'dp-30',
    type: 'riddle',
    title: 'The Constant Companion',
    difficulty: 'Quick & Clever',
    question: 'I follow you by day, disappear in the pitch dark, mimic your every gesture, yet flee whenever the light vanishes. What am I?',
    hint: 'Cast under the afternoon sun.',
    answer: 'Your shadow',
    acceptableKeywords: ['shadow', 'a shadow', 'my shadow', 'your shadow', 'silhouette'],
    options: ['Your reflection', 'Your shadow', 'A pet', 'Your thoughts'],
    correctOptionIndex: 1,
    explanation: 'A shadow is created by obstructing light rays; it moves in tandem with your silhouette and dissolves in total darkness.',
    funFact: 'Earth itself casts a 870,000-mile long shadow cone (umbra) into space, which creates lunar eclipses when the Moon passes through it.'
  }
];
