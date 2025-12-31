# Discord Scams and How to Find Them

A machine-readable collection of scams as observed in discord communities.

The data is presented as a single `scams.yaml` file following the format described below:

## Format

```
# Scam
id: ULID 
name: A short name describing the scam
examples (optional): A sequence of examples as encountered in the wild
notes (optional): A sequence of further notices and explanations
images (optional): A sequence of <Image> objects
detection (optional): A sequence of <Detection> objects
deprecation (optional): Reason why the scam listing should no longer be considered active 

# Image
path (mutually exclusive with url): Relative URL to images in this repository
url (mutually exclusive with path): Full URL to images outside this repository
alt: Alternative text describing the image

# Detection
type: regex|profile-regex|automod|automod-profile|other
pattern: Pattern used for detection
explanation (optional): Explanation for why the pattern is effective
```

The format is formally desrcibed in `src/schema.ts` and validated via CI and pre-commit hooks. Either executing will also generate `scams.yml` as a combination of all individual files in the `scams` folder.

> [!TIP]
> Make sure the first `notes` entry effectively describes the scam. Use subsequent `notes` for details, caveats, and variants.

> [!IMPORTANT]
> When adding images, please place them inside the `/images/` folder, make sure the name is unique per scam and ends with `-n` where `n` is sequential.

# Contributing

You can generate a new file with pre-filled ULID id by running `pnpm new [short description]`.

Make sure all your contributions happen in the `scams` folder. The `scams.yml` file is automatically generated after validation and should not be manually edited.
