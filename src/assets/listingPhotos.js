function importAll(r) {
  let images = {};
  r.keys().forEach((key) => {
    const cleanKey = key.replace('./', '').replace('.JPG', '');
    images[cleanKey] = r(key);
  });
  return images;
}

const listingPhotos = importAll(require.context('./listingPhotos', false, /\.JPG$/));

export default listingPhotos;