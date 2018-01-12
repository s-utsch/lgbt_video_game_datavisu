function shuffle(a) {
	for (let i = a.length; i; i--) {
		let j = Math.floor(Math.random() * i);
		[a[i - 1], a[j]] = [a[j], a[i - 1]];
	   }
}
      var colors = ["#0000ff", "#400080", "#800080", "#800040", "#ff00ff"];
      shuffle(colors);
      var wcWidth=800;
      var wcHeight=400;
      d3.wordcloud().font("arial black")
        .size([wcWidth, wcHeight])
        .fill(d3.scale.ordinal().range(colors))
        .words(words)
        .start(); 