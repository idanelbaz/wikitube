'use strict'

function onInit() {
    renderAll();
}

function renderAll() {
    handleSearch();
    setTimeout(renderMainVid, 100);
}


function handleSearch() {
    let elSearch = document.querySelector('input').value;
    saveToLocal(elSearch);
    let top5 = getAnswerYouYube(elSearch);
    let strHtml = '';
    top5.then(songs => {
        songs.items.forEach(item => {
            strHtml += `   
            <div class="next-video" onclick="renderMainVid('${item.id.videoId}')">
            <img src="${item.snippet.thumbnails.default.url}">
            <p class ="next-vid-p" >${item.snippet.title}</p>
        </div>
            `
        });
        document.querySelector('.next-vid').innerHTML = strHtml;
    })

}

function renderMainVid(videoId = 'm7Bc3pLyij0') {
    let video = getVideoById(videoId);
    document.querySelector('iframe').src = 'https://www.youtube.com/embed/' + video.id.videoId;
    renderWiki(video);
}

function renderWiki(video) {
    let titleToWiki = video.snippet.channelTitle;
    let wikiData = getAnswerWikipedia(titleToWiki);
    let strHtml = '';
    wikiData.then(data => {

        if (data[1].length === 0) {
            strHtml += `
            <h1 class="wiki-head">${data[0]} </h1>
            <h2 class="wiki-body"> </h2>
            <h1 class="wiki-head"></h1>
            <h2 class="wiki-body"></h2>

    
            `
        } else { strHtml += `
            <h1 class="wiki-head">${data[0]} </h1>
            <h2 class="wiki-body"> ${data[2][0]} </h2>
            <h1 class="wiki-head">${data[1][1]} </h1>
            <h2 class="wiki-body"> ${data[2][1]} </h2>

    
            ` }


        document.querySelector('.wiki').innerHTML = strHtml;
    })

}

function checkIfEnter(ev) {
    if (ev.key === "Enter") handleSearch();
}

function renderSearchAuto(elInput) {
    let keyWords = getKeyWords(elInput.value)
    console.log(keyWords)
    let strHtml = '';
    if (!keyWords) return;
    else {
        keyWords.forEach(word => {
            if (!word) return;
            else {
                strHtml += `
                <li onclick="handleKeyWords(this)">${word}</li>
                `
            }

        })

    }
    if (!elInput.value) document.querySelector('ul').hidden = true;
    else document.querySelector('ul').hidden = false;

    document.querySelector('ul').innerHTML = strHtml;




}


function handleKeyWords(elLi) {
    document.querySelector('input').value = elLi.innerText;
    document.querySelector('ul').hidden = true;
    elLi.innerText = '';
    document.querySelector('input').focus();
    handleSearch();


}