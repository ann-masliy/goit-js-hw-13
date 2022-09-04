const input = document.querySelector('.search_input');
const inputBtn = document.querySelector('.search_btn');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

let page = 1;

const fetchImages = async () => {
  const token = '29544011-a26ad759f9849933fa3601a5e';
  const imageType = 'photo';
  const orientation = 'horizontal';
  const safeSearch = true;
  const inputValue = input.value.trim();
  const baseUrl = `https://pixabay.com/api/?key=${token}&q=${inputValue}&image_type=${imageType}&orientation=${orientation}&safesearch=${safeSearch}&page=${page}&per_page=40`;

  // const arrayOfImages = array.map(async array => {
  //   const response = await fetch(`${baseUrl}`);
  //   return response.json();
  // });
  const response = await fetch(`${baseUrl}`);
  const responseObject = await response.json();
  const arrayImages = [];
  responseObject.hits.forEach(async image => {
    arrayImages.push(image);
    // console.log(image);
  });
  // zmienna.hits.forEach(image => {
  //   console.log(image);
  // });
  console.log(Array.isArray(arrayImages));
  console.log(arrayImages);
  // console.log(responseObject);

  return arrayImages;

  // const images = await Promise.all(arrayOfImages);
  // console.log(images);
  // return images;
};

const renderImages = images => {
  const markup = images
    .map(
      image => `<div class="photo-card">
  <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b> ${image.likes}
    </p>
    <p class="info-item">
      <b>Views</b> ${image.views}
    </p>
    <p class="info-item">
      <b>Comments</b> ${image.comments}
    </p>
    <p class="info-item">
      <b>Downloads</b> ${image.downloads}
    </p>
  </div>
</div>`
    )
    .join('');
  gallery.innerHTML = markup;
  return page++;
};

fetchImages()
  .then(images => {
    renderImages(images);
    //page += 1;
  })
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

loadMoreBtn.addEventListener('click', async()=> {
  try {
    const array = await fetchImages();
    renderImages(array);
  } catch (error) {
    console.log(error.message);
  }
});