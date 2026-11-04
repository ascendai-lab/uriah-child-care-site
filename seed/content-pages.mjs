/**
 * Seed content: the home page and the 6 page-builder pages (tour, about, our center, reviews, FAQ, tuition).
 */
import { button, key, link, md, ref } from './lib.mjs'
import { IMG } from './content-programs.mjs'

const slug = (current) => ({ _type: 'slug', current })
const seo = (metaTitle, metaDescription) => ({ _type: 'seoFields', metaTitle, metaDescription })
const block = (_type, fields) => ({ _type, _key: key(), ...fields })
const refs = (...ids) => ids.map(ref)
const tourBtn = (label = 'Book a tour') => button(label, link.internal('page-tour'), 'primary')

const trustStrip = () =>
  block('statsBlock', {
    background: 'white',
    items: [
      ['Since 2005', 'Caring for Cumberland County kids'],
      ['7 days', 'Open every day of the week'],
      ['6 am – 11 pm', 'First, second and third shift'],
      ['Ages 2½+', 'Toddlers to school age'],
      ['CCAP', 'NJ childcare subsidy accepted'],
    ].map(([value, label]) => ({ _key: key(), _type: 'stat', value, label })),
  })

export const homePage = {
  _id: 'homePage',
  _type: 'homePage',
  title: 'Home',
  pageBuilder: [
    block('hero', {
      layout: 'photoFade',
      eyebrow: 'Now enrolling ages 2.5 and up',
      heading: 'Day care center in Vineland, NJ',
      accentWord: 'Vineland, NJ',
      subheading:
        'Uriah Child Care is a licensed child care center at 30 W Chestnut Ave, open Monday to Sunday, 6 am to 11 pm. Toddler care, preschool and pre-K, and before and after school care, with first, second and third shift care for working parents.',
      image: IMG.exterior(),
      showRating: true,
      showPhone: true,
      accent: 'sunshine',
      buttons: [tourBtn()],
    }),
    trustStrip(),
    block('servicesBlock', {
      mode: 'all',
      heading: 'Programs for every age we serve',
      intro: 'From 2½-year-olds to school-age kids up to 13, every program follows our play-based curriculum and runs 7 days a week.',
      background: 'default',
    }),
    block('imageText', {
      eyebrow: 'Ages 2.5 to 5',
      heading: 'Preschool in Vineland',
      body: md`Our play-based preschool, built on the Experience Early Learning curriculum, helps children learn letters, numbers, colors and how to be a good friend. Every day starts with circle time, and older children move into [pre-K](/pre-k-vineland-nj/) and [kindergarten readiness](/kindergarten-readiness-vineland-nj/). Children don't need to be potty trained to start.`,
      image: IMG.classroom(),
      imagePosition: 'right',
      imageShape: 'blob',
      accent: 'coral',
      showDoodles: true,
      background: 'white',
      buttons: [button('Explore preschool', link.internal('category-preschool'), 'secondary')],
    }),
    block('imageText', {
      eyebrow: 'School age, up to 13',
      heading: 'After school program in Vineland',
      body: md`Before school from 6 am and after school until 11 pm, school-age kids get a snack, [homework time](/homework-help-vineland-nj/) with help on reading, and time to play with friends in a safe, licensed center.`,
      image: IMG.lobby(),
      imagePosition: 'left',
      imageShape: 'arch',
      accent: 'sky',
      showDoodles: true,
      background: 'default',
      buttons: [button('See the after school program', link.internal('category-after-school'), 'secondary')],
    }),
    block('imageText', {
      eyebrow: 'Open 7 days, 6 am to 11 pm',
      heading: 'Child care for every shift in Vineland',
      body: md`Nurses, warehouse and plant workers, retail and restaurant staff: we are open when you work. [Early morning care](/first-shift-child-care-vineland-nj/) from 6 am, [evening care](/evening-child-care-vineland-nj/) with dinner, [late evening care until 11 pm](/late-evening-child-care-vineland-nj/), and [weekend daycare](/weekend-daycare-vineland-nj/) on Saturday and Sunday.`,
      image: IMG.entrance(),
      imagePosition: 'right',
      imageShape: 'circle',
      accent: 'sage',
      showDoodles: true,
      background: 'white',
      buttons: [button('Find care for your shift', link.internal('category-shift-care'), 'secondary')],
    }),
    block('featureGrid', {
      style: 'checklist',
      heading: 'Why Vineland families choose Uriah',
      intro: 'A small, family-run center where your child is known by name.',
      image: IMG.paulette(),
      imageShape: 'circle',
      background: 'sunshine',
      items: [
        ['Led by Ms. Paulette since 2005', 'Families who have known her for years now bring their younger children, and their grandchildren.', 'page-about'],
        ['Licensed by NJ DCF', 'License ID CCC128557, posted in our lobby with the state’s information for parents.', 'service-safe-licensed'],
        ['Open when you work', 'Monday to Sunday, 6 am to 11 pm, with first, second and third shift care.', 'category-shift-care'],
        ['NJ childcare subsidy (CCAP) accepted', 'We walk you through the steps for families who qualify.', 'service-ccap'],
        ['Meals included', 'Meals and snacks through the USDA Child and Adult Care Food Program (CACFP).', 'service-meals'],
        ['Brightwheel check-in and updates', 'Secure check-in at the lobby kiosk, and updates about your child’s day.', 'page-our-center'],
      ].map(([title, description, id]) => ({ _key: key(), _type: 'feature', title, description, link: link.internal(id) })),
      buttons: [button('Meet Ms. Paulette', link.internal('page-about'), 'secondary')],
    }),
    block('testimonialsBlock', {
      mode: 'selected',
      heading: 'What local families say',
      intro: 'Real reviews from parents and grandparents on Google.',
      testimonials: refs('review-monique-willoughby', 'review-rockay-davis', 'review-jake-jones'),
      background: 'default',
    }),
    block('serviceAreasBlock', {
      mode: 'all',
      heading: 'Serving Vineland, Millville and Bridgeton',
      intro: 'Our center is in Vineland, and many families drive in from across Cumberland County.',
      background: 'white',
    }),
    block('mapBlock', {
      heading: 'Visit our Vineland center',
      notes: 'We are at 30 W Chestnut Ave, with a wheelchair ramp and accessible parking out front. Tours are by appointment.',
      background: 'default',
    }),
    block('factTableBlock', {
      heading: 'Uriah Child Care at a glance',
      background: 'white',
    }),
    block('faqBlock', {
      mode: 'selected',
      heading: 'Questions parents ask',
      faqs: refs('faq-hours', 'faq-ages', 'faq-third-shift', 'faq-ccap', 'faq-cost', 'faq-tour'),
      background: 'default',
      buttons: [button('See all questions', link.internal('page-faq'), 'secondary')],
    }),
  ],
  seo: seo(
    'Day Care Center in Vineland, NJ | Uriah Child Care',
    'Licensed day care center in Vineland, NJ for ages 2.5 and up. Open 7 days, 6 am to 11 pm, with first, second and third shift care. CCAP accepted. Book a tour.',
  ),
}

const page = (id, fields) => ({ _id: `page-${id}`, _type: 'page', ...fields })

export const pages = [
  page('tour', {
    title: 'Book a Tour of Our Vineland Child Care Center',
    slug: slug('tour'),
    pageBuilder: [
      block('hero', {
        layout: 'card',
        eyebrow: 'Tours by appointment',
        heading: 'Book a tour of our Vineland child care center',
        accentWord: 'Book a tour',
        subheading:
          'See the classroom, meet Ms. Paulette, and ask every question you have. Tours take about 20 minutes, and you are welcome to bring your little one. Fill in the form or call us.',
        image: IMG.paulette(),
        accent: 'coral',
        showPhone: true,
      }),
      block('contactFormBlock', {
        anchorId: 'tour-form',
        heading: 'Request your tour',
        intro: 'Tell us a little about your child and your schedule. Ms. Paulette or Tameca will call you within one business day to pick a time.',
      }),
      block('mapBlock', {
        heading: 'Where to find us',
        notes: '30 W Chestnut Ave, Vineland, NJ 08360. Park out front; the ramp and accessible parking are next to the entrance.',
        background: 'white',
      }),
      block('faqBlock', {
        mode: 'selected',
        heading: 'Before your tour',
        faqs: refs('faq-tour', 'faq-ages', 'faq-hours', 'faq-ccap', 'faq-cost'),
      }),
    ],
    seo: seo('Book a Tour | Uriah Child Care, Vineland, NJ', 'Book a tour of Uriah Child Care at 30 W Chestnut Ave in Vineland, NJ. Meet Ms. Paulette, see our classroom and ask about care for ages 2.5+.'),
  }),

  page('about', {
    title: 'Meet Ms. Paulette, Owner of Uriah Child Care',
    slug: slug('about-ms-paulette'),
    pageBuilder: [
      block('hero', {
        layout: 'card',
        eyebrow: 'Caring for local children since 2005',
        heading: 'Meet Ms. Paulette',
        accentWord: 'Ms. Paulette',
        subheading:
          'Ms. Paulette Senior has cared for Cumberland County children since 2005. Today she runs Uriah Child Care in Vineland with her daughter, Tameca Burke, our director.',
        image: IMG.paulette(),
        accent: 'sunshine',
        buttons: [tourBtn('Book a tour with Ms. Paulette')],
      }),
      block('imageText', {
        heading: 'Families who come back, generation after generation',
        body: md`For many families, Ms. Paulette is more than a child care provider. Parents who once brought their first child now bring their second and third, and some grandparents bring their grandchildren. One father even made her his daughter's godmother.

What families mention most is how she treats their children: "she loves them like her own." Children come home clean, cared for and happy, and parents always know how the day went.`,
        image: IMG.entrance(),
        imagePosition: 'right',
        imageShape: 'arch',
        accent: 'coral',
        background: 'white',
      }),
      block('teamBlock', {
        mode: 'all',
        heading: 'The people who care for your child',
        intro: 'A small, family-run team.',
      }),
      block('textBlock', {
        heading: 'From Millville to Vineland',
        width: 'narrow',
        body: md`Ms. Paulette cared for children in Millville for many years before opening Uriah Child Care at 30 W Chestnut Ave in Vineland. The new center gave her room to welcome more families and to stay open 7 days a week, from 6 am to 11 pm, for parents who work every kind of shift.

The center is licensed by the New Jersey Department of Children and Families, license ID CCC128557. See [safety and licensing](/safe-licensed-daycare-vineland-nj/) or [take a look around our center](/our-center/).`,
        background: 'default',
      }),
      block('testimonialsBlock', {
        mode: 'selected',
        heading: 'In parents’ words',
        testimonials: refs('review-jake-jones', 'review-vana-tinamarie', 'review-marcia-bailey'),
        background: 'white',
      }),
    ],
    seo: seo('Meet Ms. Paulette | Owner of Uriah Child Care, Vineland', 'Ms. Paulette Senior has cared for Cumberland County children since 2005. Meet the owner and director of Uriah Child Care in Vineland, NJ.'),
  }),

  page('our-center', {
    title: 'Our Child Care Center in Vineland, NJ',
    slug: slug('our-center'),
    pageBuilder: [
      block('hero', {
        layout: 'card',
        eyebrow: '30 W Chestnut Ave, Vineland',
        heading: 'Take a look around our center',
        accentWord: 'our center',
        subheading:
          'A bright, welcoming child care center with a secure entrance, Brightwheel check-in and an accessible ramp and parking. Here is what you will see when you visit.',
        image: IMG.exterior(),
        accent: 'sky',
        buttons: [tourBtn('Book a tour to see it in person')],
      }),
      block('galleryBlock', {
        heading: 'Inside and out',
        intro: 'Photos of our building and common areas. We do not post photos of children without written permission from their parents.',
        images: [IMG.exterior(), IMG.entrance(), IMG.porch(), IMG.ramp(), IMG.lobby(), IMG.signIn(), IMG.kiosk(), IMG.classroom(), IMG.schedule(), IMG.restroom()].map((i) => ({ ...i, _key: key() })),
        background: 'white',
      }),
      block('featureGrid', {
        style: 'cards',
        heading: 'What parents notice',
        columns: 3,
        items: [
          ['Brightwheel check-in', 'Check your child in and out on the kiosk in the lobby, and get updates about their day.'],
          ['Secure entrance', 'A covered porch with a security camera at the front door.'],
          ['Accessible for everyone', 'A wheelchair ramp, accessible parking and an accessible restroom.'],
          ['A classroom made for play', 'Learning centers, books, art supplies and a picture schedule children can follow.'],
          ['License posted in the lobby', 'Our NJ DCF license (CCC128557) and the state’s information for parents.'],
          ['Clean and cared for', 'Parents mention it in their reviews: “her daycare is very clean.”'],
        ].map(([title, description]) => ({ _key: key(), _type: 'feature', title, description })),
        background: 'default',
      }),
      block('mapBlock', { heading: 'Find us', background: 'white' }),
    ],
    seo: seo('Our Center | Photos of Uriah Child Care in Vineland, NJ', 'See photos of Uriah Child Care at 30 W Chestnut Ave in Vineland, NJ: secure entrance, Brightwheel check-in, classroom and accessible ramp.'),
  }),

  page('reviews', {
    title: 'Uriah Child Care Reviews From Vineland Families',
    slug: slug('reviews'),
    pageBuilder: [
      block('hero', {
        layout: 'card',
        eyebrow: 'Google reviews',
        heading: 'What families say about Ms. Paulette',
        accentWord: 'Ms. Paulette',
        subheading: 'Real reviews from parents and grandparents, copied word for word from Google.',
        image: IMG.paulette(),
        accent: 'sage',
        showRating: true,
      }),
      block('testimonialsBlock', {
        mode: 'all',
        heading: 'Reviews from local families',
        background: 'white',
      }),
      block('ctaBlock', {
        heading: 'Is your family part of Uriah?',
        body: 'We would be grateful if you shared your experience on Google. It helps other Vineland parents find safe, caring child care.',
        background: 'sage',
        buttons: [button('Leave a Google review', link.external('https://search.google.com/local/writereview?placeid=ChIJk-4vYVw3x4kRSX5zZYYtB10'), 'primary')],
      }),
    ],
    seo: seo('Reviews | Uriah Child Care in Vineland, NJ', 'Read Google reviews of Uriah Child Care and Ms. Paulette from parents and grandparents in Vineland, Millville and Bridgeton, NJ.'),
  }),

  page('faq', {
    title: 'Child Care Questions Parents Ask',
    slug: slug('faq'),
    pageBuilder: [
      block('hero', {
        layout: 'card',
        eyebrow: 'FAQ',
        heading: 'Questions parents ask',
        accentWord: 'Questions',
        subheading: 'Hours, ages, cost, CCAP, meals, safety and how to enroll. Can’t find your answer? Call us at (856) 455-6701.',
        image: IMG.signIn(),
        accent: 'sunshine',
      }),
      block('faqBlock', {
        mode: 'all',
        heading: 'Everything parents ask us',
        background: 'white',
      }),
    ],
    seo: seo('FAQ | Uriah Child Care in Vineland, NJ', 'Answers about hours, ages, cost, CCAP, meals, safety and enrolling at Uriah Child Care in Vineland, NJ. Open 7 days, 6 am to 11 pm.'),
  }),

  page('tuition', {
    title: 'Tuition and CCAP at Uriah Child Care',
    slug: slug('tuition'),
    pageBuilder: [
      block('hero', {
        layout: 'card',
        eyebrow: 'Tuition and how to pay',
        heading: 'Tuition and NJ childcare subsidy (CCAP)',
        accentWord: 'CCAP',
        subheading:
          'Tuition depends on your child’s age, the days you need and your shift. Call us or book a tour and we will give you a clear price for your schedule. We accept NJ childcare subsidy (CCAP) for families who qualify.',
        image: IMG.kiosk(),
        accent: 'sage',
        buttons: [tourBtn('Get a price for your schedule')],
      }),
      block('featureGrid', {
        style: 'cards',
        heading: 'What sets your tuition',
        columns: 3,
        items: [
          ['Your child’s age', 'Toddler and preschool care, or before and after school care for school-age kids.'],
          ['Full-time or part-time', 'The number of days and hours you need each week.'],
          ['Your shift', 'Early morning, evening, late evening and weekend care are all available.'],
        ].map(([title, description]) => ({ _key: key(), _type: 'feature', title, description })),
        background: 'white',
      }),
      block('imageText', {
        heading: 'Paying with NJ childcare subsidy (CCAP)',
        body: md`We accept NJ childcare subsidy (CCAP) for families who qualify. In Cumberland County, CCAP is managed by Rutgers Southern Regional CCR&R in Vineland. The agency decides eligibility and your family's share, and we help you with the steps. [Read more about CCAP](/ccap-child-care-vineland-nj/).`,
        image: IMG.signIn(),
        imagePosition: 'right',
        imageShape: 'rounded',
        accent: 'sage',
        background: 'default',
        buttons: [button('CCAP child care', link.internal('service-ccap'), 'secondary')],
      }),
      block('faqBlock', {
        mode: 'selected',
        heading: 'Cost questions',
        faqs: refs('faq-cost', 'faq-ccap', 'faq-meals'),
        background: 'white',
      }),
    ],
    seo: seo('Tuition and CCAP | Uriah Child Care, Vineland, NJ', 'How tuition works at Uriah Child Care in Vineland, NJ, and how to pay with NJ childcare subsidy (CCAP). Call for a price for your schedule.'),
  }),
]
