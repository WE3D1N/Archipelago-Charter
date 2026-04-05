```markdown
# Design System Document: Nordic Maritime Editorial

## 1. Overview & Creative North Star

The Creative North Star for this design system is **"The Nautical Curator."** 

We are moving away from the "brochure-ware" layouts common in the maritime industry and toward a high-end editorial experience. This design system treats the Stockholm archipelago not just as a destination, but as a gallery. We achieve this through "Organic Editorialism"—a philosophy that prioritizes intentional white space, sophisticated typography scales, and a departure from the rigid, boxed-in grids of standard web design. 

By leveraging asymmetrical image placements, overlapping typographic elements, and a "tonal layering" approach to depth, we evoke the feeling of a premium lifestyle magazine. The goal is to convey Captain Mikael’s professional authority and the boat Astrid’s luxury through visual restraint and tactile digital surfaces.

---

## 2. Colors

This palette is rooted in the deep contrasts of the Swedish coast: the profound depths of the Baltic Sea meeting the warmth of a Scandinavian summer sunset.

### Tonal Logic
- **Primary & Deep Neutrals:** `primary` (#000a1e) and `primary_container` (#002147) represent the anchor of our brand. They provide the "Trustworthy" weight required for a premium charter.
- **The Sunset Accents:** `secondary` (#9b4500) and `secondary_container` (#fc8a40) are used sparingly for CTAs and critical wayfinding, mimicking the warmth of the sun hitting the wood of the deck.
- **The Seafoam Detail:** `tertiary_fixed` (#8ef4e9) serves as a refined highlight, used for small UI signals or labels to bring a "fresh" maritime breath to the layout.

### The "No-Line" Rule
To maintain an editorial feel, **1px solid borders are strictly prohibited for sectioning.** Boundaries between content areas must be defined exclusively through background shifts. For example, a content block using `surface_container_low` should sit directly against a `surface` background. The shift in tone provides all the structure the eye needs without the "digital noise" of lines.

### Surface Hierarchy & Nesting
Treat the UI as physical layers. Use the `surface_container` tiers to create depth:
1. **Base Layer:** `surface` (#f8f9fa)
2. **Content Sections:** `surface_container_low` (#f3f4f5)
3. **Featured Cards/Modals:** `surface_container_lowest` (#ffffff) to create a "pop" of clean light.

### The "Glass & Gradient" Rule
For floating navigation or high-end overlays, use **Glassmorphism**. Apply a semi-transparent `surface` color with a 12px-20px backdrop-blur. To add "soul" to hero sections, utilize subtle linear gradients transitioning from `primary` (#000a1e) to `primary_container` (#002147) at a 135-degree angle.

---

## 3. Typography

The typography is a dialogue between tradition and modernity.

*   **Display & Headlines (Noto Serif):** This serif is our "Tradition" voice. It should be used with generous leading and occasional intentional overlapping with imagery to create a bespoke, high-end feel.
*   **Body & Titles (Manrope):** A clean, geometric sans-serif that ensures clarity. It represents the "Professional" aspect of Captain Mikael’s service.

### Typographic Scale
- **Display-LG (3.5rem):** Use for hero statements like "Discover Stockholm."
- **Headline-MD (1.75rem):** Reserved for section titles (e.g., "Facts about Astrid").
- **Body-LG (1rem):** High-readability prose for storytelling.
- **Label-MD (0.75rem):** All-caps with 0.05em tracking for technical specs (e.g., "KNOTS," "CAPACITY").

---

## 4. Elevation & Depth

We eschew traditional shadows in favor of **Tonal Layering**.

### The Layering Principle
Hierarchy is achieved by stacking. A `surface_container_lowest` card placed on a `surface_container` background creates a natural, soft lift. This mimics fine paper stock layered on a desk.

### Ambient Shadows
When a floating element (like a "Book Now" sticky button) is required:
- **Shadow Color:** Use a 6% opacity version of `primary`.
- **Blur:** Large and diffused (e.g., `box-shadow: 0 20px 40px rgba(0, 10, 30, 0.06)`).
- **The Ghost Border:** If a boundary is needed for accessibility, use `outline_variant` at **15% opacity**. Never use 100% opaque borders.

---

## 5. Components

### Buttons
- **Primary:** `primary_container` background with `on_primary` text. Use `xl` (1.5rem) rounded corners.
- **Secondary (Sunset):** `secondary` background. Use for "Immediate Action" items.
- **Tertiary:** No background, `primary` text with a 2px underline in `secondary_fixed`.

### Cards (The "Astrid" Profile)
- **Styling:** Use `surface_container_low` with `lg` (1rem) rounded corners.
- **Constraint:** No dividers. Use `title-md` for headers and `body-sm` for details, separated by 24px of vertical white space.

### Contact Module (Signature Component)
Incorporate Captain Mikael’s details in a dedicated `primary_container` block.
- **Typography:** Display-SM for the name "Captain Mikael."
- **Action:** Use `secondary_container` for the phone number link to ensure it stands out against the navy sea.

### Input Fields
- **Style:** `surface_container_highest` background, no border. Focus state is a 2px `secondary` bottom-border only.

---

## 6. Do's and Don'ts

### Do
- **Do** use asymmetrical layouts. Let a photo of the archipelago bleed off the right edge of the screen while text sits in the left third.
- **Do** use large margins. The "Nordic" aesthetic thrives on breathing room.
- **Do** treat imagery as hero content. Photos of 'Astrid' should be sharp and high-contrast.

### Don't
- **Don't** use 1px solid black or grey lines to separate content. Use tonal shifts.
- **Don't** use standard 4px "web-default" corner radii. Stick to the `lg` (1rem) and `xl` (1.5rem) values for a friendlier, premium feel.
- **Don't** crowd the "Contact" information. Captain Mikael is the face of the brand; give his details room to be seen as a mark of trust.
- **Don't** use high-saturation "Neon" blues. Stick strictly to the `primary` navy tones.```