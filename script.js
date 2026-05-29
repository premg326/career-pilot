// ===== 1. INITIALIZATION & DATA LOADING =====
document.addEventListener('DOMContentLoaded', () => {
    // Load data from Local Storage
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    let goals = JSON.parse(localStorage.getItem('goals')) || [];
    let interns = JSON.parse(localStorage.getItem('interns')) || [];
    let hacks = JSON.parse(localStorage.getItem('hacks')) || [];
    
    // Load Theme Preference
   

    // ===== 2. DARK MODE TOGGLE =====
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        const icon = themeToggleBtn.querySelector('i');
        icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }

    // ===== 3. TO DO LIST FUNCTIONS =====
    const todoInput = document.getElementById('todo-input');
    const addTodoBtn = document.getElementById('add-todo-btn');
    const todoList = document.getElementById('todo-list');

    addTodoBtn.addEventListener('click', addTodo);
    todoInput.addEventListener('keypress', (e) => {
        if(e.key === 'Enter') addTodo();
    });

    function addTodo() {
        if (todoInput.value.trim() === '') return;
        todos.push({ text: todoInput.value.trim(), completed: false });
        todoInput.value = '';
        saveData();
        renderTodos();
    }

    function deleteTodo(index) {
        todos.splice(index, 1);
        saveData();
        renderTodos();
    }

    function renderTodos() {
        todoList.innerHTML = '';
        todos.forEach((todo, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${todo.text}</span>
                <button class="delete-btn" onclick="deleteTodo(${index})">X</button>
            `;
            todoList.appendChild(li);
        });
        updateProgress();
    }

    // ===== 4. LEARNING GOALS FUNCTIONS =====
    const goalInput = document.getElementById('goal-input');
    const addGoalBtn = document.getElementById('add-goal-btn');
    const goalList = document.getElementById('goal-list');

    addGoalBtn.addEventListener('click', addGoal);
    goalInput.addEventListener('keypress', (e) => {
        if(e.key === 'Enter') addGoal();
    });

    function addGoal() {
        if (goalInput.value.trim() === '') return;
        goals.push(goalInput.value.trim());
        goalInput.value = '';
        saveData();
        renderGoals();
    }

    function deleteGoal(index) {
        goals.splice(index, 1);
        saveData();
        renderGoals();
    }

    function renderGoals() {
        goalList.innerHTML = '';
        goals.forEach((goal, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span><i class="fas fa-angle-right"></i> ${goal}</span>
                <button class="delete-btn" onclick="deleteGoal(${index})">X</button>
            `;
            goalList.appendChild(li);
        });
    }

    // ===== 5. INTERNSHIP TRACKER FUNCTIONS =====
    function addIntern() {
        const companyInput = document.getElementById('intern-company');
        const statusInput = document.getElementById('intern-status');
        
        if (companyInput.value.trim() === '') return;
        
        interns.push({
            company: companyInput.value.trim(),
            status: statusInput.value
        });
        
        companyInput.value = '';
        saveData();
        renderInterns();
    }

    function deleteIntern(index) {
        interns.splice(index, 1);
        saveData();
        renderInterns();
    }

    function renderInterns() {
        const tbody = document.querySelector('#intern-table tbody');
        tbody.innerHTML = '';
        
        interns.forEach((item, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${item.company}</td>
                <td><span class="status-badge ${item.status.toLowerCase()}">${item.status}</span></td>
                <td><button class="delete-btn" onclick="deleteIntern(${index})">X</button></td>
            `;
            tbody.appendChild(tr);
        });
    }

    // ===== 6. HACKATHON TRACKER FUNCTIONS =====
    function addHack() {
        const nameInput = document.getElementById('hack-name');
        const statusInput = document.getElementById('hack-status');
        
        if (nameInput.value.trim() === '') return;
        
        hacks.push({
            name: nameInput.value.trim(),
            status: statusInput.value
        });
        
        nameInput.value = '';
        saveData();
        renderHacks();
    }

    function deleteHack(index) {
        hacks.splice(index, 1);
        saveData();
        renderHacks();
    }

    function renderHacks() {
        const tbody = document.querySelector('#hack-table tbody');
        tbody.innerHTML = '';
        
        hacks.forEach((item, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${item.name}</td>
                <td><span class="status-badge ${item.status.toLowerCase()}">${item.status}</span></td>
                <td><button class="delete-btn" onclick="deleteHack(${index})">X</button></td>
            `;
            tbody.appendChild(tr);
        });
    }

    // ===== 7. DAILY PROGRESS TRACKER =====
    function updateProgress() {
        if (todos.length === 0) {
            document.getElementById('progress-fill').style.width = '0%';
            document.getElementById('progress-fill').textContent = '0%';
            return;
        }
        
        // Simple progress: based on total items (you can make this based on completed tasks)
        const percentage = (todos.length * 10) % 100; // Just an example calculation
        // Actual meaningful progress: Number of active items vs empty state
        let activeTasks = todos.length;
        let maxTasks = 10; // Assume user aims for 10 tasks
        let progress = Math.min((activeTasks / maxTasks) * 100, 100);
        
        const bar = document.getElementById('progress-fill');
        bar.style.width = `${progress}%`;
        bar.textContent = `${Math.round(progress)}%`;
        
        document.getElementById('progress-text').textContent = 
            `You have ${activeTasks} active items in your list!`;
    }

    // ===== 8. QUOTE GENERATOR =====
    function generateQuote() {
        const quotes = [
            { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
            { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
            { text: "Education is the passport to the future, for tomorrow belongs to those who prepare for it today.", author: "Malcolm X" },
            { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
            { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
            { text: "It always seems impossible until it's done.", author: "Nelson Mandela" },
            { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
            { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
            { text: "The only limit to our realization of tomorrow is our doubts of today.", author: "Franklin D. Roosevelt" },
            { text: "Your education is a dress rehearsal for a life that is yours to lead.", author: "Nora Ephron" }
        ];
        
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        document.getElementById('quote-text').textContent = `"${randomQuote.text}"`;
        document.getElementById('quote-author').textContent = `— ${randomQuote.author}`;
    }

    // ===== 9. LOCAL STORAGE SAVE FUNCTION =====
    function saveData() {
        localStorage.setItem('todos', JSON.stringify(todos));
        localStorage.setItem('goals', JSON.stringify(goals));
        localStorage.setItem('interns', JSON.stringify(interns));
        localStorage.setItem('hacks', JSON.stringify(hacks));
    }

    // Attach addItem function to global scope for HTML onclick
    window.addItem = function(type) {
        if(type === 'intern') addIntern();
        if(type === 'hack') addHack();
    };

    // Make delete functions global
    window.deleteTodo = deleteTodo;
    window.deleteGoal = deleteGoal;
    window.deleteIntern = deleteIntern;
    window.deleteHack = deleteHack;

    // Initial Load
    const savedTheme = localStorage.getItem('theme') || 'light';
    htmlElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    renderTodos();
    renderGoals();
    renderInterns();
    renderHacks();
    generateQuote();
    updateProgress();
});