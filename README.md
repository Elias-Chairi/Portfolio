# Portfolio: Elias Pettersen Chairi

## Development
You need the environment variables:
- `SANITY_STUDIO_PROJECT_ID`
- `SANITY_STUDIO_PROJECT_ID`

### Static webapp
1. `npm install`
2. `npm run dev`

### Sanity studio
1. `npm install`
2. `npm run sanity:dev`

Mostly work on `/schema` directory and `sanity.config.ts`.
Remember to run `npm run sanity:typegen` to update types.

### Can get an overview of the Sanity documents with the studio vision plugin and this GROQ query:
```groq
{
  // Fetch and group all documents except system ones
  "documents": *[
    !(_type match "system.*") &&
    !(_type match "sanity.imageAsset")
  ]{
    _id,
    _type,
    title,
    // If the document has an image reference, get the image URL
    "image": coalesce(
      // Assuming the field is named `mainImage` or similar, adjust based on your schema
      mainImage.asset->{
        _id,
        url
      },
      null
    ),
    // Fetch other images related to this document via a reference field, for example `gallery` or `images`
    "relatedImages": images[].asset->{
      _id,
      url
    }
  } | order(_type asc)
}
```

