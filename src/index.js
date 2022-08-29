const input = document.querySelector('.search_input');
const inputBtn = document.querySelector('.search_btn');
const gallery = document.querySelector('.gallery');

const fetchImages = async () => {
  const token = '29544011-a26ad759f9849933fa3601a5e';
  const imageType = 'photo';
  const orientation = 'horizontal';
  const safeSearch = true;
  const inputValue = input.value.trim();

  const response = await fetch(
    `https://pixabay.com/api/?key=${token}&q=${inputValue}&image_type=${imageType}&orientation=${orientation}&safesearch=${safeSearch}`
  );
  const images = await response.json();
  //console.log(images);
  return images;
};

fetchImages()
  .then(images => images.json())
  .catch(Error => console.log(Error));

const addGallery = () => {
  console.log(fetchImages);
};

inputBtn.addEventListener('click', event => {
  event.preventDefault();
  fetchImages();
  addGallery();
});
