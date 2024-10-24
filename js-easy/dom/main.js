const addButton = document.getElementById('add')
const removeButton = document.getElementById('remove')
const list = document.querySelector('.list')

addButton.addEventListener('click', (event) => {
    const newItem = document.createElement('li')
    newItem.textContent = '新しいアイテム'
    list.appendChild(newItem)
})
removeButton.addEventListener('click', (event) => {
    list.removeChild(list.lastElementChild)
})

