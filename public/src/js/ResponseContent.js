import PageItem from './PageItem.js';
import ResponseRow from './ResponseRow.js';

export default class ResponseContent {

    constructor(content, userContent) {
        this.content = content;
        this.currentPage = 1;
        this.userContent = userContent;
        this.responseRow = new ResponseRow(this.content);
    }

    cleanContent(element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }

    currentPage() {
        return this.currentPage;
    }

    setContent(result) {
        this.cleanContent(this.content);
        this.currentPage = result.movies.current_page;
        this.setUserContent(result.user);
        result.movies.data.forEach(element => {
            this.responseRow.add(element);
        });
    }

    setUserContent(user) {
        this.cleanContent(this.userContent);
        if (user === null) {
            this.setNoUserContent();
        } else {
            this.setCurrentUserContent(user);
        }
    }

    setCurrentUserContent(user) {
        let listItem = document.createElement('li');
        listItem.classList.add('nav-item', 'dropdown');
        
        let a = document.createElement('a');
        a.classList.add('nav-link', 'dropdown-toggle', 'text-primary', 'fw-bold');
        a.setAttribute('data-bs-toggle', 'dropdown');
        a.textContent = user.name;
        
        listItem.appendChild(a);
        this.userContent.appendChild(listItem);

        let div = document.createElement('div');
        div.classList.add('dropdown-menu', 'dropdown-menu-end', 'shadow-sm', 'rounded');
        
        a = document.createElement('a');
        a.id = 'logoutLink';
        a.classList.add('dropdown-item', 'text-danger');
        a.setAttribute('data-url', '/logout');
        a.textContent = 'Logout';
        
        div.appendChild(a);
        listItem.appendChild(div);
        this.userContent.appendChild(listItem);
    }

    setNoUserContent() {
        let listItem = document.createElement('li');
        listItem.classList.add('nav-item');

        let aElement = document.createElement('a');
        aElement.classList.add('nav-link', 'text-primary', 'fw-bold');
        aElement.dataset.url = '/login';
        aElement.setAttribute('data-bs-toggle', 'modal');
        aElement.setAttribute('data-bs-target', '#loginModal');
        //aElement.textContent = 'Login';

        listItem.appendChild(aElement);
        this.userContent.appendChild(listItem);

        listItem = document.createElement('li');
        listItem.classList.add('nav-item');
        
        aElement = document.createElement('a');
        aElement.classList.add('nav-link', 'text-success', 'fw-bold');
        aElement.dataset.url = '/register';
        aElement.setAttribute('data-bs-toggle', 'modal');
        aElement.setAttribute('data-bs-target', '#registerModal');
        //aElement.textContent = 'Register';

        listItem.appendChild(aElement);
        this.userContent.appendChild(listItem);
    }
}
