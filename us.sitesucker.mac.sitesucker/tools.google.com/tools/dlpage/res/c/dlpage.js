  function dlAddEventListener(id, event, func) {
    var el = document.getElementById(id);
    if (el) {
      el.addEventListener(event, func);
    }
  }
  function dlAddEventListenerBiffHref(id, event, func) {
    var el = document.getElementById(id);
    if (el) {
      if (el.getAttribute('href')) {
        el.setAttribute('href', '#');
      }
      el.addEventListener(event, func);
    }
  }
