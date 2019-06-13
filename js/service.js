'use strict'
let gTopFive;
let gSearchHistory = {
    words: [],
};
let gId = 0;

function getAnswerYouYube(value = '') {
    var prmRes = axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=AIzaSyAojvYcFT-zLPqM3KcDJfElrOtjcBqoBZE&q=${value}`)
    var prmAns = prmRes.then((res) => {
        gTopFive = res.data;
        console.log(gTopFive);
        return res.data;
    })
    return prmAns;
}

function getAnswerWikipedia(value) {
    var prmRes = axios.get(`https://en.wikipedia.org/w/api.php?&origin=*&action=opensearch&search=${value}&limit=5`)
    var prmAns = prmRes.then((res) => {
        return res.data;
    })
    return prmAns;
}


function getVideoById(videoId) {
    let video = gTopFive.items.find(videos => {
        return videos.id.videoId === videoId;
    });

    return video;

}


function saveToLocal(elSearch) {
    if (!elSearch) return;
    if (!localStorage.getItem('search')) {
        gSearchHistory.words.push(elSearch);
        saveToStorage('search', gSearchHistory);
    } else {
        gSearchHistory = loadFromStorage('search')
        console.log(gSearchHistory)
        gSearchHistory.words.push(elSearch);
        saveToStorage('search', gSearchHistory);
    }

}

function getKeyWords(txt) {

    gSearchHistory = loadFromStorage('search');
    let searchKeyWord = gSearchHistory.words.map(word => {
        if (word.includes(txt)) return word;
    })

    for (let i = 0; i < searchKeyWord.length; i++) {
        for (let j = 0; j < searchKeyWord.length; j++) {
            if (searchKeyWord[j] === searchKeyWord[i])
                searchKeyWord.splice(j, 1);
        }


    }

    return searchKeyWord;

}