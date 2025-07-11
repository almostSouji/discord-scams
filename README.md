# Discord Scams and How to Find Them

A machine-readable collection of scams as observed in discord communities.

The data is presented as a single `scams.yaml` file following the below format:

## Format

```
# Scam
id: ULID 
name: A short name describing the scam
examples (optional): A sequence of examples as encountered in the wild
notes (optional): A sequence of further notices and explanations
images (optional): A sequence of <Image> objects
detection (optional): A sequence of <Detection> objected
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

> [!TIP]
> Make sure the first `notes` entry quickly describes the scam. Use subsequent `notes` for details, caveats, and variants.

> [!IMPORTANT]
> When adding images, please place them inside the `/images/` folder, make sure the name is unique per scam and ends with `-n` where `n` is sequential.

