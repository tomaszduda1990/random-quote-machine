var btn = document.getElementById('quote-button');
var quote = document.getElementById('quote');
var author = document.getElementById('author');
var header = document.getElementById('header');
var load  = document.getElementById('loader');
var tweetButton = document.getElementById('twitter-share-button');
var myStyle = "height:100px;background-color:rgba(230, 138, 0, 0.7);position:absolute;transition: 2s;-webkit-transition: 2s;";

function postOnTwitter(quote, author){
	var attr = "https://twitter.com/intent/tweet?text=";
	tweetButton.setAttribute('href',attr+"\""+encodeURIComponent(quote)+"\""+"&hashtags="+encodeURIComponent(author));
}

btn.addEventListener("click", function(){
	tweetButton.style.display ="none";
	quote.style.display = "none"; 
	author.style.display = "none";
	loader.style.display = "inline-block";
	btn.disabled = true;
	

	var ourRequest = new XMLHttpRequest();
	ourRequest.open('GET', 'https://random-quote-generator.herokuapp.com/api/quotes/', );
	ourRequest.onload = function(){
		var rand = Math.floor((Math.random() * 81));
		var ourData = JSON.parse(ourRequest.responseText);
		if(rand==32){return 0;}
		quote.innerHTML = "\"" + ourData[rand].quote+"\"";
		author.innerHTML = "- " + ourData[rand].author;
		postOnTwitter(ourData[rand].quote, ourData[rand].author);
	};

	ourRequest.send();
	setTimeout(function(){
		loader.style.display = "none";
		quote.style.display = "block"; 
		author.style.display = "block";
		tweetButton.style.display = "inline-block";
		btn.disabled = false;
	}, 1500);
});
setTimeout(function(){
	header.style.cssText = myStyle;
	
},5000)