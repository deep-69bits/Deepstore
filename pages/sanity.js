import { createClient } from 'next-sanity'

import imageUrlBuilder from '@sanity/image-url'

const client = createClient({
  projectId: "a253bg6b",
  dataset: "production",
  useCdn: false,
});
export default client
export function urlFor(source) {
  return imageUrlBuilder(client).image(source).url()
}
