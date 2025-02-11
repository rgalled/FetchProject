export default class ResponseRow {

    constructor(parent, currentPage) {
        this.parent = parent;
        this.currentPage = currentPage;
    }

    add({id, title, director, description}) {
        if (!this.table) {
            this.table = document.createElement('table');
            this.table.classList.add('table', 'table-dark', 'table-bordered', 'table-striped', 'mt-3');
            
            const thead = document.createElement('thead');
            const headerRow = document.createElement('tr');
            
            ['Title', 'Director', 'Description', 'Actions'].forEach(text => {
                const th = document.createElement('th');
                th.textContent = text;
                headerRow.appendChild(th);
            });
            
            thead.appendChild(headerRow);
            this.table.appendChild(thead);
            this.tbody = document.createElement('tbody');
            this.table.appendChild(this.tbody);
            this.parent.appendChild(this.table);
        }

        const row = document.createElement('tr');
        
        const titleCell = document.createElement('td');
        titleCell.textContent = title;
        
        const directorCell = document.createElement('td');
        directorCell.textContent = director;
        
        const descriptionCell = document.createElement('td');
        descriptionCell.textContent = description;
        
        const actionsCell = document.createElement('td');
        actionsCell.classList.add('d-flex', 'gap-2');

        const buttonView = document.createElement('a');
        buttonView.textContent = 'See All Reviews';
        buttonView.setAttribute('data-bs-toggle', 'modal');
        buttonView.setAttribute('data-bs-target', '#viewModal');
        buttonView.classList.add('btn', 'btn-warning', 'btn-sm');
        buttonView.dataset.id = id;
        buttonView.dataset.url = `/review/${id}`;

        const buttonReview = document.createElement('button');
        buttonReview.textContent = 'Create a Review';
        buttonReview.setAttribute('data-bs-toggle', 'modal');
        buttonReview.setAttribute('data-bs-target', '#reviewModal');
        buttonReview.classList.add('btn', 'btn-outline-warning', 'btn-sm');
        buttonReview.dataset.url = '/review';
        buttonReview.dataset.id = id;

        actionsCell.append(buttonView, buttonReview);
        row.append(titleCell, directorCell, descriptionCell, actionsCell);
        this.tbody.appendChild(row);
    }
}
