export const LESSON_NOTES = [
  {
    slug: 'qing-character-meaning-and-sound-family',
    title: 'The Character 青: Meaning, Structure & Sound Family',
    subtitle: 'A foundational HSK character rich in culture, grammar, and character components',
    summary: 'Explore how 青 can express green, blue, dark colors, and youth—and how it acts as a sound component in other characters.',
    hero: '青',
    pinyin: 'qīng',
    keywords: ['青', 'qīng', 'color', 'youth', 'radical', 'phonetic component', 'character family'],
    sections: [
      {
        title: 'Meaning & Usage',
        intro: '青 is unique because its precise color depends on context:',
        blocks: [
          {
            type: 'ordered-list',
            items: [
              { lead: 'Green', text: 'Nature and plants', examples: '青山 (qīngshān — green mountains), 青草 (qīngcǎo — green grass)' },
              { lead: 'Blue / Cyan', text: 'Sky and clear water', examples: '青天 (qīngtiān — blue sky)' },
              { lead: 'Black / Dark', text: 'Hair', examples: '青丝 (qīngsī — black hair)' },
              { lead: 'Youth / Young', text: 'Youth and youthfulness', examples: '青年 (qīngnián — youth / young adults), 青春 (qīngchūn — youthfulness)' },
            ],
          },
        ],
      },
      {
        title: 'Character Structure & Radical Details',
        blocks: [
          {
            type: 'facts',
            items: [
              { label: 'Pinyin', value: 'qīng' },
              { label: 'Radical', value: '青', detail: '青部 (qīng bù), Radical #174' },
              { label: 'Stroke count', value: '8 strokes' },
            ],
          },
          {
            type: 'heading',
            text: 'Component breakdown',
          },
          {
            type: 'bullet-list',
            items: [
              { lead: 'Top part', text: '龶—an ancient form related to 生 (shēng), “to grow” or “to sprout.”' },
              { lead: 'Bottom part', text: '井 or 井/月—historically representing 丹 (dān), cinnabar, clarity, or mineral color.' },
              { lead: 'Semantic concept', text: 'Growing plants (生) displaying vibrant, natural color (丹/月).' },
            ],
          },
        ],
      },
      {
        title: 'Phonetic Part: 青 in Other Characters',
        intro: '青 is a very active phonetic component in Chinese. When you see 青 inside a character, it almost always gives the character a pronunciation of qīng, qǐng, or jīng.',
        blocks: [
          {
            type: 'table',
            caption: 'Key examples, including many core HSK 1–3 words',
            characterColumn: 0,
            headers: ['Character', 'Pinyin', 'Semantic radical', 'Meaning', 'Example word'],
            rows: [
              ['请', 'qǐng', '讠 · speech', 'Please / to invite', '请问 · qǐngwèn · Excuse me'],
              ['清', 'qīng', '氵 · water', 'Clear / pure', '清楚 · qīngchu · Clear · HSK 3'],
              ['晴', 'qíng', '日 · sun', 'Clear / sunny weather', '晴天 · qíngtiān · Sunny day · HSK 2'],
              ['情', 'qíng', '忄 · heart / emotion', 'Feeling / emotion', '事情 · shìqing · Matter / thing · HSK 2; 心情 · xīnqíng · Mood · HSK 3'],
              ['精', 'jīng', '米 · rice / grain', 'Essence / smart / precise', '精彩 · jīngcǎi · Wonderful · HSK 3'],
              ['猜', 'cāi', '犭 · animal / behavior', 'To guess', '猜一猜 · cāi yī cāi · Take a guess · HSK 3'],
              ['静', 'jìng', '青 + 争', 'Quiet / still', '安静 · ānjìng · Quiet · HSK 3'],
            ],
          },
          {
            type: 'callout',
            label: 'Learning tip',
            text: 'Notice how 请, 清, 晴, 情, and 精 all share 青 on the right side. When reading, use the radical on the left for the meaning—speech, water, sun, or heart—and 青 on the right for the pronunciation.',
          },
        ],
      },
    ],
  },
  {
    slug: 'shi-character-grammar-structure-and-family',
    title: 'The Character 是: Grammar, Structure & Character Family',
    subtitle: 'One of the most important and frequently used words in Chinese',
    summary: 'Learn how HSK 1 是 works as “to be” and “yes,” then explore its radical, components, original meaning, and related characters.',
    hero: '是',
    pinyin: 'shì',
    keywords: ['是', 'shì', 'to be', 'yes', 'agreement', '是……的', 'grammar', 'HSK 1', 'HSK 3', 'radical', 'character family'],
    sections: [
      {
        title: 'Key Grammar & Usage',
        intro: '是 primarily functions as the verb “to be” (am, is, are, was, or were) or expresses agreement: “yes” or “indeed.”',
        blocks: [
          {
            type: 'heading',
            text: 'Usage 1: The verb “to be” — linking nouns',
          },
          {
            type: 'paragraph',
            text: 'In Chinese, 是 links a subject to a noun or noun phrase—never directly to a simple adjective.',
          },
          {
            type: 'facts',
            items: [
              { label: 'Structure', value: 'Subject + 是 + Noun' },
            ],
          },
          {
            type: 'examples',
            items: [
              { c: '我是学生。', p: 'Wǒ shì xuésheng.', en: 'I am a student.' },
            ],
          },
          {
            type: 'callout',
            label: 'Grammar tip for HSK 3',
            text: 'Do not use 是 to link a subject with a simple adjective. Incorrect: 我是高兴。 (Wǒ shì gāoxìng.) Correct: 我很高兴。 (Wǒ hěn gāoxìng. — I am happy.)',
          },
          {
            type: 'heading',
            text: 'Usage 2: Emphatic “It IS…” and expressing agreement',
          },
          {
            type: 'paragraph',
            text: '是 can be used alone to mean “Yes” or “That’s right,” or it can add emphasis using the 是……的 (shì… de) structure.',
          },
          {
            type: 'examples',
            items: [
              { c: 'A：你是老师吗？\nB：是。', p: 'Nǐ shì lǎoshī ma?\nShì.', en: 'Are you a teacher? Yes / That’s right.' },
              { c: '我是昨天来的。', p: 'Wǒ shì zuótiān lái de.', en: 'It was yesterday that I arrived. The sentence emphasizes when it happened.' },
            ],
          },
        ],
      },
      {
        title: 'Character Structure & Radical Details',
        blocks: [
          {
            type: 'facts',
            items: [
              { label: 'Pinyin', value: 'shì' },
              { label: 'Radical', value: '日', detail: '日部 (rì bù)—Sun Radical, 4 strokes' },
              { label: 'Stroke count', value: '9 strokes' },
            ],
          },
          {
            type: 'callout',
            label: 'Radical tip',
            text: 'Characters with 日 usually relate to time, light, or the sun—for example, 明 (míng — bright), 晴 (qíng — sunny), and 时 (shí — time).',
          },
          {
            type: 'heading',
            text: 'Component breakdown',
          },
          {
            type: 'bullet-list',
            items: [
              { lead: 'Top part (semantic)', text: '日 (rì — sun). Historically represented clarity, light, or truth—seeing things clearly under the sun.' },
              { lead: 'Bottom part', text: '疋 / 𠯁, an ancient variant related to 正 (zhèng — straight, correct, or upright).' },
            ],
          },
          {
            type: 'paragraph',
            text: 'In ancient Chinese, 是 originally meant “right,” “correct,” or “straight”—the opposite of 非 (fēi — wrong). Over time, it evolved into the modern copula verb “to be.”',
          },
        ],
      },
      {
        title: 'Phonetic Component & Character Family',
        intro: 'Historically, the bottom part of 是 (shì) relates to 正 (zhèng) or 匙 (chí), providing a sound clue in the sh- / ch- series in certain characters.',
        blocks: [
          {
            type: 'paragraph',
            text: 'These characters share components or phonetic links with 是:',
          },
          {
            type: 'table',
            characterColumn: 0,
            headers: ['Character', 'Pinyin', 'Radical', 'Meaning', 'Example word'],
            rows: [
              ['匙', 'chí / shi', '匕 · spoon', 'Spoon / key', '钥匙 · yàoshi · Key · HSK 3'],
              ['提', 'tí', '扌 · hand', 'To lift / carry / mention', '提 · tí · To raise; 提醒 · tíxǐng · Remind · HSK 3 (shares the 昰/是 form in traditional variations)'],
              ['堤', 'dī', '土 · earth', 'Dike / embankment', '堤坝 · dībà · Dam / dike'],
            ],
          },
          {
            type: 'callout',
            label: 'HSK 3 vocabulary tip',
            text: 'Notice how 钥匙 (yàoshi — key) contains 是 as its second character and phonetic element!',
          },
        ],
      },
    ],
  },
  {
    slug: 'zhan-character-meanings-structure-and-sound-family',
    title: 'The Character 占: Meanings, Structure & Sound Family',
    subtitle: 'An independent verb and a prolific phonetic building block in Chinese',
    summary: 'Compare the zhān and zhàn readings of 占, learn its oracle-bone components, and explore the characters that use it as a phonetic core.',
    hero: '占',
    pinyin: 'zhān / zhàn',
    keywords: ['占', 'zhān', 'zhàn', 'polyphonic character', '多音字', 'occupy', 'divination', '卜', 'phonetic component', 'character family'],
    sections: [
      {
        title: 'Meanings & Pronunciations',
        intro: '占 is a polyphonic character (多音字, duōyīnzì) with two pronunciations depending on context:',
        blocks: [
          {
            type: 'table',
            headers: ['Pronunciation', 'Meaning', 'Example word'],
            rows: [
              ['zhàn · 4th tone · most common', 'To occupy / to take up / to constitute', '占有 · zhànyǒu · To occupy; 占用 · zhànyòng · To take up space or time'],
              ['zhān · 1st tone', 'To divine / to fortune-tell', '占卜 · zhānbǔ · To practice divination'],
            ],
          },
        ],
      },
      {
        title: 'Character Structure & Radical Details',
        blocks: [
          {
            type: 'facts',
            items: [
              { label: 'Pinyin', value: 'zhàn / zhān' },
              { label: 'Radical', value: '卜', detail: '卜部 (bǔ bù)—Divination / Fortune-telling Radical, 2 strokes' },
              { label: 'Stroke count', value: '5 strokes' },
            ],
          },
          {
            type: 'callout',
            label: 'Radical tip',
            text: '卜 represents cracks formed on tortoise shells or bones when ancient priests burned them to tell the future.',
          },
          {
            type: 'heading',
            text: 'Component breakdown',
          },
          {
            type: 'bullet-list',
            items: [
              { lead: 'Top part (semantic)', text: '卜 (bǔ)—a divination crack.' },
              { lead: 'Bottom part (semantic)', text: '口 (kǒu)—mouth or speech.' },
            ],
          },
          {
            type: 'paragraph',
            text: 'The original pictograph represents interpreting with the mouth (口) the cracks on an oracle bone (卜) to declare a prophecy or claim territory.',
          },
        ],
      },
      {
        title: 'Phonetic Part: 占 in Other Characters',
        intro: '占 is a super-active phonetic component. When it appears inside another character, it usually imparts an -an or -ian final sound, such as zhān, zhàn, diǎn, or tiān.',
        blocks: [
          {
            type: 'paragraph',
            text: 'These key HSK 1–3 characters use 占 as their phonetic core:',
          },
          {
            type: 'table',
            characterColumn: 0,
            headers: ['Character', 'Pinyin', 'Semantic radical', 'Meaning', 'Example word'],
            rows: [
              ['站', 'zhàn', '立 · to stand', 'Station / stop / to stand', '车站 · chēzhàn · Bus / train station · HSK 2'],
              ['点', 'diǎn', '灬 · fire / dots', 'Point / o’clock / a little', '一点儿 · yìdiǎnr · A little · HSK 1'],
              ['店', 'diàn', '广 · shelter / house', 'Shop / store', '商店 · shāngdiàn · Store · HSK 1'],
              ['贴', 'tiē', '贝 · shell / money', 'To paste / to stick', '贴 · tiē · To stick / paste · HSK 3'],
              ['战', 'zhàn', '戈 · dagger-axe / weapon', 'War / battle / fight', '战争 · zhànzhēng · War'],
              ['钻', 'zuān / zuàn', '钅 · metal', 'To drill / diamond', '钻石 · zuànshí · Diamond'],
            ],
          },
          {
            type: 'callout',
            label: 'Learning tip',
            text: 'Notice how 站, 店, 贴, and 战 all feature 占 on one side. When you see 占 in a new character, guess a pronunciation ending in -an or -ian!',
          },
        ],
      },
    ],
  },
  {
    slug: 'shi-city-market-meaning-and-structure',
    title: 'The Character 市: City, Market & Commerce',
    subtitle: 'A crucial HSK character connected with cities, markets, and trade',
    summary: 'Learn the core meanings of 市 through common HSK words, then explore its cloth radical, five-stroke structure, and market-banner origin.',
    hero: '市',
    pinyin: 'shì',
    keywords: ['市', 'shì', 'city', 'town', 'market', 'commerce', 'trade', '城市', '超市', '集市', '市场', '股市', '巾'],
    sections: [
      {
        title: 'Meanings & Common HSK Words',
        intro: '市 (shì) functions primarily as a noun meaning city, town, or market / trade.',
        blocks: [
          {
            type: 'table',
            characterColumn: 1,
            headers: ['HSK level', 'Word', 'Pinyin', 'English meaning'],
            rows: [
              ['HSK 2', '城市', 'chéngshì', 'City / town'],
              ['HSK 2', '超市', 'chāoshì', 'Supermarket'],
              ['HSK 3', '集市', 'jíshì', 'Market / fair'],
              ['HSK 4', '市场', 'shìchǎng', 'Market / marketplace'],
              ['HSK 4', '股市', 'gǔshì', 'Stock market'],
            ],
          },
        ],
      },
      {
        title: 'Character Structure & Radical Details',
        blocks: [
          {
            type: 'facts',
            items: [
              { label: 'Pinyin', value: 'shì' },
              { label: 'Radical', value: '巾', detail: '巾部 (jīn bù)—Cloth / Towel Radical, 3 strokes' },
              { label: 'Stroke count', value: '5 strokes' },
            ],
          },
          {
            type: 'callout',
            label: 'Radical tip',
            text: '巾 represents hanging cloth or textiles. In ancient markets, cloth banners were hung up to denote market stalls and trading zones!',
          },
          {
            type: 'heading',
            text: 'Component breakdown',
          },
          {
            type: 'bullet-list',
            items: [
              { lead: 'Top part', text: '亠 (lid / top component) + 丶 (dot).' },
              { lead: 'Bottom part', text: '巾 (jīn)—a cloth banner.' },
            ],
          },
          {
            type: 'paragraph',
            text: 'The original pictograph concept historically depicted a market stall marked by a cloth banner (巾), where people gathered to trade goods.',
          },
        ],
      },
    ],
  },
  {
    slug: 'dan-egg-vocabulary-structure-and-origin',
    title: 'The Character 蛋: Egg, Structure & Origin',
    subtitle: 'An essential HSK 2 / HSK 3 character used in food, cooking, and everyday expressions',
    summary: 'Learn common words built with 蛋, then explore its top-bottom structure, insect radical, eleven strokes, and historical connection to egg-laying creatures.',
    hero: '蛋',
    pinyin: 'dàn',
    keywords: ['蛋', 'dàn', 'egg', 'ovum', '鸡蛋', '蛋糕', 'food', 'cooking', '虫', 'HSK 2', 'HSK 3'],
    sections: [
      {
        title: 'Common Vocabulary & Words',
        intro: '蛋 (dàn) means egg or ovum and appears frequently in everyday food, cooking, and colloquial expressions.',
        blocks: [
          {
            type: 'table',
            characterColumn: 1,
            headers: ['HSK level', 'Chinese', 'Pinyin', 'English meaning'],
            rows: [
              ['HSK 2', '鸡蛋', 'jīdàn', 'Chicken egg—literally “chicken + egg”'],
              ['HSK 2', '蛋糕', 'dàngāo', 'Cake—literally “egg + cake / pastry”'],
            ],
          },
        ],
      },
      {
        title: 'Character Structure & Radical Details',
        blocks: [
          {
            type: 'facts',
            items: [
              { label: 'Pinyin', value: 'dàn' },
              { label: 'Radical', value: '虫', detail: '虫部 (chóng bù)—Insect / Worm Radical, 6 strokes' },
              { label: 'Stroke count', value: '11 strokes' },
              { label: 'Structure', value: 'Top–bottom', detail: '上下结构 (shàngxià jiégòu)' },
            ],
          },
          {
            type: 'callout',
            label: 'Radical tip',
            text: 'In ancient times, 虫 was used broadly for insects, reptiles, and invertebrates that laid eggs—oviparous creatures.',
          },
          {
            type: 'heading',
            text: 'Component breakdown',
          },
          {
            type: 'bullet-list',
            items: [
              { lead: 'Top part', text: '疋 (shǐ / pǐ) or 𤴓, an ancient variant derived from 正 (zhèng) or 疋 (pǐ)—feet or stepping.' },
              { lead: 'Bottom part (semantic radical)', text: '虫 (chóng)—insect or reptile.' },
            ],
          },
          {
            type: 'heading',
            text: 'Etymology & origin',
          },
          {
            type: 'paragraph',
            text: 'Historically, 蛋 represented eggs laid by reptiles, aquatic creatures, or insects (虫). Eventually, it replaced the older character 卵 (luǎn) in standard spoken modern Chinese for everyday eggs such as chicken eggs (鸡蛋).',
          },
        ],
      },
    ],
  },
  {
    slug: 'gao-cakes-vocabulary-and-structure',
    title: 'The Character 糕: Cakes, Pastries & Rice Cakes',
    subtitle: 'The character that pairs with 蛋 to form 蛋糕 (dàngāo)—cake',
    summary: 'Explore common foods made with 糕 and learn how 米 supplies its grain-related meaning while 羔 supplies its exact gāo sound.',
    hero: '糕',
    pinyin: 'gāo',
    keywords: ['糕', 'gāo', 'cake', 'pastry', 'rice cake', '蛋糕', '年糕', '雪糕', '米', '羔', 'food', 'HSK 2', 'HSK 3'],
    sections: [
      {
        title: 'Common HSK Vocabulary & Usage',
        intro: '糕 refers broadly to cakes, pastries, or steamed rice cakes. It pairs naturally with 蛋 (dàn) to make 蛋糕 (dàngāo—cake).',
        blocks: [
          {
            type: 'table',
            characterColumn: 1,
            headers: ['HSK level', 'Chinese', 'Pinyin', 'English meaning'],
            rows: [
              ['HSK 2', '蛋糕', 'dàngāo', 'Cake—literally “egg + cake”'],
              ['HSK 3', '年糕', 'niángāo', 'New Year rice cake / glutinous rice cake'],
              ['HSK 3', '雪糕', 'xuěgāo', 'Ice cream / popsicle—literally “snow cake”'],
            ],
          },
        ],
      },
      {
        title: 'Character Structure & Radical Details',
        blocks: [
          {
            type: 'facts',
            items: [
              { label: 'Pinyin', value: 'gāo' },
              { label: 'Radical', value: '米', detail: '米部 (mǐ bù)—Rice Radical, 6 strokes' },
              { label: 'Structure', value: 'Left–right', detail: '左右结构 (zuǒyòu jiégòu)' },
            ],
          },
          {
            type: 'callout',
            label: 'Radical tip',
            text: 'The left-side 米 indicates that the word relates to rice, flour, or grain products. You will see 米 in many food-related characters, including 粉 (fěn—noodles / powder) and 粒 (lì—grain).',
          },
          {
            type: 'heading',
            text: 'Meaning + sound components',
          },
          {
            type: 'bullet-list',
            items: [
              { lead: 'Semantic part', text: '米 (mǐ—rice / grain) on the left provides the meaning.' },
              { lead: 'Phonetic part', text: '羔 (gāo—lamb / young sheep) on the right provides the exact sound.' },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'haoxiang-bu-de-kong-informal-availability',
    title: '好像不得空: Talking About Availability Naturally',
    subtitle: 'An everyday sentence with Malaysian and Singaporean context, HSK 3 grammar, and character insights',
    summary: 'Learn what “他早上好像不得空” means, how to adapt it for casual and formal settings, and how 象, 得, and 空 are structured.',
    hero: '空',
    pinyin: 'hǎoxiàng bù dé kòng',
    keywords: ['好像', '不得空', '没空', '没有空', '不太方便', 'availability', 'Malaysia', 'Singapore', 'HSK 3', '象', '得', '空'],
    sections: [
      {
        title: 'Meaning & Everyday Context',
        intro: 'This sentence is common in informal daily communication, especially in the Mandarin spoken in Malaysia and Singapore.',
        blocks: [
          {
            type: 'facts',
            items: [
              { label: 'Original', value: '他早上好像不得空。' },
              { label: 'Pinyin', value: 'Tā zǎoshang hǎoxiàng bù dé kòng.' },
              { label: 'Meaning', value: 'He seems to be busy or not free this morning.' },
            ],
          },
          {
            type: 'heading',
            text: 'Asking about availability',
          },
          {
            type: 'examples',
            items: [
              { c: '他什么时候有空？', p: 'Tā shénme shíhou yǒu kòng?', en: 'When is he free?' },
              { c: '他什么时候有空，我们就什么时候开会。', p: 'Tā shénme shíhou yǒu kòng, wǒmen jiù shénme shíhou kāihuì.', en: 'Whenever he has free time, we will hold the meeting then.' },
            ],
          },
        ],
      },
      {
        title: 'Refined & Natural Versions',
        intro: 'Choose a version according to the relationship and setting:',
        blocks: [
          {
            type: 'table',
            characterColumn: 1,
            headers: ['Style', 'Sentence', 'Pinyin', 'Translation'],
            rows: [
              ['Spoken / casual', '他早上好像不得空。', 'Tā zǎoshang hǎoxiàng bù dé kòng.', 'He seems to be unavailable this morning.'],
              ['Standard / polite', '张先生早上好像没有空。', 'Zhāng xiānsheng zǎoshang hǎoxiàng méiyǒu kòng.', 'Mr. Zhang seems not to have free time this morning.'],
              ['Formal / business', '张经理早上好像不太方便。', 'Zhāng jīnglǐ zǎoshang hǎoxiàng bú tài fāngbiàn.', 'Manager Zhang seems to be unavailable this morning.'],
            ],
          },
        ],
      },
      {
        title: 'Key Grammar Points',
        blocks: [
          {
            type: 'heading',
            text: '好像 (hǎoxiàng) — “it seems / appears to be”',
          },
          {
            type: 'paragraph',
            text: 'This HSK 3 expression softens an observation by adding uncertainty. Use the structure: Subject + 好像 + Verb / Adjective.',
          },
          {
            type: 'examples',
            items: [
              { c: '他好像很高兴。', p: 'Tā hǎoxiàng hěn gāoxìng.', en: 'He seems very happy.' },
            ],
          },
          {
            type: 'heading',
            text: '不得空 (bù dé kòng) versus 没空 (méi kòng)',
          },
          {
            type: 'bullet-list',
            items: [
              { lead: '不得空', text: 'Widely used in spoken Mandarin in southern China, Malaysia, and Singapore to mean “busy” or “not free.”' },
              { lead: '没空 / 没有时间', text: 'The more broadly standard HSK phrasing for “not free” or “not having time.”' },
              { lead: '空 (kòng)', text: 'The fourth-tone reading means “free time / leisure.” Do not confuse it with kōng, the first-tone reading meaning “empty” or “sky.”' },
            ],
          },
        ],
      },
      {
        title: 'Character Deep Dive',
        intro: 'The key characters are 象 from 好像, 得 from 不得空, and 空 from 有空 / 没空.',
        blocks: [
          {
            type: 'heading',
            text: '象 (xiàng) — appearance, shape, or elephant',
          },
          {
            type: 'facts',
            items: [
              { label: 'Pinyin', value: 'xiàng' },
              { label: 'Radical', value: '豕', detail: '豕部 (shǐ bù)—Pig / Boar Radical, 7 strokes' },
              { label: 'Origin', value: 'An elephant pictograph', detail: 'Its meanings later expanded to image, appearance, and resemblance.' },
            ],
          },
          {
            type: 'paragraph',
            text: '象 also supplies the sound in 像 (xiàng—to resemble / image) and 橡 (xiàng—oak / rubber). Examples include 好像 (hǎoxiàng—seem like), 画像 (huàxiàng—portrait), and 橡皮 (xiàngpí—eraser, HSK 3).',
          },
          {
            type: 'heading',
            text: '得 (dé / de / děi) — obtain, structural particle, or must',
          },
          {
            type: 'facts',
            items: [
              { label: 'Reading here', value: 'dé', detail: 'In 不得空, it carries the sense of obtaining or getting free time.' },
              { label: 'Radical', value: '彳', detail: '彳部 (chì bù)—Two Steps / Walking Radical, 3 strokes' },
              { label: 'Components', value: '彳 + 旦 + 寸', detail: 'Step / movement on the left, with 旦 above 寸 on the right.' },
            ],
          },
          {
            type: 'callout',
            label: 'Radical tip',
            text: '彳 often suggests walking, steps, or movement. It also appears in characters such as 往 (wǎng—to go toward) and 待 (dāi—to stay).',
          },
          {
            type: 'heading',
            text: '空 (kòng / kōng) — free time or empty',
          },
          {
            type: 'facts',
            items: [
              { label: 'Readings', value: 'kòng / kōng', detail: 'kòng means free time; kōng means empty or sky.' },
              { label: 'Radical', value: '穴', detail: '穴部 (xué bù)—Cave / Hole Radical, 5 strokes' },
              { label: 'Components', value: '穴 + 工', detail: '穴 supplies the idea of an opening or emptiness; 工 gives an -ong sound clue.' },
            ],
          },
          {
            type: 'table',
            characterColumn: 0,
            caption: 'More characters using 工 (gōng) as a sound component',
            headers: ['Character', 'Pinyin', 'Components', 'Meaning / example'],
            rows: [
              ['红', 'hóng', '纟 + 工', 'Red'],
              ['功', 'gōng', '工 + 力', 'Merit / result; 成功 (chénggōng—success, HSK 3)'],
              ['攻', 'gōng', '工 + 攵', 'To attack'],
            ],
          },
        ],
      },
    ],
  },
]

const flattenBlock = (block) => {
  if (!block) return ''
  if (block.type === 'table') {
    return [block.caption, ...(block.headers || []), ...(block.rows || []).flat()].join(' ')
  }
  if (block.type === 'facts' || block.type === 'ordered-list' || block.type === 'bullet-list' || block.type === 'examples') {
    return (block.items || [])
      .flatMap(item => Object.values(item || {}))
      .join(' ')
  }
  return [block.text, block.label, block.cite].filter(Boolean).join(' ')
}

export const lessonNoteSearchText = (note) => [
  note.title,
  note.subtitle,
  note.summary,
  note.hero,
  note.pinyin,
  ...(note.keywords || []),
  ...(note.sections || []).flatMap(section => [
    section.title,
    section.intro,
    ...(section.blocks || []).map(flattenBlock),
  ]),
].filter(Boolean).join(' ').toLocaleLowerCase()

export const lessonNoteBySlug = (slug) => LESSON_NOTES.find(note => note.slug === slug) || null

export const useLessonNotes = () => ({ LESSON_NOTES, lessonNoteSearchText, lessonNoteBySlug })
