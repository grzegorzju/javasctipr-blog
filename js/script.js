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
}

	const optArticleSelector = '.post',
	optTitleSelector = '.post-title',
	optTitleListSelector = '.titles',
	optArticleTagsSelector = '.post-tags .list',
	optTagsListSelector = '#tagList';
	const articles = document.querySelectorAll(optArticleSelector);

function generateTitleLinks(customSelector = ''){

	const titleList = document.querySelector(optTitleListSelector);
	const articles = document.querySelectorAll(optArticleSelector + customSelector);
	console.log(customSelector);
	console.log(articles);
	console.log(optArticleSelector + customSelector);
	titleList.innerHTML = '';
	let html = '';
	for(let article of articles){
		const articleId = article.id;
		const articleTitle = article.querySelector(optTitleSelector).innerHTML;
		const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
		html = html + linkHTML;		
	}
	titleList.innerHTML = html;
	
	const links = document.querySelectorAll('.titles a');

	for(let link of links){
		link.addEventListener('click', titleClickHandler);
	}
}

function generateTags(){
	for(let article of articles){
		let html = '';
		const articleId = article.id;
		const articleTags = article.getAttribute("data-tags").split(" ");
		for(let tag of articleTags){
			html = html + '<li><a href="#tag-'+tag+'">'+tag+'</a></li>'
		}
		article.lastElementChild.lastElementChild.innerHTML = html;
	}
}

function tagClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute("href");
  const tagLinks = document.querySelectorAll('a[href^="#tag-"]');
  const tag = href.split("-")[1];
  for(let tagLink of tagLinks){
	tagLink.classList.remove("active");
  }
  const allTagsLinks = document.querySelectorAll(href);
  for(let allTagsLink of allTagsLinks){
	  allTagsLink.classList.add("active");
  }
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){
  const tagLinks = document.querySelectorAll('a[href^="#tag-"]');
  for(let tagLink of tagLinks){
	tagLink.addEventListener('click', tagClickHandler);
  }
}

function generateAuthorsLinks(){
	for(let article of articles){
		let html = '';
		const articleId = article.id;
		const author = article.getAttribute("data-author");
		html = html + '<a href="#author-'+author+'">'+author.replace("-"," ")+'</a>'
		article.querySelector(".post-author").innerHTML = html;
	}
}

function authorClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute("href");
  const authorLinks = document.querySelectorAll('a[href^="#author-"]');
  const author = href.split("-")[1]+" "+href.split("-")[2];
  const dataAuthor = href.split("-")[1]+"-"+href.split("-")[2]
  for(let authorLink of authorLinks){
	authorLink.classList.remove("active");
  }
  const allAuthorsLinks = document.querySelectorAll(href);
  for(let allAuthorsLink of allAuthorsLinks){
	  allAuthorsLink.classList.add("active");
  }
  generateTitleLinks('[data-author~="' + dataAuthor + '"]');
}

function addClickListenersToAuthors(){
  const authorLinks = document.querySelectorAll('a[href^="#author-"]');
  for(let authorLink of authorLinks){
	authorLink.addEventListener('click', authorClickHandler);
  }
}

function generateTags(){
  let allTags = {};
	for(let article of articles){
		let html = '';
		const articleId = article.id;
		const articleTags = article.getAttribute("data-tags").split(" ");
		for(let tag of articleTags){
			html = html + '<li><a href="#tag-'+tag+'">'+tag+'</a></li>'
			  if(!allTags.hasOwnProperty(tag)){
				/* [NEW] add generated code to allTags array */
				allTags[tag] = 1;
			  }else{
				allTags[tag]++;
			  }		
		}
	}
  const tagList = document.querySelector(optTagsListSelector);
  let allTagsHTML = '';
  for(let tag in allTags){
	  allTagsHTML +='<li><a href="#tag-'+tag+'">'+ tag + ' (' + allTags[tag] + ') </a></li>';
  }
  tagList.innerHTML = allTagsHTML;
}

function generateAuthorList(){
  const authorsAll = document.querySelectorAll('a[href^="#author-"]');
  const authorsList = document.getElementById('authList');
  let authorsArray = {};
  let html = "";
  for(let authorHash of authorsAll){
	  const authorName = authorHash.getAttribute("href").replace("#author-","");
	  if(!authorsArray.hasOwnProperty(authorName)){
		  authorsArray[authorName] = 1;
	  }else{
		  authorsArray[authorName]++;
	  }
  }
  console.log(authorsArray);
  for(let author in authorsArray){
	  console.log(author);
	  html = html + '<li><a href="#author-'+author+'">'+author.replace("-"," ")+'('+authorsArray[author]+')</a></li>'
  }

  console.log(html);
  authorsList.innerHTML = html;
}


generateTags();

addClickListenersToTags();

generateAuthorsLinks();
generateAuthorList();	
addClickListenersToAuthors();

generateTitleLinks();

