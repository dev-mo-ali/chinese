<script setup>
defineProps({
  note: { type: Object, required: true },
})
</script>

<template>
  <div class="lesson-note-content">
    <section
      v-for="(section, sectionIndex) in note.sections"
      :key="`${sectionIndex}-${section.title}`"
      class="note-section"
    >
      <div class="section-number" aria-hidden="true">
        {{ String(sectionIndex + 1).padStart(2, '0') }}
      </div>
      <div class="min-w-0">
        <h2>{{ section.title }}</h2>
        <p v-if="section.intro" class="section-intro">{{ section.intro }}</p>

        <template v-for="(block, blockIndex) in section.blocks" :key="`${blockIndex}-${block.type}`">
          <p v-if="block.type === 'paragraph'" class="note-paragraph">{{ block.text }}</p>

          <h3 v-else-if="block.type === 'heading'">{{ block.text }}</h3>

          <ol v-else-if="block.type === 'ordered-list'" class="note-list numbered">
            <li v-for="(item, itemIndex) in block.items" :key="itemIndex">
              <div>
                <strong>{{ item.lead }}</strong>
                <span v-if="item.text"> — {{ item.text }}</span>
              </div>
              <p v-if="item.examples" class="han examples">{{ item.examples }}</p>
            </li>
          </ol>

          <ul v-else-if="block.type === 'bullet-list'" class="note-list bulleted">
            <li v-for="(item, itemIndex) in block.items" :key="itemIndex">
              <strong v-if="item.lead">{{ item.lead }}:</strong>
              {{ item.text }}
            </li>
          </ul>

          <dl v-else-if="block.type === 'facts'" class="fact-grid">
            <div v-for="(item, itemIndex) in block.items" :key="itemIndex">
              <dt>{{ item.label }}</dt>
              <dd>
                <strong :class="{ han: item.value?.includes?.('青') }">{{ item.value }}</strong>
                <span v-if="item.detail">{{ item.detail }}</span>
              </dd>
            </div>
          </dl>

          <div v-else-if="block.type === 'table'" class="note-table-wrap">
            <p v-if="block.caption" class="table-caption">{{ block.caption }}</p>
            <div class="overflow-x-auto">
              <table>
                <thead>
                  <tr>
                    <th v-for="header in block.headers" :key="header" scope="col">{{ header }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(row, rowIndex) in block.rows" :key="rowIndex">
                    <td
                      v-for="(cell, cellIndex) in row"
                      :key="cellIndex"
                      :class="{ 'han character-cell': cellIndex === block.characterColumn }"
                    >
                      {{ cell }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div v-else-if="block.type === 'examples'" class="example-grid">
            <article v-for="(example, exampleIndex) in block.items" :key="exampleIndex">
              <strong class="han">{{ example.c }}</strong>
              <span>{{ example.p }}</span>
              <p>{{ example.en }}</p>
            </article>
          </div>

          <blockquote v-else-if="block.type === 'quote'" class="note-quote">
            <p>{{ block.text }}</p>
            <cite v-if="block.cite">— {{ block.cite }}</cite>
          </blockquote>

          <aside v-else-if="block.type === 'callout'" class="note-callout">
            <span>{{ block.label || 'Note' }}</span>
            <p>{{ block.text }}</p>
          </aside>
        </template>
      </div>
    </section>
  </div>
</template>

<style scoped>
.lesson-note-content {
  display: grid;
  gap: 1.25rem;
}
.note-section {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 1rem;
  padding: 1.25rem;
  border: 1px solid rgba(139, 105, 20, .22);
  border-radius: 1rem;
  background: rgba(255, 255, 255, .58);
}
.section-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: .65rem;
  background: #1a1209;
  color: #f5e9c8;
  font: 700 .7rem/1 Inter, sans-serif;
  letter-spacing: .08em;
}
h2 {
  color: #1a1209;
  font-size: clamp(1.2rem, 3vw, 1.55rem);
  font-weight: 700;
  line-height: 1.25;
}
h3 {
  margin-top: 1.15rem;
  color: #7c5a1e;
  font-size: .78rem;
  font-weight: 700;
  letter-spacing: .12em;
  text-transform: uppercase;
}
.section-intro,
.note-paragraph {
  margin-top: .55rem;
  color: rgba(42, 31, 18, .8);
  font-size: .9rem;
  line-height: 1.75;
}
.note-list {
  display: grid;
  gap: .7rem;
  margin-top: 1rem;
  color: rgba(42, 31, 18, .88);
  font-size: .875rem;
  line-height: 1.6;
}
.numbered {
  list-style: decimal;
  padding-left: 1.4rem;
}
.bulleted {
  list-style: disc;
  padding-left: 1.2rem;
}
.note-list li::marker {
  color: #9b2226;
  font-weight: 700;
}
.examples {
  margin-top: .2rem;
  color: #7c5a1e;
  font-size: .82rem;
}
.fact-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: .65rem;
  margin-top: 1rem;
}
.fact-grid > div {
  padding: .8rem;
  border: 1px solid rgba(139, 105, 20, .18);
  border-radius: .75rem;
  background: #fffdf7;
}
.fact-grid > div:only-child {
  grid-column: 1 / -1;
}
.fact-grid dt {
  color: rgba(42, 31, 18, .55);
  font-size: .62rem;
  font-weight: 700;
  letter-spacing: .12em;
  text-transform: uppercase;
}
.fact-grid dd {
  display: grid;
  gap: .15rem;
  margin-top: .35rem;
  color: #1a1209;
  font-size: .84rem;
}
.fact-grid dd span {
  color: rgba(42, 31, 18, .62);
  font-size: .72rem;
}
.note-table-wrap {
  margin-top: 1rem;
  overflow: hidden;
  border: 1px solid rgba(139, 105, 20, .22);
  border-radius: .85rem;
  background: white;
}
.table-caption {
  padding: .75rem 1rem;
  border-bottom: 1px solid rgba(139, 105, 20, .16);
  color: #7c5a1e;
  font-size: .72rem;
  font-weight: 700;
}
table {
  width: 100%;
  min-width: 680px;
  border-collapse: collapse;
  text-align: left;
  font-size: .78rem;
}
th {
  padding: .7rem .8rem;
  background: rgba(200, 168, 75, .13);
  color: #5a3a06;
  font-size: .65rem;
  letter-spacing: .06em;
  text-transform: uppercase;
}
td {
  padding: .72rem .8rem;
  border-top: 1px solid rgba(139, 105, 20, .12);
  color: rgba(42, 31, 18, .8);
  vertical-align: top;
}
.character-cell {
  color: #9b2226;
  font-size: 1.25rem;
  font-weight: 700;
}
.example-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: .75rem;
  margin-top: 1rem;
}
.example-grid article {
  padding: .8rem;
  border-left: 3px solid #c8a84b;
  background: #fffdf7;
}
.example-grid strong,
.example-grid span,
.example-grid p {
  display: block;
}
.example-grid strong,
.example-grid span {
  white-space: pre-line;
}
.example-grid p,
.example-grid span {
  color: rgba(42, 31, 18, .65);
  font-size: .75rem;
}
.note-quote,
.note-callout {
  margin-top: 1rem;
  padding: 1rem 1.1rem;
  border-radius: .8rem;
}
.note-quote {
  border-left: 4px solid #8b6914;
  background: rgba(200, 168, 75, .1);
  color: rgba(42, 31, 18, .82);
  font-family: Georgia, serif;
}
.note-quote cite {
  display: block;
  margin-top: .45rem;
  color: #7c5a1e;
  font-size: .75rem;
}
.note-callout {
  border: 1px solid rgba(155, 34, 38, .22);
  background: linear-gradient(135deg, rgba(254, 242, 242, .9), rgba(255, 247, 237, .9));
}
.note-callout > span {
  color: #9b2226;
  font-size: .65rem;
  font-weight: 800;
  letter-spacing: .14em;
  text-transform: uppercase;
}
.note-callout p {
  margin-top: .35rem;
  color: rgba(42, 31, 18, .84);
  font-size: .86rem;
  line-height: 1.65;
}
@media (max-width: 640px) {
  .note-section {
    grid-template-columns: 1fr;
    gap: .75rem;
    padding: 1rem;
  }
  .fact-grid,
  .example-grid {
    grid-template-columns: 1fr;
  }
}
</style>
