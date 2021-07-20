import getElement from './getElement';
import createElement from './createElement';

export default (message, className) => {
  if (getElement('.alert')) {
    getElement('.alert').remove();
  }
  const div = createElement('div', { class: `alert alert-${className}` });
  const closeBtn = createElement('button', { class: 'alert-close-btn' }, 'X');
  closeBtn.addEventListener('click', () => {
    getElement('.alert').remove();
  });
  div.append(document.createTextNode(message), closeBtn);
  document.body.insertBefore(div, getElement('.main'));
};