function scope() {
  const key = document.querySelector('#key')
  const btnTarefa = document.querySelector('#btn-add-tarefa')
  const ul = document.querySelector('#lista')

  function createDel(li) {
    li.innerText += ' '
    const btnDel = document.createElement('button')
    btnDel.innerText = 'X'
    btnDel.setAttribute('class', 'erase')
    li.appendChild(btnDel)
  }

  function createLi() {
    const li = document.createElement('li');
    li.classList.add('line');
    return li
  }

  function createAsseg(textoInput) {
    const li = createLi()
    li.innerText = textoInput
    list.appendChild(li)
    cleanInput()
    createDel(li)
    saveAssegment()
  }

  key.addEventListener('keypress', e => {
    if (e.keyCode === 13) {
      if (!key.value) return
      createAsseg(key.value)
    }
  })
  btnTarefa.addEventListener('click', e => {
    if (!key.value) return
    createAsseg(key.value)
  })

  function cleanInput() {
    key.value = ''
    key.focus()
  }

  document.addEventListener('click', e => {
    const el = e.target
    if (el.classList.contains('erase')) {
      el.parentElement.remove()
      saveAssegment()
    }
  })

  function saveAssegment() {
    const liAsseg = list.querySelectorAll('li')
    const listOfAsseg = []

    for (let list of liAsseg) {
      let asseg = list.innerText
      asseg = asseg.replace('X', '').trim()
      listOfAsseg.push(asseg)
    }

    const assegJSON = JSON.stringify(listOfAsseg)
    localStorage.setItem('asseg', assegJSON)
  }

  function addSavedAsseg() {
    const asseg = localStorage.getItem('asseg')
    const listOfAsseg = JSON.parse(asseg)

    for (let asseg of listOfAsseg) {
      createAsseg(asseg)
    }
  }
  addSavedAsseg()
}
scope()
