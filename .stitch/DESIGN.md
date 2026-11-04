# Design System: Uriah Child Care (licensed child care center, Vineland NJ)

The full brand system lives in [`../../Design-System/`](../../Design-System/README.md) (logo, palette, type, buttons, cards, essence icons).
This file is the short version Claude Code and Stitch build from. The CSS tokens in `src/styles/global.css` match it.

## 1. Visual theme

Warm, safe, playful, ours. The site should feel like walking into a cheerful, clean classroom run by someone who knows your
child by name. Layouts are soft and rounded, colors come straight from the logo, and every page leads with a clear answer
and a "Book a tour" button.

Reference sites Mark picked (Nov 2026) set the layout language:

- **Home hero:** a real photo of the center fading into a dark navy panel, a two-word coral accent in the H1, a white pill
  badge above it, a coral pill CTA with a round arrow, and the phone number next to a round yellow icon.
- **Program cards:** tall, colorful rounded cards by age, photo on top with a wavy edge, a white age chip, "Learn more" link.
- **Photos in playful masks:** blob, arch and circle shapes with an offset color backdrop, plus small doodles (stars, sun,
  hearts, squiggles).
- **"Why choose us":** a checklist of white rounded rows next to a circle photo of Ms. Paulette.
- **Trust strip:** five white tiles with a colored bottom edge.
- Cream page background, white and pastel section bands, navy footer with a wave top.

## 2. Colors

| Token | Hex | Use |
|---|---|---|
| `--coral` | #F48A7D | Primary CTA, accent words, first program |
| `--sage` | #65ADA1 | Secondary buttons, shift care, checks |
| `--sunshine` | #F4C35A | Phone icon, doodles, highlights |
| `--sky` | #5DA7CE | After school, links on dark, map |
| `--navy` | #334350 | Text, hero panel, footer |
| `--cream` | #F8F1E8 | Page background |
| `-50` tints | see global.css | Section bands, chips |
| `-700` shades | see global.css | Text on tints (contrast) |

Text on coral, sky and sage surfaces is `--navy-600` (#263440, 4.8:1 or better); on sunshine it is navy. White text only goes on navy or `--sage-700` (#3D7A6F, 5:1): secondary buttons, the CTA band and icon circles use `--sage-700`, never plain sage. White on plain sage is 2.6:1 and fails WCAG AA.

## 3. Type

- **Display:** Fredoka 600 (headings, buttons, stats). Tight tracking on large sizes.
- **Body:** Quicksand 500/600, 1.05 to 1.15rem, line height 1.6.
- H1 is answer-first and contains the city ("Preschool in Vineland, NJ").

## 4. Components

- Buttons are pills (`.btn`), primary coral with a navy arrow badge, secondary `--sage-700` with white text, light and outline variants on dark.
- Cards: radius 28px (`--radius-xl`), soft shadow, no hard borders.
- Chips: white pills with an icon (ages, hours, address).
- FAQ: white rounded `<details>` rows, first one open.
- Forms: large rounded inputs, choice chips for checkboxes and radios.

## 5. Deliberate exceptions

- The design system says no gradients. The home hero's photo-to-navy fade is the one exception, because it is the main
  pattern in Mark's references. Keep gradients out everywhere else.

## 6. Photo rules

- Real center photos only. No stock children.
- Never publish a photo that shows a child's face without written parent consent. The seed photos are cropped so no child
  appears.
- Don't use the Experience Early Learning logo.
