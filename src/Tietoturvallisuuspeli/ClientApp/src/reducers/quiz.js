const initialState = ({
  ready: false,
  questions: [],
  answers: [],
  canRemoveTwoChoices: true,
  canSkipQuestion: true,
  twoChoicesRemoved: false,
  skippedQuestion: false,
  currentQuestionIndex: 0,
  score: 0
});

const quiz = (state = initialState, action) => {
  const currentQuestion = state.questions[state.currentQuestionIndex];
  
  switch (action.type) {
    case 'QUIZ_FETCH_QUESTIONS':
      return {
        ...state,
        ready: false
      };
    case 'QUIZ_FETCH_QUESTIONS_SUCCESS':
      return {
        ...state,
        ready: true,
        questions: action.payload.data
      };
    case 'QUIZ_NEXT_QUESTION':
      return {
        ...state,
        answers: [
          ...state.answers,
          {
            question: currentQuestion.content,
            rightChoice: currentQuestion.answers.filter(a => a.isCorrect === true)[0].content,
            answeredCorrectly: action.answeredCorrectly,
            twoChoicesRemoved: state.twoChoicesRemoved,
            skippedQuestion: false
          }
        ],
        score: state.score + (action.answeredCorrectly ? 1 : 0),
        currentQuestionIndex: state.currentQuestionIndex + 1,
        twoChoicesRemoved: false
      };
    case 'QUIZ_SKIP_QUESTION':
      return {
        ...state,
        answers: [
          ...state.answers,
          {
            question: currentQuestion.content,
            rightChoice: currentQuestion.answers.filter(a => a.isCorrect === true)[0].content,
            answeredCorrectly: true,
            twoChoicesRemoved: state.twoChoicesRemoved,
            skippedQuestion: true
          }
        ],
        score: state.score + 1,
        currentQuestionIndex: state.currentQuestionIndex + 1,
        twoChoicesRemoved: false,
        canSkipQuestion: false
      }
    case 'QUIZ_REMOVE_TWO_CHOICES':
      return {
        ...state,
        twoChoicesRemoved: true,
        canRemoveTwoChoices: false
      }
    case 'QUIZ_RESET':
      return {
        ...initialState
      }
    default: 
      return state;
  }
}

export default quiz;
