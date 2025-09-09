let stage = 1;
    let currentQuestion = 0;
    let score = 0;

    const plantImages = ["plant1.png", "plant2.png", "plant3.png", "plant4.png", "tree.png", "manwithaxe-removebg-preview.png"];

  const questions = [
    {
        text: "How many sides does a standard die have?",
        choices: ["4", "6", "8"],
        correctAnswer: "6",
        explanation: "A standard die has 6 faces numbered 1 to 6."
    },
    {
        text: "What is the probability of flipping heads on a fair coin?",
        choices: ["1/2", "1/3", "1/4"],
        correctAnswer: "1/2",
        explanation: "A coin has two sides: heads and tails. So, 1 out of 2 is 1/2."
    },
    {
        text: "What is the chance of picking a blue ball from a bag with 3 blue and 7 red balls?",
        choices: ["1/2", "3/10", "2/5"],
        correctAnswer: "3/10",
        explanation: "There are 10 balls total and 3 are blue, So the probability is 3/10."
    },
    {
        text: "What is the mode of this data 2,3,3,5,6?",
        choices: ["3", "4", "6"],
        correctAnswer: "3",
        explanation: "The mode is the most frequent value. Since, 3 appears twice."
    },
    {
        text: "What is the mean of the data set 4,8,6,10,2?",
        choices: ["6", "5", "7"],
        correctAnswer: "6",
        explanation: "Mean = (4+8+6+10+2)/5 = 30/5 = 6."
    },
    {
        text: "60% of people prefer tea over coffee. If 150 people were surveyed, how many prefer tea?",
        choices: ["80", "60", "90"],
        correctAnswer: "90",
        explanation: "60% of 150 = 0.60 × 150 = 90."
    },
    {
        text: "A card is drawn from a standard deck. What is the probability it is a red queen?",
        choices: ["1/13", "1/26", "1/52"],
        correctAnswer: "1/26",
        explanation: "There are 2 red queens in a 52-card deck. So, 2/52 = 1/26."
    },
    {
        text: "A number is picked from 1 to 20. What is the probability it's a multiple of 3 or 5?",
        choices: ["9/20", "7/20", "6/20"],
        correctAnswer: "9/20",
        explanation: "There are 9 numbers between 1–20 that are multiples of 3 or 5."
    },
    {
        text: "What is the probability of drawing a spade from a standard deck?",
        choices: ["12/52", "13/52", "14/52"],
        correctAnswer: "13/52",
        explanation: "There are 13 spades in a 52-card deck."
    },
    {
        text: "Two dice are rolled. What is the probability the total is 9?",
        choices: ["4/36", "5/36", "3/34"],
        correctAnswer: "4/36",
        explanation: "There are 4 combinations that result in a sum of 9 out of 36 total outcomes."
    }
];

    const idQuestions = [
    {
        text: "What is the probability of drawing two hearts consecutively from a standard deck without replacement?",
        answer: "1/17",
        explanation: "There are 13 hearts. Probability for the first heart is 13/52, then 12/51. So: (13/52)×(12/51) = 1/17."
    },
    {
        text: "What is the variance of the data set 5,7,9,11,13?",
        answer: "10",
        explanation: "Mean is 9. Squared differences are 16, 4, 0, 4, 16. Variance = (16+4+0+4+16)/5 = 40/5 = 10."
    },
    {
        text: "A class of 25 students where 15 are girls. If two are selected at random, what is the probability both are girls?",
        answer: "7/20",
        explanation: "First girl: 15/25. Second: 14/24. Multiply: (15×14)/(25×24) = 210/600 = 7/20."
    },
    {
        text: "A box contains 6 red, 5 blue and 4 green balls. If two balls are drawn at random, what is the probability both are blue?",
        answer: "10/91",
        explanation: "First blue: 5/15, second: 4/14. Multiply: (5×4)/(15×14) = 20/210 = 10/105 = 2/21 (correct reduced answer)."
    },
    {
        text: "A jar has 2 red and 6 blue balls. What’s the probability of drawing exactly 3 blue balls when 5 are drawn without replacement?",
        answer: "5/14",
        explanation: "Use hypergeometric probability: C(6,3)×C(2,2)/C(8,5) = (20×1)/56 = 20/56 = 5/14."
    }
];


function updateLevelText() {
 const levelText = document.getElementById("level-text");
      if (currentQuestion < 2) {
        levelText.innerText = "Easy"; levelText.style.color = "rgb(32, 228, 32)";

 } else if (currentQuestion < 4) {
        levelText.innerText ="Normal"; levelText.style.color = "orange";

} else if (currentQuestion < 6) {
        levelText.innerText = "Standard"; levelText.style.color = "#d13e79";

} else if (currentQuestion < 8){
        levelText.innerText ="Intermediate"; levelText.style.color = "#46d1d3";

} else if (currentQuestion < 10) {
        levelText.innerText = "Difficult"; levelText.style.color = "#c44040";

    } else {
        levelText.innerText = "Expert"; levelText.style.color = "#f91201";
     }
} /*span level to*/

    function loadQuestion() {
      const questionObj = questions[currentQuestion];
      if (!questionObj) return;

      document.getElementById("choices").innerHTML = "";
      document.querySelector(".bubble").innerText = questionObj.text;

      const imageMap = ["sunlight.png", "water.png", "fertilizer.png"];
      questionObj.choices.forEach((choice, index) => {
        const div = document.createElement("div");
        div.classList.add("choice-container");
        div.innerHTML = `<img src='${imageMap[index % imageMap.length]}' alt="Option"> ${choice}`;
        div.onclick = () => checkAnswer(choice);
        document.getElementById("choices").appendChild(div);
      });

      updateLevelText();
    }

    function checkAnswer(answer) {
      const question = questions[currentQuestion];
      const feedbackContainer = document.getElementById("feedback-container");
      const feedbackMessage = document.getElementById("feedback-message");

      if (answer === question.correctAnswer) {
        score++;
        feedbackMessage.innerHTML = `<p style="color: green;">✅ Correct!</p>`;

      } else {
        feedbackMessage.innerHTML =
          `<p style="color: red;">❌ Wrong!</p>
           <p>✏️ The correct answer was: ${question.correctAnswer}</p>
           <p style="color: green;">💡 Explanation: ${question.explanation}</p>`;
      }

      feedbackContainer.style.display = "block";
    }

    function nextQuestion() {

      document.getElementById("feedback-container").style.display = "none";

        currentQuestion++;

      if (currentQuestion % 2 === 0 && stage < plantImages.length) {
        stage++;
        document.getElementById("plant").src = plantImages[stage - 1];
      }

      if (currentQuestion < questions.length) {
        loadQuestion();
      } else {
        loadIdentificationPhase();
      }
    }

    let idIndex = 0;

    function loadIdentificationPhase() {
      const levelText = document.getElementById("level-text");
        levelText.innerText = "Expert";
        levelText.style.color = "#ff0000";

 if (idIndex < idQuestions.length) {
      document.querySelector(".bubble").innerText = idQuestions[idIndex].text;
    document.getElementById("choices").innerHTML = `


          <h5>Question ${idIndex + 1}</h5>
              
          <input type="text" id="idAnswer" placeholder="Input number or fraction" style="font-size: 12px; padding: 8px; margin: 3px;">
                <button onclick="submitIdentification()" style="font-size: 15px; padding: 5px;">Submit</button> `;

        
        const inputBox = document.getElementById("idAnswer");
            inputBox.addEventListener('input', function () {
            inputBox.value = inputBox.value.replace(/[^0-9\/]/g, '');
           });
      }
}

    function submitIdentification() {
        const userAnswer = document.getElementById("idAnswer").value.trim().toLowerCase();
        const correct = idQuestions[idIndex].answer.trim().toLowerCase();
        const idFeedback = document.getElementById("id-feedback-container");
        const idFeedbackMessage = document.getElementById("id-feedback-message");

        if (!userAnswer) {
            alert("Please enter an answer before submitting.");
            return;
        }

        if (userAnswer === correct) {
            score++;
            if (stage < plantImages.length) {
            stage++;
            document.getElementById("plant").src = plantImages[stage - 1];
            }
            idFeedbackMessage.innerHTML = `<p style="color: green;">✅ Correct!</p>`;
        } else {
            if (stage > 1) {
            stage--;
            document.getElementById("plant").src = plantImages[stage - 1];
            }
            idFeedbackMessage.innerHTML = `
            <p style="color: red;">❌ Wrong!</p>
            <p>The correct answer was: <strong>${correct}</strong></p>
            <p style="color: green;">💡 Explanation: ${idQuestions[idIndex].explanation}</p>
            `;
        }

        idFeedback.style.display = "block";
        }

    function nextIdQuestion() {
      document.getElementById("id-feedback-container").style.display = "none";
      idIndex++;

      if (idIndex < idQuestions.length) {
        loadIdentificationPhase();
      } else {


        document.querySelector(".bubble").style.display = "none";
            const finalScore = `${score}/${questions.length + idQuestions.length}`;
            document.getElementById("choices").innerHTML = `
            
        <div id="congrats-container">
    <h1>🎉 CONGRATULATIONS!</h1>
    <p>You finished the quiz!</p>
    <p>Your Final Score:<br><strong>${finalScore}</strong></p>
    <button onclick="home()">Return</button>
    <button onclick="retry()">Retry</button>
          </div>
        `;
      }
    }

    function home() {
      window.location.href = "home.html";
    }

    function retry(){
        window.location.href="prog.html";
    }

    loadQuestion();