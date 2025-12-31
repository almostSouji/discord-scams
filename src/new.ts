import { writeFile } from "node:fs/promises";
import process from "node:process";
import kleur from "kleur";
import { ulid } from "ulid";
import { stringify } from "yaml";
import { Scam } from "./schema.js";

const id = ulid();
const args = process.argv.slice(2);

const input = args.length ? args.join(" ") : "new scam";
const filenamePrefix = input
	.replace(/[^a-zA-Z0-9-_./s]/g, "_") // Replace invalid characters with "_"
	.replace(/^\.+/, "") // Remove leading dots
	.replace(/\.+$/, "") // Remove trailing dots
	.substring(0, 255); // Limit length to 255 characters

const newScam = Scam.parse({
	id,
	name: input,
});

const contents = stringify(newScam);
const url = new URL(`../scams/${filenamePrefix}.yml`, import.meta.url);
await writeFile(url, contents);

console.log(`${kleur.green("[✓]")} Created ${url}`);
