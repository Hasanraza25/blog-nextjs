import { createClient } from 'next-sanity'

import ImageUrlBuilder  from '@sanity/image-url';

export const client = createClient({
  projectId: "56xmsr0u",
  dataset: "production",
  apiVersion: "2024-12-30",
  useCdn: false,
})

const builder = ImageUrlBuilder(client);

export function urlFor(source: any){
    return builder.image(source)
}
