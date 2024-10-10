import { sanityClient } from "sanity:client";
import groq from "groq";

import type { Footer, Project } from "./sanity.types";

export async function getProjects(): Promise<Project[]> {
  return await sanityClient.fetch(
    groq`*[_type == "project" && defined(slug.current)] | order(_createdAt desc)`
  );
}

export async function getProject(slug: string): Promise<Project> {
  return await sanityClient.fetch(
    groq`*[_type == "project" && slug.current == $slug][0]`,
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
