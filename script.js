$(document).ready(function () {
    let options = $(".options .option");
    let feedback = $(".feedback");
    let nextButton = $(".next-button");
    let questionNumber = 0; // Start with the first question
    let correctAnswers = 0;
    let storedDarkMode = localStorage.getItem("darkMode"); // Retrieve dark mode setting from local storage
    let darkMode = storedDarkMode === "true"; // Use stored preference if available
    
    if (storedDarkMode === null) {
        // If darkMode is not set in local storage, set the default mode to light
        darkMode = false;
        localStorage.setItem("darkMode", "false");
      }

    const questions = [
      {
        question: "What is the smallest planet in our solar system?",
        options: ["Earth", "Mars", "Mercury", "Jupiter"],
        correctOption: 2,
      },
      {
        question: "Which gas do plants release during photosynthesis?",
        options: ["Carbon Dioxide", "Oxygen", "Methane", "Nitrogen"],
        correctOption: 1,
      },
      {
        question: "Which continent is known as the 'Land Down Under'?",
        options: ["Europe", "Asia", "Australia", "South America"],
        correctOption: 2,
      },
      {
        question: "Who is the author of 'Pride and Prejudice'?",
        options: ["Emily Brontë", "Jane Austen", "Charles Dickens", "Mark Twain"],
        correctOption: 1,
      },
      {
        question: "What is the largest planet in our solar system?",
        options: ["Saturn", "Mars", "Jupiter", "Uranus"],
        correctOption: 2,
      },
      {
        question: "What is the chemical symbol for iron?",
        options: ["Ag", "Fe", "Hg", "Au"],
        correctOption: 1,
      },
      {
        question: "Which gas is known as 'Laughing Gas'?",
        options: ["Oxygen", "Carbon Dioxide", "Hydrogen", "Nitrous Oxide"],
        correctOption: 3,
      },
      {
        question: "Who was the first person to walk on the Moon?",
        options: ["Neil Armstrong", "Yuri Gagarin", "Buzz Aldrin", "John Glenn"],
        correctOption: 0,
      },
      {
        question: "In which city is the Eiffel Tower located?",
        options: ["Rome", "London", "New York City", "Paris"],
        correctOption: 3,
      },
      {
        question: "What is the largest species of shark?",
        options: [
          "Tiger Shark",
          "Hammerhead Shark",
          "Great White Shark",
          "Whale Shark",
        ],
        correctOption: 3,
      },
    ];
  
    // Function to show a question
    function showQuestion(questionData) {
      $(".question").text(questionData.question);
      options.each(function (index) {
        $(this).text(questionData.options[index]);
        $(this).data("correct", index === questionData.correctOption);
      });
      feedback.hide();
      options.removeClass("selected");
      options.off("click"); // Disable other options
      options.on("click", function () {
        options.off("click"); // Disable other options
        let selectedOption = $(this);
        selectedOption.addClass("selected");
  
        if (selectedOption.data("correct")) {
          feedback
            .removeClass("incorrect-feedback")
            .text("Correct!")
            .addClass("correct-feedback");
          correctAnswers++; // Increment the count of correct answers
        } else {
          feedback
            .removeClass("correct-feedback")
            .text("Incorrect!")
            .addClass("incorrect-feedback");
        }
  
        nextButton.text("Next").show(); // Show the "Next" button
        feedback.slideDown(300);
      });
    }
    // Function to toggle between dark and light mode
    function toggleMode() {
        darkMode = !darkMode;
        $("body, .quiz-container, .next-button").toggleClass("dark-mode", darkMode);
        $(".toggle-icon")
            .text(darkMode ? "🌙" : "☀️")
            .toggleClass("moon", darkMode);
        localStorage.setItem("darkMode", darkMode.toString()); // Store the mode in local storage
    }
  
    // Show the initial question
    showQuestion(questions[questionNumber]);
  
    nextButton.on("click", function () {
        if (nextButton.text() === "Retry") {
          questionNumber = 0;
          correctAnswers = 0;
          showQuestion(questions[questionNumber]);
          nextButton.hide();
          feedback.hide();
        } else {
          questionNumber++;
          if (questionNumber < questions.length) {
            showQuestion(questions[questionNumber]);
            nextButton.hide();
            feedback.hide();
          } else {
            feedback.text(
              `You got ${correctAnswers} out of ${questions.length} questions correct! Thanks for playing!`
            );
            feedback.addClass("end-feedback");
            nextButton.text("Retry").show();
            feedback.slideDown(300);
          }
        }
      });

    // Handle dark/light mode toggle
    $(".toggle-icon").click(function () {
      toggleMode();
    });
  });
  