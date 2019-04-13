(function () {
  resize ()
  window.onresize = function () {
    resize ()
  }
  function resize () {
    document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + 'px';
  }
})()