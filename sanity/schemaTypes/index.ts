import { type SchemaTypeDefinition } from "sanity";

import { blockContentType } from "./blockContentType";
import { categoryType } from "./categoryType";
import { postType } from "./postType";
import { authorType } from "./authorType";
import sermon from "./sermon";
import event from "./event";
import series from "./series";
import Testimonies from "./testimony";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    categoryType,
    postType,
    authorType,
    sermon,
    event,
    series,
    Testimonies,
  ],
};
