'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var moviesList = document.querySelector('.movies');
var deleteBtn = document.querySelectorAll('.movies li .delete');
var allMovies = document.querySelectorAll('.movies li');
var clearBtn = document.querySelector('.clear');
// var formAddMovie = document.querySelector('.add-movie');
var formAddMovie = document.getElementById('addMovie');
var search = document.querySelector('.search');

function removeItem(itemToRemove) {
  itemToRemove.parentNode.removeChild(itemToRemove);
}

moviesList.addEventListener('click', function (e) {
  if (e.target.classList.contains('delete')) {
    removeItem(e.target.parentElement);
  }
});

function clearAll() {
  clearBtn.addEventListener('click', function () {
    var allMovies = document.querySelectorAll('.movies li');
    Array.from(allMovies).forEach(function (el) {
      removeItem(el);
    });
  });
}

clearAll();

formAddMovie.addEventListener('submit', function (e) {
  e.preventDefault();
  var newTitle = formAddMovie.querySelector('input[type="text"]').value;

  var li = document.createElement('li');
  li.setAttribute('class', 'movie');
  li.setAttribute('draggable', 'true');
  var newIcon = document.createElement('img');
  newIcon.setAttribute('src', 'img/dots.png');
  newIcon.setAttribute('alt', 'drag & drop');
  var newMovieTitle = document.createElement('span');
  var newDeleteBtn = document.createElement('button');

  newMovieTitle.textContent = newTitle;

  newMovieTitle.classList.add('title');
  newDeleteBtn.classList.add('delete');

  li.appendChild(newIcon);
  li.appendChild(newMovieTitle);
  li.appendChild(newDeleteBtn);
  moviesList.appendChild(li);
  addDnDHandlers(li);

//  document.getElementById('add').value = "";
});

search.addEventListener('input', function (e) {
  var phrase = e.target.value.toLowerCase();
  var allMovies = [].concat(_toConsumableArray(moviesList.querySelectorAll('li')));
  allMovies.forEach(function (movie) {
    var title = movie.querySelector('.title').textContent;
    if (title.toLowerCase().indexOf(phrase) != -1) {
      movie.style.display = 'block';
    } else {
      movie.style.display = 'none';
    }
  });
});

function sort(moviesList, sortFn) {
  var allMovies = document.querySelectorAll('.movies li');
  Array.from(allMovies).map(function (movie) {
    return moviesList.removeChild(movie);
  }).sort(sortFn).forEach(function (movie) {
    moviesList.appendChild(movie);
  });
}

function sortMovies(e) {
  var collator = new Intl.Collator();
  switch (e.target.value) {
    case 'a-z':
      sort(moviesList, function (prev, next) {
        return collator.compare(prev.querySelector('.title').textContent, next.querySelector('.title').textContent);
      });
      break;
    case 'z-a':
      sort(moviesList, function (prev, next) {
        return collator.compare(next.querySelector('.title').textContent, prev.querySelector('.title').textContent);
      });
      break;
  }
}

document.addEventListener('change', sortMovies);

var dragSrcEl = null;

function handleDragStart(e) {
  /*  if (e.target.className.indexOf('drag-icon') === -1) {
     return;
    }*/
  dragSrcEl = this;

  e.dataTransfer.setData('text/html', this.outerHTML);

  this.classList.add('drag-elem');
}

function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault();
  }
  this.classList.add('over');

  return false;
}

function handleDragLeave(e) {
  this.classList.remove('over');
}

function handleDrop(e) {

  if (e.stopPropagation) {
    e.stopPropagation();
  }

  if (dragSrcEl != this) {
    this.parentNode.removeChild(dragSrcEl);
    var dropHTML = e.dataTransfer.getData('text/html');
    this.insertAdjacentHTML('beforebegin', dropHTML);
    var dropElem = this.previousSibling;
    addDnDHandlers(dropElem);
  }
  this.classList.remove('over');
  this.classList.remove('drag-elem');
  return false;
}

function handleDragEnd() {
  this.classList.remove('over');
  this.classList.remove('drag-elem');
}

function addDnDHandlers(elem) {
  elem.addEventListener('dragstart', handleDragStart, false);
  elem.addEventListener('dragover', handleDragOver, false);
  elem.addEventListener('dragleave', handleDragLeave, false);
  elem.addEventListener('drop', handleDrop, false);
  elem.addEventListener('dragend', handleDragEnd, false);
}

var rows = document.querySelectorAll('#movies .movie');
[].forEach.call(rows, addDnDHandlers);


/*function insert() {
  <li draggable="true" class="movie">
    <img src="img/dots.png" alt="drag & drop" class="drag-icon">
    <span class="title">Ryan Soldier</span>
    <button class="delete"></button>
  </li>
}*/

function loadMovies(e) {
// formAddMovie.addEventListener('submit', function (e) {
  e.preventDefault();
  var newTitle = "New Movie";

  var li = document.createElement('li');
  li.setAttribute('class', 'movie');
  li.setAttribute('draggable', 'true');
  var newIcon = document.createElement('img');
  newIcon.setAttribute('src', 'img/dots.png');
  newIcon.setAttribute('alt', 'drag & drop');
  var newMovieTitle = document.createElement('span');
  var newDeleteBtn = document.createElement('button');

  newMovieTitle.textContent = newTitle;

  newMovieTitle.classList.add('title');
  newDeleteBtn.classList.add('delete');

  li.appendChild(newIcon);
  li.appendChild(newMovieTitle);
  li.appendChild(newDeleteBtn);
  moviesList.appendChild(li);
  addDnDHandlers(li);
  // alert("Movie loaded !");
//  document.getElementById('add').value = "";
}

// document.addEventListener('click', loadMovies);
document.addEventListener('click', function (e) {  
  if (e.target.classList.contains('loadmovie')) {    
    loadMovies(e);
  } 
  var teste = document.getElementById('loadmovie').value;
});

;
  if (e.target.classList.contains('loadmovie')) {
    // removeItem(e.target.parentElement);
    alert("Hello alert 1 !", teste);
    loadMovies(e);
  }
