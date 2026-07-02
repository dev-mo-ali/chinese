// Thematic vocabulary topics. Each topic has a slug (URL), Hanzi title,
// English title, an icon character for cards, and either a `words[]` list
// (single column of vocab) or a `pairs[]` list (for "opposites" pages).
//
// Each word/pair entry may optionally include:
//   e:   an emoji shown as a quick visual mnemonic
//   img: a path to a real image, e.g. '/topics/body/eye.jpg'
//        (drop files into public/topics/<topic>/<file>)
//        When both are set, `img` wins.
//
// Adding a new topic: append to TOPICS, then create pages/topics/<slug>.vue
// containing only:
//   <script setup>
//   import { topicBySlug } from '~/composables/useTopics.js'
//   const topic = topicBySlug('<slug>')
//   </script>
//   <template><TopicPage :topic="topic" /></template>

export const TOPICS = [
  // ──────────────────────────── Numbers ────────────────────────────
  {
    slug: 'numbers',
    han: '数字',
    pinyin: 'shùzì',
    en: 'Numbers',
    icon: '数',
    accent: '#2563eb',
    intro: 'Numbers for counting, prices, order, dates, phone numbers, and everyday quantities in Mandarin.',
    sections: [
      {
        title: 'Basics · 基本数字',
        words: [
          { c: '零', p: 'líng', en: 'zero', e: '0️⃣' },
          { c: '一', p: 'yī', en: 'one', e: '1️⃣' },
          { c: '二', p: 'èr', en: 'two', e: '2️⃣' },
          { c: '三', p: 'sān', en: 'three', e: '3️⃣' },
          { c: '四', p: 'sì', en: 'four', e: '4️⃣' },
          { c: '五', p: 'wǔ', en: 'five', e: '5️⃣' },
          { c: '六', p: 'liù', en: 'six', e: '6️⃣' },
          { c: '七', p: 'qī', en: 'seven', e: '7️⃣' },
          { c: '八', p: 'bā', en: 'eight', e: '8️⃣' },
          { c: '九', p: 'jiǔ', en: 'nine', e: '9️⃣' },
          { c: '十', p: 'shí', en: 'ten', e: '🔟' },
        ],
      },
      {
        title: 'Tens & hundreds · 十和百',
        words: [
          { c: '十一', p: 'shíyī', en: 'eleven', e: '11' },
          { c: '十二', p: 'shíèr', en: 'twelve', e: '12' },
          { c: '二十', p: 'èrshí', en: 'twenty', e: '20' },
          { c: '二十一', p: 'èrshíyī', en: 'twenty-one', e: '21' },
          { c: '三十', p: 'sānshí', en: 'thirty', e: '30' },
          { c: '五十', p: 'wǔshí', en: 'fifty', e: '50' },
          { c: '九十九', p: 'jiǔshíjiǔ', en: 'ninety-nine', e: '99' },
          { c: '一百', p: 'yìbǎi', en: 'one hundred', e: '100' },
          { c: '两百', p: 'liǎngbǎi', en: 'two hundred', e: '200' },
          { c: '一百零一', p: 'yìbǎi líng yī', en: 'one hundred one', e: '101' },
        ],
      },
      {
        title: 'Large numbers · 大数',
        words: [
          { c: '千', p: 'qiān', en: 'thousand', e: '1,000' },
          { c: '一千', p: 'yìqiān', en: 'one thousand', e: '1,000' },
          { c: '万', p: 'wàn', en: 'ten thousand', e: '10,000' },
          { c: '一万', p: 'yíwàn', en: 'ten thousand', e: '10,000' },
          { c: '十万', p: 'shíwàn', en: 'one hundred thousand', e: '100k' },
          { c: '百万', p: 'bǎiwàn', en: 'one million', e: '1M' },
          { c: '千万', p: 'qiānwàn', en: 'ten million', e: '10M' },
          { c: '亿', p: 'yì', en: 'one hundred million', e: '100M' },
        ],
      },
      {
        title: 'Everyday use · 日常用法',
        words: [
          { c: '第', p: 'dì', en: 'ordinal prefix', e: '№' },
          { c: '第一', p: 'dì yī', en: 'first', e: '🥇' },
          { c: '第二', p: 'dì èr', en: 'second', e: '🥈' },
          { c: '个', p: 'gè', en: 'general measure word', e: '🔢' },
          { c: '几个', p: 'jǐ ge', en: 'how many', e: '?' },
          { c: '多少', p: 'duōshao', en: 'how many · how much', e: '?' },
          { c: '号码', p: 'hàomǎ', en: 'number · code', e: '#' },
          { c: '电话号码', p: 'diànhuà hàomǎ', en: 'phone number', e: '☎️' },
          { c: '一半', p: 'yíbàn', en: 'half', e: '½' },
          { c: '百分之', p: 'bǎi fēn zhī', en: 'percent', e: '%' },
        ],
      },
    ],
  },

  // ──────────────────────────── Body parts ────────────────────────────
  {
    slug: 'body',
    han: '身体',
    pinyin: 'shēntǐ',
    en: 'Body parts',
    icon: '人',
    accent: '#9b2226',
    intro: 'Core vocabulary for the human body — head, face, limbs, and the internal organs you may need at the doctor.',
    sections: [
      {
        title: 'Head & face · 头部',
        words: [
          { c: '头',     p: 'tóu',          en: 'head',              e: '🗣️' },
          { c: '头发',   p: 'tóufa',        en: 'hair',              e: '💇' },
          { c: '脸',     p: 'liǎn',         en: 'face',              e: '😊' },
          { c: '眼睛',   p: 'yǎnjing',      en: 'eye(s)',            e: '👁️' },
          { c: '眉毛',   p: 'méimao',       en: 'eyebrow',           e: '🤨' },
          { c: '睫毛',   p: 'jiémáo',       en: 'eyelashes',         e: '👁️‍🗨️' },
          { c: '鼻子',   p: 'bízi',         en: 'nose',              e: '👃' },
          { c: '嘴',     p: 'zuǐ',          en: 'mouth',             e: '👄' },
          { c: '嘴唇',   p: 'zuǐchún',      en: 'lips',              e: '💋' },
          { c: '牙齿',   p: 'yáchǐ',        en: 'tooth / teeth',     e: '🦷' },
          { c: '舌头',   p: 'shétou',       en: 'tongue',            e: '👅' },
          { c: '耳朵',   p: 'ěrduo',        en: 'ear(s)',            e: '👂' },
          { c: '下巴',   p: 'xiàba',        en: 'chin',              e: '🧔' },
          { c: '脖子',   p: 'bózi',         en: 'neck',              e: '🧣' },
        ],
      },
      {
        title: 'Upper body · 上身',
        words: [
          { c: '肩膀',   p: 'jiānbǎng',     en: 'shoulder',          e: '🤷' },
          { c: '胳膊',   p: 'gēbo',         en: 'arm',               e: '💪' },
          { c: '手',     p: 'shǒu',         en: 'hand',              e: '✋' },
          { c: '手指',   p: 'shǒuzhǐ',      en: 'finger',            e: '👆' },
          { c: '手腕',   p: 'shǒuwàn',      en: 'wrist',             e: '⌚' },
          { c: '胸',     p: 'xiōng',        en: 'chest',             e: '🫁' },
          { c: '背',     p: 'bèi',          en: 'back',              e: '🔙' },
          { c: '肚子',   p: 'dùzi',         en: 'belly · stomach',   e: '🫃' },
          { c: '腰',     p: 'yāo',          en: 'waist · lower back',e: '🩱' },
        ],
      },
      {
        title: 'Lower body · 下身',
        words: [
          { c: '腿',     p: 'tuǐ',          en: 'leg',               e: '🦵' },
          { c: '膝盖',   p: 'xīgài',        en: 'knee',              e: '🧎' },
          { c: '脚',     p: 'jiǎo',         en: 'foot',              e: '🦶' },
          { c: '脚趾',   p: 'jiǎozhǐ',      en: 'toe',               e: '👣' },
          { c: '脚踝',   p: 'jiǎohuái',     en: 'ankle',             e: '🦵' },
        ],
      },
      {
        title: 'Internal · 内部',
        words: [
          { c: '心脏',   p: 'xīnzàng',      en: 'heart',             e: '❤️' },
          { c: '肺',     p: 'fèi',          en: 'lung',              e: '🫁' },
          { c: '胃',     p: 'wèi',          en: 'stomach (organ)',   e: '🫄' },
          { c: '肝',     p: 'gān',          en: 'liver',             e: '🩸' },
          { c: '骨头',   p: 'gǔtou',        en: 'bone',              e: '🦴' },
          { c: '皮肤',   p: 'pífū',         en: 'skin',              e: '🧴' },
          { c: '血',     p: 'xiě / xuè',    en: 'blood',             e: '🩸' },
        ],
      },
    ],
  },

  // ──────────────────────────── Directions ────────────────────────────
  {
    slug: 'directions',
    han: '方向',
    pinyin: 'fāngxiàng',
    en: 'Directions & position',
    icon: '向',
    accent: '#0d9488',
    intro: 'Cardinal directions, relative position words, and the verbs you need to give and follow directions in Mandarin.',
    sections: [
      {
        title: 'Cardinal directions · 方位',
        words: [
          { c: '东',     p: 'dōng',         en: 'east',              e: '➡️' },
          { c: '南',     p: 'nán',          en: 'south',             e: '⬇️' },
          { c: '西',     p: 'xī',           en: 'west',              e: '⬅️' },
          { c: '北',     p: 'běi',          en: 'north',             e: '⬆️' },
          { c: '东北',   p: 'dōngběi',      en: 'northeast',         e: '↗️' },
          { c: '东南',   p: 'dōngnán',      en: 'southeast',         e: '↘️' },
          { c: '西北',   p: 'xīběi',        en: 'northwest',         e: '↖️' },
          { c: '西南',   p: 'xīnán',        en: 'southwest',         e: '↙️' },
        ],
      },
      {
        title: 'Relative position · 相对位置',
        words: [
          { c: '上',     p: 'shàng',        en: 'above · on',        e: '🔼' },
          { c: '下',     p: 'xià',          en: 'below · under',     e: '🔽' },
          { c: '左',     p: 'zuǒ',          en: 'left',              e: '◀️' },
          { c: '右',     p: 'yòu',          en: 'right',             e: '▶️' },
          { c: '前',     p: 'qián',         en: 'front · ahead',     e: '🏃' },
          { c: '后',     p: 'hòu',          en: 'behind · back',     e: '🔙' },
          { c: '里',     p: 'lǐ',           en: 'inside',            e: '📥' },
          { c: '外',     p: 'wài',          en: 'outside',           e: '📤' },
          { c: '中间',   p: 'zhōngjiān',    en: 'middle · between',  e: '🎯' },
          { c: '旁边',   p: 'pángbiān',     en: 'beside · next to',  e: '↔️' },
          { c: '对面',   p: 'duìmiàn',      en: 'opposite · across', e: '🔄' },
          { c: '附近',   p: 'fùjìn',        en: 'nearby · vicinity', e: '📍' },
        ],
      },
      {
        title: 'Asking & giving directions · 问路',
        words: [
          { c: '走',         p: 'zǒu',           en: 'to walk · go',      e: '🚶' },
          { c: '拐',         p: 'guǎi',          en: 'to turn',           e: '↪️' },
          { c: '一直走',     p: 'yìzhí zǒu',     en: 'go straight',       e: '⬆️' },
          { c: '往左拐',     p: 'wǎng zuǒ guǎi', en: 'turn left',         e: '↩️' },
          { c: '往右拐',     p: 'wǎng yòu guǎi', en: 'turn right',        e: '↪️' },
          { c: '红绿灯',     p: 'hónglǜdēng',    en: 'traffic light',     e: '🚦' },
          { c: '十字路口',   p: 'shízì lùkǒu',   en: 'intersection',      e: '🚏' },
          { c: '路口',       p: 'lùkǒu',         en: 'street corner',     e: '🛣️' },
          { c: '远',         p: 'yuǎn',          en: 'far',               e: '🔭' },
          { c: '近',         p: 'jìn',           en: 'near',              e: '🔍' },
          { c: '到',         p: 'dào',           en: 'to arrive · reach', e: '🏁' },
        ],
      },
    ],
  },

  // ──────────────────────────── Bedroom ────────────────────────────
  {
    slug: 'bedroom',
    han: '卧室',
    pinyin: 'wòshì',
    en: 'In the bedroom',
    icon: '卧',
    accent: '#7c3aed',
    intro: 'Furniture, bedding, and the everyday things you find — and do — in a Chinese bedroom.',
    sections: [
      {
        title: 'Furniture · 家具',
        words: [
          { c: '床',     p: 'chuáng',       en: 'bed',                e: '🛏️' },
          { c: '床头柜', p: 'chuángtóuguì', en: 'nightstand',         e: '🗄️' },
          { c: '衣柜',   p: 'yīguì',        en: 'wardrobe · closet',  e: '🚪' },
          { c: '书桌',   p: 'shūzhuō',      en: 'desk',               e: '🪑' },
          { c: '椅子',   p: 'yǐzi',         en: 'chair',              e: '🪑' },
          { c: '梳妆台', p: 'shūzhuāngtái', en: 'dressing table',     e: '💄' },
          { c: '镜子',   p: 'jìngzi',       en: 'mirror',             e: '🪞' },
          { c: '地毯',   p: 'dìtǎn',        en: 'carpet · rug',       e: '🟫' },
        ],
      },
      {
        title: 'Bedding · 床上用品',
        words: [
          { c: '枕头',   p: 'zhěntou',      en: 'pillow',             e: '🛌' },
          { c: '被子',   p: 'bèizi',        en: 'quilt · duvet',      e: '🛏️' },
          { c: '毯子',   p: 'tǎnzi',        en: 'blanket',            e: '🧣' },
          { c: '床单',   p: 'chuángdān',    en: 'bed sheet',          e: '🛌' },
          { c: '枕套',   p: 'zhěntào',      en: 'pillowcase',         e: '🛏️' },
        ],
      },
      {
        title: 'Lights & electronics · 电器',
        words: [
          { c: '灯',     p: 'dēng',         en: 'light · lamp',       e: '💡' },
          { c: '台灯',   p: 'táidēng',      en: 'desk lamp',          e: '🪔' },
          { c: '空调',   p: 'kōngtiáo',     en: 'air conditioner',    e: '❄️' },
          { c: '风扇',   p: 'fēngshàn',     en: 'fan',                e: '🌀' },
          { c: '闹钟',   p: 'nàozhōng',     en: 'alarm clock',        e: '⏰' },
          { c: '插座',   p: 'chāzuò',       en: 'power outlet',       e: '🔌' },
        ],
      },
      {
        title: 'Actions · 动作',
        words: [
          { c: '睡觉',   p: 'shuìjiào',     en: 'to sleep',              e: '😴' },
          { c: '起床',   p: 'qǐchuáng',     en: 'to get up',             e: '🛎️' },
          { c: '做梦',   p: 'zuòmèng',      en: 'to dream',              e: '💭' },
          { c: '盖被子', p: 'gài bèizi',    en: 'to cover with a quilt', e: '🛏️' },
          { c: '关灯',   p: 'guān dēng',    en: 'to turn off the light', e: '🌑' },
          { c: '开灯',   p: 'kāi dēng',     en: 'to turn on the light',  e: '💡' },
          { c: '休息',   p: 'xiūxi',        en: 'to rest',               e: '🧘' },
        ],
      },
    ],
  },

  // ──────────────────────────── Kitchen ────────────────────────────
  {
    slug: 'kitchen',
    han: '厨房',
    pinyin: 'chúfáng',
    en: 'In the kitchen',
    icon: '厨',
    accent: '#c2410c',
    intro: 'Cookware, appliances, ingredients and the verbs of cooking — everything you need to follow a 中国菜 recipe.',
    sections: [
      {
        title: 'Cookware · 厨具',
        words: [
          { c: '锅',     p: 'guō',          en: 'pot · wok',          e: '🍳' },
          { c: '平底锅', p: 'píngdǐguō',    en: 'frying pan',         e: '🍳' },
          { c: '碗',     p: 'wǎn',          en: 'bowl',               e: '🥣' },
          { c: '盘子',   p: 'pánzi',        en: 'plate',              e: '🍽️' },
          { c: '杯子',   p: 'bēizi',        en: 'cup · glass',        e: '🥛' },
          { c: '筷子',   p: 'kuàizi',       en: 'chopsticks',         e: '🥢' },
          { c: '勺子',   p: 'sháozi',       en: 'spoon',              e: '🥄' },
          { c: '叉子',   p: 'chāzi',        en: 'fork',               e: '🍴' },
          { c: '刀',     p: 'dāo',          en: 'knife',              e: '🔪' },
          { c: '砧板',   p: 'zhēnbǎn',      en: 'cutting board',      e: '🪵' },
        ],
      },
      {
        title: 'Appliances · 电器',
        words: [
          { c: '冰箱',   p: 'bīngxiāng',    en: 'refrigerator',       e: '🧊' },
          { c: '微波炉', p: 'wēibōlú',      en: 'microwave',          e: '📡' },
          { c: '烤箱',   p: 'kǎoxiāng',     en: 'oven',               e: '🔥' },
          { c: '电饭煲', p: 'diànfànbāo',   en: 'rice cooker',        e: '🍚' },
          { c: '炉子',   p: 'lúzi',         en: 'stove · cooker',     e: '🔥' },
          { c: '水槽',   p: 'shuǐcáo',      en: 'sink',               e: '🚰' },
          { c: '水龙头', p: 'shuǐlóngtou',  en: 'faucet · tap',       e: '🚿' },
        ],
      },
      {
        title: 'Seasonings & basics · 调料',
        words: [
          { c: '盐',     p: 'yán',          en: 'salt',               e: '🧂' },
          { c: '糖',     p: 'táng',         en: 'sugar',              e: '🍬' },
          { c: '醋',     p: 'cù',           en: 'vinegar',            e: '🧪' },
          { c: '酱油',   p: 'jiàngyóu',     en: 'soy sauce',          e: '🥢' },
          { c: '油',     p: 'yóu',          en: 'oil',                e: '🫒' },
          { c: '辣椒',   p: 'làjiāo',       en: 'chili pepper',       e: '🌶️' },
          { c: '大蒜',   p: 'dàsuàn',       en: 'garlic',             e: '🧄' },
          { c: '姜',     p: 'jiāng',        en: 'ginger',             e: '🫚' },
        ],
      },
      {
        title: 'Cooking verbs · 烹饪',
        words: [
          { c: '做饭',   p: 'zuòfàn',       en: 'to cook (a meal)',   e: '👨‍🍳' },
          { c: '炒',     p: 'chǎo',         en: 'to stir-fry',        e: '🥘' },
          { c: '煮',     p: 'zhǔ',          en: 'to boil',            e: '♨️' },
          { c: '蒸',     p: 'zhēng',        en: 'to steam',           e: '💨' },
          { c: '炸',     p: 'zhá',          en: 'to deep-fry',        e: '🍤' },
          { c: '烤',     p: 'kǎo',          en: 'to bake · roast',    e: '🍞' },
          { c: '切',     p: 'qiē',          en: 'to cut · slice',     e: '🔪' },
          { c: '洗',     p: 'xǐ',           en: 'to wash',            e: '🧼' },
          { c: '尝',     p: 'cháng',        en: 'to taste',           e: '👅' },
        ],
      },
    ],
  },

  // ──────────────────────────── Adjectives & opposites ────────────────────────────
  {
    slug: 'opposites',
    han: '反义词',
    pinyin: 'fǎnyìcí',
    en: 'Adjectives & opposites',
    icon: '⇄',
    accent: '#8b6914',
    intro: 'Common adjectives presented in opposing pairs — the fastest way to double your descriptive vocabulary.',
    pairs: [
      { a: { c: '大',   p: 'dà',     en: 'big',          e: '🐘' }, b: { c: '小',   p: 'xiǎo',    en: 'small',           e: '🐭' } },
      { a: { c: '长',   p: 'cháng',  en: 'long',         e: '➖' }, b: { c: '短',   p: 'duǎn',    en: 'short',           e: '·'  } },
      { a: { c: '高',   p: 'gāo',    en: 'tall · high',  e: '🦒' }, b: { c: '矮',   p: 'ǎi',      en: 'short (height)',  e: '🐢' } },
      { a: { c: '高',   p: 'gāo',    en: 'high',         e: '⛰️' }, b: { c: '低',   p: 'dī',      en: 'low',             e: '🕳️' } },
      { a: { c: '多',   p: 'duō',    en: 'many',         e: '🌟' }, b: { c: '少',   p: 'shǎo',    en: 'few',             e: '⭐' } },
      { a: { c: '快',   p: 'kuài',   en: 'fast',         e: '🏃' }, b: { c: '慢',   p: 'màn',     en: 'slow',            e: '🐌' } },
      { a: { c: '热',   p: 'rè',     en: 'hot',          e: '🔥' }, b: { c: '冷',   p: 'lěng',    en: 'cold',            e: '❄️' } },
      { a: { c: '新',   p: 'xīn',    en: 'new',          e: '✨' }, b: { c: '旧',   p: 'jiù',     en: 'old (thing)',     e: '📜' } },
      { a: { c: '老',   p: 'lǎo',    en: 'old (person)', e: '👴' }, b: { c: '年轻', p: 'niánqīng', en: 'young',           e: '🧒' } },
      { a: { c: '好',   p: 'hǎo',    en: 'good',         e: '👍' }, b: { c: '坏',   p: 'huài',    en: 'bad',             e: '👎' } },
      { a: { c: '对',   p: 'duì',    en: 'right',        e: '✅' }, b: { c: '错',   p: 'cuò',     en: 'wrong',           e: '❌' } },
      { a: { c: '难',   p: 'nán',    en: 'difficult',    e: '🧩' }, b: { c: '容易', p: 'róngyì',  en: 'easy',            e: '😌' } },
      { a: { c: '远',   p: 'yuǎn',   en: 'far',          e: '🔭' }, b: { c: '近',   p: 'jìn',     en: 'near',            e: '🔍' } },
      { a: { c: '贵',   p: 'guì',    en: 'expensive',    e: '💎' }, b: { c: '便宜', p: 'piányi',  en: 'cheap',           e: '🪙' } },
      { a: { c: '重',   p: 'zhòng',  en: 'heavy',        e: '🏋️' }, b: { c: '轻',   p: 'qīng',    en: 'light (weight)',  e: '🪶' } },
      { a: { c: '厚',   p: 'hòu',    en: 'thick',        e: '📚' }, b: { c: '薄',   p: 'báo',     en: 'thin',            e: '📄' } },
      { a: { c: '宽',   p: 'kuān',   en: 'wide',         e: '↔️' }, b: { c: '窄',   p: 'zhǎi',    en: 'narrow',          e: '⏐'  } },
      { a: { c: '深',   p: 'shēn',   en: 'deep',         e: '🌊' }, b: { c: '浅',   p: 'qiǎn',    en: 'shallow',         e: '💧' } },
      { a: { c: '亮',   p: 'liàng',  en: 'bright',       e: '☀️' }, b: { c: '暗',   p: 'àn',      en: 'dark',            e: '🌑' } },
      { a: { c: '干净', p: 'gānjìng', en: 'clean',       e: '🧼' }, b: { c: '脏',   p: 'zāng',    en: 'dirty',           e: '🧹' } },
      { a: { c: '安静', p: 'ānjìng',  en: 'quiet',       e: '🤫' }, b: { c: '吵',   p: 'chǎo',    en: 'noisy',           e: '📣' } },
      { a: { c: '忙',   p: 'máng',   en: 'busy',         e: '🏃' }, b: { c: '闲',   p: 'xián',    en: 'free · idle',     e: '🛋️' } },
      { a: { c: '开',   p: 'kāi',    en: 'open',         e: '🔓' }, b: { c: '关',   p: 'guān',    en: 'close · shut',    e: '🔒' } },
      { a: { c: '来',   p: 'lái',    en: 'come',         e: '👋' }, b: { c: '去',   p: 'qù',      en: 'go',              e: '🚶' } },
      { a: { c: '上',   p: 'shàng',  en: 'up',           e: '⬆️' }, b: { c: '下',   p: 'xià',     en: 'down',            e: '⬇️' } },
      { a: { c: '买',   p: 'mǎi',    en: 'buy',          e: '🛒' }, b: { c: '卖',   p: 'mài',     en: 'sell',            e: '💰' } },
      { a: { c: '问',   p: 'wèn',    en: 'ask',          e: '❓' }, b: { c: '答',   p: 'dá',      en: 'answer',          e: '💬' } },
    ],
  },
]

export const topicBySlug = (slug) => TOPICS.find(t => t.slug === slug)
