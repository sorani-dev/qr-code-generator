const form = document.getElementById('generate-form');
const qr = document.getElementById('qrcode');

// Button submit
const onGenerateSubmit = e => {
  e.preventDefault();

  clearUI();

  const url = document.getElementById('url').value;
  const size = document.getElementById('size').value;

  // Validate url
  if (url === '') {
    alert('Please enter a URL');
    return false;
  }

  showSpinner();

  // Show spinner for 1 second
  setTimeout(() => {
    hideSpinner();

    generateQRCode(url, size);

    // Generate the save button after the qr code image src is ready
    setTimeout(() => {
      // Get save url
      const saveURL = qr.querySelector('img').src;
      // Create save button
      createSaveButton(saveURL);
    }, 50);

  }, 1000);
}

// Generate QR code
const generateQRCode = (url, size) => {
  const qrcode = new QRCode('qrcode', {
    text: url,
    width: size,
    height: size,
  });
}

// Show spinner
const showSpinner = () => {
  document.getElementById('spinner').style.display = 'block';
}

// Hide spinner
const hideSpinner = () => {
  document.getElementById('spinner').style.display = 'none';
}

// Clear QR code and save button
const clearUI = () => {
  qrcode.innerHTML = '';
  const saveLink = document.getElementById('save-link');
  if (saveLink) {
    saveLink.remove();
  }
}

// Create save button to download QR code as image
const createSaveButton = saveURL => {
  const link = document.createElement('a');
  link.id = 'save-link'
  link.classList = 'bg-red-500 hover:bg-red-700 text-white font-bold py-2 rounded w-1/3 m-auto my-5';
  link.href = saveURL;
  link.download = 'qrcode';
  link.innerHTML = 'Save Image';
  document.getElementById('generated').appendChild(link);
}

hideSpinner();

form.addEventListener('submit', onGenerateSubmit); 