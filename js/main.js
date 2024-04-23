const arr = Array(9).fill(0);
let step = 1 
console.log(arr)

arr.forEach((item, index) => {
  const div = document.createElement('div');
  const ttt = document.getElementById('ttt');

  div.setAttribute('data-n', index);
  ttt.append(div);
});

function click() {
  const n = +event.target.getAttribute('data-n');
  console.log(n)

  if(arr[n] !== 0) return;

  arr[n] = step;
  draw();

  checkWinner(step);

  step = (step === 1) ? 2 : 1
}

const tttDiv =  document.querySelectorAll('.ttt > div')
function draw() {
  arr.forEach((item, index) => {
    switch(item) {
      case 1:
        tttDiv[index].textContent = 'X';
        break
      case 2:
        tttDiv[index].textContent = '0';
        break
    }
  });
}

function checkWinner(step) {
  const winnerArr = ['012', '345', '678', '036', '147', '258', '048', '246'];

  let indexStep = [];
  arr.forEach((item, index) => {
    if(item === step) indexStep.push(index)
  })

  for (let i = 0; i < winnerArr.length; i++) {
    const winPattern = winnerArr[i];

    let count = 0; 
    winPattern.split('').forEach(item => {
      if(indexStep.includes(+item)) count++;
    });
    if(count === 3) {
      showWin(step);
      return;
    }

    if(!arr.includes(0)) showDraw();
  }
}

function showWin(step) {
  ttt.removeEventListener('click', click);
  ttt.style.opacity = .5;
  document.querySelector('.out-txt').textContent ='Winner ' + (step === 1 ? "X" : '0');
  document.querySelector('.out').style.visibility = 'visible';
  
}

function showDraw() {
  ttt.removeEventListener('click', click);
  ttt.style.opacity = .5;
  document.querySelector('.out-txt').textContent = 'draw';
  document.querySelector('.out').style.visibility = 'visible';
}

ttt.addEventListener('click', click);

document.querySelector('.out-btn').addEventListener('click', () => {
  location.reload();
});
