fetch('/Routes/components/header.html')
  .then(response => response.text())
  .then(data => {
    document.querySelector('.header-placeholder').innerHTML = data;
  });
fetch('/Routes/components/side-bar.html')
  .then(response => response.text())
  .then(data => {
    document.querySelector('.side-bar-placeholder').innerHTML = data;
    inicializarSideBar();
  });
fetch('/Routes/components/footer.html')
  .then(response => response.text())
  .then(data => {
    document.querySelector('.footer-placeholder').innerHTML = data;
  });