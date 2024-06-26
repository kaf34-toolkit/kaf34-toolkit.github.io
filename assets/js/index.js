import { createApp } from 'https://unpkg.com/vue@latest/dist/vue.esm-browser.js'
import * as common from '/assets/js/common.js'

const app = createApp({
  data() {
    return {
      searchText: '',
      questions: [],
      filteredQuestions: [],
      loading: true
    }
  },
  created() {
    fetch(common.getFileUrl('preview.json'))
      .then(response => response.json())
      .then(data => {
        this.questions = data
        this.filteredQuestions = data
        this.loading = false
      })
      .catch(error => {
        console.error('Error fetching questions:', error)
        window.location.href = '/404.html'
      })
  },
  methods: {
    filterQuestions() {
      if (!this.searchText.trim()) {
        this.filteredQuestions = this.questions
        return;
      }
      this.filteredQuestions = this.questions.filter(question =>
        question.text.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
  },
  template: `
    <p v-if="loading">Загрузка...</p>
    <div v-else>
      <div class="filter-input">
        <input type="text" v-model="searchText" @input="filterQuestions" placeholder="Введите текст для поиска">
        <p>Вопросов найдено: {{ filteredQuestions.length }}</p>
      </div>
      <table>
        <thead>
          <tr>
            <th>Текст вопроса</th>
            <th>Тип вопроса</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="question in filteredQuestions" :key="question.idx">
            <td><a :href="'question.html?id=' + question.idx">{{ question.text }}</a></td>
            <td>{{ question.atype === 0 ? 'Выбор' : 'Ввод' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `
});

app.mount('#app')
