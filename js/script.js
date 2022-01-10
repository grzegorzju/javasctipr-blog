'use strict';

function titleClickHandler(event){
	event.preventDefault();
	const activeLinks = document.querySelectorAll('.titles a.active');
	const clickedElement = this;
	
	for(let activeLink of activeLinks){
		activeLink.classList.remove('active');
	}

	const activeArticles  = document.querySelectorAll('.posts article.active');

	for(let activeArticle of activeArticles){
		activeArticle.classList.remove('active');
	}
	
	clickedElement.classList.add('active');

	const targetArticle = document.querySelector(clickedElement.getAttribute("href"));
	
	targetArticle.classList.add('active');
  /* remove class 'active' from all articles */

  /* get 'href' attribute from the clicked link */

  /* find the correct article using the selector (value of 'href' attribute) */

  /* add class 'active' to the correct article */
}

const links = document.querySelectorAll('.titles a');

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}