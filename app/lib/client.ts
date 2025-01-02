import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from './env'
import ImageUrlBuilder  from '@sanity/image-url';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
})

const builder = ImageUrlBuilder(client);

export function urlFor(source: any){
    return builder.image(source)
}
