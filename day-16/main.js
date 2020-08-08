const tooltips = document.querySelectorAll('.tooltip');

// let style = window.getComputedStyle(tooltip, '::before')


tooltips.forEach(tooltip=>{
  tooltip.addEventListener('mouseover',()=>{
    const tooltipCords = tooltip.getBoundingClientRect();
    const style = window.getComputedStyle(tooltip, '::before')
    console.log(tooltipCords.left - parseInt(style.left) + parseInt(style.width))
    if (tooltipCords.left - parseInt(style.left) + parseInt(style.width) > window.innerWidth) {
      // console.log((tooltipCords.left - parseInt(style.left) + parseInt(style.width)) - window.innerWidth)
      tooltip.setAttribute('data-left', tooltipCords.left - parseInt(style.left) + parseInt(style.width) - window.innerWidth)
      tooltip.classList.add('left-c')
    }
  })
  
})
console.log('inner Width', window.innerWidth)