let totalComics = 0;
let pageSize = 3;
let loadedComics = [];
let curComic = 0;
let harvestCnt = 0;
const API_URL = "https://xkcd.now.sh/"


// const recycleComicSerial()
// args: num - which is the current Comic serial number.
// 1. num is the serial of the comic to be displayed in the middle of the page.
// 2. num should therefore be in the range of 1 to totalComics,
//    if it is, it is returned intact.
// 3. Because of page up and down, num my be set to values outside the normal range.
//    When this happens, this function returns it to the normal range.
// 4. When num is 0, it refers to the latest comic, so value of totalComics is returned.
// 5. When num is negative, it refers to the comic counting backward from the end.
// 6. When num is larger than totalComics, is warps back to the beginning of the range.
// 7. It is assumed that num when passed in, is in the range of 
//    -totalComics + 1 to 2 x totalComics
const recycleComicSerial = (num) => {
    if ( num < 1) { return num + totalComics;}
    if ( num >totalComics ) { return num - totalComics;}
    return num;
}

// const: getComic(num, i) calls a fetch request to load a comic into loadedComic array.
// args:  num is the Comic# to load,
//        i is the slot number in loadedComics array to store the loaded comic.
// 1. This function is called once at the beginning with parameter num=0 and i=0. This is to load
//    the current comic so as to find out how many comics there are in total.
// 2. Since fetch is a promise, callback harvester() is used to check for 
//    completion of loading of all required comics.  Once the required number of
//    comics are loaded (as indicated by harvestCnt compared to pageSize), the
//    HTML rendering can begin.
const getComic = (num, i) => { 
    let apiStr = "";
    if (totalComics==0) {
        apiStr = `${API_URL}?comic=latest`;
    } else {
        num = recycleComicSerial(num);
        apiStr = `${API_URL}?comic=${num}`;
    }
    fetch(apiStr)
        // Handle success
        .then(response => response.json())  // convert to json
        .then(json => {
            loadedComics[i] = json;
            harvester();
         }) // return comic
        .catch(err => console.log('Request Failed', err)); // Catch errors
}	

// const: harvester() is called each time a comic json is successfully loaded.
// 1. It is called once at the beginning to obtain the total number number of comics.
// 2  This is also called in all subsequent loading of comics.  Since fetch is a promise, 
//    this callback function keeps track of comics loaded in harvestCnt.  Once
//    harvestCount matches pageSize, the HTML rendering can begin.
const harvester = () => {
    if (totalComics == 0) {
        totalComics = loadedComics[0].num;
        curComic = totalComics;
        pageLoad(0, 0);                // this controls the initial page and page size
    } else {
        if (harvestCnt >= 0) {
			harvestCnt = harvestCnt + 1;
		}
        if (harvestCnt === pageSize) {
			renderComics();
        }
    }
}

// renderComics(): renders the loaded comics on the page
function renderComics() {
	const div = document.getElementById('comics');
	while (div.firstChild) {div.removeChild(div.lastChild);}
	div.className=`sm:grid sm:grid-cols-2 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-${pageSize}`
    for (let i=0; i< pageSize ;i++) {
		const div1 = document.createElement('div');
		div1.className = 'border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-200';
			{
			let div1_1 = document.createElement('div');
			div1_1.className = 'p-6';
				{
				let p = document.createElement('p');
				p.innerHTML = `#${loadedComics[i].num} ${loadedComics[i].title}`;
				let img = document.createElement('img');
				img.className = 'block w-full bg-gray-800 border border-gray-800 rounded-md text-sm font-semibold text-white text-center hover:bg-gray-900';
				img.src = `${loadedComics[i].img}`;
				div1_1.appendChild(p);
				div1_1.appendChild(img);
				}
			div1.appendChild(div1_1);
			}
		div.appendChild(div1);
	}	
	pleaseWait(false);
}

// const: pageLoad = (pageMvnt, newPageSize=0): is called to load a fresh page of comics.
// args: pageMvnt is the page movement.  It shuold assume the values of -1, 0, or 1.
//                  -1 means to page up
//                   0  means to stay on curent page
//                  +1 means to page down
//                  page number is not tracked, instead it is the curComic serial that is 
//                  modified so as to load another page of comics.
//       newPageSize is the new page size.  It should assume the values of 0, 1, 3, or 5.
//                   0 means no change.
function pageLoad(pageMvnt, newPageSize=0) {
	pleaseWait(true);
	if ((newPageSize===1) || (newPageSize===3) || (newPageSize===5)) {pageSize=newPageSize;}
    curComic = recycleComicSerial(curComic + pageMvnt * pageSize);
    harvestCnt = 0;
    for (let i = 0; i < pageSize;i++) {
        getComic( curComic - (Math.floor(pageSize/2))+i, i);
    }
}


function pleaseWait(wait) {
	document.getElementById('btngocomic').disabled = wait;
	document.getElementById('gorand').disabled = wait;
	document.getElementById('count').disabled = wait;
	document.getElementById('pageU').disabled = wait;
	document.getElementById('pageD').disabled = wait;
	document.getElementById("loading").classList.remove("hidden");
	if (!wait) {document.getElementById('loading').classList.add("hidden");}
	document.getElementById("content").classList.remove("hidden");
	if (wait) {document.getElementById('content').classList.add("hidden");}
}


// function goComic: button click event handler to allow users to go to a specific comic 
//                   of serial as entered in a input field, or generated randomly.
function goComic(event) {
    event.preventDefault();
	if (event.target.id==='gorand') { 
		curComic = Math.floor(Math.random()*totalComics);
		pageLoad(0,0);
	} else {
		let inpStr = document.getElementById('gocomic').value;
		if (inpStr==="") {
			alert(`Please enter the serial number of the Comics to view.`);
			document.getElementById('gocomic').focus();
        } else {
			if (isNaN(Number(inpStr))) {
				alert(`Please enter a valid number`);
				document.getElementById('gocomic').focus();
			} else if ((Number(inpStr) < 0) || (Number(inpStr) > totalComics)) {
				alert(`Please enter a number in the range from 0 to ${totalComics}.`);
				document.getElementById('gocomic').focus();
			} else {
				curComic = Number(inpStr);
				document.getElementById('gocomic').value = "";
				pageLoad(0,0);
			}
		}
	}
}

// function goPage: button click event handler to allow users to:
//                  - switch page sizes between 1, 3, and 5.
//                  - page up and page down.
function goPage(event) {
    event.preventDefault();
	switch(event.target.id) {
		case('pageU'): pageLoad(-1, 0); break;
		case('pageD'): pageLoad( 1, 0); break;
		case('count'): pageLoad( 0,Number(document.getElementById('count').value));
					   break;
	}
}


document.getElementById('goform').addEventListener('submit', goComic);
document.getElementById('gorand').addEventListener('click', goComic);
document.getElementById('pageU').addEventListener("click", goPage);
document.getElementById('pageD').addEventListener("click", goPage);
document.getElementById('count').value=pageSize;
document.getElementById('count').addEventListener("change", goPage);

getComic(0, 0);
