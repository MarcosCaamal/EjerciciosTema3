var socket = io.connect('localhost:8081', { 'forceNew': true });

socket.on('messages', function(data) {
  console.log(data);
  render(data);
  
})
var mensaje;
function render (data) {
  var html = data.map(function(elem, index) {
   vocales(elem.text);
    
    return(`<div>
              <strong>${elem.author}</strong>:
              <em>${elem.text}</em>
            </div>
            `);
  }).join(" ");
  document.getElementById('messages').innerHTML = html;
  
}
function vocales(txt) {
  
  var res=txt.match(/[aeiou|AEIOU]/g);
  if(res!=null)
    res=res.length;
  else
    res=0;
  document.getElementById('vocales').innerHTML = res;
 
  palabras(txt);
  numeros(txt);
  mayusculas(txt);
  noVocales(txt);
};
function palabras(text) {
  var res=text.match(/[a-zA-Z]{2,}/g);
  if(res!=null)
    res=res.length;
  else
    res=0;
  document.getElementById('palabras').innerHTML = res;
 
  
};
function numeros(text) {
  
  var res=text.match(/[0-9]/g);
  if(res!=null)
    res=res.length;
  else
    res=0;
  document.getElementById('numeros').innerHTML = res;
 
  
};
function mayusculas(text) {
  
  var res=text.match(/\b[A-Z]([a-zA-Z]{1,})/g);
  if(res!=null)
    res=res.length;
  else
    res=0;
  document.getElementById('mayusculas').innerHTML = res;
 
  
};
function noVocales(text) {
  
  var res=text.match(/([a-zA-Z]{2,})([0-9]{1,})?[^aeiou|AEIOU\s]\b/g);
  if(res!=null)
    res=res.length;
  else
    res=0;
  document.getElementById('noVocales').innerHTML = res;
 
  
};

function addMessage(e) {
  var message = {
    author: document.getElementById('username').value,
    text: document.getElementById('texto').value
  };
  
  socket.emit('new-message', message);
 
  return false;
}

