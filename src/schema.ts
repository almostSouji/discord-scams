import z from "zod";

export const OnlineImage = z.object({
	alt: z.string(),
	url: z.url().refine(
		(value) => {
			return [".png", ".jpg", ".gif"].some((suffix) => value.endsWith(suffix));
		},
		{
			message: "Image must be one of .png, .jpg, .gif",
		},
	),
});

export const LocalImage = z.object({
	alt: z.string(),
	path: z
		.string()
		.startsWith("./images/")
		.refine(
			(value) => {
				return [".png", ".jpg", ".gif"].some((suffix) =>
					value.endsWith(suffix),
				);
			},
			{
				message: "Path must end with one of .png, .jpg, .gif",
			},
		),
});

export const PatternDetection = z.object({
	type: z.literal(["automod", "automod-profile", "other"]),
	pattern: z.string(),
	explanation: z.string().optional(),
});

export const RegexDetection = z.object({
	type: z.literal(["regex", "profile-refex"]),
	pattern: z.string().refine(
		(val) => {
			try {
				new RegExp(val);
				return true;
			} catch {
				return false;
			}
		},
		{
			message: "Not a valid regular expression",
		},
	),
	explanation: z.string().optional(),
});

export const Scam = z.object({
	id: z.ulid(),
	name: z.string(),
	examples: z.array(z.string()).optional(),
	notes: z.array(z.string()).optional(),
	images: z.array(z.xor([LocalImage, OnlineImage])).optional(),
	detection: z.array(z.xor([RegexDetection, PatternDetection])).optional(),
	deprecation: z.string().optional(),
});
