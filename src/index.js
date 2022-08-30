const input = document.querySelector('.search_input');
const inputBtn = document.querySelector('.search_btn');
const gallery = document.querySelector('.gallery');

const fetchImages = async () => {
  const token = '29544011-a26ad759f9849933fa3601a5e';
  const imageType = 'photo';
  const orientation = 'horizontal';
  const safeSearch = true;
  const inputValue = input.value.trim();
  const baseUrl = `https://pixabay.com/api/?key=${token}&q=${inputValue}&image_type=${imageType}&orientation=${orientation}&safesearch=${safeSearch}&page=1&per_page=40`;
  const array = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
  ];

  const arrayOfImages = array.map(async array => {
    const response = await fetch(`${baseUrl}`);
    return response.json();
  });
  // const response = await fetch(`${baseUrl}`);
  // const arrayOfImages = await response.json();

  // return arrayOfImages;
  const images = await Promise.all(arrayOfImages);
  console.log(images);
  return images;
};

const renderImages = images => {
  const markup = images
    .map(
      image => `<div class="photo-card">
  <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes ${image.like}</b>
    </p>
    <p class="info-item">
      <b>Views ${image.views}</b>
    </p>
    <p class="info-item">
      <b>Comments ${image.comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads ${image.downloads}</b>
    </p>
  </div>
</div>`
    )
    .join('');
  gallery.innerHTML = markup;
};

fetchImages()
  .then(images => images)
  .catch(Error => console.log(Error));

inputBtn.addEventListener('click', async event => {
  event.preventDefault();

  try {
    const array = await fetchImages();
    renderImages(array);
  } catch (error) {
    console.log(error.message);
  }
});
