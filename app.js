// aqui estou coletando o window, e adicionando um evendo a ele
// o evento 'load' é para quando a tela finalizou seu carregamento, chamando o 
// que foi declarado dentor da arrow function
window.addEventListener('load', () => {
    formSubmit()
})

// Função responsável por configurar o evento de submit
// assim, quando o usuário gravar uma task, iremos capturar e fazer a ação desejada
function formSubmit()
{
    // pego o form da arvore do DOM
    let form = document.tasks
    // configuro o evento submit, na arrow function o vanegador informa o 'evento'
    form.addEventListener('submit', (event) => {
        // por meio do evento podemos barrar sua ação default,
        // no caso do formulário é o submit.
        event.preventDefault()

        // pegamos o valor preenchido no input e contamos a quantidade de caracteres,
        // caso não tenha nada preenchido exibimos uma notificação para o usuário
        if (form.task.value.length === 0) {
            alert('Favor informar sua tarefa')

            // temos que retornar, caso contrário o javascrit continuaria a execução
            // do código
            return
        }

        // chamamos o método para adicionar a task na lista
        addTask(form.task.value)
        // deixamos o input vazio para que o usuário possa cadastrar outra task
        form.task.value = ''
    })
}

// função responsável por adicionar a task na lista
function addTask(task)
{
    // apturamos a ul no hml, como temos somente 1 desse elemento na tela,
    // não será necessário criar classe ou id
    let taskList = document.querySelector('ul')
    // usamo o método makeTask, pois assim garantimos que todas as task terão a mesma estrutura
    taskList.appendChild(makeTask(task))
}

// responsável por criar toda a estrutura da task
function makeTask(task)
{
    // pegamos todas as li que tem em nossa lista
    let liQuantity = document.querySelectorAll('ul li')
    // crio um identificador único com a quantidade + 1
    let identity = liQuantity.length + 1

    // estou criando uma tag span para conter o texto
    let text = document.createElement('span')
    // deifno seu identificador
    text.classList.add(`text-${identity}`)
    // atribuo o texto preenchido no input para a tag span
    text.innerText = task

    // crio o botão para finalizar
    let doneButton = document.createElement('button')
    // defino uma classe para ele
    doneButton.classList.add('button-done')
    // defino seu identificador
    doneButton.classList.add(`done-button-${identity}`)
    // crio nele um aributo personalizado, pois assim, podemos capturar o númeto
    // de identificação e assim poder manipular os elementos da task
    doneButton.setAttribute('data-identity',identity)
    // defino o evento de click do botão
    doneButton.addEventListener('click', eventButtonDone)
    // atribuo o texto do botão
    doneButton.innerText = 'Concluído'

    // para o botão de apagar é realizado o mesmo processo acima, porém,
    // configurando com seu identificador, evento e texto.
    let trashButton = document.createElement('button')
    trashButton.classList.add('button-trash')
    trashButton.classList.add(`trash-button-${identity}`)
    trashButton.setAttribute('data-identity',identity)
    trashButton.addEventListener('click', eventButtonRemove)
    trashButton.innerText = 'Remover'

    // crio uma div para conter todos os elementos que compõem a task
    let div = document.createElement('div')
    // adiciono todos os elementos
    div.appendChild(text)
    div.appendChild(doneButton)
    div.appendChild(trashButton)

    // crio o elemento li
    let li = document.createElement('li')
    // crio um identificador único para a linha da task, será usado para apagar.
    li.classList.add(`li-${identity}`)
    // adiciono todos os elementos da task
    li.appendChild(div)

    return li
}

// regras de negócio do evento do botão concluído
function eventButtonDone()
{
    // coleto o número do identificador único
    let identity = this.getAttribute('data-identity')

    // capturo o botão da task
    let doneButton = document.querySelector(`.done-button-${identity}`)
    // removo ele do HTML (DOM)
    doneButton.remove()

    // capturo o texto da task
    let text = document.querySelector(`.text-${identity}`)
    // marco como concluído para que os estilos css sejam utilizados
    text.classList.add('task-done')
}

// regras de negócio do evento do botão remover
function eventButtonRemove()
{
    // coleto o número do identificador único
    let identity = this.getAttribute('data-identity')

    // capturo a linha da task
    let li = document.querySelector(`.li-${identity}`)
    // removo do HMTL (DOM)
    li.remove()
}
