const tooltips = document.querySelectorAll('.tooltip');
const img = document.querySelector('img');
let timeoutId;
window.addEventListener('resize', contentPosition);
window.addEventListener('DOMContentLoaded', contentPosition);

function contentPosition(){
  tooltips.forEach(tooltip => {
    const pin = tooltip.querySelector('.pin');
    const content = tooltip.querySelector('.tooltip-content')
    const arrow = tooltip.querySelector('.arrow');
    const pinLeft = pin.offsetLeft;
    if (pinLeft + content.offsetWidth / 2 > img.offsetWidth) {
      const extraLeft = img.offsetWidth - (pinLeft + content.offsetWidth / 2);
      console.log(extraLeft)
      content.style.left = pinLeft - content.offsetWidth / 2 + extraLeft + 'px';
      content.style.top = pin.offsetTop + 50 + 'px';
    } else {
      content.style.left = pinLeft - content.offsetWidth / 2 + 'px';
      content.style.top = pin.offsetTop + 50 + 'px';
    }
    arrow.style.left = pinLeft - content.offsetLeft + pin.offsetWidth/2 + 'px';
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
