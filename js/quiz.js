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
        $('.options').append(`<label><input type="checkbox" name="answer" value="${index}">${option}</label><br>`);
      });
      $('.image').html(`<img src="${currentImage}" alt="Image">`);
      $('.final-form').hide();

      if (quizCompleted) {
        $('.next-btn').hide();
        $('.final-form').show();
      } else {
        $('.next-btn').show();
      }
    }
  };

  $('.next-btn').on('click', function() {
    if (currentBlock < quizData.length) {
      if ($('input[name="answer"]:checked').length === 0) {
        alert('Please select an answer.');
        return;
      }
  
      const selectedOption = $('input[name="answer"]:checked').val();
      const answerData = {
        question: quizData[currentBlock].question,
        selectedOption: quizData[currentBlock].options[selectedOption]
      };
      userAnswers.push(answerData);
  
      currentBlock++;
      renderQuizBlock();
    }
  
    if (currentBlock === quizData.length) {
      quizCompleted = true;
      renderQuizBlock();
    }
  });

  $('.prev-btn').on('click', function() {
    currentBlock--;
    quizCompleted = false;
    renderQuizBlock();
  });
  
    $('#quiz-form').validate({
      rules: {
        fname: {
          required: true,
          minlength: 3,
          pattern: /^[A-Za-zА-Яа-я\s]+$/
        },
        lname: {
          required: true,
          minlength: 3,
          pattern: /^[A-Za-zА-Яа-я\s]+$/
        },
        email: {
          required: true,
          email: true
        },
        phone: {
          required: true,
          minlength: 18
        }
      },
      messages: {
        fname: {
          required: 'Пожалуйста, введите имя.',
          minlength: 'Минимальная длина имени - 3 символа.',
          pattern: 'Имя может содержать только буквы и пробелы.'
        },
        lname: {
          required: 'Пожалуйста, введите фамилию.',
          minlength: 'Минимальная длина фамилии - 3 символа.',
          pattern: 'Фамилия может содержать только буквы и пробелы.'
        },
        email: {
          required: 'Пожалуйста, введите адрес электронной почты.',
          email: 'Пожалуйста, введите действительный адрес электронной почты.'
        },
        phone: {
          required: 'Пожалуйста, введите номер телефона.',
          minlength: 'Пожалуйста, введите полный номер телефона.'
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
    $('#phone').mask('+1 (111) 111-1111');
    renderQuizBlock();
});