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
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      open24Hours: false,
      opens: '06:00',
      closes: '23:00',
    },
  ],
  hoursSummary: 'Monday to Sunday, 6 am to 11 pm',
  businessType: 'ChildCare',
  agesServed: 'Ages 2.5 and up',
  ageMin: 2.5,
  ageMax: 13,
  shiftsLine: 'First, second and third shift care, 7 days a week',
  programsLine: 'Toddler care, preschool and pre-K, before and after school care, and shift care',
  subsidyStatement: 'We accept NJ childcare subsidy (CCAP) for families who qualify.',
  foodProgramStatement: 'We participate in the USDA Child and Adult Care Food Program (CACFP).',
  license: {
    issuer: 'New Jersey Department of Children and Families',
    number: 'CCC128557',
    summary: 'Licensed by NJ DCF as a child care center, license ID CCC128557',
    expires: '2026-12-17',
  },
  foundingYear: 2005,
  ownerName: 'Ms. Paulette',
  serviceAreasLine: 'Serving Vineland, Millville and Bridgeton (Cumberland County, NJ)',
  attributes: ['Wheelchair accessible entrance', 'Wheelchair accessible parking', 'Tours by appointment'],
  gbpDescription:
    "Uriah Child Care is a licensed child care center at 30 W Chestnut Ave in Vineland, NJ, led by Ms. Paulette, who has cared for Cumberland County children since 2005. We serve families in Vineland, Millville and Bridgeton with toddler care, preschool and pre-K, and before and after school care for ages 2.5 and up. We are open 7 days a week with first, second and third shift care for parents who work early mornings, nights and weekends. Our play-based curriculum builds language, social and early learning skills, and parents get regular updates about their child's day. We accept NJ childcare subsidy (CCAP) for families who qualify and take part in the USDA food program (CACFP). Book a tour to see our classrooms and meet Ms. Paulette.",
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
      'Licensed day care center in Vineland, NJ for ages 2.5 and up. Open 7 days, 6 am to 11 pm, with first, second and third shift care. Book a tour.',
    ogImage: img('exterior-now-enrolling-flags-uriah-child-care-vineland', 'Uriah Child Care building at 30 W Chestnut Ave in Vineland, NJ'),
  },
  announcement: {
    enabled: true,
    text: 'Now enrolling ages 2.5 and up at our Vineland center. Book a tour.',
    link: link.internal('page-tour'),
  },
  footerText: 'A licensed child care center in Vineland, NJ, open 7 days a week.',
  copyrightName: 'Uriah Child Care',
}

const navItem = (label, id, children = []) => ({
  _key: key(),
  label,
  ...(id ? { link: link.internal(id) } : {}),
  ...(children.length ? { children: children.map(([l, cid]) => ({ _key: key(), label: l, link: link.internal(cid) })) } : {}),
})

export const navigation = {
  _id: 'navigation',
  _type: 'navigation',
  headerLinks: [
    navItem('Programs', null, [
      ['Toddler care (2.5 and up)', 'service-toddler-care'],
      ['Preschool', 'category-preschool'],
      ['Pre-K', 'service-pre-k'],
      ['Kindergarten readiness', 'service-kindergarten-readiness'],
      ['After school program', 'category-after-school'],
      ['Before school care', 'service-before-school'],
    ]),
    navItem('Shift care', 'category-shift-care', [
      ['Early morning care', 'service-first-shift'],
      ['Evening care', 'service-evening'],
      ['Late evening care (until 11 pm)', 'service-late-evening'],
      ['Weekend daycare', 'service-weekend'],
      ['For shift workers', 'service-shift-workers'],
      ['Full-time and part-time', 'service-full-part-time'],
    ]),
    navItem('Tuition & CCAP', 'page-tuition'),
    navItem('About', null, [
      ['Meet Ms. Paulette', 'page-about'],
      ['Our center', 'page-our-center'],
      ['Safety and licensing', 'service-safe-licensed'],
      ['Reviews', 'page-reviews'],
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
        ['Tuition and CCAP', 'page-tuition'],
        ['Questions parents ask', 'page-faq'],
        ['Book a tour', 'page-tour'],
      ].map(([label, id]) => ({ _key: key(), label, link: link.internal(id) })),
    },
  ],
}

export const team = [
  {
    _id: 'team-ms-paulette',
    _type: 'teamMember',
    name: 'Ms. Paulette Senior',
    role: 'Owner',
    photo: img('ms-paulette-senior-owner-uriah-child-care', 'Ms. Paulette Senior, owner of Uriah Child Care in Vineland, NJ'),
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
    bio: "Tameca is Ms. Paulette's daughter and runs the center day to day, from enrollment and schedules to keeping families in the loop.",
    order: 2,
  },
]

const reviewUrl = `https://search.google.com/local/reviews?placeid=${PLACE_ID}`
const review = (id, name, quote, order, context) => ({
  _id: `review-${id}`,
  _type: 'testimonial',
  name,
  quote,
  source: 'Google',
  reviewUrl,
  firstParty: true,
  order,
  ...(context ? { context } : {}),
})

/** Real Google reviews copied word for word from the old site's review widget. Star ratings still need checking on the GBP. */
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
    'jake-jones',
    'Jake Jones',
    'Miss Paulette haves been watching my children for some time now her daycare is very clean , she also does a amazing job with the kids one thing for sure your kids are gone come home the same way you brought them clean , im bless to have such a wonderful daycare provider for my children she loves them like her own to the point i also made her my daughter godmother ! if anything i highly recommend this daycare for you and your family',
    3,
  ),
  review(
    'vana-tinamarie',
    'Vana TinaMarie',
    'Ms Paulette is an excellent child care provider she took care of my first son , is currently taking care of my second son and she will be taking care of my baby when he gets old enough to go to daycare as well ! I highly recommended her !',
    4,
  ),
  review(
    'marcia-bailey',
    'Marcia Bailey',
    'paulette is a great child care provider, she has been watching my grand children throughout the years and she always takes great care of them',
    5,
  ),
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
  faqDoc('hours', 'What are your hours?', md`We are open Monday to Sunday, 6 am to 11 pm, with first, second and third shift care. See [child care for every shift](/child-care-vineland-nj/) for how families use each shift.`, 1, 'Hours and schedules'),
  faqDoc('ages', 'What ages do you care for?', md`We care for children ages 2.5 and up: [toddler care](/toddler-care-vineland-nj/) from 2½, [preschool](/preschool-vineland-nj/) and [pre-K](/pre-k-vineland-nj/), and [before and after school care](/after-school-program-vineland-nj/) for school-age children up to 13. We do not offer infant care at this time.`, 2, 'Ages and programs'),
  faqDoc('third-shift', 'What does third shift care mean at Uriah?', md`Our third shift is our latest care of the day. We stay open until 11 pm, so parents who work into the night can pick up before we close. We do not offer overnight care. Call us at [(856) 455-6701](tel:8564556701) and we will go over the times that fit your job.`, 3, 'Hours and schedules'),
  faqDoc('ccap', 'Do you accept NJ childcare subsidy (CCAP)?', md`Yes. We accept NJ childcare subsidy (CCAP) for families who qualify. In Cumberland County the program is managed locally by Rutgers Southern Regional CCR&R in Vineland, and we are happy to walk you through the steps. Read more on our [CCAP page](/ccap-child-care-vineland-nj/).`, 4, 'Cost and subsidy'),
  faqDoc('cost', 'How much does child care cost?', md`Tuition depends on your child's age, the days and the shift you need. Call us or [book a tour](/tour/) and we will give you a clear price for your schedule. See [tuition and how to pay](/tuition/).`, 5, 'Cost and subsidy'),
  faqDoc('meals', 'Do you provide meals and snacks?', md`Yes. We participate in the USDA Child and Adult Care Food Program (CACFP), and children are served meals and snacks during the day. Tell us about any allergies when you enroll. More on [meals at our center](/daycare-meals-vineland-nj/).`, 6, 'Daily life'),
  faqDoc('curriculum', 'What will my child learn?', md`We use a play-based curriculum built on Experience Early Learning, with a developmental continuum of skills and weekly activities for language, math, science and art. Circle time covers the calendar, weather, letters and counting. See [play-based learning](/play-based-learning-vineland-nj/).`, 7, 'Ages and programs'),
  faqDoc('updates', 'How will I know how my child’s day went?', md`Parents check their child in and out with the Brightwheel app at our lobby kiosk, and we keep you updated about your child's day. You can always call or text us too.`, 8, 'Daily life'),
  faqDoc('discipline', 'How do you handle discipline?', md`We use positive discipline: clear and simple rules, redirection, and praise for good choices. We never use spanking or any physical punishment, shaming or withholding food. We talk with you when we need to redirect your child, so we can work on it together.`, 9, 'Safety'),
  faqDoc('school-transport', 'Do you pick children up from school?', md`No. We do not offer school pickup or drop-off. Parents bring children to the center and pick them up here. We do offer full-day [summer care](/summer-child-care-vineland-nj/) and care on [school closure days](/school-closure-care-vineland-nj/).`, 15, 'Ages and programs'),
  faqDoc('pickup', 'Who can pick up my child?', md`We release children only to parents and to the adults you authorize in writing. Anyone we don't know is asked for ID. If plans change, call us before pickup.`, 10, 'Safety'),
  faqDoc('license', 'Are you licensed?', md`Yes. We are licensed by the New Jersey Department of Children and Families as a child care center, license ID CCC128557. Our license and the DCF information for parents are posted in the lobby. See [safety and licensing](/safe-licensed-daycare-vineland-nj/).`, 11, 'Safety'),
  faqDoc('tour', 'How do I schedule a tour?', md`[Book a tour](/tour/) online or call us at [(856) 455-6701](tel:8564556701). Tours take about 20 minutes, and you are welcome to bring your little one.`, 12, 'Enrolling'),
  faqDoc('potty', 'Does my child need to be potty trained?', md`No. Many of our 2½ and 3-year-olds are still learning, and we work on potty training together with you. See [potty training support](/potty-training-daycare-vineland-nj/).`, 13, 'Ages and programs'),
  faqDoc('where', 'Where are you, and do you serve Millville and Bridgeton?', md`We are at 30 W Chestnut Ave, Vineland, NJ 08360, with an accessible ramp and parking. Many of our families drive in from [Millville](/millville-nj/) and [Bridgeton](/bridgeton-nj/).`, 14, 'Enrolling'),
]

export { button, img, ref }
