export function interact(questions) {
  process.stdin.setEncoding('utf8');

  return new Promise((resolve) => {
    const answers = [];
    let i = 0;
    let { text, value } = questions[i++];
    process.stdout.write(`${text}(${value}):`);

    process.stdin.on('readable', () => {
      const chunk = process.stdin.read().slice(0, -1);
      answers.push(chunk || value);
      const nextQuestion = questions[i++];

      if (nextQuestion) {
        process.stdin.read();
        text = nextQuestion.text;
        value = nextQuestion.value;
        process.stdout.write(`${text}(${value}):`);
      } else {
        resolve(answers);
      }
    })
  })
}