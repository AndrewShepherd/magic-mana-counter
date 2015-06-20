var sequenceGenerator = {
  next: (function() {
    var seq = 0;
    return function() {
      console.log("sequenceGenerator.next: seq = " + seq);
      return ++seq;
    };
  })()
};