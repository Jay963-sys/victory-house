/**
 * Sanity Studio configuration
 * Mounted at /app/studio/[[...tool]]/page.tsx
 */

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";

import { apiVersion, dataset, projectId } from "./sanity/env";
import { schema } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";

export default defineConfig({
  basePath: "/studio",

  projectId,
  dataset,
  apiVersion,

  // 🚨 REQUIRED: never use CDN in Studio
  useCdn: false,

  schema,

  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],

  // Optional but highly recommended (reduces network noise)
  document: {
    unstable_comments: { enabled: false },
  },
});
