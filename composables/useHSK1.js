// HSK 1 — based on HSK Standard Course 1 (姜丽萍, 15 lessons).
// Each lesson holds: title (han + pinyin + en), grammar focus, multiple texts
// (situational dialogues), grammar notes (notes), and the new-words list (vocab).
// Sourced strictly from the HSK 1 Standard Course textbook.

export const HSK1_META = {
  han: '一',
  title: 'HSK 1',
  subtitle: 'Standard Course · 15 lessons',
  intro:
    'First steps in Mandarin. Greetings, numbers, family, time, and the basic 主+谓+宾 sentence frame — following the HSK Standard Course 1 (姜丽萍).',
  accent: '#c8a84b',
}

export const HSK1_LESSONS = [
  // ─────────────────────────────────────────── Lesson 1 ───────────────────────────────────────────
  {
    no: 1,
    han: '你好',
    pinyin: 'Nǐ hǎo',
    en: 'Hello',
    focus: 'Greetings · personal pronouns',
    texts: [
      {
        title: 'Hello',
        lines: [
          { s: 'A', c: '你好！', p: 'Nǐ hǎo!', en: 'Hello!' },
          { s: 'B', c: '你好！', p: 'Nǐ hǎo!', en: 'Hello!' },
        ],
      },
      {
        title: 'Greeting in plural / polite form',
        lines: [
          { s: 'A', c: '您好！', p: 'Nín hǎo!', en: 'Hello!' },
          { s: 'B', c: '你们好！', p: 'Nǐmen hǎo!', en: 'Hello (to everyone)!' },
        ],
      },
      {
        title: 'Apology',
        lines: [
          { s: 'A', c: '对不起！', p: 'Duìbuqǐ!', en: 'I’m sorry!' },
          { s: 'B', c: '没关系！', p: 'Méi guānxi!', en: 'That’s OK!' },
        ],
      },
    ],
    notes: [
      {
        title: 'Tone Sandhi: 3rd tone + 3rd tone',
        summary:
          'When two third-tone syllables are read in sequence, the first turns into the second tone (3+3 → 2+3). The written tone marks stay unchanged.',
        examples: [
          { c: '你好', p: 'nǐ hǎo → ní hǎo', en: 'hello' },
          { c: '可以', p: 'kě yǐ → ké yǐ', en: 'may · can' },
        ],
      },
    ],
    vocab: [
      { c: '你', p: 'nǐ', pos: 'pron.', en: 'you (singular)' },
      { c: '好', p: 'hǎo', pos: 'adj.', en: 'good · fine' },
      { c: '您', p: 'nín', pos: 'pron.', en: 'you (polite)' },
      { c: '你们', p: 'nǐmen', pos: 'pron.', en: 'you (plural)' },
      { c: '对不起', p: 'duìbuqǐ', pos: 'v.', en: 'to be sorry' },
      { c: '没关系', p: 'méi guānxi', pos: 'expr.', en: 'that’s OK · it doesn’t matter' },
    ],
  },

  // ─────────────────────────────────────────── Lesson 2 ───────────────────────────────────────────
  {
    no: 2,
    han: '谢谢',
    pinyin: 'Xièxie',
    en: 'Thank you',
    focus: 'Polite phrases · negation 不',
    texts: [
      {
        title: 'Thank you',
        lines: [
          { s: 'A', c: '谢谢！', p: 'Xièxie!', en: 'Thank you!' },
          { s: 'B', c: '不谢！', p: 'Bú xiè!', en: 'Sure!' },
        ],
      },
      {
        title: 'You’re welcome',
        lines: [
          { s: 'A', c: '谢谢你！', p: 'Xièxie nǐ!', en: 'Thank you!' },
          { s: 'B', c: '不客气！', p: 'Bú kèqi!', en: 'You’re welcome!' },
        ],
      },
      {
        title: 'Goodbye',
        lines: [
          { s: 'A', c: '再见！', p: 'Zàijiàn!', en: 'Goodbye!' },
          { s: 'B', c: '再见！', p: 'Zàijiàn!', en: 'Bye!' },
        ],
      },
    ],
    notes: [
      {
        title: 'The Neutral Tone',
        summary:
          'Apart from the four basic tones, some Chinese syllables are pronounced short and light — the so-called neutral tone. It is unmarked in pinyin.',
        examples: [
          { c: '妈妈', p: 'māma', en: 'mother' },
          { c: '谢谢', p: 'xièxie', en: 'thanks' },
        ],
      },
    ],
    vocab: [
      { c: '谢谢', p: 'xièxie', pos: 'v.', en: 'to thank · thanks' },
      { c: '不', p: 'bù', pos: 'adv.', en: 'no · not' },
      { c: '不客气', p: 'bú kèqi', pos: 'expr.', en: 'you’re welcome' },
      { c: '再见', p: 'zàijiàn', pos: 'v.', en: 'goodbye' },
    ],
  },

  // ─────────────────────────────────────────── Lesson 3 ───────────────────────────────────────────
  {
    no: 3,
    han: '你叫什么名字',
    pinyin: 'Nǐ jiào shénme míngzi',
    en: 'What is your name',
    focus: 'Interrogative pronoun 什么 · the 是 sentence · question particle 吗',
    texts: [
      {
        title: 'In the school',
        lines: [
          { s: 'A', c: '你叫什么名字？', p: 'Nǐ jiào shénme míngzi?', en: 'What’s your name?' },
          { s: 'B', c: '我叫李月。', p: 'Wǒ jiào Lǐ Yuè.', en: 'My name is Li Yue.' },
        ],
      },
      {
        title: 'In the classroom',
        lines: [
          { s: 'A', c: '你是老师吗？', p: 'Nǐ shì lǎoshī ma?', en: 'Are you a teacher?' },
          { s: 'B', c: '我不是老师，我是学生。', p: 'Wǒ bú shì lǎoshī, wǒ shì xuésheng.', en: 'No, I’m not. I’m a student.' },
        ],
      },
      {
        title: 'At the office',
        lines: [
          { s: 'A', c: '你是中国人吗？', p: 'Nǐ shì Zhōngguó rén ma?', en: 'Are you Chinese?' },
          { s: 'B', c: '我不是中国人，我是美国人。', p: 'Wǒ bú shì Zhōngguó rén, wǒ shì Měiguó rén.', en: 'No, I’m not. I’m American.' },
        ],
      },
    ],
    notes: [
      {
        title: 'The Interrogative Pronoun 什么',
        summary:
          '什么 is used in questions to ask about identity or things. It can stand alone as the object or modify a following noun.',
        examples: [
          { c: '你叫什么？', p: 'Nǐ jiào shénme?', en: 'What are you called?' },
          { c: '这是什么书？', p: 'Zhè shì shénme shū?', en: 'What book is this?' },
        ],
      },
      {
        title: 'The 是 Sentence',
        summary:
          'A 是 sentence is a determinative sentence that equates the subject with the predicate noun. The negative form is made by placing 不 before 是.',
        examples: [
          { c: '我是学生。', p: 'Wǒ shì xuésheng.', en: 'I am a student.' },
          { c: '她不是老师。', p: 'Tā bú shì lǎoshī.', en: 'She is not a teacher.' },
        ],
      },
      {
        title: 'Interrogative Sentences with 吗',
        summary:
          'The particle 吗 indicates an interrogative mood. Adding 吗 at the end of a declarative sentence turns it into a yes/no question.',
        examples: [
          { c: '你是老师吗？', p: 'Nǐ shì lǎoshī ma?', en: 'Are you a teacher?' },
          { c: '他是学生吗？', p: 'Tā shì xuésheng ma?', en: 'Is he a student?' },
        ],
      },
    ],
    vocab: [
      { c: '叫', p: 'jiào', pos: 'v.', en: 'to call · be called' },
      { c: '什么', p: 'shénme', pos: 'pron.', en: 'what' },
      { c: '名字', p: 'míngzi', pos: 'n.', en: 'name' },
      { c: '我', p: 'wǒ', pos: 'pron.', en: 'I · me' },
      { c: '是', p: 'shì', pos: 'v.', en: 'to be' },
      { c: '老师', p: 'lǎoshī', pos: 'n.', en: 'teacher' },
      { c: '吗', p: 'ma', pos: 'part.', en: '(yes/no question particle)' },
      { c: '学生', p: 'xuésheng', pos: 'n.', en: 'student' },
      { c: '人', p: 'rén', pos: 'n.', en: 'human · person' },
      { c: '中国', p: 'Zhōngguó', pos: 'n.', en: 'China' },
      { c: '美国', p: 'Měiguó', pos: 'n.', en: 'the United States' },
    ],
  },

  // ─────────────────────────────────────────── Lesson 4 ───────────────────────────────────────────
  {
    no: 4,
    han: '她是我的汉语老师',
    pinyin: 'Tā shì wǒ de Hànyǔ lǎoshī',
    en: 'She is my Chinese teacher',
    focus: 'Interrogative pronouns 谁 / 哪 · structural particle 的 · particle 呢',
    texts: [
      {
        title: 'In the classroom',
        lines: [
          { s: 'A', c: '她是谁？', p: 'Tā shì shéi?', en: 'Who is she?' },
          { s: 'B', c: '她是我的汉语老师。她叫李月。', p: 'Tā shì wǒ de Hànyǔ lǎoshī. Tā jiào Lǐ Yuè.', en: 'She is my Chinese teacher. Her name is Li Yue.' },
        ],
      },
      {
        title: 'In the library',
        lines: [
          { s: 'A', c: '你是哪国人？', p: 'Nǐ shì nǎ guó rén?', en: 'Which country are you from?' },
          { s: 'B', c: '我是美国人。你呢？', p: 'Wǒ shì Měiguó rén. Nǐ ne?', en: 'I am American. What about you?' },
          { s: 'A', c: '我是中国人。', p: 'Wǒ shì Zhōngguó rén.', en: 'I am Chinese.' },
        ],
      },
      {
        title: 'At a coffee shop',
        lines: [
          { s: 'A', c: '他是谁？', p: 'Tā shì shéi?', en: 'Who is he?' },
          { s: 'B', c: '他是我的同学。', p: 'Tā shì wǒ de tóngxué.', en: 'He is my classmate.' },
          { s: 'A', c: '她呢？她是你的同学吗？', p: 'Tā ne? Tā shì nǐ de tóngxué ma?', en: 'What about her? Is she your classmate?' },
          { s: 'B', c: '她不是我的同学，她是我的朋友。', p: 'Tā bú shì wǒ de tóngxué, tā shì wǒ de péngyou.', en: 'No, she isn’t. She is my friend.' },
        ],
      },
    ],
    notes: [
      {
        title: 'The Interrogative Pronouns 谁 and 哪',
        summary:
          '谁 (shéi) asks about a person’s identity. 哪 (nǎ) is used together with a measure word or noun to ask “which”.',
        examples: [
          { c: '他是谁？', p: 'Tā shì shéi?', en: 'Who is he?' },
          { c: '你是哪国人？', p: 'Nǐ shì nǎ guó rén?', en: 'Which country are you from?' },
        ],
      },
      {
        title: 'The Structural Particle 的',
        summary:
          '的 marks possession or attribution between a pronoun/noun and a following noun. 的 is often omitted with kinship terms or close relations.',
        examples: [
          { c: '我的老师', p: 'wǒ de lǎoshī', en: 'my teacher' },
          { c: '他朋友', p: 'tā péngyou', en: 'his friend (omitted 的)' },
        ],
      },
      {
        title: 'The Interrogative Particle 呢 (1)',
        summary:
          '呢 placed after a noun or pronoun asks about the previously mentioned situation: “A …, B 呢?”',
        examples: [
          { c: '我是老师。你呢？', p: 'Wǒ shì lǎoshī. Nǐ ne?', en: 'I’m a teacher. What about you?' },
        ],
      },
    ],
    vocab: [
      { c: '她', p: 'tā', pos: 'pron.', en: 'she · her' },
      { c: '他', p: 'tā', pos: 'pron.', en: 'he · him' },
      { c: '谁', p: 'shéi', pos: 'pron.', en: 'who · whom' },
      { c: '的', p: 'de', pos: 'part.', en: '(possessive · attributive)' },
      { c: '汉语', p: 'Hànyǔ', pos: 'n.', en: 'Chinese (language)' },
      { c: '哪', p: 'nǎ', pos: 'pron.', en: 'which' },
      { c: '国', p: 'guó', pos: 'n.', en: 'country' },
      { c: '呢', p: 'ne', pos: 'part.', en: '(question particle)' },
      { c: '同学', p: 'tóngxué', pos: 'n.', en: 'classmate' },
      { c: '朋友', p: 'péngyou', pos: 'n.', en: 'friend' },
    ],
  },

  // ─────────────────────────────────────────── Lesson 5 ───────────────────────────────────────────
  {
    no: 5,
    han: '她女儿今年20岁',
    pinyin: 'Tā nǚ’ér jīnnián èrshí suì',
    en: 'Her daughter is 20 years old this year',
    focus: 'Interrogative pronoun 几 · numbers below 100 · particle 了 indicating change',
    texts: [
      {
        title: 'In the school',
        lines: [
          { s: 'A', c: '你家有几口人？', p: 'Nǐ jiā yǒu jǐ kǒu rén?', en: 'How many people are in your family?' },
          { s: 'B', c: '我家有三口人。', p: 'Wǒ jiā yǒu sān kǒu rén.', en: 'There are three people in my family.' },
        ],
      },
      {
        title: 'In the office',
        lines: [
          { s: 'A', c: '你女儿几岁了？', p: 'Nǐ nǚ’ér jǐ suì le?', en: 'How old is your daughter?' },
          { s: 'B', c: '她今年四岁了。', p: 'Tā jīnnián sì suì le.', en: 'She is four years old this year.' },
        ],
      },
      {
        title: 'At home',
        lines: [
          { s: 'A', c: '李老师多大了？', p: 'Lǐ lǎoshī duō dà le?', en: 'How old is Professor Li?' },
          { s: 'B', c: '她今年五十岁了。', p: 'Tā jīnnián wǔshí suì le.', en: 'She is 50 years old this year.' },
          { s: 'A', c: '她女儿呢？', p: 'Tā nǚ’ér ne?', en: 'What about her daughter?' },
          { s: 'B', c: '她女儿今年20岁。', p: 'Tā nǚ’ér jīnnián èrshí suì.', en: 'Her daughter is 20 years old this year.' },
        ],
      },
    ],
    notes: [
      {
        title: 'The Interrogative Pronoun 几',
        summary:
          '几 asks about numbers, usually less than 10. It is also used to ask the age of children.',
        examples: [
          { c: '你家有几口人？', p: 'Nǐ jiā yǒu jǐ kǒu rén?', en: 'How many people are in your family?' },
          { c: '你女儿几岁？', p: 'Nǐ nǚ’ér jǐ suì?', en: 'How old is your daughter?' },
        ],
      },
      {
        title: 'Numbers Below 100',
        summary:
          'Numbers up to 99 are formed from the digits 一–十 plus their multiples: 二十, 三十, 四十… The “tens + units” pattern is e.g. 二十五 (25).',
        examples: [
          { c: '二十五', p: 'èrshíwǔ', en: '25' },
          { c: '五十', p: 'wǔshí', en: '50' },
        ],
      },
      {
        title: 'The Particle 了 Indicating a Change',
        summary:
          'When 了 is placed at the end of a sentence, it can indicate that a new situation has come into being or a change has taken place.',
        examples: [
          { c: '她今年四岁了。', p: 'Tā jīnnián sì suì le.', en: 'She has turned four this year.' },
          { c: '我是学生了。', p: 'Wǒ shì xuésheng le.', en: 'I have become a student.' },
        ],
      },
      {
        title: 'The Interrogative Phrase 多大',
        summary:
          '多大 (literally “how big”) is used to ask the age of an adult or older person.',
        examples: [
          { c: '李老师多大？', p: 'Lǐ lǎoshī duō dà?', en: 'How old is Professor Li?' },
        ],
      },
    ],
    vocab: [
      { c: '家', p: 'jiā', pos: 'n.', en: 'family · home' },
      { c: '有', p: 'yǒu', pos: 'v.', en: 'to have · there is' },
      { c: '几', p: 'jǐ', pos: 'pron.', en: 'how many' },
      { c: '口', p: 'kǒu', pos: 'm.', en: '(measure for family members)' },
      { c: '女儿', p: 'nǚ’ér', pos: 'n.', en: 'daughter' },
      { c: '岁', p: 'suì', pos: 'm.', en: 'year (of age)' },
      { c: '了', p: 'le', pos: 'part.', en: '(particle of change)' },
      { c: '今年', p: 'jīnnián', pos: 'n.', en: 'this year' },
      { c: '多', p: 'duō', pos: 'adv.', en: 'how (in degree questions)' },
      { c: '大', p: 'dà', pos: 'adj.', en: 'big · old (in age)' },
      { c: '一', p: 'yī', pos: 'num.', en: 'one' },
      { c: '二', p: 'èr', pos: 'num.', en: 'two' },
      { c: '三', p: 'sān', pos: 'num.', en: 'three' },
      { c: '四', p: 'sì', pos: 'num.', en: 'four' },
      { c: '五', p: 'wǔ', pos: 'num.', en: 'five' },
      { c: '六', p: 'liù', pos: 'num.', en: 'six' },
      { c: '七', p: 'qī', pos: 'num.', en: 'seven' },
      { c: '八', p: 'bā', pos: 'num.', en: 'eight' },
      { c: '九', p: 'jiǔ', pos: 'num.', en: 'nine' },
      { c: '十', p: 'shí', pos: 'num.', en: 'ten' },
    ],
  },

  // ─────────────────────────────────────────── Lesson 6 ───────────────────────────────────────────
  {
    no: 6,
    han: '我会说汉语',
    pinyin: 'Wǒ huì shuō Hànyǔ',
    en: 'I can speak Chinese',
    focus: 'Modal verb 会 · adjectival predicate · interrogative pronoun 怎么',
    texts: [
      {
        title: 'In the school',
        lines: [
          { s: 'A', c: '你会说汉语吗？', p: 'Nǐ huì shuō Hànyǔ ma?', en: 'Can you speak Chinese?' },
          { s: 'B', c: '我会说汉语。', p: 'Wǒ huì shuō Hànyǔ.', en: 'Yes, I can.' },
          { s: 'A', c: '你妈妈会说汉语吗？', p: 'Nǐ māma huì shuō Hànyǔ ma?', en: 'Can your mother speak Chinese?' },
          { s: 'B', c: '她不会说。', p: 'Tā bú huì shuō.', en: 'No, she can’t.' },
        ],
      },
      {
        title: 'In the kitchen',
        lines: [
          { s: 'A', c: '中国菜好吃吗？', p: 'Zhōngguó cài hǎochī ma?', en: 'Is Chinese food delicious?' },
          { s: 'B', c: '中国菜很好吃。', p: 'Zhōngguó cài hěn hǎochī.', en: 'Yes, very delicious.' },
          { s: 'A', c: '你会做中国菜吗？', p: 'Nǐ huì zuò Zhōngguó cài ma?', en: 'Can you cook Chinese food?' },
          { s: 'B', c: '我不会做。', p: 'Wǒ bú huì zuò.', en: 'No, I can’t.' },
        ],
      },
      {
        title: 'At school',
        lines: [
          { s: 'A', c: '你会写汉字吗？', p: 'Nǐ huì xiě Hànzì ma?', en: 'Can you write Chinese characters?' },
          { s: 'B', c: '我会写。', p: 'Wǒ huì xiě.', en: 'Yes, I can.' },
          { s: 'A', c: '这个字怎么写？', p: 'Zhège zì zěnme xiě?', en: 'How do you write this character?' },
          { s: 'B', c: '对不起，这个字我会读，不会写。', p: 'Duìbuqǐ, zhège zì wǒ huì dú, bú huì xiě.', en: 'Sorry. I can read it, but I don’t know how to write it.' },
        ],
      },
    ],
    notes: [
      {
        title: 'The Modal Verb 会 (1)',
        summary:
          '会 indicates that an ability has been acquired through learning. The negative form is 不会.',
        examples: [
          { c: '我会说汉语。', p: 'Wǒ huì shuō Hànyǔ.', en: 'I can speak Chinese.' },
          { c: '她不会写汉字。', p: 'Tā bú huì xiě Hànzì.', en: 'She cannot write Chinese characters.' },
        ],
      },
      {
        title: 'Sentences with an Adjectival Predicate',
        summary:
          'In Chinese, an adjective can serve as the predicate. The structure is “subject + degree adverb (e.g. 很) + adjective”. The negative is formed with 不.',
        examples: [
          { c: '中国菜很好吃。', p: 'Zhōngguó cài hěn hǎochī.', en: 'Chinese food is delicious.' },
          { c: '汉语不难。', p: 'Hànyǔ bù nán.', en: 'Chinese is not difficult.' },
        ],
      },
      {
        title: 'The Interrogative Pronoun 怎么 (1)',
        summary:
          '怎么 is placed before a verb to ask about the manner or method of an action.',
        examples: [
          { c: '这个字怎么写？', p: 'Zhège zì zěnme xiě?', en: 'How do you write this character?' },
          { c: '你怎么去学校？', p: 'Nǐ zěnme qù xuéxiào?', en: 'How do you go to school?' },
        ],
      },
    ],
    vocab: [
      { c: '会', p: 'huì', pos: 'v.', en: 'can · be able to' },
      { c: '说', p: 'shuō', pos: 'v.', en: 'to speak · say' },
      { c: '妈妈', p: 'māma', pos: 'n.', en: 'mother' },
      { c: '中国菜', p: 'Zhōngguó cài', pos: 'n.', en: 'Chinese food' },
      { c: '菜', p: 'cài', pos: 'n.', en: 'dish · cuisine' },
      { c: '好吃', p: 'hǎochī', pos: 'adj.', en: 'delicious · tasty' },
      { c: '很', p: 'hěn', pos: 'adv.', en: 'very · quite' },
      { c: '做', p: 'zuò', pos: 'v.', en: 'to make · do' },
      { c: '写', p: 'xiě', pos: 'v.', en: 'to write' },
      { c: '汉字', p: 'Hànzì', pos: 'n.', en: 'Chinese character' },
      { c: '字', p: 'zì', pos: 'n.', en: 'character · word' },
      { c: '怎么', p: 'zěnme', pos: 'pron.', en: 'how' },
      { c: '读', p: 'dú', pos: 'v.', en: 'to read' },
      { c: '这', p: 'zhè', pos: 'pron.', en: 'this' },
      { c: '个', p: 'ge', pos: 'm.', en: '(general measure word)' },
    ],
  },

  // ─────────────────────────────────────────── Lesson 7 ───────────────────────────────────────────
  {
    no: 7,
    han: '今天几号',
    pinyin: 'Jīntiān jǐ hào',
    en: 'What’s the date today',
    focus: 'Date expression · sentences with nominal predicate · serial verbs 去 + place + V',
    texts: [
      {
        title: 'In a bank',
        lines: [
          { s: 'A', c: '请问，今天几号？', p: 'Qǐngwèn, jīntiān jǐ hào?', en: 'Excuse me, what’s the date today?' },
          { s: 'B', c: '今天九月一号。', p: 'Jīntiān jiǔ yuè yī hào.', en: 'It’s September 1st.' },
          { s: 'A', c: '今天星期几？', p: 'Jīntiān xīngqī jǐ?', en: 'What day is it today?' },
          { s: 'B', c: '星期三。', p: 'Xīngqī sān.', en: 'It’s Wednesday.' },
        ],
      },
      {
        title: 'Looking at a calendar',
        lines: [
          { s: 'A', c: '昨天是几月几号？', p: 'Zuótiān shì jǐ yuè jǐ hào?', en: 'What was the date yesterday?' },
          { s: 'B', c: '昨天是八月三十一号，星期二。', p: 'Zuótiān shì bā yuè sānshíyī hào, xīngqī èr.', en: 'It was August 31st, Tuesday.' },
          { s: 'A', c: '明天呢？', p: 'Míngtiān ne?', en: 'What about tomorrow?' },
          { s: 'B', c: '明天是九月二号，星期四。', p: 'Míngtiān shì jiǔ yuè èr hào, xīngqī sì.', en: 'It’s September 2nd, Thursday.' },
        ],
      },
      {
        title: 'In school',
        lines: [
          { s: 'A', c: '明天星期六，你去学校吗？', p: 'Míngtiān xīngqī liù, nǐ qù xuéxiào ma?', en: 'Tomorrow is Saturday. Will you go to school?' },
          { s: 'B', c: '我去学校。', p: 'Wǒ qù xuéxiào.', en: 'Yes, I will.' },
          { s: 'A', c: '你去学校做什么？', p: 'Nǐ qù xuéxiào zuò shénme?', en: 'What are you going to do there?' },
          { s: 'B', c: '我去学校看书。', p: 'Wǒ qù xuéxiào kàn shū.', en: 'I’m going there to read.' },
        ],
      },
    ],
    notes: [
      {
        title: 'Expression of a Date (1): Month, Date, Day of Week',
        summary:
          'Chinese dates follow the “bigger unit before smaller unit” principle: month + 月, date + 号 (or 日), and day of the week as 星期 + number.',
        examples: [
          { c: '九月一号', p: 'jiǔ yuè yī hào', en: 'September 1st' },
          { c: '八月三十一号，星期二', p: 'bā yuè sānshíyī hào, xīngqī èr', en: 'August 31st, Tuesday' },
        ],
      },
      {
        title: 'Sentences with a Nominal Predicate',
        summary:
          'When the predicate is a noun phrase (date, time, age, price…), the verb 是 can often be omitted. The negative form, however, requires 不是.',
        examples: [
          { c: '今天九月一号。', p: 'Jīntiān jiǔ yuè yī hào.', en: 'Today is September 1st.' },
          { c: '今天不是九月一号。', p: 'Jīntiān bú shì jiǔ yuè yī hào.', en: 'Today is not September 1st.' },
        ],
      },
      {
        title: 'Sentences with a Serial Verb Construction (1): 去 + place + V',
        summary:
          'Two or more verbs share the same subject, and the second verb expresses the purpose of the first.',
        examples: [
          { c: '我去学校看书。', p: 'Wǒ qù xuéxiào kàn shū.', en: 'I go to school to read.' },
          { c: '他去商店买东西。', p: 'Tā qù shāngdiàn mǎi dōngxi.', en: 'He goes to the shop to buy things.' },
        ],
      },
    ],
    vocab: [
      { c: '请问', p: 'qǐngwèn', pos: 'v.', en: 'excuse me · may I ask' },
      { c: '今天', p: 'jīntiān', pos: 'n.', en: 'today' },
      { c: '号', p: 'hào', pos: 'n.', en: 'date of the month · number' },
      { c: '月', p: 'yuè', pos: 'n.', en: 'month' },
      { c: '星期', p: 'xīngqī', pos: 'n.', en: 'week' },
      { c: '昨天', p: 'zuótiān', pos: 'n.', en: 'yesterday' },
      { c: '明天', p: 'míngtiān', pos: 'n.', en: 'tomorrow' },
      { c: '去', p: 'qù', pos: 'v.', en: 'to go' },
      { c: '学校', p: 'xuéxiào', pos: 'n.', en: 'school' },
      { c: '看', p: 'kàn', pos: 'v.', en: 'to look · watch · read' },
      { c: '书', p: 'shū', pos: 'n.', en: 'book' },
    ],
  },

  // ─────────────────────────────────────────── Lesson 8 ───────────────────────────────────────────
  {
    no: 8,
    han: '我想喝茶',
    pinyin: 'Wǒ xiǎng hē chá',
    en: 'I’d like some tea',
    focus: 'Modal verb 想 · interrogative pronoun 多少 · measure words 个, 块 · price expression',
    texts: [
      {
        title: 'In a restaurant',
        lines: [
          { s: 'A', c: '你想喝什么？', p: 'Nǐ xiǎng hē shénme?', en: 'What would you like to drink?' },
          { s: 'B', c: '我想喝茶。', p: 'Wǒ xiǎng hē chá.', en: 'I’d like some tea.' },
          { s: 'A', c: '你想吃什么？', p: 'Nǐ xiǎng chī shénme?', en: 'What would you like to eat?' },
          { s: 'B', c: '我想吃米饭。', p: 'Wǒ xiǎng chī mǐfàn.', en: 'I’d like rice.' },
        ],
      },
      {
        title: 'In the living room',
        lines: [
          { s: 'A', c: '下午你想做什么？', p: 'Xiàwǔ nǐ xiǎng zuò shénme?', en: 'What would you like to do this afternoon?' },
          { s: 'B', c: '下午我想去商店。', p: 'Xiàwǔ wǒ xiǎng qù shāngdiàn.', en: 'I’d like to go shopping.' },
          { s: 'A', c: '你想买什么？', p: 'Nǐ xiǎng mǎi shénme?', en: 'What do you want to buy?' },
          { s: 'B', c: '我想买一个杯子。', p: 'Wǒ xiǎng mǎi yí ge bēizi.', en: 'I want to buy a cup.' },
        ],
      },
      {
        title: 'In a shop',
        lines: [
          { s: 'A', c: '你好！这个杯子多少钱？', p: 'Nǐ hǎo! Zhège bēizi duōshao qián?', en: 'Hello! How much is this cup?' },
          { s: 'B', c: '二十八块。', p: 'Èrshíbā kuài.', en: '28 yuan.' },
          { s: 'A', c: '那个杯子多少钱？', p: 'Nàge bēizi duōshao qián?', en: 'What about that one?' },
          { s: 'B', c: '那个杯子十八块钱。', p: 'Nàge bēizi shíbā kuài qián.', en: 'That one is 18 yuan.' },
        ],
      },
    ],
    notes: [
      {
        title: 'The Modal Verb 想',
        summary:
          '想 is placed before a verb to express a wish or plan, equivalent to “want / would like to”.',
        examples: [
          { c: '我想喝茶。', p: 'Wǒ xiǎng hē chá.', en: 'I want to drink tea.' },
          { c: '他想去北京。', p: 'Tā xiǎng qù Běijīng.', en: 'He wants to go to Beijing.' },
        ],
      },
      {
        title: 'The Interrogative Pronoun 多少',
        summary:
          '多少 asks about an amount, usually larger than 10. It is also used in price questions “…多少钱?”.',
        examples: [
          { c: '这个杯子多少钱？', p: 'Zhège bēizi duōshao qián?', en: 'How much is this cup?' },
          { c: '你们班有多少学生？', p: 'Nǐmen bān yǒu duōshao xuésheng?', en: 'How many students are in your class?' },
        ],
      },
      {
        title: 'The Measure Words 个 and 块',
        summary:
          '个 is the most general measure word and is used with most countable nouns. 块 is the colloquial measure word for the basic unit of Chinese currency (RMB).',
        examples: [
          { c: '一个杯子', p: 'yí ge bēizi', en: 'a cup' },
          { c: '十八块（钱）', p: 'shíbā kuài (qián)', en: '18 yuan' },
        ],
      },
      {
        title: 'Expression of the Amount of Money',
        summary:
          'The basic unit of Renminbi is 元, usually replaced in colloquial speech by 块. Numbers precede the measure word, e.g. 二十八块.',
        examples: [
          { c: '二十八块', p: 'èrshíbā kuài', en: '28 yuan' },
          { c: '一百块钱', p: 'yìbǎi kuài qián', en: '100 yuan' },
        ],
      },
    ],
    vocab: [
      { c: '想', p: 'xiǎng', pos: 'v.', en: 'to want · would like' },
      { c: '喝', p: 'hē', pos: 'v.', en: 'to drink' },
      { c: '茶', p: 'chá', pos: 'n.', en: 'tea' },
      { c: '吃', p: 'chī', pos: 'v.', en: 'to eat' },
      { c: '米饭', p: 'mǐfàn', pos: 'n.', en: 'cooked rice' },
      { c: '下午', p: 'xiàwǔ', pos: 'n.', en: 'afternoon' },
      { c: '商店', p: 'shāngdiàn', pos: 'n.', en: 'shop · store' },
      { c: '买', p: 'mǎi', pos: 'v.', en: 'to buy' },
      { c: '杯子', p: 'bēizi', pos: 'n.', en: 'cup · glass' },
      { c: '多少', p: 'duōshao', pos: 'pron.', en: 'how many · how much' },
      { c: '钱', p: 'qián', pos: 'n.', en: 'money' },
      { c: '块', p: 'kuài', pos: 'm.', en: 'yuan (currency unit)' },
      { c: '那', p: 'nà', pos: 'pron.', en: 'that' },
    ],
  },

  // ─────────────────────────────────────────── Lesson 9 ───────────────────────────────────────────
  {
    no: 9,
    han: '你儿子在哪儿工作',
    pinyin: 'Nǐ érzi zài nǎr gōngzuò',
    en: 'Where does your son work',
    focus: 'Verb 在 · interrogative pronoun 哪儿 · preposition 在 · particle 呢 (2)',
    texts: [
      {
        title: 'At home',
        lines: [
          { s: 'A', c: '小猫在哪儿？', p: 'Xiǎo māo zài nǎr?', en: 'Where is the kitty?' },
          { s: 'B', c: '小猫在那儿。', p: 'Xiǎo māo zài nàr.', en: 'The kitty is over there.' },
          { s: 'A', c: '小狗在哪儿？', p: 'Xiǎo gǒu zài nǎr?', en: 'Where is the puppy?' },
          { s: 'B', c: '小狗在椅子下面。', p: 'Xiǎo gǒu zài yǐzi xiàmiàn.', en: 'The puppy is under the chair.' },
        ],
      },
      {
        title: 'At the railway station',
        lines: [
          { s: 'A', c: '你在哪儿工作？', p: 'Nǐ zài nǎr gōngzuò?', en: 'Where do you work?' },
          { s: 'B', c: '我在学校工作。', p: 'Wǒ zài xuéxiào gōngzuò.', en: 'I work in a school.' },
          { s: 'A', c: '你儿子在哪儿工作？', p: 'Nǐ érzi zài nǎr gōngzuò?', en: 'Where does your son work?' },
          { s: 'B', c: '我儿子在医院工作，他是医生。', p: 'Wǒ érzi zài yīyuàn gōngzuò, tā shì yīshēng.', en: 'My son works in a hospital. He is a doctor.' },
        ],
      },
      {
        title: 'On the phone',
        lines: [
          { s: 'A', c: '你爸爸在家吗？', p: 'Nǐ bàba zài jiā ma?', en: 'Is your father at home?' },
          { s: 'B', c: '不在家。', p: 'Bú zài jiā.', en: 'No, he isn’t.' },
          { s: 'A', c: '他在哪儿呢？', p: 'Tā zài nǎr ne?', en: 'Where is he?' },
          { s: 'B', c: '他在医院。', p: 'Tā zài yīyuàn.', en: 'He is at the hospital.' },
        ],
      },
    ],
    notes: [
      {
        title: 'The Verb 在',
        summary:
          'When followed by a place word, 在 indicates the location of someone or something.',
        examples: [
          { c: '他在学校。', p: 'Tā zài xuéxiào.', en: 'He is at school.' },
          { c: '猫在椅子下面。', p: 'Māo zài yǐzi xiàmiàn.', en: 'The cat is under the chair.' },
        ],
      },
      {
        title: 'The Interrogative Pronoun 哪儿',
        summary: '哪儿 is used to ask about location.',
        examples: [
          { c: '你在哪儿？', p: 'Nǐ zài nǎr?', en: 'Where are you?' },
          { c: '学校在哪儿？', p: 'Xuéxiào zài nǎr?', en: 'Where is the school?' },
        ],
      },
      {
        title: 'The Preposition 在',
        summary:
          '在 + place + verb introduces the location where an action takes place.',
        examples: [
          { c: '我在学校工作。', p: 'Wǒ zài xuéxiào gōngzuò.', en: 'I work at school.' },
          { c: '他在家看书。', p: 'Tā zài jiā kàn shū.', en: 'He reads at home.' },
        ],
      },
      {
        title: 'The Interrogative Particle 呢 (2)',
        summary:
          '呢 attached to a noun/pronoun + place can ask “Where is …?” when the location is the topic of conversation.',
        examples: [
          { c: '我爸爸呢？', p: 'Wǒ bàba ne?', en: 'Where is my father?' },
        ],
      },
    ],
    vocab: [
      { c: '小', p: 'xiǎo', pos: 'adj.', en: 'small · little' },
      { c: '猫', p: 'māo', pos: 'n.', en: 'cat' },
      { c: '在', p: 'zài', pos: 'v./prep.', en: 'to be in/on/at; in/on/at' },
      { c: '哪儿', p: 'nǎr', pos: 'pron.', en: 'where' },
      { c: '狗', p: 'gǒu', pos: 'n.', en: 'dog' },
      { c: '椅子', p: 'yǐzi', pos: 'n.', en: 'chair' },
      { c: '下面', p: 'xiàmiàn', pos: 'n.', en: 'under · below' },
      { c: '工作', p: 'gōngzuò', pos: 'v./n.', en: 'to work; job' },
      { c: '儿子', p: 'érzi', pos: 'n.', en: 'son' },
      { c: '医院', p: 'yīyuàn', pos: 'n.', en: 'hospital' },
      { c: '医生', p: 'yīshēng', pos: 'n.', en: 'doctor' },
      { c: '爸爸', p: 'bàba', pos: 'n.', en: 'father' },
    ],
  },

  // ─────────────────────────────────────────── Lesson 10 ──────────────────────────────────────────
  {
    no: 10,
    han: '我能坐这儿吗',
    pinyin: 'Wǒ néng zuò zhèr ma',
    en: 'Can I sit here',
    focus: 'Existential 有 sentence · conjunction 和 · modal verb 能 · imperative with 请',
    texts: [
      {
        title: 'In the office',
        lines: [
          { s: 'A', c: '桌子上有什么？', p: 'Zhuōzi shang yǒu shénme?', en: 'What is on the desk?' },
          { s: 'B', c: '桌子上有一个电脑和一本书。', p: 'Zhuōzi shang yǒu yí ge diànnǎo hé yì běn shū.', en: 'There is a computer and a book on the desk.' },
          { s: 'A', c: '杯子在哪儿？', p: 'Bēizi zài nǎr?', en: 'Where is the cup?' },
          { s: 'B', c: '杯子在桌子里。', p: 'Bēizi zài zhuōzi lǐ.', en: 'It’s inside the desk.' },
        ],
      },
      {
        title: 'In the gym',
        lines: [
          { s: 'A', c: '前面那个人叫什么名字？', p: 'Qiánmiàn nàge rén jiào shénme míngzi?', en: 'Who is the person in front?' },
          { s: 'B', c: '她叫王芳，在医院工作。', p: 'Tā jiào Wáng Fāng, zài yīyuàn gōngzuò.', en: 'She is Wang Fang. She works in a hospital.' },
          { s: 'A', c: '后面那个人呢？他叫什么名字？', p: 'Hòumiàn nàge rén ne? Tā jiào shénme míngzi?', en: 'What about the person at the back? What’s his name?' },
          { s: 'B', c: '他叫谢朋，在商店工作。', p: 'Tā jiào Xiè Péng, zài shāngdiàn gōngzuò.', en: 'He is Xie Peng. He works in a store.' },
        ],
      },
      {
        title: 'In the library',
        lines: [
          { s: 'A', c: '这儿有人吗？', p: 'Zhèr yǒu rén ma?', en: 'Is this seat taken?' },
          { s: 'B', c: '没有。', p: 'Méi yǒu.', en: 'No, it isn’t.' },
          { s: 'A', c: '我能坐这儿吗？', p: 'Wǒ néng zuò zhèr ma?', en: 'Can I sit here?' },
          { s: 'B', c: '请坐。', p: 'Qǐng zuò.', en: 'Please, do.' },
        ],
      },
    ],
    notes: [
      {
        title: 'The 有 Sentence: Indicating Existence',
        summary:
          'Place + 有 + object indicates that someone/something exists at a place. The negative form is place + 没有 + object.',
        examples: [
          { c: '桌子上有一个电脑。', p: 'Zhuōzi shang yǒu yí ge diànnǎo.', en: 'There is a computer on the desk.' },
          { c: '这儿没有人。', p: 'Zhèr méi yǒu rén.', en: 'There is no one here.' },
        ],
      },
      {
        title: 'The Conjunction 和',
        summary:
          '和 connects two or more parallel nouns or noun phrases (not clauses).',
        examples: [
          { c: '一个电脑和一本书', p: 'yí ge diànnǎo hé yì běn shū', en: 'a computer and a book' },
          { c: '他和我是朋友。', p: 'Tā hé wǒ shì péngyou.', en: 'He and I are friends.' },
        ],
      },
      {
        title: 'The Modal Verb 能',
        summary:
          '能 expresses ability or permission. The negative form is 不能.',
        examples: [
          { c: '我能坐这儿吗？', p: 'Wǒ néng zuò zhèr ma?', en: 'Can I sit here?' },
          { c: '今天我不能去。', p: 'Jīntiān wǒ bù néng qù.', en: 'I can’t go today.' },
        ],
      },
      {
        title: 'Imperative Sentences with 请',
        summary:
          '请 + verb forms a polite request or invitation, equivalent to “please …”.',
        examples: [
          { c: '请坐。', p: 'Qǐng zuò.', en: 'Please sit.' },
          { c: '请喝茶。', p: 'Qǐng hē chá.', en: 'Please have some tea.' },
        ],
      },
    ],
    vocab: [
      { c: '桌子', p: 'zhuōzi', pos: 'n.', en: 'desk · table' },
      { c: '上', p: 'shang', pos: 'n.', en: 'above · on' },
      { c: '电脑', p: 'diànnǎo', pos: 'n.', en: 'computer' },
      { c: '和', p: 'hé', pos: 'conj.', en: 'and' },
      { c: '本', p: 'běn', pos: 'm.', en: '(measure word for books)' },
      { c: '里', p: 'lǐ', pos: 'n.', en: 'inside · interior' },
      { c: '前面', p: 'qiánmiàn', pos: 'n.', en: 'front' },
      { c: '后面', p: 'hòumiàn', pos: 'n.', en: 'back · behind' },
      { c: '这儿', p: 'zhèr', pos: 'pron.', en: 'here' },
      { c: '没有', p: 'méi yǒu', pos: 'v.', en: 'do not have · there is not' },
      { c: '能', p: 'néng', pos: 'v.', en: 'can · may' },
      { c: '坐', p: 'zuò', pos: 'v.', en: 'to sit' },
      { c: '请', p: 'qǐng', pos: 'v.', en: 'please · invite' },
    ],
  },

  // ─────────────────────────────────────────── Lesson 11 ──────────────────────────────────────────
  {
    no: 11,
    han: '现在几点',
    pinyin: 'Xiànzài jǐ diǎn',
    en: 'What’s the time now',
    focus: 'Expression of time · time words as adverbials · noun 时候',
    texts: [
      {
        title: 'In the library',
        lines: [
          { s: 'A', c: '现在几点？', p: 'Xiànzài jǐ diǎn?', en: 'What’s the time now?' },
          { s: 'B', c: '现在是十点十分。', p: 'Xiànzài shì shí diǎn shí fēn.', en: 'It’s ten past ten.' },
          { s: 'A', c: '中午几点吃饭？', p: 'Zhōngwǔ jǐ diǎn chī fàn?', en: 'When shall we have lunch?' },
          { s: 'B', c: '十二点吃饭。', p: 'Shí’èr diǎn chī fàn.', en: 'At twelve o’clock.' },
        ],
      },
      {
        title: 'At home',
        lines: [
          { s: 'A', c: '爸爸什么时候回家？', p: 'Bàba shénme shíhou huí jiā?', en: 'When is father coming home?' },
          { s: 'B', c: '下午五点。', p: 'Xiàwǔ wǔ diǎn.', en: 'At five o’clock in the afternoon.' },
          { s: 'A', c: '我们什么时候去看电影？', p: 'Wǒmen shénme shíhou qù kàn diànyǐng?', en: 'When are we going to see the movie?' },
          { s: 'B', c: '六点三十分。', p: 'Liù diǎn sānshí fēn.', en: 'At half past six.' },
        ],
      },
      {
        title: 'Before a trip',
        lines: [
          { s: 'A', c: '我星期一去北京。', p: 'Wǒ xīngqī yī qù Běijīng.', en: 'I’ll go to Beijing on Monday.' },
          { s: 'B', c: '你想在北京住几天？', p: 'Nǐ xiǎng zài Běijīng zhù jǐ tiān?', en: 'How long will you stay in Beijing?' },
          { s: 'A', c: '住三天。', p: 'Zhù sān tiān.', en: 'For three days.' },
          { s: 'B', c: '星期五前能回来吗？', p: 'Xīngqī wǔ qián néng huílái ma?', en: 'Can you come back before Friday?' },
          { s: 'A', c: '能。', p: 'Néng.', en: 'Yes, I can.' },
        ],
      },
    ],
    notes: [
      {
        title: 'Expression of Time',
        summary:
          'Time goes from larger to smaller units: 点 (o’clock) precedes 分 (minute). For 2 o’clock, use 两点 instead of 二点. Half past is …点半.',
        examples: [
          { c: '十点', p: 'shí diǎn', en: '10 o’clock' },
          { c: '两点', p: 'liǎng diǎn', en: '2 o’clock' },
          { c: '十点十五分', p: 'shí diǎn shíwǔ fēn', en: '10:15' },
        ],
      },
      {
        title: 'Time Word Used as an Adverbial',
        summary:
          'A time word usually goes after the subject, but it may also precede the subject for emphasis. It is placed before the verb.',
        examples: [
          { c: '我下午去学校。', p: 'Wǒ xiàwǔ qù xuéxiào.', en: 'I go to school in the afternoon.' },
          { c: '下午我去学校。', p: 'Xiàwǔ wǒ qù xuéxiào.', en: 'In the afternoon I go to school.' },
        ],
      },
      {
        title: 'The Noun 时候',
        summary:
          '时候 means “time / moment”. 什么时候 asks “when?”.',
        examples: [
          { c: '你什么时候去北京？', p: 'Nǐ shénme shíhou qù Běijīng?', en: 'When are you going to Beijing?' },
        ],
      },
    ],
    vocab: [
      { c: '现在', p: 'xiànzài', pos: 'n.', en: 'now' },
      { c: '点', p: 'diǎn', pos: 'm.', en: 'o’clock' },
      { c: '分', p: 'fēn', pos: 'm.', en: 'minute' },
      { c: '中午', p: 'zhōngwǔ', pos: 'n.', en: 'noon' },
      { c: '吃饭', p: 'chī fàn', pos: 'v.', en: 'to have a meal' },
      { c: '时候', p: 'shíhou', pos: 'n.', en: 'time · moment' },
      { c: '回', p: 'huí', pos: 'v.', en: 'to come/go back · return' },
      { c: '电影', p: 'diànyǐng', pos: 'n.', en: 'film · movie' },
      { c: '住', p: 'zhù', pos: 'v.', en: 'to live · to stay' },
      { c: '前', p: 'qián', pos: 'n.', en: 'before · earlier than' },
      { c: '北京', p: 'Běijīng', pos: 'n.', en: 'Beijing' },
    ],
  },

  // ─────────────────────────────────────────── Lesson 12 ──────────────────────────────────────────
  {
    no: 12,
    han: '明天天气怎么样',
    pinyin: 'Míngtiān tiānqì zěnmeyàng',
    en: 'What will the weather be like tomorrow',
    focus: 'Interrogative pronoun 怎么样 · subject-predicate as predicate · adverb 太 · modal 会 (2)',
    texts: [
      {
        title: 'On the road',
        lines: [
          { s: 'A', c: '昨天北京的天气怎么样？', p: 'Zuótiān Běijīng de tiānqì zěnmeyàng?', en: 'How was the weather in Beijing yesterday?' },
          { s: 'B', c: '太热了。', p: 'Tài rè le.', en: 'It was too hot.' },
          { s: 'A', c: '明天呢？明天天气怎么样？', p: 'Míngtiān ne? Míngtiān tiānqì zěnmeyàng?', en: 'What about tomorrow? What will the weather be like?' },
          { s: 'B', c: '明天天气很好，不冷不热。', p: 'Míngtiān tiānqì hěn hǎo, bù lěng bú rè.', en: 'It will be fine, neither cold nor hot.' },
        ],
      },
      {
        title: 'In the gym',
        lines: [
          { s: 'A', c: '今天会下雨吗？', p: 'Jīntiān huì xià yǔ ma?', en: 'Will it rain today?' },
          { s: 'B', c: '今天不会下雨。', p: 'Jīntiān bú huì xià yǔ.', en: 'No, it won’t rain.' },
          { s: 'A', c: '王小姐今天会来吗？', p: 'Wáng xiǎojiě jīntiān huì lái ma?', en: 'Will Miss Wang come today?' },
          { s: 'B', c: '不会来，天气太冷了。', p: 'Bú huì lái, tiānqì tài lěng le.', en: 'No, she won’t. It’s too cold.' },
        ],
      },
      {
        title: 'At a clinic',
        lines: [
          { s: 'A', c: '你身体怎么样？', p: 'Nǐ shēntǐ zěnmeyàng?', en: 'How are you?' },
          { s: 'B', c: '我身体不太好。天气太热了，我不想吃饭。', p: 'Wǒ shēntǐ bú tài hǎo. Tiānqì tài rè le, wǒ bù xiǎng chī fàn.', en: 'Not very well. It’s too hot — I have no appetite.' },
          { s: 'A', c: '你多吃水果，多喝水。', p: 'Nǐ duō chī shuǐguǒ, duō hē shuǐ.', en: 'Eat more fruit and drink more water.' },
          { s: 'B', c: '谢谢你，医生。', p: 'Xièxie nǐ, yīshēng.', en: 'Thank you, doctor.' },
        ],
      },
    ],
    notes: [
      {
        title: 'The Interrogative Pronoun 怎么样',
        summary: '怎么样 asks about the condition or state of someone or something.',
        examples: [
          { c: '天气怎么样？', p: 'Tiānqì zěnmeyàng?', en: 'How is the weather?' },
          { c: '你身体怎么样？', p: 'Nǐ shēntǐ zěnmeyàng?', en: 'How is your health?' },
        ],
      },
      {
        title: 'Sentences with a Subject-Predicate Phrase as Predicate',
        summary:
          'A whole subject-predicate phrase can serve as the predicate of a larger sentence, describing some aspect of the main subject.',
        examples: [
          { c: '今天天气很好。', p: 'Jīntiān tiānqì hěn hǎo.', en: 'The weather is very nice today.' },
          { c: '他身体不太好。', p: 'Tā shēntǐ bú tài hǎo.', en: 'His health is not very good.' },
        ],
      },
      {
        title: 'The Adverb 太',
        summary:
          '太 indicates a high degree, often paired with sentence-final 了: 太…了. The negative pattern 不太 means “not very …”.',
        examples: [
          { c: '太热了。', p: 'Tài rè le.', en: 'It’s too hot.' },
          { c: '不太好。', p: 'Bú tài hǎo.', en: 'Not very good.' },
        ],
      },
      {
        title: 'The Modal Verb 会 (2)',
        summary:
          '会 also indicates likelihood — “will / be likely to”. The negative form is 不会.',
        examples: [
          { c: '今天会下雨。', p: 'Jīntiān huì xià yǔ.', en: 'It will rain today.' },
          { c: '她今天不会来。', p: 'Tā jīntiān bú huì lái.', en: 'She won’t come today.' },
        ],
      },
    ],
    vocab: [
      { c: '天气', p: 'tiānqì', pos: 'n.', en: 'weather' },
      { c: '怎么样', p: 'zěnmeyàng', pos: 'pron.', en: 'how · how about' },
      { c: '太', p: 'tài', pos: 'adv.', en: 'too · excessively' },
      { c: '热', p: 'rè', pos: 'adj.', en: 'hot' },
      { c: '冷', p: 'lěng', pos: 'adj.', en: 'cold' },
      { c: '会', p: 'huì', pos: 'v.', en: 'will · be likely to' },
      { c: '下雨', p: 'xià yǔ', pos: 'v.', en: 'to rain' },
      { c: '小姐', p: 'xiǎojiě', pos: 'n.', en: 'Miss · young lady' },
      { c: '来', p: 'lái', pos: 'v.', en: 'to come' },
      { c: '身体', p: 'shēntǐ', pos: 'n.', en: 'body · health' },
      { c: '爱', p: 'ài', pos: 'v.', en: 'to like · to love' },
      { c: '些', p: 'xiē', pos: 'm.', en: 'some · a few' },
      { c: '水果', p: 'shuǐguǒ', pos: 'n.', en: 'fruit' },
      { c: '水', p: 'shuǐ', pos: 'n.', en: 'water' },
    ],
  },

  // ─────────────────────────────────────────── Lesson 13 ──────────────────────────────────────────
  {
    no: 13,
    han: '他在学做中国菜',
    pinyin: 'Tā zài xué zuò Zhōngguó cài',
    en: 'He is learning to cook Chinese food',
    focus: 'Interjection 喂 · 在…呢 for actions in progress · expression of telephone numbers · particle 吧',
    texts: [
      {
        title: 'On the phone',
        lines: [
          { s: 'A', c: '喂，你在做什么呢？', p: 'Wèi, nǐ zài zuò shénme ne?', en: 'Hello, what are you doing?' },
          { s: 'B', c: '我在看书呢。', p: 'Wǒ zài kàn shū ne.', en: 'I’m reading.' },
          { s: 'A', c: '大伟也在看书吗？', p: 'Dàwěi yě zài kàn shū ma?', en: 'Is David reading too?' },
          { s: 'B', c: '他没看书，他在学做中国菜呢。', p: 'Tā méi kàn shū, tā zài xué zuò Zhōngguó cài ne.', en: 'No, he isn’t. He is learning to cook Chinese food.' },
        ],
      },
      {
        title: 'In a coffee house',
        lines: [
          { s: 'A', c: '昨天上午你在做什么呢？', p: 'Zuótiān shàngwǔ nǐ zài zuò shénme ne?', en: 'What were you doing yesterday morning?' },
          { s: 'B', c: '我在睡觉呢。你呢？', p: 'Wǒ zài shuìjiào ne. Nǐ ne?', en: 'I was sleeping. What about you?' },
          { s: 'A', c: '我在家看电视呢。你喜欢看电视吗？', p: 'Wǒ zài jiā kàn diànshì ne. Nǐ xǐhuan kàn diànshì ma?', en: 'I was watching TV at home. Do you like watching TV?' },
          { s: 'B', c: '我不喜欢看电视，我喜欢看电影。', p: 'Wǒ bù xǐhuan kàn diànshì, wǒ xǐhuan kàn diànyǐng.', en: 'No, I don’t. I like seeing movies.' },
        ],
      },
      {
        title: 'Making a phone call',
        lines: [
          { s: 'A', c: '82304155，这是李老师的电话吗？', p: 'Bā èr sān líng sì yāo wǔ wǔ, zhè shì Lǐ lǎoshī de diànhuà ma?', en: '82304155 — is that Ms Li’s telephone number?' },
          { s: 'B', c: '不是。她的电话是82304156。', p: 'Bú shì. Tā de diànhuà shì bā èr sān líng sì yāo wǔ liù.', en: 'No. Her number is 82304156.' },
          { s: 'A', c: '好，我现在给她打电话。', p: 'Hǎo, wǒ xiànzài gěi tā dǎ diànhuà.', en: 'OK, I’ll call her right now.' },
          { s: 'B', c: '她在工作呢，你下午打吧。', p: 'Tā zài gōngzuò ne, nǐ xiàwǔ dǎ ba.', en: 'She is working. Call her in the afternoon.' },
        ],
      },
    ],
    notes: [
      {
        title: 'The Interjection 喂',
        summary:
          '喂 (wèi) is used when calling out to someone or answering a phone call.',
        examples: [
          { c: '喂，你好！', p: 'Wèi, nǐ hǎo!', en: 'Hello!' },
        ],
      },
      {
        title: '在…呢 — Action in Progress',
        summary:
          'Adverb 在 before a verb (often together with sentence-final 呢) indicates that an action is going on. The negative form is 没(有) + verb.',
        examples: [
          { c: '我在看书呢。', p: 'Wǒ zài kàn shū ne.', en: 'I’m reading.' },
          { c: '他没看书，他在睡觉呢。', p: 'Tā méi kàn shū, tā zài shuìjiào ne.', en: 'He isn’t reading; he is sleeping.' },
        ],
      },
      {
        title: 'Expression of Telephone Numbers',
        summary:
          'Phone numbers are read digit by digit. The digit 1 is usually pronounced 幺 (yāo) instead of 一 (yī).',
        examples: [
          { c: '82304155', p: 'bā èr sān líng sì yāo wǔ wǔ', en: '8-2-3-0-4-1-5-5' },
        ],
      },
      {
        title: 'The Modal Particle 吧',
        summary:
          '吧 added at the end of a sentence softens it into a suggestion, request or mild command.',
        examples: [
          { c: '你下午打吧。', p: 'Nǐ xiàwǔ dǎ ba.', en: 'Just call (her) in the afternoon.' },
          { c: '我们走吧。', p: 'Wǒmen zǒu ba.', en: 'Let’s go.' },
        ],
      },
    ],
    vocab: [
      { c: '喂', p: 'wèi', pos: 'expr.', en: 'hello · hey' },
      { c: '呢', p: 'ne', pos: 'part.', en: '(ongoing action · what about…?)' },
      { c: '也', p: 'yě', pos: 'adv.', en: 'also · too' },
      { c: '学习', p: 'xuéxí', pos: 'v.', en: 'to study · to learn' },
      { c: '上午', p: 'shàngwǔ', pos: 'n.', en: 'morning (before noon)' },
      { c: '睡觉', p: 'shuìjiào', pos: 'v.', en: 'to sleep' },
      { c: '电视', p: 'diànshì', pos: 'n.', en: 'television' },
      { c: '喜欢', p: 'xǐhuan', pos: 'v.', en: 'to like · be fond of' },
      { c: '给', p: 'gěi', pos: 'v./prep.', en: 'to · for' },
      { c: '打电话', p: 'dǎ diànhuà', pos: 'v.', en: 'to make a phone call' },
      { c: '吧', p: 'ba', pos: 'part.', en: '(suggestion particle)' },
      { c: '大伟', p: 'Dàwěi', pos: 'n.', en: 'David (name)' },
    ],
  },

  // ─────────────────────────────────────────── Lesson 14 ──────────────────────────────────────────
  {
    no: 14,
    han: '她买了不少衣服',
    pinyin: 'Tā mǎile bù shǎo yīfu',
    en: 'She has bought quite a few clothes',
    focus: 'Particle 了 (occurrence / completion) · noun 后 · particle 呀 · adverb 都',
    texts: [
      {
        title: 'In the dorm',
        lines: [
          { s: 'A', c: '昨天上午你去哪儿了？', p: 'Zuótiān shàngwǔ nǐ qù nǎr le?', en: 'Where did you go yesterday morning?' },
          { s: 'B', c: '我去商店买东西了。', p: 'Wǒ qù shāngdiàn mǎi dōngxi le.', en: 'I went shopping.' },
          { s: 'A', c: '你买什么了？', p: 'Nǐ mǎi shénme le?', en: 'What did you buy?' },
          { s: 'B', c: '我买了一点儿苹果。', p: 'Wǒ mǎile yìdiǎnr píngguǒ.', en: 'I bought some apples.' },
        ],
      },
      {
        title: 'In the company',
        lines: [
          { s: 'A', c: '你看见张先生了吗？', p: 'Nǐ kànjiàn Zhāng xiānsheng le ma?', en: 'Have you seen Mr Zhang?' },
          { s: 'B', c: '看见了，他去学开车了。', p: 'Kànjiàn le, tā qù xué kāi chē le.', en: 'Yes — he has gone to a driving lesson.' },
          { s: 'A', c: '他什么时候能回来？', p: 'Tā shénme shíhou néng huílái?', en: 'When can he come back?' },
          { s: 'B', c: '四十分钟后回来。', p: 'Sìshí fēnzhōng hòu huílái.', en: 'After 40 minutes.' },
        ],
      },
      {
        title: 'At a clothing store',
        lines: [
          { s: 'A', c: '王芳的衣服太漂亮了！', p: 'Wáng Fāng de yīfu tài piàoliang le!', en: 'Wang Fang’s clothes are so pretty!' },
          { s: 'B', c: '是呀，她买了不少衣服。', p: 'Shì ya, tā mǎile bù shǎo yīfu.', en: 'Yes — she has bought quite a few clothes.' },
          { s: 'A', c: '你买什么了？', p: 'Nǐ mǎi shénme le?', en: 'What did you buy?' },
          { s: 'B', c: '我没买，这些都是王芳的东西。', p: 'Wǒ méi mǎi, zhèxiē dōu shì Wáng Fāng de dōngxi.', en: 'I bought nothing. All these are Wang Fang’s.' },
        ],
      },
    ],
    notes: [
      {
        title: '了 Indicating Occurrence or Completion',
        summary:
          '了 placed after a verb or at the end of a sentence indicates that an action has occurred or is completed. With a quantifier modifier on the object, 了 sits between the verb and its object.',
        examples: [
          { c: '我去商店了。', p: 'Wǒ qù shāngdiàn le.', en: 'I went to the shop.' },
          { c: '我买了一点儿苹果。', p: 'Wǒ mǎile yìdiǎnr píngguǒ.', en: 'I bought some apples.' },
          { c: '我没买。', p: 'Wǒ méi mǎi.', en: 'I didn’t buy any.' },
        ],
      },
      {
        title: 'The Noun 后',
        summary:
          '后 means “after / later” and follows a time expression: amount-of-time + 后.',
        examples: [
          { c: '四十分钟后', p: 'sìshí fēnzhōng hòu', en: '40 minutes later' },
          { c: '一年后', p: 'yì nián hòu', en: 'one year later' },
        ],
      },
      {
        title: 'The Modal Particle 呀',
        summary:
          '呀 is a softer variant of 啊, used at the end of a sentence to confirm or emphasise.',
        examples: [
          { c: '是呀！', p: 'Shì ya!', en: 'Yes, indeed!' },
        ],
      },
      {
        title: 'The Adverb 都',
        summary:
          '都 means “all / both” and is placed before the verb to summarise the preceding plural subject.',
        examples: [
          { c: '这些都是王芳的东西。', p: 'Zhèxiē dōu shì Wáng Fāng de dōngxi.', en: 'All these are Wang Fang’s.' },
          { c: '我们都是学生。', p: 'Wǒmen dōu shì xuésheng.', en: 'We are all students.' },
        ],
      },
    ],
    vocab: [
      { c: '东西', p: 'dōngxi', pos: 'n.', en: 'thing · stuff' },
      { c: '一点儿', p: 'yìdiǎnr', pos: 'qty.', en: 'a few · a little' },
      { c: '苹果', p: 'píngguǒ', pos: 'n.', en: 'apple' },
      { c: '看见', p: 'kànjiàn', pos: 'v.', en: 'to see' },
      { c: '先生', p: 'xiānsheng', pos: 'n.', en: 'Mr · sir' },
      { c: '开', p: 'kāi', pos: 'v.', en: 'to drive' },
      { c: '车', p: 'chē', pos: 'n.', en: 'car · vehicle' },
      { c: '回来', p: 'huílái', pos: 'v.', en: 'to come back' },
      { c: '分钟', p: 'fēnzhōng', pos: 'n.', en: 'minute' },
      { c: '后', p: 'hòu', pos: 'n.', en: 'after · later' },
      { c: '衣服', p: 'yīfu', pos: 'n.', en: 'clothes' },
      { c: '漂亮', p: 'piàoliang', pos: 'adj.', en: 'beautiful · pretty' },
      { c: '呀', p: 'ya', pos: 'part.', en: '(modal particle)' },
      { c: '少', p: 'shǎo', pos: 'adj.', en: 'few · little' },
      { c: '不少', p: 'bù shǎo', pos: 'adj.', en: 'quite a few · many' },
      { c: '这些', p: 'zhèxiē', pos: 'pron.', en: 'these' },
      { c: '都', p: 'dōu', pos: 'adv.', en: 'both · all' },
      { c: '张', p: 'Zhāng', pos: 'n.', en: 'Zhang (surname)' },
    ],
  },

  // ─────────────────────────────────────────── Lesson 15 ──────────────────────────────────────────
  {
    no: 15,
    han: '我是坐飞机来的',
    pinyin: 'Wǒ shì zuò fēijī lái de',
    en: 'I came here by plane',
    focus: 'The 是…的 structure · expression of a date (year + month + date + day)',
    texts: [
      {
        title: 'At the dining table',
        lines: [
          { s: 'A', c: '你和李小姐是什么时候认识的？', p: 'Nǐ hé Lǐ xiǎojiě shì shénme shíhou rènshi de?', en: 'When did you and Miss Li first meet?' },
          { s: 'B', c: '我们是2011年9月认识的。', p: 'Wǒmen shì èr líng yī yī nián jiǔ yuè rènshi de.', en: 'We met in September, 2011.' },
          { s: 'A', c: '你们在哪儿认识的？', p: 'Nǐmen zài nǎr rènshi de?', en: 'Where did you meet?' },
          { s: 'B', c: '我们是在学校认识的，她是我大学同学。', p: 'Wǒmen shì zài xuéxiào rènshi de, tā shì wǒ dàxué tóngxué.', en: 'We met at school. She was my university classmate.' },
        ],
      },
      {
        title: 'Outside a hotel',
        lines: [
          { s: 'A', c: '你们是怎么来的？', p: 'Nǐmen shì zěnme lái de?', en: 'How did you come here?' },
          { s: 'B', c: '我们是坐出租车来的。', p: 'Wǒmen shì zuò chūzūchē lái de.', en: 'We came by taxi.' },
          { s: 'A', c: '李先生呢？', p: 'Lǐ xiānsheng ne?', en: 'What about Mr Li?' },
          { s: 'B', c: '他是和朋友一起开车来的。', p: 'Tā shì hé péngyou yìqǐ kāi chē lái de.', en: 'He drove here with a friend.' },
        ],
      },
      {
        title: 'A formal greeting',
        lines: [
          { s: 'A', c: '很高兴认识您！李小姐。', p: 'Hěn gāoxìng rènshi nín! Lǐ xiǎojiě.', en: 'Nice to meet you, Miss Li.' },
          { s: 'B', c: '认识你我也很高兴！', p: 'Rènshi nǐ wǒ yě hěn gāoxìng!', en: 'Nice to meet you too.' },
          { s: 'A', c: '听张先生说，您是坐飞机来北京的？', p: 'Tīng Zhāng xiānsheng shuō, nín shì zuò fēijī lái Běijīng de?', en: 'Mr Zhang said you came to Beijing by plane, didn’t you?' },
          { s: 'B', c: '是的。', p: 'Shì de.', en: 'Yes, I did.' },
        ],
      },
    ],
    notes: [
      {
        title: 'The Structure 是…的',
        summary:
          'When the occurrence of an action is already known, 是…的 emphasises the time, place or manner in which it occurred. 是 may be omitted in affirmative/interrogative sentences, but not in negative ones.',
        examples: [
          { c: '我是坐飞机来的。', p: 'Wǒ shì zuò fēijī lái de.', en: 'I came by plane (manner).' },
          { c: '我们是在学校认识的。', p: 'Wǒmen shì zài xuéxiào rènshi de.', en: 'We met at school (place).' },
          { c: '我不是坐飞机来的。', p: 'Wǒ bú shì zuò fēijī lái de.', en: 'I didn’t come by plane.' },
        ],
      },
      {
        title: 'Expression of a Date (2): Year, Month, Date, Day of Week',
        summary:
          'Chinese dates are read from the bigger unit to the smaller. Years are read digit by digit followed by 年; months and dates use 月 and 号/日; weekday is 星期 + number.',
        examples: [
          { c: '2008年8月8日，星期五', p: 'èr líng líng bā nián bā yuè bā hào, xīngqī wǔ', en: 'August 8, 2008, Friday' },
          { c: '2011年9月', p: 'èr líng yī yī nián jiǔ yuè', en: 'September 2011' },
        ],
      },
    ],
    vocab: [
      { c: '认识', p: 'rènshi', pos: 'v.', en: 'to meet · to know' },
      { c: '年', p: 'nián', pos: 'n.', en: 'year' },
      { c: '大学', p: 'dàxué', pos: 'n.', en: 'college · university' },
      { c: '饭店', p: 'fàndiàn', pos: 'n.', en: 'hotel · restaurant' },
      { c: '出租车', p: 'chūzūchē', pos: 'n.', en: 'taxi · cab' },
      { c: '一起', p: 'yìqǐ', pos: 'adv.', en: 'together' },
      { c: '高兴', p: 'gāoxìng', pos: 'adj.', en: 'glad · happy' },
      { c: '听', p: 'tīng', pos: 'v.', en: 'to listen' },
      { c: '飞机', p: 'fēijī', pos: 'n.', en: 'airplane' },
    ],
  },
]

// 17 basic strokes taught in HSK Standard Course 1 (Lessons 1–6)
// Source: HSK 1 Standard Course · "Strokes of Chinese Characters (1)–(6)"
export const HSK1_STROKES = [
  {
    lesson: 1,
    title: 'Strokes (1)',
    items: [
      { glyph: '一', name: '横',    pinyin: 'héng', en: 'Horizontal',    direction: '→',  ex: ['一', '二'] },
      { glyph: '丨', name: '竖',    pinyin: 'shù',  en: 'Vertical',      direction: '↓',  ex: ['十', '工'] },
      { glyph: '丿', name: '撇',    pinyin: 'piě',  en: 'Left-falling',  direction: '↙',  ex: ['八', '人'] },
      { glyph: '丶', name: '点',    pinyin: 'diǎn', en: 'Dot',           direction: '↘',  ex: ['不'] },
      { glyph: '㇏', name: '捺',    pinyin: 'nà',   en: 'Right-falling', direction: '↘',  ex: ['大', '天'] },
    ],
  },
  {
    lesson: 2,
    title: 'Strokes (2)',
    items: [
      { glyph: '𠃍', name: '横折',   pinyin: 'héngzhé', en: 'Horizontal-turning', direction: '→↓', ex: ['口', '日'] },
      { glyph: '𠃊', name: '竖折',   pinyin: 'shùzhé',  en: 'Vertical-turning',   direction: '↓→', ex: ['山', '出'] },
      { glyph: '亅', name: '竖钩',   pinyin: 'shùgōu',  en: 'Vertical hook',      direction: '↓↖', ex: ['丁', '小'] },
    ],
  },
  {
    lesson: 3,
    title: 'Strokes (3)',
    items: [
      { glyph: '㇆', name: '横折钩', pinyin: 'héngzhégōu', en: 'Horizontal-turning hook', direction: '→↓↖', ex: ['门', '月'] },
      { glyph: '㇃', name: '卧钩',   pinyin: 'wògōu',      en: 'Lying hook',              direction: '↘↖',  ex: ['心', '您'] },
    ],
  },
  {
    lesson: 4,
    title: 'Strokes (4)',
    items: [
      { glyph: '㇄', name: '竖弯钩',     pinyin: 'shùwāngōu',     en: 'Vertical curved hook',          direction: '↓→↑', ex: ['七', '儿'] },
      { glyph: '㇈', name: '横折弯钩',   pinyin: 'héngzhéwāngōu', en: 'Horizontal-turning curved hook', direction: '→↓→↑', ex: ['九', '几'] },
    ],
  },
  {
    lesson: 5,
    title: 'Strokes (5)',
    items: [
      { glyph: '㇇', name: '横撇',  pinyin: 'héngpiě',  en: 'Horizontal to left-falling', direction: '→↙', ex: ['水', '又'] },
      { glyph: '㇙', name: '撇点',  pinyin: 'piědiǎn',  en: 'Left-falling to dot',        direction: '↙↘', ex: ['女', '好'] },
    ],
  },
  {
    lesson: 6,
    title: 'Strokes (6)',
    items: [
      { glyph: '㇜', name: '撇折', pinyin: 'piězhé', en: 'Left-falling to turning', direction: '↙→', ex: ['么', '东'] },
      { glyph: '㇂', name: '斜钩', pinyin: 'xiégōu', en: 'Slanting hook',           direction: '↘↗', ex: ['我', '钱'] },
      { glyph: '㇀', name: '提',   pinyin: 'tí',     en: 'Rising',                  direction: '↗',  ex: ['我', '打'] },
    ],
  },
]

// 52 single-component characters (单体字) introduced in the "Characters" section
// of each lesson in HSK Standard Course 1. Etymology notes are condensed from
// the textbook's character explanations.

// Kangxi radical lookup for the radicals that appear in HSK 1
// single-component characters. Each entry: { name, pinyin, en, desc }.
export const HSK1_RADICALS = {
  '一': { name: 'yī',     pinyin: 'yī',    en: 'one',         desc: 'A single horizontal stroke; the radical for "one" and many basic numerals.' },
  '二': { name: 'èr',     pinyin: 'èr',    en: 'two',         desc: 'Two stacked horizontal strokes; the radical for "two".' },
  '十': { name: 'shí',    pinyin: 'shí',   en: 'ten',         desc: 'A cross-shaped radical meaning "ten" or "complete".' },
  '八': { name: 'bā',     pinyin: 'bā',    en: 'eight',       desc: 'Two strokes parting outward; conveys "split" or "divide".' },
  '亠': { name: 'tóu',    pinyin: 'tóu',   en: 'lid',         desc: 'A "lid" radical placed on top of other components.' },
  '口': { name: 'kǒu',    pinyin: 'kǒu',   en: 'mouth',       desc: 'Pictograph of an open mouth; relates to speech, eating, openings.' },
  '见': { name: 'jiàn',   pinyin: 'jiàn',  en: 'see',         desc: 'Eye over person; relates to seeing and perception.' },
  '山': { name: 'shān',   pinyin: 'shān',  en: 'mountain',    desc: 'Three peaks; relates to mountains and landforms.' },
  '小': { name: 'xiǎo',   pinyin: 'xiǎo',  en: 'small',       desc: 'Tiny strokes; relates to smallness or fewness.' },
  '月': { name: 'yuè',    pinyin: 'yuè',   en: 'moon / flesh',desc: 'Crescent moon; also a "flesh" radical for body parts.' },
  '心': { name: 'xīn',    pinyin: 'xīn',   en: 'heart',       desc: 'Pictograph of the heart; relates to feelings and thought.' },
  '丨': { name: 'gǔn',    pinyin: 'gǔn',   en: 'vertical',    desc: 'A single vertical stroke radical.' },
  '人': { name: 'rén',    pinyin: 'rén',   en: 'person',      desc: 'A standing person; relates to people and human actions.' },
  '儿': { name: 'ér',     pinyin: 'ér',    en: 'legs / child',desc: 'Walking legs of a person; appears at the bottom of characters.' },
  '几': { name: 'jī',     pinyin: 'jī',    en: 'small table', desc: 'A low table; also used for "how many".' },
  '丿': { name: 'piě',    pinyin: 'piě',   en: 'slash',       desc: 'A left-falling stroke radical.' },
  '水': { name: 'shuǐ',   pinyin: 'shuǐ',  en: 'water',       desc: 'Flowing water; relates to liquids, rivers, the sea.' },
  '女': { name: 'nǚ',     pinyin: 'nǚ',    en: 'woman',       desc: 'A kneeling woman; relates to women and femininity.' },
  '乙': { name: 'yǐ',     pinyin: 'yǐ',    en: 'second',      desc: 'A twisting/hook stroke; the second of the Heavenly Stems.' },
  '大': { name: 'dà',     pinyin: 'dà',    en: 'big',         desc: 'A person with outstretched arms; relates to size and greatness.' },
  '戈': { name: 'gē',     pinyin: 'gē',    en: 'dagger-axe',  desc: 'An ancient bladed weapon; relates to war and weapons.' },
  '覀': { name: 'yà',     pinyin: 'yà',    en: 'cover',       desc: 'A "cover" radical, a variant of 西 ("west").' },
  '囗': { name: 'wéi',    pinyin: 'wéi',   en: 'enclosure',   desc: 'A boundary enclosing space; relates to boxes and surroundings.' },
  '土': { name: 'tǔ',     pinyin: 'tǔ',    en: 'earth',       desc: 'Soil mounded on the ground; relates to land, ground, places.' },
  '子': { name: 'zǐ',     pinyin: 'zǐ',    en: 'child',       desc: 'A swaddled baby; relates to children, offspring, small things.' },
  '工': { name: 'gōng',   pinyin: 'gōng',  en: 'work',        desc: "A craftsman's ruler; relates to labor and craftsmanship." },
  '木': { name: 'mù',     pinyin: 'mù',    en: 'tree / wood', desc: 'A tree with roots and branches; relates to plants, wood, timber.' },
  '田': { name: 'tián',   pinyin: 'tián',  en: 'field',       desc: 'A cultivated field divided into plots; relates to farming and land.' },
  '气': { name: 'qì',     pinyin: 'qì',    en: 'air',         desc: 'Rising vapor; relates to air, breath and gases.' },
  '雨': { name: 'yǔ',     pinyin: 'yǔ',    en: 'rain',        desc: 'Drops falling from a cloud; relates to weather phenomena.' },
  '日': { name: 'rì',     pinyin: 'rì',    en: 'sun',         desc: 'Pictograph of the sun; relates to daylight and time.' },
  '目': { name: 'mù',     pinyin: 'mù',    en: 'eye',         desc: 'Pictograph of an eye; relates to sight and vision.' },
  '廾': { name: 'gǒng',   pinyin: 'gǒng',  en: 'two hands',   desc: 'Two hands joined together to lift or hold something.' },
  '车': { name: 'chē',    pinyin: 'chē',   en: 'vehicle',     desc: 'A wheeled cart seen from above; relates to vehicles and transport.' },
  '干': { name: 'gān',    pinyin: 'gān',   en: 'shield',      desc: 'A pole or shield; relates to "to do" and dryness in modern usage.' },
  '凵': { name: 'kǎn',    pinyin: 'kǎn',   en: 'open box',    desc: 'An open container; relates to receptacles and openings.' },
  '飞': { name: 'fēi',    pinyin: 'fēi',   en: 'fly',         desc: 'Wings in flight; relates to flying and swift motion.' },
}

export const HSK1_CHARACTERS = [
  { lesson: 1, c: '一', p: 'yī',    radical: '一', en: 'one',         desc: 'A single horizontal stroke — one of the basic strokes; means "one".' },
  { lesson: 1, c: '二', p: 'èr',    radical: '二', en: 'two',         desc: 'Two horizontal strokes — means "two".' },
  { lesson: 1, c: '三', p: 'sān',   radical: '一', en: 'three',       desc: 'Three horizontal strokes — means "three".' },
  { lesson: 1, c: '十', p: 'shí',   radical: '十', en: 'ten',         desc: 'A horizontal crossed by a vertical — means "ten".' },
  { lesson: 1, c: '八', p: 'bā',    radical: '八', en: 'eight',       desc: 'Means "eight"; shaped like two strokes parting.' },
  { lesson: 1, c: '六', p: 'liù',   radical: '亠', en: 'six',         desc: 'Means "six".' },

  { lesson: 2, c: '口', p: 'kǒu',   radical: '口', en: 'mouth',       desc: 'Shaped like an open mouth; basic meaning "mouth".' },
  { lesson: 2, c: '见', p: 'jiàn',  radical: '见', en: 'to see',      desc: 'Originally an eye (目) on top of a person (人) — "watching with eyes open".' },
  { lesson: 2, c: '山', p: 'shān',  radical: '山', en: 'mountain',    desc: 'Originally shaped like rolling mountain peaks.' },
  { lesson: 2, c: '小', p: 'xiǎo',  radical: '小', en: 'small',       desc: 'Originally shaped like tiny grains of sand; opposite of 大.' },
  { lesson: 2, c: '不', p: 'bù',    radical: '一', en: 'no, not',     desc: 'Originally a tool; now a negative adverb.' },

  { lesson: 3, c: '月', p: 'yuè',   radical: '月', en: 'moon, month', desc: 'Refers to the moon; pictograph of a crescent.' },
  { lesson: 3, c: '心', p: 'xīn',   radical: '心', en: 'heart',       desc: 'Pictograph of the heart.' },
  { lesson: 3, c: '中', p: 'zhōng', radical: '丨', en: 'middle',      desc: 'Originally a flying flag; now means "middle".' },
  { lesson: 3, c: '人', p: 'rén',   radical: '人', en: 'person',      desc: 'Originally shaped like a person standing straight.' },

  { lesson: 4, c: '七', p: 'qī',    radical: '一', en: 'seven',       desc: 'Means "seven".' },
  { lesson: 4, c: '儿', p: 'ér',    radical: '儿', en: 'son, child',  desc: 'Originally meant "kid"; now usually "son".' },
  { lesson: 4, c: '几', p: 'jǐ',    radical: '几', en: 'how many',    desc: 'Originally a small low table; now means "how many".' },
  { lesson: 4, c: '九', p: 'jiǔ',   radical: '丿', en: 'nine',        desc: 'Means "nine".' },

  { lesson: 5, c: '水', p: 'shuǐ',  radical: '水', en: 'water',       desc: 'Originally a mountain stream — the shape of flowing water.' },
  { lesson: 5, c: '女', p: 'nǚ',    radical: '女', en: 'woman',       desc: 'Originally a woman kneeling on the ground — "woman".' },
  { lesson: 5, c: '了', p: 'le',    radical: '乙', en: 'particle',    desc: 'Originally an upside-down 子 (a newborn baby); now a function word.' },
  { lesson: 5, c: '大', p: 'dà',    radical: '大', en: 'big',         desc: 'Originally a person with arms and legs stretching out — "big"; opposite of 小.' },

  { lesson: 6, c: '东', p: 'dōng',  radical: '一', en: 'east',        desc: 'Where the sun rises; opposite of 西.' },
  { lesson: 6, c: '我', p: 'wǒ',    radical: '戈', en: 'I, me',       desc: 'Originally a weapon with sharp edges; now a personal pronoun.' },
  { lesson: 6, c: '西', p: 'xī',    radical: '覀', en: 'west',        desc: 'Originally shaped like a bird\u2019s nest; now means "west", opposite of 东.' },

  { lesson: 7, c: '四', p: 'sì',    radical: '囗', en: 'four',        desc: 'Means "four".' },
  { lesson: 7, c: '五', p: 'wǔ',    radical: '二', en: 'five',        desc: 'Means "five".' },
  { lesson: 7, c: '书', p: 'shū',   radical: '乙', en: 'book',        desc: 'Originally "to dip a brush in ink and write"; now means "writing" or "book".' },

  { lesson: 8, c: '少', p: 'shǎo',  radical: '小', en: 'few, little', desc: 'Opposite of 多 — a small amount or quantity.' },
  { lesson: 8, c: '个', p: 'gè',    radical: '人', en: 'measure word',desc: 'Originally meant "one individual person"; now a general measure word.' },

  { lesson: 9, c: '在', p: 'zài',   radical: '土', en: 'at, in',      desc: 'Indicates location or existence.' },
  { lesson: 9, c: '子', p: 'zǐ',    radical: '子', en: 'child, son',  desc: 'Originally meant "baby"; now has many meanings (儿子, 电子…).' },
  { lesson: 9, c: '工', p: 'gōng',  radical: '工', en: 'work, labor', desc: 'Originally a craftsman\u2019s zigzag ruler; now means "worker", "work".' },

  { lesson: 10, c: '上', p: 'shàng', radical: '一', en: 'up, above',  desc: 'A short horizontal above the baseline indicates "above".' },
  { lesson: 10, c: '下', p: 'xià',   radical: '一', en: 'down, below',desc: 'A short horizontal below the baseline indicates "below"; opposite of 上.' },
  { lesson: 10, c: '本', p: 'běn',   radical: '木', en: 'root, origin',desc: 'A tree (木) with a dot at its base — the "root" of everything.' },
  { lesson: 10, c: '末', p: 'mò',    radical: '木', en: 'tip, end',   desc: 'A tree (木) with a mark at its top — the "tip"; secondary or non-essential.' },

  { lesson: 11, c: '午', p: 'wǔ',   radical: '十', en: 'noon',        desc: 'In Chinese, refers to the period between 11 am and 1 pm — noon.' },
  { lesson: 11, c: '电', p: 'diàn', radical: '田', en: 'electricity', desc: 'Originally a flash of lightning; both a phenomenon and a form of energy.' },

  { lesson: 12, c: '天', p: 'tiān', radical: '大', en: 'sky, day',    desc: 'Originally "the top of the head"; now means "sky", opposite of 地.' },
  { lesson: 12, c: '气', p: 'qì',   radical: '气', en: 'air, gas',    desc: 'Refers to air — formless and freely spreading.' },
  { lesson: 12, c: '雨', p: 'yǔ',   radical: '雨', en: 'rain',        desc: 'Pictograph of raindrops falling from the sky.' },

  { lesson: 13, c: '日', p: 'rì',   radical: '日', en: 'sun, day',    desc: 'Pictograph of the sun.' },
  { lesson: 13, c: '目', p: 'mù',   radical: '目', en: 'eye',         desc: 'Pictograph of an eye.' },
  { lesson: 13, c: '习', p: 'xí',   radical: '乙', en: 'to study',    desc: 'Originally "to learn and review until proficient"; in modern Chinese close to 学.' },

  { lesson: 14, c: '开', p: 'kāi',  radical: '廾', en: 'to open',     desc: 'Originally two hands pulling a door latch — "to open"; many extended meanings.' },
  { lesson: 14, c: '车', p: 'chē',  radical: '车', en: 'vehicle',     desc: 'Originally an ox- or horse-drawn wheeled cart; now any land vehicle.' },
  { lesson: 14, c: '回', p: 'huí',  radical: '囗', en: 'to return',   desc: 'A whirling flow of water — originally "to rotate", now "to return".' },

  { lesson: 15, c: '年', p: 'nián', radical: '干', en: 'year',        desc: 'Originally "to carry crops home"; now means "year".' },
  { lesson: 15, c: '出', p: 'chū',  radical: '凵', en: 'to go out',   desc: 'A plant germinating and growing outward — "to come or go out".' },
  { lesson: 15, c: '飞', p: 'fēi',  radical: '飞', en: 'to fly',      desc: 'A bird or insect flying with its wings — "to fly", "quick".' },
]

// HSK 1 introduces 18 component radicals across Lessons 7–15.
// Lessons 1–6 cover basic strokes only — no radicals are taught.
// Each lesson teaches two easy, common radicals; for each radical the
// textbook gives two example characters.
export const HSK1_LESSON_RADICALS = [
  {
    lesson: 7,
    items: [
      { r: '氵', name: '三点水 (sāndiǎnshuǐ)',    en: 'water (3-dot water)', desc: 'Usually related to water, liquids and rivers.',
        examples: [{ c: '没', p: 'méi', en: 'to not have' }, { c: '河', p: 'hé', en: 'river' }] },
      { r: '讠', name: '言字旁 (yánzìpáng)',  en: 'speech',              desc: 'Usually related to language and speech.',
        examples: [{ c: '谁', p: 'shéi', en: 'who, whom' }, { c: '说', p: 'shuō', en: 'to speak' }] },
    ],
  },
  {
    lesson: 8,
    items: [
      { r: '钅', name: '金字旁 (jīnzìpáng)',  en: 'metal',               desc: 'Usually related to metal. the side component variant of 金 (jīn - gold/metal)',
        examples: [{ c: '钱', p: 'qián', en: 'money' }, { c: '银', p: 'yín', en: 'silver' }] },
      { r: '口', name: '口字旁 (kǒuzìpáng)',  en: 'mouth',               desc: 'Usually related to the mouth (eating, speaking).',
        examples: [{ c: '喝', p: 'hē', en: 'to drink' }, { c: '吃', p: 'chī', en: 'to eat' }] },
    ],
  },
  {
    lesson: 9,
    items: [
      { r: '辶', name: '走之旁 (zǒuzhīpáng)',     en: 'walking',             desc: 'Usually related to walking and movement.',
        examples: [{ c: '这', p: 'zhè', en: 'this' }, { c: '送', p: 'sòng', en: 'to send' }] },
      { r: '门', name: '门字框 (ménzìkuàng)', en: 'door frame . door · gate',         desc: 'Usually related to a room or a door.',
        examples: [{ c: '问', p: 'wèn', en: 'to ask' }, { c: '间', p: 'jiān', en: 'measure word for rooms' }] },
    ],
  },
  {
    lesson: 10,
    items: [
      { r: '囗', name: '国字框 (guózìkuàng)', en: 'enclosure',           desc: 'Usually means being trapped or besieged.',
        examples: [{ c: '国', p: 'guó', en: 'country, nation' }, { c: '困', p: 'kùn', en: 'to be trapped' }] },
      { r: '礻', name: '示字旁 (shìzìpáng)',  en: 'altar / deity',       desc: 'he side component variant of the standalone character 示 (shì - to show/reveal) — Historically derived from drawings of an altar table, characters with 礻 are tightly bound to ancestors, gods, blessings, fortune, rituals, and spiritual views.',
        examples: [{ c: '视', p: 'shì', en: 'to look, to view' }, { c: '祝', p: 'zhù', en: 'to wish' }] },
    ],
  },
  {
    lesson: 11,
    items: [
      { r: '阝', name: 'zuǒ’ěrdāo',  en: 'mound (left ear)',    desc: 'Usually related to a landform or location.',
        examples: [{ c: '院', p: 'yuàn', en: 'courtyard' }, { c: '阳', p: 'yáng', en: 'sun' }] },
      { r: '亻', name: 'dānrénpáng', en: 'person',              desc: 'Usually related to a person.',
        examples: [{ c: '你', p: 'nǐ', en: '(singular) you' }, { c: '他', p: 'tā', en: 'he, him' }] },
    ],
  },
  {
    lesson: 12,
    items: [
      { r: '女', name: 'nǚzìpáng',   en: 'woman',               desc: 'Usually related to women.',
        examples: [{ c: '姐', p: 'jiě', en: 'elder sister' }, { c: '妈', p: 'mā', en: 'mother' }] },
      { r: '饣', name: 'shízìpáng',  en: 'food',                desc: 'Usually related to food.',
        examples: [{ c: '饭', p: 'fàn', en: 'meal' }, { c: '饮', p: 'yǐn', en: 'to drink' }] },
    ],
  },
  {
    lesson: 13,
    items: [
      { r: '日', name: 'rìzìpáng',   en: 'sun · time',          desc: 'Usually related to time.',
        examples: [{ c: '明', p: 'míng', en: 'next, bright' }, { c: '时', p: 'shí', en: 'time' }] },
      { r: '目', name: 'mùzìpáng',   en: 'eye',                 desc: 'Usually related to the eyes.',
        examples: [{ c: '眼', p: 'yǎn', en: 'eye' }, { c: '睡', p: 'shuì', en: 'to sleep' }] },
    ],
  },
  {
    lesson: 14,
    items: [
      { r: '月', name: 'ròuyuèpáng', en: 'flesh (moon-form)',   desc: 'Usually related to the human body or flesh.',
        examples: [{ c: '服', p: 'fú', en: 'clothes' }, { c: '胖', p: 'pàng', en: 'fat' }] },
      { r: '扌', name: 'tíshǒupáng', en: 'hand',                desc: 'Usually indicates an action related to a hand.',
        examples: [{ c: '打', p: 'dǎ', en: 'to beat, to hit' }, { c: '找', p: 'zhǎo', en: 'to look for' }] },
    ],
  },
  {
    lesson: 15,
    items: [
      { r: '艹', name: 'cǎozìtóu',   en: 'grass / plants',      desc: 'Usually related to grass, trees or plants.',
        examples: [{ c: '茶', p: 'chá', en: 'tea' }, { c: '菜', p: 'cài', en: 'vegetable' }] },
      { r: '宀', name: 'bǎogàitóu',  en: 'roof',                desc: 'Usually related to houses.',
        examples: [{ c: '安', p: 'ān', en: 'to settle, peace' }, { c: '家', p: 'jiā', en: 'home, family' }] },
    ],
  },
]

export const useHSK1 = () => ({ HSK1_META, HSK1_LESSONS, HSK1_STROKES, HSK1_CHARACTERS, HSK1_RADICALS, HSK1_LESSON_RADICALS })
