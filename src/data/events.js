// Mock data for the HeyAmara events. Every event is a single rich object that
// carries BOTH the list fields (slug, title, host, image, blurb, etc.) and the
// full detail fields (name, tagline, location, about, agenda, hosts, attendees,
// cover, etc.). The detail page renders each event by slug via getEventBySlug.
//
// Copy is written to feel like a real, exciting lineup of member experiences.
// No dashes are used anywhere: a colon or the word "and" stands in for them.

export const events = [
  {
    // ----- list fields -----
    slug: 'the-founders-table',
    title: "The Founders' Table",
    featured: true,
    format: 'Dinner',
    locationType: 'place',
    city: 'Sydney, Australia',
    venue: 'Crown Sydney',
    date: 'Thu 16 Jul 2026',
    dateParts: { weekday: 'Thu', day: '16', monthShort: 'Jul', month: 'July' },
    monthGroup: 'July 2026',
    time: '6:30 PM UTC+10',
    host: { name: 'Harvey Jutton', avatar: 'https://i.pravatar.cc/120?img=68' },
    image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=900&q=80',
    alt: 'A candlelit private dining room set for an intimate dinner',
    blurb: 'One long table, twelve founders, and the eight figure recruiting playbooks nobody posts online.',

    // ----- detail fields -----
    name: "The Founders' Table",
    tagline:
      'One long table, twelve founders, and the recruiting playbooks nobody posts online.',
    location: {
      venue: 'Crown Sydney',
      area: 'Barangaroo',
      city: 'Sydney, Australia',
      note: 'The exact room and access land in your inbox the moment your seat is confirmed.',
      maps: 'https://maps.google.com/?q=Crown+Sydney+Barangaroo',
    },
    capacity: 12,
    claimed: 9,
    seatsLeft: 3,
    tags: ['Mastermind', 'Dinner', 'Invite only', 'Sydney', 'AI'],
    about: [
      'This is the dinner where the people quietly building eight figure recruitment agencies tell you exactly how they did it. Real numbers, real systems, and the AI playbooks they actually run, all shared over a long and unhurried meal.',
      'Twelve seats. One table. No slide decks, no name badges, no networking theatre. Just the founders everyone else is trying to copy, talking openly about the parts that usually stay behind closed doors: real margins, real comp, the hires that blew up and the ones that quietly changed everything.',
      'Come hungry, bring one great question, and leave with a room full of people worth knowing. We cannot wait to see you at the table.',
    ],
    agenda: [
      { time: '6:30 PM', title: 'Arrival and champagne', blurb: 'Walk in, drop the pitch, and pick up a glass. A soft landing before the real conversation begins.', icon: 'glass' },
      { time: '7:00 PM', title: 'Dinner and the roundtable', blurb: 'What is actually working in 2026. Every seat speaks, and the real numbers land on the table instead of in a deck.', icon: 'plate' },
      { time: '8:30 PM', title: 'Fireside on the bottleneck', blurb: 'Sasha on scaling past the founder bottleneck without burning the culture or the margin.', icon: 'mic' },
      { time: '9:30 PM', title: 'Open networking', blurb: 'The introductions you came for. Stay as long as the conversation stays good.', icon: 'people' },
    ],
    included: [
      { label: 'Dinner and drinks', icon: 'glass' },
      { label: 'The playbook', icon: 'book' },
      { label: 'The room', icon: 'people' },
    ],
    hosts: [
      { name: 'Harvey Jutton', role: 'Cofounder, HeyAmara', avatar: 'https://i.pravatar.cc/120?img=68', bio: 'Started HJ Recruitment at nineteen with no funding. Obsessed with AI, allergic to corporate.' },
      { name: 'Sasha Bennett', role: 'Founder, Apex Talent', avatar: 'https://i.pravatar.cc/120?img=45', bio: 'Took Apex Talent to eight figures. Brings the systems, the numbers, and the scar tissue.' },
    ],
    attendees: [
      { name: 'Priya Raman', avatar: 'https://i.pravatar.cc/96?img=15' },
      { name: 'Marcus Whitfield', avatar: 'https://i.pravatar.cc/96?img=33' },
      { name: 'Elena Sokolova', avatar: 'https://i.pravatar.cc/96?img=52' },
      { name: 'Daniel Okafor', avatar: 'https://i.pravatar.cc/96?img=8' },
      { name: 'Mei Lin Tan', avatar: 'https://i.pravatar.cc/96?img=24' },
    ],
    attendeesNote: 'Founders of seven and eight figure agencies from Sydney, Melbourne and Singapore.',
    cover: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=2000&q=80',
    coverAlt: 'A candlelit private dining room set for an intimate dinner',
  },

  {
    // ----- list fields -----
    slug: 'ai-in-recruiting-mastermind',
    title: 'AI in Recruiting Mastermind',
    featured: false,
    format: 'Mastermind',
    locationType: 'online',
    city: 'Online',
    venue: '',
    date: 'Tue 22 Jul 2026',
    dateParts: { weekday: 'Tue', day: '22', monthShort: 'Jul', month: 'July' },
    monthGroup: 'July 2026',
    time: '12:00 PM UTC+10',
    host: { name: 'Harvey Jutton', avatar: 'https://i.pravatar.cc/120?img=68' },
    image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=900&q=80',
    alt: 'A calm abstract technology interface in soft light',
    blurb: 'A live teardown of the exact AI stack top agencies are running right now, screens shared and nothing held back.',

    // ----- detail fields -----
    name: 'AI in Recruiting Mastermind',
    tagline:
      'A live teardown of the exact AI stack the fastest agencies run, screens shared and nothing held back.',
    location: {
      venue: 'Live on Zoom',
      area: 'Members link',
      city: 'Join from anywhere',
      note: 'Your private join link and the workbook land in your inbox the moment your seat is confirmed.',
      maps: '',
    },
    capacity: 40,
    claimed: 31,
    seatsLeft: 9,
    tags: ['Mastermind', 'Online', 'AI', 'Live teardown', 'Members only'],
    about: [
      'Everyone is talking about AI in recruiting. Almost nobody will show you their actual screen. This session is the opposite: ninety minutes of real tools, real prompts, and the exact automations that are quietly billing for the agencies furthest ahead.',
      'Harvey shares his own stack live and walks every workflow end to end, from sourcing to outreach to the follow up that closes. Nothing is held back behind closed doors, and nothing is theory. If it is on the screen, you can rebuild it the same afternoon.',
      'Bring the one bottleneck eating your week. We will find where AI takes it off your plate, and you will leave with a workbook you can put to work before the next morning.',
    ],
    agenda: [
      { time: '12:00 PM', title: 'The state of the stack', blurb: 'A fast map of what is genuinely working in 2026 and what is just noise wearing a logo.', icon: 'mic' },
      { time: '12:20 PM', title: 'Sourcing live', blurb: 'Screen shared from a blank canvas to a full shortlist, with every prompt visible as it runs.', icon: 'glass' },
      { time: '1:00 PM', title: 'Outreach that converts', blurb: 'The automations behind reply rates that do not look real, taken apart step by step.', icon: 'plate' },
      { time: '1:30 PM', title: 'Open questions', blurb: 'Cameras on, ask anything. The room solves your specific bottleneck together.', icon: 'people' },
    ],
    included: [
      { label: 'The recording', icon: 'book' },
      { label: 'The prompt workbook', icon: 'book' },
      { label: 'The members room', icon: 'people' },
    ],
    hosts: [
      { name: 'Harvey Jutton', role: 'Cofounder, HeyAmara', avatar: 'https://i.pravatar.cc/120?img=68', bio: 'Builds and breaks AI workflows for a living. Shares the real stack, not the highlight reel.' },
      { name: 'Priya Raman', role: 'Head of Automation, Northbound', avatar: 'https://i.pravatar.cc/120?img=15', bio: 'Turned a five person desk into an automation engine. Lives in the parts most people skip.' },
    ],
    attendees: [
      { name: 'Daniel Okafor', avatar: 'https://i.pravatar.cc/96?img=8' },
      { name: 'Mei Lin Tan', avatar: 'https://i.pravatar.cc/96?img=24' },
      { name: 'Sofia Marchetti', avatar: 'https://i.pravatar.cc/96?img=31' },
      { name: 'Arjun Kapoor', avatar: 'https://i.pravatar.cc/96?img=11' },
      { name: 'Hannah Bergstrom', avatar: 'https://i.pravatar.cc/96?img=20' },
    ],
    attendeesNote: 'Founders and ops leads from agencies running lean and scaling fast across four continents.',
    cover: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=2000&q=80',
    coverAlt: 'A calm abstract technology interface in soft light',
  },

  {
    // ----- list fields -----
    slug: 'the-closing-room',
    title: 'The Closing Room: Negotiation for Seven Figure Billers',
    featured: false,
    format: 'Workshop',
    locationType: 'place',
    city: 'Melbourne, Australia',
    venue: 'Collins Street studio',
    date: 'Wed 30 Jul 2026',
    dateParts: { weekday: 'Wed', day: '30', monthShort: 'Jul', month: 'July' },
    monthGroup: 'July 2026',
    time: '7:00 PM UTC+10',
    host: { name: 'Mara Lindqvist', avatar: 'https://i.pravatar.cc/120?img=45' },
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80',
    alt: 'A quiet modern boardroom with soft natural light',
    blurb: 'Three hours rebuilding the way you close offers, run the live scripts that turn maybes into signed contracts.',

    // ----- detail fields -----
    name: 'The Closing Room',
    tagline:
      'Three hours rebuilding the way you close offers, with the live scripts that turn a maybe into a signed contract.',
    location: {
      venue: 'Collins Street studio',
      area: 'Melbourne CBD',
      city: 'Melbourne, Australia',
      note: 'A small studio above Collins Street. The door code reaches you the day your seat is confirmed.',
      maps: 'https://maps.google.com/?q=Collins+Street+Melbourne',
    },
    capacity: 16,
    claimed: 11,
    seatsLeft: 5,
    tags: ['Workshop', 'Negotiation', 'Melbourne', 'Closing', 'Hands on'],
    about: [
      'Most deals are not lost on price. They are lost in the silence after the offer, in the half answered objection, in the moment a candidate or client says they need to think. This room is built to fix exactly that.',
      'Mara has coached billers through thousands of live closes, and she runs this as a workout, not a lecture. You will rehearse the real conversations out loud, get the scripts that hold under pressure, and learn to read the room so the close stops feeling like a leap and starts feeling inevitable.',
      'Sixteen seats only, so everyone gets reps and feedback. Bring a deal you are stuck on. You will leave with the words to move it.',
    ],
    agenda: [
      { time: '7:00 PM', title: 'Warm up and stories', blurb: 'A glass in hand and the worst close in the room, shared out loud. The fastest way to relax a negotiator.', icon: 'glass' },
      { time: '7:30 PM', title: 'The anatomy of a close', blurb: 'Mara breaks down the four moments where deals quietly die, and the script for each one.', icon: 'mic' },
      { time: '8:15 PM', title: 'Live rehearsal', blurb: 'Paired drills on your real deals, run twice, with feedback between each round.', icon: 'people' },
      { time: '9:30 PM', title: 'Debrief and drinks', blurb: 'What clicked, what to practice, and the conversations that keep going at the bar.', icon: 'plate' },
    ],
    included: [
      { label: 'The script deck', icon: 'book' },
      { label: 'Wine and small plates', icon: 'glass' },
      { label: 'The room', icon: 'people' },
    ],
    hosts: [
      { name: 'Mara Lindqvist', role: 'Negotiation coach, ex Korn Ferry', avatar: 'https://i.pravatar.cc/120?img=45', bio: 'Spent fifteen years closing executive search deals before she started teaching it. Calm, direct, unflinching.' },
    ],
    attendees: [
      { name: 'Tom Castellano', avatar: 'https://i.pravatar.cc/96?img=14' },
      { name: 'Aisha Rahman', avatar: 'https://i.pravatar.cc/96?img=29' },
      { name: 'Elena Sokolova', avatar: 'https://i.pravatar.cc/96?img=52' },
      { name: 'Ryan Mitchell', avatar: 'https://i.pravatar.cc/96?img=53' },
      { name: 'Grace Wang', avatar: 'https://i.pravatar.cc/96?img=44' },
    ],
    attendeesNote: 'Seven figure billers and desk leads who close the hard ones for a living.',
    cover: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=80',
    coverAlt: 'A quiet modern boardroom with soft natural light',
  },

  {
    // ----- list fields -----
    slug: 'bali-members-retreat',
    title: 'Bali Members Retreat: Three Days Above Uluwatu',
    featured: false,
    format: 'Retreat',
    locationType: 'place',
    city: 'Bali, Indonesia',
    venue: 'Uluwatu cliffs',
    date: 'Sat 9 Aug 2026',
    dateParts: { weekday: 'Sat', day: '9', monthShort: 'Aug', month: 'August' },
    monthGroup: 'August 2026',
    time: '9:00 AM UTC+8',
    host: { name: 'The HeyAmara Team', avatar: 'https://i.pravatar.cc/120?img=68' },
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=80',
    alt: 'An infinity pool above the Uluwatu cliffs at dusk',
    blurb: 'Three days of deep work, recovery, and honest founder talk high above the Uluwatu cliffs.',

    // ----- detail fields -----
    name: 'Bali Members Retreat',
    tagline:
      'Three days of deep work, recovery, and honest founder talk high above the Uluwatu cliffs.',
    location: {
      venue: 'A private cliff villa',
      area: 'Uluwatu',
      city: 'Bali, Indonesia',
      note: 'The villa address and your arrival pack reach you once your place is confirmed.',
      maps: 'https://maps.google.com/?q=Uluwatu+Bali',
    },
    capacity: 24,
    claimed: 18,
    seatsLeft: 6,
    tags: ['Retreat', 'Bali', 'Deep work', 'Recovery', 'Founders'],
    about: [
      'Three days off the grid and above the cliffs, with the people who understand the weight of building something. Mornings are for deep work, afternoons are for recovery, and the evenings are where the real conversation happens, long after the laptops close.',
      'This is not a conference dressed up in linen. There are no badges, no keynotes, no agenda packed so tight you never breathe. Just a small group of founders, a stretch of coastline, and enough space to think clearly for the first time in months.',
      'You will leave rested, a little braver, and holding a few friendships that outlast the trip. Come for the view, stay for the people who quietly change how you see the next year.',
    ],
    agenda: [
      { time: 'Day 1', title: 'Arrival and long table dinner', blurb: 'Settle in, watch the sun drop into the ocean, and meet the room over a slow first meal.', icon: 'plate' },
      { time: 'Day 2', title: 'Deep work and cold water', blurb: 'A focused build morning, then ocean swims and a reset before the evening fireside.', icon: 'glass' },
      { time: 'Day 2', title: 'Fireside under the stars', blurb: 'The honest one. What is actually hard right now, shared with people who get it.', icon: 'mic' },
      { time: 'Day 3', title: 'Plans and goodbyes', blurb: 'Turn three days of clarity into a plan you will keep, then a long lunch before you fly.', icon: 'people' },
    ],
    included: [
      { label: 'Villa and all meals', icon: 'glass' },
      { label: 'The sessions', icon: 'book' },
      { label: 'The people', icon: 'people' },
    ],
    hosts: [
      { name: 'Harvey Jutton', role: 'Cofounder, HeyAmara', avatar: 'https://i.pravatar.cc/120?img=68', bio: 'Hosts the retreat he always wished existed. Half deep work, half deep breath.' },
      { name: 'Noor Hartono', role: 'Retreat lead, HeyAmara', avatar: 'https://i.pravatar.cc/120?img=49', bio: 'Runs the days so you do not have to think about logistics. Knows every quiet corner of the coast.' },
    ],
    attendees: [
      { name: 'Marcus Whitfield', avatar: 'https://i.pravatar.cc/96?img=33' },
      { name: 'Priya Raman', avatar: 'https://i.pravatar.cc/96?img=15' },
      { name: 'Liam OConnor', avatar: 'https://i.pravatar.cc/96?img=58' },
      { name: 'Yuki Tanaka', avatar: 'https://i.pravatar.cc/96?img=26' },
      { name: 'Camila Reyes', avatar: 'https://i.pravatar.cc/96?img=47' },
    ],
    attendeesNote: 'A small group of agency founders trading the desk for three days of altitude.',
    cover: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=2000&q=80',
    coverAlt: 'An infinity pool above the Uluwatu cliffs at dusk',
  },

  {
    // ----- list fields -----
    slug: 'sourcing-sprint',
    title: 'Sourcing Sprint: Boolean to AI Agents',
    featured: false,
    format: 'Workshop',
    locationType: 'online',
    city: 'Online',
    venue: '',
    date: 'Thu 21 Aug 2026',
    dateParts: { weekday: 'Thu', day: '21', monthShort: 'Aug', month: 'August' },
    monthGroup: 'August 2026',
    time: '1:00 PM UTC+10',
    host: { name: 'Dimas Yusuf', avatar: 'https://i.pravatar.cc/120?img=12' },
    image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=900&q=80',
    alt: 'A calm screen of code in a dark workspace',
    blurb: 'Build a sourcing engine live in ninety minutes and walk out with the searches that fill your pipeline by morning.',

    // ----- detail fields -----
    name: 'Sourcing Sprint',
    tagline:
      'Build a sourcing engine live in ninety minutes and walk out with the searches that fill your pipeline by morning.',
    location: {
      venue: 'Live on Zoom',
      area: 'Members link',
      city: 'Join from anywhere',
      note: 'Your join link and the starter templates reach you the moment your seat is confirmed.',
      maps: '',
    },
    capacity: 60,
    claimed: 47,
    seatsLeft: 13,
    tags: ['Workshop', 'Online', 'Sourcing', 'AI agents', 'Hands on'],
    about: [
      'Boolean still works, but it is no longer where the edge lives. This sprint takes you from the strings you already know to the AI agents now doing the heavy searching, and you build the whole thing live, on your own screen, alongside the room.',
      'Dimas runs it as a true working session. Cameras on, hands on the keyboard, no passive watching. By the end you will have a sourcing engine that runs while you sleep and surfaces names your competitors never see.',
      'Come with a role you are struggling to fill. You will leave with a pipeline for it and a system you can point at the next one before morning.',
    ],
    agenda: [
      { time: '1:00 PM', title: 'From strings to systems', blurb: 'A quick honest look at where classic Boolean still wins and where it quietly loses.', icon: 'mic' },
      { time: '1:20 PM', title: 'Build the agent', blurb: 'Screen shared, step by step, you stand up your first sourcing agent from scratch.', icon: 'glass' },
      { time: '2:00 PM', title: 'Pipeline on autopilot', blurb: 'Wire the searches to run on a schedule and feed a clean shortlist every morning.', icon: 'plate' },
      { time: '2:30 PM', title: 'Live troubleshooting', blurb: 'Bring your screen. We fix the search that will not behave, together.', icon: 'people' },
    ],
    included: [
      { label: 'The recording', icon: 'book' },
      { label: 'Starter templates', icon: 'book' },
      { label: 'The members room', icon: 'people' },
    ],
    hosts: [
      { name: 'Dimas Yusuf', role: 'Sourcing lead, HeyAmara', avatar: 'https://i.pravatar.cc/120?img=12', bio: 'Has found the unfindable on six continents. Builds searches the way other people build playlists.' },
    ],
    attendees: [
      { name: 'Hannah Bergstrom', avatar: 'https://i.pravatar.cc/96?img=20' },
      { name: 'Arjun Kapoor', avatar: 'https://i.pravatar.cc/96?img=11' },
      { name: 'Sofia Marchetti', avatar: 'https://i.pravatar.cc/96?img=31' },
      { name: 'Kofi Mensah', avatar: 'https://i.pravatar.cc/96?img=59' },
      { name: 'Lucy Fairfax', avatar: 'https://i.pravatar.cc/96?img=45' },
    ],
    attendeesNote: 'Sourcers and desk leads who would rather build the engine than chase the list.',
    cover: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=2000&q=80',
    coverAlt: 'A calm screen of code in a dark workspace',
  },

  {
    // ----- list fields -----
    slug: 'dubai-sourcing-sprint',
    title: 'Dubai Sourcing Sprint and Desert Dinner',
    featured: false,
    format: 'Dinner',
    locationType: 'place',
    city: 'Dubai, UAE',
    venue: 'DIFC',
    date: 'Fri 12 Sep 2026',
    dateParts: { weekday: 'Fri', day: '12', monthShort: 'Sep', month: 'September' },
    monthGroup: 'September 2026',
    time: '6:00 PM UTC+4',
    host: { name: 'Harvey Jutton', avatar: 'https://i.pravatar.cc/120?img=68' },
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=80',
    alt: 'The Dubai skyline glowing softly at golden hour',
    blurb: 'Dinner and a working session on outbound engines that convert, in the fastest growing recruiting market on earth.',

    // ----- detail fields -----
    name: 'Dubai Sourcing Sprint and Desert Dinner',
    tagline:
      'Dinner and a working session on outbound engines that convert, in the fastest growing recruiting market on earth.',
    location: {
      venue: 'A private room in DIFC',
      area: 'Dubai International Financial Centre',
      city: 'Dubai, UAE',
      note: 'The venue and access details reach you the moment your seat is confirmed.',
      maps: 'https://maps.google.com/?q=DIFC+Dubai',
    },
    capacity: 14,
    claimed: 9,
    seatsLeft: 5,
    tags: ['Dinner', 'Workshop', 'Dubai', 'Outbound', 'Invite only'],
    about: [
      'The Gulf is the fastest growing recruiting market on the planet, and the agencies winning it are building outbound engines that most of the world has not caught up to yet. This evening puts you in the room with them, over a long dinner and a working session that does not pull its punches.',
      'The first half is hands on: real outbound sequences, the numbers behind them, and the small moves that lift reply rates from polite to remarkable. The second half is dinner, where the spreadsheets close and the honest conversation about building here opens up.',
      'Fourteen seats, picked for the quality of the room. Come with your outbound, leave with a sharper version of it and a handful of people worth knowing in the region.',
    ],
    agenda: [
      { time: '6:00 PM', title: 'Arrival at golden hour', blurb: 'Drinks as the skyline lights up, and a soft start before the work begins.', icon: 'glass' },
      { time: '6:30 PM', title: 'Outbound that converts', blurb: 'The real sequences and the numbers, taken apart and rebuilt for the Gulf market.', icon: 'mic' },
      { time: '7:45 PM', title: 'Desert dinner', blurb: 'The spreadsheets close and the long table opens. Where the best ideas of the night land.', icon: 'plate' },
      { time: '9:30 PM', title: 'Open networking', blurb: 'The introductions you came for. Stay as long as the conversation stays good.', icon: 'people' },
    ],
    included: [
      { label: 'Dinner and drinks', icon: 'glass' },
      { label: 'The outbound playbook', icon: 'book' },
      { label: 'The room', icon: 'people' },
    ],
    hosts: [
      { name: 'Harvey Jutton', role: 'Cofounder, HeyAmara', avatar: 'https://i.pravatar.cc/120?img=68', bio: 'Flies in for the rooms worth flying for. Brings the outbound numbers nobody else will show.' },
      { name: 'Layla Haddad', role: 'Founder, Gulf Talent Collective', avatar: 'https://i.pravatar.cc/120?img=27', bio: 'Built one of the sharpest desks in the region from a standing start. Knows exactly what works here.' },
    ],
    attendees: [
      { name: 'Omar Al Farsi', avatar: 'https://i.pravatar.cc/96?img=51' },
      { name: 'Elena Sokolova', avatar: 'https://i.pravatar.cc/96?img=52' },
      { name: 'Rajiv Menon', avatar: 'https://i.pravatar.cc/96?img=13' },
      { name: 'Fatima Noor', avatar: 'https://i.pravatar.cc/96?img=43' },
      { name: 'James Whitmore', avatar: 'https://i.pravatar.cc/96?img=60' },
    ],
    attendeesNote: 'Agency founders and outbound leads building across the Gulf and beyond.',
    cover: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2000&q=80',
    coverAlt: 'The Dubai skyline glowing softly at golden hour',
  },

  {
    // ----- list fields -----
    slug: 'the-founders-forum',
    title: "The Founders' Forum: Scaling Past the Bottleneck",
    featured: false,
    format: 'Forum',
    locationType: 'place',
    city: 'Singapore',
    venue: 'Marina Bay',
    date: 'Thu 25 Sep 2026',
    dateParts: { weekday: 'Thu', day: '25', monthShort: 'Sep', month: 'September' },
    monthGroup: 'September 2026',
    time: '1:00 PM UTC+8',
    host: { name: 'Sasha Bennett', avatar: 'https://i.pravatar.cc/120?img=33' },
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=900&q=80',
    alt: 'An audience seated at a modern forum stage',
    blurb: 'A half day forum on scaling past the founder bottleneck, led by the operators who have already done it.',

    // ----- detail fields -----
    name: "The Founders' Forum",
    tagline:
      'A half day forum on scaling past the founder bottleneck, led by the operators who have already done it.',
    location: {
      venue: 'A Marina Bay event space',
      area: 'Marina Bay',
      city: 'Singapore',
      note: 'The exact venue and your access pass reach you the moment your seat is confirmed.',
      maps: 'https://maps.google.com/?q=Marina+Bay+Singapore',
    },
    capacity: 80,
    claimed: 62,
    seatsLeft: 18,
    tags: ['Forum', 'Singapore', 'Scaling', 'Leadership', 'Operators'],
    about: [
      'Every founder hits the same wall: the business cannot grow past the hours in your own day. This forum is a half day spent entirely on the other side of that wall, with operators who have already walked through it and built agencies that run without them in the room.',
      'It is not a parade of motivational talks. Each session is a real teardown of how someone removed themselves from the critical path: the first hire that mattered, the systems that replaced their judgement, the moments it nearly broke. Honest, specific, and built to be copied.',
      'Eighty seats, one afternoon, and a room full of people facing the same climb. Come with the bottleneck that keeps you up, and leave with a plan to hand it to someone else.',
    ],
    agenda: [
      { time: '1:00 PM', title: 'Doors and coffee', blurb: 'Find your seat, find your people, and settle in before the first teardown begins.', icon: 'glass' },
      { time: '1:30 PM', title: 'The first real hire', blurb: 'Operators on the hire that finally took the business off their own shoulders.', icon: 'mic' },
      { time: '3:00 PM', title: 'Systems over heroics', blurb: 'How to replace founder judgement with process that holds when you step away.', icon: 'people' },
      { time: '5:00 PM', title: 'Rooftop reception', blurb: 'The forum spills onto the rooftop. Drinks, the bay, and the conversations that keep going.', icon: 'plate' },
    ],
    included: [
      { label: 'The full forum', icon: 'book' },
      { label: 'Rooftop reception', icon: 'glass' },
      { label: 'The room', icon: 'people' },
    ],
    hosts: [
      { name: 'Sasha Bennett', role: 'Founder, Apex Talent', avatar: 'https://i.pravatar.cc/120?img=33', bio: 'Scaled Apex to eight figures and out of her own inbox. Teaches the part most founders avoid.' },
      { name: 'Marcus Whitfield', role: 'Operating partner, Northstar', avatar: 'https://i.pravatar.cc/120?img=53', bio: 'Has rebuilt the org charts of a dozen agencies. Lives in the space between founder and machine.' },
    ],
    attendees: [
      { name: 'Mei Lin Tan', avatar: 'https://i.pravatar.cc/96?img=24' },
      { name: 'Priya Raman', avatar: 'https://i.pravatar.cc/96?img=15' },
      { name: 'Daniel Okafor', avatar: 'https://i.pravatar.cc/96?img=8' },
      { name: 'Wei Chen', avatar: 'https://i.pravatar.cc/96?img=56' },
      { name: 'Isabella Rossi', avatar: 'https://i.pravatar.cc/96?img=32' },
    ],
    attendeesNote: 'Founders and operators from across the Asia Pacific, all facing the same bottleneck.',
    cover: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=2000&q=80',
    coverAlt: 'An audience seated at a modern forum stage',
  },
]

// Look up a single rich event by its slug. Returns undefined when not found so
// the detail page can redirect cleanly instead of crashing.
export function getEventBySlug(slug) {
  return events.find((event) => event.slug === slug)
}
