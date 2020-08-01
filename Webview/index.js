'use strict';

let digits = [];

const 所有数字 = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];

const 所有时辰 = [
  '子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥', '亥',
]

const 所有时辰初点 = [23, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21]

function getAncientFormat(h, m) {
  const isEvent = (h & 1) === 0

  let 时
  let 刻 = (m / 15) | 0

  if (isEvent) {
    时 = 所有时辰[所有时辰初点.indexOf(h + 1) - 1]
    刻 += 4
  } else {
    时 = 所有时辰[所有时辰初点.indexOf(h)]
  }

  return `${时}时${所有数字[刻]}刻`
}

function getEpoch() {
  const d = new Date()
  const h = d.getHours()
  const m = d.getMinutes()

  return getAncientFormat(h, m)
}

function createDigit() {
  var digit = document.createElement('digit');
  digit.innerHTML = `
    <flap-top>          <n></n>   </flap-top>
    <flap-top-flip>     <n></n>   </flap-top-flip>
    <flap-bottom>       <n></n>   </flap-bottom>
    <flap-bottom-flip>  <n></n>   </flap-bottom-flip>
  `
  return digit;
}

function flipDigitTo(digit, currentVal, updatedVal) {
  var topFlapNum = digit.querySelector('flap-top > n'),
    topFlapFlip = digit.querySelector('flap-top-flip'),
    topFlapFlipNum = topFlapFlip.querySelector('n'),
    bottomFlapNum = digit.querySelector('flap-bottom > n'),
    bottomFlapFlip = digit.querySelector('flap-bottom-flip'),
    bottomFlapFlipNum = bottomFlapFlip.querySelector('n');

  topFlapNum.innerHTML = updatedVal;
  bottomFlapNum.innerHTML = currentVal;

  topFlapFlipNum.innerHTML = currentVal;
  topFlapFlip.style.display = 'block';

  setTimeout(function () {
    topFlapFlip.style.display = 'none';
  }, 300);

  setTimeout(function () {
    bottomFlapFlipNum.innerHTML = updatedVal;
    bottomFlapFlip.style.display = 'block';
  }, 300);

  setTimeout(function () {
    bottomFlapNum.innerHTML = updatedVal;
    bottomFlapFlip.style.display = 'none';
  }, 450);

  digit.setAttribute('current-val', updatedVal);
}

function updateClock() {
  var epoch = getEpoch(),
    staggerDelay,
    currentVal,
    updatedVal,
    i;
  for (i = 0; i < epoch.length; i += 1) {
    if (i === epoch.length - 1) {
      staggerDelay = 0;
    } else {
      staggerDelay = Math.random() * 400;
    }
    currentVal = digits[i].getAttribute('current-val');
    updatedVal = epoch[i];
    if (currentVal === '时' || currentVal === '刻') {
      continue;
    }
    if (currentVal !== updatedVal) {
      setTimeout(flipDigitTo, staggerDelay, digits[i], currentVal, updatedVal);
    }
  }
}

function setupClock() {
  var epoch = getEpoch(),
    staggerDelay,
    digit,
    i;

  for (i = 0; i < epoch.length; i += 1) {
    digit = createDigit();
    staggerDelay = Math.random() * 400;
    document.body.appendChild(digit);
    setTimeout(flipDigitTo, staggerDelay, digit, null, epoch[i]);
  }
  digits = document.querySelectorAll('digit');
}

setupClock();
setInterval(updateClock, 1000 * 60);
