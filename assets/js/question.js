import { createApp } from 'https://unpkg.com/vue@latest/dist/vue.esm-browser.js'
import * as common from '/assets/js/common.js'

const Question = {
  props: {
    imgFile: String,
    questionText: String,
    containsImg: Boolean,
    answers: Array,
    atype: Number,
  },
  computed: {
    displayAnswers() {
      if (this.atype === 1 && this.answers.length > 0) {
        return [this.answers.find(answer => answer.is_correct)]
      }
      return this.answers
    },
    answerLabel() {
      return this.atype === 1 ? 'Ответ:' : 'Варианты ответов:'
    },
    questionTypeText() {
      return this.atype === 1 ? 'ввод' : (this.atype === 0 ? 'выбор' : '')
    }
  },
  template: `
  <div class="question-container">
    <div v-if="containsImg" class="question-image">
      <img :src="imgFile" alt="Question Image" class="image">
    </div>
    <div class="question-text">
      <p><strong>Вопрос:</strong> {{ questionText }}</p>
      <p><strong v-if="questionTypeText !== ''">Тип вопроса:</strong> {{ questionTypeText }}</p>
      <div class="answer-container">
        <p class="answer-label"><strong>{{ answerLabel }}</strong></p>
        <p>&nbsp;</p>
        <ul class="answer-list">
          <li v-for="(answer, index) in displayAnswers" :key="index" :class="{ 'correct-answer': answer.is_correct, 'incorrect-answer': !answer.is_correct }" class="answer" style="margin-bottom: 5px;">{{ answer.text }}</li>
        </ul>
      </div>
    </div>
  </div>
  `
};

const app = createApp({
  components: {
    Question,
  },
  data() {
    return {
      containsImg: false,
      atype: 0,
      imgFile: '',
      questionText: '',
      answers: [],
      loading: true
    };
  },
  created() {
    const urlParams = new URLSearchParams(window.location.search)
    const id = urlParams.get('id')
    const imgFile = common.getFileUrl(`imgs/${id}.png`)
    const questionData = common.getFileUrl(`questions/${id}.json`)

    fetch(questionData)
      .then(response => response.json())
      .then(data => {
        this.containsImg = data.contains_img
        this.atype = data.atype
        this.imgFile = imgFile
        this.questionText = data.text
        this.answers = data.answers
        this.loading = false
      })
      .catch(error => {
        console.error('Error fetching question data:', error)
        window.location.href = '/404.html'
    })
  },
  template: `
    <div v-if="loading" class="loading-message">Загрузка...</div>
    <div v-else>
      <Question :imgFile="imgFile" :questionText="questionText" :containsImg="containsImg" :answers="answers" :atype="atype"/>
    </div>
  `
});

app.mount('#app')
