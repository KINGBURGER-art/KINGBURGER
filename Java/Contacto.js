const btn = document.getElementById('button');

document.getElementById('form')
 .addEventListener('submit', function(event) {
   event.preventDefault();

   btn.value = 'Eviando...';

   const serviceID = 'default_service';
   const templateID = 'template_7xrlbep';

   emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn.value = 'Enviar';
      alert('Su mensaje a sido envíado correctamente¡Gracias por enviarnos su mensaje!');
    }, (err) => {
      btn.value = 'Enviando';
      alert(JSON.stringify(err));
    });
});