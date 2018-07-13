document.addEventListener('DOMContentLoaded', () => {
  const drop = document.getElementById('drop');
  const area = document.getElementById('area');
  const help = document.getElementById('help');
  const label = document.getElementById('label');
  const reset = document.getElementById('reset');
  const input = document.getElementById('input');
  const showResult = (result) => {
    area.classList.remove('hide');
    reset.classList.remove('hide');
    help.classList.add('hide');
    label.classList.add('hide');
    area.value = result;
  };
  const resetResult = () => {
    area.classList.add('hide');
    reset.classList.add('hide');
    help.classList.remove('hide');
    label.classList.remove('hide');
    area.value = '';
  };
  const prevent = e => {
    e.preventDefault();
    e.stopPropagation();
  };
  const isJson = file => {
    const parts = file.name.split('.');
    return parts[parts.length - 1] === 'json';
  };
  const capitalize = string => string.replace(/(?:^|\s)\S/g, a => a.toUpperCase());
  const parseFile = file => {
    if (!isJson(file)) {
      alert('Формат файла должен быть .json');
      return;
    }
    try {
      const fr = new FileReader();
      fr.onload = () => {
        const { dependencies, devDependencies } = JSON.parse(fr.result);
        const fields = Object.assign({}, dependencies, devDependencies);
        const result = Object
          .keys(fields)
          .map(i => i.replace(/-/g, ' '))
          .map(i => capitalize(i))
          .join(', ');
        showResult(result);
      };
      fr.readAsText(file);
    } catch (e) {
      console.log(e);
      alert('Ошибка при попытке прочитать файл');
    }
  };
  const dropFile = e => {
    prevent(e);
    const file = e.dataTransfer.files[0];
    parseFile(file);
  };
  const handleChangeFile = e => {
    try {
      const file = e.target.files[0];
      parseFile(file);
    } catch (e) {
      console.log(e);
      alert('Ошибка при попытке добавить файл. Файл не выбран');
    }

  };
  drop.addEventListener('dragenter', prevent, false);
  drop.addEventListener('dragover', prevent, false);
  drop.addEventListener('dragleave', prevent, false);
  drop.addEventListener('drop', dropFile, false);
  reset.addEventListener('click', resetResult, false);
  input.addEventListener('change', handleChangeFile, false);
});
