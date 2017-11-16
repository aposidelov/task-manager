
//====== Todo генератор ==========================
//==============================================
const numTodos = 23; // количество тудушек
const minLengthTodos = 8;// минимальное количество слов
const maxLengthTodos = 20;// максимальное

//  ===============================
const letterArr = 'qwertyuiopasdfghjklzxcvbnm'.split('');
const randomInt = (from, to) => Math.floor(Math.random() * (to - from) + from);

const wordGenerator = (from= 1, to= 10, isTitle = false) => {
  let res = [];
  const wordLength = randomInt(from, to);
  for(let i= 0; i< wordLength; i++){
    let randomLetter = randomInt(0, 25);
    res.push(letterArr[randomLetter])
  }
  if(isTitle) res[0] = res[0].toUpperCase();
  return res.join('');    
};

const phraseGenerator = (from, to, withTitleLetter= true) => {
  let res = [];
  const phraseLength = randomInt(from, to);
  for(let i= 0; i< phraseLength; i++){
    let randomWord = wordGenerator();
    res.push(randomWord)
  }
  if(withTitleLetter) {
    let firstWordArr = [...res[0].split('')];
    firstWordArr[0] = firstWordArr[0].toUpperCase();
    res[0] = firstWordArr.join('');
  }
 
  return res.join(' '); 
};


const todoGenerator = (sample, num) => {
  let res = [];
  for(let i=0; i< num; i++){
    let todoObj = {};
    sample.forEach((item) => {
      const {name, func}= item;
      todoObj[name] = func();
    })
    res.push(todoObj)
  }
  return res
};

//=========== schema ================

const schema = [
  {
    name: 'id',
    func: () => Math.floor( Math.random() * 1e7 + Math.random() * 1000 )
  },
  {
    name: 'title',
    func: () => wordGenerator(4, 10, true)
  },
  {
    name: 'description',
    func: () => phraseGenerator(minLengthTodos, maxLengthTodos)
  },
  {
    name: 'created_at',
    func: () => {
      const date= new Date(Date.now() - randomInt(0, 1e9));
      const createdAt= `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
      return createdAt
    }
  }
];

export default todoGenerator(schema, numTodos);