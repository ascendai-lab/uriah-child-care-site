/**
 * Seed content: the News section (the old WordPress blog, carried over).
 * Old root URLs 301 to /news/{slug}/ in netlify.toml.
 * Edits from the originals: hours now match the GBP (6 am to 11 pm), the outdated "three shifts" and
 * 6:30 am wording is gone, broken advice was cut from the parenting posts, and each post links to the
 * matching program page. Facts were not added.
 */
import { md } from './lib.mjs'
import { IMG } from './content-programs.mjs'

const slug = (current) => ({ _type: 'slug', current })
const seo = (metaTitle, metaDescription) => ({ _type: 'seoFields', metaTitle, metaDescription })

const post = (id, fields) => ({ _id: `post-${id}`, _type: 'blogPost', ...fields })

export const posts = [
  post('cacfp', {
    title: 'Uriah Childcare Center participates in the Child and Adult Care Food Program (CACFP)',
    slug: slug('uriah-childcare-center-participates-in-the-child-and-adult-care-food-program-cacfp'),
    publishedAt: '2026-08-01T12:00:00Z',
    categories: ['Announcements'],
    excerpt: 'Enrolled children are served nutritious meals and snacks that meet USDA nutrition standards through the federal Child and Adult Care Food Program.',
    image: IMG.schedule(),
    seo: seo('Uriah Child Care joins the CACFP food program | Vineland, NJ', 'Uriah Childcare Center in Vineland, NJ participates in the USDA Child and Adult Care Food Program (CACFP). Meals are available to all enrolled children.'),
    body: md`Uriah Childcare Center is pleased to announce its participation in the Child and Adult Care Food Program (CACFP). Through this federally funded program, nutritious meals and snacks are provided to enrolled children in accordance with USDA nutrition standards.

CACFP is administered by the New Jersey Department of Agriculture, Division of Food and Nutrition, and funded by the United States Department of Agriculture (USDA).

Meals are available to all enrolled participants without regard to race, color, national origin, sex, age, or disability. Read more about [meals and snacks at our center](/daycare-meals-vineland-nj/).

## Contact information

Uriah Childcare Center, 30 W Chestnut Ave, Vineland, NJ 08360. Phone: [(856) 455-6701](tel:8564556701). Email: [hello@uriahchildcare.com](mailto:hello@uriahchildcare.com).

## USDA nondiscrimination statement

In accordance with federal civil rights law and USDA civil rights regulations and policies, this institution is prohibited from discriminating on the basis of race, color, national origin, sex (including gender identity and sexual orientation), disability, age, or reprisal or retaliation for prior civil rights activity.

Program information may be made available in languages other than English. Persons with disabilities who require alternative means of communication should contact the agency where they applied for benefits. Individuals who are deaf, hard of hearing, or have speech disabilities may contact USDA through the Federal Relay Service at [(800) 877-8339](tel:8008778339).

To file a program discrimination complaint, complete Form AD-3027 or contact USDA as described in the current USDA nondiscrimination guidance.`,
  }),

  post('new-chapter', {
    title: 'A new chapter begins for Uriah Child Care',
    slug: slug('a-new-chapter-begins-for-uriah-child-care'),
    publishedAt: '2025-12-30T12:00:00Z',
    categories: ['Announcements'],
    excerpt: 'We moved and expanded to a new home at 30 W Chestnut Ave in Vineland, open 7 days a week with open enrollment.',
    image: IMG.springFlag(),
    seo: seo('A new chapter: our new Vineland center | Uriah Child Care', 'Uriah Child Care moved and expanded to 30 W Chestnut Ave, Vineland, NJ 08360. Open Monday to Sunday, 6 am to 11 pm. Open enrollment for ages 2.5 and up.'),
    body: md`We have some fantastic news to share with the Vineland community!

At Uriah Child Care, our mission has always been to provide high-quality, nurturing care for your little ones. To better serve the growing needs of families in Vineland and the surrounding areas, we are thrilled to announce our **grand opening and expansion** into a brand-new facility.

We have officially moved and expanded to our new home at **30 W Chestnut Ave, Vineland, NJ 08360**. The larger space lets us welcome more children into the Uriah family, with more room for learning, play and growth. You can [see photos of the center](/our-center/).

## Flexible care for modern families

Life for today's parents doesn't always fit a 9-to-5 schedule. Parents work early mornings, evenings and weekends to provide for their families, and finding reliable child care shouldn't add to that stress.

That is why we are open **7 days a week, Monday to Sunday, 6 am to 11 pm**. Whether you work early, late or on weekends, your child has a safe, engaging place to be. See [child care for every shift](/child-care-vineland-nj/).

## Subsidy news for 2026

We believe money shouldn't stand between a child and good care. When we wrote this post, the New Jersey Child Care Assistance Program (CCAP) was preparing to reopen for new applications in January 2026, after a pause because of limited funding.

- **Limited reopening and priorities:** because funding was limited, the first openings were set aside for priority groups, including families with very low incomes, children with special needs and families experiencing homelessness.
- **Registration first:** families complete a registration form at [mynjhelps.gov](https://www.mynjhelps.gov/home) to be considered, and are told when they can complete the full application.
- **Local office:** in Cumberland County the program is managed locally by Rutgers Southern Regional CCR&R in Vineland, but you still start with the statewide registration form.

For where things stand today and how we can help with the steps, see our [CCAP child care page](/ccap-child-care-vineland-nj/).

## Open enrollment

We are enrolling children ages 2.5 and up at our new location. Spaces fill quickly, especially for evening and weekend care, so reach out soon.

Call [(856) 455-6701](tel:8564556701) or [book a tour](/tour/). We can't wait to welcome you to our new home!`,
  }),

  post('school-success', {
    title: 'How to help your child succeed in school this year',
    slug: slug('how-to-help-your-child-succeed-in-school'),
    publishedAt: '2023-05-04T12:00:00Z',
    categories: ['Tips for parents'],
    excerpt: 'Simple, practical ways parents can build confidence, good habits and a love of learning at home.',
    image: IMG.tables(),
    seo: seo('How to help your child succeed in school | Uriah Child Care', 'Practical tips for parents from Uriah Child Care in Vineland, NJ: clear routines, praise for effort, a safe place to ask questions and a good relationship with teachers.'),
    body: md`Every parent wants their child to do well in school. You don't need a magic formula: small, steady habits at home make a real difference. Here are the tips we share with families at our center.

## Build a strong relationship with your child

Children try harder when they feel close to the adults around them. Make time to talk, play and do things together, even for a few minutes a day. You still set the rules, and you can still have fun.

## Set clear and reasonable expectations

Expecting straight A's can set a child up for frustration. Focus on the process instead of the grade: did they practice, ask for help, and finish their work? Children who learn to judge themselves by their effort feel less pressure and keep trying.

## Be clear and calm about consequences

- Agree on a few simple rules, such as homework before screens.
- Explain the consequence ahead of time, so it is never a surprise.
- Follow through, calmly and without anger. If you are upset, wait until you have both cooled down.
- Use consequences sparingly. Too many, and children stop listening.

## Praise effort, not just results

Praise small wins: finishing a worksheet, reading a page out loud, trying a hard problem. Praise trying too, even when it doesn't work out. Children who hear that their effort matters build confidence and take on bigger challenges.

## Make it safe to ask questions and make mistakes

- Let your child know questions are welcome.
- Give them a moment to think before you jump in with the answer.
- It's fine to say "I don't know, let's find out together."
- Treat mistakes as part of learning, not as failure.

## Set a good example

Children copy what they see. Read where they can see you, talk about what you learned today, and keep a regular routine for meals, sleep and homework.

## Get to know your child's teachers

Keep in touch with your child's teachers, share what is happening at home, and raise worries early. Go to school events when you can. It shows your child that you care about their education.

## How we help at Uriah Child Care

Our [after school program](/after-school-program-vineland-nj/) gives school-age children a quiet time and place for [homework help](/homework-help-vineland-nj/), and our [pre-K](/pre-k-vineland-nj/) and [kindergarten readiness](/kindergarten-readiness-vineland-nj/) programs build the habits younger children need for school.`,
  }),

  post('mental-health', {
    title: "How to protect your child's mental health",
    slug: slug('how-to-protect-your-childs-mental-health'),
    publishedAt: '2022-09-29T12:00:00Z',
    categories: ['Tips for parents'],
    excerpt: 'How to talk with your child about feelings, spot signs of stress and anxiety, and know when to get professional help.',
    image: IMG.horseshoe(),
    seo: seo("How to protect your child's mental health | Uriah Child Care", 'Tips for parents from Uriah Child Care in Vineland, NJ: talking about feelings, signs of stress and anxiety in children, and when to get professional help.'),
    body: md`Children are often resilient, but that doesn't mean we can ignore signs that they are struggling. As a parent or caregiver, there is a lot you can do to help your child build good mental health.

## Lay the foundation

- **Be a good role model.** When children see you talk openly about feelings and ask for help when you need it, they learn that it's OK to do the same.
- **Talk about feelings openly.** Sharing your own experiences, in a way that fits their age, helps children understand that their feelings are normal.
- **Listen without judging.** Children need to know they can talk to you without being criticized or rushed to a fix.

## Talking about mental health

Mental health is as important as physical health. It's OK to talk about it, and it's OK to ask for help and support for your child and for yourself. There is nothing to be ashamed of when things aren't going well.

## Signs of stress and anxiety in children

Stress and anxiety don't always look like worry or sadness. Some children get headaches or stomach aches. Others pull away from friends or stop enjoying activities they used to love. Watch for changes from your child's usual mood and routine, such as:

- worry about school, friends or family problems
- trouble sleeping, or eating much more or less than usual
- new clinginess, irritability or tantrums
- avoiding places or people they used to enjoy

## How to help a child who is anxious or down

- Ask gently about what is going on in their life, and listen.
- Help them name their feelings and why they might feel that way.
- Keep calm, predictable routines for meals, sleep and play.
- Set aside a few minutes each day just to talk, about anything at all.
- Let them know that asking for help is a strong thing to do.

## If you think your child is hurting themselves

Stay calm and talk with your child. Tell them you have noticed and that you want to help, ask what is going on, and listen without anger or punishment. Then contact your child's doctor or a mental health professional for support.

## When to get professional help

Talk to your child's doctor or a qualified mental health professional when:

- your child's behavior puts them or others at risk
- anxiety or sadness keeps them from going to school or getting through the day
- changes in sleep or eating last longer than two weeks

If your child is in crisis or talks about wanting to die, call or text **988**, the Suicide and Crisis Lifeline, any time. In an emergency, call 911.

## Children need our love and support

Children bounce back best when they feel heard. Ask questions like "what do you think would help?" or "how can we work through this together?" Giving your child a sense of control over their feelings helps them cope, and getting support for yourself when you feel overwhelmed helps the whole family.

At Uriah Child Care, we use [positive discipline and play-based learning](/play-based-learning-vineland-nj/) to help children name their feelings, solve problems and get along with others.`,
  }),
]
