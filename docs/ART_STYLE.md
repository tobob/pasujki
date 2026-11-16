# Illustration style rules

Every picture in `src/art/items/` follows these rules. They come from the design brief ([DESIGN.md](DESIGN.md)), from research on what makes a face read as "cute" to small children and adults, and from how good flat icon sets handle faces. `npm run check-art` checks the rules that can be checked from source. For the rest, render the contact sheet (see the end of this file) and look at it.

## 1. The face zone stays clear

The eyes, cheeks, nose and mouth always sit on one calm, even colour.

- Stripes, spots and patches belong on the forehead, the outer edges of the head, the mane and the body. They stop well before the eyes, cheeks and muzzle. Zebra stripes, for example, are two bands across the forehead plus wedges that come in from the sides of the head, and they end at least ~6 units (out of 100) before an eye.
- Any pattern on a head is clipped to the head shape (`<ClipPath>`), so it can never spill over the outline.
- Markings around the eyes are the exception, and only when they define the animal (a panda's eye patches). Even then they surround the eye and never cut through it. Good flat icon sets do the same: panda patches and raccoon masks never cross the centre of the face.

## 2. Beaks

- **The beak is the mouth.** Never draw a smile on a bird: no `<Smile>`, and every `<Face>` passes `mouth={false}`. Cheeks are fine.
- **The beak grows out of the head.** Draw it *before* the head, so the head outline covers its base. A triangle laid over a finished head reads as a mask.
- Keep beaks small. A small beak looks younger and friendlier.

## 3. Baby schema

These proportions make a character read as young and friendly ("Kindchenschema", Konrad Lorenz; tested experimentally by Glocker et al., 2009):

- a large, round head, often as big as the body;
- big eyes set low on the head, at or just below the middle;
- a round, plump body with short limbs;
- soft round shapes, with no sharp points except where they identify the thing (a star, the zebra's mane).

## 4. Consistent kit

- Outline: `S` (4 units, colour `UI.outline`), round caps and joins. Use `S3` for small inner details.
- Eyes: `Eyes` (dark dot with a white highlight). On a dark animal, draw white discs first (crow, penguin).
- One dominant colour from `COLORS` per item, so colour rounds stay fair (`src/art/dominant.ts`, checked by the render script).
- One soft highlight stroke on the upper left of the main shape, and an optional darker tone along the bottom for volume.
- The silhouette must still be recognisable for Shadows rounds. Check the `sil-*.png` sheets.

## 5. Checking your work

```bash
npm run check-art     # static rules: beaks, clipped patterns
# Contact sheets (needs esbuild + @resvg/resvg-js in some node_modules, NOT app deps):
NODE_PATH=/path/to/node_modules node tools/art/render.mjs /tmp/pasujki-art
```

Look at every changed item at full tile size and in the silhouette sheet before committing.

## Sources

- Baby schema: Glocker et al., "Baby Schema in Infant Faces Induces Cuteness Perception and Motivation for Caretaking in Adults", *Ethology* 2009 ([PDF](https://www.cceb.upenn.edu/csa/assets/user-content/documents/BabySchemainInfantFacesInducesCutenessPerceptionandMotivationforCaretakinginAdults.pdf)); on body proportions as a separate cue, [MDPI Behavioral Sciences 2024](https://www.mdpi.com/2076-328x/14/1/68).
- Flat animal icon construction (head built from a circle, light muzzle ellipse, patterns kept off the centre of the face): [Envato Tuts+, "How to Create a Set of Flat Animal Icons"](https://design.tutsplus.com/tutorials/how-to-create-a-set-of-flat-animal-icons-in-adobe-illustrator--cms-24710).
- Cute birds (small beak, beak as an extension of the skull, eye roughly level with the top of the beak): [Brenda Bakker, "How to draw cute stylized birds"](https://www.skillshare.com/en/classes/how-to-draw-cute-stylized-birds-using-procreate/1306870322).
