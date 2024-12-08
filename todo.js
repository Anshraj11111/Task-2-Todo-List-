// Jab pura webpage load ho jaye, tabhi yeh code chalega
document.addEventListener('DOMContentLoaded', () => {
    // Task likhne ke liye input field ko select karna
    const taskInput = document.getElementById('taskInput');
    // Task add karne ke button ko select karna
    const addTaskBtn = document.getElementById('addTaskBtn');
    // Jahan tasks list ke form me dikhenge, us list container ko select karna
    const taskList = document.getElementById('taskList');
    // Filters ke button ko select karna (All, Pending, Completed)
    const filterBtns = document.querySelectorAll('.filter-btn');
  
    // Yeh array sare tasks ko store karega
    let tasks = [];
  
    // Tasks ko render karne ka function (filter lagake dikhata hai)
    function renderTasks(filter = 'all') {
      // Pura task list ko blank karna (purane tasks clear karna)
      taskList.innerHTML = '';
  
      // Filter ke basis pe tasks ko dikhana
      tasks
        .filter(task => 
          filter === 'all' || // Agar "all" filter ho, toh sab dikhaye
          (filter === 'pending' && !task.completed) || // Sirf pending tasks dikhaye
          (filter === 'completed' && task.completed) // Sirf completed tasks dikhaye
        )
        .forEach((task, index) => {
          // Har task ke liye ek `<li>` banaye
          const taskItem = document.createElement('li');
          // Task complete hai ya nahi, uske liye class lagaye
          taskItem.className = `task-item ${task.completed ? 'completed' : ''}`;
  
          // Checkbox aur task text ke liye ek container
          const taskContent = document.createElement('div');
          taskContent.innerHTML = `
            <input type="checkbox" ${task.completed ? 'checked' : ''} data-index="${index}" />
            <span>${task.text}</span>
          `;
  
          // Edit aur delete buttons ke liye container
          const taskActions = document.createElement('div');
          taskActions.className = 'task-actions';
          taskActions.innerHTML = `
            <button class="edit-btn" data-index="${index}">Edit</button>
            <button class="delete-btn" data-index="${index}">Delete</button>
          `;
  
          // Task content aur buttons ko task item me add karna
          taskItem.appendChild(taskContent);
          taskItem.appendChild(taskActions);
  
          // Task item ko task list me add karna
          taskList.appendChild(taskItem);
        });
    }
  
    // Naya task add karne ka function
    function addTask() {
      // Input box se text lena aur whitespace hata dena
      const text = taskInput.value.trim();
  
      // Agar input blank na ho toh task add karo
      if (text) {
        // Task array me object ke form me task ko add karna
        tasks.push({ text, completed: false });
        // Input field ko blank karna
        taskInput.value = '';
        // Task list ko dobara render karna
        renderTasks();
      }
    }
  
    // Task ke actions handle karna (toggle, edit, delete)
    function handleTaskClick(e) {
      // Jis task pe click hua, uska index lena
      const index = e.target.dataset.index;
  
      // Checkbox pe click se task complete/incomplete toggle karna
      if (e.target.type === 'checkbox') {
        tasks[index].completed = !tasks[index].completed;
      }
  
      // Edit button pe click se task text update karna
      if (e.target.classList.contains('edit-btn')) {
        // User se naya text leke task ko update karna
        const newText = prompt('Edit task:', tasks[index].text);
        if (newText) {
          tasks[index].text = newText.trim();
        }
      }
  
      // Delete button pe click se task delete karna
      if (e.target.classList.contains('delete-btn')) {
        tasks.splice(index, 1);
      }
  
      // Task list ko dobara render karna
      renderTasks();
    }
  
    // Filter button ke clicks handle karna
    function handleFilterClick(e) {
      // Sabhi buttons se "active" class remove karna
      filterBtns.forEach(btn => btn.classList.remove('active'));
      // Jo button click hua hai, usme "active" class add karna
      e.target.classList.add('active');
      // Task list ko selected filter ke hisaab se render karna
      renderTasks(e.target.dataset.filter);
    }
  
    // Add task button ke click event ko handle karna
    addTaskBtn.addEventListener('click', addTask);
  
    // Task list ke andar task actions ke clicks handle karna
    taskList.addEventListener('click', handleTaskClick);
  
    // Har filter button ke click event ko handle karna
    filterBtns.forEach(btn => btn.addEventListener('click', handleFilterClick));
  });
  