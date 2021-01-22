const readlineSync = require('readline-sync')
const chalk = require('chalk')

const questions = [
  {
    question: 'Which actor played the Tenth Doctor ?',
    options: ['David Tennant', 'Christopher Eccleston', 'Matt Smith', 'William Shatner'],
    correctAnswer: 0
  },
  {
    question: 'Who is the Doctor\'s companion in the third season ?',
    options: ['Rose Tyler', 'Donna Noble', 'Marta Jones', 'Jack Harkness'],
    correctAnswer: 2
  },
  {
    question: 'Who is the Face of Boe ?',
    options: ['Captain Jack Harkness', 'Rose Tyler', 'Vashta Nerada', 'The Ood'],
    correctAnswer: 0 
  },
  {
    question: 'Who is the Doctors greatest enemy ?',
    options: ['The Cybermen', 'The Daleks', 'The Sontarans', 'The Slitheen'],
    correctAnswer: 1
  },
  {
    question: 'In what season did the Doctor regenerate as a woman for the first time ?',
    options: ['Season 10', 'Season 13', 'Seeason 7', 'Season 11'],
    correctAnswer: 3
  },
  {
    question: 'What is the Doctor\'s handy weapon called ?',
    options: ['Laser Screwdriver', 'Sonic Screwdriver', 'Sonic Wrench', 'Laser Wrench'],
    correctAnswer: 1
  }
]

let highScores = {
  'Soham': 5,
  'Newton': 3,
  'Galileo': 1 
}

let score = ''

const startQuiz = () => {
  questions.forEach(({ question, options, correctAnswer }, index) => {
    if (index !== 0) console.log('\n')
    let answer = askQuestion(question, index + 1, options)
    let isCorrect = checkAnswer(answer, correctAnswer)
    updateScore(isCorrect)
  })
  endQuiz()
}

const askQuestion = (question, questionNumber, options) => {
  console.log(chalk.cyan(`Q ${questionNumber}. ${question}\n`))
  options.forEach((option, index) => {
    console.log(`${index + 1}: ${option}\n`)
  })
  let answer = readlineSync.question(chalk.yellow('Ans: '))
  return parseInt(answer) - 1
}

const checkAnswer = (answer, correctAnswer) => answer == correctAnswer ? true : false

const updateScore = (isCorrect) => {
if (isCorrect) {
    score++
    console.log(chalk.green('Correct!'), `Score: ${score}`)
  }
  else {
    console.log(chalk.red('Oops. Wrong Answer!'), `Score: ${score}`)
  }
}

const endQuiz = () => {
  console.log(chalk.magenta('Would you like to play again ?'))
  let replayQuiz = readlineSync.question('(Y / N): ')
  let playAgain = replayQuiz.toLowerCase() === 'y' ? true : false
  if (playAgain) {
    console.clear()
    startQuiz()
    return
  }
  console.log(`The Quiz has ended. Thanks for playing. You scored ${score} points.`)
  let beatenHighScores = Object.entries(highScores).filter((cur) => score >= cur[1])
  let notBeatenHighScores = Object.entries(highScores).filter(cur => score < cur[1])
  let leaderboard = [...notBeatenHighScores, ['You', score], ...beatenHighScores]
  console.log('Check out your position on the high scores leaderboard.\n');
  leaderboard.forEach((cur, index) => {
    if (cur[0] === 'You') {
      console.log(chalk.bgYellow(` You: ${score} `))
      return
    }
    console.log(`${cur[0]}: ${cur[1]}`)
  })
}

startQuiz()