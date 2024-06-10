function dateTimeZone(dateString) {
    // Divida a string da data nas partes do ano, mês e dia
    const parts = dateString.split('-');

    // Crie um novo objeto Date especificando o ano, mês (subtraindo 1 porque os meses são baseados em zero) e dia
    return new Date(parts[0], parts[1] - 1, parts[2]);
}

const mostrarTarefas = () => {
    const tabela = document.getElementById("idTabelaLista")
    const tbody = tabela.querySelector("tbody")
  
    tbody.innerHTML = 
    `<tr>
      <th>DATA</th>
      <th>NOME</th>
      <th>STATUS</th>
      <th>EDITAR</th>
      <th>EXCLUIR</th>  
    </tr>`
  
    const tarefas = JSON.parse(localStorage.getItem('tarefas')) || []
   
    tarefas.forEach((tarefa, index) => {
  
        let novaData = dateTimeZone(tarefa.data);
        let dataPtBr = novaData.toLocaleDateString('pt-BR');
      
    
      const conteudoTerefa = 
  
          `<tr>
            <td>${dataPtBr}</td>
            <td>${tarefa.nome}</td>
            <td>${tarefa.statusTipo}</td>
            <td><button class="btnEdit" onclick="editarTarefa(${index})"><i class="fa fa-pencil-square-o fa-3x" aria-hidden="true"></i></button></td>
            <td><button class="btnDelete" onclick="deletaTarefa(${index})"><i class="fa fa-trash fa-3x" aria-hidden="true"></i></button></td>
          </tr>`
  
      const row = tbody.insertRow();
      row.innerHTML = conteudoTerefa;
  
    })
  
  }
  
  const addTarefa = (event) => {
    event.preventDefault();
    let form = document.getElementById("idForm")
    let nome = document.getElementById("idTarefa").value.trim()
    let statusTipo = document.getElementById('idStatus').value
    let data = document.getElementById("idData").value.trim()
    let camposVazios = []
  
  
    nome == '' ? camposVazios.push("Nome") : '';
    statusTipo == '' ? camposVazios.push("tipo de Stautus") : '';
    data == '' ? camposVazios.push("Data") : '';
  
    if(nome == '' || statusTipo == '' || data == ''){
  
      alert("Por favor, preencha todos os campos! " + camposVazios)
    }else {
      const tarefa = {nome: nome,  statusTipo, data: data}
      let tarefas = JSON.parse(localStorage.getItem('tarefas')) || []
      tarefas.push(tarefa);
      localStorage.setItem('tarefas', JSON.stringify(tarefas))
      form.reset()
      mostrarTarefas()
    }
  }
  
  const cleanForm = () => {
    document.getElementById('idForm').reset()
  }
  
  const deleteTarefa = (index) => {
     tarefas = JSON.parse(localStorage.getItem('tarefas')) || []
  
    tarefas.splice(index, 1);
  
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
    mostrarTarefas()
  }
  
  const editarTarefa = (index) => {
    const tarefas = JSON.parse(localStorage.getItem('tarefas')) || []
    const tarefa = tarefas[index]
    document.getElementById('idTarefa').value = tarefa.nome
    document.getElementById('idStatus').value = tarefa.statusTipo
    document.getElementById('idData').value = tarefa.data
  
    let btnAdd = document.querySelector('.adicionarlista')
    btnAdd.value = "Salvar"
  
    const atualizaTarefa = (event) => {
      event.preventDefault();
      tarefa.nome = document.getElementById('idTarefa').value.trim();
      tarefa.statusTipo =  document.getElementById('idStatus').value;
      tarefa.data = document.getElementById('idData').value;
      let camposVazios = []
  
      tarefa.nome == '' ? camposVazios.push("Nome") : '';
      tarefa.statusTipo == '' ? camposVazios.push("tipo de Stautus") : '';
      tarefa.data == '' ? camposVazios.push("Data") : '';
    
      if(tarefa.nome == '' ||  tarefa.statusTipo == '' || tarefa.data == ''){
    
        alert("Por favor, preencha todos os campos! " + camposVazios)
      
      }else {
              const upTarefa = JSON.stringify(tarefas)
              localStorage.setItem('tarefas', upTarefa)

              mostrarTarefas()
              document.getElementById('idForm').reset()

              document.querySelector('.adicionarlista').removeEventListener('click', atualizaTarefa)
              document.querySelector('.adicionarlista').addEventListener('click', addTarefa)
              btnAdd.value = "Adicionar"
            }
      }
    document.querySelector('.adicionarlista').removeEventListener('click', addTarefa)
    document.querySelector('.adicionarlista').addEventListener('click', atualizaTarefa)
    
  }
  
const init = () => {
    document.querySelector('.adicionarlista').addEventListener('click', addTarefa);
    mostrarTarefas()
}
  
init();