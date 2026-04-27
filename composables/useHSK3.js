// HSK 3 — keyed to *HSK Standard Course 3* (姜丽萍 主编, BLCU Press).
// Lesson titles, ordering, grammar focus and the new‑words list are the
// official HSK 3 / textbook structure (factual). The short dialogues in
// `texts[]` and the grammar `notes[]` are written here for study purposes
// to illustrate each lesson's grammar focus — they are not copied from
// the textbook. Use the textbook itself for the full canonical dialogues.

export const HSK3_META = {
  han: '三',
  title: 'HSK 3',
  subtitle: 'Intermediate · 300 new words · 20 lessons',
  intro:
    'HSK Standard Course 3 (BLCU Press). Compound complements of direction (出来 / 起来), complements of possibility (V得/不+complement), 把-sentences and 被-sentences, comparatives with 跟 / 和 / 比, 越来越 / 越A越B, the aspect particle 着 for existence and accompanying action, AA的 and ABAB reduplication, and the flexible use of interrogative pronouns.',
  accent: '#7c5a1e',
}

// ---------------------------------------------------------------------------
// Each lesson follows the schema:
//   { no, han, pinyin, en, focus,
//     texts: [{ title, lines: [{ s:'A'|'B', c, p, en }] }],
//     vocab: [{ c, p, pos, en }],
//     notes: [string] }
// ---------------------------------------------------------------------------

export const HSK3_LESSONS = [
  // ───────────────────────────── L1 ─────────────────────────────
  {
    no: 1,
    han: '周末你有什么打算',
    pinyin: 'Zhōumò nǐ yǒu shénme dǎsuàn',
    en: "What's your plan for the weekend",
    focus: '结果补语 “好” · 一 + M + N + 也/都 + 不 + V · 那么',
    texts: [
      {
        title: 'Text 1 · 周末的打算  Talking about weekend plans',
        lines: [
          { s: 'A', c: '周末你有什么打算？',             p: 'Zhōumò nǐ yǒu shénme dǎsuàn?',           en: "What are your plans for the weekend?" },
          { s: 'B', c: '电影票我已经买好了。',           p: 'Diànyǐngpiào wǒ yǐjīng mǎihǎo le.',      en: "I've already bought the movie tickets." },
          { s: 'A', c: '一个朋友也没有，我有点儿着急。', p: 'Yí ge péngyou yě méiyǒu, wǒ yǒudiǎnr zháojí.', en: "I don't have a single friend there — I'm a bit nervous." },
          { s: 'B', c: '别那么紧张，我跟你一起去。',     p: 'Bié nàme jǐnzhāng, wǒ gēn nǐ yìqǐ qù.',  en: "Don't be so nervous — I'll go with you." },
        ],
      },
      {
        title: 'Text 2 · 在家  At home',
        lines: [
          { s: 'A', c: '你怎么了？一直在看地图。',         p: 'Nǐ zěnme le? Yìzhí zài kàn dìtú.',           en: "What's up? You've been staring at the map for ages." },
          { s: 'B', c: '我下个月要搬到南方去。',           p: 'Wǒ xià ge yuè yào bān dào nánfāng qù.',      en: "I'm moving down south next month." },
          { s: 'A', c: '作业写好了吗？还是先复习一下？',   p: 'Zuòyè xiěhǎo le ma? Háishi xiān fùxí yíxià?', en: "Have you finished your homework, or should you review first?" },
          { s: 'B', c: '都做好了，别那么着急。',           p: 'Dōu zuòhǎo le, bié nàme zháojí.',            en: "It's all done — don't be so anxious." },
        ],
      },
      {
        title: 'Text 3 · 聊旅游计划  Talking about travel plans',
        lines: [
          { s: 'A', c: '下个月我去旅游，你能跟我一起去吗？', p: 'Xià ge yuè wǒ qù lǛyóu, nǐ néng gēn wǒ yìqǐ qù ma?', en: "Next month I'm travelling — can you come with me?" },
          { s: 'B', c: '我还没想好。哪里最好玩儿？',     p: 'Wǒ hái méi xiǎnghǎo. Nǎr zuì hǎowánr?',  en: "I haven't decided yet — where's the best place to go?" },
          { s: 'A', c: '去南方吧，去年我就是这个时候去的。', p: 'Qù nánfāng ba, qùnián wǒ jiù shì zhège shíhou qù de.', en: "Let's go south — I went around this same time last year." },
          { s: 'B', c: '南方太热了，北方不冷也不热，好一些。', p: 'Nánfāng tài rè le, běifāng bù lěng yě bú rè, hǎo yìxiē.', en: "The south is too hot — the north is neither cold nor hot, it's better." },
        ],
      },
      {
        title: 'Text 4 · 准备去旅游  Preparing for the trip',
        lines: [
          { s: 'A', c: '水果、面包、茶都准备好了，还带什么？', p: 'Shuǐguǒ, miànbāo, chá dōu zhǔnbèihǎo le, hái dài shénme?', en: 'Fruit, bread and tea are all ready — what else should we bring?' },
          { s: 'B', c: '手机、电脑、地图，一个也不能少。',   p: 'Shǒujī, diànnǎo, dìtú, yí ge yě bù néng shǎo.', en: "Phone, laptop, map — we can't leave a single one behind." },
          { s: 'A', c: '这些我昨天下午就准备好了。',           p: 'Zhèxiē wǒ zuótiān xiàwǔ jiù zhǔnbèihǎo le.',     en: 'I packed all this yesterday afternoon.' },
          { s: 'B', c: '再多带几件衣服吧，别那么少。',         p: 'Zài duō dài jǐ jiàn yīfu ba, bié nàme shǎo.',  en: "Bring a few more clothes — don't pack so light." },
        ],
      },
    ],
    vocab: [
      { c: '周末',   p: 'zhōumò',   pos: 'n.',     en: 'weekend' },
      { c: '打算',   p: 'dǎsuàn',   pos: 'n./v.',  en: 'plan; to intend' },
      { c: '啊',     p: 'a',        pos: 'part.',  en: 'sentence-final particle (confirmation)' },
      { c: '跟',     p: 'gēn',      pos: 'prep.',  en: 'with' },
      { c: '一直',   p: 'yìzhí',    pos: 'adv.',   en: 'all the time' },
      { c: '游戏',   p: 'yóuxì',    pos: 'n.',     en: 'game' },
      { c: '作业',   p: 'zuòyè',    pos: 'n.',     en: 'homework' },
      { c: '着急',   p: 'zháojí',   pos: 'adj.',   en: 'worried, anxious' },
      { c: '复习',   p: 'fùxí',     pos: 'v.',     en: 'to review' },
      { c: '南方',   p: 'nánfāng',  pos: 'n.',     en: 'south, southern part' },
      { c: '北方',   p: 'běifāng',  pos: 'n.',     en: 'north, northern part' },
      { c: '面包',   p: 'miànbāo',  pos: 'n.',     en: 'bread' },
      { c: '带',     p: 'dài',      pos: 'v.',     en: 'to take along, to bring' },
      { c: '地图',   p: 'dìtú',     pos: 'n.',     en: 'map' },
      { c: '搬',     p: 'bān',      pos: 'v.',     en: 'to move, to carry' },
      { c: '小李',   p: 'Xiǎo Lǐ',  pos: 'pn.',    en: 'Xiao Li (name)' },
      { c: '小刚',   p: 'Xiǎogāng', pos: 'pn.',    en: 'Xiaogang (name)' },
    ],
    notes: [
      {
        title: '结果补语 “好”  ·  The Resultative Complement 好',
        summary: 'V + 好 indicates the action is satisfactorily finished and the result is ready to use. Negation is 没 V 好 (not yet finished properly).',
        examples: [
          { c: '电影票我已经买好了。', p: 'Diànyǐngpiào wǒ yǐjīng mǎihǎo le.', en: "I've already bought the movie tickets." },
          { c: '饭还没做好呢。',       p: 'Fàn hái méi zuòhǎo ne.',            en: 'The meal isn’t ready yet.' },
          { c: '行李准备好了吗？',     p: 'Xíngli zhǔnbèihǎo le ma?',          en: 'Is the luggage all packed?' },
        ],
      },
      {
        title: '一 + M + N + 也/都 + 不/没 + V  ·  Total negation',
        summary: '“Not even one …” — emphasises that the action does not apply to a single member of the set. Use 不 for present/general, 没 for past.',
        examples: [
          { c: '我一个人也不认识。', p: 'Wǒ yí ge rén yě bú rènshi.',  en: "I don't know a single person." },
          { c: '今天一句话都没说。', p: 'Jīntiān yí jù huà dōu méi shuō.', en: "He didn't say a single word today." },
        ],
      },
      {
        title: '连词 “那么”  ·  The intensifier 那么',
        summary: '那么 + Adj / V expresses “so / that …” — comments on a degree the speaker considers excessive or notable.',
        examples: [
          { c: '别那么紧张。',       p: 'Bié nàme jǐnzhāng.',       en: "Don't be so nervous." },
          { c: '今天那么冷，多穿点儿。', p: 'Jīntiān nàme lěng, duō chuān diǎnr.', en: "It's so cold today — wear a bit more." },
        ],
      },
    ],
  },

  // ───────────────────────────── L2 ─────────────────────────────
  {
    no: 2,
    han: '他什么时候回来',
    pinyin: 'Tā shénme shíhou huílái',
    en: 'When will he come back',
    focus: 'Simple complements of direction · V₁了 … 就 V₂ · 难道 … 吗',
    texts: [
      {
        title: 'Text 1 · 在办公室  At the office',
        lines: [
          { s: 'A', c: '周经理什么时候回来？',           p: 'Zhōu jīnglǐ shénme shíhou huílái?',           en: 'When will Manager Zhou be back?' },
          { s: 'B', c: '他出去办事了，下午回来。',       p: 'Tā chūqù bàn shì le, xiàwǔ huílái.',          en: "He went out on business; he'll be back this afternoon." },
          { s: 'A', c: '请他回来了就给我打个电话。',     p: 'Qǐng tā huílái le jiù gěi wǒ dǎ ge diànhuà.', en: 'Please have him call me as soon as he gets back.' },
          { s: 'B', c: '没问题，我记下来了。',           p: 'Méi wèntí, wǒ jì xiàlái le.',                 en: 'No problem — I’ve noted it down.' },
        ],
      },
      {
        title: 'Text 2 · 上楼  Going upstairs',
        lines: [
          { s: 'A', c: '你慢点儿走，我的腿很疼。',     p: 'Nǐ màn diǎnr zǒu, wǒ de tuǐ hěn téng.', en: 'Walk a little slower — my leg hurts.' },
          { s: 'B', c: '上来吧，我帮你拿伞。',         p: 'Shàng lái ba, wǒ bāng nǐ ná sǎn.',      en: 'Come up — I’ll carry the umbrella for you.' },
          { s: 'A', c: '难道你不觉得楼太高了吗？',     p: 'Nándào nǐ bù juéde lóu tài gāo le ma?', en: "Don't you think the building is too tall?" },
          { s: 'B', c: '其实走上去对身体好。',         p: 'Qíshí zǒu shàngqu duì shēntǐ hǎo.',     en: 'Actually, walking up is good for your health.' },
        ],
      },
      {
        title: 'Text 3 · 在楼门口送朋友  Seeing a friend off at the door',
        lines: [
          { s: 'A', c: '雨下得这么大，我送你吧。',     p: 'Yǔ xià de zhème dà, wǒ sòng nǐ ba.',         en: "It's raining so hard — let me see you off." },
          { s: 'B', c: '没事，我出去叫一辆出租车就行了。', p: 'Méi shì, wǒ chūqù jiào yí liàng chūzūchē jiù xíng le.', en: "Don't worry, I'll just step out and grab a taxi." },
          { s: 'A', c: '那你等等，我上楼去给你拿把伞。',     p: 'Nà nǐ děngdeng, wǒ shàng lóu qù gěi nǐ ná bǎ sǎn.', en: 'Then wait — I’ll go upstairs and fetch an umbrella for you.' },
          { s: 'B', c: '你拿了伞就下来，我在这儿等你。',     p: 'Nǐ nále sǎn jiù xiàlái, wǒ zài zhèr děng nǐ.', en: 'Bring it down as soon as you have it — I’ll wait here.' },
        ],
      },
      {
        title: 'Text 4 · 在家  At home',
        lines: [
          { s: 'A', c: '你看，我这么胖，怎么办？',     p: 'Nǐ kàn, wǒ zhème pàng, zěnme bàn?',     en: 'Look at me — I’m so heavy, what should I do?' },
          { s: 'B', c: '你晚上吃了饭就睡觉，也不出去走走。', p: 'Nǐ wǎnshang chīle fàn jiù shuì jiào, yě bù chūqù zǒuzou.', en: 'You eat dinner and go straight to bed — you don’t go out for a walk.' },
          { s: 'A', c: '其实我每天都运动。',         p: 'Qíshí wǒ měi tiān dōu yùndòng.',           en: 'Actually, I do exercise every day.' },
          { s: 'B', c: '可是你一点儿也没瘦，你做什么运动了？', p: 'Kěshì nǐ yìdiǎnr yě méi shòu, nǐ zuò shénme yùndòng le?', en: "But you haven't lost any weight — what exercise are you doing?" },
        ],
      },
    ],
    vocab: [
      { c: '腿',       p: 'tuǐ',         pos: 'n.',    en: 'leg' },
      { c: '疼',       p: 'téng',        pos: 'adj.',  en: 'hurt, painful' },
      { c: '脚',       p: 'jiǎo',        pos: 'n.',    en: 'foot' },
      { c: '树',       p: 'shù',         pos: 'n.',    en: 'tree' },
      { c: '容易',     p: 'róngyì',      pos: 'adj.',  en: 'easy' },
      { c: '难',       p: 'nán',         pos: 'adj.',  en: 'difficult' },
      { c: '太太',     p: 'tàitai',      pos: 'n.',    en: 'wife; Mrs.' },
      { c: '秘书',     p: 'mìshū',       pos: 'n.',    en: 'secretary' },
      { c: '经理',     p: 'jīnglǐ',      pos: 'n.',    en: 'manager' },
      { c: '办公室',   p: 'bàngōngshì',  pos: 'n.',    en: 'office' },
      { c: '辆',       p: 'liàng',       pos: 'm.',    en: 'measure word for vehicles' },
      { c: '楼',       p: 'lóu',         pos: 'n.',    en: 'building, floor' },
      { c: '拿',       p: 'ná',          pos: 'v.',    en: 'to take, to fetch' },
      { c: '把',       p: 'bǎ',          pos: 'm.',    en: 'measure word for things with a handle' },
      { c: '伞',       p: 'sǎn',         pos: 'n.',    en: 'umbrella' },
      { c: '胖',       p: 'pàng',        pos: 'adj.',  en: 'fat' },
      { c: '其实',     p: 'qíshí',       pos: 'adv.',  en: 'actually' },
      { c: '瘦',       p: 'shòu',        pos: 'adj.',  en: 'thin' },
      { c: '周',       p: 'Zhōu',        pos: 'pn.',   en: 'Zhou (surname)' },
      { c: '周明',     p: 'Zhōu Míng',   pos: 'pn.',   en: 'Zhou Ming (name)' },
    ],
    notes: [
      {
        title: 'Simple Complements of Direction  ·  V + 来 / 去',
        summary: '来 means motion toward the speaker; 去 means motion away. Common pairs: 上/下, 进/出, 回, 过, 起. If the object is a place, it goes between the verb and 来/去.',
        examples: [
          { c: '他出去办事了。',         p: 'Tā chūqù bàn shì le.',         en: 'He went out on business.' },
          { c: '请进来坐。',             p: 'Qǐng jìnlái zuò.',             en: 'Please come in and sit.' },
          { c: '他刚回办公室去。',       p: 'Tā gāng huí bàngōngshì qù.',  en: 'He just went back to the office.' },
        ],
      },
      {
        title: 'Successive actions  ·  V₁了 (O₁) 就 V₂ (O₂)',
        summary: 'Indicates the second action follows immediately upon completion of the first — “as soon as / once V₁, then V₂.”',
        examples: [
          { c: '他到了就给你打电话。',   p: 'Tā dào le jiù gěi nǐ dǎ diànhuà.', en: 'He’ll call you as soon as he arrives.' },
          { c: '下了课我们就走。',       p: 'Xià le kè wǒmen jiù zǒu.',         en: 'We’ll leave as soon as class ends.' },
        ],
      },
      {
        title: 'Rhetorical question  ·  难道 … 吗？',
        summary: '难道 introduces a rhetorical question expressing surprise or disbelief; the implied answer is the opposite of the surface form.',
        examples: [
          { c: '难道你忘了带伞吗？',     p: 'Nándào nǐ wàngle dài sǎn ma?', en: 'Don’t tell me you forgot the umbrella?' },
          { c: '难道他不知道吗？',       p: 'Nándào tā bù zhīdào ma?',      en: 'Could it be that he doesn’t know?' },
        ],
      },
    ],
  },

  // ───────────────────────────── L3 ─────────────────────────────
  {
    no: 3,
    han: '桌子上放着很多饮料',
    pinyin: 'Zhuōzi shàng fàngzhe hěn duō yǐnliào',
    en: 'There are plenty of drinks on the table',
    focus: '还是 vs 或者 · Location + V着 + Numeral + M + N (existence) · 会 (possibility)',
    texts: [
      {
        title: 'Text 1 · 在家招待客人  Hosting guests at home',
        lines: [
          { s: 'A', c: '桌子上放着很多饮料，你喝什么？',   p: 'Zhuōzi shàng fàngzhe hěn duō yǐnliào, nǐ hē shénme?', en: 'There are many drinks on the table — what would you like?' },
          { s: 'B', c: '花茶或者绿茶都可以。',               p: 'Huāchá huòzhě lǜchá dōu kěyǐ.',                       en: 'Jasmine tea or green tea — either is fine.' },
          { s: 'A', c: '你要红茶还是咖啡？',                 p: 'Nǐ yào hóngchá háishi kāfēi?',                        en: 'Would you like black tea or coffee?' },
          { s: 'B', c: '红茶吧，喝完更舒服。',               p: 'Hóngchá ba, hē wán gèng shūfu.',                      en: 'Black tea — it feels nicer afterwards.' },
        ],
      },
      {
        title: 'Text 2 · 周末爬山  A weekend hike',
        lines: [
          { s: 'A', c: '明天我们去爬山，你记得带水。',       p: 'Míngtiān wǒmen qù pá shān, nǐ jìde dài shuǐ.',  en: 'We’re going hiking tomorrow — remember to bring water.' },
          { s: 'B', c: '电视上说明天会下雨。',               p: 'Diànshì shàng shuō míngtiān huì xià yǔ.',       en: 'The TV said it’ll rain tomorrow.' },
          { s: 'A', c: '那我们带伞，小心一点儿。',           p: 'Nà wǒmen dài sǎn, xiǎoxīn yìdiǎnr.',            en: 'Then let’s bring umbrellas and be careful.' },
          { s: 'B', c: '我穿这条新裤子，怎么样？',           p: 'Wǒ chuān zhè tiáo xīn kùzi, zěnmeyàng?',        en: 'I’ll wear these new pants — what do you think?' },
        ],
      },
      {
        title: 'Text 3 · 在商场  At the mall',
        lines: [
          { s: 'A', c: '这件衬衫怎么样？多少钱？',     p: 'Zhè jiàn chènshān zěnmeyàng? Duōshao qián?', en: 'How is this shirt? How much?' },
          { s: 'B', c: '上面写着三百二十元。',     p: 'Shàngmian xiězhe sān bǎi èrshí yuán.',     en: 'It says 320 yuan on the tag.' },
          { s: 'A', c: '这条裤子你还记得吗？家里已经有两条了。', p: 'Zhè tiáo kùzi nǐ hái jìde ma? Jiā lǐ yǐjīng yǒu liǎng tiáo le.', en: 'Remember these pants? You already have two pairs at home.' },
          { s: 'B', c: '那我们再看看别的吧。',     p: 'Nà wǒmen zài kànkan biéde ba.',         en: 'Then let’s look at something else.' },
        ],
      },
      {
        title: 'Text 4 · 在水果店  At the fruit shop',
        lines: [
          { s: 'A', c: '这些水果真新鲜，买西瓜还是苹果？', p: 'Zhèxiē shuǐguǒ zhēn xīnxiān, mǎi xīguā háishi píngguǒ?', en: 'These fruits are really fresh — should we buy watermelon or apples?' },
          { s: 'B', c: '西瓜吧。上面写着“不甜不要钱”。', p: 'Xīguā ba. Shàngmian xiězhe “bù tián bú yào qián”.', en: 'Watermelon. The sign says “not sweet, no charge.”' },
          { s: 'A', c: '那我们买一个大点儿的吧。',     p: 'Nà wǒmen mǎi yí ge dà diǎnr de ba.',         en: 'Then let’s pick a bigger one.' },
          { s: 'B', c: '再买几个苹果，今晚只吃水果！',     p: 'Zài mǎi jǐ ge píngguǒ, jīnwǎn zhǐ chī shuǐguǒ!', en: 'Grab a few apples too — tonight we’ll eat only fruit!' },
        ],
      },
    ],
    vocab: [
      { c: '还是',     p: 'háishi',    pos: 'conj.',  en: 'or (in questions)' },
      { c: '或者',     p: 'huòzhě',    pos: 'conj.',  en: 'or (in statements)' },
      { c: '爬山',     p: 'pá shān',   pos: 'v.',     en: 'to climb a mountain' },
      { c: '小心',     p: 'xiǎoxīn',   pos: 'adj./v.', en: 'careful; to be careful' },
      { c: '条',       p: 'tiáo',      pos: 'm.',     en: 'measure for pants, dresses, etc.' },
      { c: '裤子',     p: 'kùzi',      pos: 'n.',     en: 'pants' },
      { c: '记得',     p: 'jìde',      pos: 'v.',     en: 'to remember' },
      { c: '衬衫',     p: 'chènshān',  pos: 'n.',     en: 'shirt' },
      { c: '元',       p: 'yuán',      pos: 'm.',     en: 'yuan (unit of money)' },
      { c: '新鲜',     p: 'xīnxiān',   pos: 'adj.',   en: 'fresh' },
      { c: '甜',       p: 'tián',      pos: 'adj.',   en: 'sweet' },
      { c: '只',       p: 'zhǐ',       pos: 'adv.',   en: 'only' },
      { c: '放',       p: 'fàng',      pos: 'v.',     en: 'to put, to place' },
      { c: '饮料',     p: 'yǐnliào',   pos: 'n.',     en: 'drink, beverage' },
      { c: '舒服',     p: 'shūfu',     pos: 'adj.',   en: 'comfortable' },
      { c: '花茶',     p: 'huāchá',    pos: 'n.',     en: 'jasmine / scented tea' },
      { c: '绿茶',     p: 'lǜchá',     pos: 'n.',     en: 'green tea' },
      { c: '红茶',     p: 'hóngchá',   pos: 'n.',     en: 'black tea' },
    ],
    notes: [
      {
        title: '“还是” vs “或者”  ·  Two ways to say “or”',
        summary: '还是 is used in alternative questions (asking the listener to choose). 或者 is used in statements offering alternatives.',
        examples: [
          { c: '你喝茶还是喝咖啡？',     p: 'Nǐ hē chá háishi hē kāfēi?',     en: 'Are you drinking tea or coffee?' },
          { c: '茶或者咖啡都可以。',     p: 'Chá huòzhě kāfēi dōu kěyǐ.',     en: 'Tea or coffee — either is fine.' },
        ],
      },
      {
        title: 'Existence sentence  ·  Place + V着 + Num + M + N',
        summary: 'Describes what exists in a location and how it is arranged. The verb takes 着 to mark the static state resulting from the action.',
        examples: [
          { c: '桌子上放着很多饮料。',   p: 'Zhuōzi shàng fàngzhe hěn duō yǐnliào.', en: 'On the table are placed many drinks.' },
          { c: '墙上挂着一张地图。',     p: 'Qiáng shàng guàzhe yì zhāng dìtú.',     en: 'On the wall hangs a map.' },
        ],
      },
      {
        title: '“会” indicating possibility',
        summary: '会 + V refers to something that may/will happen (not yet realised). Negation: 不会.',
        examples: [
          { c: '明天会下雨。',           p: 'Míngtiān huì xià yǔ.',  en: 'It will rain tomorrow.' },
          { c: '他今天不会来。',         p: 'Tā jīntiān bú huì lái.', en: 'He won’t come today.' },
        ],
      },
    ],
  },

  // ───────────────────────────── L4 ─────────────────────────────
  {
    no: 4,
    han: '她总是笑着跟客人说话',
    pinyin: 'Tā zǒngshì xiàozhe gēn kèrén shuōhuà',
    en: 'She always smiles when talking to customers',
    focus: '又 … 又 … · V₁着 (O₁) + V₂ (O₂) — accompanying action',
    texts: [
      {
        title: 'Text 1 · 谈一个服务员  Talking about a server',
        lines: [
          { s: 'A', c: '那个新来的服务员怎么样？',         p: 'Nàge xīn lái de fúwùyuán zěnmeyàng?',          en: 'How is that new server?' },
          { s: 'B', c: '又年轻又认真，工作很努力。',       p: 'Yòu niánqīng yòu rènzhēn, gōngzuò hěn nǔlì.',  en: 'Young and conscientious — she works very hard.' },
          { s: 'A', c: '她总是笑着跟客人说话。',           p: 'Tā zǒngshì xiàozhe gēn kèrén shuō huà.',       en: 'She always smiles when talking to customers.' },
          { s: 'B', c: '客人也都很喜欢她。',               p: 'Kèrén yě dōu hěn xǐhuan tā.',                  en: 'And the customers all like her too.' },
        ],
      },
      {
        title: 'Text 2 · 看照片  Looking at photos',
        lines: [
          { s: 'A', c: '这是马克，他又聪明又热情。',       p: 'Zhè shì Mǎkè, tā yòu cōngming yòu rèqíng.', en: 'This is Marco — he’s clever and very warm.' },
          { s: 'B', c: '李小美呢？她在做什么？',           p: 'Lǐ Xiǎoměi ne? Tā zài zuò shénme?',          en: 'And Li Xiaomei? What is she doing?' },
          { s: 'A', c: '她拿着鲜花，站着回答问题。',       p: 'Tā názhe xiānhuā, zhànzhe huídá wèntí.',     en: 'She’s standing there with flowers, answering questions.' },
          { s: 'B', c: '比赛以后他们去超市买蛋糕。',       p: 'Bǐsài yǐhòu tāmen qù chāoshì mǎi dàngāo.',   en: 'After the contest they went to the supermarket for cake.' },
        ],
      },
      {
        title: 'Text 3 · 在超市门口  At the supermarket entrance',
        lines: [
          { s: 'A', c: '我有点儿饿了，我们进超市买点儿东西吧。', p: 'Wǒ yǒudiǎnr è le, wǒmen jìn chāoshì mǎi diǎnr dōngxi ba.', en: 'I’m a bit hungry — let’s go in and grab something.' },
          { s: 'B', c: '这家超市的蛋糕又便宜又好吃。',     p: 'Zhè jiā chāoshì de dàngāo yòu piányi yòu hǎochī.', en: 'The cake at this supermarket is both cheap and delicious.' },
          { s: 'A', c: '我们买两块儿，回家吃着蛋糕看电视。', p: 'Wǒmen mǎi liǎng kuàir, huí jiā chīzhe dàngāo kàn diànshì.', en: 'Let’s buy two slices and watch TV at home eating cake.' },
          { s: 'B', c: '我再去买些喝的，吃蛋糕喝咖啡太棒了。', p: 'Wǒ zài qù mǎi xiē hē de, chī dàngāo hē kāfēi tài bàng le.', en: 'I’ll grab some drinks too — cake with coffee is the best.' },
        ],
      },
      {
        title: 'Text 4 · 在饭馆儿  At the restaurant',
        lines: [
          { s: 'A', c: '您们这儿是不是有一个又年轻又漂亮的服务员？', p: 'Nímen zhèr shì bú shì yǒu yí ge yòu niánqīng yòu piàoliang de fúwùyuán?', en: 'Do you have a young, pretty server here?' },
          { s: 'B', c: '我们这儿年轻、漂亮的服务员有很多。',     p: 'Wǒmen zhèr niánqīng, piàoliang de fúwùyuán yǒu hěn duō.', en: 'We have many young, pretty servers here.' },
          { s: 'A', c: '她工作又认真又热情，总是笑着跟客人说话。', p: 'Tā gōngzuò yòu rènzhēn yòu rèqíng, zǒngshì xiàozhe gēn kèrén shuō huà.', en: 'She works hard and warmly — always smiling when she speaks to guests.' },
          { s: 'B', c: '啊，我知道了，你说的是李小美吧？', p: 'A, wǒ zhīdào le, nǐ shuō de shì Lǐ Xiǎoměi ba?', en: 'Ah, I see — you’re talking about Li Xiaomei.' },
        ],
      },
    ],
    vocab: [
      { c: '比赛',   p: 'bǐsài',     pos: 'n./v.', en: 'match, competition' },
      { c: '照片',   p: 'zhàopiàn',  pos: 'n.',    en: 'photo' },
      { c: '年级',   p: 'niánjí',    pos: 'n.',    en: 'grade' },
      { c: '又',     p: 'yòu',       pos: 'adv.',  en: 'and; also' },
      { c: '聪明',   p: 'cōngming',  pos: 'adj.',  en: 'clever, smart' },
      { c: '热情',   p: 'rèqíng',    pos: 'adj.',  en: 'warm, enthusiastic' },
      { c: '努力',   p: 'nǔlì',      pos: 'adj.',  en: 'hard-working' },
      { c: '总是',   p: 'zǒngshì',   pos: 'adv.',  en: 'always' },
      { c: '回答',   p: 'huídá',     pos: 'v.',    en: 'to answer' },
      { c: '站',     p: 'zhàn',      pos: 'v.',    en: 'to stand' },
      { c: '鲜花',   p: 'xiānhuā',   pos: 'n.',    en: 'fresh flowers' },
      { c: '超市',   p: 'chāoshì',   pos: 'n.',    en: 'supermarket' },
      { c: '蛋糕',   p: 'dàngāo',    pos: 'n.',    en: 'cake' },
      { c: '年轻',   p: 'niánqīng',  pos: 'adj.',  en: 'young' },
      { c: '认真',   p: 'rènzhēn',   pos: 'adj.',  en: 'serious, earnest' },
      { c: '客人',   p: 'kèrén',     pos: 'n.',    en: 'customer, guest' },
      { c: '小明',   p: 'Xiǎomíng',  pos: 'pn.',   en: 'Xiaoming (name)' },
      { c: '马克',   p: 'Mǎkè',      pos: 'pn.',   en: 'Marco (name)' },
      { c: '李小美', p: 'Lǐ Xiǎoměi', pos: 'pn.',  en: 'Li Xiaomei (name)' },
    ],
    notes: [
      {
        title: '又 … 又 …  ·  Listing two qualities or actions',
        summary: '又 + Adj₁ + 又 + Adj₂ (or two verb phrases) lists two simultaneous, often complementary, properties or actions.',
        examples: [
          { c: '这个服务员又年轻又认真。', p: 'Zhège fúwùyuán yòu niánqīng yòu rènzhēn.', en: 'This server is both young and earnest.' },
          { c: '蛋糕又便宜又好吃。',       p: 'Dàngāo yòu piányi yòu hǎochī.',           en: 'The cake is both cheap and tasty.' },
        ],
      },
      {
        title: 'Accompanying action  ·  V₁着 (O₁) + V₂ (O₂)',
        summary: 'V₁着 expresses the manner or accompanying state in which V₂ is performed. V₁ is the background; V₂ is the main action.',
        examples: [
          { c: '她笑着跟客人说话。',     p: 'Tā xiàozhe gēn kèrén shuō huà.', en: 'She smiles while talking to customers.' },
          { c: '我喜欢站着喝咖啡。',     p: 'Wǒ xǐhuan zhànzhe hē kāfēi.',    en: 'I like to stand and drink coffee.' },
          { c: '他拿着鲜花进来了。',     p: 'Tā názhe xiānhuā jìnlái le.',    en: 'He came in carrying flowers.' },
        ],
      },
    ],
  },

  // ───────────────────────────── L5 ─────────────────────────────
  {
    no: 5,
    han: '我最近越来越胖了',
    pinyin: 'Wǒ zuìjìn yuè lái yuè pàng le',
    en: 'I am getting fatter and fatter lately',
    focus: '了 indicating change · 越来越 + Adj / Mental V',
    texts: [
      {
        title: 'Text 1 · 我胖了  I’ve put on weight',
        lines: [
          { s: 'A', c: '我最近越来越胖了。',             p: 'Wǒ zuìjìn yuè lái yuè pàng le.',         en: "I've been getting fatter and fatter lately." },
          { s: 'B', c: '是吗？你应该多运动。',           p: 'Shì ma? Nǐ yīnggāi duō yùndòng.',        en: 'Really? You should exercise more.' },
          { s: 'A', c: '我决定每天跑步，简单一点儿。',   p: 'Wǒ juédìng měi tiān pǎobù, jiǎndān yìdiǎnr.', en: 'I’ve decided to run every day — keep it simple.' },
          { s: 'B', c: '坚持下去，一定会更健康。',       p: 'Jiānchí xiàqù, yídìng huì gèng jiànkāng.',    en: 'Keep it up — you’ll definitely be healthier.' },
        ],
      },
      {
        title: 'Text 2 · 天气变冷了  The weather is turning cold',
        lines: [
          { s: 'A', c: '天气越来越冷了，我有点儿感冒。', p: 'Tiānqì yuè lái yuè lěng le, wǒ yǒudiǎnr gǎnmào.', en: "It's getting colder and colder — I have a slight cold." },
          { s: 'B', c: '发烧了没有？多喝水。',           p: 'Fā shāo le méiyǒu? Duō hē shuǐ.',                 en: 'Do you have a fever? Drink lots of water.' },
          { s: 'A', c: '这条裙子太薄了，不能再穿。',     p: 'Zhè tiáo qúnzi tài báo le, bù néng zài chuān.',   en: 'This skirt is too thin — I can’t wear it any more.' },
          { s: 'B', c: '好好儿休息，明天就好了。',       p: 'Hǎohāor xiūxi, míngtiān jiù hǎo le.',             en: 'Rest well — you’ll be fine tomorrow.' },
        ],
      },
      {
        title: 'Text 3 · 聊季节  Talking about the seasons',
        lines: [
          { s: 'A', c: '你最喜欢哪个季节？',         p: 'Nǐ zuì xǐhuan nǎige jìjié?',         en: 'Which season do you like best?' },
          { s: 'B', c: '当然是春天，草和树都绿了，花也开了。', p: 'Dāngrán shì chūntiān, cǎo hé shù dōu lǜ le, huā yě kāi le.', en: 'Spring of course — the grass and trees turn green and the flowers bloom.' },
          { s: 'A', c: '我最喜欢夏天，可以穿漂亮的裙子。', p: 'Wǒ zuì xǐhuan xiàtiān, kěyǐ chuān piàoliang de qúnzi.', en: 'I like summer best — I get to wear pretty skirts.' },
          { s: 'B', c: '那我也喜欢夏天了。',           p: 'Nà wǒ yě xǐhuan xiàtiān le.',           en: 'Then I like summer too now.' },
        ],
      },
      {
        title: 'Text 4 · 越来越胖  Putting on weight',
        lines: [
          { s: 'A', c: '我最近越来越胖了。',         p: 'Wǒ zuìjìn yuè lái yuè pàng le.',         en: 'I’ve been gaining weight lately.' },
          { s: 'B', c: '谁说的？我觉得你越来越漂亮了。', p: 'Shéi shuō de? Wǒ juéde nǐ yuè lái yuè piàoliang le.', en: 'Says who? I think you’re getting prettier and prettier.' },
          { s: 'A', c: '这条裙子是去年买的，今年就不能穿了。', p: 'Zhè tiáo qúnzi shì qùnián mǎi de, jīnnián jiù bù néng chuān le.', en: 'I bought this skirt last year — this year I can’t wear it.' },
          { s: 'B', c: '那是因为你吃得太多了，少吃点儿吧。', p: 'Nà shì yīnwèi nǐ chī de tài duō le, shǎo chī diǎnr ba.', en: 'That’s because you eat too much — try eating a bit less.' },
        ],
      },
    ],
    vocab: [
      { c: '感冒',   p: 'gǎnmào',  pos: 'n./v.', en: 'cold; to catch a cold' },
      { c: '发烧',   p: 'fā shāo', pos: 'v.',    en: 'to have a fever' },
      { c: '裙子',   p: 'qúnzi',   pos: 'n.',    en: 'skirt' },
      { c: '越',     p: 'yuè',     pos: 'adv.',  en: 'the more …' },
      { c: '最近',   p: 'zuìjìn',  pos: 'n.',    en: 'recently' },
      { c: '一定',   p: 'yídìng',  pos: 'adv.',  en: 'certainly, definitely' },
      { c: '运动',   p: 'yùndòng', pos: 'n./v.', en: 'sports; to exercise' },
      { c: '了',     p: 'le',      pos: 'part.', en: 'aspect / change-of-state particle' },
      { c: '应该',   p: 'yīnggāi', pos: 'aux.',  en: 'should, ought to' },
      { c: '健康',   p: 'jiànkāng', pos: 'adj./n.', en: 'healthy; health' },
      { c: '决定',   p: 'juédìng', pos: 'v./n.', en: 'to decide; decision' },
      { c: '简单',   p: 'jiǎndān', pos: 'adj.',  en: 'simple' },
    ],
    notes: [
      {
        title: '“了” indicating change of state',
        summary: 'Sentence-final 了 signals that a new situation has come about or that a change has been recognised. Often used with adjectives or stative verbs.',
        examples: [
          { c: '我胖了。',         p: 'Wǒ pàng le.',         en: 'I’ve put on weight.' },
          { c: '天气冷了。',       p: 'Tiānqì lěng le.',     en: 'The weather has turned cold.' },
          { c: '他不喜欢咖啡了。', p: 'Tā bù xǐhuan kāfēi le.', en: 'He doesn’t like coffee any more.' },
        ],
      },
      {
        title: '越来越 + Adj / Mental V  ·  More and more …',
        summary: 'Expresses a gradual increase in degree over time. Combine with adjectives or psychological verbs (喜欢, 想, 觉得 …). Cannot be modified by 很.',
        examples: [
          { c: '天气越来越冷了。',     p: 'Tiānqì yuè lái yuè lěng le.',  en: 'The weather is getting colder and colder.' },
          { c: '我越来越喜欢汉语。',   p: 'Wǒ yuè lái yuè xǐhuan Hànyǔ.', en: 'I like Chinese more and more.' },
        ],
      },
    ],
  },

  // ───────────────────────────── L6 ─────────────────────────────
  {
    no: 6,
    han: '怎么突然找不到了',
    pinyin: 'Zěnme tūrán zhǎo bú dào le',
    en: 'Why are they suddenly missing',
    focus: 'V得 / V不 + complements of possibility · N呢 (location) · 刚 vs 刚才',
    texts: [
      {
        title: 'Text 1 · 在客厅  In the living room',
        lines: [
          { s: 'A', c: '我的眼镜呢？怎么突然找不到了？',     p: 'Wǒ de yǎnjìng ne? Zěnme tūrán zhǎo bú dào le?', en: 'Where are my glasses? Why can I suddenly not find them?' },
          { s: 'B', c: '我没看见。',                       p: 'Wǒ méi kànjiàn.',                              en: "I haven't seen them." },
          { s: 'A', c: '你去房间找找，是不是刚才放在桌子上了？', p: 'Nǐ qù fángjiān zhǎozhao, shì bú shì gāngcái fàng zài zhuōzi shàng le?', en: 'Go look in the room — maybe you put them on the table just now?' },
          { s: 'B', c: '我怎么看得到啊？你快过来帮忙。',     p: 'Wǒ zěnme kàn de dào a? Nǐ kuài guòlai bāng máng.', en: 'How can I see anything? Come and help me.' },
        ],
      },
      {
        title: 'Text 2 · 在打电话  On the phone',
        lines: [
          { s: 'A', c: '今天的作业你做完了吗？',     p: 'Jīntiān de zuòyè nǐ zuòwán le ma?',     en: 'Have you finished today’s homework?' },
          { s: 'B', c: '刚做完，你呢？',               p: 'Gāng zuòwán, nǐ ne?',                  en: 'Just finished — and you?' },
          { s: 'A', c: '今天这些题特别难，我看不懂，你能帮我吗？', p: 'Jīntiān zhèxiē tí tèbié nán, wǒ kàn bù dǒng, nǐ néng bāng wǒ ma?', en: 'Today’s problems are very hard — I can’t make them out, can you help?' },
          { s: 'B', c: '电话里讲不明白，你来我家吧。',     p: 'Diànhuà lǐ jiǎngbu míngbai, nǐ lái wǒ jiā ba.', en: 'I can’t explain it clearly over the phone — come over to my place.' },
        ],
      },
      {
        title: 'Text 3 · 在休息室  In the break room',
        lines: [
          { s: 'A', c: '你怎么有点儿不高兴？',           p: 'Nǐ zěnme yǒudiǎnr bù gāoxìng?',           en: 'Why do you look a little down?' },
          { s: 'B', c: '我想请小丽吃饭，可是找不到好饭馆儿。', p: 'Wǒ xiǎng qǐng Xiǎolì chī fàn, kěshì zhǎo bú dào hǎo fànguǎnr.', en: 'I want to take Xiaoli to dinner, but I can’t find a good restaurant.' },
          { s: 'A', c: '那你请她听音乐会吧，她喜欢听音乐。', p: 'Nà nǐ qǐng tā tīng yīnyuèhuì ba, tā xǐhuan tīng yīnyuè.', en: 'Then invite her to a concert — she likes music.' },
          { s: 'B', c: '音乐会人太多，买不到票。',     p: 'Yīnyuèhuì rén tài duō, mǎi bú dào piào.', en: 'Concerts are too crowded — you can’t get tickets.' },
        ],
      },
      {
        title: 'Text 4 · 在客厅  In the living room',
        lines: [
          { s: 'A', c: '你怎么还喝咖啡？',                 p: 'Nǐ zěnme hái hē kāfēi?',                  en: 'Why are you still drinking coffee?' },
          { s: 'B', c: '怎么了？',                              p: 'Zěnme le?',                                  en: 'What’s wrong?' },
          { s: 'A', c: '你不是说晚上睡不着觉吗？',         p: 'Nǐ bú shì shuō wǎnshang shuì bù zháo jiào ma?', en: 'Didn’t you say you can’t fall asleep at night?' },
          { s: 'B', c: '没事，我只喝一杯，还是喝杯牛奶吧。', p: 'Méi shì, wǒ zhǐ hē yì bēi, háishi hē bēi niúnǎi ba.', en: 'It’s fine, just one cup — actually, I’ll have milk instead.' },
        ],
      },
    ],
    vocab: [
      { c: '突然',   p: 'tūrán',     pos: 'adv./adj.', en: 'suddenly; sudden' },
      { c: '护照',   p: 'hùzhào',    pos: 'n.',        en: 'passport' },
      { c: '钥匙',   p: 'yàoshi',    pos: 'n.',        en: 'key' },
      { c: '行李箱', p: 'xínglǐxiāng', pos: 'n.',      en: 'suitcase' },
      { c: '检查',   p: 'jiǎnchá',   pos: 'v.',        en: 'to check, to examine' },
      { c: '刚',     p: 'gāng',      pos: 'adv.',      en: 'just (a moment ago)' },
      { c: '刚才',   p: 'gāngcái',   pos: 'n.',        en: 'just now (time noun)' },
      { c: '清楚',   p: 'qīngchu',   pos: 'adj.',      en: 'clear' },
      { c: '一会儿', p: 'yíhuìr',    pos: 'n.',        en: 'a little while' },
      { c: '搬',     p: 'bān',       pos: 'v.',        en: 'to move, to carry' },
      { c: '担心',   p: 'dānxīn',    pos: 'v.',        en: 'to worry' },
      { c: '声音',   p: 'shēngyīn',  pos: 'n.',        en: 'sound, voice' },
      { c: '聊天',   p: 'liáo tiān', pos: 'v.',        en: 'to chat' },
    ],
    notes: [
      {
        title: 'Complements of possibility  ·  V + 得/不 + result/direction',
        summary: 'Insert 得 between a verb and its complement to indicate the action is *possible*; insert 不 to mark it impossible. Common pairs: 看得见/看不见, 听得懂/听不懂, 找得到/找不到, 买得到/买不到.',
        examples: [
          { c: '字太小了，我看不清楚。',   p: 'Zì tài xiǎo le, wǒ kàn bù qīngchu.', en: 'The characters are too small — I can’t see them clearly.' },
          { c: '这个题我看得懂。',           p: 'Zhège tí wǒ kàn de dǒng.',         en: 'I can understand this problem.' },
          { c: '音乐会的票买不到了。',     p: 'Yīnyuèhuì de piào mǎi bú dào le.', en: 'Concert tickets are sold out.' },
        ],
      },
      {
        title: 'N + 呢？  ·  Asking about location',
        summary: 'A noun followed directly by 呢 (with no verb) is a short way to ask “where is N?” — useful when context already makes the question clear.',
        examples: [
          { c: '我的书呢？',   p: 'Wǒ de shū ne?',   en: 'Where’s my book?' },
          { c: '他呢？没来吗？', p: 'Tā ne? Méi lái ma?', en: 'Where is he? Hasn’t he come?' },
        ],
      },
      {
        title: '“刚” vs “刚才”',
        summary: '刚 is an adverb placed before a verb, meaning “just did” (refers to a very recent action). 刚才 is a time noun meaning “a moment ago” — it can stand alone or appear at the start of a clause.',
        examples: [
          { c: '他刚走。',         p: 'Tā gāng zǒu.',         en: 'He just left.' },
          { c: '刚才他还在这儿。',   p: 'Gāngcái tā hái zài zhèr.', en: 'A moment ago he was still here.' },
        ],
      },
    ],
  },

  // ───────────────────────────── L7 ─────────────────────────────
  {
    no: 7,
    han: '我跟她都认识五年了',
    pinyin: 'Wǒ gēn tā dōu rènshi wǔ nián le',
    en: "I've known her for five years",
    focus: 'Time-duration complement · 对 … 感兴趣 · Time with 半 / 刻 / 差',
    texts: [
      {
        title: 'Text 1 · 在办公室  At the office',
        lines: [
          { s: 'A', c: '那个漂亮的新同事是谁？',     p: 'Nàge piàoliang de xīn tóngshì shì shéi?', en: 'Who is that pretty new colleague?' },
          { s: 'B', c: '那是小丽。',                       p: 'Nà shì Xiǎolì.',                       en: 'That’s Xiaoli.' },
          { s: 'A', c: '她刚来北京吗？',                 p: 'Tā gāng lái Běijīng ma?',                 en: 'Did she just arrive in Beijing?' },
          { s: 'B', c: '不，她在北京工作三年了，以前在银行工作了两年。', p: 'Bù, tā zài Běijīng gōngzuò sān nián le, yǐqián zài yínháng gōngzuòle liǎng nián.', en: 'No, she’s worked in Beijing for three years — before that, two years at a bank.' },
        ],
      },
      {
        title: 'Text 2 · 在休息室  In the break room',
        lines: [
          { s: 'A', c: '周末你跟小丽去哪儿玩儿了？',   p: 'Zhōumò nǐ gēn Xiǎolì qù nǎr wánr le?', en: 'Where did you and Xiaoli go this weekend?' },
          { s: 'B', c: '我们去唱歌了，唱了两个小时。',     p: 'Wǒmen qù chàng gē le, chàngle liǎng ge xiǎoshí.', en: 'We went singing — sang for two hours.' },
          { s: 'A', c: '你们都对音乐感兴趣吗？',     p: 'Nǐmen dōu duì yīnyuè gǎn xìngqù ma?', en: 'Are you both interested in music?' },
          { s: 'B', c: '她对音乐感兴趣，我对她更感兴趣。', p: 'Tā duì yīnyuè gǎn xìngqù, wǒ duì tā gèng gǎn xìngqù.', en: 'She’s interested in music — I’m even more interested in *her*.' },
        ],
      },
      {
        title: 'Text 3 · 在休息室  In the break room',
        lines: [
          { s: 'A', c: '我跟小丽下个月就要结婚，到时候欢迎你来。', p: 'Wǒ gēn Xiǎolì xià ge yuè jiù yào jié hūn, dào shíhou huānyíng nǐ lái.', en: 'Xiaoli and I are getting married next month — you’re welcome to come.' },
          { s: 'B', c: '什么？结婚？你们不是刚认识吗？', p: 'Shénme? Jié hūn? Nǐmen bú shì gāng rènshi ma?', en: 'What? Married? Didn’t you just meet?' },
          { s: 'A', c: '我跟她都认识五年了。',       p: 'Wǒ gēn tā dōu rènshi wǔ nián le.',     en: 'We’ve known each other for five years now.' },
          { s: 'B', c: '你跟她结婚，那我怎么办啊？',     p: 'Nǐ gēn tā jié hūn, nà wǒ zěnme bàn a?', en: 'You’re marrying her — then what about me?' },
        ],
      },
      {
        title: 'Text 4 · 在公司门口  Outside the company',
        lines: [
          { s: 'A', c: '你看看手表，怎么迟到了？',     p: 'Nǐ kànkan shǒubiǎo, zěnme chídào le?',  en: 'Look at your watch — why are you late?' },
          { s: 'B', c: '没迟到啊。',                       p: 'Méi chídào a.',                          en: 'I’m not late.' },
          { s: 'A', c: '你不是说七点半来接我吗？你迟到了一刻钟。', p: 'Nǐ bú shì shuō qī diǎn bàn lái jiē wǒ ma? Nǐ chídàole yí kè zhōng.', en: 'Didn’t you say you’d pick me up at 7:30? You’re a quarter late.' },
          { s: 'B', c: '现在不是七点半吗？',         p: 'Xiànzài bú shì qī diǎn bàn ma?',          en: 'Isn’t it 7:30 right now?' },
          { s: 'A', c: '已经差一刻八点了！我在这儿坐了半个小时了。', p: 'Yǐjīng chà yí kè bā diǎn le! Wǒ zài zhèr zuòle bàn ge xiǎoshí le.', en: 'It’s already a quarter to eight! I’ve sat here half an hour.' },
        ],
      },
    ],
    vocab: [
      { c: '认识',     p: 'rènshi',     pos: 'v.',    en: 'to know (a person)' },
      { c: '兴趣',     p: 'xìngqù',     pos: 'n.',    en: 'interest' },
      { c: '感兴趣',   p: 'gǎn xìngqù', pos: 'v.',    en: 'to be interested in' },
      { c: '历史',     p: 'lìshǐ',      pos: 'n.',    en: 'history' },
      { c: '文化',     p: 'wénhuà',     pos: 'n.',    en: 'culture' },
      { c: '半',       p: 'bàn',        pos: 'num.',  en: 'half' },
      { c: '刻',       p: 'kè',         pos: 'm.',    en: 'quarter (of an hour)' },
      { c: '差',       p: 'chà',        pos: 'v.',    en: 'to be short of, lack' },
      { c: '小时',     p: 'xiǎoshí',    pos: 'n.',    en: 'hour' },
      { c: '比较',     p: 'bǐjiào',     pos: 'adv./v.', en: 'comparatively; to compare' },
      { c: '机会',     p: 'jīhuì',      pos: 'n.',    en: 'opportunity' },
      { c: '关系',     p: 'guānxi',     pos: 'n.',    en: 'relationship' },
      { c: '后来',     p: 'hòulái',     pos: 'n.',    en: 'afterwards, later' },
    ],
    notes: [
      {
        title: 'Time-duration complement  ·  S + V + (O) + Duration',
        summary: 'Indicates how long an action lasts. If the verb takes an object, repeat the verb (S V O V Duration), or place the duration between V and O (看了两个小时的书). Use 了 … 了 to mark a state continuing up to now.',
        examples: [
          { c: '我学了三年汉语。',     p: 'Wǒ xuéle sān nián Hànyǔ.',     en: 'I studied Chinese for three years.' },
          { c: '我们认识五年了。',   p: 'Wǒmen rènshi wǔ nián le.',         en: 'We’ve known each other for five years (and still do).' },
          { c: '他唱了两个小时歌。', p: 'Tā chàngle liǎng ge xiǎoshí gē.', en: 'He sang for two hours.' },
        ],
      },
      {
        title: '对 + N + 感兴趣  ·  To be interested in N',
        summary: 'Use 对 (about/toward) + an object + 感兴趣 to express interest. Negation: 对 N 不感兴趣.',
        examples: [
          { c: '我对历史很感兴趣。', p: 'Wǒ duì lìshǐ hěn gǎn xìngqù.', en: 'I’m very interested in history.' },
          { c: '他对运动不感兴趣。', p: 'Tā duì yùndòng bù gǎn xìngqù.', en: 'He’s not interested in sports.' },
        ],
      },
      {
        title: 'Telling time with 半 / 刻 / 差',
        summary: '半 = half hour (两点半). 一刻 = 15 min, 三刻 = 45 min. 差 + minutes + hour = “… to (the hour)” (差五分八点 = 7:55).',
        examples: [
          { c: '现在三点一刻。',     p: 'Xiànzài sān diǎn yí kè.',     en: 'It’s 3:15.' },
          { c: '差十分五点了。',   p: 'Chà shí fēn wǔ diǎn le.',     en: 'Ten to five.' },
        ],
      },
    ],
  },

  // ───────────────────────────── L8 ─────────────────────────────
  {
    no: 8,
    han: '你去哪儿我就去哪儿',
    pinyin: 'Nǐ qù nǎr wǒ jiù qù nǎr',
    en: "I'll go wherever you go",
    focus: '又 vs 再 (recurrence) · Flexible interrogative pronouns 1',
    texts: [
      {
        title: 'Text 1 · 在休息室  In the break room',
        lines: [
          { s: 'A', c: '听说你最近打算买房子？',     p: 'Tīngshuō nǐ zuìjìn dǎsuàn mǎi fángzi?', en: 'I heard you’re planning to buy a place lately.' },
          { s: 'B', c: '是啊，昨天看了一个，今天又去看了一个，明天还要再去看看。', p: 'Shì a, zuótiān kànle yí ge, jīntiān yòu qù kànle yí ge, míngtiān hái yào zài qù kànkan.', en: 'Yes — looked at one yesterday, another today, and tomorrow I’ll go look again.' },
          { s: 'A', c: '都不满意吗？',                       p: 'Dōu bù mǎnyì ma?',                          en: 'None of them satisfy you?' },
          { s: 'B', c: '一个没有电梯不方便，另一个在二十层，太高了。', p: 'Yí ge méiyǒu diàntī bù fāngbiàn, lìng yí ge zài èrshí céng, tài gāo le.', en: 'One has no lift, the other is on the 20th floor — too high.' },
        ],
      },
      {
        title: 'Text 2 · 在学校  At school',
        lines: [
          { s: 'A', c: '听说你下个星期就要回国了？',     p: 'Tīngshuō nǐ xià ge xīngqī jiù yào huí guó le?', en: 'I heard you’re going home next week.' },
          { s: 'B', c: '是啊，真不想离开北京。',           p: 'Shì a, zhēn bù xiǎng líkāi Běijīng.',          en: 'Yes — I really don’t want to leave Beijing.' },
          { s: 'A', c: '我下星期不在北京，不能去机场送你了。', p: 'Wǒ xià xīngqī bú zài Běijīng, bù néng qù jīchǎng sòng nǐ le.', en: 'I won’t be in Beijing next week — I can’t see you off at the airport.' },
          { s: 'B', c: '没关系，你忙吧。',               p: 'Méi guānxi, nǐ máng ba.',                  en: 'It’s fine — you go and be busy.' },
          { s: 'A', c: '这个小礼物送给你，欢迎以后再到中国来。', p: 'Zhège xiǎo lǐwù sòng gěi nǐ, huānyíng yǐhòu zài dào Zhōngguó lái.', en: 'A small gift for you — do come to China again.' },
        ],
      },
      {
        title: 'Text 3 · 在咖啡厅  At a café',
        lines: [
          { s: 'A', c: '小刚，我们坐哪儿？',           p: 'Xiǎogāng, wǒmen zuò nǎr?',           en: 'Xiaogang, where shall we sit?' },
          { s: 'B', c: '你坐哪儿我就坐哪儿。',         p: 'Nǐ zuò nǎr wǒ jiù zuò nǎr.',         en: 'Wherever you sit, I’ll sit.' },
          { s: 'A', c: '坐这儿吧，这儿安静。你想喝什么饮料？', p: 'Zuò zhèr ba, zhèr ānjìng. Nǐ xiǎng hē shénme yǐnliào?', en: 'Let’s sit here — it’s quiet. What would you like to drink?' },
          { s: 'B', c: '你喝什么我就喝什么。',         p: 'Nǐ hē shénme wǒ jiù hē shénme.',         en: 'Whatever you drink, I’ll have the same.' },
        ],
      },
      {
        title: 'Text 4 · 在周明家  At Zhou Ming’s home',
        lines: [
          { s: 'A', c: '快五年了，你几乎没变化。',     p: 'Kuài wǔ nián le, nǐ jīhū méi biànhuà.',         en: 'Almost five years on, you’ve hardly changed.' },
          { s: 'B', c: '谁说的？我胖了，以前的衣服都不能穿了。', p: 'Shéi shuō de? Wǒ pàng le, yǐqián de yīfu dōu bù néng chuān le.', en: 'Says who? I’ve put on weight — none of my old clothes fit.' },
          { s: 'A', c: '健康最重要，胖瘦没关系。',     p: 'Jiànkāng zuì zhòngyào, pàng shòu méi guānxi.', en: 'Health is what matters — weight doesn’t.' },
          { s: 'B', c: '我想吃什么就做什么，想吃多少就做多少。', p: 'Wǒ xiǎng chī shénme jiù zuò shénme, xiǎng chī duōshao jiù zuò duōshao.', en: 'Whatever I want to eat, I cook — however much I want, I make.' },
        ],
      },
    ],
    vocab: [
      { c: '又',     p: 'yòu',     pos: 'adv.', en: 'again (already happened)' },
      { c: '再',     p: 'zài',     pos: 'adv.', en: 'again (will happen)' },
      { c: '主意',   p: 'zhǔyi',   pos: 'n.',   en: 'idea' },
      { c: '同意',   p: 'tóngyì',  pos: 'v.',   en: 'to agree' },
      { c: '相信',   p: 'xiāngxìn', pos: 'v.',  en: 'to believe' },
      { c: '关心',   p: 'guānxīn', pos: 'v.',   en: 'to care about' },
      { c: '清楚',   p: 'qīngchu', pos: 'adj.', en: 'clear' },
      { c: '一样',   p: 'yíyàng',  pos: 'adj.', en: 'the same' },
      { c: '简单',   p: 'jiǎndān', pos: 'adj.', en: 'simple' },
      { c: '愿意',   p: 'yuànyì',  pos: 'aux.', en: 'to be willing to' },
      { c: '环境',   p: 'huánjìng', pos: 'n.',  en: 'environment' },
      { c: '安静',   p: 'ānjìng',  pos: 'adj.', en: 'quiet' },
    ],
    notes: [
      {
        title: '又 vs 再  ·  Two ways to say “again”',
        summary: '又 reports a repeat that *has already* happened (often with 了). 再 anticipates a repeat that *will* happen — used with future actions, requests, and modal verbs.',
        examples: [
          { c: '昨天他又来了。',         p: 'Zuótiān tā yòu lái le.',         en: 'He came again yesterday.' },
          { c: '明天他还要再来。',     p: 'Míngtiān tā hái yào zài lái.',     en: 'He’s coming again tomorrow.' },
          { c: '请再说一遍。',           p: 'Qǐng zài shuō yí biàn.',         en: 'Please say it once more.' },
        ],
      },
      {
        title: 'Flexible interrogative pronouns 1  ·  whoever / whatever / wherever',
        summary: 'Repeat the same interrogative pronoun (谁 / 什么 / 哪儿 / 怎么 / 多少 …) in two clauses linked by 就; the second clause refers back to the first — “whoever … (that one) will … .”',
        examples: [
          { c: '你去哪儿我就去哪儿。',         p: 'Nǐ qù nǎr wǒ jiù qù nǎr.',         en: 'Wherever you go, I’ll go.' },
          { c: '谁想吃什么就点什么。',         p: 'Shéi xiǎng chī shénme jiù diǎn shénme.', en: 'Whoever wants to eat what, lets them order it.' },
          { c: '你想吃多少就做多少。',       p: 'Nǐ xiǎng chī duōshao jiù zuò duōshao.', en: 'I’ll make however much you want to eat.' },
        ],
      },
    ],
  },

  // ───────────────────────────── L9 ─────────────────────────────
  {
    no: 9,
    han: '她的汉语说得跟中国人一样好',
    pinyin: 'Tā de Hànyǔ shuō de gēn Zhōngguórén yíyàng hǎo',
    en: 'She speaks Chinese as well as a native speaker',
    focus: '越A越B · Comparative A 跟 B 一样',
    texts: [
      {
        title: 'Text 1 · 在教室  In the classroom',
        lines: [
          { s: 'A', c: '马克，你的中文越说越好了！',     p: 'Mǎkè, nǐ de Zhōngwén yuè shuō yuè hǎo le!', en: 'Marco, your Chinese is getting better and better!' },
          { s: 'B', c: '哪里哪里，我们班王静说得更好。',     p: 'Nǎli nǎli, wǒmen bān Wáng Jìng shuō de gèng hǎo.', en: 'Not at all — in our class, Wang Jing speaks even better.' },
          { s: 'A', c: '怎么好？',                                 p: 'Zěnme hǎo?',                                  en: 'How well?' },
          { s: 'B', c: '她的汉语说得跟中国人一样好。',         p: 'Tā de Hànyǔ shuō de gēn Zhōngguórén yíyàng hǎo.', en: 'She speaks Chinese as well as a native.' },
          { s: 'A', c: '王静？我怎么没听说过这个名字？',     p: 'Wáng Jìng? Wǒ zěnme méi tīngshuōguo zhège míngzi?', en: 'Wang Jing? How come I’ve never heard the name?' },
          { s: 'B', c: '她是我们的汉语老师。',                 p: 'Tā shì wǒmen de Hànyǔ lǎoshī.',          en: 'She’s our Chinese teacher.' },
        ],
      },
      {
        title: 'Text 2 · 在蛋糕店  At the cake shop',
        lines: [
          { s: 'A', c: '别吃了，你已经吃了三块蛋糕了。',   p: 'Bié chī le, nǐ yǐjīng chīle sān kuài dàngāo le.', en: 'Stop eating — that’s already three slices of cake.' },
          { s: 'B', c: '这是最后一块儿。',                 p: 'Zhè shì zuìhòu yí kuàir.',                en: 'This is the very last piece.' },
          { s: 'A', c: '你总是吃甜的东西，会越吃越胖。',     p: 'Nǐ zǒngshì chī tián de dōngxi, huì yuè chī yuè pàng.', en: 'You always eat sweet things — you’ll get heavier and heavier.' },
          { s: 'B', c: '我们家的人都很瘦，吃不胖。',         p: 'Wǒmen jiā de rén dōu hěn shòu, chī bù pàng.', en: 'Everyone in my family is thin — we don’t put on weight.' },
        ],
      },
      {
        title: 'Text 3 · 在山上  On the mountain',
        lines: [
          { s: 'A', c: '我有点儿害怕。',                       p: 'Wǒ yǒudiǎnr hàipà.',                          en: 'I’m a little scared.' },
          { s: 'B', c: '怎么了？',                                 p: 'Zěnme le?',                                    en: 'What’s wrong?' },
          { s: 'A', c: '山越高，路越难走。我也越爬越累。',     p: 'Shān yuè gāo, lù yuè nán zǒu. Wǒ yě yuè pá yuè lèi.', en: 'The higher we go, the harder the path — and the more tired I get.' },
          { s: 'B', c: '不用担心，有我呢，我对这儿比较了解。', p: 'Bù yòng dānxīn, yǒu wǒ ne, wǒ duì zhèr bǐjiào liǎojiě.', en: 'Don’t worry — I’m here, and I know this place pretty well.' },
        ],
      },
      {
        title: 'Text 4 · 在小明家  At Xiaoming’s home',
        lines: [
          { s: 'A', c: '小明，你的眼睛怎么跟大熊猫一样了？', p: 'Xiǎomíng, nǐ de yǎnjīng zěnme gēn dà xióngmāo yíyàng le?', en: 'Xiaoming, why do your eyes look like a giant panda’s?' },
          { s: 'B', c: '我这几天脚疼，没休息好。',         p: 'Wǒ zhè jǐ tiān jiǎo téng, méi xiūxi hǎo.',         en: 'My foot has been hurting these days — I haven’t rested well.' },
          { s: 'A', c: '去医院了吗？医生说什么？',         p: 'Qù yīyuàn le ma? Yīshēng shuō shénme?',          en: 'Did you go to the hospital? What did the doctor say?' },
          { s: 'B', c: '他让我多休息，休息得越多，好得越快。', p: 'Tā ràng wǒ duō xiūxi, xiūxi de yuè duō, hǎo de yuè kuài.', en: 'He told me to rest — the more I rest, the faster I’ll heal.' },
        ],
      },
    ],
    vocab: [
      { c: '一样',     p: 'yíyàng',   pos: 'adj.',   en: 'the same' },
      { c: '中文',     p: 'Zhōngwén', pos: 'n.',     en: 'Chinese (language)' },
      { c: '口音',     p: 'kǒuyīn',   pos: 'n.',     en: 'accent' },
      { c: '声调',     p: 'shēngdiào', pos: 'n.',    en: 'tone' },
      { c: '发音',     p: 'fāyīn',    pos: 'n./v.',  en: 'pronunciation; to pronounce' },
      { c: '难',       p: 'nán',      pos: 'adj.',   en: 'difficult' },
      { c: '容易',     p: 'róngyì',   pos: 'adj.',   en: 'easy' },
      { c: '练习',     p: 'liànxí',   pos: 'v./n.',  en: 'to practise; exercise' },
      { c: '提高',     p: 'tígāo',    pos: 'v.',     en: 'to improve' },
      { c: '习惯',     p: 'xíguàn',   pos: 'v./n.',  en: 'to be used to; habit' },
      { c: '水平',     p: 'shuǐpíng', pos: 'n.',     en: 'level' },
      { c: '其实',     p: 'qíshí',    pos: 'adv.',   en: 'actually' },
    ],
    notes: [
      {
        title: '越A越B  ·  The more A, the more B',
        summary: 'B changes in step with A. Use 越 + V/Adj + 越 + Adj/V — the second part describes how something develops as the first increases. 越来越 + Adj is the special case showing change over time.',
        examples: [
          { c: '雨越下越大。',         p: 'Yǔ yuè xià yuè dà.',           en: 'The more it rains, the heavier it gets.' },
          { c: '他越学越喜欢汉语。',   p: 'Tā yuè xué yuè xǐhuan Hànyǔ.', en: 'The more he studies, the more he likes Chinese.' },
          { c: '山越高，路越难走。',     p: 'Shān yuè gāo, lù yuè nán zǒu.',     en: 'The higher the mountain, the harder the path.' },
        ],
      },
      {
        title: 'Comparative 1  ·  A 跟 B 一样 (+ Adj)',
        summary: 'Marks equality between two things. Affirmative: A 跟 B 一样 + Adj (“A is as Adj as B”). Negative: A 跟 B 不一样. 和 may replace 跟.',
        examples: [
          { c: '我跟他一样高。',         p: 'Wǒ gēn tā yíyàng gāo.',         en: 'I’m as tall as he is.' },
          { c: '她的汉语说得跟中国人一样好。', p: 'Tā de Hànyǔ shuō de gēn Zhōngguórén yíyàng hǎo.', en: 'She speaks Chinese as well as a Chinese person.' },
          { c: '我的口音跟你的不一样。',     p: 'Wǒ de kǒuyīn gēn nǐ de bù yíyàng.',     en: 'My accent isn’t the same as yours.' },
        ],
      },
    ],
  },

  // ───────────────────────────── L10 ─────────────────────────────
  {
    no: 10,
    han: '数学比历史难多了',
    pinyin: 'Shùxué bǐ lìshǐ nán duō le',
    en: 'Maths is much harder than history',
    focus: 'A 比 B + Adj + 一点儿 / 一些 / 多了 / 得多 · Approximate numbers (一两 / 三四 …)',
    texts: [
      {
        title: 'Text 1 · 在教室  In the classroom',
        lines: [
          { s: 'A', c: '大山，你跟马克谁个子高？',     p: 'Dàshān, nǐ gēn Mǎkè shéi gèzi gāo?', en: 'Dashan, who’s taller, you or Marco?' },
          { s: 'B', c: '马克比我高，我比马克低一点儿。',   p: 'Mǎkè bǐ wǒ gāo, wǒ bǐ Mǎkè dī yìdiǎnr.', en: 'Marco is taller — I’m a bit shorter than him.' },
          { s: 'A', c: '那你们谁大？',                     p: 'Nà nǐmen shéi dà?',                       en: 'And who’s older?' },
          { s: 'B', c: '我比马克大两岁。',               p: 'Wǒ bǐ Mǎkè dà liǎng suì.',         en: 'I’m two years older than Marco.' },
          { s: 'A', c: '你们谁的汉语说得更好？',         p: 'Nǐmen shéi de Hànyǔ shuō de gèng hǎo?', en: 'Whose Chinese is better?' },
          { s: 'B', c: '马克比我说得好一些，我的汉语没有他好。', p: 'Mǎkè bǐ wǒ shuō de hǎo yìxiē, wǒ de Hànyǔ méiyǒu tā hǎo.', en: 'Marco speaks a bit better — my Chinese isn’t as good as his.' },
        ],
      },
      {
        title: 'Text 2 · 在教室  In the classroom',
        lines: [
          { s: 'A', c: '我喜欢历史课、体育课，不喜欢数学课。', p: 'Wǒ xǐhuan lìshǐ kè, tǐyù kè, bù xǐhuan shùxué kè.', en: 'I like history and PE — I don’t like maths.' },
          { s: 'B', c: '为什么？数学也很有意思啊。',     p: 'Wèi shénme? Shùxué yě hěn yǒu yìsi a.', en: 'Why? Maths is interesting too.' },
          { s: 'A', c: '我觉得数学比历史难多了，我听不懂。', p: 'Wǒ juéde shùxué bǐ lìshǐ nán duō le, wǒ tīng bù dǒng.', en: 'I think maths is much harder than history — I can’t follow.' },
          { s: 'B', c: '别担心，我可以帮你。我们每天学多长时间？', p: 'Bié dānxīn, wǒ kěyǐ bāng nǐ. Wǒmen měi tiān xué duō cháng shíjiān?', en: 'Don’t worry, I can help. How long shall we study each day?' },
          { s: 'A', c: '一两个小时吧。',               p: 'Yì-liǎng ge xiǎoshí ba.',               en: 'About one or two hours.' },
        ],
      },
      {
        title: 'Text 3 · 在休息室  In the break room',
        lines: [
          { s: 'A', c: '你最近比以前来得早多了，搬家了？', p: 'Nǐ zuìjìn bǐ yǐqián lái de zǎoduō le, bān jiā le?', en: 'You’re arriving much earlier than before — did you move?' },
          { s: 'B', c: '是啊，你不知道？我上个月就搬家了，走路二十分钟就到。', p: 'Shì a, nǐ bù zhīdào? Wǒ shàng ge yuè jiù bān jiā le, zǒu lù èrshí fēnzhōng jiù dào.', en: 'Yes — didn’t you know? I moved last month, just twenty minutes’ walk away.' },
          { s: 'A', c: '那很方便啊。',                       p: 'Nà hěn fāngbiàn a.',                          en: 'That’s very convenient.' },
          { s: 'B', c: '我还打算买辆自行车，骑车七八分钟就能到。', p: 'Wǒ hái dǎsuàn mǎi liàng zìxíngchē, qí chē qī-bā fēnzhōng jiù néng dào.', en: 'I’m also planning to buy a bike — seven or eight minutes’ ride.' },
        ],
      },
      {
        title: 'Text 4 · 看房子  Looking at houses',
        lines: [
          { s: 'A', c: '这两个地方的房子一样吗？',         p: 'Zhè liǎng ge dìfang de fángzi yíyàng ma?',     en: 'Are the houses in these two areas the same?' },
          { s: 'B', c: '不一样。你看，学校外边的房子比里边的大一些。', p: 'Bù yíyàng. Nǐ kàn, xuéxiào wàibian de fángzi bǐ lǐbian de dà yìxiē.', en: 'No — see, the ones outside the school are a bit larger than those inside.' },
          { s: 'A', c: '大小没关系，哪个更安静？',     p: 'Dàxiǎo méi guānxi, nǎige gèng ānjìng?',  en: 'Size doesn’t matter — which is quieter?' },
          { s: 'B', c: '学校里边的没有外边的那么安静。', p: 'Xuéxiào lǐbian de méiyǒu wàibian de nàme ānjìng.', en: 'The ones inside the school aren’t as quiet as those outside.' },
          { s: 'A', c: '哪个方便一些？',                 p: 'Nǎige fāngbiàn yìxiē?',                 en: 'And which is more convenient?' },
          { s: 'B', c: '里边的比外边的方便，附近有三四个车站。', p: 'Lǐbian de bǐ wàibian de fāngbiàn, fùjìn yǒu sān-sì ge chēzhàn.', en: 'The inside ones are more convenient — there are three or four bus stops nearby.' },
        ],
      },
    ],
    vocab: [
      { c: '比',       p: 'bǐ',         pos: 'prep.',  en: 'than' },
      { c: '数学',     p: 'shùxué',     pos: 'n.',     en: 'mathematics' },
      { c: '历史',     p: 'lìshǐ',      pos: 'n.',     en: 'history' },
      { c: '成绩',     p: 'chéngjì',    pos: 'n.',     en: 'grade, achievement' },
      { c: '考试',     p: 'kǎoshì',     pos: 'n./v.',  en: 'exam; to take an exam' },
      { c: '一些',     p: 'yìxiē',      pos: 'm.',     en: 'some, a bit' },
      { c: '一点儿',   p: 'yìdiǎnr',    pos: 'm.',     en: 'a little' },
      { c: '多了',     p: 'duō le',     pos: 'phr.',   en: 'much more' },
      { c: '得多',     p: 'de duō',     pos: 'phr.',   en: 'much more (after Adj)' },
      { c: '差不多',   p: 'chàbuduō',   pos: 'adj./adv.', en: 'almost the same; nearly' },
      { c: '左右',     p: 'zuǒyòu',     pos: 'n.',     en: 'about, around' },
      { c: '马上',     p: 'mǎshàng',    pos: 'adv.',   en: 'immediately' },
      { c: '其他',     p: 'qítā',       pos: 'pron.',  en: 'other' },
    ],
    notes: [
      {
        title: 'Comparative sentences  ·  A 比 B + Adj (+ degree)',
        summary: 'A 比 B + Adj states that A exceeds B in the property. Add a degree word *after* the adjective: 一点儿 / 一些 (a little), 多了 / 得多 (much more), or a specific amount (大两岁). Negative: A 没有 B + Adj.',
        examples: [
          { c: '今天比昨天冷一点儿。',     p: 'Jīntiān bǐ zuótiān lěng yìdiǎnr.',    en: 'Today is a bit colder than yesterday.' },
          { c: '数学比历史难多了。',         p: 'Shùxué bǐ lìshǐ nán duō le.',         en: 'Maths is much harder than history.' },
          { c: '我比他大两岁。',           p: 'Wǒ bǐ tā dà liǎng suì.',         en: 'I’m two years older than him.' },
          { c: '我的汉语没有他好。',     p: 'Wǒ de Hànyǔ méiyǒu tā hǎo.',     en: 'My Chinese isn’t as good as his.' },
        ],
      },
      {
        title: 'Approximate numbers',
        summary: 'Combine two adjacent digits to give an approximate quantity: 一两 (one or two), 两三 (two or three), 三四 (three or four), 七八 (seven or eight). For tens / hundreds add the unit: 三四十, 两三百.',
        examples: [
          { c: '教室里有三四十个学生。',     p: 'Jiàoshì lǐ yǒu sān-sì shí ge xuésheng.', en: 'There are thirty or forty students in the classroom.' },
          { c: '骑车七八分钟就能到。', p: 'Qí chē qī-bā fēnzhōng jiù néng dào.', en: 'Just seven or eight minutes by bike.' },
        ],
      },
    ],
  },

  // ───────────────────────────── L11 ─────────────────────────────
  {
    no: 11,
    han: '别忘了把空调关了',
    pinyin: 'Bié wàngle bǎ kōngtiáo guān le',
    en: "Don't forget to turn off the air conditioner",
    focus: '把-sentence 1 (A 把 B + V + 了) · Approximate numbers 2 (左右)',
    texts: [
      {
        title: 'Lesson focus · 例句',
        lines: [
          { s: 'A', c: '别忘了把空调关了。',                   p: 'Bié wàngle bǎ kōngtiáo guān le.',           en: "Don't forget to turn off the air conditioner." },
          { s: 'B', c: '好的，我把灯也关了。',                 p: 'Hǎo de, wǒ bǎ dēng yě guān le.',           en: 'OK, I’ll turn off the light too.' },
          { s: 'A', c: '客人大概十点左右到。',                 p: 'Kèrén dàgài shí diǎn zuǒyòu dào.',         en: 'The guests will arrive at about ten.' },
          { s: 'B', c: '我已经把房间打扫干净了。',             p: 'Wǒ yǐjīng bǎ fángjiān dǎsǎo gānjìng le.', en: "I've already cleaned the room." },
        ],
      },
    ],
    vocab: [
      { c: '把',         p: 'bǎ',         pos: 'prep.',  en: 'object-marker (in 把-sentences)' },
      { c: '空调',       p: 'kōngtiáo',   pos: 'n.',     en: 'air conditioner' },
      { c: '灯',         p: 'dēng',       pos: 'n.',     en: 'light, lamp' },
      { c: '关',         p: 'guān',       pos: 'v.',     en: 'to close, to turn off' },
      { c: '开',         p: 'kāi',        pos: 'v.',     en: 'to open, to turn on' },
      { c: '打扫',       p: 'dǎsǎo',      pos: 'v.',     en: 'to clean' },
      { c: '干净',       p: 'gānjìng',    pos: 'adj.',   en: 'clean' },
      { c: '左右',       p: 'zuǒyòu',     pos: 'n.',     en: 'about, around' },
      { c: '大概',       p: 'dàgài',      pos: 'adv.',   en: 'probably, roughly' },
      { c: '记得',       p: 'jìde',       pos: 'v.',     en: 'to remember' },
      { c: '忘',         p: 'wàng',       pos: 'v.',     en: 'to forget' },
      { c: '帮助',       p: 'bāngzhù',    pos: 'v./n.',  en: 'to help; help' },
      { c: '行李',       p: 'xíngli',     pos: 'n.',     en: 'luggage' },
    ],
    notes: [
      '把-sentence 1: S + 把 + Definite-O + V + 了 — focus on the disposal/result of a known object (把空调关了, 把作业写完了).',
      'Use 左右 / 大概 after a number for approximation: 十点左右, 三十岁左右, 大概一百块.',
    ],
  },

  // ───────────────────────────── L12 ─────────────────────────────
  {
    no: 12,
    han: '把重要的东西放在我这儿',
    pinyin: 'Bǎ zhòngyào de dōngxi fàng zài wǒ zhèr',
    en: 'Leave the important items with me',
    focus: '早 vs 才 · 把-sentence 2 (A 把 B + V + 在 / 到 / 给 …)',
    texts: [
      {
        title: 'Lesson focus · 例句',
        lines: [
          { s: 'A', c: '把重要的东西放在我这儿吧。',         p: 'Bǎ zhòngyào de dōngxi fàng zài wǒ zhèr ba.', en: 'Put your important things over here with me.' },
          { s: 'B', c: '好，把护照也给你。',                 p: 'Hǎo, bǎ hùzhào yě gěi nǐ.',                 en: 'OK, here, I’ll give you the passport too.' },
          { s: 'A', c: '你怎么才到？我早就到了。',           p: 'Nǐ zěnme cái dào? Wǒ zǎo jiù dào le.',      en: 'Why are you only just arriving? I got here ages ago.' },
          { s: 'B', c: '路上车太多了。',                     p: 'Lùshang chē tài duō le.',                   en: 'There was too much traffic.' },
        ],
      },
    ],
    vocab: [
      { c: '重要',     p: 'zhòngyào',   pos: 'adj.', en: 'important' },
      { c: '东西',     p: 'dōngxi',     pos: 'n.',   en: 'thing' },
      { c: '放',       p: 'fàng',       pos: 'v.',   en: 'to put, to place' },
      { c: '在',       p: 'zài',        pos: 'prep.', en: 'at, in (location)' },
      { c: '到',       p: 'dào',        pos: 'v./prep.', en: 'to arrive; to' },
      { c: '给',       p: 'gěi',        pos: 'prep./v.', en: 'to, for; to give' },
      { c: '才',       p: 'cái',        pos: 'adv.', en: 'only then; not until' },
      { c: '早',       p: 'zǎo',        pos: 'adv./adj.', en: 'early' },
      { c: '迟到',     p: 'chídào',     pos: 'v.',   en: 'to be late' },
      { c: '安全',     p: 'ānquán',     pos: 'adj./n.', en: 'safe; safety' },
      { c: '银行',     p: 'yínháng',    pos: 'n.',   en: 'bank' },
      { c: '电梯',     p: 'diàntī',     pos: 'n.',   en: 'lift, elevator' },
    ],
    notes: [
      '把-sentence 2: S + 把 + O + V + 在/到/给 + place / recipient — 把书放在桌子上, 把信寄到北京, 把礼物送给老师.',
      '早 indicates earlier than expected; 才 indicates later than expected: 早就到了 vs 才到.',
    ],
  },

  // ───────────────────────────── L13 ─────────────────────────────
  {
    no: 13,
    han: '我是走回来的',
    pinyin: 'Wǒ shì zǒu huílai de',
    en: 'I walked back',
    focus: 'Compound complements of direction · 一边 … 一边 …',
    texts: [
      {
        title: 'Lesson focus · 例句',
        lines: [
          { s: 'A', c: '你怎么这么累？',                   p: 'Nǐ zěnme zhème lèi?',              en: 'Why are you so tired?' },
          { s: 'B', c: '我是走回来的。',                   p: 'Wǒ shì zǒu huílai de.',            en: 'I walked back.' },
          { s: 'A', c: '他跑上楼去拿东西了。',             p: 'Tā pǎo shàng lóu qù ná dōngxi le.', en: 'He ran upstairs to get something.' },
          { s: 'B', c: '我喜欢一边走路一边听音乐。',       p: 'Wǒ xǐhuan yìbiān zǒulù yìbiān tīng yīnyuè.', en: 'I like walking and listening to music at the same time.' },
        ],
      },
    ],
    vocab: [
      { c: '跑',       p: 'pǎo',        pos: 'v.',   en: 'to run' },
      { c: '走',       p: 'zǒu',        pos: 'v.',   en: 'to walk, to leave' },
      { c: '上',       p: 'shàng',      pos: 'v.',   en: 'to go up' },
      { c: '下',       p: 'xià',        pos: 'v.',   en: 'to go down' },
      { c: '进',       p: 'jìn',        pos: 'v.',   en: 'to enter' },
      { c: '出',       p: 'chū',        pos: 'v.',   en: 'to exit' },
      { c: '回',       p: 'huí',        pos: 'v.',   en: 'to return' },
      { c: '过',       p: 'guò',        pos: 'v.',   en: 'to pass, to cross' },
      { c: '一边',     p: 'yìbiān',     pos: 'adv.', en: 'at the same time (paired)' },
      { c: '音乐',     p: 'yīnyuè',     pos: 'n.',   en: 'music' },
      { c: '楼上',     p: 'lóushàng',   pos: 'n.',   en: 'upstairs' },
      { c: '楼下',     p: 'lóuxià',     pos: 'n.',   en: 'downstairs' },
      { c: '送',       p: 'sòng',       pos: 'v.',   en: 'to see off; to deliver' },
    ],
    notes: [
      'Compound directional complement: V + Direction₁ + 来 / 去 — 跑上来, 走下去, 拿出去, 走回来.',
      'Place objects sit between the directional verbs: 跑上楼来, 走回家去.',
      '一边 V₁ … 一边 V₂ … = doing two actions simultaneously.',
    ],
  },

  // ───────────────────────────── L14 ─────────────────────────────
  {
    no: 14,
    han: '你把水果拿过来',
    pinyin: 'Nǐ bǎ shuǐguǒ ná guolai',
    en: 'Please bring the fruit over here',
    focus: '把-sentence 3 with result / direction complement · 先 … 然后 … 再 …',
    texts: [
      {
        title: 'Lesson focus · 例句',
        lines: [
          { s: 'A', c: '你把水果拿过来。',                 p: 'Nǐ bǎ shuǐguǒ ná guolai.',               en: 'Bring the fruit over here, please.' },
          { s: 'B', c: '好，我把它洗干净再拿过来。',       p: 'Hǎo, wǒ bǎ tā xǐ gānjìng zài ná guolai.', en: "OK, I'll wash it first and then bring it." },
          { s: 'A', c: '我们先吃饭，然后再去看电影。',     p: 'Wǒmen xiān chī fàn, ránhòu zài qù kàn diànyǐng.', en: "Let's eat first, then go see a movie." },
          { s: 'B', c: '把行李搬上车去吧。',               p: 'Bǎ xíngli bān shàng chē qù ba.',         en: 'Carry the luggage up onto the car.' },
        ],
      },
    ],
    vocab: [
      { c: '水果',     p: 'shuǐguǒ',  pos: 'n.', en: 'fruit' },
      { c: '洗',       p: 'xǐ',       pos: 'v.', en: 'to wash' },
      { c: '干净',     p: 'gānjìng',  pos: 'adj.', en: 'clean' },
      { c: '先',       p: 'xiān',     pos: 'adv.', en: 'first' },
      { c: '然后',     p: 'ránhòu',   pos: 'conj.', en: 'then, afterwards' },
      { c: '再',       p: 'zài',      pos: 'adv.', en: 'then; again' },
      { c: '完',       p: 'wán',      pos: 'v.', en: 'to finish' },
      { c: '住',       p: 'zhù',      pos: 'v.', en: 'to live; firmly (as complement)' },
      { c: '记住',     p: 'jìzhù',    pos: 'v.', en: 'to remember firmly' },
      { c: '拿',       p: 'ná',       pos: 'v.', en: 'to take, to fetch' },
      { c: '过来',     p: 'guolai',   pos: 'v.', en: 'come over' },
      { c: '过去',     p: 'guoqu',    pos: 'v.', en: 'go over' },
      { c: '准备',     p: 'zhǔnbèi',  pos: 'v.', en: 'to prepare' },
    ],
    notes: [
      '把-sentence 3: S + 把 + O + V + result / direction complement — 把书放在桌子上, 把水果拿过来, 把字写清楚.',
      '先 … 然后 … 再 … sequences three steps in order.',
    ],
  },

  // ───────────────────────────── L15 ─────────────────────────────
  {
    no: 15,
    han: '其他都没什么问题',
    pinyin: 'Qítā dōu méi shénme wèntí',
    en: 'The rest are all fine',
    focus: '除了 … (以外) … 还/都 · Flexible interrogative pronouns 2 · Adj / Mental V + 极了',
    texts: [
      {
        title: 'Lesson focus · 例句',
        lines: [
          { s: 'A', c: '除了发音以外，其他都没什么问题。', p: 'Chúle fāyīn yǐwài, qítā dōu méi shénme wèntí.', en: 'Apart from pronunciation, everything else is fine.' },
          { s: 'B', c: '今天的天气好极了！',               p: 'Jīntiān de tiānqì hǎo jíle!',                  en: 'The weather today is wonderful!' },
          { s: 'A', c: '什么菜都行，我都喜欢。',           p: 'Shénme cài dōu xíng, wǒ dōu xǐhuan.',          en: "Any dish is fine — I like them all." },
          { s: 'B', c: '除了米饭，他还想吃饺子。',         p: 'Chúle mǐfàn, tā hái xiǎng chī jiǎozi.',        en: 'Besides rice, he also wants to eat dumplings.' },
        ],
      },
    ],
    vocab: [
      { c: '除了',   p: 'chúle',    pos: 'prep.', en: 'except for; besides' },
      { c: '以外',   p: 'yǐwài',    pos: 'n.',    en: 'beyond, except' },
      { c: '其他',   p: 'qítā',     pos: 'pron.', en: 'other' },
      { c: '问题',   p: 'wèntí',    pos: 'n.',    en: 'question, problem' },
      { c: '极',     p: 'jí',       pos: 'adv.',  en: 'extremely (Adj + 极了)' },
      { c: '满意',   p: 'mǎnyì',    pos: 'adj.',  en: 'satisfied' },
      { c: '检查',   p: 'jiǎnchá',  pos: 'v.',    en: 'to check' },
      { c: '认真',   p: 'rènzhēn',  pos: 'adj.',  en: 'serious, earnest' },
      { c: '错',     p: 'cuò',      pos: 'adj./n.', en: 'wrong; mistake' },
      { c: '马上',   p: 'mǎshàng',  pos: 'adv.',  en: 'right away' },
      { c: '一定',   p: 'yídìng',   pos: 'adv.',  en: 'definitely' },
      { c: '完全',   p: 'wánquán',  pos: 'adv.',  en: 'completely' },
    ],
    notes: [
      '除了 N (以外), …还 / 都 / 也 …: “besides N, also …” or “except for N, all …”.',
      'Adj / Mental V + 极了 expresses an extreme degree (好极了, 高兴极了).',
      '什么 / 谁 / 哪儿 + 都/也 = universal quantifier (什么都吃, 谁都知道).',
    ],
  },

  // ───────────────────────────── L16 ─────────────────────────────
  {
    no: 16,
    han: '我现在累得下了班就想睡觉',
    pinyin: 'Wǒ xiànzài lèi de xiàle bān jiù xiǎng shuì jiào',
    en: "I'm so tired I want to sleep right after work",
    focus: '如果 …(的话), (S) 就 … · Complex complements of state · Reduplication AA的',
    texts: [
      {
        title: 'Lesson focus · 例句',
        lines: [
          { s: 'A', c: '你看起来不太好。',                   p: 'Nǐ kàn qǐlai bú tài hǎo.',                       en: "You don't look very well." },
          { s: 'B', c: '我现在累得下了班就想睡觉。',         p: 'Wǒ xiànzài lèi de xiàle bān jiù xiǎng shuì jiào.', en: "I'm so tired I want to sleep right after work." },
          { s: 'A', c: '如果有时间的话，就好好休息几天。',   p: 'Rúguǒ yǒu shíjiān de huà, jiù hǎohǎo xiūxi jǐ tiān.', en: 'If you have time, take a few days off and rest properly.' },
          { s: 'B', c: '她笑得甜甜的。',                     p: 'Tā xiào de tiántián de.',                        en: 'She smiles so sweetly.' },
        ],
      },
    ],
    vocab: [
      { c: '如果',   p: 'rúguǒ',    pos: 'conj.', en: 'if' },
      { c: '的话',   p: 'de huà',   pos: 'part.', en: 'if (sentence-final)' },
      { c: '累',     p: 'lèi',      pos: 'adj.',  en: 'tired' },
      { c: '下班',   p: 'xià bān',  pos: 'v.',    en: 'to finish work' },
      { c: '上班',   p: 'shàng bān', pos: 'v.',   en: 'to go to work' },
      { c: '睡觉',   p: 'shuì jiào', pos: 'v.',   en: 'to sleep' },
      { c: '舒服',   p: 'shūfu',    pos: 'adj.',  en: 'comfortable' },
      { c: '好好',   p: 'hǎohǎo',   pos: 'adv.',  en: 'thoroughly, properly' },
      { c: '甜',     p: 'tián',     pos: 'adj.',  en: 'sweet' },
      { c: '休息',   p: 'xiūxi',    pos: 'v./n.', en: 'to rest; rest' },
      { c: '生气',   p: 'shēngqì',  pos: 'v.',    en: 'to be angry' },
      { c: '担心',   p: 'dānxīn',   pos: 'v.',    en: 'to worry' },
    ],
    notes: [
      '如果 …(的话), (S) 就 …: conditional “if … then …”.',
      'Complex 得 complement: V/Adj + 得 + a clause expressing degree — 累得想睡觉, 高兴得跳起来.',
      'AA的 reduplication of monosyllabic adjectives describes manner vividly: 甜甜的, 大大的, 红红的.',
    ],
  },

  // ───────────────────────────── L17 ─────────────────────────────
  {
    no: 17,
    han: '谁都有办法看好你的“病”',
    pinyin: 'Shéi dōu yǒu bànfǎ kànhǎo nǐ de "bìng"',
    en: 'Everyone has a way to cure your "illness"',
    focus: 'Reduplication of disyllabic verbs (ABAB) · Flexible interrogative pronouns 3',
    texts: [
      {
        title: 'Lesson focus · 例句',
        lines: [
          { s: 'A', c: '我最近什么都不想做。',               p: 'Wǒ zuìjìn shénme dōu bù xiǎng zuò.',          en: "Lately I don't feel like doing anything." },
          { s: 'B', c: '谁都有办法看好你的“病”。',           p: 'Shéi dōu yǒu bànfǎ kànhǎo nǐ de "bìng".',     en: 'Everybody has a way to cure your "illness".' },
          { s: 'A', c: '我们出去走走，放松放松。',           p: 'Wǒmen chūqù zǒuzou, fàngsōng fàngsōng.',       en: "Let's go out for a walk and unwind a bit." },
          { s: 'B', c: '好，先去公园看看花。',               p: 'Hǎo, xiān qù gōngyuán kànkan huā.',           en: "Sure — let's go to the park and look at the flowers first." },
        ],
      },
    ],
    vocab: [
      { c: '办法',   p: 'bànfǎ',    pos: 'n.',  en: 'way, method' },
      { c: '病',     p: 'bìng',     pos: 'n./v.', en: 'illness; to be ill' },
      { c: '看',     p: 'kàn',      pos: 'v.',  en: 'to look; to treat (an illness)' },
      { c: '放松',   p: 'fàngsōng', pos: 'v.',  en: 'to relax' },
      { c: '心情',   p: 'xīnqíng',  pos: 'n.',  en: 'mood' },
      { c: '高兴',   p: 'gāoxìng',  pos: 'adj.', en: 'happy' },
      { c: '难过',   p: 'nánguò',   pos: 'adj.', en: 'sad' },
      { c: '主意',   p: 'zhǔyi',    pos: 'n.',  en: 'idea' },
      { c: '锻炼',   p: 'duànliàn', pos: 'v.',  en: 'to exercise' },
      { c: '聊天',   p: 'liáo tiān', pos: 'v.', en: 'to chat' },
      { c: '帮助',   p: 'bāngzhù',  pos: 'v./n.', en: 'to help; help' },
      { c: '试',     p: 'shì',      pos: 'v.',  en: 'to try' },
    ],
    notes: [
      'ABAB reduplication of disyllabic verbs softens the action ("a little"): 休息休息, 锻炼锻炼, 放松放松.',
      'Monosyllabic verbs reduplicate as AA (or A一A): 看看 / 看一看, 走走 / 走一走.',
      '谁 / 什么 / 哪儿 + 都/也 = universal: 谁都知道, 什么都行, 哪儿都不去.',
    ],
  },

  // ───────────────────────────── L18 ─────────────────────────────
  {
    no: 18,
    han: '我相信他们会同意的',
    pinyin: 'Wǒ xiāngxìn tāmen huì tóngyì de',
    en: "I believe they'll agree",
    focus: '只要 … 就 … · Preposition 关于',
    texts: [
      {
        title: 'Lesson focus · 例句',
        lines: [
          { s: 'A', c: '关于这件事，你有什么想法？',         p: 'Guānyú zhè jiàn shì, nǐ yǒu shénme xiǎngfǎ?', en: 'What are your thoughts on this matter?' },
          { s: 'B', c: '我相信他们会同意的。',               p: 'Wǒ xiāngxìn tāmen huì tóngyì de.',           en: "I believe they'll agree." },
          { s: 'A', c: '只要你认真准备，就一定能成功。',     p: 'Zhǐyào nǐ rènzhēn zhǔnbèi, jiù yídìng néng chénggōng.', en: "As long as you prepare seriously, you'll certainly succeed." },
          { s: 'B', c: '我看了一本关于历史的书。',           p: 'Wǒ kàn le yì běn guānyú lìshǐ de shū.',      en: 'I read a book about history.' },
        ],
      },
    ],
    vocab: [
      { c: '关于',   p: 'guānyú',     pos: 'prep.', en: 'about, concerning' },
      { c: '只要',   p: 'zhǐyào',     pos: 'conj.', en: 'as long as' },
      { c: '相信',   p: 'xiāngxìn',   pos: 'v.',    en: 'to believe' },
      { c: '同意',   p: 'tóngyì',     pos: 'v.',    en: 'to agree' },
      { c: '想法',   p: 'xiǎngfǎ',    pos: 'n.',    en: 'idea, thought' },
      { c: '成功',   p: 'chénggōng',  pos: 'v./n.', en: 'to succeed; success' },
      { c: '机会',   p: 'jīhuì',      pos: 'n.',    en: 'opportunity' },
      { c: '努力',   p: 'nǔlì',       pos: 'adj./v.', en: 'hard-working; to work hard' },
      { c: '希望',   p: 'xīwàng',     pos: 'v./n.', en: 'to hope; hope' },
      { c: '一定',   p: 'yídìng',     pos: 'adv.',  en: 'certainly' },
      { c: '可能',   p: 'kěnéng',     pos: 'aux./adv.', en: 'maybe; possible' },
      { c: '解决',   p: 'jiějué',     pos: 'v.',    en: 'to resolve, to solve' },
    ],
    notes: [
      '只要 … 就 …: a sufficient condition — “as long as A, then B”.',
      '会 … 的 expresses confident prediction: 他会来的, 你会成功的.',
      '关于 + N introduces topic: 关于这件事, 关于历史的书.',
    ],
  },

  // ───────────────────────────── L19 ─────────────────────────────
  {
    no: 19,
    han: '你没看出来吗',
    pinyin: 'Nǐ méi kàn chūlái ma',
    en: "Didn't you recognise him",
    focus: 'Extension of 出来 (recognition) / 起来 (recall, emergence) · 使 vs 叫 vs 让',
    texts: [
      {
        title: 'Lesson focus · 例句',
        lines: [
          { s: 'A', c: '你没看出来吗？那是小李。',           p: 'Nǐ méi kàn chūlái ma? Nà shì Xiǎo Lǐ.',     en: "Didn't you recognise him? That was Xiao Li." },
          { s: 'B', c: '我想起来了，他变了很多。',           p: 'Wǒ xiǎng qǐlái le, tā biàn le hěn duō.',    en: 'Now I remember — he has changed a lot.' },
          { s: 'A', c: '这件事让我很高兴。',                 p: 'Zhè jiàn shì ràng wǒ hěn gāoxìng.',         en: 'This makes me very happy.' },
          { s: 'B', c: '老师叫我们多说汉语。',               p: 'Lǎoshī jiào wǒmen duō shuō Hànyǔ.',         en: 'The teacher tells us to speak more Chinese.' },
        ],
      },
    ],
    vocab: [
      { c: '出来',   p: 'chūlái',   pos: 'v.', en: 'to come out; (as complement) to make out' },
      { c: '起来',   p: 'qǐlái',    pos: 'v.', en: 'to rise; (as complement) to bring to mind' },
      { c: '想起来', p: 'xiǎng qǐlái', pos: 'v.', en: 'to recall, to remember' },
      { c: '看出来', p: 'kàn chūlái', pos: 'v.', en: 'to recognise; to tell from looking' },
      { c: '使',     p: 'shǐ',      pos: 'v.', en: 'to make, to cause' },
      { c: '叫',     p: 'jiào',     pos: 'v.', en: 'to call; to ask (someone to do)' },
      { c: '让',     p: 'ràng',     pos: 'v.', en: 'to let, to make' },
      { c: '变',     p: 'biàn',     pos: 'v.', en: 'to change' },
      { c: '突然',   p: 'tūrán',    pos: 'adv./adj.', en: 'suddenly; sudden' },
      { c: '声音',   p: 'shēngyīn', pos: 'n.', en: 'sound, voice' },
      { c: '熟悉',   p: 'shúxī',    pos: 'v./adj.', en: 'to be familiar with' },
      { c: '主意',   p: 'zhǔyi',    pos: 'n.', en: 'idea' },
    ],
    notes: [
      'Extended 出来: identification through perception — 听出来, 看出来, 吃出来 (recognise something by hearing/looking/tasting).',
      'Extended 起来: bringing something to mind / something emerging — 想起来, 笑起来, 下起雨来.',
      '使 / 叫 / 让 are causative verbs. 让 / 叫 are colloquial; 使 is more formal/written.',
    ],
  },

  // ───────────────────────────── L20 ─────────────────────────────
  {
    no: 20,
    han: '我被他影响了',
    pinyin: 'Wǒ bèi tā yǐngxiǎng le',
    en: "I've been influenced by him",
    focus: '被-sentence (S + 被 / 叫 / 让 + O + V + other) · 只有 … 才 …',
    texts: [
      {
        title: 'Lesson focus · 例句',
        lines: [
          { s: 'A', c: '你怎么也开始锻炼了？',               p: 'Nǐ zěnme yě kāishǐ duànliàn le?',          en: "How come you've also started exercising?" },
          { s: 'B', c: '我被他影响了。',                     p: 'Wǒ bèi tā yǐngxiǎng le.',                  en: "I've been influenced by him." },
          { s: 'A', c: '蛋糕被妹妹吃完了。',                 p: 'Dàngāo bèi mèimei chīwán le.',             en: 'The cake was eaten up by my younger sister.' },
          { s: 'B', c: '只有努力，才能成功。',               p: 'Zhǐyǒu nǔlì, cái néng chénggōng.',         en: 'Only by working hard can one succeed.' },
        ],
      },
    ],
    vocab: [
      { c: '被',     p: 'bèi',       pos: 'prep.', en: 'by (passive marker)' },
      { c: '影响',   p: 'yǐngxiǎng', pos: 'v./n.', en: 'to influence; influence' },
      { c: '只有',   p: 'zhǐyǒu',    pos: 'conj.', en: 'only (with 才)' },
      { c: '才',     p: 'cái',       pos: 'adv.',  en: 'only then' },
      { c: '完',     p: 'wán',       pos: 'v.',    en: 'to finish' },
      { c: '丢',     p: 'diū',       pos: 'v.',    en: 'to lose' },
      { c: '坏',     p: 'huài',      pos: 'adj./v.', en: 'bad; to break down' },
      { c: '解决',   p: 'jiějué',    pos: 'v.',    en: 'to resolve' },
      { c: '机会',   p: 'jīhuì',     pos: 'n.',    en: 'opportunity' },
      { c: '生活',   p: 'shēnghuó',  pos: 'n./v.', en: 'life; to live' },
      { c: '安全',   p: 'ānquán',    pos: 'adj./n.', en: 'safe; safety' },
      { c: '成功',   p: 'chénggōng', pos: 'v./n.', en: 'to succeed; success' },
    ],
    notes: [
      '被-sentence: S + 被 / 叫 / 让 + Agent + V + 了 / complement — passive with focus on what happened to S (蛋糕被吃完了).',
      'Agent may be omitted: 我的钱包被偷了.',
      '只有 … 才 …: necessary condition — “only when A, then B”.',
    ],
  },
]
