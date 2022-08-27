const input = document.querySelector('.search_input');
const inputBtn = document.querySelector('.search_btn');
const gallery = document.querySelector('.gallery');

const fetchImages = (name) => {
    return fetch(
      `https://pixabay.com/api/?key=29544011-a26ad759f9849933fa3601a5e=${name}&image_type=photo&orientation=horizontal&safesearch=true`
    ).then(response => {
      if (!response.ok) {
        throw new Error(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
      return response.json();
    });
}

const formatName = () => {
    const inputValue = input.value.trim();
    console.log(inputValue);
}

inputBtn.addEventListener('click', (event) => {
    event.preventDefault();
    formatName();
})