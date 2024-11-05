import { AppOpenAPI } from "@/lib/types";
import packageJSON from "@/package.json" with { type: "json" };

export default function configureOpenAPI(app: AppOpenAPI) {
  app.doc("/api/doc", {
    openapi: "3.0.0",
    info: {
      version: packageJSON.version,
      title: "E-cart API",
    },
  });

}