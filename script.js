const fileInput = document.querySelector('#file');
const text = document.querySelector('#text');
const status = document.querySelector('#status');
const save = document.querySelector('#save');

fileInput.addEventListener('change', async () => {
  const file = fileInput.files[0];
  if (!file) return;

  if (text.value && !window.confirm('Replace the current text with this file?')) {
    fileInput.value = '';
    return;
  }

  fileInput.disabled = true;
  text.disabled = true;
  save.disabled = true;
  status.textContent = 'Opening file...';
  try {
    text.value = await file.text();
    status.textContent = `Opened ${file.name}.`;
  } catch (error) {
    console.error('Could not read the file:', error);
    status.textContent = 'Could not read the file. Please try again.';
  } finally {
    fileInput.disabled = false;
    text.disabled = false;
    save.disabled = false;
    fileInput.value = '';
  }
});

save.addEventListener('click', () => {
  const url = URL.createObjectURL(new Blob([text.value], { type: 'text/plain;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = 'in-quarto.txt';
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 0);
});
