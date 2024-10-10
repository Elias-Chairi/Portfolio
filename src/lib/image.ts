import imageUrlBuilder from "@sanity/image-url";
import { sanityClient } from "sanity:client";
import type { SanityImageCrop } from "./sanity.types";
import type { Image } from "@sanity/types";

// fix for sanity typegen generating a different crop type
type SanityImage = Omit<Image, 'crop'> & {
  crop?: SanityImageCrop;
};

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImage) {
  return builder.image(source);
}
