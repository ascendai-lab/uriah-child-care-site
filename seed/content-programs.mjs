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
  kiosk: () => img('brightwheel-check-in-kiosk-uriah-child-care', 'Brightwheel check-in kiosk parents use at drop-off and pickup'),
  paulette: () => img('ms-paulette-senior-owner-uriah-child-care', 'Ms. Paulette, owner of Uriah Child Care'),
  tameca: () => img('tameca-burke-director-uriah-child-care', 'Tameca Burke, director of Uriah Child Care'),
  classroom: () => img('classroom-uriah-child-care-vineland', 'Colorful preschool classroom at Uriah Child Care in Vineland'),
  schedule: () => img('daily-schedule-chart-classroom-uriah-child-care', 'Picture daily schedule chart on a classroom wall at Uriah Child Care'),
  readingRug: () => img('classroom-reading-rug-uriah-child-care-vineland', 'Preschool classroom with an alphabet rug, reading shelves and a horseshoe table at Uriah Child Care'),
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

const preschoolDay = [
  step('Arrival', 'Parents check in on the Brightwheel kiosk, and children wash hands and settle in with free play.'),
  step('Breakfast', 'A healthy breakfast served through the USDA food program (CACFP).'),
  step('Circle time', 'Calendar, weather, letters, numbers and a song to start the day together.'),
  step('Learning centers', 'Play-based activities in language, math, science and art from our Experience Early Learning curriculum.'),
  step('Lunch and rest', 'A family-style lunch, then a quiet rest time.'),
  step('Afternoon', 'Snack, stories, music and movement, and play with friends until pickup.'),
]

/* ───────────────────────── Program hubs (GBP categories) ───────────────────────── */

export const categories = [
  core('category', 'category-preschool', {
    title: 'Preschool in Vineland, NJ',
    shortTitle: 'Preschool',
    homeHeading: 'Preschool in Vineland',
    slug: slug('preschool-vineland-nj'),
    order: 1,
    accent: 'coral',
    gbpName: 'Preschool',
    keyword: 'preschool vineland nj',
    ageRange: 'Ages 2.5 to 5',
    schedule: 'Monday to Sunday, 6 am to 11 pm. Full-time and part-time.',
    image: IMG.readingRug(),
    intro:
      'Uriah Child Care runs a play-based preschool in Vineland, NJ for children ages 2.5 to 5. Children learn letters, numbers, colors and getting along with friends through play, guided by Ms. Paulette and our caring staff. We are licensed by NJ DCF, accept NJ childcare subsidy (CCAP), and are open 7 days a week.',
    excerpt: 'Play-based preschool and pre-K for ages 2.5 to 5, open 7 days a week at our licensed Vineland center.',
    highlights: [
      'Play-based curriculum from Experience Early Learning',
      'Circle time every day: calendar, weather, letters and counting',
      'Potty training support for 2½ and 3-year-olds',
      'Kindergarten readiness for 4 and 5-year-olds',
      'Meals and snacks through the USDA food program (CACFP)',
      'NJ childcare subsidy (CCAP) accepted',
    ],
    dayPlan: preschoolDay,
    body: md`
## What children learn in our preschool

Our preschool follows a play-based curriculum built on Experience Early Learning. Each week has a theme, and children explore it through stories, songs, art, building, pretend play and simple science. A developmental continuum helps us see what each child can do and what to work on next, so your child is never pushed too fast or held back.

Every day starts with circle time: we go over the calendar and the weather, practice letters and numbers, and talk about the day ahead. A picture schedule on the classroom wall helps younger children know what comes next, which makes the day calmer for everyone.

## Preschool for ages 2.5 to 5

We welcome children from 2½ years old. Our youngest preschoolers work on talking, sharing, listening and taking turns, and many are still [potty training](/potty-training-daycare-vineland-nj/), which we support together with you. Older children move on to [pre-K](/pre-k-vineland-nj/) and [kindergarten readiness](/kindergarten-readiness-vineland-nj/): writing their name, counting, following two-step directions and getting ready for a full school day.

## Preschool that fits your work schedule

We are open Monday to Sunday, 6 am to 11 pm, so preschoolers can come before an early shift, stay through a late one, or attend on weekends. [Full-time and part-time schedules](/full-time-part-time-daycare-vineland-nj/) are available.

## How to enroll

Call us at [(856) 455-6701](tel:8564556701) or [book a tour](/tour/) to see the classroom and meet Ms. Paulette. We accept [NJ childcare subsidy (CCAP)](/ccap-child-care-vineland-nj/) for families who qualify.
`,
    reviews: refs('review-monique-willoughby', 'review-marcia-antina'),
    faqs: [
      faq('What age can my child start preschool at Uriah?', 'Children can start at 2½ years old. Our preschool program covers ages 2.5 to 5, and children move into pre-K and kindergarten readiness as they grow.'),
      faq('Does my child need to be potty trained for preschool?', 'No. Many of our 2½ and 3-year-olds are still learning. We work on potty training together with you, using the same routine at home and at the center.'),
      faq('What curriculum do you use?', 'We use a play-based curriculum built on Experience Early Learning, with weekly themes and a developmental continuum of skills in language, math, science, art and social skills.'),
      faq('Is preschool covered by CCAP?', 'We accept NJ childcare subsidy (CCAP) for families who qualify. Call us and we will walk you through the steps with the Cumberland County agency.'),
    ],
    related: refs('service-pre-k', 'service-kindergarten-readiness', 'service-play-based-learning', 'service-toddler-care'),
    seo: seo('Preschool in Vineland, NJ | Ages 2.5 to 5 | Uriah Child Care', 'Play-based preschool in Vineland, NJ for ages 2.5 to 5. Licensed by NJ DCF, open 7 days a week, CCAP accepted. Book a tour with Ms. Paulette.'),
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
    schedule: 'Before school from 6 am, after school until 11 pm, 7 days a week',
    image: IMG.playHall(),
    intro:
      'Uriah Child Care offers before and after school care in Vineland, NJ for school-age children up to 13. Kids get a snack, time for homework and time to play in a safe, licensed center, and we stay open until 11 pm for parents who work late. We accept NJ childcare subsidy (CCAP) for families who qualify.',
    excerpt: 'Before and after school care for school-age kids up to 13, with homework time, snacks and care until 11 pm.',
    highlights: [
      'Before school care from 6 am',
      'After school care until 11 pm, 7 days a week',
      'Homework time and help with reading',
      'Afternoon snack through the USDA food program (CACFP)',
      'Licensed by NJ DCF, license ID CCC128557',
      'NJ childcare subsidy (CCAP) accepted',
    ],
    dayPlan: [
      step('After school', 'Kids arrive, wash up and have a healthy snack.'),
      step('Homework time', 'A quiet table for homework and reading, with help when they get stuck.'),
      step('Play', 'Games, art, building and time with friends.'),
      step('Dinner and wind-down', 'For children staying into the evening, dinner and calm activities until pickup.'),
    ],
    body: md`
## Before and after school care for working parents

School gets out long before most shifts end. Our after school program gives school-age children a safe, familiar place to go, with people who know them. Children up to 13 can come [before school](/before-school-care-vineland-nj/) from 6 am and after school until 11 pm, Monday to Sunday.

## What kids do after school

After a snack, children sit down for [homework time](/homework-help-vineland-nj/). Staff help with reading and checking work, and keep kids on task so homework is done before you pick up. Then it is time to play: games, art, building and time with friends. Children who stay into the evening have dinner and settle down with calm activities.

## Care on days off school and all summer

Many parents still work when school is closed. We offer full-day care on [school closure days](/school-closure-care-vineland-nj/) like holidays, breaks and snow days, and full-day [summer care](/summer-child-care-vineland-nj/).

## Getting to and from school

Parents drop off and pick up at the center. We do not offer school pickup or drop-off.

## Getting started

Call [(856) 455-6701](tel:8564556701) or [book a tour](/tour/). Tell us your child's school and your work schedule, and we will go over how the days would work. We accept [NJ childcare subsidy (CCAP)](/ccap-child-care-vineland-nj/) for families who qualify.
`,
    reviews: refs('review-rockay-davis', 'review-marcia-antina'),
    faqs: [
      faq('What ages are in the after school program?', 'Our before and after school program is for school-age children up to 13 years old.'),
      faq('How late can my child stay?', 'We are open until 11 pm, Monday to Sunday, so children can stay through a second shift.'),
      faq('Do you help with homework?', 'Yes. After snack, children have homework time at a quiet table, and staff help with reading and checking work.'),
      faq('Do you pick children up from school?', 'No. We do not offer school pickup or drop-off. Parents bring children to the center and pick them up here.'),
      faq('Are you open in the summer and when school is closed?', 'Yes. We offer full-day care all summer and on school holidays, breaks and snow days.'),
      faq('Can I use CCAP for after school care?', 'We accept NJ childcare subsidy (CCAP) for families who qualify, including for school-age care. Call us and we will help you with the next steps.'),
    ],
    related: refs('service-before-school', 'service-homework-help', 'service-evening', 'service-ccap'),
    seo: seo('After School Program in Vineland, NJ | Uriah Child Care', 'Before and after school care in Vineland, NJ for kids up to 13. Homework time, snacks and care until 11 pm, 7 days a week. CCAP accepted.'),
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
    schedule: 'Monday to Sunday, 6 am to 11 pm.',
    image: IMG.dusk(),
    intro:
      'Uriah Child Care is a licensed child care center in Vineland, NJ, open Monday to Sunday from 6 am to 11 pm. We offer early morning, evening and late evening care for children ages 2.5 and up, so parents who work early mornings, evenings and weekends have a safe place for their kids. We accept NJ childcare subsidy (CCAP).',
    excerpt: 'Licensed child care open 7 days a week, early morning to 11 pm, for ages 2.5 and up.',
    highlights: [
      'Open 7 days a week, 6 am to 11 pm',
      'Early morning to 11 pm',
      'Weekend care on Saturday and Sunday',
      'Full-time and part-time schedules',
      'Ages 2.5 and up',
      'NJ childcare subsidy (CCAP) accepted',
    ],
    body: md`
## Child care that matches your hours

Vineland runs on more than nine-to-five. Parents work at the hospital, in warehouses and food plants, in stores and on farms, and many start before sunrise or finish late at night. Uriah Child Care is open **Monday to Sunday, 6 am to 11 pm**, so your child care can follow your shift instead of the other way around.

## Care from early morning to 11 pm

- [Early morning care](/first-shift-child-care-vineland-nj/) from 6 am.
- [Evening child care](/evening-child-care-vineland-nj/) after work.
- [Late evening care until 11 pm](/late-evening-child-care-vineland-nj/).
- [Weekend daycare](/weekend-daycare-vineland-nj/) on Saturday and Sunday.

Work overnight? Call us at [(856) 455-6701](tel:8564556701) and Ms. Paulette will talk with you about it. If your schedule changes from week to week, see [child care for shift workers](/child-care-for-shift-workers-vineland-nj/).

## Who we care for

We care for children ages 2.5 and up: [toddlers from 2½](/toddler-care-vineland-nj/), [preschool and pre-K](/preschool-vineland-nj/), and [before and after school care](/after-school-program-vineland-nj/) for school-age kids up to 13.

## A licensed center close to home

We are at 30 W Chestnut Ave in Vineland, and many families drive in from [Millville](/millville-nj/) and [Bridgeton](/bridgeton-nj/). We are [licensed by NJ DCF](/safe-licensed-daycare-vineland-nj/) (license ID CCC128557) and accept [NJ childcare subsidy (CCAP)](/ccap-child-care-vineland-nj/) for families who qualify.
`,
    reviews: refs('review-marcia-antina', 'review-rockay-davis'),
    faqs: [
      faq('What are your hours?', 'We are open Monday to Sunday, 6 am to 11 pm.'),
      faq('Do you offer overnight care?', 'Our posted hours end at 11 pm. If you work overnight and need care after 11 pm, call us at (856) 455-6701 and Ms. Paulette will talk with you about it.'),
      faq('Can my schedule change from week to week?', 'Often, yes. Many of our parents work rotating shifts. Tell us your schedule and we will work out the days and times that fit, as space allows.'),
    ],
    related: refs('service-first-shift', 'service-evening', 'service-weekend', 'service-shift-workers'),
    seo: seo('Child Care in Vineland, NJ, Open 7 Days', 'Licensed child care in Vineland, NJ open Monday to Sunday, 6 am to 11 pm. Early morning to late evening care for ages 2.5 and up. CCAP accepted.'),
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
    schedule: 'Monday to Sunday, 6 am to 11 pm',
    image: IMG.playRug(),
    intro:
      'Uriah Child Care cares for toddlers from 2½ years old at our licensed center in Vineland, NJ. Your little one builds words, makes friends and learns daily routines through play, with potty training support along the way. We are open 7 days a week, 6 am to 11 pm, and accept NJ childcare subsidy (CCAP).',
    excerpt: 'Warm, play-based care for toddlers from 2½, with potty training support and care 7 days a week.',
    highlights: ['Children from 2½ years old', 'Talking, sharing and taking turns', 'Potty training support', 'Daily routine with a picture schedule', 'Meals and snacks (CACFP)', 'Updates through the Brightwheel app'],
    dayPlan: preschoolDay,
    body: md`
## Care for your 2½-year-old

Two-and-a-half is a big age. Toddlers are learning new words every day, wanting to do things themselves, and figuring out how to play with other children. Our toddler care gives them a calm, predictable day with lots of play, songs and stories, and adults who get down on their level.

## Learning to talk, share and play

One mom wrote that her son "learned how to communicate his words better because of Ms. Paulette." We model words all day, read together, and help toddlers use words instead of grabbing or crying when they are frustrated.

## Potty training, together

Many children who join us at 2½ are still in diapers or pull-ups. We follow your routine and [support potty training](/potty-training-daycare-vineland-nj/) at the center, so your child hears the same words and steps everywhere.

## Next steps

Toddlers grow into our [preschool](/preschool-vineland-nj/) program. [Book a tour](/tour/) or call [(856) 455-6701](tel:8564556701).
`,
    reviews: refs('review-monique-willoughby', 'review-marcia-antina'),
    faqs: [
      faq('What is the youngest age you take?', 'We care for children from 2½ years old.'),
      faq('My toddler has never been to daycare. How do you help them settle in?', 'We keep the first days calm and predictable, and you are welcome to stay for a few minutes at drop-off. We let you know how your child is doing so you are not left wondering.'),
      faq('Do toddlers nap?', 'Yes. After lunch there is a quiet rest time. Bring a small blanket or comfort item if your child uses one.'),
    ],
    related: refs('category-preschool', 'service-potty-training', 'service-play-based-learning', 'service-ccap'),
    seo: seo('Toddler Care in Vineland, NJ | Ages 2.5+ | Uriah Child Care', 'Toddler daycare in Vineland, NJ from 2½ years old. Play-based learning, potty training support, open 7 days, 6 am to 11 pm. CCAP accepted.'),
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
      'Yes, Uriah Child Care accepts NJ childcare subsidy (CCAP) for families who qualify. Our licensed center at 30 W Chestnut Ave in Vineland, NJ cares for children ages 2.5 and up, 7 days a week from 6 am to 11 pm. We are happy to walk you through the steps to apply and use your subsidy with us.',
    excerpt: 'We accept NJ childcare subsidy (CCAP) for families who qualify, and we can walk you through the steps.',
    highlights: ['NJ childcare subsidy (CCAP) accepted', 'Help with the next steps', 'Care for every shift, 7 days a week', 'Ages 2.5 and up'],
    body: md`
## We accept NJ childcare subsidy

The New Jersey Child Care Assistance Program (CCAP) helps working families, and families in school or training, pay for child care. Uriah Child Care accepts CCAP for families who qualify, for toddler care, preschool and before and after school care.

## How CCAP works in Cumberland County

In Cumberland County, CCAP is managed by the local child care resource and referral agency, Rutgers Southern Regional CCR&R, which has an office in Vineland. You apply through the state's Child Care Assistance Program, and the agency decides eligibility and your family's share of the cost. Rules and income limits are set by the state and can change, so check the official [NJ Child Care Assistance Program](https://www.childcarenj.gov/) website for the latest.

## How we help

- We explain what to bring and who to contact.
- Once you are approved, we help you choose a schedule that fits your work hours.
- If your schedule changes, tell us and we will help you update it.

## Questions about cost?

See [tuition and how to pay](/tuition/), call us at [(856) 455-6701](tel:8564556701), or [book a tour](/tour/).
`,
    faqs: [
      faq('Do you accept CCAP?', 'Yes. We accept NJ childcare subsidy (CCAP) for families who qualify.'),
      faq('Who decides if I qualify?', 'The state program and the county agency decide eligibility and your share of the cost. In Cumberland County that is Rutgers Southern Regional CCR&R. We can help you with the next steps.'),
      faq('Can I use CCAP for evening or weekend care?', 'Care has to fit what your subsidy approval covers. Tell us your work schedule and we will go over it with you.'),
    ],
    related: refs('page-tuition', 'category-shift-care', 'category-preschool', 'page-tour'),
    seo: seo('Daycare That Accepts CCAP in Vineland, NJ | Uriah Child Care', 'Uriah Child Care in Vineland, NJ accepts NJ childcare subsidy (CCAP) for families who qualify. Ages 2.5+, open 7 days. We help with the steps.'),
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

Children who arrive early have breakfast, everyone has lunch, and there are snacks during the day. Children staying into the evening are served an evening meal. Children wash their hands before every meal, and we eat together at the table.

## Allergies and special diets

Tell us about any allergies, intolerances or special diets when you enroll, and remind us if anything changes. We keep that information where staff can see it at mealtimes.

## Questions

Ask about our menus when you [book a tour](/tour/), or call [(856) 455-6701](tel:8564556701).
`,
    faqs: [
      faq('Do I need to pack lunch?', 'Meals and snacks are served during the day through the USDA food program (CACFP). Ask us at enrollment about anything your child needs from home.'),
      faq('Can you handle food allergies?', 'Tell us about allergies and special diets when you enroll, and we will plan meals around them.'),
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
      'Uriah Child Care is licensed by the New Jersey Department of Children and Families as a child care center, license ID CCC128557. Parents check children in and out on the Brightwheel app, children are released only to adults you authorize, and Ms. Paulette is certified in pediatric First Aid and CPR/AED.',
    excerpt: 'Licensed by NJ DCF (CCC128557), with secure Brightwheel check-in and release only to authorized adults.',
    highlights: ['Licensed by NJ DCF, license ID CCC128557', 'Brightwheel check-in and check-out', 'Release only to authorized adults', 'Pediatric First Aid and CPR/AED certified owner', 'Security camera at the entrance', 'Wheelchair accessible entrance and parking'],
    body: md`
## Licensed by NJ DCF

We are licensed by the New Jersey Department of Children and Families (DCF) as a child care center, license ID **CCC128557**. Our license and the state's information for parents are posted in the lobby, and you can look up any licensed center in New Jersey through the state's child care search.

## Safe drop-off and pickup

- Parents check in and out on the **Brightwheel** kiosk in the lobby.
- We release children only to parents and adults you authorize in writing, and we ask for ID from anyone we don't know.
- A security camera watches the front entrance.

## Health and safety every day

Children wash their hands when they arrive, before meals and after using the bathroom. Ms. Paulette is certified in pediatric First Aid and CPR/AED. We use positive discipline: clear rules, redirection and praise, and never physical punishment or shaming.

## Built for every family

Our building has a wheelchair ramp, accessible parking and an accessible restroom. Come see it for yourself: [book a tour](/tour/) or call [(856) 455-6701](tel:8564556701).
`,
    reviews: refs('review-monique-willoughby', 'review-rockay-davis'),
    faqs: [
      faq('Is Uriah Child Care licensed?', 'Yes. We are licensed by the NJ Department of Children and Families as a child care center, license ID CCC128557.'),
      faq('How do you keep track of who picks up?', 'Parents check in and out on the Brightwheel kiosk, and we release children only to adults you authorize in writing. We ask for ID from anyone we do not know.'),
      faq('How do you handle discipline?', 'We use positive discipline: clear, simple rules, redirection and praise. We never use physical punishment, shaming or withholding food.'),
    ],
    related: refs('page-our-center', 'page-about', 'service-meals', 'page-faq'),
    seo: seo('Licensed Daycare in Vineland, NJ', 'Uriah Child Care is a licensed child care center in Vineland, NJ (NJ DCF license CCC128557). Brightwheel check-in and safe, secure pickup.'),
  }),
]

/* ───────────────────────── Preschool services ───────────────────────── */

const preschoolServices = [
  service('pre-k', 'category-preschool', {
    title: 'Pre-K in Vineland, NJ',
    shortTitle: 'Pre-K',
    slug: slug('pre-k-vineland-nj'),
    order: 1,
    accent: 'coral',
    gbpName: 'Pre-kindergarten',
    keyword: 'pre k vineland nj',
    ageRange: 'Ages 4 to 5',
    schedule: 'Monday to Sunday, 6 am to 11 pm',
    image: IMG.horseshoe(),
    intro:
      'Uriah Child Care offers a play-based pre-K program in Vineland, NJ for 4 and 5-year-olds. Children practice letters, numbers, writing their name and following directions, so they start kindergarten confident. Our center is licensed by NJ DCF, open 7 days a week, and accepts NJ childcare subsidy (CCAP).',
    excerpt: 'Play-based pre-K for 4 and 5-year-olds: letters, numbers, writing their name and getting ready for school.',
    highlights: ['For 4 and 5-year-olds', 'Letters, sounds and writing their name', 'Counting, shapes and patterns', 'Following directions and taking turns', 'Full-day care around your shift'],
    dayPlan: preschoolDay,
    body: md`
## Pre-K that feels like play

Four and five-year-olds learn best by doing. In our pre-K, children sort and count real objects, act out stories, build, paint and experiment, and practice letters and sounds in games. Our Experience Early Learning curriculum gives each week a theme and tracks the skills children are building.

## Skills for kindergarten

- Recognizing letters and their sounds, and writing their own name
- Counting, comparing and simple patterns
- Listening during a story and answering questions
- Following two-step directions, cleaning up and taking turns
- Telling a teacher what they need

Read more about [kindergarten readiness](/kindergarten-readiness-vineland-nj/).

## Pre-K for working parents

Our pre-K runs inside a full child care day. Your child can arrive at 6 am and stay into the evening, or come on weekends, so you don't have to piece together care around a short school day.

## Is your child also eligible for public preschool?

Some Vineland families also qualify for the public school district's free preschool. If you are deciding between options, call us at [(856) 455-6701](tel:8564556701) and we will talk it through honestly, or [book a tour](/tour/).
`,
    reviews: refs('review-marcia-antina'),
    faqs: [
      faq('What age is pre-K?', 'Our pre-K is for children ages 4 to 5, the year or two before kindergarten.'),
      faq('Is pre-K a full day?', 'Yes. Pre-K learning happens inside a full child care day, and children can stay for the hours you need between 6 am and 11 pm.'),
    ],
    related: refs('service-kindergarten-readiness', 'service-play-based-learning', 'category-preschool', 'service-ccap'),
    seo: seo('Pre-K in Vineland, NJ | Ages 4 to 5 | Uriah Child Care', 'Play-based pre-K in Vineland, NJ for 4 and 5-year-olds. Letters, numbers and school skills in a licensed center open 7 days. CCAP accepted.'),
  }),

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
      'At Uriah Child Care in Vineland, NJ, we get 4 and 5-year-olds ready for kindergarten with the skills teachers look for: knowing letters and sounds, counting, writing their name, following directions and getting along with classmates. It all happens through play in our licensed center, open 7 days a week.',
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

We share how your child is doing and what to practice at home, through the Brightwheel app and at pickup.

## Learn more

See our [pre-K program](/pre-k-vineland-nj/), or [book a tour](/tour/) and ask Ms. Paulette how she prepares children for school.
`,
    faqs: [faq('When should my child start getting ready for kindergarten?', 'The year or two before kindergarten, around age 4, is a great time. School skills start even earlier through play in our preschool.')],
    related: refs('service-pre-k', 'service-play-based-learning', 'category-preschool', 'category-after-school'),
    seo: seo('Kindergarten Readiness in Vineland, NJ | Uriah Child Care', 'Get your 4 or 5-year-old ready for kindergarten in Vineland, NJ: letters, counting, routines and social skills, built through play. Book a tour.'),
  }),

  service('play-based-learning', 'category-preschool', {
    title: 'Play-based learning curriculum in Vineland, NJ',
    shortTitle: 'Play-based learning',
    slug: slug('play-based-learning-vineland-nj'),
    order: 3,
    accent: 'sage',
    gbpName: 'Play-based curriculum',
    keyword: 'play based preschool vineland nj',
    ageRange: 'Ages 2.5 to 5',
    image: IMG.centers(),
    intro:
      'Uriah Child Care in Vineland, NJ uses a play-based curriculum built on Experience Early Learning. Children learn language, math, science, art and social skills through hands-on play, weekly themes and daily circle time, and a developmental continuum helps us track each child’s progress.',
    excerpt: 'Our Experience Early Learning curriculum: weekly themes, hands-on play and a skills continuum for each child.',
    highlights: ['Experience Early Learning curriculum', 'Weekly themes', 'Daily circle time', 'Developmental continuum of skills', 'Language, math, science and art'],
    dayPlan: preschoolDay,
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

## See it in action

[Book a tour](/tour/) to see our classroom, or read about our [preschool](/preschool-vineland-nj/) and [pre-K](/pre-k-vineland-nj/) programs.
`,
    faqs: [faq('Is play-based learning enough to prepare my child for school?', 'Yes. Through play, children build the language, math, fine motor and social skills kindergarten teachers look for. Our curriculum plans those skills week by week.')],
    related: refs('category-preschool', 'service-pre-k', 'service-kindergarten-readiness', 'service-toddler-care'),
    seo: seo('Play-Based Preschool in Vineland, NJ', 'Our play-based curriculum built on Experience Early Learning: weekly themes, circle time and a skills continuum for ages 2.5 to 5 in Vineland, NJ.'),
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

## How we work on it together

- We talk with you about the words and steps you use at home, and use the same ones.
- Children get regular bathroom breaks and gentle reminders.
- We celebrate every success and treat accidents calmly. We never shame a child.
- We tell you how the day went so you can keep going at home.

## What to bring

Diapers or pull-ups, wipes, and two or three changes of clothes, all labeled with your child's name.

## Questions?

Ask us when you [book a tour](/tour/), or see our [toddler care](/toddler-care-vineland-nj/) program.
`,
    faqs: [
      faq('What should I pack for potty training?', 'Diapers or pull-ups, wipes and two or three labeled changes of clothes. We will tell you if we run low.'),
      faq('Does my child have to be potty trained to start?', 'No. We care for children from 2½, and many start in diapers or pull-ups. We work on potty training together with you.'),
      faq('How will I know how potty training went today?', 'We tell you at pickup, and parents get updates through the Brightwheel app. You can always call us too.'),
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
    schedule: 'From 6 am, 7 days a week',
    image: IMG.morning(),
    intro:
      'Uriah Child Care opens at 6 am, so school-age children in Vineland, NJ have a safe, warm place to start the day before school. Kids can have breakfast and quiet time before school starts. We accept NJ childcare subsidy (CCAP) for families who qualify.',
    excerpt: 'Drop off from 6 am. Breakfast and a calm start to the day before school.',
    highlights: ['Drop-off from 6 am', 'Breakfast through the USDA food program (CACFP)', 'Quiet time and reading', 'Ages up to 13'],
    body: md`
## A calm start before school

If your shift starts before the school day, bring your child to us from 6 am. They can have breakfast, finish a little reading or homework, and relax with friends until it's time for school.

## Getting to and from school

Parents drop off and pick up at the center, and we do not drive children to or from school. School buses can stop at the center, so ask your school district whether your child's bus can pick up and drop off here.

## After school too

Many families pair before school care with our [after school program](/after-school-program-vineland-nj/). Call [(856) 455-6701](tel:8564556701) or [book a tour](/tour/).
`,
    faqs: [
      faq('What time can I drop off before school?', 'We open at 6 am, 7 days a week.'),
      faq('Do you take children to school or pick them up?', 'No. We do not offer school pickup or drop-off. Parents bring children to the center and pick them up here.'),
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

If your child's teacher sends notes or a reading log, put it in their bag and tell us. We'll keep you posted through the Brightwheel app.

See our full [after school program](/after-school-program-vineland-nj/) or [book a tour](/tour/).
`,
    faqs: [
      faq('Do you make sure homework is finished?', 'We set aside homework time every day and check work before play. Let us know if there is something specific your child needs to finish.'),
      faq('What ages come to homework help?', 'Homework time is part of our after school program for school-age children up to 13.'),
      faq('Do you pick my child up from school?', "No. We do not drive children to or from school. School buses can stop at the center, so ask your school district whether your child's bus can drop off here."),
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
    schedule: 'Full days all summer, 7 days a week, 6 am to 11 pm',
    image: IMG.springFlag(),
    intro:
      'Uriah Child Care offers summer child care in Vineland, NJ for school-age children up to 13. When school is out, kids spend full days with us at our licensed center, open 7 days a week from 6 am to 11 pm, with meals, play and learning to keep them busy. We accept NJ childcare subsidy (CCAP) for families who qualify.',
    excerpt: 'Full-day summer care for school-age kids up to 13, 7 days a week, 6 am to 11 pm.',
    highlights: ['Full days when school is out', 'Open 7 days, 6 am to 11 pm', 'Meals and snacks (CACFP)', 'Reading, games, art and play', 'Ages up to 13', 'NJ childcare subsidy (CCAP) accepted'],
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

## Hours that fit your job

We are open **7 days a week, 6 am to 11 pm** all summer, including evenings and weekends for parents who work [shifts](/child-care-vineland-nj/).

## Save a spot

Space can fill up before summer, so call [(856) 455-6701](tel:8564556701) or [book a tour](/tour/) early. We accept [NJ childcare subsidy (CCAP)](/ccap-child-care-vineland-nj/) for families who qualify.
`,
    faqs: [
      faq('Do you offer summer care?', 'Yes. School-age children up to 13 can come for full days all summer, 7 days a week, 6 am to 11 pm.'),
      faq('Do I need to sign up early for summer?', 'We recommend it. Space can fill up before school lets out, so call us in the spring.'),
      faq('Are meals included in summer care?', 'Yes. Children are served meals and snacks through the USDA food program (CACFP).'),
    ],
    related: refs('category-after-school', 'service-school-closure', 'service-meals', 'category-shift-care'),
    seo: seo('Summer Child Care in Vineland, NJ', 'Full-day summer child care in Vineland, NJ for school-age kids up to 13. Open 7 days, 6 am to 11 pm, meals included. CCAP accepted.'),
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
      'School closed but you still have to work? Uriah Child Care offers full-day child care in Vineland, NJ on school holidays, breaks, teacher days and snow days for school-age children up to 13. We are open 7 days a week, 6 am to 11 pm, and accept NJ childcare subsidy (CCAP).',
    excerpt: 'Full-day care on school holidays, breaks, teacher days and snow days.',
    highlights: ['School holidays and breaks', 'Teacher in-service days', 'Snow days', 'Full days, 6 am to 11 pm', 'Meals and snacks (CACFP)', 'Ages up to 13'],
    body: md`
## Care when school is closed

School calendars are full of days off: holidays, winter and spring breaks, teacher in-service days and surprise snow days. Your job doesn't stop for any of them. On those days, school-age children up to 13 can spend the full day with us.

## A full day with familiar faces

Children who come to our [after school program](/after-school-program-vineland-nj/) already know our staff and routine. On closure days they get breakfast, lunch and snacks, reading and homework time, and plenty of play.

## Plan ahead, or call that morning

For planned days off, tell us ahead of time. For snow days and other surprises, call [(856) 455-6701](tel:8564556701) as early as you can, and we will fit your child in if we have space.

We accept [NJ childcare subsidy (CCAP)](/ccap-child-care-vineland-nj/) for families who qualify.
`,
    faqs: [
      faq('Are you open when school is closed?', 'Yes. We offer full-day care for school-age children up to 13 on school holidays, breaks, teacher days and snow days.'),
      faq('What about snow days?', 'Call us as early as you can that morning, and we will fit your child in if we have space.'),
    ],
    related: refs('category-after-school', 'service-summer-care', 'service-before-school', 'category-shift-care'),
    seo: seo('School Closure Day Care in Vineland, NJ', 'Full-day child care in Vineland, NJ on school holidays, breaks and snow days for kids up to 13. Open 7 days, 6 am to 11 pm. CCAP accepted.'),
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
    schedule: 'From 6 am, 7 days a week',
    image: IMG.entrance(),
    intro:
      'Uriah Child Care opens at 6 am, 7 days a week, so parents in Vineland, NJ who work first shift can drop off before work. Children ages 2.5 and up get breakfast and a calm start to their day. We accept NJ childcare subsidy (CCAP).',
    excerpt: 'Drop off from 6 am, 7 days a week, with breakfast and a calm start to the day.',
    highlights: ['Open from 6 am', '7 days a week', 'Breakfast served (CACFP)', 'Ages 2.5 and up'],
    body: md`
## Drop off from 6 am

Many Vineland parents start work at 6 or 7 in the morning. We open at **6 am, Monday to Sunday**, so you can drop off on the way and still get to work on time.

## A gentle morning for your child

Early arrivals get breakfast and a quiet start: books, puzzles and free play while the center wakes up. Preschoolers join circle time and the day's activities, and school-age kids can start the day here with [before school care](/before-school-care-vineland-nj/).

## Fast check-in

Check your child in on the Brightwheel kiosk in the lobby and you're on your way.

See all [shift care](/child-care-vineland-nj/), or call [(856) 455-6701](tel:8564556701).
`,
    reviews: refs('review-marcia-antina'),
    faqs: [
      faq('How early do you open?', 'We open at 6 am, Monday to Sunday.'),
      faq('Is breakfast served for early arrivals?', 'Yes. We participate in the USDA Child and Adult Care Food Program (CACFP), and children are served meals and snacks during the day, including breakfast.'),
      faq('Are you open early on weekends too?', 'Yes. We open at 6 am on Saturday and Sunday, the same as weekdays.'),
      faq('How do I check my child in?', 'Parents check children in and out on the Brightwheel kiosk in our lobby.'),
    ],
    related: refs('category-shift-care', 'service-before-school', 'service-shift-workers', 'service-full-part-time'),
    seo: seo('Early Morning Daycare in Vineland, NJ', 'First shift child care in Vineland, NJ. Drop off from 6 am, 7 days a week, with breakfast. Ages 2.5 and up. CCAP accepted.'),
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
    schedule: 'Evenings, 7 days a week, until 11 pm',
    image: IMG.sunset(),
    intro:
      'Uriah Child Care offers evening child care in Vineland, NJ for parents who work second shift. Children ages 2.5 and up get dinner, play and a calm evening routine at our licensed center, which stays open until 11 pm, 7 days a week. We accept NJ childcare subsidy (CCAP).',
    excerpt: 'Second shift care with dinner and a calm evening routine, open until 11 pm.',
    highlights: ['Second shift care', 'Open until 11 pm', 'Evening meal served', 'Calm evening routine', 'Ages 2.5 and up'],
    dayPlan: [
      step('Afternoon', 'Snack and play, or homework time for school-age kids.'),
      step('Dinner', 'An evening meal through the USDA food program (CACFP).'),
      step('Wind-down', 'Books, quiet games and stories to wind down.'),
      step('Pickup', 'Before we close at 11 pm.'),
    ],
    body: md`
## Care while you work second shift

Second shift is hard on families when child care closes as your shift starts. We stay open **until 11 pm, 7 days a week**, so your child can be with people they know while you work.

## A real evening routine

Children have dinner, then settle into calm activities like books, puzzles and quiet games. We keep the evening low-key so children are ready for bed when you pick them up.

## For every age we serve

Toddlers and preschoolers from 2½, and school-age children up to 13 coming from our [after school program](/after-school-program-vineland-nj/).

See [late evening care until 11 pm](/late-evening-child-care-vineland-nj/), or [book a tour](/tour/).
`,
    reviews: refs('review-marcia-antina'),
    faqs: [
      faq('Do children get dinner?', 'Yes. Children staying into the evening are served an evening meal through the USDA food program (CACFP).'),
      faq('How late are you open?', 'We are open until 11 pm, Monday to Sunday.'),
      faq('Can school-age children come in the evening?', 'Yes. We care for children ages 2.5 and up, including school-age children up to 13, so older kids can do homework and wind down with us.'),
    ],
    related: refs('service-late-evening', 'category-shift-care', 'service-shift-workers', 'category-after-school'),
    seo: seo('Evening Child Care in Vineland, NJ', 'Second shift child care in Vineland, NJ with dinner and a calm evening routine. Open until 11 pm, 7 days. Ages 2.5+. CCAP accepted.'),
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
    schedule: 'Until 11 pm, 7 days a week',
    image: IMG.porch(),
    intro:
      'Uriah Child Care is open until 11 pm, 7 days a week, for parents in the Vineland, NJ area who work late. Need care after 11 pm? Call us to talk about it.',
    excerpt: 'Care until 11 pm, 7 days a week, for parents who work late.',
    highlights: ['Open until 11 pm', '7 days a week', 'Dinner served', 'After 11 pm? Call us'],
    body: md`
## Child care until 11 pm

If you work late, finding child care in Cumberland County can feel impossible. Uriah Child Care stays open **until 11 pm, Monday to Sunday**.

## Working past 11 pm?

Our posted hours end at 11 pm. Need care after 11 pm for an overnight shift? Call us at [(856) 455-6701](tel:8564556701) and Ms. Paulette will talk with you about it.

## A quiet, safe evening

By late evening the center is calm. Children have had dinner and wind down with books and quiet play, so they're ready for bed at home.

Call [(856) 455-6701](tel:8564556701) to talk about your hours, or see [evening child care](/evening-child-care-vineland-nj/).
`,
    faqs: [
      faq('What time do you close?', 'Our posted closing time is 11 pm, Monday to Sunday.'),
      faq('Do you offer overnight care?', 'Our posted hours end at 11 pm. If you work overnight and need care after 11 pm, call us at (856) 455-6701 and Ms. Paulette will talk with you about it.'),
    ],
    related: refs('service-evening', 'category-shift-care', 'service-shift-workers', 'service-weekend'),
    seo: seo('Late Evening Child Care in Vineland, NJ', 'Late evening child care in Vineland, NJ until 11 pm, 7 days a week. For parents who work late. Ages 2.5+. CCAP accepted.'),
  }),

  service('weekend', 'category-shift-care', {
    title: 'Weekend daycare in Vineland, NJ',
    shortTitle: 'Weekend daycare',
    slug: slug('weekend-daycare-vineland-nj'),
    order: 4,
    accent: 'sage',
    gbpName: 'Weekend child care',
    keyword: 'weekend daycare vineland nj',
    ageRange: 'Ages 2.5 and up',
    schedule: 'Saturday and Sunday, 6 am to 11 pm',
    image: IMG.springTree(),
    intro:
      'Uriah Child Care is open on Saturday and Sunday from 6 am to 11 pm, so parents in Vineland, NJ who work weekends have licensed child care they can count on. Children ages 2.5 and up are welcome. We accept NJ childcare subsidy (CCAP).',
    excerpt: 'Open Saturday and Sunday, 6 am to 11 pm, for parents who work weekends.',
    highlights: ['Open Saturday and Sunday', '6 am to 11 pm', 'Same caring staff', 'Ages 2.5 and up'],
    body: md`
## Child care on Saturday and Sunday

Hospitals, stores, restaurants and plants don't close on weekends, and neither do we. Uriah Child Care is open **Saturday and Sunday, 6 am to 11 pm**, the same hours as the rest of the week.

## The same routine, every day of the week

Weekend days follow the same routine as weekdays: meals and snacks, play-based learning, rest time and play. Children see familiar faces, which helps when your schedule changes from week to week.

## Weekends only, or the whole week

Some families use us only on weekends; others every day. See [full-time and part-time daycare](/full-time-part-time-daycare-vineland-nj/), or call [(856) 455-6701](tel:8564556701).
`,
    faqs: [
      faq('Are you open on Sundays?', 'Yes. We are open Saturday and Sunday, 6 am to 11 pm.'),
      faq('Can I use weekend care only?', 'Yes. Some families use us only on weekends and others every day. Choose the days you need, as space allows.'),
      faq('Is weekend care covered by CCAP?', 'We accept NJ childcare subsidy (CCAP) for families who qualify. Ask us and we will help you check what your approval covers.'),
      faq('What ages do you care for on weekends?', 'The same as every day: children ages 2.5 and up, including school-age children up to 13.'),
    ],
    related: refs('category-shift-care', 'service-shift-workers', 'service-full-part-time', 'service-late-evening'),
    seo: seo('Weekend Daycare in Vineland, NJ', 'Weekend child care in Vineland, NJ, open Saturday and Sunday 6 am to 11 pm. Licensed center for ages 2.5 and up. CCAP accepted.'),
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
      'Uriah Child Care in Vineland, NJ offers full-time and part-time child care for children ages 2.5 and up. Choose the days and hours you need between 6 am and 11 pm, 7 days a week, and we will build a schedule around your work.',
    excerpt: 'Choose the days and hours you need, between 6 am and 11 pm, 7 days a week.',
    highlights: ['Full-time schedules', 'Part-time schedules', 'Pick your days and hours', 'Open 7 days, 6 am to 11 pm'],
    body: md`
## Care that fits your week

Every family's week looks different. Some parents need care five or more days, some two or three, and some only on certain shifts. We offer **full-time and part-time** child care, and you choose the days and hours you need between 6 am and 11 pm.

## How scheduling works

Tell us your work schedule when you call or tour. We'll set up a regular schedule so your child has a steady routine. If your hours change, talk to us and we'll do our best to adjust, as space allows.

## Cost

Tuition depends on your child's age and schedule. See [tuition and how to pay](/tuition/) and [CCAP](/ccap-child-care-vineland-nj/).
`,
    faqs: [
      faq('Do you offer part-time care?', 'Yes. Choose the days and hours you need between 6 am and 11 pm, 7 days a week, as space allows.'),
      faq('How much does full-time or part-time care cost?', "Tuition depends on your child's age, the days and the shift you need. Call us or book a tour and we will give you a clear price for your schedule."),
      faq('Can I change my schedule later?', 'Talk to us when your hours change, and we will do our best to adjust as space allows.'),
      faq('Do you accept CCAP?', 'Yes. We accept NJ childcare subsidy (CCAP) for families who qualify, for full-time and part-time care.'),
    ],
    related: refs('page-tuition', 'service-shift-workers', 'category-shift-care', 'service-ccap'),
    seo: seo('Full & Part-Time Daycare in Vineland, NJ', 'Full-time and part-time child care in Vineland, NJ for ages 2.5+. Pick your days and hours, 6 am to 11 pm, 7 days a week. CCAP accepted.'),
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
    schedule: 'Monday to Sunday, 6 am to 11 pm',
    image: IMG.kiosk(),
    intro:
      'Uriah Child Care is built for parents in Vineland, NJ who work shifts: nurses, warehouse and plant workers, retail and restaurant staff. We are open Monday to Sunday, early morning to 11 pm, for children ages 2.5 and up, and we accept NJ childcare subsidy (CCAP).',
    excerpt: 'Built for nurses, warehouse, plant, retail and restaurant workers: care 6 am to 11 pm, 7 days.',
    highlights: ['Early morning to 11 pm', 'Open 7 days a week', 'Rotating schedules welcome', 'CCAP accepted'],
    body: md`
## Made for parents who work shifts

Ms. Paulette has spent years helping parents with hard schedules. As one parent wrote, "Ms. Paulette assist us tremendously with our work schedules, and we are thankful for her." Whether you work at a hospital, a warehouse, a food plant, a store or a restaurant, we are open when you are working.

## Every shift, every day

- **Early morning:** [drop off from 6 am](/first-shift-child-care-vineland-nj/)
- **Evening:** [evening care](/evening-child-care-vineland-nj/) with dinner
- **Late evening:** [care until 11 pm](/late-evening-child-care-vineland-nj/)
- **Weekends:** [Saturday and Sunday](/weekend-daycare-vineland-nj/), same hours

## Rotating and changing schedules

If your schedule rotates, bring it to your tour and we'll work out a plan. Tell us as early as you can when your hours change.

[Book a tour](/tour/) or call [(856) 455-6701](tel:8564556701).
`,
    reviews: refs('review-monique-willoughby', 'review-rockay-davis'),
    faqs: [
      faq('My shifts rotate. Can you work with that?', 'Often, yes. Bring your schedule to your tour and we will work out a plan, as space allows.'),
      faq('What are your hours?', 'We are open Monday to Sunday, 6 am to 11 pm.'),
      faq('I work overnight. Can you help?', 'Our posted hours end at 11 pm. If you need care after 11 pm, call us at (856) 455-6701 and Ms. Paulette will talk with you about your schedule.'),
      faq('Do children get meals during long shifts?', 'Yes. Children are served meals and snacks through the USDA Child and Adult Care Food Program (CACFP), including an evening meal for children staying late.'),
    ],
    related: refs('category-shift-care', 'service-first-shift', 'service-evening', 'service-weekend'),
    seo: seo('Shift Worker Child Care in Vineland, NJ', 'Child care for nurses, warehouse and plant workers in Vineland, NJ. Open 6 am to 11 pm, 7 days. Ages 2.5+. CCAP accepted.'),
  }),
]

export const services = [...homeServices, ...preschoolServices, ...afterSchoolServices, ...shiftServices]

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
    driveTime: 'About 20 minutes by car',
    ageRange: 'Ages 2.5 and up',
    schedule: 'Monday to Sunday, 6 am to 11 pm',
    image: IMG.buildingRamp(),
    intro:
      'Uriah Child Care serves Millville, NJ families from our licensed center at 30 W Chestnut Ave in Vineland, about a 20-minute drive. Ms. Paulette cared for Millville children for years before opening the Vineland center. We are open 7 days a week, 6 am to 11 pm, for ages 2.5 and up.',
    excerpt: 'Ms. Paulette has cared for Millville children for years. Our Vineland center is about 20 minutes away.',
    highlights: ['About 20 minutes from Millville', 'Open 7 days, 6 am to 11 pm', 'Ages 2.5 and up', 'NJ childcare subsidy (CCAP) accepted'],
    body: md`
## Ms. Paulette and Millville

Before opening our center in Vineland, Ms. Paulette cared for children in Millville for many years. Families who have known her since then still bring their children to her, and some now bring their grandchildren. One grandmother wrote that Ms. Paulette "has been watching my grand children throughout the years."

## Worth the short drive

Our center at 30 W Chestnut Ave in Vineland is about a 20-minute drive from Millville. For Millville parents who work in Vineland, it's right on the way. And because we're open **7 days a week, 6 am to 11 pm**, you can find care for [early, evening and weekend shifts](/child-care-vineland-nj/).

## Programs for Millville families

- [Toddler care](/toddler-care-vineland-nj/) from 2½
- [Preschool](/preschool-vineland-nj/) and [pre-K](/pre-k-vineland-nj/)
- [Before and after school care](/after-school-program-vineland-nj/) up to 13

We accept [NJ childcare subsidy (CCAP)](/ccap-child-care-vineland-nj/) for families who qualify. [Book a tour](/tour/) or call [(856) 455-6701](tel:8564556701).
`,
    reviews: refs('review-marcia-antina', 'review-monique-willoughby'),
    faqs: [
      faq('Is your center in Millville?', 'Our center is in Vineland at 30 W Chestnut Ave, about a 20-minute drive from Millville. Many of our families come from Millville.'),
      faq('Can I use CCAP if I live in Millville?', 'Yes. Millville and Vineland are both in Cumberland County, and we accept NJ childcare subsidy (CCAP) for families who qualify.'),
    ],
    related: refs('category-shift-care', 'category-preschool', 'page-about', 'area-bridgeton'),
    seo: seo('Daycare for Millville, NJ Families | Uriah Child Care', 'Child care for Millville, NJ families at our licensed Vineland center, about 20 minutes away. Open 7 days, 6 am to 11 pm. Ages 2.5+.'),
  }),

  city('bridgeton', 'Bridgeton', {
    title: 'Child care for Bridgeton, NJ families',
    shortTitle: 'Bridgeton, NJ',
    slug: slug('bridgeton-nj'),
    order: 2,
    accent: 'sky',
    keyword: 'daycare bridgeton nj',
    driveTime: 'About 25 minutes by car',
    ageRange: 'Ages 2.5 and up',
    schedule: 'Monday to Sunday, 6 am to 11 pm',
    image: IMG.parkingLot(),
    intro:
      'Uriah Child Care welcomes Bridgeton, NJ families at our licensed center at 30 W Chestnut Ave in Vineland, about a 25-minute drive. We are open Monday to Sunday, 6 am to 11 pm, with toddler care, preschool and before and after school care for ages 2.5 and up. We accept NJ childcare subsidy (CCAP).',
    excerpt: 'Licensed care for Bridgeton families at our Vineland center, about 25 minutes away, open 7 days.',
    highlights: ['About 25 minutes from Bridgeton', 'Open 7 days, 6 am to 11 pm', 'Ages 2.5 and up', 'NJ childcare subsidy (CCAP) accepted'],
    body: md`
## Child care for Bridgeton parents

Many Bridgeton parents work in Vineland, at the hospital, in warehouses and food plants or in stores along Delsea Drive. Our center at 30 W Chestnut Ave is about a 25-minute drive from Bridgeton, so you can drop off on the way to work.

## Open when you work

We are open **Monday to Sunday, 6 am to 11 pm**, with [early morning to late evening care](/child-care-vineland-nj/) and [weekend daycare](/weekend-daycare-vineland-nj/).

## Programs for Bridgeton families

- [Toddler care](/toddler-care-vineland-nj/) from 2½
- [Preschool](/preschool-vineland-nj/) and [pre-K](/pre-k-vineland-nj/)
- [Before and after school care](/after-school-program-vineland-nj/) up to 13

We accept [NJ childcare subsidy (CCAP)](/ccap-child-care-vineland-nj/) for families who qualify. [Book a tour](/tour/) or call [(856) 455-6701](tel:8564556701).
`,
    reviews: refs('review-rockay-davis'),
    faqs: [
      faq('How far is your center from Bridgeton?', 'Our center is at 30 W Chestnut Ave in Vineland, about a 25-minute drive from Bridgeton.'),
      faq('Can I use CCAP if I live in Bridgeton?', 'Yes. Bridgeton and Vineland are both in Cumberland County, and we accept NJ childcare subsidy (CCAP) for families who qualify.'),
    ],
    related: refs('category-shift-care', 'category-after-school', 'service-ccap', 'area-millville'),
    seo: seo('Daycare for Bridgeton, NJ Families | Uriah Child Care', 'Child care for Bridgeton, NJ families at our licensed Vineland center, about 25 minutes away. Open 7 days, 6 am to 11 pm. Ages 2.5+.'),
  }),
]
