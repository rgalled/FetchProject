import HttpClient from './HttpClient.js';
import ResponseContent from './ResponseContent.js';
import ResponseRow from './ResponseRow.js';
export default class ModalEvents {

    constructor(url, csrf) {
        this.url = url;
        this.csrf = csrf;

        this.content = document.getElementById('content');
        this.userContent = document.getElementById('userContent');
        this.pagination = document.getElementById('pagination');
        this.responseContent = new ResponseContent(this.content, this.pagination, this.userContent, this.url);

        this.fetchUrl = '';
        this.httpClient = new HttpClient(this.url, this.csrf);
        this.ResponseRow = new ResponseRow(this.content, this.url);

        // Modal elements for Login
        this.modalLogin = document.getElementById('loginModal');
        this.modalLoginUserButton = document.getElementById('modalLoginUserButton');
        this.loginEmail = document.getElementById('loginEmail');
        this.loginPassword = document.getElementById('loginPassword');

        // Modal elements for Register
        this.modalRegister = document.getElementById('registerModal');
        this.modalRegisterUserButton = document.getElementById('modalRegisterUserButton');
        this.registerConfirmPassword = document.getElementById('registerConfirmPassword');
        this.registerEmail = document.getElementById('registerEmail');
        this.registerName = document.getElementById('registerName');
        this.registerPassword = document.getElementById('registerPassword');

        // Modal elements for View Movies
        this.modalView = document.getElementById('viewModal');
      
        this.modalReview = document.getElementById('reviewModal');
        this.modalReviewButton = document.getElementById('modalReviewButton');
        this.reviewContent = document.getElementById('reviewContent');
        this.reviewRating = document.getElementById('reviewRating');

        // this.viewDirector = document.getElementById('viewDirector');
        // this.viewDescription = document.getElementById('viewDescription');

        //Functionality for Mark as view and Write Review buttons
        this.buttonView = document.getElementById('buttonView');
        this.buttonReview = document.getElementById('buttonReview');

        //Modal for Create Movie
        this.modalCreate = document.getElementById('createModal');
        this.modalCreateButton = document.getElementById('modalCreateButton');
        this.createTitle = document.getElementById('createTitle');
        this.createDirector = document.getElementById('createDirector');
        this.createDescription = document.getElementById('createDescription');


        // Alerts for success/error
        this.movieError = document.getElementById('movieError');
        this.movieSuccess = document.getElementById('movieSuccess');
        this.userError= document.getElementById('userError');
        this.userSuccess = document.getElementById('userSuccess');
        this.logoutButton = document.getElementById('logoutButton');

        this.assignEvents();
    }

    assignEvents() {
        let selectedMovieId = null;
        this.modalView.addEventListener('show.bs.modal', event => {
        console.log(event.relatedTarget.dataset.url);
        console.log(this.url);
            this.fetchUrl = event.relatedTarget.dataset.url;
            console.log(this.fetchUrl);

            this.httpClient.get(
                this.fetchUrl,
                {
                    //  id: event.relatedTarget.dataset.id

                 },
                data => this.responseReview(data, event.relatedTarget.dataset.title)
            );
        });
        
        this.modalReview.addEventListener('show.bs.modal', event => {
            console.log(event.relatedTarget.dataset.url);
            console.log(this.url);

            this.fetchUrl = event.relatedTarget.dataset.url;
            this.reviewContent.value = '';
            selectedMovieId = event.relatedTarget.dataset.id; // Store the movie ID

        });

        this.modalReviewButton.addEventListener('click', event => {
            document.getElementById('modalReviewWarning').style.display = 'none';
            console.log(this.fetchUrl);
            console.log(this.reviewContent.value);
            this.httpClient.post(
                this.fetchUrl,
                {   
                    movie_id: selectedMovieId,
                    review: this.reviewContent.value,
                    rating: this.reviewRating.value
                },
                data => {
                    if (!data.result) {
                        console.error('Error:', data.message);
                    }
                    this.responseCreateReview(data);
                }
            );
        });
    



        this.modalCreate.addEventListener('show.bs.modal', event => {
            this.fetchUrl = event.relatedTarget.dataset.url;
            this.createTitle.value = '';
            this.createDirector.value = '';
            this.createDescription.value = '';
        });


        if (this.buttonView) {
            this.buttonView.addEventListener('click', () => {
                // Add mark as view functionality here
                console.log(`Marked ${title} as view`);
            });
        }

        this.modalLogin.addEventListener('show.bs.modal', event => {
            this.fetchUrl = event.relatedTarget.dataset.url;
            this.loginEmail.value = '';
            this.loginPassword.value = '';
        });

        this.modalRegister.addEventListener('show.bs.modal', event => {
            this.fetchUrl = event.relatedTarget.dataset.url;
            this.registerConfirmPassword.value = '';
            this.registerEmail.value = '';
            this.registerName.value = '';
            this.registerPassword.value = '';
        });
        this.modalLoginUserButton.addEventListener('click', event => {
            console.log(this.fetchUrl);
            this.httpClient.post(

                '/login',

                {
                    email: this.loginEmail.value,
                    password: this.loginPassword.value,
                },
                data => this.responseReload(data)
            );

        });
        this.modalRegisterUserButton.addEventListener('click', event => {
            console.log(this.fetchUrl);
            this.httpClient.post(

                this.fetchUrl,

                {
                    name: this.registerName.value,
                    email: this.registerEmail.value,
                    password: this.registerPassword.value,
                    password_confirmation: this.registerConfirmPassword.value
                },
                data => this.responseReload(data)
            );

        });


        this.modalCreateButton.addEventListener('click', event => {
            document.getElementById('modalCreateWarning').style.display = 'none';
            console.log(this.fetchUrl);
            this.httpClient.post(
                this.fetchUrl,
                {
                    title: this.createTitle.value,
                    director: this.createDirector.value,
                    description: this.createDescription.value
                },
                data => 
                    this.responseCreate(data)
            );

        });
    }
    formattedDate(date) {
        date = new Date(date);
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    }

    responseCommonContent(data) {
        this.responseContent.setContent(data);
        let link = document.getElementById('logoutLink');
        if (link) {
            link.addEventListener('click', event => {
                this.httpClient.post(
                    link.dataset.url,
                    {},
                    data => this.responseReload(data)
                );
            });
        }
    }

    responseCreate(data) {
        console.log(data);
        if (data.result) {
            this.movieSuccess.style.display = 'block';
            bootstrap.Modal.getInstance(this.modalCreate).hide();
            this.responseCommonContent(data);
            setTimeout(() => {
                this.movieSuccess.style.display = 'none';
            }, 4000);
        } else {
            document.getElementById('modalCreateWarning').style.display = 'block';
            console.log('Error');
            setTimeout(() => {
                document.getElementById('modalCreateWarning').style.display = 'none';
            }, 4000);
        }
    }


    responseLogin(data) {

    }

    responseReload(data) {
        console.log(data.result);
        if (data.result) {
            location.reload();
        }else {
             bootstrap.Modal.getInstance(this.modalLogin).hide();
this.userError.style.display = 'block';
setTimeout(() => {
    this.userError.style.display = 'none';
}, 4000);            

        }
    }

    responseShow(data) {
        const { id, name, price, created_at, updated_at } = data.movie;
        this.viewCreatedAt.value = this.formattedDate(created_at);
        this.viewId.value = id;
        this.viewName.value = name;
        this.viewPrice.value = price;
        this.viewUpdatedAt.value = this.formattedDate(updated_at);
    }
    responseReview(data, title) {
        console.log(data);
        let j = 1;


    data.reviews.forEach(review => {
        // this.reviewData.textContent = 'patata';
        this.ResponseRow.addModalViewStructure(this.modalView, title, j);
this.modalView.querySelector('#reviewDiv' + j).querySelector('#reviewDescription').textContent = review.review;
this.modalView.querySelector('#reviewDiv' + j).querySelector('#reviewWriter').textContent = review.user_name;
this.modalView.querySelector('#reviewDiv' + j).querySelector('#reviewRating').textContent = '';
for(let i = 0; i < review.rating; i++) {
    const star = document.createElement('i');
    star.classList.add('bi', 'bi-star-fill');
    this.modalView.querySelector('#reviewDiv' + j).querySelector('#reviewRating').appendChild(star);
}
this.modalView.querySelector('#reviewDiv' + j).querySelector('#reviewData').textContent = this.formattedDate(review.created_at);
     j++;
    });
   
}


responseCreateReview(data) {
    console.log(data.result);

    if (data.result) {
        this.movieSuccess.style.display = 'block';
        this.movieSuccess.textContent = 'Review created successfully';
        bootstrap.Modal.getInstance(this.modalReview).hide();
        // this.responseCommonContent(data);
        setTimeout(() => {
            this.movieSuccess.style.display = 'none';
        }, 4000);
    } else { 
        bootstrap.Modal.getInstance(this.modalReview).hide();

        document.getElementById('userError').style.display = 'block';
        document.getElementById('userError').textContent = data.message;
        setTimeout(() => {
            document.getElementById('userError').style.display = 'none';
            document.getElementById('userError').innerHTML = '';
        }, 4000);
    }
}


    init() {
        this.httpClient.get(
            '/movie',
            {},
            (data) => {
                this.responseCommonContent(data);
            }
        );
    }
}
