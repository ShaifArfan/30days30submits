const tooltips = document.querySelectorAll('.all-tooltip .tooltip');
const fullDiv = document.querySelector('section');
const container = document.querySelector('.container')
let timeoutId;
window.addEventListener('resize', contentPosition);
window.addEventListener('DOMContentLoaded', contentPosition);

function contentPosition(){
  tooltips.forEach(tooltip => {
    const pin = tooltip.querySelector('.pin');
    const content = tooltip.querySelector('.tooltip-content')
    const arrow = tooltip.querySelector('.arrow');
    // const pinLeft = pin.offsetLeft;
    if (pin.offsetLeft + content.offsetWidth / 2 > fullDiv.offsetWidth) {
      const extraLeft = fullDiv.offsetWidth - (pin.offsetLeft + content.offsetWidth / 2);
      // console.log('right-conflict', tooltip)
      content.style.left = pin.offsetLeft - content.offsetWidth / 2 + extraLeft - 30+ 'px';
      content.style.top = pin.offsetTop + 30 + 'px';
    } else if (pin.offsetLeft + container.offsetLeft < content.offsetWidth / 2 ){
      // console.log('left conflict', pin.offsetLeft)
      content.style.left = - container.offsetLeft +'px';
      content.style.top = pin.offsetTop + 30 + 'px';
    } else {
      content.style.left = pin.offsetLeft - content.offsetWidth / 2 + 'px';
      content.style.top = pin.offsetTop + 30 + 'px';
    }
    arrow.style.left = pin.offsetLeft - content.offsetLeft + pin.offsetWidth/2 + 'px';
  })
}
tooltips.forEach(tooltip => {
  const pin = tooltip.querySelector('.pin');
  const content = tooltip.querySelector('.tooltip-content');
  pin.addEventListener('mousemove', () => {
    tooltip.classList.add('active');
  })
  pin.addEventListener('mouseleave', () => {
    timeoutId = setTimeout( () => {
      tooltip.classList.remove('active')
    },1000)
  })
  content.addEventListener('mouseover', () => {
    clearTimeout(timeoutId)
    tooltip.classList.add('active');
  })
  content.addEventListener('mouseleave', () => {
    timeoutId = setTimeout(() => {
      tooltip.classList.remove('active')
    }, 1000)
  })
})
