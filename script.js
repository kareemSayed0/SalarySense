const sections = document.querySelectorAll('main section');
const navButtons = document.querySelectorAll('[data-target]');
const chatWindow = document.getElementById('chatWindow');
const chatInput = document.getElementById('chatInput');
const chatSend = document.getElementById('chatSend');
const chatSpeakBtn = document.getElementById('chatSpeak');
const chatSubject = document.getElementById('chatSubject');
const speakInput = document.getElementById('speakInput');
const speakListen = document.getElementById('speakListen');
const speakCheck = document.getElementById('speakCheck');
const speakFeedback = document.getElementById('speakFeedback');
const practiceQuestionEl = document.getElementById('practiceQuestion');
const practiceAnswer = document.getElementById('practiceAnswer');
const practiceSubmit = document.getElementById('practiceSubmit');
const practiceFeedback = document.getElementById('practiceFeedback');
const practiceReport = document.getElementById('practiceReport');
const matchPairs = document.getElementById('matchPairs');
const quickMathQuestion = document.getElementById('quickMathQuestion');
const quickMathAnswer = document.getElementById('quickMathAnswer');
const quickMathSubmit = document.getElementById('quickMathSubmit');
const quickMathTimer = document.getElementById('quickMathTimer');
const quickMathScore = document.getElementById('quickMathScore');
const scrambledWord = document.getElementById('scrambledWord');
const wordBuilderAnswer = document.getElementById('wordBuilderAnswer');
const wordBuilderSubmit = document.getElementById('wordBuilderSubmit');
const wordBuilderFeedback = document.getElementById('wordBuilderFeedback');
const flashcardCategory = document.getElementById('flashcardCategory');
const flashEmoji = document.getElementById('flashEmoji');
const flashWord = document.getElementById('flashWord');
const flashSentence = document.getElementById('flashSentence');
const flashSpeak = document.getElementById('flashSpeak');
const nextFlashcard = document.getElementById('nextFlashcard');
const progressSummary = document.getElementById('progressSummary');
const adminQuestion = document.getElementById('adminQuestion');
const adminAnswer = document.getElementById('adminAnswer');
const adminSubject = document.getElementById('adminSubject');
const adminAddQuestion = document.getElementById('adminAddQuestion');
const adminVocab = document.getElementById('adminVocab');
const adminMeaning = document.getElementById('adminMeaning');
const adminAddVocab = document.getElementById('adminAddVocab');
const adminFlashWord = document.getElementById('adminFlashWord');
const adminFlashSentence = document.getElementById('adminFlashSentence');
const adminFlashEmoji = document.getElementById('adminFlashEmoji');
const adminFlashCategory = document.getElementById('adminFlashCategory');
const adminAddFlash = document.getElementById('adminAddFlash');
const adminLesson = document.getElementById('adminLesson');
const adminAddLesson = document.getElementById('adminAddLesson');
const adminApiKey = document.getElementById('adminApiKey');
const adminSaveApi = document.getElementById('adminSaveApi');
const adminApiStatus = document.getElementById('adminApiStatus');
const adminProgress = document.getElementById('adminProgress');
const subjectContent = document.getElementById('subjectContent');
const toast = document.getElementById('toast');
const music = document.getElementById('bg-music');
const musicToggle = document.getElementById('musicToggle');
const profiles = document.getElementById('profiles');
const activeProfile = document.getElementById('activeProfile');

const state = {
  profile: localStorage.getItem('rlb_profile') || 'Bebo',
  progress: JSON.parse(localStorage.getItem('rlb_progress') || '{"total":0,"correct":0,"stars":0,"subjects":{}}'),
  practice: { current: 0, correct: 0, set: [] },
  lessons: JSON.parse(localStorage.getItem('rlb_lessons') || '[]'),
  vocab: JSON.parse(localStorage.getItem('rlb_vocab') || '[]'),
  flashcards: JSON.parse(localStorage.getItem('rlb_flashcards') || '[]'),
  chatHistory: JSON.parse(localStorage.getItem('rlb_chat') || '[]'),
};

const safeWords = ['violence', 'harm', 'weapon', 'drugs', 'hate'];
const lessonBank = {
  Math: 'Use friendly numbers, number lines, and colorful blocks to explain adding, subtracting, measuring units, multiplication and fractions.',
  English: 'Practice nouns, verbs, adjectives, spelling, and small reading passages.',
  Arabic: 'استخدم كلمات بسيطة وجمل قصيرة مع أمثلة من الحياة اليومية. ركز على المفرد والجمع والتذكير والتأنيث.',
  Science: 'Explain plants, animals, food chains, the sun and moon, the water cycle, and simple experiments safely.',
  'Social Studies': 'Talk about community helpers, maps, directions, and kind citizenship.',
  'General Knowledge': 'Fun facts about space, countries, seasons, and good manners.'
};

const defaultQuestions = [
  { q: '5 + 3 = ?', a: '8', subject: 'Math' },
  { q: '10 - 6 = ?', a: '4', subject: 'Math' },
  { q: 'What is 2 x 4?', a: '8', subject: 'Math' },
  { q: 'Name a noun in this sentence: The cat sleeps.', a: 'cat', subject: 'English' },
  { q: 'Spell the word for a baby dog.', a: 'puppy', subject: 'Reading & Spelling' },
  { q: 'Which is a verb: jump or red?', a: 'jump', subject: 'Grammar' },
  { q: 'How many centimeters are in 1 meter?', a: '100', subject: 'Measuring units' },
  { q: 'What star lights our Earth?', a: 'sun', subject: 'Science' },
  { q: 'Name the planet we live on.', a: 'earth', subject: 'Science' },
  { q: 'Who delivers letters? (community helper)', a: 'mail carrier', subject: 'Social Studies' },
  { q: 'Translate to Arabic: book', a: 'كتاب', subject: 'Arabic' },
];

let questionBank = JSON.parse(localStorage.getItem('rlb_questions') || 'null') || [...defaultQuestions];

const matchData = [
  { word: 'sun', emoji: '🌞' },
  { word: 'tree', emoji: '🌳' },
  { word: 'moon', emoji: '🌙' },
  { word: 'cat', emoji: '🐱' },
  { word: 'fish', emoji: '🐠' },
  { word: 'rain', emoji: '🌧️' },
];

const wordBuilderWords = ['planet', 'school', 'pencil', 'water', 'flower'];

const flashcardData = {
  english: [
    { word: 'Happy', sentence: 'I feel happy when I play.', emoji: '😊' },
    { word: 'Brave', sentence: 'The brave kid tried again.', emoji: '🦁' },
  ],
  arabic: [
    { word: 'شمس', sentence: 'الشمس دافئة.', emoji: '🌞' },
    { word: 'قمر', sentence: 'القمر يضيء الليل.', emoji: '🌙' },
  ],
  science: [
    { word: 'Plant', sentence: 'Plants need sun and water.', emoji: '🌱' },
    { word: 'Water Cycle', sentence: 'Water goes up as vapor and falls as rain.', emoji: '💧' },
  ],
  basics: [
    { word: 'Circle', sentence: 'A coin is a circle.', emoji: '⚪' },
    { word: 'Red', sentence: 'Apples can be red.', emoji: '🍎' },
    { word: 'Lion', sentence: 'The lion is the king of the jungle.', emoji: '🦁' },
  ],
  math: [
    { word: '2 x 5', sentence: 'Two groups of five make ten.', emoji: '🔢' },
    { word: '3 x 4', sentence: 'Three groups of four make twelve.', emoji: '🔢' },
  ],
};

function showSection(id) {
  sections.forEach((sec) => sec.classList.add('hidden'));
  const target = document.getElementById(id);
  if (target) target.classList.remove('hidden');
  if (id === 'practice') startPractice();
  if (id === 'games') startMatching();
  if (id === 'progress') renderProgress();
  if (id !== 'games') stopQuickMath();
}

navButtons.forEach((btn) => {
  btn.addEventListener('click', () => showSection(btn.dataset.target));
});

function addMessage(text, type = 'ai') {
  const div = document.createElement('div');
  div.className = `message ${type}`;
  div.textContent = text;
  chatWindow.appendChild(div);
  chatWindow.scrollTop = chatWindow.scrollHeight;
  state.chatHistory.push({ text, type });
  localStorage.setItem('rlb_chat', JSON.stringify(state.chatHistory.slice(-50)));
}

function safeCheck(text) {
  return safeWords.some((bad) => text.toLowerCase().includes(bad));
}

async function callAI(userMessage, subject) {
  const apiKey = localStorage.getItem('openai_key') || 'YOUR_API_KEY_HERE';
  const systemPrompt = `You are Rainbow Learning Buddy, a safe, kind tutor for grades 1-4. Always reply in two parts: 1) short Egyptian Arabic answer for a child, 2) short English explanation. Use emojis and kid-friendly steps. Never give full homework answers—guide gently and ask a question back. Keep content safe for kids. Subject focus: ${subject}.`;
  const messages = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: userMessage },
  ];

  if (apiKey === 'YOUR_API_KEY_HERE') {
    return 'إجابة سريعة: لنخمن معًا! ✨\nEnglish: I need an API key to answer for real. Try asking: What is the water cycle?';
  }

  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4.1-mini',
        messages,
        max_tokens: 280,
        temperature: 0.6,
      }),
    });
    const data = await res.json();
    const text = data.choices?.[0]?.message?.content || 'No response yet.';
    return text;
  } catch (e) {
    console.error(e);
    return 'Oops! I had trouble reaching the AI. Can you try again?';
  }
}

function speak(text) {
  if (!('speechSynthesis' in window)) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = 'en-US';
  speechSynthesis.speak(utter);
}

chatSend.addEventListener('click', async () => {
  const msg = chatInput.value.trim();
  if (!msg) return;
  if (safeCheck(msg)) {
    addMessage('This topic is not safe for kids. Ask something else. 🚫', 'ai');
    return;
  }
  addMessage(msg, 'me');
  chatInput.value = '';
  addMessage('Thinking... 🤔', 'ai');
  const reply = await callAI(msg, chatSubject.value);
  chatWindow.lastChild.textContent = reply;
  const englishPart = reply.split('English:')[1];
  if (englishPart) speak(englishPart);
  updateProgress(chatSubject.value, true);
});

chatInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') chatSend.click();
});

chatSpeakBtn.addEventListener('click', () => {
  if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
    alert('Speech recognition not supported in this browser.');
    return;
  }
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  const rec = new SR();
  rec.lang = 'en-US';
  rec.onresult = (e) => {
    chatInput.value = e.results[0][0].transcript;
  };
  rec.start();
});

speakListen.addEventListener('click', () => {
  if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
    speakFeedback.textContent = 'Microphone not supported here. Try typing a word!';
    return;
  }
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  const rec = new SR();
  rec.lang = 'en-US';
  rec.onresult = (e) => {
    speakInput.value = e.results[0][0].transcript;
    givePronunciationFeedback();
  };
  rec.start();
});

speakCheck.addEventListener('click', givePronunciationFeedback);

function givePronunciationFeedback() {
  const word = speakInput.value.trim();
  if (!word) return;
  const slow = word.split('').join('-').toUpperCase();
  speak(`Say it like: ${word}`);
  speakFeedback.textContent = `Great! Try again: ${word}. If tricky, say it slowly like ${slow}.`;
}

// Subject content rendering
const subjectLessons = {
  Math: {
    intro: 'Adding, subtracting, measuring units, multiplication tables, and simple fractions.',
    example: 'Example: 12 cm = 120 mm. Let’s count tens together!',
  },
  English: {
    intro: 'Grammar (nouns, verbs, adjectives), reading & spelling, vocabulary.',
    example: 'Example: Verb = action word. "Jump" is a verb.',
  },
  Arabic: {
    intro: 'حروف الهجاء، كلمات بسيطة، مفرد/جمع، مذكر/مؤنث.',
    example: 'مثال: ولد (مذكر) - بنت (مؤنث).',
  },
  Science: {
    intro: 'Plants, animals, food chain, sun & moon, water cycle.',
    example: 'Example: The sun gives plants energy to make food.',
  },
  'Social Studies': {
    intro: 'Maps, directions, community helpers, being a kind citizen.',
    example: 'Example: The nurse helps people get better.',
  },
  'General Knowledge': {
    intro: 'Fun facts about the world, seasons, space, and safety.',
    example: 'Example: Earth has 7 continents!',
  },
};

function renderSubjectContent(sub) {
  const data = subjectLessons[sub];
  const customLessons = state.lessons.map((l) => `<li>${l}</li>`).join('');
  subjectContent.innerHTML = `
    <h3>${sub}</h3>
    <p>${data?.intro || 'Let us learn together!'}</p>
    <p class="example">${data?.example || ''}</p>
    <h4>Practice Question</h4>
    <p class="practice-question">${pickPracticeQuestion(sub)}</p>
    <h4>Parent Lessons</h4>
    <ul>${customLessons || '<li>No custom lessons yet.</li>'}</ul>
    <button class="big-btn" id="subjectAsk">Ask AI for a quick lesson</button>
    <div id="subjectAI" class="hint">AI will give a simple Arabic + English tip.</div>
  `;
  const askBtn = document.getElementById('subjectAsk');
  const aiBox = document.getElementById('subjectAI');
  askBtn.addEventListener('click', async () => {
    aiBox.textContent = 'Thinking with AI...';
    const reply = await callAI(`Explain ${sub} to a grade 3 kid with an example.`, sub);
    aiBox.textContent = reply;
  });
}

document.querySelectorAll('.subject-btn').forEach((btn) => {
  btn.addEventListener('click', () => renderSubjectContent(btn.dataset.subject));
});

// Practice mode
function startPractice() {
  if (!questionBank.length) {
    practiceQuestionEl.textContent = 'Add questions in the Parent Admin to begin practice.';
    practiceAnswer.value = '';
    practiceFeedback.textContent = '';
    practiceReport.textContent = '';
    return;
  }
  state.practice.correct = 0;
  state.practice.current = 0;
  state.practice.set = shuffle([...questionBank]).slice(0, 5);
  practiceReport.textContent = '';
  showPracticeQuestion();
}

function showPracticeQuestion() {
  const current = state.practice.set[state.practice.current];
  if (!current) {
    practiceQuestionEl.textContent = 'All done!';
    practiceFeedback.textContent = '';
    practiceReport.textContent = `You answered ${state.practice.correct}/5 correctly. Great job!`;
    updateProgress('Daily Practice', true, state.practice.correct);
    return;
  }
  practiceQuestionEl.textContent = `${state.practice.current + 1}/5 • ${current.subject}: ${current.q}`;
  practiceAnswer.value = '';
  practiceFeedback.textContent = '';
}

practiceSubmit.addEventListener('click', () => {
  const ans = practiceAnswer.value.trim().toLowerCase();
  const current = state.practice.set[state.practice.current];
  if (!current) return;
  const correct = ans === current.a.toLowerCase();
  practiceFeedback.textContent = correct ? 'Correct! ⭐' : 'Try again!';
  if (correct) {
    state.practice.correct += 1;
    updateProgress(current.subject, true);
    showToast();
  }
  state.practice.current += 1;
  showPracticeQuestion();
});

// Games: Matching
function startMatching() {
  matchPairs.innerHTML = '';
  const items = shuffle([...matchData, ...matchData]);
  let openCard = null;
  items.forEach((item, idx) => {
    const card = document.createElement('div');
    card.className = 'pair-card';
    card.dataset.value = item.word + item.emoji;
    card.innerHTML = `<strong>${idx % 2 === 0 ? item.word : item.emoji}</strong>`;
    card.addEventListener('click', () => {
      if (card.classList.contains('matched')) return;
      card.classList.add('active');
      if (!openCard) {
        openCard = card;
      } else {
        if (openCard.dataset.value === card.dataset.value && openCard !== card) {
          openCard.classList.add('matched');
          card.classList.add('matched');
          updateProgress('Games', true);
          showToast();
        }
        setTimeout(() => {
          card.classList.remove('active');
          openCard?.classList.remove('active');
          openCard = null;
        }, 700);
      }
    });
    matchPairs.appendChild(card);
  });
}

// Games: Quick Math
let quickMathTime = 20;
let quickMathInterval;
let quickMathCurrent;
let quickScore = 0;

function startQuickMath() {
  quickMathTime = 20;
  quickScore = 0;
  quickMathTimer.textContent = quickMathTime;
  quickMathScore.textContent = `Score: ${quickScore}`;
  nextQuickMath();
  stopQuickMath();
  quickMathInterval = setInterval(() => {
    quickMathTime -= 1;
    quickMathTimer.textContent = quickMathTime;
    if (quickMathTime <= 0) stopQuickMath();
  }, 1000);
}

function stopQuickMath() {
  if (quickMathInterval) {
    clearInterval(quickMathInterval);
    quickMathInterval = null;
  }
}

function nextQuickMath() {
  const a = Math.floor(Math.random() * 10);
  const b = Math.floor(Math.random() * 10);
  quickMathCurrent = a + b;
  quickMathQuestion.textContent = `${a} + ${b} = ?`;
  quickMathAnswer.value = '';
}

quickMathSubmit.addEventListener('click', () => {
  if (quickMathTime <= 0) return;
  const ans = Number(quickMathAnswer.value);
  if (ans === quickMathCurrent) {
    quickScore += 1;
    quickMathScore.textContent = `Score: ${quickScore}`;
    updateProgress('Quick Math', true);
    showToast();
  }
  nextQuickMath();
});

// Games: Word builder
let currentWord = '';
function startWordBuilder() {
  currentWord = wordBuilderWords[Math.floor(Math.random() * wordBuilderWords.length)];
  scrambledWord.textContent = shuffle(currentWord.split('')).join(' ');
  wordBuilderAnswer.value = '';
}

wordBuilderSubmit.addEventListener('click', () => {
  if (wordBuilderAnswer.value.trim().toLowerCase() === currentWord) {
    wordBuilderFeedback.textContent = 'Correct! ⭐';
    updateProgress('Word Builder', true);
    showToast();
    startWordBuilder();
  } else {
    wordBuilderFeedback.textContent = 'Almost! Try again.';
  }
});

// Tabs
const tabs = document.querySelectorAll('.tab');
tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach((t) => t.classList.remove('active'));
    document.querySelectorAll('.tab-pane').forEach((p) => p.classList.add('hidden'));
    tab.classList.add('active');
    document.getElementById(tab.dataset.tab).classList.remove('hidden');
    if (tab.dataset.tab === 'quickmath') startQuickMath();
    else stopQuickMath();
    if (tab.dataset.tab === 'wordbuilder') startWordBuilder();
  });
});

// Flashcards
let flashIndex = 0;
function renderFlashcard() {
  const list = [...flashcardData[flashcardCategory.value], ...state.flashcards.filter(f => f.category === flashcardCategory.value)];
  if (!list.length) return;
  const item = list[flashIndex % list.length];
  flashEmoji.textContent = item.emoji;
  flashWord.textContent = item.word;
  flashSentence.textContent = item.sentence;
  flashIndex += 1;
}

nextFlashcard.addEventListener('click', renderFlashcard);
flashcardCategory.addEventListener('change', () => { flashIndex = 0; renderFlashcard(); });
flashSpeak.addEventListener('click', () => speak(flashWord.textContent));

// Progress
function updateProgress(subject, correct, amount = 1) {
  state.progress.total += amount;
  if (correct) state.progress.correct += amount;
  state.progress.stars += correct ? 1 : 0;
  if (!state.progress.subjects[subject]) state.progress.subjects[subject] = { total: 0, correct: 0 };
  state.progress.subjects[subject].total += amount;
  state.progress.subjects[subject].correct += correct ? amount : 0;
  localStorage.setItem('rlb_progress', JSON.stringify(state.progress));
  renderProgress();
  updateAdminProgress();
}

function renderProgress() {
  progressSummary.innerHTML = '';
  if (!Object.keys(state.progress.subjects).length) {
    progressSummary.innerHTML = '<p class="hint">Play games or answer practice questions to see progress here!</p>';
    return;
  }
  Object.entries(state.progress.subjects).forEach(([sub, data]) => {
    const pct = data.total ? Math.round((data.correct / data.total) * 100) : 0;
    const div = document.createElement('div');
    div.className = 'progress-item';
    div.innerHTML = `
      <div class="progress-title">${sub}</div>
      <div class="bar"><div class="bar-inner" style="width:${pct}%"></div></div>
      <small>${data.correct}/${data.total} correct • Stars: ${state.progress.stars}</small>
    `;
    progressSummary.appendChild(div);
  });
}

// Admin
adminAddQuestion.addEventListener('click', () => {
  if (!adminQuestion.value || !adminAnswer.value) return;
  questionBank.push({ q: adminQuestion.value, a: adminAnswer.value, subject: adminSubject.value });
  persistQuestions();
  adminQuestion.value = adminAnswer.value = '';
});

adminAddVocab.addEventListener('click', () => {
  if (!adminVocab.value) return;
  state.vocab.push({ word: adminVocab.value, meaning: adminMeaning.value });
  adminVocab.value = adminMeaning.value = '';
  localStorage.setItem('rlb_vocab', JSON.stringify(state.vocab));
});

adminAddFlash.addEventListener('click', () => {
  if (!adminFlashWord.value) return;
  state.flashcards.push({
    word: adminFlashWord.value,
    sentence: adminFlashSentence.value,
    emoji: adminFlashEmoji.value || '⭐',
    category: adminFlashCategory.value,
  });
  localStorage.setItem('rlb_flashcards', JSON.stringify(state.flashcards));
  adminFlashWord.value = adminFlashSentence.value = adminFlashEmoji.value = '';
});

adminAddLesson.addEventListener('click', () => {
  if (!adminLesson.value) return;
  state.lessons.push(adminLesson.value);
  localStorage.setItem('rlb_lessons', JSON.stringify(state.lessons));
  adminLesson.value = '';
});

adminSaveApi.addEventListener('click', () => {
  if (!adminApiKey.value.trim()) {
    adminApiStatus.textContent = 'Please enter a key first.';
    return;
  }
  localStorage.setItem('openai_key', adminApiKey.value.trim());
  adminApiStatus.textContent = 'API key saved to this device ✔️';
  adminApiKey.value = '';
});

function updateAdminProgress() {
  adminProgress.textContent = JSON.stringify(state.progress, null, 2);
}

function persistQuestions() {
  localStorage.setItem('rlb_questions', JSON.stringify(questionBank));
}

// Utils
function shuffle(arr) {
  return arr
    .map((a) => ({ sort: Math.random(), value: a }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value);
}

function pickPracticeQuestion(sub) {
  if (!questionBank.length) return 'Add a question to get started!';
  const found = questionBank.find((q) => q.subject === sub) || questionBank[0];
  return `${found.q}`;
}

function showToast() {
  toast.classList.remove('hidden');
  toast.classList.add('show');
  setTimeout(() => toast.classList.add('hidden'), 1200);
}

// Music
music.volume = 0.25;
musicToggle.addEventListener('click', () => {
  if (music.paused) {
    music.play();
    musicToggle.textContent = '⏸️';
  } else {
    music.pause();
    musicToggle.textContent = '🎵';
  }
});

// Profiles
profiles.querySelectorAll('.chip').forEach((chip) => {
  if (chip.dataset.profile === state.profile) chip.classList.add('active');
  chip.addEventListener('click', () => {
    profiles.querySelectorAll('.chip').forEach((c) => c.classList.remove('active'));
    chip.classList.add('active');
    state.profile = chip.dataset.profile;
    activeProfile.textContent = `Active: ${state.profile}`;
    localStorage.setItem('rlb_profile', state.profile);
  });
});

// Initial load
state.chatHistory.forEach((m) => addMessage(m.text, m.type));
renderFlashcard();
renderProgress();
startMatching();
startQuickMath();
startWordBuilder();
updateAdminProgress();
showSection('home');
if (localStorage.getItem('openai_key')) adminApiStatus.textContent = 'API key saved to this device ✔️';
