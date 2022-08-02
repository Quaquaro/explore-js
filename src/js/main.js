import '../scss/style.scss';

import axios from 'axios';

export async function getProducts() {
  const request = await axios.get('https://api.test-domain.de/products');
  if (request?.status === 200) {
    return request?.data;
  } else {
    return 'keine Daten';
  }
}
