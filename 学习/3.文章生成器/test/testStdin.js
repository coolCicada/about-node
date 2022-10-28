import { interact } from "../lib/interact.js";

const questions = [
  {text: '请输入文章主题', value: 'title'},
  {text: '请输入最小字数', value: 6000},
  {text: '请输入最大字数', value: 10000},
];

(async() => {
  const res = await interact(questions);
  console.log(res);
})()
