import { sanityClient } from "sanity:client";
import type { PortableTextBlock } from "@portabletext/types";
import type { ImageAsset, Slug } from "@sanity/types";
import groq from "groq";
import { icons } from "lucide-react";

import type { Footer, Post } from "./sanity.types";

export async function getPosts(): Promise<Post[]> {
  return await sanityClient.fetch(
    groq`*[_type == "post" && defined(slug.current)] | order(_createdAt desc)`
  );
}

export async function getPost(slug: string): Promise<Post> {
  return await sanityClient.fetch(
    groq`*[_type == "post" && slug.current == $slug][0]`,
    {
      slug,
    }
  );
}


export async function getFooter(): Promise<Footer> {
  return await sanityClient.fetch(
    groq`*[_type == 'footer' && _id == $documentId][0]`,
    {
      documentId: "ab5911fd-7dfd-413a-9a5f-f3f3e51db20b",
    }
  );
}
