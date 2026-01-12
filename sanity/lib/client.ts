import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-01-09",
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
});
const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}
