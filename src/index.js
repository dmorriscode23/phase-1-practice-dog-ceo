console.log('%c HI', 'color: firebrick')

document.addEventListener('DOMContentLoaded', () => {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    const breedUrl = "https://dog.ceo/api/breeds/list/all";
    const imagesContainer = document.getElementById('dog-image-container');
    const breedsList = document.getElementById('dog-breeds');
    const breedDropdown = document.getElementById('breed-dropdown');
    let allBreeds = [];

    function fetchAndDisplayImages() {
        fetch(imgUrl)
            .then(response => response.json())
            .then(data => {
                data.message.forEach(imgSrc => {
                    const img = document.createElement('img');
                    img.src = imgSrc;
                    img.alt = 'Random Dog';
                    img.style.width = '200px';
                    img.style.height = '200px';
                    img.style.margin = '10px';
                    imagesContainer.appendChild(img);
                });
            })
            .catch(error => console.error('Error fetching the images:', error));
    }

    function fetchBreeds() {
        fetch(breedUrl)
            .then(response => response.json())
            .then(data => {
                allBreeds = Object.keys(data.message);
                displayBreeds(allBreeds);
            })
            .catch(error => console.error('Error fetching the breeds:', error));
    }

    function displayBreeds(breeds) {
        breedsList.innerHTML = ''; // Clear current list
        breeds.forEach(breed => {
            const li = document.createElement('li');
            li.textContent = breed;
            li.addEventListener('click', () => {
                li.style.color = 'red'; // Or any color you prefer
            });
            breedsList.appendChild(li);
        });
    }

    function filterBreedsByLetter(letter) {
        const filteredBreeds = allBreeds.filter(breed => breed.startsWith(letter));
        displayBreeds(filteredBreeds);
    }

    breedDropdown.addEventListener('change', (event) => {
        filterBreedsByLetter(event.target.value);
    });

    fetchAndDisplayImages();
    fetchBreeds();
});
