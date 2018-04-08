export default {
  updated() {
    let aTagArr = [].slice.apply(document.getElementsByTagName('a'));
    aTagArr.forEach(function (e, i) {
      e.href.indexOf('_blank') > -1 ? e.target = '_blank' : null;
    });
  }
}