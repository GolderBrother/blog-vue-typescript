(function flexible(window, document) {
  let docEl = document.documentElement;
  // 获取设备像素比(设备物理像素/设备独立像素)
  let dpr = window.devicePixelRatio || 1;
  // adjust body font size
  function setBodyFontSize(): void {
    if (document.body) {
      document.body.style.fontSize = 12 * dpr + "px";
    } else {
      document.addEventListener("DOMContentLoaded", setBodyFontSize);
    }
  }
  setBodyFontSize();
  // set 1rem = viewWidth / 10
  function setRemUnit() : void{
    let rem = docEl.clientWidth / 10;
    docEl.style.fontSize = rem + "px";
  }
  setRemUnit();
  // reset rem unit on page resize
  window.addEventListener("resize", setRemUnit);
  window.addEventListener("pageshow", function(e) {
    if (e.persisted) {
      setRemUnit();
    }
  });
  // detect 0.5px supports
  if (dpr >= 2) {
    var fakeBody = document.createElement("body");
    var testElement = document.createElement("div");
    testElement.style.border = ".5px solid transparent";
    fakeBody.appendChild(testElement);
    docEl.appendChild(fakeBody);
    if (testElement.offsetHeight === 1) {
      docEl.classList.add("hairlines");
    }
    docEl.removeChild(fakeBody);
  }
})(window, document);
