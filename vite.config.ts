import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { NodePackageImporter } from "sass-embedded";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	css: {
		preprocessorOptions: {
			scss: {
				importers: [new NodePackageImporter()],
				additionalData: `@use "@/shared/styles/_variables.scss" as v;`,
			},
		},
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
});
