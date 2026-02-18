import { initPlasmicLoader } from "@plasmicapp/loader-react";
export const PLASMIC = initPlasmicLoader({
  projects: [
    {
      id: "7jrR9EiUkeeyRPgWgF15i3",  // ID of a project you are using
      token: "vpJh9Q29sOjxn9PmVu2noLOmOoN3CNH5dCSBzJ3yIJevFm2yKoUVEae9aOeg2260mkMyr5HSYGVLgoZvrhg"  // API token for that project
    }
  ],
  // Fetches the latest revisions, whether or not they were unpublished!
  // Disable for production to ensure you render only published changes.
  preview: true,
})