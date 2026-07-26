// HSK 2 — HSK Standard Course 2 (姜丽萍 主编, BLCU Press)
// 15 lessons reconstructed faithfully from the textbook PDF
// (HSK 2 Standard Course-OCR.pdf). Pinyin and English are taken
// directly from the PDF body text; Chinese characters are reconstructed
// from the canonical HSK Standard Course 2 reading because the PDF's
// Chinese glyphs do not survive OCR cleanly.
//
// Lesson schema:
//   no, han, pinyin, en, focus
//   texts:  [{ title, lines: [{ s:'A'|'B', c, p, en }] }]
//   vocab:  [{ c, p, pos, en }]
//   notes?: [string]   // optional grammar bullet-points

export const HSK2_META = {
  han: '二',
  title: 'HSK 2',
  subtitle: 'Standard Course 2 · 15 lessons · 150+ new words',
  intro:
    'HSK Standard Course 2 (BLCU Press). Daily life in Mandarin: comparisons with 比, complements of result and degree, the aspect markers 了 / 着 / 过, modal particles 吧 / 呢 / 吗, prepositions 给 / 对 / 离 / 从 / 往, and more nuanced descriptions of time, distance and quantity.',
  accent: '#9b6a2f',
}

export const HSK2_LESSONS = [
  // ─── L1 ────────────────────────────────────────────────────────────────
  {
    no: 1,
    han: '九月去北京旅游最好',
    pinyin: 'Jiǔyuè qù Běijīng lǚyóu zuì hǎo',
    en: 'September is the best time to visit Beijing',
    focus: '想 (Aux) · 最 (Adv of degree) · 几 / 多 (approximate numbers)',
    notes: [
      {
        title: 'The Auxiliary Verb 想',
        summary: 'Placed before a verb, 想 expresses a wish or intention (“want to / would like to”). The negative form is 不想.',
        examples: [
          { c: '我想去北京旅游。', p: 'Wǒ xiǎng qù Běijīng lǚyóu.', en: 'I’d like to take a trip to Beijing.' },
          { c: '我不想去看电影。', p: 'Wǒ bù xiǎng qù kàn diànyǐng.', en: 'I don’t want to go to the cinema.' },
        ],
      },
      {
        title: 'The Adverb of Degree 最',
        summary: '最 means “most” — singling out the highest degree among things of the same kind or in a certain aspect.',
        examples: [
          { c: '我最喜欢踢足球。', p: 'Wǒ zuì xǐhuan tī zúqiú.', en: 'I like playing football most.' },
          { c: '九月去北京最好。', p: 'Jiǔyuè qù Běijīng zuì hǎo.', en: 'September is the best time to visit Beijing.' },
        ],
      },
      {
        title: 'Approximate Numbers · 几 and 多',
        summary: '几 + measure word indicates an indefinite number (usually under 10). 多 after a numeral-measure phrase indicates “a bit more than” that quantity.',
        examples: [
          { c: '我买了几个椅子。', p: 'Wǒ mǎi le jǐ ge yǐzi.', en: 'I bought a few chairs.' },
          { c: '它六个多月了。', p: 'Tā liù ge duō yuè le.', en: 'It is over six months old.' },
        ],
      },
    ],
    texts: [
      {
        title: 'Text 1 · 在学校 · At school',
        lines: [
          { s: 'A', c: '我要去北京旅游，你觉得什么时候去最好？', p: 'Wǒ yào qù Běijīng lǚyóu, nǐ juéde shénme shíhou qù zuì hǎo?', en: "I'm thinking of a trip to Beijing. When do you think is the best time?" },
          { s: 'B', c: '九月去北京旅游最好。', p: 'Jiǔyuè qù Běijīng lǚyóu zuì hǎo.', en: 'September is the best time to visit Beijing.' },
          { s: 'A', c: '为什么？', p: 'Wèishénme?', en: 'Why?' },
          { s: 'B', c: '九月的北京天气不冷也不热。', p: 'Jiǔyuè de Běijīng tiānqì bù lěng yě bú rè.', en: "Because it's neither cold nor hot there in September." },
        ],
      },
      {
        title: 'Text 2 · 在家 · At home',
        lines: [
          { s: 'A', c: '你喜欢什么运动？', p: 'Nǐ xǐhuan shénme yùndòng?', en: 'What sport do you like?' },
          { s: 'B', c: '我最喜欢踢足球。', p: 'Wǒ zuì xǐhuan tī zúqiú.', en: 'I like playing football.' },
          { s: 'A', c: '下午我们一起去踢足球吧。', p: 'Xiàwǔ wǒmen yìqǐ qù tī zúqiú ba.', en: "Let's go to play football this afternoon." },
          { s: 'B', c: '好啊！', p: 'Hǎo a!', en: 'Great!' },
        ],
      },
      {
        title: 'Text 3 · 在家 · At home',
        lines: [
          { s: 'A', c: '我们要不要买几个新的椅子？', p: 'Wǒmen yào bu yào mǎi jǐ ge xīn de yǐzi?', en: "Don't you think we should buy some new chairs?" },
          { s: 'B', c: '好啊。什么时候去买？', p: 'Hǎo a. Shénme shíhou qù mǎi?', en: 'Yes. When shall we go to buy them?' },
          { s: 'A', c: '明天下午怎么样？你明天几点能回来？', p: 'Míngtiān xiàwǔ zěnmeyàng? Nǐ míngtiān jǐ diǎn néng huílái?', en: 'What about tomorrow afternoon? When will you be back tomorrow?' },
          { s: 'B', c: '三点多。', p: 'Sān diǎn duō.', en: 'A little after three o’clock.' },
        ],
      },
      {
        title: 'Text 4 · 在家 · At home',
        lines: [
          { s: 'A', c: '桌子下面有个猫。', p: 'Zhuōzi xiàmiàn yǒu ge māo.', en: 'There is a cat under the table.' },
          { s: 'B', c: '那是我的猫，它叫花花。', p: 'Nà shì wǒ de māo, tā jiào Huāhua.', en: "It's my cat Huahua." },
          { s: 'A', c: '它很漂亮。', p: 'Tā hěn piàoliang.', en: "It's beautiful." },
          { s: 'B', c: '是啊，我觉得它的眼睛最漂亮。', p: 'Shì a, wǒ juéde tā de yǎnjing zuì piàoliang.', en: 'Yes. I think it has the most beautiful eyes.' },
          { s: 'A', c: '它多大了？', p: 'Tā duō dà le?', en: 'How old is it?' },
          { s: 'B', c: '六个多月。', p: 'Liù ge duō yuè.', en: 'More than six months.' },
        ],
      },
    ],
    vocab: [
      { c: '旅游',   p: 'lǚyóu',     pos: 'v.',     en: 'to travel · to take a trip' },
      { c: '觉得',   p: 'juéde',     pos: 'v.',     en: 'to think · to feel' },
      { c: '最',     p: 'zuì',       pos: 'adv.',   en: 'most · to the greatest extent' },
      { c: '为什么', p: 'wèishénme', pos: 'pron.',  en: 'why' },
      { c: '也',     p: 'yě',        pos: 'adv.',   en: 'also · too' },
      { c: '运动',   p: 'yùndòng',   pos: 'v./n.',  en: 'sport · to exercise' },
      { c: '踢足球', p: 'tī zúqiú',  pos: 'expr.',  en: 'to play football' },
      { c: '一起',   p: 'yìqǐ',      pos: 'adv.',   en: 'together' },
      { c: '要',     p: 'yào',       pos: 'v./aux.',en: 'to want to · would like to' },
      { c: '新',     p: 'xīn',       pos: 'adj.',   en: 'new' },
      { c: '它',     p: 'tā',        pos: 'pron.',  en: 'it' },
      { c: '眼睛',   p: 'yǎnjing',   pos: 'n.',     en: 'eye' },
      { c: '花花',   p: 'Huāhua',    pos: 'n.',     en: 'Huahua (proper noun)' },
    ],
  },

  // ─── L2 ────────────────────────────────────────────────────────────────
  {
    no: 2,
    han: '我每天六点起床',
    pinyin: 'Wǒ měi tiān liù diǎn qǐchuáng',
    en: 'I get up at six every day',
    focus: '是不是 questions · Pronoun 每 · Interrogative 多',
    notes: [
      {
        title: 'Questions with 是不是',
        summary: '是不是 placed before the predicate seeks confirmation of an assumption — “…isn’t it / aren’t you?”',
        examples: [
          { c: '你是不是喜欢运动？', p: 'Nǐ shì bu shì xǐhuan yùndòng?', en: 'You like sports, don’t you?' },
          { c: '他是不是你同学？', p: 'Tā shì bu shì nǐ tóngxué?', en: 'Isn’t he your classmate?' },
        ],
      },
      {
        title: 'The Pronoun 每',
        summary: '每 means “every / each” and is normally paired with the adverb 都 in the predicate.',
        examples: [
          { c: '我每天六点起床。', p: 'Wǒ měi tiān liù diǎn qǐchuáng.', en: 'I get up at six every day.' },
          { c: '他每天回来都很累。', p: 'Tā měi tiān huílai dōu hěn lèi.', en: 'Every day he comes home exhausted.' },
        ],
      },
      {
        title: 'The Interrogative 多 + Adjective',
        summary: '多 + monosyllabic adjective (大, 高, 远…) asks about degree or extent — “how + adj?”.',
        examples: [
          { c: '大卫今年多大？', p: 'Dàwèi jīnnián duō dà?', en: 'How old is David?' },
          { c: '他多高？', p: 'Tā duō gāo?', en: 'How tall is he?' },
        ],
      },
    ],
    texts: [
      {
        title: 'Text 1 · 在操场 · On the playground',
        lines: [
          { s: 'A', c: '你很少生病，是不是喜欢运动？', p: 'Nǐ hěn shǎo shēng bìng, shì bu shì xǐhuan yùndòng?', en: "You seldom get sick. I guess you like doing sports, don't you?" },
          { s: 'B', c: '是啊，我每天早上都要出去跑步。', p: 'Shì a, wǒ měi tiān zǎoshang dōu yào chūqu pǎo bù.', en: 'Yes. I go out for a jog every morning.' },
          { s: 'A', c: '你每天几点起床？', p: 'Nǐ měi tiān jǐ diǎn qǐchuáng?', en: 'What time do you get up?' },
          { s: 'B', c: '我每天六点起床。', p: 'Wǒ měi tiān liù diǎn qǐchuáng.', en: 'I get up at six every day.' },
        ],
      },
      {
        title: 'Text 2 · 在医院 · In the hospital',
        lines: [
          { s: 'A', c: '吃药了吗？现在身体怎么样？', p: 'Chī yào le ma? Xiànzài shēntǐ zěnmeyàng?', en: 'Did you take your medicine? How do you feel now?' },
          { s: 'B', c: '吃了，现在好多了。', p: 'Chī le, xiànzài hǎo duō le.', en: 'Yes, I did. I feel much better now.' },
          { s: 'A', c: '什么时候能出院？', p: 'Shénme shíhou néng chū yuàn?', en: 'When can you leave the hospital?' },
          { s: 'B', c: '医生说下个星期。', p: 'Yīshēng shuō xià ge xīngqī.', en: 'Next week according to the doctor.' },
        ],
      },
      {
        title: 'Text 3 · 在操场 · On the playground',
        lines: [
          { s: 'A', c: '大卫今年多大？', p: 'Dàwèi jīnnián duō dà?', en: 'How old is David?' },
          { s: 'B', c: '二十多岁。', p: 'Èrshí duō suì.', en: 'Above 20 years old.' },
          { s: 'A', c: '他多高？', p: 'Tā duō gāo?', en: 'How tall is he?' },
          { s: 'B', c: '一米八几。', p: 'Yī mǐ bā jǐ.', en: 'He is more than 180 centimeters tall.' },
          { s: 'A', c: '你怎么知道这么多啊？', p: 'Nǐ zěnme zhīdào zhème duō a?', en: 'How come you know so much about him?' },
          { s: 'B', c: '他是我同学。', p: 'Tā shì wǒ tóngxué.', en: 'He is my classmate.' },
        ],
      },
      {
        title: 'Text 4 · 在房间 · In the room',
        lines: [
          { s: 'A', c: '张老师星期六也不休息啊？', p: 'Zhāng lǎoshī xīngqī liù yě bù xiūxi a?', en: "Doesn't Mr. Zhang take Saturday off?" },
          { s: 'B', c: '是啊，他这几天很忙，没有时间休息。', p: 'Shì a, tā zhè jǐ tiān hěn máng, méiyǒu shíjiān xiūxi.', en: 'No. He has been busy lately. He has no time to rest.' },
          { s: 'A', c: '那会很累吧？', p: 'Nà huì hěn lèi ba?', en: 'That must be really tiring.' },
          { s: 'B', c: '他每天回来都很累。', p: 'Tā měi tiān huílai dōu hěn lèi.', en: 'Every day he comes home exhausted.' },
        ],
      },
    ],
    vocab: [
      { c: '生病',   p: 'shēng bìng', pos: 'v.',    en: 'to fall ill · to be sick' },
      { c: '每',     p: 'měi',        pos: 'pron.', en: 'every · each' },
      { c: '都',     p: 'dōu',        pos: 'adv.',  en: 'all · both' },
      { c: '早上',   p: 'zǎoshang',   pos: 'n.',    en: 'morning' },
      { c: '跑步',   p: 'pǎo bù',     pos: 'v.',    en: 'to run · to jog' },
      { c: '起床',   p: 'qǐchuáng',   pos: 'v.',    en: 'to get up · to get out of bed' },
      { c: '药',     p: 'yào',        pos: 'n.',    en: 'medicine · drug' },
      { c: '身体',   p: 'shēntǐ',     pos: 'n.',    en: 'body · health' },
      { c: '多',     p: 'duō',        pos: 'pron.', en: 'how · how much · how many' },
      { c: '出院',   p: 'chū yuàn',   pos: 'v.',    en: 'to leave hospital' },
      { c: '出',     p: 'chū',        pos: 'v.',    en: 'to come/go out' },
      { c: '高',     p: 'gāo',        pos: 'adj.',  en: 'tall · high' },
      { c: '米',     p: 'mǐ',         pos: 'm.',    en: 'meter' },
      { c: '知道',   p: 'zhīdào',     pos: 'v.',    en: 'to know' },
      { c: '休息',   p: 'xiūxi',      pos: 'v.',    en: 'to have / take a rest' },
      { c: '忙',     p: 'máng',       pos: 'adj.',  en: 'busy' },
      { c: '时间',   p: 'shíjiān',    pos: 'n.',    en: 'time' },
    ],
  },

  // ─── L3 ────────────────────────────────────────────────────────────────
  {
    no: 3,
    han: '左边那个红色的是我的',
    pinyin: 'Zuǒbian nàge hóngsè de shì wǒ de',
    en: 'The red one on the left is mine',
    focus: '的 phrase · 一下 (numeral) · Modal Adv 真',
    notes: [
      {
        title: 'The 的 Phrase',
        summary: 'A modifier + 的 (without a following noun) forms a noun-like phrase whose head is understood from context — “the … one”.',
        examples: [
          { c: '左边那个红色的是我的。', p: 'Zuǒbian nàge hóngsè de shì wǒ de.', en: 'The red one on the left is mine.' },
          { c: '这是我妈妈做的。', p: 'Zhè shì wǒ māma zuò de.', en: 'This is the one my mother made.' },
        ],
      },
      {
        title: 'The Numeral-Classifier 一下',
        summary: 'V + 一下 softens a verb, suggesting a brief or casual action — “to V a bit / for a moment”.',
        examples: [
          { c: '请你介绍一下。', p: 'Qǐng nǐ jièshào yíxià.', en: 'Please give a brief introduction.' },
          { c: '我看一下。', p: 'Wǒ kàn yíxià.', en: 'Let me have a quick look.' },
        ],
      },
      {
        title: 'The Modal Adverb 真',
        summary: '真 before an adjective expresses the speaker’s real, often emphatic, feeling — “really / truly”.',
        examples: [
          { c: '真漂亮！', p: 'Zhēn piàoliang!', en: 'How beautiful!' },
          { c: '这件衣服真贵。', p: 'Zhè jiàn yīfu zhēn guì.', en: 'This piece of clothing is really expensive.' },
        ],
      },
    ],
    texts: [
      {
        title: 'Text 1 · 在房间 · In the room',
        lines: [
          { s: 'A', c: '这块手表是你的吗？', p: 'Zhè kuài shǒubiǎo shì nǐ de ma?', en: 'Is this watch yours?' },
          { s: 'B', c: '不是我的。是我爸爸的。', p: 'Bú shì wǒ de. Shì wǒ bàba de.', en: "No, it isn't. It's my father's." },
          { s: 'A', c: '多少钱买的？', p: 'Duōshao qián mǎi de?', en: 'How much is it?' },
          { s: 'B', c: '三千多块。', p: 'Sānqiān duō kuài.', en: 'More than 3,000 yuan.' },
        ],
      },
      {
        title: 'Text 2 · 在家 · At home',
        lines: [
          { s: 'A', c: '这是今天早上的报纸吗？', p: 'Zhè shì jīntiān zǎoshang de bàozhǐ ma?', en: "Is it this morning's newspaper?" },
          { s: 'B', c: '不是，是昨天的。', p: 'Bú shì, shì zuótiān de.', en: "No, it isn't. It's yesterday's." },
          { s: 'A', c: '你听，是不是送报纸的来了？', p: 'Nǐ tīng, shì bu shì sòng bàozhǐ de lái le?', en: 'Listen. Is that the man who delivers newspaper?' },
          { s: 'B', c: '我看一下。不是，是送牛奶的。', p: 'Wǒ kàn yíxià. Bú shì, shì sòng niúnǎi de.', en: "Let me see. No, it's the milkman." },
        ],
      },
      {
        title: 'Text 3 · 在家 · At home',
        lines: [
          { s: 'A', c: '这是谁的房间？', p: 'Zhè shì shéi de fángjiān?', en: 'Whose room is this?' },
          { s: 'B', c: '这是我和我丈夫的，旁边那个小的房间是我女儿的。', p: 'Zhè shì wǒ hé wǒ zhàngfu de, pángbiān nàge xiǎo de fángjiān shì wǒ nǚ’ér de.', en: "It's my husband's and mine. The small one beside it is my daughter's." },
          { s: 'A', c: '你女儿的房间真漂亮！都是粉色的。', p: 'Nǐ nǚ’ér de fángjiān zhēn piàoliang! Dōu shì fěnsè de.', en: "Your daughter's room is so pretty! It's all pink." },
          { s: 'B', c: '是啊，粉色是我女儿最喜欢的颜色。', p: 'Shì a, fěnsè shì wǒ nǚ’ér zuì xǐhuan de yánsè.', en: 'Yes. Pink is her favorite color.' },
        ],
      },
      {
        title: 'Text 4 · 在办公室 · In the office',
        lines: [
          { s: 'A', c: '你看见我的杯子了吗？', p: 'Nǐ kànjiàn wǒ de bēizi le ma?', en: 'Have you seen my cup?' },
          { s: 'B', c: '这里有几个杯子，哪个是你的？', p: 'Zhèli yǒu jǐ ge bēizi, nǎge shì nǐ de?', en: 'Here are a few cups. Which one is yours?' },
          { s: 'A', c: '左边那个红色的是我的。', p: 'Zuǒbian nàge hóngsè de shì wǒ de.', en: 'The red one on the left is mine.' },
          { s: 'B', c: '给你。', p: 'Gěi nǐ.', en: 'Here you are.' },
        ],
      },
    ],
    vocab: [
      { c: '前边',   p: 'qiánbian',  pos: 'n.',    en: 'front · in front' },
      { c: '后边',   p: 'hòubian',   pos: 'n.',    en: 'back · behind' },
      { c: '左边',   p: 'zuǒbian',   pos: 'n.',    en: 'left side' },
      { c: '右边',   p: 'yòubian',   pos: 'n.',    en: 'right side' },
      { c: '中间',   p: 'zhōngjiān', pos: 'n.',    en: 'middle · between' },
      { c: '旁边',   p: 'pángbiān',  pos: 'n.',    en: 'beside · next to' },
      { c: '手表',   p: 'shǒubiǎo',  pos: 'n.',    en: 'watch' },
      { c: '千',     p: 'qiān',      pos: 'num.',  en: 'thousand' },
      { c: '报纸',   p: 'bàozhǐ',    pos: 'n.',    en: 'newspaper' },
      { c: '送',     p: 'sòng',      pos: 'v.',    en: 'to send · to deliver' },
      { c: '一下',   p: 'yí xià',    pos: 'num.-m.', en: 'used after a verb to indicate a brief action' },
      { c: '牛奶',   p: 'niúnǎi',    pos: 'n.',    en: 'milk' },
      { c: '房间',   p: 'fángjiān',  pos: 'n.',    en: 'room' },
      { c: '丈夫',   p: 'zhàngfu',   pos: 'n.',    en: 'husband' },
      { c: '真',     p: 'zhēn',      pos: 'adv.',  en: 'really · indeed' },
      { c: '粉色',   p: 'fěnsè',     pos: 'n.',    en: 'pink' },
      { c: '颜色',   p: 'yánsè',     pos: 'n.',    en: 'color' },
      { c: '红色',   p: 'hóngsè',    pos: 'n.',    en: 'red' },
    ],
  },

  // ─── L4 ────────────────────────────────────────────────────────────────
  {
    no: 4,
    han: '他推荐我做这个工作',
    pinyin: 'Tā tuījiàn wǒ zuò zhège gōngzuò',
    en: 'He recommended me for this job',
    focus: '是…的 · 已经…了 · Adv 就',
    notes: [
      {
        title: 'The 是…的 Structure',
        summary: 'When an action is already completed, 是…的 emphasizes the time, place, manner, or agent of that action. 是 may be omitted in affirmative sentences.',
        examples: [
          { c: '我是昨天来的。', p: 'Wǒ shì zuótiān lái de.', en: 'It was yesterday that I came.' },
          { c: '他是坐飞机来的。', p: 'Tā shì zuò fēijī lái de.', en: 'He came by plane.' },
        ],
      },
      {
        title: '已经…了',
        summary: '已经 (“already”) combines with sentence-final 了 to indicate that a situation has occurred or a state has been reached.',
        examples: [
          { c: '我已经吃了。', p: 'Wǒ yǐjīng chī le.', en: 'I have already eaten.' },
          { c: '他已经回家了。', p: 'Tā yǐjīng huí jiā le.', en: 'He has already gone home.' },
        ],
      },
      {
        title: 'The Adverb 就',
        summary: 'Before a verb, 就 stresses that something happens very soon, easily or as a matter of course.',
        examples: [
          { c: '我马上就来。', p: 'Wǒ mǎshàng jiù lái.', en: 'I’ll come right away.' },
          { c: '吃完饭就走。', p: 'Chī wán fàn jiù zǒu.', en: 'We’ll leave as soon as we finish eating.' },
        ],
      },
    ],
    texts: [
      {
        title: 'Text 1 · 在教室 · In the classroom',
        lines: [
          { s: 'A', c: '生日快乐！这是送给你的！', p: 'Shēngrì kuàilè! Zhè shì sòng gěi nǐ de!', en: 'Happy birthday! This is for you.' },
          { s: 'B', c: '是什么？是一本书吗？', p: 'Shì shénme? Shì yì běn shū ma?', en: 'What is it? Is it a book?' },
          { s: 'A', c: '对，这本书是我写的。', p: 'Duì, zhè běn shū shì wǒ xiě de.', en: 'Yes. A book written by me.' },
          { s: 'B', c: '太谢谢你了！', p: 'Tài xièxie nǐ le!', en: 'Thank you so much!' },
        ],
      },
      {
        title: 'Text 2 · 在家 · At home',
        lines: [
          { s: 'A', c: '早上有你一个电话。', p: 'Zǎoshang yǒu nǐ yí ge diànhuà.', en: 'Someone called you this morning.' },
          { s: 'B', c: '电话是谁打的？', p: 'Diànhuà shì shéi dǎ de?', en: 'Who?' },
          { s: 'A', c: '不知道，是儿子接的。', p: 'Bù zhīdào, shì érzi jiē de.', en: 'I don’t know. Our son answered it.' },
          { s: 'B', c: '好，晚上我问一下儿子。', p: 'Hǎo, wǎnshang wǒ wèn yíxià érzi.', en: "OK. I'll ask him about it this evening." },
        ],
      },
      {
        title: 'Text 3 · 在操场 · On the playground',
        lines: [
          { s: 'A', c: '你喜欢踢足球吗？', p: 'Nǐ xǐhuan tī zúqiú ma?', en: 'Do you like playing football?' },
          { s: 'B', c: '非常喜欢。', p: 'Fēicháng xǐhuan.', en: 'Yes, very much.' },
          { s: 'A', c: '你是什么时候开始踢足球的？', p: 'Nǐ shì shénme shíhou kāishǐ tī zúqiú de?', en: 'When did you begin to play football?' },
          { s: 'B', c: '我十一岁的时候开始踢足球，已经踢了十年了。', p: 'Wǒ shíyī suì de shíhou kāishǐ tī zúqiú, yǐjīng tī le shí nián le.', en: 'I was 11 when I played football for the first time. It has been 10 years.' },
        ],
      },
      {
        title: 'Text 4 · 在公司 · In the company',
        lines: [
          { s: 'A', c: '你在这儿工作多长时间了？', p: 'Nǐ zài zhèr gōngzuò duō cháng shíjiān le?', en: 'How long have you been working here?' },
          { s: 'B', c: '已经两年多了，我是二零一一年来的。', p: 'Yǐjīng liǎng nián duō le, wǒ shì èr líng yī yī nián lái de.', en: 'More than two years, since 2011.' },
          { s: 'A', c: '你认识谢先生吗？', p: 'Nǐ rènshi Xiè xiānsheng ma?', en: 'Do you know Mr. Xie?' },
          { s: 'B', c: '认识，我们是大学同学，这个工作是他帮我介绍的。', p: 'Rènshi, wǒmen shì dàxué tóngxué, zhège gōngzuò shì tā bāng wǒ jièshào de.', en: 'Yes. He is my college classmate. He recommended me for this job.' },
        ],
      },
    ],
    vocab: [
      { c: '生日',   p: 'shēngrì',   pos: 'n.',    en: 'birthday' },
      { c: '快乐',   p: 'kuàilè',    pos: 'adj.',  en: 'happy · glad' },
      { c: '给',     p: 'gěi',       pos: 'prep.', en: '(after a verb) to · for' },
      { c: '接',     p: 'jiē',       pos: 'v.',    en: 'to receive · to take · to answer' },
      { c: '晚上',   p: 'wǎnshang',  pos: 'n.',    en: 'evening · night' },
      { c: '问',     p: 'wèn',       pos: 'v.',    en: 'to ask' },
      { c: '非常',   p: 'fēicháng',  pos: 'adv.',  en: 'very · extremely' },
      { c: '开始',   p: 'kāishǐ',    pos: 'v.',    en: 'to begin · to start' },
      { c: '已经',   p: 'yǐjīng',    pos: 'adv.',  en: 'already' },
      { c: '长',     p: 'cháng',     pos: 'adj.',  en: 'long' },
      { c: '两',     p: 'liǎng',     pos: 'num.',  en: 'two' },
      { c: '帮',     p: 'bāng',      pos: 'v.',    en: 'to help · to assist' },
      { c: '介绍',   p: 'jièshào',   pos: 'v.',    en: 'to introduce · to recommend' },
    ],
  },

  // ─── L5 ────────────────────────────────────────────────────────────────
  {
    no: 5,
    han: '就买这件吧',
    pinyin: 'Jiù mǎi zhè jiàn ba',
    en: 'Take this one',
    focus: 'Adv 就 · Modal Adv 还 (1) · Modal Particle 吧',
    notes: [
      {
        title: 'The Adverb 就 (Range / Limitation)',
        summary: '就 can narrow the focus to a single item — “just / only this one”.',
        examples: [
          { c: '我就要这个。', p: 'Wǒ jiù yào zhège.', en: 'I just want this one.' },
          { c: '他就喜欢看书。', p: 'Tā jiù xǐhuan kàn shū.', en: 'He only likes reading.' },
        ],
      },
      {
        title: 'The Modal Adverb 还 (1)',
        summary: '还 before a verb / adjective means “in addition / also / still”, adding extra information or actions.',
        examples: [
          { c: '我还想买一件。', p: 'Wǒ hái xiǎng mǎi yí jiàn.', en: 'I’d like to buy another one as well.' },
          { c: '外面还在下雨。', p: 'Wàimiàn hái zài xià yǔ.', en: 'It is still raining outside.' },
        ],
      },
      {
        title: 'The Modal Particle 吧 — Suggestion',
        summary: 'Sentence-final 吧 softens an utterance into a suggestion, request, or polite imperative.',
        examples: [
          { c: '我们一起去吧。', p: 'Wǒmen yìqǐ qù ba.', en: 'Let’s go together.' },
          { c: '你来试试吧。', p: 'Nǐ lái shìshi ba.', en: 'Come and have a try.' },
        ],
      },
    ],
    texts: [
      {
        title: 'Text 1 · 在家 · At home',
        lines: [
          { s: 'A', c: '晚上我们去饭馆吃饭，怎么样？', p: 'Wǎnshang wǒmen qù fànguǎn chī fàn, zěnmeyàng?', en: "Let's go to a restaurant for dinner. What do you think?" },
          { s: 'B', c: '我不想去外面吃，我想在家吃。', p: 'Wǒ bù xiǎng qù wàimiàn chī, wǒ xiǎng zài jiā chī.', en: "I don't want to eat out. I want to eat at home." },
          { s: 'A', c: '那你准备做什么呢？', p: 'Nà nǐ zhǔnbèi zuò shénme ne?', en: 'What are you planning to cook?' },
          { s: 'B', c: '就做你爱吃的鱼吧。', p: 'Jiù zuò nǐ ài chī de yú ba.', en: "I'm thinking of fish, your favorite." },
        ],
      },
      {
        title: 'Text 2 · 在商店 · In a store',
        lines: [
          { s: 'A', c: '帮我看一下这件衣服怎么样。', p: 'Bāng wǒ kàn yíxià zhè jiàn yīfu zěnmeyàng.', en: 'What do you think of this garment?' },
          { s: 'B', c: '颜色还可以，就是有点儿大。', p: 'Yánsè hái kěyǐ, jiùshì yǒudiǎnr dà.', en: 'The color is OK, but it seems too large.' },
          { s: 'A', c: '这件小的怎么样？', p: 'Zhè jiàn xiǎo de zěnmeyàng?', en: 'What about this small one?' },
          { s: 'B', c: '这件不错，就买这件吧。', p: 'Zhè jiàn búcuò, jiù mǎi zhè jiàn ba.', en: 'This one is good. Take this one.' },
        ],
      },
      {
        title: 'Text 3 · 在教室 · In the classroom',
        lines: [
          { s: 'A', c: '今天去不去打球？', p: 'Jīntiān qù bu qù dǎ qiú?', en: 'Will you go to play the ball today?' },
          { s: 'B', c: '这两天有点儿累，不去打球了。', p: 'Zhè liǎng tiān yǒudiǎnr lèi, bú qù dǎ qiú le.', en: "No, I won't. I've been feeling tired lately." },
          { s: 'A', c: '你在做什么呢？是在想昨天的考试吗？', p: 'Nǐ zài zuò shénme ne? Shì zài xiǎng zuótiān de kǎoshì ma?', en: "What are you doing? Are you thinking about yesterday's test?" },
          { s: 'B', c: '是啊，我觉得听和说还可以，读和写不好，很多字我都不知道是什么意思。', p: 'Shì a, wǒ juéde tīng hé shuō hái kěyǐ, dú hé xiě bù hǎo, hěn duō zì wǒ dōu bù zhīdào shì shénme yìsi.', en: "Yes. I think I did OK in listening and speaking, but not in reading and writing. I didn't know the meanings of many characters." },
        ],
      },
      {
        title: 'Text 4 · 在公司 · In the company',
        lines: [
          { s: 'A', c: '休息一下吧，喝咖啡吗？', p: 'Xiūxi yíxià ba, hē kāfēi ma?', en: "Let's take a rest. Would you like some coffee?" },
          { s: 'B', c: '不喝了，我已经喝两杯了。', p: 'Bù hē le, wǒ yǐjīng hē liǎng bēi le.', en: "No, thanks. I've already had two cups." },
          { s: 'A', c: '是啊，咖啡喝多了对身体不好。', p: 'Shì a, kāfēi hē duō le duì shēntǐ bù hǎo.', en: 'Right. Too much coffee is bad for our health.' },
          { s: 'B', c: '以后我少喝一点儿，每天喝一杯。', p: 'Yǐhòu wǒ shǎo hē yìdiǎnr, měi tiān hē yì bēi.', en: "I'll drink less coffee. One cup a day." },
        ],
      },
    ],
    vocab: [
      { c: '外面',   p: 'wàimiàn',   pos: 'n.',    en: 'outside' },
      { c: '准备',   p: 'zhǔnbèi',   pos: 'v.',    en: 'to intend · to plan · to prepare' },
      { c: '就',     p: 'jiù',       pos: 'adv.',  en: 'used to indicate a conclusion or resolution' },
      { c: '鱼',     p: 'yú',        pos: 'n.',    en: 'fish' },
      { c: '吧',     p: 'ba',        pos: 'part.', en: 'sentence-final particle (suggestion / request)' },
      { c: '件',     p: 'jiàn',      pos: 'm.',    en: 'measure word for clothes etc.' },
      { c: '还',     p: 'hái',       pos: 'adv.',  en: 'passably · fairly' },
      { c: '可以',   p: 'kěyǐ',      pos: 'adj.',  en: 'not bad · OK' },
      { c: '不错',   p: 'búcuò',     pos: 'adj.',  en: 'pretty good' },
      { c: '考试',   p: 'kǎoshì',    pos: 'n.',    en: 'test · exam' },
      { c: '意思',   p: 'yìsi',      pos: 'n.',    en: 'meaning' },
      { c: '咖啡',   p: 'kāfēi',     pos: 'n.',    en: 'coffee' },
      { c: '对',     p: 'duì',       pos: 'prep.', en: 'to · for (toward)' },
      { c: '以后',   p: 'yǐhòu',     pos: 'n.',    en: 'after · afterwards · later' },
    ],
  },

  // ─── L6 ────────────────────────────────────────────────────────────────
  {
    no: 6,
    han: '你怎么不多吃点儿',
    pinyin: 'Nǐ zěnme bù duō chī diǎnr',
    en: "Why don't you eat more",
    focus: 'Interrogative 怎么 · Measure-word reduplication · 因为…所以…',
    notes: [
      {
        title: 'The Interrogative 怎么',
        summary: '怎么 asks about manner (“how?”) or reason/cause (“how come / why?”) depending on context.',
        examples: [
          { c: '这个字怎么写？', p: 'Zhège zì zěnme xiě?', en: 'How do you write this character?' },
          { c: '你怎么不吃了？', p: 'Nǐ zěnme bù chī le?', en: 'How come you’re not eating any more?' },
        ],
      },
      {
        title: 'Reduplication of Measure Words',
        summary: 'A reduplicated measure word (个个, 天天, 件件) means “every / each one” and usually pairs with 都.',
        examples: [
          { c: '他天天都跑步。', p: 'Tā tiāntiān dōu pǎo bù.', en: 'He goes jogging every day.' },
          { c: '个个都很漂亮。', p: 'Gègè dōu hěn piàoliang.', en: 'Every one of them is beautiful.' },
        ],
      },
      {
        title: '因为…所以… · Cause and Result',
        summary: 'A paired conjunction linking a cause clause (因为…) with a result clause (所以…). Either half may be omitted in conversation.',
        examples: [
          { c: '因为下雨，所以我们不去了。', p: 'Yīnwèi xià yǔ, suǒyǐ wǒmen bú qù le.', en: 'Because it’s raining, we’re not going.' },
          { c: '因为他生病了，所以没来。', p: 'Yīnwèi tā shēng bìng le, suǒyǐ méi lái.', en: 'He didn’t come because he was sick.' },
        ],
      },
    ],
    texts: [
      {
        title: 'Text 1 · 在学校 · At school',
        lines: [
          { s: 'A', c: '你知道小王今天什么时候来学校吗？', p: 'Nǐ zhīdào Xiǎo Wáng jīntiān shénme shíhou lái xuéxiào ma?', en: 'Do you know when Xiao Wang will come to school today?' },
          { s: 'B', c: '他已经来了。', p: 'Tā yǐjīng lái le.', en: 'He is already here.' },
          { s: 'A', c: '你怎么知道他来了？', p: 'Nǐ zěnme zhīdào tā lái le?', en: 'How do you know?' },
          { s: 'B', c: '我在门外看见他的自行车了。', p: 'Wǒ zài mén wài kànjiàn tā de zìxíngchē le.', en: 'I saw his bike outside the door.' },
        ],
      },
      {
        title: 'Text 2 · 在饭馆 · In a restaurant',
        lines: [
          { s: 'A', c: '今天的羊肉很好吃，你怎么不吃了？', p: 'Jīntiān de yángròu hěn hǎochī, nǐ zěnme bù chī le?', en: "The mutton today is excellent. Why don't you eat more?" },
          { s: 'B', c: '这个星期天天都吃羊肉，不想吃了。', p: 'Zhège xīngqī tiāntiān dōu chī yángròu, bù xiǎng chī le.', en: "I eat mutton every day this week. I don't want to eat it any more." },
          { s: 'A', c: '那你还想吃什么？', p: 'Nà nǐ hái xiǎng chī shénme?', en: 'What would you like then?' },
          { s: 'B', c: '来一点儿面条吧。', p: 'Lái yìdiǎnr miàntiáo ba.', en: 'Some noodles please.' },
        ],
      },
      {
        title: 'Text 3 · 在体育馆 · In the gym',
        lines: [
          { s: 'A', c: '昨天你们怎么都没去打篮球？', p: 'Zuótiān nǐmen zěnme dōu méi qù dǎ lánqiú?', en: "Why didn't you guys go to play basketball yesterday?" },
          { s: 'B', c: '因为昨天下雨，所以我们都没去。我去游泳了。', p: 'Yīnwèi zuótiān xià yǔ, suǒyǐ wǒmen dōu méi qù. Wǒ qù yóu yǒng le.', en: 'Because it rained yesterday. I went swimming.' },
          { s: 'A', c: '你经常游泳吗？', p: 'Nǐ jīngcháng yóu yǒng ma?', en: 'Do you often swim?' },
          { s: 'B', c: '这个月我天天游泳，我现在七十公斤了。', p: 'Zhège yuè wǒ tiāntiān yóu yǒng, wǒ xiànzài qīshí gōngjīn le.', en: 'I swim every day this month. I weigh 70 kilograms now.' },
        ],
      },
      {
        title: 'Text 4 · 在办公室 · In the office',
        lines: [
          { s: 'A', c: '这两天怎么没看见小张？', p: 'Zhè liǎng tiān zěnme méi kànjiàn Xiǎo Zhāng?', en: "I haven't seen Xiao Zhang for days. What's going on?" },
          { s: 'B', c: '他去北京了。', p: 'Tā qù Běijīng le.', en: 'He has gone to Beijing.' },
          { s: 'A', c: '去北京了？是去旅游吗？', p: 'Qù Běijīng le? Shì qù lǚyóu ma?', en: 'Gone to Beijing? For traveling?' },
          { s: 'B', c: '不是，听说是去看他姐姐。', p: 'Bú shì, tīngshuō shì qù kàn tā jiějie.', en: "No. Visiting his elder sister, as far as I've heard." },
        ],
      },
    ],
    vocab: [
      { c: '门',     p: 'mén',        pos: 'n.',    en: 'door · gate' },
      { c: '外',     p: 'wài',        pos: 'n.',    en: 'outer · outside' },
      { c: '自行车', p: 'zìxíngchē',  pos: 'n.',    en: 'bike · bicycle' },
      { c: '羊肉',   p: 'yángròu',    pos: 'n.',    en: 'mutton · lamb' },
      { c: '好吃',   p: 'hǎochī',     pos: 'adj.',  en: 'delicious · yummy' },
      { c: '面条',   p: 'miàntiáo',   pos: 'n.',    en: 'noodles' },
      { c: '打篮球', p: 'dǎ lánqiú',  pos: 'v.',    en: 'to play basketball' },
      { c: '因为',   p: 'yīnwèi',     pos: 'conj.', en: 'because · since' },
      { c: '所以',   p: 'suǒyǐ',      pos: 'conj.', en: 'so · therefore' },
      { c: '游泳',   p: 'yóu yǒng',   pos: 'v.',    en: 'to swim' },
      { c: '经常',   p: 'jīngcháng',  pos: 'adv.',  en: 'often · frequently' },
      { c: '公斤',   p: 'gōngjīn',    pos: 'm.',    en: 'kilogram' },
      { c: '姐姐',   p: 'jiějie',     pos: 'n.',    en: 'elder sister' },
    ],
  },

  // ─── L7 ────────────────────────────────────────────────────────────────
  {
    no: 7,
    han: '你家离公司远吗',
    pinyin: 'Nǐ jiā lí gōngsī yuǎn ma',
    en: 'Do you live far from your company',
    focus: 'Modal Adv 还 (2) · Adv 就 · Verb 离 · Particle 呢',
    notes: [
      {
        title: 'The Modal Adverb 还 (2)',
        summary: 'In comparisons or descriptions, 还 means “even more” — pushing a quality further than expected.',
        examples: [
          { c: '今天比昨天还冷。', p: 'Jīntiān bǐ zuótiān hái lěng.', en: 'Today is even colder than yesterday.' },
          { c: '他比我还高。', p: 'Tā bǐ wǒ hái gāo.', en: 'He is even taller than I am.' },
        ],
      },
      {
        title: 'The Verb 离',
        summary: '离 expresses distance between two places or moments in time: A 离 B + 远 / 近 / 多远.',
        examples: [
          { c: '我家离公司很近。', p: 'Wǒ jiā lí gōngsī hěn jìn.', en: 'My home is close to the company.' },
          { c: '学校离这儿不远。', p: 'Xuéxiào lí zhèr bù yuǎn.', en: 'The school isn’t far from here.' },
        ],
      },
      {
        title: 'The Modal Particle 呢',
        summary: 'Sentence-final 呢 can form a follow-up question (“and you?”) or emphasize that a state is still ongoing.',
        examples: [
          { c: '我很好，你呢？', p: 'Wǒ hěn hǎo, nǐ ne?', en: 'I’m fine, and you?' },
          { c: '他还在睡觉呢。', p: 'Tā hái zài shuì jiào ne.', en: 'He’s still sleeping.' },
        ],
      },
    ],
    texts: [
      {
        title: 'Text 1 · 在家 · At home',
        lines: [
          { s: 'A', c: '大卫回来了吗？', p: 'Dàwèi huílái le ma?', en: 'Is David back?' },
          { s: 'B', c: '没有，他还在教室里学习呢。', p: 'Méiyǒu, tā hái zài jiàoshì lǐ xuéxí ne.', en: 'No. He is still studying in the classroom.' },
          { s: 'A', c: '已经九点多了，他怎么还在学习？', p: 'Yǐjīng jiǔ diǎn duō le, tā zěnme hái zài xuéxí?', en: "It's after 9 o'clock. Why is he still studying?" },
          { s: 'B', c: '明天有考试，他说今天要好好准备。', p: 'Míngtiān yǒu kǎoshì, tā shuō jīntiān yào hǎohāo zhǔnbèi.', en: "There will be a test tomorrow. He said he'll work hard in preparation for it today." },
        ],
      },
      {
        title: 'Text 2 · 在去机场的路上 · On the way to the airport',
        lines: [
          { s: 'A', c: '你现在在哪儿呢？', p: 'Nǐ xiànzài zài nǎr ne?', en: 'Where are you now?' },
          { s: 'B', c: '在去机场的路上。你到了吗？', p: 'Zài qù jīchǎng de lùshang. Nǐ dào le ma?', en: "I'm on the way to the airport. Have you arrived?" },
          { s: 'A', c: '我下飞机了。你还有多长时间能到这儿？', p: 'Wǒ xià fēijī le. Nǐ hái yǒu duō cháng shíjiān néng dào zhèr?', en: "I've got off the plane. How many more minutes do you need to get here?" },
          { s: 'B', c: '二十分钟就到。', p: 'Èrshí fēnzhōng jiù dào.', en: 'In 20 minutes.' },
        ],
      },
      {
        title: 'Text 3 · 在体育馆 · In the gym',
        lines: [
          { s: 'A', c: '你家离公司远吗？', p: 'Nǐ jiā lí gōngsī yuǎn ma?', en: 'Do you live far from your company?' },
          { s: 'B', c: '很远，坐公共汽车要一个多小时呢！', p: 'Hěn yuǎn, zuò gōnggòng qìchē yào yí ge duō xiǎoshí ne!', en: 'Yes, very far. It takes more than one hour by bus.' },
          { s: 'A', c: '坐公共汽车太慢了，你怎么不开车？', p: 'Zuò gōnggòng qìchē tài màn le, nǐ zěnme bù kāi chē?', en: "Buses are slow. Why don't you drive?" },
          { s: 'B', c: '开车也不快，路上车太多了！', p: 'Kāi chē yě bú kuài, lùshang chē tài duō le!', en: "It's not fast either. There are too many cars on the road." },
        ],
      },
      {
        title: 'Text 4 · 在路上 · On the way',
        lines: [
          { s: 'A', c: '今天晚上我们一起吃饭吧，给你过生日。', p: 'Jīntiān wǎnshang wǒmen yìqǐ chī fàn ba, gěi nǐ guò shēngrì.', en: "Let's have dinner together tonight to celebrate your birthday." },
          { s: 'B', c: '今天？离我的生日还有一个多星期呢！', p: 'Jīntiān? Lí wǒ de shēngrì hái yǒu yí ge duō xīngqī ne!', en: 'Tonight? My birthday is more than one week later.' },
          { s: 'A', c: '下个星期我要去北京，今天过吧。', p: 'Xià ge xīngqī wǒ yào qù Běijīng, jīntiān guò ba.', en: "Next week I'll go to Beijing. Let's celebrate it today." },
          { s: 'B', c: '好吧，离这儿不远有一个中国饭馆，走几分钟就到了。', p: 'Hǎo ba, lí zhèr bù yuǎn yǒu yí ge Zhōngguó fànguǎn, zǒu jǐ fēnzhōng jiù dào le.', en: "Fine. There's a Chinese restaurant nearby, only a few minutes' walk away." },
        ],
      },
    ],
    vocab: [
      { c: '教室',     p: 'jiàoshì',          pos: 'n.',    en: 'classroom' },
      { c: '机场',     p: 'jīchǎng',          pos: 'n.',    en: 'airport' },
      { c: '路',       p: 'lù',               pos: 'n.',    en: 'road · path · way' },
      { c: '离',       p: 'lí',               pos: 'v.',    en: 'to be away from' },
      { c: '公司',     p: 'gōngsī',           pos: 'n.',    en: 'company · firm' },
      { c: '远',       p: 'yuǎn',             pos: 'adj.',  en: 'far · distant' },
      { c: '公共汽车', p: 'gōnggòng qìchē',   pos: 'n.',    en: 'bus' },
      { c: '小时',     p: 'xiǎoshí',          pos: 'n.',    en: 'hour' },
      { c: '慢',       p: 'màn',              pos: 'adj.',  en: 'slow' },
      { c: '快',       p: 'kuài',             pos: 'adj.',  en: 'quick · fast' },
      { c: '过',       p: 'guò',              pos: 'v.',    en: 'to pass / spend (time)' },
      { c: '走',       p: 'zǒu',              pos: 'v.',    en: 'to walk' },
      { c: '到',       p: 'dào',              pos: 'v.',    en: 'to arrive · to reach' },
    ],
  },

  // ─── L8 ────────────────────────────────────────────────────────────────
  {
    no: 8,
    han: '让我想想再告诉你',
    pinyin: 'Ràng wǒ xiǎngxiang zài gàosu nǐ',
    en: "Let me think about it and I'll tell you later",
    focus: 'Interrogative + 吗 · Adv 再 · Pivotal sentences · Verb reduplication',
    notes: [
      {
        title: 'Interrogative Pronoun + 吗',
        summary: 'An interrogative pronoun (什么, 谁, 哪儿…) used with 吗 forms a rhetorical question whose meaning is the opposite of its surface form.',
        examples: [
          { c: '你知道什么吗？', p: 'Nǐ zhīdào shénme ma?', en: 'What do you really know? (= You don’t know anything.)' },
          { c: '他来过这儿吗？', p: 'Tā lái guo zhèr ma?', en: 'Has he ever been here? (rhetorical)' },
        ],
      },
      {
        title: 'The Adverb 再',
        summary: '再 before a verb means “again” or “then” — placing an action after another in sequence.',
        examples: [
          { c: '让我想想再告诉你。', p: 'Ràng wǒ xiǎngxiang zài gàosu nǐ.', en: 'Let me think it over and then tell you.' },
          { c: '请你再说一遍。', p: 'Qǐng nǐ zài shuō yí biàn.', en: 'Please say it once more.' },
        ],
      },
      {
        title: 'Pivotal Sentences',
        summary: 'A pivotal sentence has two verbs sharing one noun: the object of V1 (often 让 / 请 / 叫) is also the subject of V2.',
        examples: [
          { c: '老师让我们读课文。', p: 'Lǎoshī ràng wǒmen dú kèwén.', en: 'The teacher has us read the text.' },
          { c: '我请他吃饭。', p: 'Wǒ qǐng tā chī fàn.', en: 'I invited him to dinner.' },
        ],
      },
      {
        title: 'Reduplication of Verbs',
        summary: 'A reduplicated monosyllabic verb (看看, 试试) suggests a brief, casual or tentative action. Disyllabic verbs follow the pattern ABAB (休息休息).',
        examples: [
          { c: '你看看这个。', p: 'Nǐ kànkan zhège.', en: 'Take a look at this.' },
          { c: '我们休息休息吧。', p: 'Wǒmen xiūxi xiūxi ba.', en: 'Let’s take a little rest.' },
        ],
      },
    ],
    texts: [
      {
        title: 'Text 1 · 在教室 · In the classroom',
        lines: [
          { s: 'A', c: '我们下午去看电影，好吗？', p: 'Wǒmen xiàwǔ qù kàn diànyǐng, hǎo ma?', en: "Let's go to see a movie this afternoon, shall we?" },
          { s: 'B', c: '今天下午我没有时间，明天下午再去吧。', p: 'Jīntiān xiàwǔ wǒ méiyǒu shíjiān, míngtiān xiàwǔ zài qù ba.', en: "I'm not free this afternoon. Let's go tomorrow afternoon." },
          { s: 'A', c: '你想看什么电影？', p: 'Nǐ xiǎng kàn shénme diànyǐng?', en: 'Which movie would you like to see?' },
          { s: 'B', c: '让我想想再告诉你。', p: 'Ràng wǒ xiǎngxiang zài gàosu nǐ.', en: "Let me think about it and I'll tell you later." },
        ],
      },
      {
        title: 'Text 2 · 在宿舍 · In the dorm',
        lines: [
          { s: 'A', c: '外边天气很好，我们出去运动运动吧！', p: 'Wàibiān tiānqì hěn hǎo, wǒmen chūqu yùndòng yùndòng ba!', en: "It's a nice day outside. Let's go out to do some exercise." },
          { s: 'B', c: '你等等我，好吗？王老师让我给大卫打个电话。', p: 'Nǐ děngdeng wǒ, hǎo ma? Wáng lǎoshī ràng wǒ gěi Dàwèi dǎ ge diànhuà.', en: 'Please wait for me for a minute, will you? Professor Wang asked me to give David a call.' },
          { s: 'A', c: '回来再打吧。找大卫有什么事情吗？', p: 'Huílai zài dǎ ba. Zhǎo Dàwèi yǒu shénme shìqing ma?', en: "Call him after we come back. What's the matter?" },
          { s: 'B', c: '听说大卫病了，我想找时间去看看他。', p: 'Tīngshuō Dàwèi bìng le, wǒ xiǎng zhǎo shíjiān qù kànkan tā.', en: 'I heard that David is sick. I want to visit him sometime.' },
        ],
      },
      {
        title: 'Text 3 · 宾馆前台 · At the front desk of a hotel',
        lines: [
          { s: 'A', c: '服务员，我房间的门打不开了。', p: 'Fúwùyuán, wǒ fángjiān de mén dǎ bu kāi le.', en: "Excuse me, I can't open my door." },
          { s: 'B', c: '您住哪个房间？', p: 'Nín zhù nǎge fángjiān?', en: 'Which room do you stay in?' },
          { s: 'A', c: '三一七。', p: 'Sān yāo qī.', en: 'Room 317.' },
          { s: 'B', c: '好的，我叫人去看看。', p: 'Hǎo de, wǒ jiào rén qù kànkan.', en: "OK. I'll send someone to have a check." },
        ],
      },
      {
        title: 'Text 4 · 在商店 · In a store',
        lines: [
          { s: 'A', c: '你看看这几件衣服怎么样。', p: 'Nǐ kànkan zhè jǐ jiàn yīfu zěnmeyàng.', en: 'What do you think of these dresses?' },
          { s: 'B', c: '这件白的有点儿长，那件黑的有点儿贵。', p: 'Zhè jiàn bái de yǒudiǎnr cháng, nà jiàn hēi de yǒudiǎnr guì.', en: 'This white one is a little bit too long. That black one is a bit expensive.' },
          { s: 'A', c: '这件红的呢？这是今天新来的。', p: 'Zhè jiàn hóng de ne? Zhè shì jīntiān xīn lái de.', en: 'What about this red one? This one has just got here today.' },
          { s: 'B', c: '让我再看看。', p: 'Ràng wǒ zài kànkan.', en: "Thanks. I'll look around." },
        ],
      },
    ],
    vocab: [
      { c: '再',     p: 'zài',       pos: 'adv.',  en: 'again · once more' },
      { c: '让',     p: 'ràng',      pos: 'v.',    en: 'to let · to allow' },
      { c: '告诉',   p: 'gàosu',     pos: 'v.',    en: 'to tell' },
      { c: '等',     p: 'děng',      pos: 'v.',    en: 'to wait · to await' },
      { c: '找',     p: 'zhǎo',      pos: 'v.',    en: 'to look for · to seek' },
      { c: '事情',   p: 'shìqing',   pos: 'n.',    en: 'thing · matter · affair' },
      { c: '服务员', p: 'fúwùyuán',  pos: 'n.',    en: 'attendant · waiter / waitress' },
      { c: '白',     p: 'bái',       pos: 'adj.',  en: 'white' },
      { c: '黑',     p: 'hēi',       pos: 'adj.',  en: 'black' },
      { c: '贵',     p: 'guì',       pos: 'adj.',  en: 'expensive' },
    ],
  },

  // ─── L9 ────────────────────────────────────────────────────────────────
  {
    no: 9,
    han: '题太多，我没都做完',
    pinyin: 'Tí tài duō, wǒ méi dōu zuòwán',
    en: "There were too many questions; I didn't finish all of them",
    focus: 'Result complements · Prep 从 · 第~ (order)',
    notes: [
      {
        title: 'Complements of Result',
        summary: 'A verb + result-element (完, 到, 见, 好, 懂…) describes the outcome of an action. Negation uses 没(有) before the verb.',
        examples: [
          { c: '问题太多，我没回答完。', p: 'Wèntí tài duō, wǒ méi huídá wán.', en: 'There were too many questions; I didn’t finish answering them.' },
          { c: '我听懂了。', p: 'Wǒ tīng dǒng le.', en: 'I understood (heard it clearly).' },
        ],
      },
      {
        title: 'The Preposition 从',
        summary: '从 introduces a starting point in time or place — “from …”. It often pairs with 到 (“… to …”).',
        examples: [
          { c: '我从北京来。', p: 'Wǒ cóng Běijīng lái.', en: 'I come from Beijing.' },
          { c: '从九点到十一点上课。', p: 'Cóng jiǔ diǎn dào shíyī diǎn shàng kè.', en: 'Class is from 9 to 11.' },
        ],
      },
      {
        title: '第~ · Ordinal Numbers',
        summary: '第 + numeral + measure word forms an ordinal — “the first, the second…”.',
        examples: [
          { c: '这是我第一次来中国。', p: 'Zhè shì wǒ dì yī cì lái Zhōngguó.', en: 'This is my first time in China.' },
          { c: '第三个问题最难。', p: 'Dì sān ge wèntí zuì nán.', en: 'The third question is the hardest.' },
        ],
      },
    ],
    texts: [
      {
        title: 'Text 1 · 在电话 · On the phone',
        lines: [
          { s: 'A', c: '你好！请问张欢在吗？', p: 'Nǐ hǎo! Qǐngwèn Zhāng Huān zài ma?', en: 'Hello! May I speak to Zhang Huan?' },
          { s: 'B', c: '你打错了，我们这儿没有叫张欢的。', p: 'Nǐ dǎ cuò le, wǒmen zhèr méiyǒu jiào Zhāng Huān de.', en: "You've got the wrong number. There isn't a person called Zhang Huan here." },
          { s: 'A', c: '对不起。', p: 'Duìbuqǐ.', en: "I'm sorry." },
        ],
      },
      {
        title: 'Text 2 · 在学校 · At school',
        lines: [
          { s: 'A', c: '您从几岁开始学习跳舞？', p: 'Nín cóng jǐ suì kāishǐ xuéxí tiào wǔ?', en: 'At what age did you start to learn dancing?' },
          { s: 'B', c: '我第一次跳舞是在七岁的时候。', p: 'Wǒ dì-yī cì tiào wǔ shì zài qī suì de shíhou.', en: 'I was seven when I danced for the first time.' },
          { s: 'A', c: '我女儿今年也七岁了。我希望她能跟您学跳舞，可以吗？', p: 'Wǒ nǚ’ér jīnnián yě qī suì le. Wǒ xīwàng tā néng gēn nín xué tiào wǔ, kěyǐ ma?', en: 'My daughter is seven now. I hope she can learn to dance from you, can she?' },
          { s: 'B', c: '没问题，非常欢迎。', p: 'Méi wèntí, fēicháng huānyíng.', en: "Sure. It's my pleasure." },
        ],
      },
      {
        title: 'Text 3 · 在家 · At home',
        lines: [
          { s: 'A', c: '你知道吗？大卫找到工作了。', p: 'Nǐ zhīdào ma? Dàwèi zhǎodào gōngzuò le.', en: 'You know what? David has got a job.' },
          { s: 'B', c: '太好了！他从什么时候开始上班？', p: 'Tài hǎo le! Tā cóng shénme shíhou kāishǐ shàng bān?', en: "That's great! When will he start to work?" },
          { s: 'A', c: '从下个星期一开始。', p: 'Cóng xià ge xīngqī yī kāishǐ.', en: 'Next Monday.' },
          { s: 'B', c: '这是他的第一个工作，希望他能喜欢。', p: 'Zhè shì tā de dì-yī ge gōngzuò, xīwàng tā néng xǐhuan.', en: 'This is his first job. I hope he will like it.' },
        ],
      },
      {
        title: 'Text 4 · 在教室 · In the classroom',
        lines: [
          { s: 'A', c: '昨天的考试怎么样？你都听懂了吗？', p: 'Zuótiān de kǎoshì zěnmeyàng? Nǐ dōu tīngdǒng le ma?', en: 'How was the test yesterday? Did you understand everything you heard?' },
          { s: 'B', c: '听懂了。', p: 'Tīngdǒng le.', en: 'Yes, I did.' },
          { s: 'A', c: '你都做完了没有？', p: 'Nǐ dōu zuòwán le méiyǒu?', en: 'Did you finish the test paper?' },
          { s: 'B', c: '题太多，我没做完。', p: 'Tí tài duō, wǒ méi zuòwán.', en: "There were too many questions, I didn't finish all of them." },
        ],
      },
    ],
    vocab: [
      { c: '错',     p: 'cuò',        pos: 'adj.', en: 'wrong · incorrect' },
      { c: '从',     p: 'cóng',       pos: 'prep.',en: 'from' },
      { c: '跳舞',   p: 'tiào wǔ',    pos: 'v.',   en: 'to dance' },
      { c: '第一',   p: 'dì-yī',      pos: 'num.', en: 'first' },
      { c: '希望',   p: 'xīwàng',     pos: 'v.',   en: 'to hope · to wish' },
      { c: '问题',   p: 'wèntí',      pos: 'n.',   en: 'question · problem' },
      { c: '欢迎',   p: 'huānyíng',   pos: 'v.',   en: 'to welcome' },
      { c: '上班',   p: 'shàng bān',  pos: 'v.',   en: 'to work · to do a job' },
      { c: '懂',     p: 'dǒng',       pos: 'v.',   en: 'to understand · to know' },
      { c: '完',     p: 'wán',        pos: 'v.',   en: 'to finish · to end' },
      { c: '题',     p: 'tí',         pos: 'n.',   en: 'question · problem (on a test)' },
    ],
  },

  // ─── L10 ───────────────────────────────────────────────────────────────
  {
    no: 10,
    han: '别找手机了，手机在桌子上呢',
    pinyin: 'Bié zhǎo shǒujī le, shǒujī zài zhuōzi shang ne',
    en: 'Stop looking for your cell phone — it’s on the desk',
    focus: 'Imperative sentences (别…了 / 不要…了) · Prep 对',
    notes: [
      {
        title: 'Imperative: 别…了 / 不要…了',
        summary: 'These patterns advise the listener to stop doing — or not to start — something. 了 marks the change of state.',
        examples: [
          { c: '别找了，手机在桌子上。', p: 'Bié zhǎo le, shǒujī zài zhuōzi shàng.', en: 'Stop looking — the phone is on the table.' },
          { c: '不要哭了。', p: 'Búyào kū le.', en: 'Don’t cry any more.' },
        ],
      },
      {
        title: 'The Preposition 对',
        summary: '对 + N introduces the target or recipient of an attitude or action — “toward / to / about (someone)”.',
        examples: [
          { c: '他对我很好。', p: 'Tā duì wǒ hěn hǎo.', en: 'He treats me very well.' },
          { c: '我对中国文化很感兴趣。', p: 'Wǒ duì Zhōngguó wénhuà hěn gǎn xìngqù.', en: 'I’m very interested in Chinese culture.' },
        ],
      },
    ],
    texts: [
      {
        title: 'Text 1 · 在家 · At home',
        lines: [
          { s: 'A', c: '不要看电视了，明天上午还有汉语课呢。', p: 'Búyào kàn diànshì le, míngtiān shàngwǔ hái yǒu Hànyǔ kè ne.', en: "Stop watching TV. You'll have a Chinese class tomorrow morning." },
          { s: 'B', c: '看电视对学汉语有帮助。', p: 'Kàn diànshì duì xué Hànyǔ yǒu bāngzhù.', en: 'Watching TV is good for Chinese learning.' },
          { s: 'A', c: '明天的课你都准备好了吗？', p: 'Míngtiān de kè nǐ dōu zhǔnbèi hǎo le ma?', en: 'Are you well prepared for the lessons tomorrow?' },
          { s: 'B', c: '都准备好了。', p: 'Dōu zhǔnbèi hǎo le.', en: 'Yes, I am.' },
        ],
      },
      {
        title: 'Text 2 · 在医院 · In the hospital',
        lines: [
          { s: 'A', c: '别看报纸了，医生说你要多休息。', p: 'Bié kàn bàozhǐ le, yīshēng shuō nǐ yào duō xiūxi.', en: 'Stop reading the newspaper. The doctor said you need more rest.' },
          { s: 'B', c: '好，不看了。给我一杯茶吧。', p: 'Hǎo, bú kàn le. Gěi wǒ yì bēi chá ba.', en: 'OK. Give me a cup of tea.' },
          { s: 'A', c: '医生说吃药后两个小时不要喝茶。', p: 'Yīshēng shuō chī yào hòu liǎng ge xiǎoshí búyào hē chá.', en: "The doctor said you shouldn't drink tea during the first two hours after you've taken the medicine." },
          { s: 'B', c: '医生还说什么了？', p: 'Yīshēng hái shuō shénme le?', en: 'What else did the doctor say?' },
          { s: 'A', c: '医生让你听我的。', p: 'Yīshēng ràng nǐ tīng wǒ de.', en: 'The doctor said you should listen to me.' },
        ],
      },
      {
        title: 'Text 3 · 在家 · At home',
        lines: [
          { s: 'A', c: '你怎么买了这么多东西啊？', p: 'Nǐ zěnme mǎi le zhème duō dōngxi a?', en: 'Why did you buy so many things?' },
          { s: 'B', c: '哥哥今天中午回来吃饭。', p: 'Gēge jīntiān zhōngwǔ huílái chī fàn.', en: 'Our elder brother will come back to have lunch.' },
          { s: 'A', c: '我看看买什么了。羊肉、鸡蛋、面条、西瓜……真不少！妈妈呢？', p: 'Wǒ kànkan mǎi shénme le. Yángròu, jīdàn, miàntiáo, xīguā…zhēn bù shǎo! Māma ne?', en: "Let me see. Mutton, eggs, noodles, watermelon... That's a lot! Where is Mom?" },
          { s: 'B', c: '正在准备午饭呢！', p: 'Zhèngzài zhǔnbèi wǔfàn ne!', en: 'She is preparing lunch!' },
        ],
      },
      {
        title: 'Text 4 · 在家 · At home',
        lines: [
          { s: 'A', c: '你在找什么？', p: 'Nǐ zài zhǎo shénme?', en: 'What are you looking for?' },
          { s: 'B', c: '你看见我的手机了吗？白色的。', p: 'Nǐ kànjiàn wǒ de shǒujī le ma? Báisè de.', en: "Have you seen my cell phone? It's white." },
          { s: 'A', c: '别找了，手机在桌子上呢，电脑旁边。', p: 'Bié zhǎo le, shǒujī zài zhuōzi shang ne, diànnǎo pángbiān.', en: "Stop looking for your cell phone. It's on the desk, beside the computer." },
          { s: 'B', c: '你看见我的衣服了吗？红色的那件。', p: 'Nǐ kànjiàn wǒ de yīfu le ma? Hóngsè de nà jiàn.', en: 'Have you seen my garment? The red one.' },
          { s: 'A', c: '那件衣服我帮你洗了，在外边呢。', p: 'Nà jiàn yīfu wǒ bāng nǐ xǐ le, zài wàibiān ne.', en: "I have washed it for you. It's hung outside." },
        ],
      },
    ],
    vocab: [
      { c: '课',     p: 'kè',        pos: 'n.',    en: 'class · lesson' },
      { c: '帮助',   p: 'bāngzhù',   pos: 'v.',    en: 'to help · to assist · to aid' },
      { c: '别',     p: 'bié',       pos: 'adv.',  en: "don't" },
      { c: '哥哥',   p: 'gēge',      pos: 'n.',    en: 'elder brother' },
      { c: '鸡蛋',   p: 'jīdàn',     pos: 'n.',    en: '(hen’s) egg' },
      { c: '西瓜',   p: 'xīguā',     pos: 'n.',    en: 'watermelon' },
      { c: '正在',   p: 'zhèngzài',  pos: 'adv.',  en: 'in the process of' },
      { c: '手机',   p: 'shǒujī',    pos: 'n.',    en: 'cell phone' },
      { c: '洗',     p: 'xǐ',        pos: 'v.',    en: 'to wash · to bathe' },
    ],
  },

  // ─── L11 ───────────────────────────────────────────────────────────────
  {
    no: 11,
    han: '他比我大三岁',
    pinyin: 'Tā bǐ wǒ dà sān suì',
    en: 'He is three years older than me',
    focus: 'V (P) as attributive · 比 sentence (1) · Aux 可能',
    notes: [
      {
        title: 'Verb (Phrase) + 的 as Attributive',
        summary: 'A verb or verb-phrase plus 的 modifies a noun, behaving like a relative clause in English.',
        examples: [
          { c: '这是我买的书。', p: 'Zhè shì wǒ mǎi de shū.', en: 'This is the book that I bought.' },
          { c: '昨天来的人是我同学。', p: 'Zuótiān lái de rén shì wǒ tóngxué.', en: 'The person who came yesterday is my classmate.' },
        ],
      },
      {
        title: 'The 比 Sentence (1)',
        summary: 'A 比 B + Adj compares two things — “A is more Adj than B”. The adverbs 很 / 真 / 非常 cannot appear before the adjective.',
        examples: [
          { c: '他比我大三岁。', p: 'Tā bǐ wǒ dà sān suì.', en: 'He is three years older than I am.' },
          { c: '今天比昨天热。', p: 'Jīntiān bǐ zuótiān rè.', en: 'Today is hotter than yesterday.' },
        ],
      },
      {
        title: 'The Auxiliary Verb 可能',
        summary: '可能 before a verb expresses possibility — “may / might / be likely to”. Negative: 不可能.',
        examples: [
          { c: '明天可能下雨。', p: 'Míngtiān kěnéng xià yǔ.', en: 'It may rain tomorrow.' },
          { c: '他不可能不知道。', p: 'Tā bù kěnéng bù zhīdào.', en: 'It’s impossible that he doesn’t know.' },
        ],
      },
    ],
    texts: [
      {
        title: 'Text 1 · 在卡拉OK · In a karaoke bar',
        lines: [
          { s: 'A', c: '王芳，昨天和你一起唱歌的人是谁？', p: 'Wáng Fāng, zuótiān hé nǐ yìqǐ chàng gē de rén shì shéi?', en: 'Wang Fang, who was the guy with you in the karaoke yesterday?' },
          { s: 'B', c: '一个朋友。', p: 'Yí ge péngyou.', en: 'A friend.' },
          { s: 'A', c: '什么朋友？是不是男朋友？', p: 'Shénme péngyou? Shì bu shì nán péngyou?', en: 'What friend? Boyfriend?' },
          { s: 'B', c: '不是不是，我同学介绍的，昨天第一次见。', p: 'Bú shì bú shì, wǒ tóngxué jièshào de, zuótiān dì-yī cì jiàn.', en: 'No. My classmate set me up with him. We met only yesterday.' },
        ],
      },
      {
        title: 'Text 2 · 在宿舍 · In the dorm',
        lines: [
          { s: 'A', c: '左边这个看报纸的女孩子是你姐姐吗？', p: 'Zuǒbian zhège kàn bàozhǐ de nǚ háizi shì nǐ jiějie ma?', en: 'Is the girl on the left reading a newspaper your elder sister?' },
          { s: 'B', c: '是，右边写字的那个人是我哥哥。', p: 'Shì, yòubian xiě zì de nàge rén shì wǒ gēge.', en: 'Yes. And the guy on the right writing is my elder brother.' },
          { s: 'A', c: '你哥哥多大？', p: 'Nǐ gēge duō dà?', en: 'How old is he?' },
          { s: 'B', c: '二十五岁，他比我大三岁。', p: 'Èrshíwǔ suì, tā bǐ wǒ dà sān suì.', en: '25. He is three years older than me.' },
        ],
      },
      {
        title: 'Text 3 · 在商店 · At a store',
        lines: [
          { s: 'A', c: '今天的西瓜怎么卖？', p: 'Jīntiān de xīguā zěnme mài?', en: "What's the price of watermelons today?" },
          { s: 'B', c: '三块五一斤。', p: 'Sān kuài wǔ yì jīn.', en: 'Three yuan and a half per 500 grams.' },
          { s: 'A', c: '比昨天便宜了。', p: 'Bǐ zuótiān piányi le.', en: "It's cheaper than the price yesterday." },
          { s: 'B', c: '是，苹果也比昨天便宜一些。您来点儿吧。', p: 'Shì, píngguǒ yě bǐ zuótiān piányi yìxiē. Nín lái diǎnr ba.', en: 'Yes. The apples are also cheaper. Why not take some?' },
        ],
      },
      {
        title: 'Text 4 · 在学校 · At school',
        lines: [
          { s: 'A', c: '前边说话的那个人就是我的汉语老师。你可能不认识她。', p: 'Qiánbian shuō huà de nàge rén jiù shì wǒ de Hànyǔ lǎoshī. Nǐ kěnéng bú rènshi tā.', en: 'The woman speaking in front of us is my Chinese teacher. You may not know her.' },
          { s: 'B', c: '是新来的汉语老师吗？', p: 'Shì xīn lái de Hànyǔ lǎoshī ma?', en: 'Is she a new-comer?' },
          { s: 'A', c: '是去年来的，她姓王，二十八岁。', p: 'Shì qùnián lái de, tā xìng Wáng, èrshíbā suì.', en: 'She came here last year. Her family name is Wang, 28 years old.' },
          { s: 'B', c: '她比我们老师小两岁。', p: 'Tā bǐ wǒmen lǎoshī xiǎo liǎng suì.', en: "She is two years younger than my teacher." },
        ],
      },
    ],
    vocab: [
      { c: '唱歌',   p: 'chàng gē',  pos: 'v.',     en: 'to sing' },
      { c: '男',     p: 'nán',       pos: 'adj.',   en: 'man · male' },
      { c: '女',     p: 'nǚ',        pos: 'adj.',   en: 'woman · female' },
      { c: '孩子',   p: 'háizi',     pos: 'n.',     en: 'child · kid' },
      { c: '右边',   p: 'yòubian',   pos: 'n.',     en: 'right · right side' },
      { c: '比',     p: 'bǐ',        pos: 'prep.',  en: 'than · (compared) to' },
      { c: '便宜',   p: 'piányi',    pos: 'adj.',   en: 'cheap · inexpensive' },
      { c: '说话',   p: 'shuō huà',  pos: 'v.',     en: 'to speak · to say · to talk' },
      { c: '可能',   p: 'kěnéng',    pos: 'aux.',   en: 'maybe · perhaps · probably' },
      { c: '去年',   p: 'qùnián',    pos: 'n.',     en: 'last year' },
      { c: '姓',     p: 'xìng',      pos: 'v.',     en: 'family name · surname' },
    ],
  },

  // ─── L12 ───────────────────────────────────────────────────────────────
  {
    no: 12,
    han: '你穿得太少了',
    pinyin: 'Nǐ chuān de tài shǎo le',
    en: 'You wear too little',
    focus: 'Degree complements (V + 得 + Adj) · 比 sentence (2)',
    notes: [
      {
        title: 'Complement of Degree · V 得 + Adj',
        summary: 'V 得 + adjective describes how an action is performed (“…well / fast / a lot”). With an object: (V) O V 得 + Adj.',
        examples: [
          { c: '他汉语说得很好。', p: 'Tā Hànyǔ shuō de hěn hǎo.', en: 'He speaks Chinese very well.' },
          { c: '你穿得太少了。', p: 'Nǐ chuān de tài shǎo le.', en: 'You’re wearing too little.' },
        ],
      },
      {
        title: 'The 比 Sentence (2)',
        summary: 'After the adjective in a 比 sentence, add 一点儿 / 一些 (a little more), 多 / 得多 (much more), or 还 / 更 (even more) to specify the difference.',
        examples: [
          { c: '他比我大三岁。', p: 'Tā bǐ wǒ dà sān suì.', en: 'He is three years older than me.' },
          { c: '今天比昨天冷得多。', p: 'Jīntiān bǐ zuótiān lěng de duō.', en: 'Today is much colder than yesterday.' },
        ],
      },
    ],
    texts: [
      {
        title: 'Text 1 · 在教室 · In the classroom',
        lines: [
          { s: 'A', c: '你每天早上几点起床？', p: 'Nǐ měi tiān zǎoshang jǐ diǎn qǐchuáng?', en: 'When do you get up every morning?' },
          { s: 'B', c: '六点多。', p: 'Liù diǎn duō.', en: 'A few minutes past six.' },
          { s: 'A', c: '你比我早起一个小时。', p: 'Nǐ bǐ wǒ zǎo qǐ yí ge xiǎoshí.', en: 'You get up one hour earlier than I do.' },
          { s: 'B', c: '我睡得也早，我每天晚上十点就睡觉。早睡早起身体好。', p: 'Wǒ shuì de yě zǎo, wǒ měi tiān wǎnshang shí diǎn jiù shuì jiào. Zǎo shuì zǎo qǐ shēntǐ hǎo.', en: "I go to bed early also, at 10 o'clock every night. It's healthy to keep early hours." },
        ],
      },
      {
        title: "Text 2 · 在朋友家 · At a friend's home",
        lines: [
          { s: 'A', c: '再来点儿米饭吧，你吃得太少了。', p: 'Zài lái diǎnr mǐfàn ba, nǐ chī de tài shǎo le.', en: 'Have more rice, please. You ate too little.' },
          { s: 'B', c: '不少了，今天吃得很好，太谢谢你了。', p: 'Bù shǎo le, jīntiān chī de hěn hǎo, tài xièxie nǐ le.', en: "Not a little actually. I've enjoyed the meal a lot. Thank you so much." },
          { s: 'A', c: '你做饭做得怎么样？', p: 'Nǐ zuò fàn zuò de zěnmeyàng?', en: 'How well can you cook?' },
          { s: 'B', c: '不怎么样，我妻子比我做得好。', p: 'Bù zěnmeyàng, wǒ qīzi bǐ wǒ zuò de hǎo.', en: 'Not very well. My wife is a better cook than I am.' },
        ],
      },
      {
        title: 'Text 3 · 在房子门口 · At the door of the house',
        lines: [
          { s: 'A', c: '下雪了，今天真冷。', p: 'Xià xuě le, jīntiān zhēn lěng.', en: "It's snowing. It's really cold today." },
          { s: 'B', c: '有零下十度吧？', p: 'Yǒu líng xià shí dù ba?', en: 'The temperature may be 10 degrees below zero, am I right?' },
          { s: 'A', c: '是啊，你穿得太少了，我们进房间吧。', p: 'Shì a, nǐ chuān de tài shǎo le, wǒmen jìn fángjiān ba.', en: "Yes. You wear too little. Let's go inside the house, OK?" },
          { s: 'B', c: '好吧。', p: 'Hǎo ba.', en: 'OK.' },
        ],
      },
      {
        title: 'Text 4 · 在家 · At home',
        lines: [
          { s: 'A', c: '你在忙什么呢？', p: 'Nǐ zài máng shénme ne?', en: 'What are you busy with?' },
          { s: 'B', c: '我弟弟让我帮他找个房子，现在他家离公司有点儿远。', p: 'Wǒ dìdi ràng wǒ bāng tā zhǎo ge fángzi, xiànzài tā jiā lí gōngsī yǒudiǎnr yuǎn.', en: 'My younger brother asked me to find an apartment for him. He now lives far from the company.' },
          { s: 'A', c: '住得远真的很累！', p: 'Zhù de yuǎn zhēn de hěn lèi!', en: "It's really exhausting to live far." },
          { s: 'B', c: '是啊，他也希望能住得近一点儿。', p: 'Shì a, tā yě xīwàng néng zhù de jìn yìdiǎnr.', en: 'It’s true. He also wants to live nearer.' },
        ],
      },
    ],
    vocab: [
      { c: '得',     p: 'de',        pos: 'part.', en: 'particle introducing a complement of result / degree' },
      { c: '妻子',   p: 'qīzi',      pos: 'n.',    en: 'wife' },
      { c: '雪',     p: 'xuě',       pos: 'n.',    en: 'snow' },
      { c: '零',     p: 'líng',      pos: 'num.',  en: 'zero' },
      { c: '度',     p: 'dù',        pos: 'n.',    en: 'degree' },
      { c: '穿',     p: 'chuān',     pos: 'v.',    en: 'to wear · to put on' },
      { c: '进',     p: 'jìn',       pos: 'v.',    en: 'to enter · to come / go in' },
      { c: '弟弟',   p: 'dìdi',      pos: 'n.',    en: 'younger brother' },
      { c: '近',     p: 'jìn',       pos: 'adj.',  en: 'near · close' },
    ],
  },

  // ─── L13 ───────────────────────────────────────────────────────────────
  {
    no: 13,
    han: '门开着呢',
    pinyin: 'Mén kāi zhe ne',
    en: 'The door is open',
    focus: 'Particle 着 · 不是…吗 (rhetorical) · Prep 往',
    notes: [
      {
        title: 'The Structural Particle 着',
        summary: 'V + 着 indicates that the state resulting from an action is continuing — “to be V-ing / to remain V-ed”.',
        examples: [
          { c: '门开着呢。', p: 'Mén kāi zhe ne.', en: 'The door is open.' },
          { c: '他穿着一件白衣服。', p: 'Tā chuān zhe yí jiàn bái yīfu.', en: 'He is wearing a white shirt.' },
        ],
      },
      {
        title: 'Rhetorical Question · 不是…吗',
        summary: '不是…吗 affirms a fact by phrasing it as a question, often expressing mild surprise or reminder.',
        examples: [
          { c: '他不是你哥哥吗？', p: 'Tā bú shì nǐ gēge ma?', en: 'Isn’t he your older brother?' },
          { c: '你不是已经吃过了吗？', p: 'Nǐ bú shì yǐjīng chī guo le ma?', en: 'Haven’t you already eaten?' },
        ],
      },
      {
        title: 'The Preposition 往',
        summary: '往 + direction / place + V indicates the direction of movement — “toward / to (somewhere)”.',
        examples: [
          { c: '一直往前走。', p: 'Yìzhí wǎng qián zǒu.', en: 'Walk straight ahead.' },
          { c: '往右拐。', p: 'Wǎng yòu guǎi.', en: 'Turn right.' },
        ],
      },
    ],
    texts: [
      {
        title: 'Text 1 · 在办公室 · In the office',
        lines: [
          { s: 'A', c: '门开着呢，请进。', p: 'Mén kāi zhe ne, qǐng jìn.', en: 'The door is open. Come on in.' },
          { s: 'B', c: '请问，张先生在吗？', p: 'Qǐngwèn, Zhāng xiānsheng zài ma?', en: 'Excuse me, is Mr. Zhang in?' },
          { s: 'A', c: '他出去了。你下午再来吧。', p: 'Tā chūqu le. Nǐ xiàwǔ zài lái ba.', en: "He's gone out. Please come in the afternoon." },
          { s: 'B', c: '好的，谢谢！', p: 'Hǎo de, xièxie!', en: 'OK. Thank you!' },
        ],
      },
      {
        title: 'Text 2 · 在办公室 · In the office',
        lines: [
          { s: 'A', c: '那个正在说话的女孩儿是谁？', p: 'Nàge zhèngzài shuō huà de nǚháir shì shéi?', en: 'Who is the girl speaking?' },
          { s: 'B', c: '我知道她的名字，她姓杨，叫杨笑笑，她姐姐是我同学。', p: 'Wǒ zhīdào tā de míngzi, tā xìng Yáng, jiào Yáng Xiàoxiao, tā jiějie shì wǒ tóngxué.', en: 'I know her name. Her name is Yang Xiaoxiao. Yang is her family name. Her elder sister is my classmate.' },
          { s: 'A', c: '那个手里拿着铅笔的呢？', p: 'Nàge shǒu lǐ ná zhe qiānbǐ de ne?', en: 'What about the girl with a pencil in her hand?' },
          { s: 'B', c: '我不认识。', p: 'Wǒ bú rènshi.', en: "That one I don't know." },
        ],
      },
      {
        title: 'Text 3 · 在操场 · On the playground',
        lines: [
          { s: 'A', c: '听说你有女朋友了？我认识她吗？', p: 'Tīngshuō nǐ yǒu nǚpéngyou le? Wǒ rènshi tā ma?', en: 'I heard you have a girlfriend now? Do I know her?' },
          { s: 'B', c: '就是我们班那个长着两个大眼睛、非常爱笑的女孩儿。', p: 'Jiù shì wǒmen bān nàge zhǎng zhe liǎng ge dà yǎnjing, fēicháng ài xiào de nǚháir.', en: 'She is the girl in our class with big eyes and a smiling face.' },
          { s: 'A', c: '她不是有男朋友吗？', p: 'Tā bú shì yǒu nánpéngyou ma?', en: "She's already got a boyfriend, hasn't she?" },
          { s: 'B', c: '那个已经是她的前男友了。', p: 'Nàge yǐjīng shì tā de qián nányǒu le.', en: "That's her ex now." },
        ],
      },
      {
        title: 'Text 4 · 在路上 · On the road',
        lines: [
          { s: 'A', c: '请问，这儿离新京宾馆远吗？', p: 'Qǐngwèn, zhèr lí Xīnjīng Bīnguǎn yuǎn ma?', en: 'Excuse me, is Xinjing Hotel far away from here?' },
          { s: 'B', c: '不远，走路二十分钟就到。', p: 'Bù yuǎn, zǒu lù èrshí fēnzhōng jiù dào.', en: "No, it's about a 20 minutes' walk." },
          { s: 'A', c: '你能告诉我怎么走吗？', p: 'Nǐ néng gàosu wǒ zěnme zǒu ma?', en: 'Could you tell me how to get there?' },
          { s: 'B', c: '从这儿一直往前走，到了前面的路口再往右走。', p: 'Cóng zhèr yìzhí wǎng qián zǒu, dào le qiánmiàn de lùkǒu zài wǎng yòu zǒu.', en: 'Walk straight ahead from here and turn right at the first crossing.' },
        ],
      },
    ],
    vocab: [
      { c: '着',     p: 'zhe',       pos: 'part.', en: 'particle indicating a state' },
      { c: '手',     p: 'shǒu',      pos: 'n.',    en: 'hand' },
      { c: '拿',     p: 'ná',        pos: 'v.',    en: 'to hold · to take · to bring' },
      { c: '铅笔',   p: 'qiānbǐ',    pos: 'n.',    en: 'pencil' },
      { c: '班',     p: 'bān',       pos: 'n.',    en: 'class · grade · team' },
      { c: '长',     p: 'zhǎng',     pos: 'v.',    en: 'to grow · to develop' },
      { c: '笑',     p: 'xiào',      pos: 'v.',    en: 'to smile · to laugh' },
      { c: '宾馆',   p: 'bīnguǎn',   pos: 'n.',    en: 'hotel' },
      { c: '一直',   p: 'yìzhí',     pos: 'adv.',  en: 'straight · all along' },
      { c: '往',     p: 'wǎng',      pos: 'prep.', en: 'to · towards' },
      { c: '路口',   p: 'lùkǒu',     pos: 'n.',    en: 'crossing · crossroads' },
    ],
  },

  // ─── L14 ───────────────────────────────────────────────────────────────
  {
    no: 14,
    han: '你看过那个电影没有',
    pinyin: 'Nǐ kàn guo nàge diànyǐng méiyǒu',
    en: 'Have you seen that movie',
    focus: 'Particle 过 · 虽然…但是… · Frequency 次',
    notes: [
      {
        title: 'The Aspect Particle 过',
        summary: 'V + 过 indicates that an action has been experienced at some time in the past. Negative: 没(有) + V + 过.',
        examples: [
          { c: '你看过那个电影吗？', p: 'Nǐ kàn guo nàge diànyǐng ma?', en: 'Have you seen that movie?' },
          { c: '我没去过中国。', p: 'Wǒ méi qù guo Zhōngguó.', en: 'I have never been to China.' },
        ],
      },
      {
        title: '虽然…但是… · Although / But',
        summary: 'A paired conjunction expressing concession: 虽然 introduces the conceded fact, 但是 introduces the contrasting result.',
        examples: [
          { c: '虽然累，但是很高兴。', p: 'Suīrán lèi, dànshì hěn gāoxìng.', en: 'Although tired, I’m very happy.' },
          { c: '虽然下雨，但是我们还去。', p: 'Suīrán xià yǔ, dànshì wǒmen hái qù.', en: 'Even though it’s raining, we’re still going.' },
        ],
      },
      {
        title: 'Complement of Frequency · 次',
        summary: 'Numeral + 次 after a verb tells how many times an action occurs. With an object, the order is V + Num + 次 + O.',
        examples: [
          { c: '我去过两次北京。', p: 'Wǒ qù guo liǎng cì Běijīng.', en: 'I’ve been to Beijing twice.' },
          { c: '他看了三次。', p: 'Tā kàn le sān cì.', en: 'He watched it three times.' },
        ],
      },
    ],
    texts: [
      {
        title: 'Text 1 · 在教室 · In the classroom',
        lines: [
          { s: 'A', c: '你看过那个电影没有？', p: 'Nǐ kàn guo nàge diànyǐng méiyǒu?', en: 'Have you seen that movie?' },
          { s: 'B', c: '没看过，听说很有意思。', p: 'Méi kàn guo, tīngshuō hěn yǒu yìsi.', en: 'No. I was told it is fantastic.' },
          { s: 'A', c: '那我们下个星期一起去看吧？', p: 'Nà wǒmen xià ge xīngqī yìqǐ qù kàn ba?', en: "Why don't we see it together next week?" },
          { s: 'B', c: '可以，但是我女朋友也想去。', p: 'Kěyǐ, dànshì wǒ nǚpéngyou yě xiǎng qù.', en: 'OK. But my girlfriend also wants to go.' },
        ],
      },
      {
        title: 'Text 2 · 在办公室 · In the office',
        lines: [
          { s: 'A', c: '听说你去过中国，还想去吗？', p: 'Tīngshuō nǐ qù guo Zhōngguó, hái xiǎng qù ma?', en: "It's said you've been to China. Do you want to go there again?" },
          { s: 'B', c: '我虽然去过好几次，但是还想再去玩儿玩儿。', p: 'Wǒ suīrán qù guo hǎo jǐ cì, dànshì hái xiǎng zài qù wánrwánr.', en: "Though I've been there several times, I still want to go for pleasure again." },
          { s: 'A', c: '那我们一起去吧。', p: 'Nà wǒmen yìqǐ qù ba.', en: "Let's go together." },
          { s: 'B', c: '好啊，到时候我给你打电话。', p: "Hǎo a, dào shíhou wǒ gěi nǐ dǎ diànhuà.", en: "Great. I'll call you then." },
        ],
      },
      {
        title: 'Text 3 · 在房间 · In the room',
        lines: [
          { s: 'A', c: '明天天气怎么样？', p: 'Míngtiān tiānqì zěnmeyàng?', en: 'How will the weather be tomorrow?' },
          { s: 'B', c: '虽然是晴天，但是很冷。', p: 'Suīrán shì qíngtiān, dànshì hěn lěng.', en: 'It will be fine, but cold.' },
          { s: 'A', c: '那还能去跑步吗？', p: 'Nà hái néng qù pǎo bù ma?', en: 'In that case, is it OK to go jogging?' },
          { s: 'B', c: '可以，但是你自己去吧，我还有很多事情要做。', p: 'Kěyǐ, dànshì nǐ zìjǐ qù ba, wǒ hái yǒu hěn duō shìqing yào zuò.', en: "I think so. But I'm afraid you have to go by yourself because I have a lot of work to do." },
        ],
      },
      {
        title: 'Text 4 · 在商店 · In a store',
        lines: [
          { s: 'A', c: '你在这个商店买过东西没有？', p: 'Nǐ zài zhège shāngdiàn mǎi guo dōngxi méiyǒu?', en: 'Have you ever bought anything in this store?' },
          { s: 'B', c: '买过一次，这儿的东西还可以，就是不便宜。', p: 'Mǎi guo yí cì, zhèr de dōngxi hái kěyǐ, jiùshì bù piányi.', en: "Yes, once. Things here are pretty good, not cheap though." },
          { s: 'A', c: '我喜欢这件衣服，但是觉得有点儿贵。', p: 'Wǒ xǐhuan zhè jiàn yīfu, dànshì juéde yǒudiǎnr guì.', en: "I like this garment, but I think it's a little expensive." },
          { s: 'B', c: '两百块还可以，喜欢就买吧。', p: 'Liǎngbǎi kuài hái kěyǐ, xǐhuan jiù mǎi ba.', en: "Two hundred yuan is not that expensive. If you like it, just buy it." },
        ],
      },
    ],
    vocab: [
      { c: '有意思', p: 'yǒu yìsi',  pos: 'expr.', en: 'interesting · fun' },
      { c: '但是',   p: 'dànshì',    pos: 'conj.', en: 'but · still · yet' },
      { c: '虽然',   p: 'suīrán',    pos: 'conj.', en: 'although · though' },
      { c: '次',     p: 'cì',        pos: 'm.',    en: 'time (occurrence)' },
      { c: '玩儿',   p: 'wánr',      pos: 'v.',    en: 'to play · to have fun' },
      { c: '晴',     p: 'qíng',      pos: 'adj.',  en: 'sunny · fine · clear' },
      { c: '百',     p: 'bǎi',       pos: 'num.',  en: 'hundred' },
    ],
  },

  // ─── L15 ───────────────────────────────────────────────────────────────
  {
    no: 15,
    han: '新年就要到了',
    pinyin: 'Xīnnián jiù yào dào le',
    en: 'The New Year is coming',
    focus: '就要…了 / 快要…了 (imminent action) · 都…了 (already)',
    notes: [
      {
        title: '就要…了 / 快要…了 · Imminent Action',
        summary: 'Both patterns express that something is about to happen. 就要…了 may be preceded by a specific time word; 快要…了 cannot.',
        examples: [
          { c: '新年就要到了。', p: 'Xīnnián jiùyào dào le.', en: 'The New Year is coming.' },
          { c: '飞机快要起飞了。', p: 'Fēijī kuàiyào qǐfēi le.', en: 'The plane is about to take off.' },
        ],
      },
      {
        title: '都…了 · Already',
        summary: '都 + Numeral / Time + 了 emphasizes that a situation has already reached or passed a point — often expressing surprise or impatience.',
        examples: [
          { c: '都十二点了，快睡吧。', p: 'Dōu shí’èr diǎn le, kuài shuì ba.', en: 'It’s already 12 o’clock — get to sleep!' },
          { c: '都春天了，还这么冷。', p: 'Dōu chūntiān le, hái zhème lěng.', en: 'It’s already spring and yet it’s still so cold.' },
        ],
      },
    ],
    texts: [
      {
        title: 'Text 1 · 在公司 · In the company',
        lines: [
          { s: 'A', c: '今天是十二月二十日，新年就要到了。', p: 'Jīntiān shì shí’èr yuè èrshí rì, xīnnián jiù yào dào le.', en: 'Today is December 20th. The New Year is coming.' },
          { s: 'B', c: '新年你准备做什么？', p: 'Xīnnián nǐ zhǔnbèi zuò shénme?', en: 'What plans do you have?' },
          { s: 'A', c: '我想去北京旅游，北京很不错，我去过一次。', p: 'Wǒ xiǎng qù Běijīng lǚyóu, Běijīng hěn búcuò, wǒ qù guo yí cì.', en: "I want to take a trip to Beijing. Beijing is a nice place. I've been there once." },
          { s: 'B', c: '你买票了吗？', p: 'Nǐ mǎi piào le ma?', en: 'Have you bought the ticket?' },
          { s: 'A', c: '还没有呢，明天就去火车站买票。', p: 'Hái méiyǒu ne, míngtiān jiù qù huǒchēzhàn mǎi piào.', en: "Not yet. I'll go to the railway station to buy it tomorrow." },
        ],
      },
      {
        title: 'Text 2 · 在公司 · In the company',
        lines: [
          { s: 'A', c: '时间过得真快，新的一年快要到了！', p: 'Shíjiān guò de zhēn kuài, xīn de yì nián kuài yào dào le!', en: 'How time flies! The New Year is approaching!' },
          { s: 'B', c: '是啊，谢谢大家这一年对我的帮助！', p: 'Shì a, xièxie dàjiā zhè yì nián duì wǒ de bāngzhù!', en: 'Yes. Thank you all for your help during the past year.' },
          { s: 'A', c: '希望我们的公司明年更好！', p: 'Xīwàng wǒmen de gōngsī míngnián gèng hǎo!', en: 'I hope our company will become even better in the next year.' },
        ],
      },
      {
        title: 'Text 3 · 在火车站 · At the station',
        lines: [
          { s: 'A', c: '你妹妹怎么还没来？都八点四十了！', p: 'Nǐ mèimei zěnme hái méi lái? Dōu bā diǎn sìshí le!', en: "Why hasn't your younger sister arrived yet? It's already eight forty." },
          { s: 'B', c: '我们再等她几分钟吧。', p: 'Wǒmen zài děng tā jǐ fēnzhōng ba.', en: "Let's wait for a few more minutes." },
          { s: 'A', c: '都等她半个小时了！', p: 'Dōu děng tā bàn ge xiǎoshí le!', en: "We've already waited for half an hour." },
          { s: 'B', c: '她来了，我听见她说话了。', p: 'Tā lái le, wǒ tīngjiàn tā shuō huà le.', en: 'She is here. I heard her voice.' },
        ],
      },
      {
        title: 'Text 4 · 咖啡馆外 · Outside a coffee house',
        lines: [
          { s: 'A', c: '天阴了，我要回去了。', p: 'Tiān yīn le, wǒ yào huíqu le.', en: "It's overcast. I have to go home." },
          { s: 'B', c: '好的。快要下雨了，你路上慢点儿。', p: 'Hǎo de. Kuài yào xià yǔ le, nǐ lùshang màn diǎnr.', en: "OK. It's going to rain. Be careful on your way." },
          { s: 'A', c: '没关系，我坐公共汽车。', p: 'Méi guānxi, wǒ zuò gōnggòng qìchē.', en: "Don't worry. I'll take a bus." },
          { s: 'B', c: '好的。再见。', p: 'Hǎo de. Zàijiàn.', en: 'Good. Bye.' },
        ],
      },
    ],
    vocab: [
      { c: '日',         p: 'rì',          pos: 'n.',    en: 'day · date' },
      { c: '新年',       p: 'xīnnián',     pos: 'n.',    en: 'New Year' },
      { c: '票',         p: 'piào',        pos: 'n.',    en: 'ticket' },
      { c: '火车站',     p: 'huǒchēzhàn',  pos: 'n.',    en: 'railway station' },
      { c: '大家',       p: 'dàjiā',       pos: 'pron.', en: 'all · everybody' },
      { c: '更',         p: 'gèng',        pos: 'adv.',  en: 'more · to a greater extent' },
      { c: '妹妹',       p: 'mèimei',      pos: 'n.',    en: 'younger sister' },
      { c: '阴',         p: 'yīn',         pos: 'adj.',  en: 'overcast · cloudy' },
    ],
  },
]

// HSK 2 introduces 8 additional basic strokes (continuing from HSK 1's 1–6).
// Stroke groups follow the textbook's "Basic Strokes of Chinese Characters
// (7) – (10)" sections in Lessons 1–4.
export const HSK2_STROKES = [
  {
    lesson: 1,
    title: 'Basic Strokes of Chinese Characters (7)',
    items: [
      { glyph: '㇆', name: '横折提',     pinyin: 'héngzhétí',
        en: 'Horizontal-Turning-Rising',
        direction: '→ ↓ ↗',
        ex: '话 huà · 说 shuō' },
      { glyph: '𠃌', name: '横折折折钩', pinyin: 'héngzhézhézhégōu',
        en: 'Horizontal-Triple-Turning-Hook',
        direction: '→ ↓ → ↓ ↖',
        ex: '奶 nǎi · 场 chǎng' },
    ],
  },
  {
    lesson: 2,
    title: 'Basic Strokes of Chinese Characters (8)',
    items: [
      { glyph: '㇌', name: '横撇弯钩',   pinyin: 'héngpiěwāngōu',
        en: 'Horizontal-Left-Falling-Curved-Hook',
        direction: '→ ↙ ⤺ ↖',
        ex: '队 duì · 阵 zhèn' },
      { glyph: '㇋', name: '横折折撇',   pinyin: 'héngzhézhépiě',
        en: 'Horizontal-Double-Turning-Left-Falling',
        direction: '→ ↓ → ↙',
        ex: '及 jí · 级 jí' },
    ],
  },
  {
    lesson: 3,
    title: 'Basic Strokes of Chinese Characters (9)',
    items: [
      { glyph: '㇂', name: '横折斜钩',   pinyin: 'héngzhéxiégōu',
        en: 'Horizontal-Turning-Slanting-Hook',
        direction: '→ ↘ ↖',
        ex: '飞 fēi · 风 fēng' },
      { glyph: '㇉', name: '弯钩',       pinyin: 'wāngōu',
        en: 'Crooked Hook',
        direction: '⤺ ↖',
        ex: '狗 gǒu · 猫 māo' },
    ],
  },
  {
    lesson: 4,
    title: 'Basic Strokes of Chinese Characters (10)',
    items: [
      { glyph: '㇙', name: '竖提',       pinyin: 'shùtí',
        en: 'Vertical-Rising',
        direction: '↓ ↗',
        ex: '长 cháng · 民 mín' },
      { glyph: '𠃊', name: '竖折折钩',   pinyin: 'shùzhézhégōu',
        en: 'Vertical-Double-Turning-Hook',
        direction: '↓ → ↓ ↖',
        ex: '马 mǎ · 写 xiě' },
    ],
  },
]

// HSK 2 introduces 14 additional single-component characters across the
// first six lessons. Etymology / description notes are condensed from the
// textbook's character explanation boxes.
export const HSK2_CHARACTERS = [
  { lesson: 1, c: '为', p: 'wéi/wèi', radical: '丶', en: 'to do · for',
    desc: 'The complex form 為 looks like a hand pulling an elephant for work — originally "to work".' },
  { lesson: 1, c: '也', p: 'yě',      radical: '乙', en: 'also · too',
    desc: 'The ancient form looks like a long snake with a pointed head; now used as the adverb "also".' },

  { lesson: 2, c: '生', p: 'shēng',   radical: '生', en: 'to be born · life · raw',
    desc: 'A young seedling sprouting from the earth — "to germinate and grow"; extended to "to live", "to get (ill)".' },
  { lesson: 2, c: '高', p: 'gāo',     radical: '高', en: 'tall · high',
    desc: 'Originally a tall pavilion — means "tall" or "high".' },

  { lesson: 3, c: '手', p: 'shǒu',    radical: '手', en: 'hand',
    desc: 'An image of a human hand with five fingers — means "hand".' },
  { lesson: 3, c: '丈', p: 'zhàng',   radical: '一', en: 'unit of length · senior',
    desc: 'Originally an old person holding a walking stick; now a unit of length (≈ 3.3 m) and a respectful term for an elder.' },
  { lesson: 3, c: '夫', p: 'fū',      radical: '大', en: 'man · husband',
    desc: 'Originally an adult man wearing a hairpin; now usually means "a man" or "husband".' },

  { lesson: 4, c: '两', p: 'liǎng',   radical: '一', en: 'two · a pair',
    desc: 'Originally a yoke fastened across two horses with a pair of saddles — means "two" or "a pair".' },
  { lesson: 4, c: '乐', p: 'yuè/lè',  radical: '丿', en: 'music (yuè) · happy (lè)',
    desc: 'The complex form 樂 originally referred to musical instruments ("music", yuè); now also "joyful, happy" (lè).' },
  { lesson: 4, c: '长', p: 'cháng/zhǎng', radical: '丿', en: 'long (cháng) · to grow / elder (zhǎng)',
    desc: 'An old person holding a walking stick — extended to "long distance" (cháng) and "elder / to grow up" (zhǎng).' },

  { lesson: 5, c: '鱼', p: 'yú',      radical: '鱼', en: 'fish',
    desc: 'A pictograph of a whole fish — means "fish".' },
  { lesson: 5, c: '衣', p: 'yī',      radical: '衣', en: 'clothes',
    desc: 'An ancient Chinese upper garment — now refers to clothes in general.' },

  { lesson: 6, c: '门', p: 'mén',     radical: '门', en: 'door · gate',
    desc: 'Originally the two panels of a door at the entrance of a house, which can open and close.' },
  { lesson: 6, c: '羊', p: 'yáng',    radical: '羊', en: 'sheep · goat',
    desc: 'A sheep’s head facing us, with curving horns — means "sheep".' },
]

// Kangxi-radical lookup for all radicals appearing in HSK2_CHARACTERS.
// Each entry: { name (pinyin), pinyin, en, desc }.
export const HSK2_RADICALS = {
  '丶': { name: 'zhǔ',  pinyin: 'zhǔ',  en: 'dot',         desc: 'A single dot stroke; one of the most basic radicals.' },
  '乙': { name: 'yǐ',   pinyin: 'yǐ',   en: 'second',      desc: 'A twisting/hook stroke; the second of the Heavenly Stems.' },
  '一': { name: 'yī',   pinyin: 'yī',   en: 'one',         desc: 'A single horizontal stroke; the radical for "one" and many basic numerals.' },
  '丿': { name: 'piě',  pinyin: 'piě',  en: 'slash',       desc: 'A left-falling stroke radical, often the first stroke in many characters.' },
  '生': { name: 'shēng',pinyin: 'shēng',en: 'life · birth',desc: 'A young plant sprouting from the soil; relates to growth, life, birth.' },
  '高': { name: 'gāo',  pinyin: 'gāo',  en: 'tall',        desc: 'A tall watchtower or pavilion; relates to height and grandeur.' },
  '手': { name: 'shǒu', pinyin: 'shǒu', en: 'hand',        desc: 'A picture of a hand with five fingers; relates to actions done by hand.' },
  '大': { name: 'dà',   pinyin: 'dà',   en: 'big',         desc: 'A person with outstretched arms; relates to size and greatness.' },
  '鱼': { name: 'yú',   pinyin: 'yú',   en: 'fish',        desc: 'A pictograph of a fish; relates to fish and aquatic life.' },
  '衣': { name: 'yī',   pinyin: 'yī',   en: 'clothes',     desc: 'A picture of an upper garment; relates to clothing and fabric.' },
  '门': { name: 'mén',  pinyin: 'mén',  en: 'door · gate', desc: 'Two door panels; relates to gates, doors and entrances.' },
  '羊': { name: 'yáng', pinyin: 'yáng', en: 'sheep',       desc: 'A sheep’s head with curving horns; relates to sheep and goats.' },
}

// HSK 2 introduces 30 component radicals across the 15 lessons (2 per lesson).
export const HSK2_LESSON_RADICALS = [
  {
    lesson: 1,
    items: [
      { r: '王', name: 'wángzìpáng',  cn: '王字旁', en: 'jade (slanting-jade)', desc: 'Sometimes called the "slanting-jade" radical; usually related to jade.',
        examples: [{ c: '现', p: 'xiàn', en: 'now, present' }, { c: '球', p: 'qiú', en: 'ball' }] },
      { r: '足', name: 'zúzìpáng',    cn: '足字旁', en: 'foot',                  desc: 'Usually related to one’s feet.',
        examples: [{ c: '跑', p: 'pǎo', en: 'to run' }, { c: '踢', p: 'tī', en: 'to kick' }] },
    ],
  },
  {
    lesson: 2,
    items: [
      { r: '⺮', name: 'zhúzìtóu',    cn: '竹字头', en: 'bamboo crown', desc: 'Usually related to bamboo.',
        examples: [{ c: '篮', p: 'lán', en: 'basket' }, { c: '笔', p: 'bǐ', en: 'pen' }] },
      { r: '欠', name: 'qiànzìpáng',  cn: '欠字旁', en: 'yawning / mouth action', desc: 'Usually related to yawning, breathing, or movements of the mouth.',
        examples: [{ c: '欢', p: 'huān', en: 'happy' }, { c: '次', p: 'cì', en: 'next' }] },
    ],
  },
  {
    lesson: 3,
    items: [
      { r: '木', name: 'mùzìpáng',     cn: '木字旁', en: 'wood / tree',           desc: 'Usually related to wood or trees.',
        examples: [{ c: '杯', p: 'bēi', en: 'cup' }, { c: '校', p: 'xiào', en: 'school' }] },
      { r: '刂', name: 'lìdāopáng',   cn: '立刀旁', en: 'knife / cutter',        desc: 'Usually related to cutters or knives.',
        examples: [{ c: '别', p: 'bié', en: 'don’t · other' }, { c: '到', p: 'dào', en: 'to arrive' }] },
    ],
  },
  {
    lesson: 4,
    items: [
      { r: '纟', name: 'jiǎosīpáng',  cn: '绞丝旁', en: 'silk',                  desc: 'Usually related to silk.',
        examples: [{ c: '给', p: 'gěi', en: 'to give' }, { c: '结', p: 'jié', en: 'to tie, to knot' }] },
      { r: '忄', name: 'shùxīnpáng',  cn: '竖心旁', en: 'heart / emotion',       desc: 'Usually related to one’s mental activities.',
        examples: [{ c: '忙', p: 'máng', en: 'busy' }, { c: '快', p: 'kuài', en: 'fast, quick' }] },
    ],
  },
  {
    lesson: 5,
    items: [
      { r: '子', name: 'zǐzìpáng',    cn: '子字旁', en: 'child',                 desc: 'Usually related to children.',
        examples: [{ c: '孩', p: 'hái', en: 'child' }, { c: '孙', p: 'sūn', en: 'grandson' }] },
      { r: '广', name: 'guǎngzìpáng', cn: '广字旁', en: 'building / shelter',    desc: 'Usually related to buildings.',
        examples: [{ c: '床', p: 'chuáng', en: 'bed' }, { c: '店', p: 'diàn', en: 'shop, store' }] },
    ],
  },
  {
    lesson: 6,
    items: [
      { r: '犭', name: 'fǎnquǎnpáng', cn: '反犬旁', en: 'animal (dog-form)',     desc: 'Usually related to animals.',
        examples: [{ c: '猫', p: 'māo', en: 'cat' }, { c: '狗', p: 'gǒu', en: 'dog' }] },
      { r: '心', name: 'xīnzìdǐ',     cn: '心字底', en: 'heart / emotion',       desc: 'Usually related to one’s mental activities and emotions.',
        examples: [{ c: '想', p: 'xiǎng', en: 'to think · to miss' }, { c: '念', p: 'niàn', en: 'to miss · to read' }] },
    ],
  },
  {
    lesson: 7,
    items: [
      { r: '彳', name: 'shuāngrénpáng', cn: '双人旁', en: 'walking (double-person)', desc: 'Usually related to the act of walking.',
        examples: [{ c: '行', p: 'xíng', en: 'to walk · OK' }, { c: '很', p: 'hěn', en: 'very' }] },
      { r: '攵', name: 'fǎnwénpáng',  cn: '反文旁', en: 'beating / action',      desc: 'Usually related to the act of whipping or beating.',
        examples: [{ c: '放', p: 'fàng', en: 'to let go, to set free' }, { c: '收', p: 'shōu', en: 'to receive, to accept' }] },
    ],
  },
  {
    lesson: 8,
    items: [
      { r: '又', name: 'yòuzìpáng',   cn: '又字旁', en: 'right hand · variety',  desc: 'A radical that can have a variety of meanings.',
        examples: [{ c: '欢', p: 'huān', en: 'merry, happy' }, { c: '对', p: 'duì', en: 'right, correct' }] },
      { r: '巾', name: 'jīnzìpáng',   cn: '巾字旁', en: 'cloth · textile',       desc: 'Usually related to cotton or silk products or textiles.',
        examples: [{ c: '帮', p: 'bāng', en: 'to help, to aid' }, { c: '帽', p: 'mào', en: 'hat, cap' }] },
    ],
  },
  {
    lesson: 9,
    items: [
      { r: '土', name: 'tǔzìpáng',    cn: '土字旁', en: 'soil / land',           desc: 'Usually related to soil, land or buildings.',
        examples: [{ c: '块', p: 'kuài', en: 'lump, piece' }, { c: '地', p: 'dì', en: 'earth, land, ground' }] },
      { r: '灬', name: 'sìdiǎndǐ',    cn: '四点底', en: 'fire (4-dot fire)',     desc: 'Usually related to fire or the use of fire.',
        examples: [{ c: '热', p: 'rè', en: 'hot' }, { c: '黑', p: 'hēi', en: 'black' }] },
    ],
  },
  {
    lesson: 10,
    items: [
      { r: '走', name: 'zǒuzìpáng',   cn: '走字旁', en: 'running / walking',     desc: 'Usually related to the act of running or walking.',
        examples: [{ c: '超', p: 'chāo', en: 'to exceed, to surpass' }, { c: '起', p: 'qǐ', en: 'to get up, to rise' }] },
      { r: '穴', name: 'xuézìtóu',    cn: '穴字头', en: 'hole / cave',           desc: 'Usually related to holes, caves or houses.',
        examples: [{ c: '空', p: 'kōng', en: 'empty' }, { c: '穿', p: 'chuān', en: 'to pierce through · to wear' }] },
    ],
  },
  {
    lesson: 11,
    items: [
      { r: '疒', name: 'bìngzìtóu',    cn: '病字头', en: 'sickness',     desc: 'Usually related to diseases.',
        examples: [{ c: '病', p: 'bìng', en: 'disease · to be ill' }, { c: '疯', p: 'fēng', en: 'mad, crazy' }] },
      { r: '冫', name: 'liǎngdiǎnshuǐ', cn: '两点水', en: 'two-drop water', desc: 'Usually related to ice or coldness.',
        examples: [{ c: '冷', p: 'lěng', en: 'cold' }, { c: '冰', p: 'bīng', en: 'ice' }] },
    ],
  },
  {
    lesson: 12,
    items: [
      { r: '止', name: 'zhǐzìpáng',    cn: '止字旁', en: 'stop / foot', desc: 'Usually related to toes or walking.',
        examples: [{ c: '趾', p: 'zhǐ', en: 'toe' }, { c: '步', p: 'bù', en: 'step' }] },
      { r: '冂', name: 'tóngzìkuāng',  cn: '同字框', en: 'open box',   desc: 'Usually related to relationships among things or their images.',
        examples: [{ c: '同', p: 'tóng', en: 'same' }, { c: '网', p: 'wǎng', en: 'net' }] },
    ],
  },
  {
    lesson: 13,
    items: [
      { r: '斤', name: 'jīnzìpáng',    cn: '斤字旁', en: 'axe',         desc: 'Usually related to axes or the action of cutting or whittling.',
        examples: [{ c: '新', p: 'xīn', en: 'new' }, { c: '所', p: 'suǒ', en: 'place' }] },
      { r: '页', name: 'yèzìpáng',     cn: '页字旁', en: 'head / face', desc: 'Usually related to the human head or face.',
        examples: [{ c: '颜', p: 'yán', en: 'face, look' }, { c: '须', p: 'xū', en: 'beard, mustache' }] },
    ],
  },
  {
    lesson: 14,
    items: [
      { r: '雨', name: 'yǔzìtóu',     cn: '雨字头', en: 'rain crown',  desc: 'Usually related to weather phenomena such as clouds and rain.',
        examples: [{ c: '雪', p: 'xuě', en: 'snow' }, { c: '雾', p: 'wù', en: 'fog, mist' }] },
      { r: '贝', name: 'bèizìpáng',    cn: '贝字旁', en: 'shell / money', desc: 'Usually related to money or ancient utensils.',
        examples: [{ c: '财', p: 'cái', en: 'wealth, money' }, { c: '货', p: 'huò', en: 'goods, commodity' }] },
    ],
  },
  {
    lesson: 15,
    items: [
      { r: '山', name: 'shānzìpáng',   cn: '山字旁', en: 'mountain',    desc: 'Usually related to the names, types and forms of mountains or islands.',
        examples: [{ c: '岭', p: 'lǐng', en: 'mountain ridge' }, { c: '崎', p: 'qí', en: 'rugged, rough' }] },
      { r: '大', name: 'dàzìpáng',     cn: '大字旁', en: 'big / person', desc: 'Usually related to people.',
        examples: [{ c: '天', p: 'tiān', en: 'sky' }, { c: '夫', p: 'fū', en: 'husband' }] },
    ],
  },
]

export const useHSK2 = () => ({ HSK2_META, HSK2_LESSONS, HSK2_STROKES, HSK2_CHARACTERS, HSK2_RADICALS, HSK2_LESSON_RADICALS })
