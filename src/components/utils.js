export function renderLoading(isLoading, form) {
  if (isLoading) {
    form.querySelector('.button_category_save').textContent = 'Сохранение...'
  } else {
    form.querySelector('.button_category_save').textContent = 'Сохранить'
  }
}