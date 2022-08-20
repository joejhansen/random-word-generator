const formGroupEl = document.getElementById("formGroup")
const historyUl = document.getElementById("historyUl")
const wordDisplay = document.getElementById("wordDisplay")
const definitionDiv = document.getElementById("definitionDiv")
const generateBtn = document.getElementById("generateBtn")
var wordList = ["theater", "doctor", "park", "hospital"]
var apiURL = "https://api.dictionaryapi.dev/api/v2/entries/en/"

function addWordToList(event) {
    event.preventDefault()
    // console.log(event.target.children[1].value)
    var thisWord = event.target.children[1].value
    fetch(apiURL + thisWord)
        .then(function (response) {
            if (response.ok) {
                return response.json()
                    .then(function (data) {
                        // console.log(data)
                        var partOfSpeech = data[0].meanings[0].partOfSpeech
                        var definition = data[0].meanings[0].definitions[0].definition
                        thisWord = thisWord.toLowerCase()
                        wordDisplay.textContent = thisWord
                        definitionDiv.innerHTML = "<p>" + partOfSpeech + "</p><p>" + definition + "</p>"
                        if (wordList.includes(thisWord)) {
                            return
                        } else {
                            wordList.push(thisWord)
                            var saveThis = JSON.stringify(wordList)
                            localStorage.setItem("wordsList", saveThis)
                        }
                        var newLi = document.createElement("li")
                        newLi.innerHTML = thisWord
                        historyUl.appendChild(newLi)
                        // console.log(wordList)
                    });

            } else {
                wordDisplay.textContent = "error"
                definitionDiv.innerHTML = "<p>oops</p><p>please enter a valid word</p>"
                return
            }
        })
    event.target.children[1].value = ''
}

formGroupEl.addEventListener("submit", addWordToList)

function showWordDefinition(event) {
    var thisWord = event.target.textContent
    fetch(apiURL + thisWord)
        .then(function (response) {
            if (response.ok) {
                return response.json()
                    .then(function (data) {
                        // console.log(data)
                        var partOfSpeech = data[0].meanings[0].partOfSpeech
                        var definition = data[0].meanings[0].definitions[0].definition
                        thisWord = thisWord.toLowerCase()
                        wordDisplay.textContent = thisWord.toLowerCase()
                        definitionDiv.innerHTML = "<p>" + partOfSpeech + "</p><p>" + definition + "</p>"
                        if (wordList.includes(thisWord)) {
                            return
                        } else {
                            wordList.push(thisWord)
                            var saveThis = JSON.stringify(wordList)
                            localStorage.setItem("wordsList", saveThis)
                        }
                        // console.log(wordList)
                    });

            } else {
                wordDisplay.textContent = "error"
                definitionDiv.innerHTML = '<p>oops</p><p>the free dictionary API might not be working.</p><p>check under "network" using dev tools</p>'
                return
            }
        })
    console.log(event.target.textContent)
}

historyUl.addEventListener("click", showWordDefinition)

function showRandomWord() {
    var thisWord = wordList[Math.floor(Math.random() * wordList.length)]
    fetch(apiURL + thisWord)
        .then(function (response) {
            if (response.ok) {
                return response.json()
                    .then(function (data) {
                        // console.log(data)
                        var partOfSpeech = data[0].meanings[0].partOfSpeech
                        var definition = data[0].meanings[0].definitions[0].definition
                        wordDisplay.textContent = thisWord
                        definitionDiv.innerHTML = "<p>" + partOfSpeech + "</p><p>" + definition + "</p>"
                        // console.log(wordList)
                    });

            } else {
                console.log("error")
                return
            }
        })
}

generateBtn.addEventListener("click", showRandomWord)

function init() {
    var localWords = localStorage.getItem("wordsList")
    if (!localWords) {
        var saveThis = JSON.stringify(wordList)
        localStorage.setItem("wordsList", saveThis)
        localWords = localStorage.getItem("wordsList")
    } else {
        wordList = JSON.parse(localWords)
    }
    wordList.forEach(function (number) {
        var newLi = document.createElement("li")
        newLi.innerHTML = number
        historyUl.appendChild(newLi)
    })
}

init()