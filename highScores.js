const highScoreList = document.querySelector("#highScoreList")

const highScores = JSON.parse(localStorage.getItem('highScores')) || []

highScoreList.innerHTML = 
highScores.map(score => {
    console.log(score.username)
    return `<li class ="high-score"> ${score.username} - ${score.score} </li>`
}).join("")