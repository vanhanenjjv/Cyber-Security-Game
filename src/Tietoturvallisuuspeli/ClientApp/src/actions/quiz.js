export const nextQuestion = isCorrect => ({
  type: 'QUIZ_NEXT_QUESTION',
  answeredCorrectly: isCorrect
});

export const fetchQuestions = amount => ({
  type: 'QUIZ_FETCH_QUESTIONS',
  payload: {
    request: {
      // TODO: rename controller to 'quiz'
      url: `/question/fetch?amount=${amount}`
    }
  }
});

export const skipQuestion = () => ({
  type: 'QUIZ_SKIP_QUESTION'
});

export const reset = () => ({
  type: 'QUIZ_RESET'
});

export const removeTwoChoices = () => ({
  type: 'QUIZ_REMOVE_TWO_CHOICES'
});
