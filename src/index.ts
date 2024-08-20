import './styles.css';
import { showReviewTotal, populateUser, showDetails, getTopTwoReviews } from './utils';
import { Permissions, LoyaltyUser } from './enums';
import { Review, Property } from './interfaces';
import italianHouse from './images/italian-property.jpg';
import polandHouse from './images/poland-property.jpg';
import londonHouse from './images/london-property.jpg';
import malayHouse from './images/malaysian-hotel.jpeg';
import columbiaHouse from './images/colombia-property.jpg';

const propertyContainer = document.querySelector('.properties');
const reviewContainer = document.querySelector('.reviews');
const container = document.querySelector('.container');
const button = document.querySelector('button');
const footer = document.querySelector('.footer');

let isLoggedIn: boolean;

const reviews: Review[] = [
    { name: 'Sheila', stars: 5, loyaltyUser: LoyaltyUser.GOLD_USER, date: '01-04-2021' },
    { name: 'Andrzej', stars: 3, loyaltyUser: LoyaltyUser.BRONZE_USER, date: '28-03-2021' },
    { name: 'Omar', stars: 4, loyaltyUser: LoyaltyUser.SILVER_USER, date: '27-03-2021' },
];

const you = {
    firstName: 'Bobby',
    lastName: 'Brown',
    permissions: Permissions.ADMIN,
    isReturning: true,
    age: 35,
    stayedAt: ['florida-home', 'oman-flat', 'tokyo-bungalow']
};

const properties: Property[] = [
    {
        image: columbiaHouse,
        title: 'Colombian Shack',
        price: 45,
        location: {
            firstLine: 'shack 37',
            city: 'Bogota',
            code: 45632,
            country: 'Colombia'
        },
        contact: [+112343823978921, 'marywinkle@gmail.com'],
        isAvailable: true  
    },
    {
        image: polandHouse,
        title: 'Polish Cottage',
        price: 30,
        location: {
            firstLine: 'no 23',
            city: 'Gdansk',
            code: 343903,
            country: 'Poland'
        },
        contact: [+1298239028490830, 'garydavis@hotmail.com'],
        isAvailable: false 
    },
    {
        image: londonHouse,
        title: 'London Flat',
        price: 25,
        location: {
            firstLine: 'flat 15',
            city: 'London',
            code: 'SW4 5XW',
            country: 'United Kingdom',
        },
        contact: [+34829374892553, 'andyluger@aol.com'],
        isAvailable: true
    },
    {
        image: malayHouse,
        title: 'Malia Hotel',
        price: 35,
        location: {
            firstLine: 'Room 4',
            city: 'Malia',
            code: 45334,
            country: 'Malaysia'
        },
        contact: [+60349822083, 'lee34@gmail.com'],
        isAvailable: false
    }
];

showReviewTotal(reviews.length, reviews[0].name, reviews[0].loyaltyUser);
populateUser(you.isReturning, you.firstName);

if (propertyContainer) {
    for (let i = 0; i < properties.length; i++) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = properties[i].title;
        const image = document.createElement('img');
        image.setAttribute('src', properties[i].image);
        card.appendChild(image);
        showDetails(you.permissions, card, properties[i].price);
        propertyContainer.appendChild(card);
    }
}

let count = 0;
function addReviews(array: Review[]): void {
    if (!count) {
        count++;
        const topTwo = getTopTwoReviews(array);
        if (reviewContainer) {
            for (let i = 0; i < topTwo.length; i++) {
                const card = document.createElement('div');
                card.classList.add('review-card');
                card.innerHTML = topTwo[i].stars + ' stars from ' + topTwo[i].name;
                reviewContainer.appendChild(card);
            }
        }
        if (container?.contains(button) && button) {
            container.removeChild(button);
        }
    }
}

if (button) {
    button.addEventListener('click', () => {
        console.log('Button clicked');
        addReviews(reviews);
    });
}

let currentLocation: [string, string, number] = ['London', '11.03', 17];
if (footer) {
    footer.innerHTML = currentLocation.join(' ');
}

class MainProperty {
    src: string;
    title: string;
    reviews: Review[];
    constructor(src: string, title: string, reviews: Review[]) {
        this.src = src;
        this.title = title;
        this.reviews = reviews;
    }
}

let yourMainProperty = new MainProperty(
    italianHouse, 
    'Italian House',
    [{ name: 'Olive', stars: 5, loyaltyUser: LoyaltyUser.GOLD_USER, date: '12-04-2021' }]
);

const mainImageContainer = document.querySelector('.main-image');
const image = document.createElement('img');
image.setAttribute('src', yourMainProperty.src);
if (mainImageContainer) {
    mainImageContainer.appendChild(image);
}
