import { createApp } from 'https://unpkg.com/vue@latest/dist/vue.esm-browser.js'
import * as common from '/assets/js/common.js'

const app = createApp({
  data() {
    return {
      searchText: '',
      questions: [],
      filteredQuestions: []
    };
  },
  created() {
    fetch(common.getFileUrl('preview.json'))
      .then(response => response.json())
      .then(data => {
        this.questions = data;
        this.filteredQuestions = data;
      })
      .catch(error => {
        console.error('Error fetching questions:', error)
      });
  },
  methods: {
    filterQuestions() {
      if (!this.searchText.trim()) {
        this.filteredQuestions = this.questions;
        return;
      }
      this.filteredQuestions = this.questions.filter(question =>
        question.text.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
  },
  template: `
    <div>
      <input type="text" v-model="searchText" @input="filterQuestions" placeholder="Введите текст для поиска" class="filter-input">
      <table v-if="filteredQuestions.length">
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
      <p v-else>Тут ничего нет</p>
    </div>
  `
});

app.mount('#app')
