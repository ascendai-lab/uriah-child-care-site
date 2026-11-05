/**
 * Seed content: the 3 program hubs (GBP categories), the 19 service pages and the 2 city pages.
 * Copy rules: answer first, ages 2.5 and up only, exact NAP, no invented ratios, prices or credentials.
 */
import { faq, img, md, ref, ref1, step } from './lib.mjs'
import { TODAY } from './content-core.mjs'

const slug = (current) => ({ _type: 'slug', current })
const seo = (metaTitle, metaDescription, extra = {}) => ({ _type: 'seoFields', metaTitle, metaDescription, ...extra })
const refs = (...ids) => ids.map(ref)

const IMG = {
  exterior: () => img('exterior-now-enrolling-flags-uriah-child-care-vineland', 'Uriah Child Care building on W Chestnut Ave in Vineland, NJ, with Now Enrolling flags'),
  entrance: () => img('entrance-welcome-sign-uriah-child-care-vineland', 'Welcome sign at the front entrance of Uriah Child Care in Vineland'),
  porch: () => img('entrance-porch-security-camera-uriah-child-care', 'Covered front porch with a security camera at Uriah Child Care'),
  ramp: () => img('accessible-parking-ramp-uriah-child-care-vineland', 'Wheelchair ramp and accessible parking at Uriah Child Care in Vineland'),
  signIn: () => img('lobby-sign-in-area-uriah-child-care-vineland', 'Parent sign-in area in the lobby of Uriah Child Care'),
  lobby: () => img('lobby-waiting-area-uriah-child-care', 'Bright lobby waiting area at Uriah Child Care'),
  restroom: () => img('hallway-accessible-restroom-uriah-child-care', 'Hallway and accessible restroom at Uriah Child Care'),
  kiosk: () => img('brightwheel-check-in-kiosk-uriah-child-care', 'Procare check-in kiosk parents use at drop-off and pickup'),
  paulette: () => img('ms-paulette-senior-owner-uriah-child-care', 'Ms. Paulette, owner of Uriah Child Care'),
  tameca: () => img('tameca-burke-director-uriah-child-care', 'Tameca Burke, director of Uriah Child Care'),
  classroom: () => img('classroom-uriah-child-care-vineland', 'Colorful classroom at Uriah Child Care in Vineland'),
  schedule: () => img('daily-schedule-chart-classroom-uriah-child-care', 'Picture daily schedule chart on a classroom wall at Uriah Child Care'),
  readingRug: () => img('classroom-reading-rug-uriah-child-care-vineland', 'Classroom with an alphabet rug, reading shelves and a horseshoe table at Uriah Child Care'),
  horseshoe: () => img('classroom-horseshoe-table-uriah-child-care', 'Horseshoe learning table and book shelves in a classroom at Uriah Child Care'),
  tables: () => img('classroom-tables-easel-uriah-child-care', 'Classroom tables, an easel and toy shelves at Uriah Child Care in Vineland'),
  sink: () => img('classroom-sink-step-stool-uriah-child-care', 'Child-height classroom sink with a step stool at Uriah Child Care'),
  alphabetRug: () => img('classroom-alphabet-rug-shelves-uriah-child-care', 'Alphabet rug, circle time board and shelves in a classroom at Uriah Child Care'),
  centers: () => img('classroom-learning-centers-uriah-child-care', 'Toy and learning centers in a bright classroom at Uriah Child Care'),
  playRug: () => img('play-rug-toys-uriah-child-care-vineland', 'Colorful play rug with toys and cubbies at Uriah Child Care in Vineland'),
  playHall: () => img('open-play-hall-uriah-child-care', 'Open play hall with a basketball hoop at Uriah Child Care'),
  welcomeTable: () => img('lobby-welcome-table-uriah-child-care', 'Welcome table with forms and flowers in the lobby of Uriah Child Care'),
  springFlag: () => img('exterior-spring-day-care-flag-uriah-child-care-vineland', 'Day Care flag on the front lawn of Uriah Child Care in Vineland on a sunny day'),
  springTree: () => img('exterior-spring-tree-uriah-child-care-vineland', 'Front lawn and flowering tree at Uriah Child Care on W Chestnut Ave'),
  morning: () => img('exterior-morning-uriah-child-care-vineland', 'Uriah Child Care building in Vineland in the morning sun'),
  flag: () => img('day-care-flag-w-chestnut-ave-vineland', 'Day Care flag outside Uriah Child Care on W Chestnut Ave in Vineland'),
  sunset: () => img('evening-parking-sunset-uriah-child-care', 'Accessible parking at Uriah Child Care at sunset'),
  dusk: () => img('front-porch-dusk-uriah-child-care-vineland', 'Front porch and entrance of Uriah Child Care at dusk'),
  buildingRamp: () => img('building-ramp-front-uriah-child-care-vineland', 'Front of Uriah Child Care with the wheelchair ramp'),
  parkingLot: () => img('building-parking-lot-uriah-child-care-vineland', 'Uriah Child Care building and parking lot in Vineland'),
}
export { IMG }

const core = (type, id, fields) => ({
  _id: id,
  _type: type,
  lastReviewed: TODAY,
  needsConfirmation: false,
  ...fields,
})
const service = (id, category, fields) => core('service', `service-${id}`, { ...(category ? { category: ref1(category) } : {}), ...fields })

const earlyDay = [
  step('Arrival', 'From 6 am, parents check in with Procare, and children wash hands and settle in with free play.'),
  step('Breakfast', 'Served from 7:30 to 9 am through the USDA food program (CACFP).'),
  step('Circle time', 'Calendar, weather, letters, numbers and a song to start the day together.'),
  step('Learning centers', 'Play-based activities in language, math, science and art from our Experience Early Learning curriculum.'),
  step('Lunch and rest', 'Lunch at 12 noon, then a quiet rest time.'),
  step('Afternoon', 'Snack at 3 pm, then stories, music and movement, and play with friends until pickup.'),
]

/* ───────────────────────── Program hubs (GBP categories) ───────────────────────── */

export const categories = [
  core('category', 'category-preschool', {
    title: 'Early learning in Vineland, NJ',
    shortTitle: 'Early learning',
    homeHeading: 'Early learning in Vineland',
    slug: slug('early-learning-vineland-nj'),
    order: 1,
    accent: 'coral',
    gbpName: 'Day care center',
    keyword: 'early learning child care vineland nj',
    ageRange: 'Ages 2.5 to 5',
    schedule: 'Monday to Saturday, 6 am to 11 pm. Full-time and part-time.',
    image: IMG.readingRug(),
    intro:
      'Uriah Child Care is a licensed child care center in Vineland, NJ for young children from 2½ to 5. Through play, toddlers and older children learn letters, numbers, colors and how to get along with friends, and 4 and 5-year-olds get ready for kindergarten, guided by Ms. Paulette and our caring staff. We accept NJ childcare subsidy (CCAP) and are open Monday to Saturday.',
    excerpt: 'Toddler care and kindergarten readiness for ages 2.5 to 5, open Monday to Saturday at our licensed Vineland center.',
    highlights: [
      'Play-based curriculum from Experience Early Learning',
      'Circle time every day: calendar, weather, letters and counting',
      'Potty training support for 2½ and 3-year-olds',
      'Kindergarten readiness for 4 and 5-year-olds',
      'Meals and snacks through the USDA food program (CACFP)',
      'NJ childcare subsidy (CCAP) accepted',
    ],
    dayPlan: earlyDay,
    body: md`
## What young children learn with us

Our day follows a play-based curriculum built on Experience Early Learning. Each week has a theme, and children explore it through stories, songs, art, building, pretend play and simple science. A developmental continuum helps us see what each child can do and what to work on next, so your child is never pushed too fast or held back.

Every day starts with circle time: we go over the calendar and the weather, practice letters and numbers, and talk about the day ahead. A picture schedule on the classroom wall helps younger children know what comes next, which makes the day calmer for everyone.

## From toddler to kindergarten-ready

We welcome children from 2½ years old. Our [toddlers](/toddler-care-vineland-nj/) work on talking, sharing, listening and taking turns, and many are still [potty training](/potty-training-daycare-vineland-nj/), which we support together with you. As they turn 4 and 5, children move on to [kindergarten readiness](/kindergarten-readiness-vineland-nj/): writing their name, counting, following two-step directions and getting ready for a full school day.

## Care that fits your work schedule

We are open Monday to Saturday, 6 am to 11 pm, so children can come before an early shift, stay through a late one, or come on Saturday. [Full-time and part-time schedules](/full-time-part-time-daycare-vineland-nj/) are available.

## How to enroll

Call us at [(856) 455-6701](tel:8564556701) or [book a tour](/tour/) to see the classroom and meet Ms. Paulette. We accept [NJ childcare subsidy (CCAP)](/ccap-child-care-vineland-nj/) for families who qualify.
`,
    reviews: refs('review-monique-willoughby', 'review-marcia-antina'),
    faqs: [
      faq('What age can my child start at Uriah?', 'Children can start at 2½ years old. We care for toddlers and young children up to 5, and 4 and 5-year-olds work on kindergarten readiness. School-age children up to 13 join our before and after school care.'),
      faq('Does my child need to be potty trained?', 'No. Many of our 2½ and 3-year-olds are still learning. We work on potty training together with you, using the same routine at home and at the center.'),
      faq('What curriculum do you use?', 'We use a play-based curriculum built on Experience Early Learning, with weekly themes and a developmental continuum of skills in language, math, science, art and social skills.'),
      faq('Is care for young children covered by CCAP?', 'We accept NJ childcare subsidy (CCAP) for families who qualify. Call us and we will walk you through the steps with the Cumberland County agency.'),
    ],
    related: refs('service-toddler-care', 'service-kindergarten-readiness', 'service-play-based-learning', 'service-potty-training'),
    seo: seo('Early Learning in Vineland, NJ | Ages 2.5 to 5 | Uriah Child Care', 'Toddler care and kindergarten readiness in Vineland, NJ for ages 2.5 to 5. Licensed by NJ DCF, open Monday to Saturday, CCAP accepted. Book a tour.'),
  }),

  core('category', 'category-after-school', {
    title: 'After school program in Vineland, NJ',
    shortTitle: 'After school program',
    homeHeading: 'After school program in Vineland',
    slug: slug('after-school-program-vineland-nj'),
    order: 2,
    accent: 'sky',
    gbpName: 'After school program',
    keyword: 'after school program vineland nj',
    ageRange: 'School-age children up to 13',
    schedule: 'Monday to Saturday, 6 am to 11 pm',
    image: IMG.playHall(),
    intro:
      'Uriah Child Care offers before and after school care in Vineland, NJ for school-age children up to 13. Kids get a snack, time for homework and time to play in a safe, licensed center, and we stay open until 11 pm for parents who work late. We accept NJ childcare subsidy (CCAP) for families who qualify.',
    excerpt: 'Before and after school care for school-age kids up to 13, with homework time, snacks and care until 11 pm.',
    highlights: [
      'Before school care from 6 am',
      'After school care until 11 pm, Monday to Saturday',
      'Homework time and help with reading',
      'Afternoon snack through the USDA food program (CACFP)',
      'Licensed by NJ DCF, license ID CCC128557',
      'NJ childcare subsidy (CCAP) accepted',
    ],
    dayPlan: [
      step('After school', 'Kids arrive by school bus or with a parent, wash up and have a snack.'),
      step('Homework time', 'A quiet table for homework and reading, with help when they get stuck.'),
      step('Play', 'Games, art, building and time with friends.'),
      step('Dinner and wind-down', 'Dinner at 6 pm and an evening snack at 9 pm for children staying late, with calm activities until pickup.'),
    ],
    body: md`
## Before and after school care for working parents

School gets out long before most shifts end. Our after school program gives school-age children a safe, familiar place to go, with people who know them. Children up to 13 can come [before school](/before-school-care-vineland-nj/) from 6 am and after school until 11 pm, Monday to Saturday.

## What kids do after school

After a snack, children sit down for [homework time](/homework-help-vineland-nj/). Staff help with reading and checking work, and keep kids on task so homework is done before you pick up. Then it is time to play: games, art, building and time with friends. Children who stay into the evening have dinner and settle down with calm activities.

## Care on days off school and all summer

Many parents still work when school is closed. We offer full-day care on [school closure days](/school-closure-care-vineland-nj/) like holidays, breaks and snow days, and full-day [summer care](/summer-child-care-vineland-nj/).

## Getting to and from school

We don't drive children to or from school, but school buses can pick up and drop off at our center. Ask your school district about a bus stop at 30 W Chestnut Ave. Vineland Public Schools elementary schools such as Gloria M. Sabater Elementary School are close by. Parents can always drop off and pick up at the center too.

## Getting started

Call [(856) 455-6701](tel:8564556701) or [book a tour](/tour/). Tell us your child's school and your work schedule, and we will go over how the days would work. We accept [NJ childcare subsidy (CCAP)](/ccap-child-care-vineland-nj/) for families who qualify.
`,
    reviews: refs('review-rockay-davis', 'review-marcia-antina'),
    faqs: [
      faq('What ages are in the after school program?', 'Our before and after school program is for school-age children up to 13 years old.'),
      faq('How late can my child stay?', 'We are open until 11 pm, Monday to Saturday, so children can stay through a second shift.'),
      faq('Do you help with homework?', 'Yes. After snack, children have homework time at a quiet table, and staff help with reading and checking work.'),
      faq('Can the school bus drop my child off at your center?', 'Yes. School buses can pick up and drop off at our center. Ask your school district about a bus stop at 30 W Chestnut Ave. We do not drive children to or from school ourselves.'),
      faq('Are you open in the summer and when school is closed?', 'Yes. We offer full-day care all summer and on school holidays, breaks and snow days.'),
      faq('Can I use CCAP for after school care?', 'We accept NJ childcare subsidy (CCAP) for families who qualify, including for school-age care. Call us and we will help you with the next steps.'),
    ],
    related: refs('service-before-school', 'service-homework-help', 'service-evening', 'service-ccap'),
    seo: seo('After School Program in Vineland, NJ | Uriah Child Care', 'Before and after school care in Vineland, NJ for kids up to 13. Homework time, snacks and care until 11 pm, Monday to Saturday. CCAP accepted.'),
  }),

  core('category', 'category-shift-care', {
    title: 'Child care in Vineland, NJ for every shift',
    shortTitle: 'Child care for every shift',
    homeHeading: 'Child care for every shift in Vineland',
    slug: slug('child-care-vineland-nj'),
    order: 3,
    accent: 'sage',
    gbpName: 'Child care agency',
    keyword: 'child care vineland nj',
    ageRange: 'Ages 2.5 and up',
    schedule: 'Monday to Saturday, 6 am to 11 pm.',
    image: IMG.ramp(),
    intro:
      'Uriah Child Care is a licensed child care center in Vineland, NJ, open Monday to Saturday from 6 am to 11 pm. We offer early morning, evening and late evening care for children ages 2.5 and up, so parents who work early mornings, evenings and Saturdays have a safe place for their kids. We accept NJ childcare subsidy (CCAP).',
    excerpt: 'Licensed child care open Monday to Saturday, early morning to 11 pm, for ages 2.5 and up.',
    highlights: [
      'Open Monday to Saturday, 6 am to 11 pm',
      'Evening meal for children staying late',
      'Saturday care, 6 am to 11 pm',
      'Full-time and part-time schedules',
      'Ages 2.5 and up',
      'NJ childcare subsidy (CCAP) accepted',
    ],
    body: md`
## Child care that matches your hours

Vineland runs on more than nine-to-five. Parents work at the hospital, in warehouses and food plants, in stores and on farms, and many start before sunrise or finish late at night. Uriah Child Care is open **Monday to Saturday, 6 am to 11 pm**, so your child care can follow your shift instead of the other way around.

## Care from early morning to 11 pm

- [Early morning care](/first-shift-child-care-vineland-nj/) from 6 am.
- [Evening child care](/evening-child-care-vineland-nj/) after work.
- [Late evening care until 11 pm](/late-evening-child-care-vineland-nj/).
- [Saturday daycare](/saturday-daycare-vineland-nj/), 6 am to 11 pm.

Work overnight? Call us at [(856) 455-6701](tel:8564556701) and Ms. Paulette will talk with you about it. If your schedule changes from week to week, see [child care for shift workers](/child-care-for-shift-workers-vineland-nj/).

## Who we care for

We care for children ages 2.5 and up: [toddlers from 2½](/toddler-care-vineland-nj/), [kindergarten readiness](/kindergarten-readiness-vineland-nj/) for 4 and 5-year-olds, and [before and after school care](/after-school-program-vineland-nj/) for school-age kids up to 13.

## A licensed center close to home

We are at 30 W Chestnut Ave in Vineland, and many families drive in from [Millville](/millville-nj/) and [Bridgeton](/bridgeton-nj/). We are [licensed by NJ DCF](/safe-licensed-daycare-vineland-nj/) (license ID CCC128557) and accept [NJ childcare subsidy (CCAP)](/ccap-child-care-vineland-nj/) for families who qualify.
`,
    reviews: refs('review-marcia-antina', 'review-rockay-davis'),
    faqs: [
      faq('What are your hours?', 'We are open Monday to Saturday, 6 am to 11 pm.'),
      faq('Do you offer overnight care?', 'Our posted hours end at 11 pm. If you work overnight and need care after 11 pm, call us at (856) 455-6701 and Ms. Paulette will talk with you about it.'),
      faq('Can my schedule change from week to week?', 'Often, yes. Many of our parents work rotating shifts. Tell us your schedule and we will work out the days and times that fit, as space allows.'),
    ],
    related: refs('service-first-shift', 'service-evening', 'service-weekend', 'service-shift-workers'),
    seo: seo('Child Care in Vineland, NJ, Open Monday to Saturday', 'Licensed child care in Vineland, NJ open Monday to Saturday, 6 am to 11 pm. Early morning to late evening care for ages 2.5 and up. CCAP accepted.'),
  }),
]

/* ───────────────────────── Home-level services ───────────────────────── */

const homeServices = [
  service('toddler-care', null, {
    title: 'Toddler care in Vineland, NJ for ages 2.5 and up',
    shortTitle: 'Toddler care',
    slug: slug('toddler-care-vineland-nj'),
    order: 1,
    accent: 'sunshine',
    gbpName: 'Toddler care',
    keyword: 'toddler daycare vineland nj',
    ageRange: 'From 2½ years',
    schedule: 'Monday to Saturday, 6 am to 11 pm',
    image: IMG.playRug(),
    intro:
      'Uriah Child Care cares for toddlers from 2½ years old at our licensed center in Vineland, NJ. Your little one builds words, makes friends and learns daily routines through play, with potty training support along the way. We are open Monday to Saturday, 6 am to 11 pm, and accept NJ childcare subsidy (CCAP).',
    excerpt: 'Warm, play-based care for toddlers from 2½, with potty training support and care Monday to Saturday.',
    highlights: ['Children from 2½ years old', 'Talking, sharing and taking turns', 'Potty training support', 'Daily routine with a picture schedule', 'Meals and snacks (CACFP)', 'Updates through the Procare app'],
    dayPlan: [
      step('Arrival', 'From 6 am, parents check in with Procare, and your toddler washes hands and warms up with free play.'),
      step('Breakfast', 'Served from 7:30 to 9 am through the USDA food program (CACFP).'),
      step('Circle time', 'A short circle with songs, colors and new words, sized for younger children.'),
      step('Play and potty breaks', 'Hands-on play in small groups, with regular bathroom trips for children who are potty training.'),
      step('Lunch and rest', 'Lunch at 12 noon, then a quiet rest time.'),
      step('Afternoon', 'Snack at 3 pm, then stories, music and play until pickup.'),
    ],
    body: md`
## Care for your 2½-year-old

Two-and-a-half is a big age. Toddlers are learning new words every day, wanting to do things themselves, and figuring out how to play with other children. Our toddler care gives them a calm, predictable day with lots of play, songs and stories, and adults who get down on their level.

## Learning to talk, share and play

One mom wrote that her son "learned how to communicate his words better because of Ms. Paulette." We model words all day, read together, and help toddlers use words instead of grabbing or crying when they are frustrated.

## Potty training, together

Many children who join us at 2½ are still in diapers or pull-ups. We follow your routine and [support potty training](/potty-training-daycare-vineland-nj/) at the center, so your child hears the same words and steps everywhere.

## Meals for little eaters

Toddlers eat breakfast from 7:30 to 9 am, lunch at 12 noon and a snack at 3 pm, all through the USDA food program (CACFP), with portions sized for their age. Lunch might be a chicken patty with whole-grain rotini and green beans, or meatloaf with a corn muffin and broccoli.

## A small center, familiar faces

We are licensed by NJ DCF for up to 33 children, so your toddler sees the same faces every day: Ms. Paulette, who has cared for Vineland and Millville children since 2005, and our director, Tameca Burke. Every staff member must have CPR and first aid training before we hire them.

## Next steps

As they grow, toddlers move on to [kindergarten readiness](/kindergarten-readiness-vineland-nj/). [Book a tour](/tour/) or call [(856) 455-6701](tel:8564556701).
`,
    reviews: refs('review-monique-willoughby', 'review-marcia-antina'),
    faqs: [
      faq('What is the youngest age you take?', 'We care for children from 2½ years old.'),
      faq('My toddler has never been to daycare. How do you help them settle in?', 'We keep the first days calm and predictable, and you are welcome to stay for a few minutes at drop-off. We let you know how your child is doing so you are not left wondering.'),
      faq('Do toddlers nap?', 'Yes. After lunch there is a quiet rest time. Bring a small blanket or comfort item if your child uses one.'),
    ],
    related: refs('category-preschool', 'service-potty-training', 'service-play-based-learning', 'service-ccap'),
    seo: seo('Toddler Care in Vineland, NJ | Ages 2.5+ | Uriah Child Care', 'Toddler daycare in Vineland, NJ from 2½ years old. Play-based learning, potty training support, open Monday to Saturday, 6 am to 11 pm. CCAP accepted.'),
  }),

  service('ccap', null, {
    title: 'Child care in Vineland that accepts NJ subsidy (CCAP)',
    shortTitle: 'CCAP child care',
    slug: slug('ccap-child-care-vineland-nj'),
    order: 2,
    accent: 'sage',
    gbpName: 'Child care subsidy accepted',
    keyword: 'daycare that accepts ccap vineland nj',
    ageRange: 'Ages 2.5 and up',
    image: IMG.welcomeTable(),
    intro:
      'Yes, Uriah Child Care accepts NJ childcare subsidy (CCAP) for families who qualify. Our licensed center at 30 W Chestnut Ave in Vineland, NJ cares for children ages 2.5 and up, Monday to Saturday from 6 am to 11 pm. We are happy to walk you through the steps to apply and use your subsidy with us.',
    excerpt: 'We accept NJ childcare subsidy (CCAP) for families who qualify, and we can walk you through the steps.',
    highlights: ['NJ childcare subsidy (CCAP) accepted', 'Help with the next steps', 'Care for every shift, Monday to Saturday', 'Ages 2.5 and up'],
    body: md`
## We accept NJ childcare subsidy

The New Jersey Child Care Assistance Program (CCAP) helps working families, and families in school or training, pay for child care. Uriah Child Care accepts CCAP for families who qualify, for toddler care, kindergarten readiness and before and after school care.

## How CCAP works in Cumberland County

In Cumberland County, CCAP is managed by the local child care resource and referral agency, Rutgers Southern Regional CCR&R. Its Vineland office is at 415 W Landis Ave, Suite 202, and you can call them at [(856) 462-6800](tel:8564626800). You apply through the state's Child Care Assistance Program, and the agency decides eligibility and your family's share of the cost. Rules and income limits are set by the state and can change, so check the official [NJ Child Care Assistance Program](https://www.childcarenj.gov/) website for the latest.

## How we help

- We explain what to bring and who to contact.
- Once you are approved, we help you choose a schedule that fits your work hours.
- If your schedule changes, tell us and we will help you update it.

## Questions about cost?

See [tuition and how to pay](/tuition/), call us at [(856) 455-6701](tel:8564556701), or [book a tour](/tour/).
`,
    faqs: [
      faq('Do you accept CCAP?', 'Yes. We accept NJ childcare subsidy (CCAP) for families who qualify.'),
      faq('Who decides if I qualify?', 'The state program and the county agency decide eligibility and your share of the cost. In Cumberland County that is Rutgers Southern Regional CCR&R in Vineland, (856) 462-6800. We can help you with the next steps.'),
      faq('Can I use CCAP for evening or Saturday care?', 'Care has to fit what your subsidy approval covers. Tell us your work schedule and we will go over it with you.'),
    ],
    related: refs('page-tuition', 'category-shift-care', 'category-preschool', 'page-tour'),
    seo: seo('Daycare That Accepts CCAP in Vineland, NJ | Uriah Child Care', 'Uriah Child Care in Vineland, NJ accepts NJ childcare subsidy (CCAP) for families who qualify. Ages 2.5+, open Monday to Saturday. We help with the steps.'),
  }),

  service('meals', null, {
    title: 'Daycare meals and snacks in Vineland, NJ',
    shortTitle: 'Meals and snacks',
    slug: slug('daycare-meals-vineland-nj'),
    order: 3,
    accent: 'sunshine',
    gbpName: 'Meals provided',
    keyword: 'daycare meals vineland nj',
    ageRange: 'Ages 2.5 and up',
    image: IMG.schedule(),
    intro:
      'Children at Uriah Child Care in Vineland, NJ are served meals and snacks during the day. We participate in the USDA Child and Adult Care Food Program (CACFP), which sets nutrition standards for what we serve. Tell us about allergies or special diets when you enroll, and we will plan around them.',
    excerpt: 'Meals and snacks through the USDA Child and Adult Care Food Program (CACFP), with allergies planned for.',
    highlights: ['USDA food program (CACFP) participant', 'Meals and snacks during the day', 'Allergies and special diets planned for', 'Handwashing before every meal'],
    body: md`
## Meals through the USDA food program

We participate in the USDA Child and Adult Care Food Program (CACFP). The program sets standards for the meals and snacks child care centers serve, such as fruits, vegetables, whole grains, protein and milk, and it helps us serve them.

## What a day of meals looks like

Meals are served at the same times every day, Monday to Saturday:

- **Breakfast:** 7:30 to 9 am
- **Lunch:** 12 noon
- **Afternoon snack:** 3 pm
- **Dinner:** 6 pm, for children staying into the evening
- **Evening snack:** 9 pm, for children staying late

Children wash their hands before every meal, and we eat together at the table.

## A sample of our menu

Our menu changes every month. Here are some of the meals on our November 2026 menu:

- **Breakfast:** a whole-grain banana muffin with honeydew melon, a yogurt parfait with blueberries and granola, or whole-grain cereal with peaches or pears
- **Lunch:** arroz con pollo with brown rice and mixed vegetables, chicken fajitas with bell peppers, turkey with gravy, brown rice and broccoli, or vegetable chili with quinoa
- **Snack:** apple slices with a banana-cinnamon chickpea spread, yogurt with banana slices, or cheddar cheese with whole-grain crackers

Breakfast and lunch come with milk.

And every week, the children look forward to **Watermelon Wednesday**.

## Who prepares our meals

Our meals are made by a licensed local food vendor and delivered following Vineland Health Department and New Jersey licensing rules. We have a Certified Food Protection Manager on staff, and we follow food safety rules for storing, holding and serving food at the right temperature. Weekly menus are posted for families. Because of these rules, breakfast can't be brought from home, and birthday treats need to be store-bought, labeled with their ingredients and okayed with us first.

## Allergies and special diets

If your child has a food allergy, a medical condition or a special diet, bring a note from your child's doctor and we will fill out an Allergy Action Plan together and keep it on file. We plan your child's meals around it, and staff can see it at every meal. Let us know before your child's first day, and tell us if anything changes.

We encourage children to try new foods, but we never force them.

## Questions

Ask about our menus when you [book a tour](/tour/), or call [(856) 455-6701](tel:8564556701).
`,
    faqs: [
      faq('Do I need to pack lunch?', 'Meals and snacks are served during the day through the USDA food program (CACFP). Ask us at enrollment about anything your child needs from home.'),
      faq('What time are meals served?', 'Breakfast is from 7:30 to 9 am, lunch is at 12 noon, snack is at 3 pm, dinner is at 6 pm and the evening snack is at 9 pm.'),
      faq('Can you handle food allergies?', 'Yes. Bring a note from your child’s doctor, and we will complete an Allergy Action Plan with you and plan meals around it.'),
    ],
    related: refs('service-safe-licensed', 'category-preschool', 'service-evening', 'page-faq'),
    seo: seo('Daycare Meals in Vineland, NJ | CACFP | Uriah Child Care', 'Meals and snacks for children at Uriah Child Care in Vineland, NJ through the USDA food program (CACFP). Allergies planned for. Book a tour.'),
  }),

  service('safe-licensed', null, {
    title: 'Safe, licensed daycare in Vineland, NJ',
    shortTitle: 'Safety and licensing',
    slug: slug('safe-licensed-daycare-vineland-nj'),
    order: 4,
    accent: 'sky',
    gbpName: 'Licensed child care center',
    keyword: 'licensed daycare vineland nj',
    ageRange: 'Ages 2.5 and up',
    image: IMG.porch(),
    intro:
      'Uriah Child Care is licensed by the New Jersey Department of Children and Families as a child care center, license ID CCC128557. Parents check children in and out on the Procare app, children are released only to adults you authorize, and Ms. Paulette is certified in pediatric First Aid and CPR/AED.',
    excerpt: 'Licensed by NJ DCF (CCC128557), with secure Procare check-in and release only to authorized adults.',
    highlights: ['Licensed by NJ DCF, license ID CCC128557', 'Procare check-in and check-out', 'Release only to authorized adults', 'CPR and first aid trained staff', 'Security camera at the entrance', 'Wheelchair accessible entrance and parking'],
    body: md`
## Licensed by NJ DCF

We are licensed by the New Jersey Department of Children and Families (DCF) as a child care center, license ID **CCC128557**. Our license and the state's information for parents are posted in the lobby, and you can look up any licensed center in New Jersey through the state's child care search.

## Safe drop-off and pickup

- Parents check in and out with **Procare**.
- We release children only to parents and adults you authorize in writing, and we ask for photo ID from anyone we don't know, even grandparents.
- The front door stays locked. Only staff can let visitors in, so ring the bell when you arrive. Parents are welcome to visit any time we are open.
- A security camera watches the front entrance.

## Health and safety every day

Children wash their hands when they arrive, before meals and after using the bathroom. Ms. Paulette is certified in pediatric First Aid and CPR/AED, and every staff member must have CPR and first aid training before we hire them. Our director, Tameca Burke, has about five years of experience in child care. We use positive discipline: clear rules, redirection and praise, and never physical punishment or shaming.

## Open with parents

All of our staff are mandated reporters under New Jersey law. Our licensing notebook, with the state's inspection reports, is in the office, and you are welcome to read it any time we are open. You can also ask to see your own child's records.

## Built for every family

Our building has a wheelchair ramp, accessible parking and an accessible restroom. Come see it for yourself: [book a tour](/tour/) or call [(856) 455-6701](tel:8564556701).
`,
    reviews: refs('review-monique-willoughby', 'review-rockay-davis'),
    faqs: [
      faq('Is Uriah Child Care licensed?', 'Yes. We are licensed by the NJ Department of Children and Families as a child care center, license ID CCC128557.'),
      faq('How do you keep track of who picks up?', 'Parents check in and out with Procare, and we release children only to adults you authorize in writing. We ask for ID from anyone we do not know.'),
      faq('How do you handle discipline?', 'We use positive discipline: clear, simple rules, redirection and praise. We never use physical punishment, shaming or withholding food.'),
      faq('Are your staff trained in CPR and first aid?', 'Yes. Every staff member must have CPR and first aid training before we hire them, and Ms. Paulette is certified in pediatric First Aid and CPR/AED.'),
    ],
    related: refs('page-our-center', 'page-about', 'service-meals', 'page-faq'),
    seo: seo('Licensed Daycare in Vineland, NJ', 'Uriah Child Care is a licensed child care center in Vineland, NJ (NJ DCF license CCC128557). Procare check-in and safe, secure pickup.'),
  }),
]

/* ───────────────────────── Early learning services ───────────────────────── */

const earlyServices = [
  service('kindergarten-readiness', 'category-preschool', {
    title: 'Kindergarten readiness in Vineland, NJ',
    shortTitle: 'Kindergarten readiness',
    slug: slug('kindergarten-readiness-vineland-nj'),
    order: 2,
    accent: 'sunshine',
    gbpName: 'Kindergarten readiness',
    keyword: 'kindergarten readiness vineland nj',
    ageRange: 'Ages 4 to 5',
    image: IMG.alphabetRug(),
    intro:
      'At Uriah Child Care in Vineland, NJ, we get 4 and 5-year-olds ready for kindergarten with the skills teachers look for: knowing letters and sounds, counting, writing their name, following directions and getting along with classmates. It all happens through play in our licensed center, open Monday to Saturday.',
    excerpt: 'The skills kindergarten teachers look for, built through play: letters, counting, routines and making friends.',
    highlights: ['Letters, sounds and early reading', 'Counting and number sense', 'Holding a pencil and writing their name', 'Routines, listening and following directions', 'Making friends and solving problems'],
    body: md`
## What "ready for kindergarten" means

Kindergarten readiness is more than ABCs. Teachers also look for children who can sit for a story, follow a routine, ask for help, take care of their things and get along with others. We work on all of it, every day.

## How we build school skills

- **Early reading:** letter games, rhymes and reading aloud, plus finding letters from their own name.
- **Early math:** counting real objects, sorting, patterns and comparing more and less.
- **Fine motor:** crayons, scissors, play dough and puzzles, which build the hand strength for writing.
- **Routines:** a picture schedule, clean-up time, lining up and handwashing, just like school.
- **Social skills:** sharing, taking turns and using words to solve problems.

## Keeping you in the loop

We share how your child is doing and what to practice at home, through the Procare app and at pickup.

## Getting ready for a Vineland school

Many Vineland children go on to Vineland Public Schools elementary schools such as Gloria M. Sabater, Pauline J. Petway, Marie Durand or Dr. William Mennies Elementary School. Kindergarten registration is run by the school district, so check its website in the spring before your child starts. If your child will stay with us before or after school, our [before and after school care](/after-school-program-vineland-nj/) keeps the same faces in their week.

## Who teaches your child

Ms. Paulette has cared for local children since 2005, and our director, Tameca Burke, has about five years of experience in child care. Ms. Paulette is certified in pediatric First Aid and CPR/AED, and every staff member must have CPR and first aid training before we hire them.

## A full day around your shift

School skills are built into a full child care day. Your child can arrive at 6 am and stay into the evening, or come on Saturday, so you don't have to piece together care around a short school day.

## Learn more

See [early learning at Uriah](/early-learning-vineland-nj/) and our [play-based curriculum](/play-based-learning-vineland-nj/), or [book a tour](/tour/) and ask Ms. Paulette how she prepares children for school.
`,
    faqs: [faq('When should my child start getting ready for kindergarten?', 'The year or two before kindergarten, around age 4, is a great time. School skills start even earlier, through play, from age 2½.')],
    related: refs('category-preschool', 'service-play-based-learning', 'service-toddler-care', 'category-after-school'),
    seo: seo('Kindergarten Readiness in Vineland, NJ | Uriah Child Care', 'Get your 4 or 5-year-old ready for kindergarten in Vineland, NJ: letters, counting, routines and social skills, built through play. Book a tour.'),
  }),

  service('play-based-learning', 'category-preschool', {
    title: 'Play-based learning curriculum in Vineland, NJ',
    shortTitle: 'Play-based learning',
    slug: slug('play-based-learning-vineland-nj'),
    order: 3,
    accent: 'sage',
    gbpName: 'Play-based curriculum',
    keyword: 'play based learning vineland nj',
    ageRange: 'Ages 2.5 to 5',
    image: IMG.centers(),
    intro:
      'Uriah Child Care in Vineland, NJ uses a play-based curriculum built on Experience Early Learning. Children learn language, math, science, art and social skills through hands-on play, weekly themes and daily circle time, and a developmental continuum helps us track each child’s progress.',
    excerpt: 'Our Experience Early Learning curriculum: weekly themes, hands-on play and a skills continuum for each child.',
    highlights: ['Experience Early Learning curriculum', 'Weekly themes', 'Daily circle time', 'Developmental continuum of skills', 'Language, math, science and art'],
    dayPlan: earlyDay,
    body: md`
## Why play-based learning works

Young children learn by touching, building, pretending and asking questions. Play-based learning uses that. Instead of worksheets, children count blocks, mix colors, act out stories and talk with friends, and they learn more because they care about what they are doing.

## Our curriculum: Experience Early Learning

We use a curriculum built on Experience Early Learning. Each week brings a theme with planned activities in:

- **Language and literacy:** stories, songs, rhymes and letter play
- **Math:** counting, sorting, shapes and patterns
- **Science:** simple experiments, nature and the five senses
- **Art and music:** painting, building, dancing and singing
- **Social and emotional skills:** sharing, feelings and solving problems

A developmental continuum lets us see where each child is and plan the next step, so learning fits your child.

## Circle time every day

Each morning starts at circle time with the calendar, the weather, letters and counting. It builds the routines children will use in school.

## How you'll know what your child did

At pickup we tell you about your child's day, and the Procare app keeps you posted with updates. If your child built something they are proud of or learned a new song, you'll hear about it, so you can talk about it on the drive home.

## See it in action

[Book a tour](/tour/) to see our classroom, or read about [early learning](/early-learning-vineland-nj/) and [kindergarten readiness](/kindergarten-readiness-vineland-nj/).
`,
    faqs: [faq('Is play-based learning enough to prepare my child for school?', 'Yes. Through play, children build the language, math, fine motor and social skills kindergarten teachers look for. Our curriculum plans those skills week by week.')],
    related: refs('category-preschool', 'service-kindergarten-readiness', 'service-toddler-care'),
    seo: seo('Play-Based Learning in Vineland, NJ', 'Our play-based curriculum built on Experience Early Learning: weekly themes, circle time and a skills continuum for ages 2.5 to 5 in Vineland, NJ.'),
  }),

  service('potty-training', 'category-preschool', {
    title: 'Potty training support at our Vineland daycare',
    shortTitle: 'Potty training support',
    slug: slug('potty-training-daycare-vineland-nj'),
    order: 4,
    accent: 'sky',
    gbpName: 'Potty training support',
    keyword: 'daycare potty training vineland nj',
    ageRange: 'Ages 2.5 to 4',
    image: IMG.sink(),
    intro:
      'Your child does not need to be potty trained to join Uriah Child Care in Vineland, NJ. We care for children from 2½ and support potty training together with parents, using the same words and routine at home and at the center, with patience and lots of praise.',
    excerpt: 'No need to be potty trained. We work on it with you, with the same routine at home and at the center.',
    highlights: ['Children do not need to be potty trained', 'Same routine at home and at the center', 'Regular bathroom breaks', 'Patience and praise, never shame'],
    body: md`
## Your child does not need to be potty trained

Many of our 2½ and 3-year-olds are still in diapers or pull-ups when they start. That's normal, and we're happy to help.

## How long potty training usually takes

Every child is different. Toilet training often starts somewhere between 21 and 36 months, and only about 40 to 60 percent of children are fully trained by their third birthday, according to a review in the journal of the [American Academy of Family Physicians](https://www.aafp.org/pubs/afp/issues/2008/1101/p1059.html). Staying dry at night usually comes later than staying dry during the day. Starting earlier doesn't always mean finishing earlier, so we follow your child's readiness signs, like staying dry for a couple of hours, telling you about a wet diaper or showing interest in the toilet.

## How we work on it together

- We talk with you about the words and steps you use at home, and use the same ones.
- Children get regular bathroom breaks and gentle reminders.
- We celebrate every success and treat accidents calmly. We never shame a child.
- We tell you how the day went so you can keep going at home.

## What to bring

Diapers or pull-ups, plus two or three changes of clothes, all labeled with your child's name. We provide the wipes. Clothes that are easy to pull down help a lot: overalls and lots of snaps slow little ones down.

## Questions?

Ask us when you [book a tour](/tour/), or see our [toddler care](/toddler-care-vineland-nj/) program.
`,
    faqs: [
      faq('What should I pack for potty training?', 'Diapers or pull-ups and two or three labeled changes of clothes. We provide the wipes, and we will tell you if you run low on anything.'),
      faq('Does my child have to be potty trained to start?', 'No. We care for children from 2½, and many start in diapers or pull-ups. We work on potty training together with you.'),
      faq('How will I know how potty training went today?', 'We tell you at pickup, and parents get updates through the Procare app. You can always call us too.'),
    ],
    related: refs('service-toddler-care', 'category-preschool', 'service-play-based-learning', 'page-faq'),
    seo: seo('Potty Training Daycare in Vineland, NJ', 'No need to be potty trained to start at Uriah Child Care in Vineland, NJ. We support potty training together with parents, from 2½ years.'),
  }),
]

/* ───────────────────────── After school services ───────────────────────── */

const afterSchoolServices = [
  service('before-school', 'category-after-school', {
    title: 'Before school care in Vineland, NJ',
    shortTitle: 'Before school care',
    slug: slug('before-school-care-vineland-nj'),
    order: 1,
    accent: 'sunshine',
    gbpName: 'Before school care',
    keyword: 'before school care vineland nj',
    ageRange: 'School-age children up to 13',
    schedule: 'From 6 am, Monday to Saturday',
    image: IMG.morning(),
    intro:
      'Uriah Child Care opens at 6 am, so school-age children in Vineland, NJ have a safe, warm place to start the day before school. Breakfast is served from 7:30 am, and kids get a quiet start before school. We accept NJ childcare subsidy (CCAP) for families who qualify.',
    excerpt: 'Drop off from 6 am. Breakfast and a calm start to the day before school.',
    highlights: ['Drop-off from 6 am', 'Breakfast through the USDA food program (CACFP)', 'Quiet time and reading', 'Ages up to 13'],
    dayPlan: [
      step('Arrival', 'From 6 am, check in with Procare. Children wash hands and settle in.'),
      step('Quiet start', 'Books, puzzles, or reading and homework left over from last night.'),
      step('Breakfast', 'Served from 7:30 to 9 am through the USDA food program (CACFP).'),
      step('Off to school', 'Parents take children to school. School buses can also stop at the center.'),
    ],
    body: md`
## A calm start before school

If your shift starts before the school day, bring your child to us from 6 am. They can finish a little reading or homework, have breakfast if they are still here at 7:30, and relax with friends until it's time for school.

## What the morning looks like

Doors open at 6 am. Parents check in with Procare, and children wash their hands and settle in with books, puzzles or quiet play. Breakfast is served from 7:30 to 9 am through the USDA food program (CACFP). A typical breakfast is whole-grain cereal or a muffin with fruit, like peaches or cantaloupe, and milk.

## Schools near the center

Our center is at 30 W Chestnut Ave in Vineland. Gloria M. Sabater Elementary School is close by, and Compass Academy Charter School is also on W Chestnut Ave. Wherever your child goes to school, school buses can pick up at our center, so ask your district about a stop here.

## Getting to and from school

Parents drop off and pick up at the center, and we do not drive children to or from school. School buses can stop at the center, so ask your school district whether your child's bus can pick up and drop off here.

## After school too

Many families pair before school care with our [after school program](/after-school-program-vineland-nj/). Call [(856) 455-6701](tel:8564556701) or [book a tour](/tour/).
`,
    faqs: [
      faq('What time can I drop off before school?', 'We open at 6 am, Monday to Saturday.'),
      faq('Can the school bus pick my child up here?', 'Yes. School buses can pick up and drop off at our center, so ask your school district about a stop at 30 W Chestnut Ave. We do not drive children to or from school ourselves.'),
    ],
    related: refs('category-after-school', 'service-first-shift', 'service-homework-help', 'service-meals'),
    seo: seo('Before School Care in Vineland, NJ', 'Before school care in Vineland, NJ from 6 am, with breakfast and a calm start to the day. School-age kids up to 13. CCAP accepted.'),
  }),

  service('homework-help', 'category-after-school', {
    title: 'After school homework help in Vineland, NJ',
    shortTitle: 'Homework help',
    slug: slug('homework-help-vineland-nj'),
    order: 2,
    accent: 'sky',
    gbpName: 'Homework help',
    keyword: 'after school homework help vineland nj',
    ageRange: 'School-age children up to 13',
    image: IMG.tables(),
    intro:
      'Children in the Uriah Child Care after school program in Vineland, NJ get daily homework time at a quiet table, with staff who help with reading and check that work gets done. That means less homework stress at night for parents coming home from work.',
    excerpt: 'Daily homework time with help on reading and checking work, so evenings are easier at home.',
    highlights: ['Daily homework time after snack', 'Help with reading', 'Work checked before play', 'Less homework stress at night'],
    body: md`
## Homework done before you get home

After school and a snack, children sit down at a quiet table for homework time. Staff help with reading, explain directions and check that work is finished before play.

## Help with reading

Younger children can read aloud to staff or to a friend. Older children can ask for help with words, spelling and understanding what they read.

## Working with you

If your child's teacher sends notes or a reading log, put it in their bag and tell us. We'll keep you posted through the Procare app.

## Homework help on every shift

Homework help isn't only for the hour after school. Children who stay into the evening, or come in on a Saturday with a project due, can get help whenever they need it, on every shift until we close at 11 pm. Kids who stay late have dinner at 6 pm and an evening snack at 9 pm, so nobody is doing math on an empty stomach.

## Getting here from school

School buses can pick up and drop off at our center at 30 W Chestnut Ave, so ask your school district about a stop here. Gloria M. Sabater Elementary School is close by, and Compass Academy Charter School is also on W Chestnut Ave. Parents can always drop off and pick up at the center too.

See our full [after school program](/after-school-program-vineland-nj/) or [book a tour](/tour/).
`,
    faqs: [
      faq('Do you make sure homework is finished?', 'We set aside homework time every day and check work before play. Let us know if there is something specific your child needs to finish.'),
      faq('What ages come to homework help?', 'Homework time is part of our after school program for school-age children up to 13.'),
      faq('Can the school bus drop my child off here?', 'Yes. School buses can pick up and drop off at our center, so ask your school district about a stop at 30 W Chestnut Ave. We do not drive children to or from school ourselves.'),
      faq('Do you accept CCAP for after school care?', 'Yes. We accept NJ childcare subsidy (CCAP) for families who qualify.'),
    ],
    related: refs('category-after-school', 'service-before-school', 'service-evening', 'service-kindergarten-readiness'),
    seo: seo('Homework Help in Vineland, NJ', 'Daily homework time and reading help in our after school program in Vineland, NJ. Kids up to 13, care until 11 pm, CCAP accepted.'),
  }),

  service('summer-care', 'category-after-school', {
    title: 'Summer child care in Vineland, NJ',
    shortTitle: 'Summer care',
    slug: slug('summer-child-care-vineland-nj'),
    order: 3,
    accent: 'sunshine',
    gbpName: 'Summer care',
    keyword: 'summer child care vineland nj',
    ageRange: 'School-age children up to 13',
    schedule: 'Full days all summer, Monday to Saturday, 6 am to 11 pm',
    image: IMG.springFlag(),
    intro:
      'Uriah Child Care offers summer child care in Vineland, NJ for school-age children up to 13. When school is out, kids spend full days with us at our licensed center, open Monday to Saturday from 6 am to 11 pm, with meals, play and learning to keep them busy. We accept NJ childcare subsidy (CCAP) for families who qualify.',
    excerpt: 'Full-day summer care for school-age kids up to 13, Monday to Saturday, 6 am to 11 pm.',
    highlights: ['Full days when school is out', 'Open Monday to Saturday, 6 am to 11 pm', 'Meals and snacks (CACFP)', 'Reading, games, art and play', 'Ages up to 13', 'NJ childcare subsidy (CCAP) accepted'],
    dayPlan: [
      step('Morning', 'Breakfast, then reading time to keep skills sharp over the summer.'),
      step('Late morning', 'Art, building, games and group activities.'),
      step('Lunch and quiet time', 'Lunch together, then a calm break with books and quiet games.'),
      step('Afternoon', 'Snack and play with friends until pickup.'),
    ],
    body: md`
## Summer care for school-age kids

Summer break is long when you still have to work. Our summer care gives school-age children up to 13 a safe, familiar place to spend full days, with the same caring staff they know from our [after school program](/after-school-program-vineland-nj/).

## What a summer day looks like

Children have breakfast, lunch and snacks through the USDA food program (CACFP). We mix reading time with art, building, games and time with friends, so kids stay busy and keep their skills up before the new school year.

## Meals all summer

Summer days are long, so meals come at set times: breakfast from 7:30 to 9 am, lunch at 12 noon and a snack at 3 pm, plus dinner at 6 pm for kids who stay into the evening. Lunches are real meals, like arroz con pollo with brown rice or chicken fajitas with peppers, served through the USDA food program (CACFP).

## Reading and homework help

If your child has a summer reading list or packet from school, send it in. Homework help is available on every shift, so kids can chip away at it before playtime.

## Hours that fit your job

We are open **Monday to Saturday, 6 am to 11 pm** all summer, including evenings and Saturdays for parents who work [shifts](/child-care-vineland-nj/).

## Save a spot

Space can fill up before summer, so call [(856) 455-6701](tel:8564556701) or [book a tour](/tour/) early. We accept [NJ childcare subsidy (CCAP)](/ccap-child-care-vineland-nj/) for families who qualify.
`,
    faqs: [
      faq('Do you offer summer care?', 'Yes. School-age children up to 13 can come for full days all summer, Monday to Saturday, 6 am to 11 pm.'),
      faq('Do I need to sign up early for summer?', 'We recommend it. Space can fill up before school lets out, so call us in the spring.'),
      faq('Are meals included in summer care?', 'Yes. Children are served meals and snacks through the USDA food program (CACFP).'),
    ],
    related: refs('category-after-school', 'service-school-closure', 'service-meals', 'category-shift-care'),
    seo: seo('Summer Child Care in Vineland, NJ', 'Full-day summer child care in Vineland, NJ for school-age kids up to 13. Open Monday to Saturday, 6 am to 11 pm, meals included. CCAP accepted.'),
  }),

  service('school-closure', 'category-after-school', {
    title: 'Child care on school closure days in Vineland',
    shortTitle: 'School closure days',
    slug: slug('school-closure-care-vineland-nj'),
    order: 4,
    accent: 'sky',
    gbpName: 'School closure care',
    keyword: 'school closure child care vineland nj',
    ageRange: 'School-age children up to 13',
    schedule: 'Full days on school holidays, breaks and snow days',
    image: IMG.flag(),
    intro:
      'School closed but you still have to work? Uriah Child Care offers full-day child care in Vineland, NJ on school holidays, breaks, teacher days and snow days for school-age children up to 13. We are open Monday to Saturday, 6 am to 11 pm, and accept NJ childcare subsidy (CCAP).',
    excerpt: 'Full-day care on school holidays, breaks, teacher days and snow days.',
    highlights: ['School holidays and breaks', 'Teacher in-service days', 'Snow days', 'Full days, 6 am to 11 pm', 'Meals and snacks (CACFP)', 'Ages up to 13'],
    dayPlan: [
      step('Arrival', 'From 6 am. Check in with Procare.'),
      step('Breakfast', 'Served from 7:30 to 9 am through the USDA food program (CACFP).'),
      step('Reading and play', 'Reading and homework time, then art, building and games.'),
      step('Lunch', 'Lunch at 12 noon, with fruit or vegetables and milk.'),
      step('Afternoon', 'Snack at 3 pm and time with friends, with dinner at 6 pm for kids who stay late.'),
    ],
    body: md`
## Care when school is closed

School calendars are full of days off: holidays, winter and spring breaks, teacher in-service days and surprise snow days. Your job doesn't stop for any of them. On those days, school-age children up to 13 can spend the full day with us.

## A full day with familiar faces

Children who come to our [after school program](/after-school-program-vineland-nj/) already know our staff and routine. On closure days they get breakfast, lunch and snacks, reading and homework time, and plenty of play.

## What a closure day looks like

Doors open at 6 am. Breakfast is from 7:30 to 9 am, lunch is at 12 noon and snack is at 3 pm, all through the USDA food program (CACFP). Children who stay late have dinner at 6 pm. Between meals there's reading and homework time, art, building, games and time with friends. Children can stay until 11 pm if you work a late shift.

## Brothers and sisters together

On a day off school, younger siblings in our [toddler care](/toddler-care-vineland-nj/) or [early learning](/early-learning-vineland-nj/) are in the same building, so you make one drop-off and one pickup.

## Plan ahead, or call that morning

We stay open when public schools have a snow day, though we may open a little late. For planned days off, tell us ahead of time. For snow days and other surprises, call [(856) 455-6701](tel:8564556701) as early as you can, and we will fit your child in if we have space.

We accept [NJ childcare subsidy (CCAP)](/ccap-child-care-vineland-nj/) for families who qualify.
`,
    faqs: [
      faq('Are you open when school is closed?', 'Yes. We offer full-day care for school-age children up to 13 on school holidays, breaks, teacher days and snow days.'),
      faq('What about snow days?', 'We stay open on public school snow days, though we may open a little late. Call us as early as you can that morning, and we will fit your child in if we have space.'),
    ],
    related: refs('category-after-school', 'service-summer-care', 'service-before-school', 'category-shift-care'),
    seo: seo('School Closure Day Care in Vineland, NJ', 'Full-day child care in Vineland, NJ on school holidays, breaks and snow days for kids up to 13. Open Monday to Saturday, 6 am to 11 pm. CCAP accepted.'),
  }),
]

/* ───────────────────────── Shift services ───────────────────────── */

const shiftServices = [
  service('first-shift', 'category-shift-care', {
    title: 'Early morning child care in Vineland, NJ',
    shortTitle: 'Early morning care',
    slug: slug('first-shift-child-care-vineland-nj'),
    order: 1,
    accent: 'sunshine',
    gbpName: 'First shift child care',
    keyword: 'early morning daycare vineland nj',
    ageRange: 'Ages 2.5 and up',
    schedule: 'From 6 am, Monday to Saturday',
    image: IMG.entrance(),
    intro:
      'Uriah Child Care opens at 6 am, Monday to Saturday, so parents in Vineland, NJ who work first shift can drop off before work. Children ages 2.5 and up get breakfast and a calm start to their day. We accept NJ childcare subsidy (CCAP).',
    excerpt: 'Drop off from 6 am, Monday to Saturday, with breakfast and a calm start to the day.',
    highlights: ['Open from 6 am', 'Monday to Saturday', 'Breakfast served (CACFP)', 'Ages 2.5 and up'],
    dayPlan: [
      step('6 am drop-off', 'Check in with Procare and head to work.'),
      step('Quiet start', 'Books, puzzles and free play while the center wakes up.'),
      step('Breakfast', 'Served from 7:30 to 9 am through the USDA food program (CACFP).'),
      step('Morning activities', 'Circle time and play-based learning for toddlers and young children. School-age kids leave for school.'),
    ],
    body: md`
## Drop off from 6 am

Many Vineland parents start work at 6 or 7 in the morning. We open at **6 am, Monday to Saturday**, so you can drop off on the way and still get to work on time.

## A gentle morning for your child

Early arrivals get breakfast and a quiet start: books, puzzles and free play while the center wakes up. Toddlers and younger children join circle time and the day's activities, and school-age kids can start the day here with [before school care](/before-school-care-vineland-nj/).

## Breakfast is included

You don't have to feed everyone before a 6 am shift. Breakfast is served from 7:30 to 9 am through the USDA Child and Adult Care Food Program (CACFP). On a typical morning that's whole-grain cereal or a muffin, fresh fruit like cantaloupe, peaches or honeydew, and milk. The menu changes every month.

## Who uses early morning care

Nurses and hospital staff starting at 7 am, warehouse and plant workers on first shift, and anyone who has to be at work before schools and most daycares open. School-age kids can stay with us until it's time for school, and school buses can pick up at the center.

## Fast check-in

Check your child in with Procare and you're on your way.

See all [shift care](/child-care-vineland-nj/), or call [(856) 455-6701](tel:8564556701).
`,
    reviews: refs('review-marcia-antina'),
    faqs: [
      faq('How early do you open?', 'We open at 6 am, Monday to Saturday.'),
      faq('Is breakfast served for early arrivals?', 'Yes. Breakfast is served from 7:30 to 9 am through the USDA Child and Adult Care Food Program (CACFP).'),
      faq('Are you open early on Saturday too?', 'Yes. We open at 6 am on Saturday, the same as weekdays. We are closed on Sunday.'),
      faq('How do I check my child in?', 'Parents check children in and out with Procare.'),
    ],
    related: refs('category-shift-care', 'service-before-school', 'service-shift-workers', 'service-full-part-time'),
    seo: seo('Early Morning Daycare in Vineland, NJ', 'First shift child care in Vineland, NJ. Drop off from 6 am, Monday to Saturday, with breakfast. Ages 2.5 and up. CCAP accepted.'),
  }),

  service('evening', 'category-shift-care', {
    title: 'Evening child care in Vineland, NJ',
    shortTitle: 'Evening care',
    slug: slug('evening-child-care-vineland-nj'),
    order: 2,
    accent: 'coral',
    gbpName: 'Second shift child care',
    keyword: 'evening child care vineland nj',
    ageRange: 'Ages 2.5 and up',
    schedule: 'Evenings, Monday to Saturday, until 11 pm',
    image: IMG.sunset(),
    intro:
      'Uriah Child Care offers evening child care in Vineland, NJ for parents who work second shift. Children ages 2.5 and up get dinner, play and a calm evening routine at our licensed center, which stays open until 11 pm, Monday to Saturday. We accept NJ childcare subsidy (CCAP).',
    excerpt: 'Second shift care with dinner and a calm evening routine, open until 11 pm.',
    highlights: ['Second shift care', 'Open until 11 pm', 'Evening meal served', 'Calm evening routine', 'Ages 2.5 and up'],
    dayPlan: [
      step('Afternoon', 'Snack at 3 pm and play, or homework time for school-age kids.'),
      step('Dinner', 'Dinner at 6 pm through the USDA food program (CACFP).'),
      step('Wind-down', 'Books, quiet games and stories, with an evening snack at 9 pm.'),
      step('Pickup', 'Before we close at 11 pm.'),
    ],
    body: md`
## Care while you work second shift

Second shift is hard on families when child care closes as your shift starts. We stay open **until 11 pm, Monday to Saturday**, so your child can be with people they know while you work.

## A real evening routine

Dinner is at 6 pm. Children go outside when the weather allows, school-age kids get homework help if they need it, and then everyone settles into calm activities like books, puzzles and quiet games. There is an evening snack at 9 pm. We keep the evening low-key so children are ready for bed when you pick them up.

## What's for dinner

Dinner is at 6 pm through the USDA Child and Adult Care Food Program (CACFP). Like every meal we serve, it follows the program's standards: a protein, a whole grain, vegetables or fruit, and milk. Tell us about allergies or special diets when you enroll.

## Safe pickup at night

Pick up any time before we close at 11 pm. You check out with Procare, we release children only to adults you have authorized in writing, and a security camera watches the front entrance.

## For every age we serve

Toddlers and young children from 2½, and school-age children up to 13 coming from our [after school program](/after-school-program-vineland-nj/).

See [late evening care until 11 pm](/late-evening-child-care-vineland-nj/), or [book a tour](/tour/).
`,
    reviews: refs('review-marcia-antina'),
    faqs: [
      faq('Do children get dinner?', 'Yes. Children staying into the evening are served an evening meal through the USDA food program (CACFP).'),
      faq('How late are you open?', 'We are open until 11 pm, Monday to Saturday.'),
      faq('Can school-age children come in the evening?', 'Yes. We care for children ages 2.5 and up, including school-age children up to 13, so older kids can do homework and wind down with us.'),
    ],
    related: refs('service-late-evening', 'category-shift-care', 'service-shift-workers', 'category-after-school'),
    seo: seo('Evening Child Care in Vineland, NJ', 'Second shift child care in Vineland, NJ with dinner and a calm evening routine. Open until 11 pm, Monday to Saturday. Ages 2.5+. CCAP accepted.'),
  }),

  service('late-evening', 'category-shift-care', {
    title: 'Late evening child care in Vineland until 11 pm',
    shortTitle: 'Late evening care',
    slug: slug('late-evening-child-care-vineland-nj'),
    order: 3,
    accent: 'sky',
    gbpName: 'Third shift child care',
    keyword: 'late night daycare vineland nj',
    ageRange: 'Ages 2.5 and up',
    schedule: 'Until 11 pm, Monday to Saturday',
    image: IMG.porch(),
    intro:
      'Uriah Child Care is open until 11 pm, Monday to Saturday, for parents in the Vineland, NJ area who work late. Need care after 11 pm? Call us to talk about it.',
    excerpt: 'Care until 11 pm, Monday to Saturday, for parents who work late.',
    highlights: ['Open until 11 pm', 'Monday to Saturday', 'Dinner served', 'After 11 pm? Call us'],
    dayPlan: [
      step('Dinner', 'Dinner at 6 pm through the USDA food program (CACFP).'),
      step('Outside time', 'Children go outside to play when the weather allows.'),
      step('Homework help', 'School-age kids finish homework, with help if they need it.'),
      step('Evening snack', 'A light snack at 9 pm.'),
      step('Quiet time', 'From 9:30 pm, books and calm play until pickup by 11 pm.'),
    ],
    body: md`
## Child care until 11 pm

If you work late, finding child care in Cumberland County can feel impossible. Uriah Child Care stays open **until 11 pm, Monday to Saturday**.

## Working past 11 pm?

Our posted hours end at 11 pm. Need care after 11 pm for an overnight shift? Call us at [(856) 455-6701](tel:8564556701) and Ms. Paulette will talk with you about it.

## A quiet, safe evening

By late evening the center is calm. Children have had dinner at 6 pm, and they go outside when the weather allows. School-age children get homework help if they need it. The evening snack is at 9 pm and quiet time starts at 9:30 pm, so children are ready for bed when you get them home.

## Safe pickup at night

You check out with Procare, and we release children only to adults you have authorized in writing. A security camera watches the front entrance, and our building has a ramp and accessible parking, which helps when you're carrying a sleepy child.

## Brothers and sisters together

Children from 2½ up to 13 can stay until 11 pm, so younger and school-age siblings can be picked up together at the end of your shift.

Call [(856) 455-6701](tel:8564556701) to talk about your hours, or see [evening child care](/evening-child-care-vineland-nj/).
`,
    faqs: [
      faq('What time do you close?', 'Our posted closing time is 11 pm, Monday to Saturday.'),
      faq('Do you offer overnight care?', 'Our posted hours end at 11 pm. If you work overnight and need care after 11 pm, call us at (856) 455-6701 and Ms. Paulette will talk with you about it.'),
    ],
    related: refs('service-evening', 'category-shift-care', 'service-shift-workers', 'service-weekend'),
    seo: seo('Late Evening Child Care in Vineland, NJ', 'Late evening child care in Vineland, NJ until 11 pm, Monday to Saturday. For parents who work late. Ages 2.5+. CCAP accepted.'),
  }),

  service('weekend', 'category-shift-care', {
    title: 'Saturday daycare in Vineland, NJ',
    shortTitle: 'Saturday daycare',
    slug: slug('saturday-daycare-vineland-nj'),
    order: 4,
    accent: 'sage',
    gbpName: 'Saturday child care',
    keyword: 'saturday daycare vineland nj',
    ageRange: 'Ages 2.5 and up',
    schedule: 'Saturday, 6 am to 11 pm',
    image: IMG.springTree(),
    intro:
      'Uriah Child Care is open on Saturday from 6 am to 11 pm, so parents in Vineland, NJ who work Saturdays have licensed child care they can count on. Children ages 2.5 and up are welcome. We accept NJ childcare subsidy (CCAP). We are closed on Sunday.',
    excerpt: 'Open Saturday, 6 am to 11 pm, for parents who work Saturdays.',
    highlights: ['Open Saturday', '6 am to 11 pm', 'Same caring staff', 'Ages 2.5 and up'],
    body: md`
## Child care on Saturday

Hospitals, stores, restaurants and plants don't close on Saturday, and neither do we. Uriah Child Care is open **Saturday, 6 am to 11 pm**, the same hours as Monday to Friday. We are closed on Sunday.

## The same routine as the rest of the week

Saturdays follow the same routine as weekdays: meals and snacks, play-based learning, rest time and play. Children see familiar faces, which helps when your schedule changes from week to week.

## A Saturday at Uriah

Meals are served at the same times on Saturday as during the week: breakfast from 7:30 to 9 am, lunch at 12 noon, a snack at 3 pm, dinner at 6 pm and an evening snack at 9 pm. Toddlers and younger children have circle time, play-based activities and rest time. School-age kids can get homework help with weekend assignments, on every shift.

## Who Saturday care is for

Nurses working Saturday shifts, retail and restaurant staff, warehouse and plant workers, and any parent who has to work a Saturday. Children can stay until 11 pm on Saturday too. Need care after 11 pm? Call us and Ms. Paulette will talk with you about it.

## Saturdays only, or the whole week

Some families use us only on Saturdays; others every day we are open. See [full-time and part-time daycare](/full-time-part-time-daycare-vineland-nj/), or call [(856) 455-6701](tel:8564556701).
`,
    faqs: [
      faq('Are you open on Sundays?', 'No. We are open Monday to Saturday, 6 am to 11 pm, and closed on Sunday.'),
      faq('Can I use Saturday care only?', 'Yes. Some families use us only on Saturdays and others during the week too. Choose the days you need, as space allows.'),
      faq('Is Saturday care covered by CCAP?', 'We accept NJ childcare subsidy (CCAP) for families who qualify. Ask us and we will help you check what your approval covers.'),
      faq('What ages do you care for on Saturday?', 'The same as every day: children ages 2.5 and up, including school-age children up to 13.'),
    ],
    related: refs('category-shift-care', 'service-shift-workers', 'service-full-part-time', 'service-late-evening'),
    seo: seo('Saturday Daycare in Vineland, NJ', 'Saturday child care in Vineland, NJ, open 6 am to 11 pm. Licensed center for ages 2.5 and up. CCAP accepted. Closed Sunday.'),
  }),

  service('full-part-time', 'category-shift-care', {
    title: 'Full-time and part-time daycare in Vineland, NJ',
    shortTitle: 'Full-time and part-time',
    slug: slug('full-time-part-time-daycare-vineland-nj'),
    order: 5,
    accent: 'coral',
    gbpName: 'Full-time and part-time care',
    keyword: 'part time daycare vineland nj',
    ageRange: 'Ages 2.5 and up',
    image: IMG.classroom(),
    intro:
      'Uriah Child Care in Vineland, NJ offers full-time and part-time child care for children ages 2.5 and up. Choose the days and hours you need between 6 am and 11 pm, Monday to Saturday, and we will build a schedule around your work.',
    excerpt: 'Choose the days and hours you need, between 6 am and 11 pm, Monday to Saturday.',
    highlights: ['Full-time schedules', 'Part-time schedules', 'Pick your days and hours', 'Open Monday to Saturday, 6 am to 11 pm'],
    body: md`
## Care that fits your week

Every family's week looks different. Some parents need care five or more days, some two or three, and some only on certain shifts. We offer **full-time and part-time** child care, and you choose the days and hours you need between 6 am and 11 pm.

## How scheduling works

Tell us your work schedule when you call or tour. We'll set up a regular schedule so your child has a steady routine. If your hours change, talk to us and we'll do our best to adjust, as space allows.

## What every schedule includes

Full-time or part-time, your child gets the same day: meals and snacks at set times through the USDA food program (CACFP), our play-based Experience Early Learning curriculum for toddlers and young children, and homework help for school-age kids on every shift. Your child is with the same small team every time, led by Ms. Paulette and our director, Tameca Burke. You check in and out with Procare, so every drop-off and pickup is on record.

## Schedules we can set up

- Three or four days a week around 12-hour hospital shifts
- Weekday mornings only, or weekday afternoons and evenings
- Saturdays only
- After school until 11 pm for school-age kids

## Cost

Tuition depends on your child's age and schedule. See [tuition and how to pay](/tuition/) and [CCAP](/ccap-child-care-vineland-nj/).
`,
    faqs: [
      faq('Do you offer part-time care?', 'Yes. Choose the days and hours you need between 6 am and 11 pm, Monday to Saturday, as space allows.'),
      faq('How much does full-time or part-time care cost?', "Tuition depends on your child's age, the days and the shift you need. Call us or book a tour and we will give you a clear price for your schedule."),
      faq('Can I change my schedule later?', 'Talk to us when your hours change, and we will do our best to adjust as space allows.'),
      faq('Do you accept CCAP?', 'Yes. We accept NJ childcare subsidy (CCAP) for families who qualify, for full-time and part-time care.'),
    ],
    related: refs('page-tuition', 'service-shift-workers', 'category-shift-care', 'service-ccap'),
    seo: seo('Full & Part-Time Daycare in Vineland, NJ', 'Full-time and part-time child care in Vineland, NJ for ages 2.5+. Pick your days and hours, 6 am to 11 pm, Monday to Saturday. CCAP accepted.'),
  }),

  service('shift-workers', 'category-shift-care', {
    title: 'Child care for shift workers in Vineland, NJ',
    shortTitle: 'For shift workers',
    slug: slug('child-care-for-shift-workers-vineland-nj'),
    order: 6,
    accent: 'sunshine',
    gbpName: 'Child care for shift workers',
    keyword: 'child care for shift workers vineland nj',
    ageRange: 'Ages 2.5 and up',
    schedule: 'Monday to Saturday, 6 am to 11 pm',
    image: IMG.lobby(),
    intro:
      'Uriah Child Care is built for parents in Vineland, NJ who work shifts: nurses, warehouse and plant workers, retail and restaurant staff. We are open Monday to Saturday, early morning to 11 pm, for children ages 2.5 and up, and we accept NJ childcare subsidy (CCAP).',
    excerpt: 'Built for nurses, warehouse, plant, retail and restaurant workers: care 6 am to 11 pm, Monday to Saturday.',
    highlights: ['Early morning to 11 pm', 'Open Monday to Saturday', 'Rotating schedules welcome', 'CCAP accepted'],
    body: md`
## Made for parents who work shifts

Ms. Paulette has spent years helping parents with hard schedules. As one parent wrote, "Ms. Paulette assist us tremendously with our work schedules, and we are thankful for her." Whether you work at a hospital, a warehouse, a food plant, a store or a restaurant, we are open when you are working.

## Every shift, every day

- **Early morning:** [drop off from 6 am](/first-shift-child-care-vineland-nj/)
- **Evening:** [evening care](/evening-child-care-vineland-nj/) with dinner
- **Late evening:** [care until 11 pm](/late-evening-child-care-vineland-nj/)
- **Saturday:** [Saturday daycare](/saturday-daycare-vineland-nj/), same hours

## Rotating and changing schedules

If your schedule rotates, bring it to your tour and we'll work out a plan. Tell us as early as you can when your hours change.

## Meals on every shift

Whatever hours your child is here, meals come at set times through the USDA food program (CACFP): breakfast from 7:30 to 9 am, lunch at 12 noon, a snack at 3 pm, dinner at 6 pm and an evening snack at 9 pm. Tell us about allergies when you enroll.

## Room for the whole family

Brothers and sisters can come together: we care for children from 2½ up to 13, and homework help is available on every shift. We accept [NJ childcare subsidy (CCAP)](/ccap-child-care-vineland-nj/) for families who qualify. In Cumberland County, CCAP is handled by Rutgers Southern Regional CCR&R in Vineland, (856) 462-6800.

[Book a tour](/tour/) or call [(856) 455-6701](tel:8564556701).
`,
    reviews: refs('review-monique-willoughby', 'review-rockay-davis'),
    faqs: [
      faq('My shifts rotate. Can you work with that?', 'Often, yes. Bring your schedule to your tour and we will work out a plan, as space allows.'),
      faq('What are your hours?', 'We are open Monday to Saturday, 6 am to 11 pm.'),
      faq('I work overnight. Can you help?', 'Our posted hours end at 11 pm. If you need care after 11 pm, call us at (856) 455-6701 and Ms. Paulette will talk with you about your schedule.'),
      faq('Do children get meals during long shifts?', 'Yes. Children are served meals and snacks through the USDA Child and Adult Care Food Program (CACFP), including an evening meal for children staying late.'),
    ],
    related: refs('category-shift-care', 'service-first-shift', 'service-evening', 'service-weekend'),
    seo: seo('Shift Worker Child Care in Vineland, NJ', 'Child care for nurses, warehouse and plant workers in Vineland, NJ. Open 6 am to 11 pm, Monday to Saturday. Ages 2.5+. CCAP accepted.'),
  }),
]

export const services = [...homeServices, ...earlyServices, ...afterSchoolServices, ...shiftServices]

/* ───────────────────────── City pages ───────────────────────── */

const city = (id, name, fields) =>
  core('serviceArea', `area-${id}`, {
    city: name,
    state: 'NJ',
    ...fields,
  })

export const cities = [
  city('millville', 'Millville', {
    title: 'Child care for Millville, NJ families',
    shortTitle: 'Millville, NJ',
    slug: slug('millville-nj'),
    order: 1,
    accent: 'sage',
    keyword: 'daycare millville nj',
    driveTime: 'About 15 minutes by car',
    ageRange: 'Ages 2.5 and up',
    schedule: 'Monday to Saturday, 6 am to 11 pm',
    image: IMG.buildingRamp(),
    intro:
      'Uriah Child Care serves Millville, NJ families from our licensed center at 30 W Chestnut Ave in Vineland, about a 15-minute drive. Ms. Paulette cared for Millville children for years before opening the Vineland center. We are open Monday to Saturday, 6 am to 11 pm, for ages 2.5 and up.',
    excerpt: 'Ms. Paulette has cared for Millville children for years. Our Vineland center is about 15 minutes away.',
    highlights: ['About 15 minutes from Millville', 'Open Monday to Saturday, 6 am to 11 pm', 'Ages 2.5 and up', 'NJ childcare subsidy (CCAP) accepted'],
    body: md`
## Ms. Paulette and Millville

Before opening our center in Vineland, Ms. Paulette cared for children in Millville for many years. Families who have known her since then still bring their children to her, and some now bring their grandchildren. One grandmother wrote that Ms. Paulette "has been watching my grand children throughout the years."

## Worth the short drive

Our center at 30 W Chestnut Ave in Vineland is about a 15-minute drive from Millville. Most Millville families drive north on Delsea Drive (Route 47) into Vineland and turn onto W Chestnut Ave. For Millville parents who work in Vineland, it's right on the way. And because we're open **Monday to Saturday, 6 am to 11 pm**, you can find care for [early, evening and Saturday shifts](/child-care-vineland-nj/).

## School-age kids from Millville

Many Millville children go to Millville Public Schools elementary schools such as Rieck Avenue, Mount Pleasant or Silver Run Elementary. Bus routes are set by the district, so ask whether a stop in Vineland is possible. Our [after school program](/after-school-program-vineland-nj/) is open until 11 pm, with homework help on every shift and dinner at 6 pm.

## Programs for Millville families

- [Toddler care](/toddler-care-vineland-nj/) from 2½
- [Early learning](/early-learning-vineland-nj/) and [kindergarten readiness](/kindergarten-readiness-vineland-nj/)
- [Before and after school care](/after-school-program-vineland-nj/) up to 13

We accept [NJ childcare subsidy (CCAP)](/ccap-child-care-vineland-nj/) for families who qualify. [Book a tour](/tour/) or call [(856) 455-6701](tel:8564556701).
`,
    reviews: refs('review-marcia-antina', 'review-monique-willoughby'),
    faqs: [
      faq('Is your center in Millville?', 'Our center is in Vineland at 30 W Chestnut Ave, about a 15-minute drive from Millville up Delsea Drive. Many of our families come from Millville.'),
      faq('Will my child\'s Millville school bus stop at your center?', 'Bus routes are set by each school district, so ask Millville Public Schools whether a stop in Vineland is possible. School buses can pick up and drop off at our center, and parents can always drop off and pick up here.'),
      faq('Can I use CCAP if I live in Millville?', 'Yes. Millville and Vineland are both in Cumberland County, and we accept NJ childcare subsidy (CCAP) for families who qualify.'),
    ],
    related: refs('category-shift-care', 'category-preschool', 'page-about', 'area-bridgeton'),
    seo: seo('Daycare for Millville, NJ Families | Uriah Child Care', 'Child care for Millville, NJ families at our licensed Vineland center, about 15 minutes away. Open Monday to Saturday, 6 am to 11 pm. Ages 2.5+.'),
  }),

  city('bridgeton', 'Bridgeton', {
    title: 'Child care for Bridgeton, NJ families',
    shortTitle: 'Bridgeton, NJ',
    slug: slug('bridgeton-nj'),
    order: 2,
    accent: 'sky',
    keyword: 'daycare bridgeton nj',
    driveTime: 'About 15 to 20 minutes by car',
    ageRange: 'Ages 2.5 and up',
    schedule: 'Monday to Saturday, 6 am to 11 pm',
    image: IMG.parkingLot(),
    intro:
      'Uriah Child Care welcomes Bridgeton, NJ families at our licensed center at 30 W Chestnut Ave in Vineland, a 15 to 20-minute drive. We are open Monday to Saturday, 6 am to 11 pm, with toddler care, kindergarten readiness and before and after school care for ages 2.5 and up. We accept NJ childcare subsidy (CCAP).',
    excerpt: 'Licensed care for Bridgeton families at our Vineland center, 15 to 20 minutes away, open Monday to Saturday.',
    highlights: ['15 to 20 minutes from Bridgeton', 'Open Monday to Saturday, 6 am to 11 pm', 'Ages 2.5 and up', 'NJ childcare subsidy (CCAP) accepted'],
    body: md`
## Child care for Bridgeton parents

Many Bridgeton parents work in Vineland, at the hospital, in warehouses and food plants or in stores along Delsea Drive. Our center at 30 W Chestnut Ave is a 15 to 20-minute drive from Bridgeton, depending on where in Bridgeton you live. Many families take Route 56, which becomes Landis Avenue in Vineland, then head south on Delsea Drive to W Chestnut Ave. You can drop off on the way to work.

## Open when you work

We are open **Monday to Saturday, 6 am to 11 pm**, with [early morning to late evening care](/child-care-vineland-nj/) and [Saturday daycare](/saturday-daycare-vineland-nj/).

## School-age kids from Bridgeton

Bridgeton Public Schools run K–8 schools such as Broad Street, Buckshutem Road, Cherry Street, Indian Avenue, Quarter Mile Lane and West Avenue School. Bus routes are set by the district, so ask Bridgeton Public Schools whether a stop in Vineland is possible. Our [after school program](/after-school-program-vineland-nj/) is open until 11 pm, with homework help on every shift, dinner at 6 pm and an evening snack at 9 pm.

## Programs for Bridgeton families

- [Toddler care](/toddler-care-vineland-nj/) from 2½
- [Early learning](/early-learning-vineland-nj/) and [kindergarten readiness](/kindergarten-readiness-vineland-nj/)
- [Before and after school care](/after-school-program-vineland-nj/) up to 13

We accept [NJ childcare subsidy (CCAP)](/ccap-child-care-vineland-nj/) for families who qualify. [Book a tour](/tour/) or call [(856) 455-6701](tel:8564556701).
`,
    reviews: refs('review-rockay-davis'),
    faqs: [
      faq('How far is your center from Bridgeton?', 'Our center is at 30 W Chestnut Ave in Vineland, a 15 to 20-minute drive from Bridgeton, depending on where in Bridgeton you start.'),
      faq('Will my child\'s Bridgeton school bus stop at your center?', 'Bus routes are set by each school district, so ask Bridgeton Public Schools whether a stop in Vineland is possible. School buses can pick up and drop off at our center, and parents can always drop off and pick up here.'),
      faq('Can I use CCAP if I live in Bridgeton?', 'Yes. Bridgeton and Vineland are both in Cumberland County, and we accept NJ childcare subsidy (CCAP) for families who qualify.'),
    ],
    related: refs('category-shift-care', 'category-after-school', 'service-ccap', 'area-millville'),
    seo: seo('Daycare for Bridgeton, NJ Families | Uriah Child Care', 'Child care for Bridgeton, NJ families at our licensed Vineland center, 15 to 20 minutes away. Open Monday to Saturday, 6 am to 11 pm. Ages 2.5+.'),
  }),
]
