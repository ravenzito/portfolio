//Seu JavaScript de validação aqui

//Adiciona um ouvinte de evento ao documento para executar quando o conteúdo do DOM estiver carregado
document.addEventListener("DOMContentLoaded", function() {
    // Pega a altura da section fixa
    let headerHeight = document.querySelector('.menu').offsetHeight;
    
    let links = document.querySelectorAll('.menu__list a');
    
    links.forEach(function(link) {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            
            // Pega o valor do atributo 'href' do link clicado
            let targetId = this.getAttribute('href');
            
            let targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Calcula a posição do elemento alvo, descontando a altura do cabeçalho
                let targetPosition = targetElement.offsetTop;
                
                // Faz a janela rolar até a posição calculada
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
  });
  

  const form = document.getElementById('contato');
  const nome = document.getElementById('nome');
  const email = document.getElementById('email');
  const mensagem = document.getElementById('mensagem');
  const enviarBtn = document.getElementById('enviar');
  
  form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (checkInputs()) {
          console.log("Enviando formulário..."); 
      } else {
          console.log("Por favor, preencha todos os campos corretamente.");
      }
  });
  
  [nome, email, mensagem].forEach(input => {
      input.addEventListener('input', () => {
        const formControl = input.parentElement;
        const small = formControl.querySelector('small');
        small.innerText = '';

          if (checkInputs()) {
              enviarBtn.removeAttribute('disabled');
          } else {
              enviarBtn.setAttribute('disabled', 'disabled');
          }
      });
  });
  
    function checkInputs() {
      const nomeValue = nome.value.trim();
      const emailValue = email.value.trim();
      const mensagemValue = mensagem.value.trim();
  
      if (nomeValue === '') {
          errorValidation(nome, 'Preencha esse campo.');
          return false;
      } else if (nomeValue.length > 50) {
          errorValidation(nome, 'Deve ter menos de 50 caracteres.');
          return false;
      }
  
      if (emailValue === '') {
          errorValidation(email, 'Preencha esse campo.');
          return false;
      } else {
          const emailError = isValidEmail(emailValue);
          if (emailError) {
              errorValidation(email, emailError);
              return false;
          }
      }
  
      if (mensagemValue === '') {
          errorValidation(mensagem, 'Preencha esse campo.');
          return false;
      } else if (mensagemValue.length > 300) {
          errorValidation(mensagem, 'Deve ter menos de 300 caracteres.');
          return false;
      }
  
      return true;
  }
  
  function errorValidation(input, message) {
      const formControl = input.parentElement;
      const small = formControl.querySelector('small');
      small.innerText = message;
      formControl.className = 'formcontato__control error';
  }
  
  function isValidEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!re.test(email)) {
          return "Email inválido. Por favor, insira um email válido.";
      }
      return null;
  }