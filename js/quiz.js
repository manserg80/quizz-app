$(document).ready(function() {
  const quizData = [
    {
      question: "Which country represents this flag?",
      options: ["Brazil", "Nicaragua", "Australia", "Wales"],
      image: "./img/brazil.jpg"
    },
    {
      question: "Which country represents this flag?",
      options: ["Germany", "France", "Egypt"],
      image: "./img/france.jpg"
    },
    {
      question: "Which country represents this flag?",
      options: ["Croatia", "Italy"],
      image: "./img/italy.jpg"
    },
    {
      question: "Which country represents this flag?",
      options: ["England", "Poland", "Spain", "Romania"],
      image: "./img/spain.jpg"
    },
    {
      question: "Which country represents this flag?",
      options: ["USA", "Argentina", "Japan"],
      image: "./img/usa.jpg"
    }
  ];

  let currentBlock = 0;
  let quizCompleted = false;
  const userAnswers = [];

  const renderQuizBlock = () => {
    if (currentBlock < quizData.length) {
      const currentQuestion = quizData[currentBlock].question;
      const currentOptions = quizData[currentBlock].options;
      const currentImage = quizData[currentBlock].image;

      $('.question').text(currentQuestion);
      $('.options').empty();
        currentOptions.forEach((option, index) => {
          $('.options').append(`<label><input type="checkbox" name="answer_${currentBlock}" value="${index}">${option}</label><br>`);
        });
      $('.image').html(`<img src="${currentImage}" alt="Image">`);
      $('.next-btn').show();
      $('.final-form').hide();
    }
  };

  $('.next-btn').on('click', function() {
    if (currentBlock === quizData.length - 1) {
      quizCompleted = true;
      $('.card-body').hide();
      $('.final-form').show();
    }
    if (currentBlock < quizData.length) {
      const selectedOptions = $('input[name="answer_' + currentBlock + '"]:checked');

      if (selectedOptions.length === 0) {
        alert('Please select an answer.');
        return;
      }

      if (selectedOptions.length !== 1) {
        alert('Please select just one answer.');
        return;
      }

      const selectedIndexes = [];
      selectedOptions.each(function() {
        selectedIndexes.push($(this).val());
      });

      const answerData = {
        question: quizData[currentBlock].question,
        selectedOptions: selectedIndexes.map(index => quizData[currentBlock].options[index])
      };
      userAnswers.push(answerData);

      currentBlock++;
      renderQuizBlock();
    }
  });

  $('.prev-btn').on('click', function() {
    currentBlock--;
    quizCompleted = false;
    renderQuizBlock();
  });

  $.validator.addMethod("lettersWithSpacesOnly", function(value, element) {
    return this.optional(element) || /^[A-Za-z\s]+$/.test(value);
    }, "Please enter letters and spaces only (no digits or special characters).");

  $('#phone').mask('+Z (ZZZ) ZZZ-ZZZZ', {
    translation: {
        'Z': {
            pattern: /[0-9]/, optional: true
        }
    }, placeholder: "+1(___) ___ - __ - __"});

  $('#quiz-form').validate({
      rules: {
        fname: {
          required: true,
          minlength: 3,
          lettersWithSpacesOnly: true
        },
        lname: {
          required: true,
          minlength: 3,
          lettersWithSpacesOnly: true
        },
        email: {
          required: true,
          email: true
        },
        phone: {
          required: true
        }
      },
      messages: {
        fname: {
          required: 'Please enter your first name.',
          minlength: 'The minimum name length is 3 characters.'
        },
        lname: {
          required: 'Please enter your last name.',
          minlength: 'The minimum last name length is 3 characters.'
        },
        email: {
          required: 'Please enter an email address.',
          email: 'Please enter a valid email address.'
        },
        phone: {
          required: 'Please, phone number requiered.',
        }
      },
      submitHandler: function(form) {
        $.ajax({
          type: 'POST',
          url: './php/submit.php',
          data: $('#quiz-form').serialize(),
          success: function(response) {
            alert('Форма успешно отправлена!');
          },
          error: function(xhr, status, error) {
            alert('Произошла ошибка при отправке формы.');
          }
        });
      }
  });
  renderQuizBlock();
});