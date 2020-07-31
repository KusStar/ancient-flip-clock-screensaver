'use strict';

let digits = [];

const numberToHanziMap = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];

const ancientHoursMap = {
  '23': {
    name: '子',
    isNextHalf: false
  },
  '0': {
    name: '子',
    isNextHalf: true,
  },
  '1': {
    name: '丑',
    isNextHalf: false
  },
  '2': {
    name: '丑',
    isNextHalf: true
  },
  '3': {
    name: '寅',
    isNextHalf: false
  },
  '4': {
    name: '寅',
    isNextHalf: true
  },
  '5': {
    name: '卯',
    isNextHalf: false
  },
  '6': {
    name: '卯',
    isNextHalf: true
  },
  '7': {
    name: '辰',
    isNextHalf: false
  },
  '8': {
    name: '辰',
    isNextHalf: true
  },
  '9': {
    name: '巳',
    isNextHalf: false
  },
  '10': {
    name: '巳',
    isNextHalf: true
  },
  '11': {
    name: '午',
    isNextHalf: false
  },
  '12': {
    name: '午',
    isNextHalf: true
  },
  '13': {
    name: '未',
    isNextHalf: false
  },
  '14': {
    name: '未',
    isNextHalf: true
  },
  '15': {
    name: '申',
    isNextHalf: false
  },
  '16': {
    name: '申',
    isNextHalf: true
  },
  '17': {
    name: '酉',
    isNextHalf: false
  },
  '18': {
    name: '酉',
    isNextHalf: true
  },
  '19': {
    name: '戌',
    isNextHalf: false
  },
  '20': {
    name: '戌',
    isNextHalf: true
  },
  '21': {
    name: '亥',
    isNextHalf: false
  },
  '22': {
    name: '亥',
    isNextHalf: true
  },
}

function toHanzi(val) {
  return numberToHanziMap[val]
}

function getAncientHours(h, m) {
  const { name, isNextHalf } = ancientHoursMap[h] 
  let ke = (m / 15) | 0
  if (isNextHalf) ke += 4
  return `${name}时${toHanzi(ke)}刻`
}

function getEpoch() {
  const d = new Date()
  const h = d.getHours()
  const m = d.getMinutes()

  return getAncientHours(h, m)
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
