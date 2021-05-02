import { createApi } from 'unsplash-js'

export const unsplash = createApi({
  // eslint-disable-next-line no-undef
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_API,
})

export const trackDownloads = (image) => {
  unsplash.photos.trackDownload({
    downloadLocation: image.links.download_location,
  })
}
