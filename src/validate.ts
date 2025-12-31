import { readFile, writeFile } from "node:fs/promises";
import process from "node:process";
import { fileURLToPath } from "node:url";
import kleur from "kleur";
import readdirp from "readdirp";
import { Document, parse } from "yaml";
import { Scam } from "./schema.js";

const scamFiles = readdirp(
	fileURLToPath(new URL("../scams", import.meta.url)),
	{
		fileFilter: (file) => file.basename.endsWith(".yml"),
	},
);

const combined = [];
let validationFails = 0;
for await (const file of scamFiles) {
	const contents = await readFile(file.fullPath);
	try {
		const scam = Scam.parse(parse(contents.toString()));
		console.log(`${kleur.green("[✓]")} ${file.fullPath}`);
		combined.push(scam);
	} catch (error) {
		console.log(kleur.red(`[X] ${file.fullPath}`), error);
		validationFails++;
	}
}

if (validationFails) {
	process.exit(1);
}

await writeFile(
	new URL("../scams.yml", import.meta.url),
	new Document(combined).toString({
		lineWidth: 0,
	}),
);
