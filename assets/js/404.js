import { createApp } from 'https://unpkg.com/vue@3.3.4/dist/vue.esm-browser.js'

const app = createApp({
  template: `
    <div class="container">
      <h1>Чувак, ты думал что-то здесь будет?</h1>

      <p>О, нет. От тебя воняет говном, даже отсюда чувствую.</p>
      <p>Закрывай, закрывай сайт, иди нахуй.</p>
    </div>
  `,
})
  
app.mount("#app")