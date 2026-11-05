/**
 * Seed content: business facts, navigation, team, reviews and the global FAQ.
 * Every fact here comes from the website strategy's GBP alignment sheet, the posted DCF license,
 * or the old site. Nothing is invented: unconfirmed items are flagged in seed/README.md.
 */
import { button, img, key, link, md, ref } from './lib.mjs'

export const TODAY = '2026-11-04'

export const PLACE_ID = 'ChIJk-4vYVw3x4kRSX5zZYYtB10'

export const siteSettings = {
  _id: 'siteSettings',
  _type: 'siteSettings',
  siteName: 'Uriah Child Care',
  legalName: 'Johnson and Senior Group LLC',
  tagline: 'Warm. Safe. Playful. Ours.',
  phone: '(856) 455-6701',
  email: 'hello@uriahchildcare.com',
  address: { street: '30 W Chestnut Ave', city: 'Vineland', state: 'NJ', zip: '08360' },
  hours: [
    {
      _type: 'openingHours',
      _key: key(),
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      open24Hours: false,
      opens: '06:00',
      closes: '23:00',
    },
  ],
  hoursSummary: 'Monday to Saturday, 6 am to 11 pm',
  businessType: 'ChildCare',
  agesServed: 'Ages 2.5 and up',
  ageMin: 2.5,
  ageMax: 13,
  shiftsLine: 'Early morning to 11 pm, Monday to Saturday',
  programsLine: 'Toddler care, kindergarten readiness, before and after school care, and shift care',
  subsidyStatement: 'We accept NJ childcare subsidy (CCAP) for families who qualify.',
  foodProgramStatement: 'We participate in the USDA Child and Adult Care Food Program (CACFP).',
  license: {
    issuer: 'New Jersey Department of Children and Families',
    number: 'CCC128557',
    summary: 'Licensed by NJ DCF as a child care center, license ID CCC128557',
    expires: '2026-12-17',
  },
  foundingYear: 2005,
  ownerName: 'Ms. Paulette (Paulette Senior)',
  serviceAreasLine: 'Serving Vineland, Millville and Bridgeton (Cumberland County, NJ)',
  attributes: ['Wheelchair accessible entrance', 'Wheelchair accessible parking', 'Tours by appointment'],
  gbpDescription:
    "Uriah Child Care is a licensed child care center at 30 W Chestnut Ave in Vineland, NJ, led by Ms. Paulette, who has cared for Cumberland County children since 2005. We serve families in Vineland, Millville and Bridgeton with toddler care, kindergarten readiness, and before and after school care for ages 2.5 and up. We are open Monday to Saturday, early morning to 11 pm, for parents who work early mornings, evenings and Saturdays. Our play-based curriculum builds language, social and early learning skills, and parents get regular updates about their child's day. We accept NJ childcare subsidy (CCAP) for families who qualify and take part in the USDA food program (CACFP). Book a tour to see our classrooms and meet Ms. Paulette.",
  gbpUrl: `https://www.google.com/maps/place/?q=place_id:${PLACE_ID}`,
  gbpReviewUrl: `https://search.google.com/local/reviews?placeid=${PLACE_ID}`,
  gbpWriteReviewUrl: `https://search.google.com/local/writereview?placeid=${PLACE_ID}`,
  sameAs: [],
  socialLinks: [],
  titleTemplate: '%s | Uriah Child Care',
  defaultSeo: {
    _type: 'seoFields',
    metaTitle: 'Uriah Child Care',
    metaDescription:
      'Licensed day care center in Vineland, NJ for ages 2.5 and up. Open Monday to Saturday, early morning to 11 pm, for parents who work shifts. Book a tour.',
    ogImage: img('classroom-uriah-child-care-vineland', 'Classroom at Uriah Child Care in Vineland, NJ'),
  },
  announcement: {
    enabled: true,
    text: 'Now enrolling ages 2.5 and up at our Vineland center. Book a tour.',
    link: link.internal('page-tour'),
  },
  footerText: 'A licensed child care center in Vineland, NJ, open Monday to Saturday.',
  copyrightName: 'Uriah Child Care',
}

/** The News listing is a route, not a document, so it is linked by path. */
const NEWS = { _type: 'link', linkType: 'external', external: '/news/' }

const navItem = (label, id, children = []) => ({
  _key: key(),
  label,
  ...(id ? { link: link.internal(id) } : {}),
  ...(children.length ? { children: children.map(([l, cid]) => ({ _key: key(), label: l, link: typeof cid === 'string' ? link.internal(cid) : cid })) } : {}),
})

export const navigation = {
  _id: 'navigation',
  _type: 'navigation',
  headerLinks: [
    navItem('Programs', null, [
      ['Toddler care (2.5 and up)', 'service-toddler-care'],
      ['Early learning (2.5 to 5)', 'category-preschool'],
      ['Kindergarten readiness', 'service-kindergarten-readiness'],
      ['After school program', 'category-after-school'],
      ['Before school care', 'service-before-school'],
    ]),
    navItem('Shift care', 'category-shift-care', [
      ['Early morning care', 'service-first-shift'],
      ['Evening care', 'service-evening'],
      ['Late evening care (until 11 pm)', 'service-late-evening'],
      ['Saturday daycare', 'service-weekend'],
      ['For shift workers', 'service-shift-workers'],
      ['Full-time and part-time', 'service-full-part-time'],
    ]),
    navItem('Tuition & CCAP', 'page-tuition'),
    navItem('About', null, [
      ['Meet Ms. Paulette', 'page-about'],
      ['Our center', 'page-our-center'],
      ['Safety and licensing', 'service-safe-licensed'],
      ['Reviews', 'page-reviews'],
      ['News', NEWS],
      ['FAQ', 'page-faq'],
    ]),
  ],
  headerCta: { _type: 'ctaButton', label: 'Book a tour', variant: 'primary', link: link.internal('page-tour') },
  footerColumns: [
    {
      _key: key(),
      heading: 'Get to know us',
      links: [
        ['Meet Ms. Paulette', 'page-about'],
        ['Our center', 'page-our-center'],
        ['Reviews', 'page-reviews'],
        ['News', NEWS],
        ['Tuition and CCAP', 'page-tuition'],
        ['Questions parents ask', 'page-faq'],
        ['Book a tour', 'page-tour'],
      ].map(([label, id]) => ({ _key: key(), label, link: typeof id === 'string' ? link.internal(id) : id })),
    },
  ],
}

export const team = [
  {
    _id: 'team-ms-paulette',
    _type: 'teamMember',
    name: 'Ms. Paulette',
    role: 'Owner',
    photo: img('ms-paulette-senior-owner-uriah-child-care', 'Ms. Paulette, owner of Uriah Child Care in Vineland, NJ'),
    bio: 'Ms. Paulette has cared for Cumberland County children since 2005. Families who have known her for years now bring their younger children, and some of their grandchildren, to the new Vineland center.',
    credentials: ['Pediatric First Aid and CPR/AED certified'],
    order: 1,
  },
  {
    _id: 'team-tameca-burke',
    _type: 'teamMember',
    name: 'Tameca Burke',
    role: 'Director',
    photo: img('tameca-burke-director-uriah-child-care', 'Tameca Burke, director of Uriah Child Care in Vineland, NJ'),
    bio: "Tameca is Ms. Paulette's daughter and runs the center day to day, from enrollment and schedules to keeping families in the loop. She has about five years of experience in child care.",
    order: 2,
  },
]

const reviewUrl = `https://search.google.com/local/reviews?placeid=${PLACE_ID}`
const review = (id, name, quote, order, context) => ({
  _id: `review-${id}`,
  _type: 'testimonial',
  name,
  ...(quote ? { quote } : {}),
  source: 'Google',
  reviewUrl,
  firstParty: true,
  rating: 5,
  order,
  ...(context ? { context } : {}),
})

/** All 8 Google reviews, copied word for word from the Google Business Profile (checked 2026-11-04). Never edit the wording. */
export const reviews = [
  review(
    'monique-willoughby',
    'Monique Willoughby',
    "Ms. Paulette is an amazing Daycare instructor/teacher, safe and clean environment , my son Noah learned how to communicate his words better because of Ms. Paulette, I was a nervous at first because Noah had never been to daycare however Ms. Paulette reassured me through actions that Noah is always safe in her care and my worries has been at eased ever since. He is now interactive with the other children learning how to share and properly play with the other children. Ms. Paulette also communicates to me when she needs to redirect Noah from making a poor choice. I would recommend Ms. Paulette to other parents in need of childcare.",
    1,
  ),
  review(
    'rockay-davis',
    'Rockay Davis',
    "Ms. Paulette is a very impactful caretaker. She takes excellent care of our son, who is two years old. Our son has gained a wealth of knowledge while attending Uriahs Child Care. Additionally, she is a warm soul, and I do not know what we would do without her. Ms. Paulette assist us tremendously with our work schedules, and we are thankful for her. I would highly recommend Ms. Paulette to be your child's caretaker because they will be in great hands. You do not have to worry about their well-being while they are under her care. She is truly a blessing.",
    2,
  ),
  review(
    'shameka-humphries',
    'Shameka Humphries',
    "Miss Paulette is truly amazing! My son has been going to her daycare since he was 9 months old and she has taken such great care of him. She is truly a gem and just know that your child is in AMAZING hands with her. She's more than a daycare provider; she tries to teach the children and genuinely cares for them. My son is always clean and there are NO issues with anything while he's there. She's the best around. I would recommend her 1000 times over.",
    3,
  ),
  review(
    'ashley-whitaker',
    'Ashley Whitaker',
    'Ms. Paulette is an awesome daycare provider. My son has been attending her day care since he was four months old, he will soon be two and he loves going there. I am so happy to have a day care provider that is caring, loving and willing to teach the kids everything they need to know.',
    4,
  ),
  review(
    'vana-tinamarie',
    'Vana TinaMarie',
    'Ms Paulette is an excellent child care provider she took care of my first son , is currently taking care of my second son and she will be taking care of my baby when he gets old enough to go to daycare as well ! I highly recommended her !',
    5,
  ),
  review(
    'marian-henry',
    'Marian Henry',
    'I definitely recommend you riot childcare. Miss Paulette is a very caring and nurturing person.',
    6,
  ),
  review(
    'marcia-antina',
    'Marcia Antina',
    'paulette is a great child care provider, she has been watching my grand children throughout the years and she always takes great care of them',
    7,
  ),
  review('cherryanne-henry', 'cherryanne henry', '', 8),
]

const faqDoc = (id, question, answer, order, category) => ({
  _id: `faq-${id}`,
  _type: 'faq',
  question,
  answer,
  order,
  category,
})

/** The global FAQ (/faq/). Answers are reused word for word in GBP Q&A. */
export const faqs = [
  faqDoc('hours', 'What are your hours?', md`We are open Monday to Saturday, 6 am to 11 pm: early morning, daytime, evening and late evening care. We are closed on Sunday. See [child care for every shift](/child-care-vineland-nj/) for how families fit care around their work.`, 1, 'Hours and schedules'),
  faqDoc('ages', 'What ages do you care for?', md`We care for children ages 2.5 and up: [toddler care](/toddler-care-vineland-nj/) from 2½, [kindergarten readiness](/kindergarten-readiness-vineland-nj/) for 4 and 5-year-olds, and [before and after school care](/after-school-program-vineland-nj/) for school-age children up to 13.`, 2, 'Ages and programs'),
  faqDoc('third-shift', 'Do you offer care after 11 pm or overnight?', md`Our posted hours end at 11 pm, so parents who work late can pick up before we close. If you work an overnight shift and need care after 11 pm, call us at [(856) 455-6701](tel:8564556701). Ms. Paulette will talk with you about your schedule.`, 3, 'Hours and schedules'),
  faqDoc('ccap', 'Do you accept NJ childcare subsidy (CCAP)?', md`Yes. We accept NJ childcare subsidy (CCAP) for families who qualify. In Cumberland County the program is managed locally by Rutgers Southern Regional CCR&R in Vineland, [(856) 462-6800](tel:8564626800), and we are happy to walk you through the steps. Read more on our [CCAP page](/ccap-child-care-vineland-nj/).`, 4, 'Cost and subsidy'),
  faqDoc('cost', 'How much does child care cost?', md`Tuition depends on your child's age, the days and the shift you need. Call us or [book a tour](/tour/) and we will give you a clear price for your schedule. See [tuition and how to pay](/tuition/).`, 5, 'Cost and subsidy'),
  faqDoc('meals', 'Do you provide meals and snacks?', md`Yes. We participate in the USDA Child and Adult Care Food Program (CACFP), and children are served breakfast from 7:30 to 9 am, lunch at 12 noon, a snack at 3 pm, dinner at 6 pm and an evening snack at 9 pm. Food allergies need a doctor’s note and an Allergy Action Plan. More on [meals at our center](/daycare-meals-vineland-nj/).`, 6, 'Daily life'),
  faqDoc('curriculum', 'What will my child learn?', md`We use a play-based curriculum built on Experience Early Learning, with a developmental continuum of skills and weekly activities for language, math, science and art. Circle time covers the calendar, weather, letters and counting. See [play-based learning](/play-based-learning-vineland-nj/).`, 7, 'Ages and programs'),
  faqDoc('updates', 'How will I know how my child’s day went?', md`Parents check their child in and out with Procare, and we keep you updated about your child's day. You can always call us too.`, 8, 'Daily life'),
  faqDoc('discipline', 'How do you handle discipline?', md`We use positive discipline: clear and simple rules, redirection, and praise for good choices. We never use spanking or any physical punishment, shaming or withholding food. We talk with you when we need to redirect your child, so we can work on it together.`, 9, 'Safety'),
  faqDoc('school-transport', 'Can my child get to and from school from your center?', md`Yes, by school bus. We don't drive children to or from school, but school buses can pick up and drop off at our center. Ask your school district about a bus stop at 30 W Chestnut Ave. We do offer full-day [summer care](/summer-child-care-vineland-nj/) and care on [school closure days](/school-closure-care-vineland-nj/).`, 15, 'Ages and programs'),
  faqDoc('pickup', 'Who can pick up my child?', md`We release children only to parents and to the adults you authorize in writing. Anyone we don't know is asked for photo ID, even grandparents. If plans change, tell us in writing before pickup.`, 10, 'Safety'),
  faqDoc('license', 'Are you licensed?', md`Yes. We are licensed by the New Jersey Department of Children and Families as a child care center, license ID CCC128557. Our license and the DCF information for parents are posted in the lobby. See [safety and licensing](/safe-licensed-daycare-vineland-nj/).`, 11, 'Safety'),
  faqDoc('tour', 'How do I schedule a tour?', md`[Book a tour](/tour/) online or call us at [(856) 455-6701](tel:8564556701). Tours take about 20 minutes, and you are welcome to bring your little one.`, 12, 'Enrolling'),
  faqDoc('potty', 'Does my child need to be potty trained?', md`No. Many of our 2½ and 3-year-olds are still learning, which is normal: only about half of children are fully potty trained by age 3. We work on it together with you. See [potty training support](/potty-training-daycare-vineland-nj/).`, 13, 'Ages and programs'),
  faqDoc('holidays', 'Which holidays are you closed?', md`We are closed on New Year's Day, Presidents' Day, Good Friday, Memorial Day, Juneteenth, Independence Day, Labor Day, Thanksgiving Day and the Friday after, Christmas Eve, Christmas Day and New Year's Eve. When a holiday falls on a weekend, we close the nearest Friday or Monday. We also close for the holiday week, from December 24 to January 2. We share each year's dates in our monthly newsletter and on our news page.`, 16, 'Hours and schedules'),
  faqDoc('snow', 'Are you open on snow days?', md`Yes. We stay open when public schools have a snow day, though we may open a little late. If we ever have to close for something like an ice storm or a power outage, we let families know as early as we can. See [school closure care](/school-closure-care-vineland-nj/).`, 17, 'Hours and schedules'),
  faqDoc('enroll', 'What do I need to enroll?', md`We enroll children from 2½ to 13, for families paying with NJ childcare subsidy (CCAP) and families paying on their own. Before the first day, you fill out an enrollment form, a child information record and our policy agreement, and bring a health appraisal (a physical signed by your child's doctor) and their immunization record. New Jersey requires children in child care to be up to date on vaccines. [Book a tour](/tour/) and we will give you the forms.`, 18, 'Enrolling'),
  faqDoc('sick', 'When should my child stay home sick?', md`Please keep your child home with a fever of 100.9°F or higher until they have been fever-free for 48 hours without medicine, and for 24 hours after vomiting. Children also stay home with diarrhea, a cough or runny nose that won't go away, or a contagious illness like strep throat (24 hours on antibiotics first) or lice. A new rash needs a doctor's note. If your child gets sick here, we call you, and we ask that you or an emergency contact come within the hour.`, 19, 'Daily life'),
  faqDoc('outside', 'Do children play outside and go on trips?', md`Yes. Children go outside to play when the weather allows, so send a labeled jacket, hat and boots that suit the season. We also take nature walks and occasional field trips to places like parks, museums and apple orchards. We always tell you about a trip ahead of time, and any trip with transportation needs your signed permission slip.`, 20, 'Daily life'),
  faqDoc('bring', 'What should my child bring?', md`A full change of clothes (underwear, socks, pants and a shirt) in a labeled bag, weather-appropriate outdoor clothes, and diapers or pull-ups if your child uses them (we provide wipes). A small blanket or comfort item for rest time is welcome. Please keep toys at home unless it is show-and-tell day, and never send toy guns, gum, money or candy. Label everything with your child's name.`, 21, 'Daily life'),
  faqDoc('families', 'Do families get together at the center?', md`Yes. Every January we hold a Winter Family Festival with dinner and entertainment, and in June we celebrate graduation with a family potluck. Families are also invited to our Grandparents' Day, Mother's Day and Father's Day celebrations. We send a center newsletter every month so you always know what's coming up.`, 22, 'Daily life'),
  faqDoc('where', 'Where are you, and do you serve Millville and Bridgeton?', md`We are at 30 W Chestnut Ave, Vineland, NJ 08360, with an accessible ramp and parking. Many of our families drive in from [Millville](/millville-nj/) and [Bridgeton](/bridgeton-nj/).`, 14, 'Enrolling'),
]

export { button, img, ref }
