import { createClient } from 'next-sanity'

import { apiVersion} from './env'
import ImageUrlBuilder  from '@sanity/image-url';

export const client = createClient({
  projectId: 'bhwqmt6s',
  dataset: 'production',
  apiVersion,
  useCdn: false,
})

const builder = ImageUrlBuilder(client);

export function urlFor(source: any){
    return builder.image(source)
}
