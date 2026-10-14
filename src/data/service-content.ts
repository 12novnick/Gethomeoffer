import type { Faq } from './location-content';
import type { ContentItem } from './programs';

export interface ServiceContent {
  metaTitle: string;
  metaDescription: string;
  heading: string;
  summary: string;
  intro: string[];
  /** "This may be you if" checklist. */
  signs: string[];
  help: ContentItem[];
  /** Things to know before selling in this situation. */
  know: string[];
  faqs: Faq[];
  related: string[];
}

// Build-time only: imported by the service route loader, never by components, so it stays out of the JS bundle.
// No city names here: service pages are shared by every location.
export const SERVICE_CONTENT: Record<string, ServiceContent> = {
  'sell-house-fast': {
    metaTitle: 'Sell Your House Fast for Cash | Get Home Offer',
    metaDescription:
      'Need to sell your house fast? Get a straightforward cash offer, skip listing and showings, and pick a closing date that works for you.',
    heading: 'Sell Your House Fast',
    summary: 'Skip the listing, the showings and the wait on a buyer\'s loan. Get a cash offer and choose your closing date.',
    intro: [
      'A traditional sale can take months: prep work, photos, showings, offers, inspections and a buyer\'s financing that may or may not come through.',
      'When time matters, a direct cash sale removes most of those steps. We review your property, make a straightforward offer, and if you accept, we close on the date you choose, typically 14 to 30 days out.',
    ],
    signs: [
      'You have a deadline, such as a move, a new job or a payment coming due',
      'You do not want to spend weeks preparing the house for buyers',
      'You want a known closing date instead of waiting on a buyer\'s lender',
      'You would rather trade some price for speed and certainty',
    ],
    help: [
      { title: 'Quick review', body: 'Share the address and a few details. We look at the condition, location and your timeline.' },
      { title: 'Cash offer', body: 'A clear number with no commissions or fees taken out at closing.' },
      { title: 'Your date', body: 'Close in as little as two weeks, or later if you need more time to move.' },
    ],
    know: [
      'A fast cash offer is usually lower than the top price a fully prepared house might get on the open market. What you gain is speed, certainty and no repair or holding costs.',
      'If getting the highest possible price matters more than timing, compare our offer with a traditional listing through our Real Estate Agent Program.',
    ],
    faqs: [
      { question: 'How fast can you close?', answer: 'Typically 14 to 30 days. We can often work around the date you need.' },
      { question: 'Do I have to accept your offer?', answer: 'No. The offer comes with no obligation. You decide.' },
    ],
    related: ['sell-house-as-is', 'sell-house-without-realtor', 'sell-house-relocating'],
  },

  'sell-house-as-is': {
    metaTitle: 'Sell Your House As-Is for Cash | Get Home Offer',
    metaDescription:
      'Sell your house as-is. No repairs, no cleaning and no showings. Get a straightforward cash offer for your house in its current condition.',
    heading: 'Sell Your House As-Is',
    summary: 'No repairs, no cleaning, no updates. We make an offer on your house exactly as it stands today.',
    intro: [
      'Getting a house market-ready can mean contractors, inspections and surprise costs before a buyer ever walks through the door.',
      'Selling as-is means you skip all of it. We factor the condition into our offer and take care of the work after closing, so you do not spend money or weekends on a house you are leaving.',
    ],
    signs: [
      'The house needs work you cannot afford or do not want to manage',
      'You do not want to clean out or stage the house',
      'You are worried an inspection would scare off retail buyers',
      'You want to be done with the property, not fix it up',
    ],
    help: [
      { title: 'Any condition', body: 'Dated, damaged or simply tired. We price the work in, not against you.' },
      { title: 'Leave what you do not want', body: 'Take what matters to you. You do not need to empty every room.' },
      { title: 'No repair requests', body: 'There is no buyer inspection list to negotiate after you accept.' },
    ],
    know: [
      'An as-is offer accounts for the repairs we will take on, so it is usually lower than the price of a fully renovated house. In return, you have no out-of-pocket costs and no renovation risk.',
      'Some states require sellers to complete a disclosure form even in an as-is sale. Ask us, or a real estate attorney, what applies to your property.',
    ],
    faqs: [
      { question: 'Do I need to clean the house before selling?', answer: 'No. Take what you want to keep and leave the rest.' },
      { question: 'Will you still inspect the house?', answer: 'We look at the property to make our offer, but there is no repair list for you to complete.' },
    ],
    related: ['sell-house-needs-repairs', 'sell-outdated-house', 'sell-hoarder-house'],
  },

  'sell-house-without-realtor': {
    metaTitle: 'Sell Your House Without a Realtor | Get Home Offer',
    metaDescription:
      'Sell your house without a realtor, with no commissions or listing fees. Get a direct cash offer and keep the process simple.',
    heading: 'Sell Your House Without a Realtor',
    summary: 'Sell directly to us. No listing agreement, no commissions and no fees taken out at closing.',
    intro: [
      'Listing with an agent works well for many sellers, but it comes with commissions, showings and a sale that depends on finding the right buyer.',
      'A direct sale to us skips the listing entirely. There is no agent commission, no listing fee and no hidden cost. You get one clear offer and decide whether it works for you.',
    ],
    signs: [
      'You want to avoid paying a commission',
      'You do not want strangers touring your home',
      'You tried selling on your own and it was more work than expected',
      'You want one simple offer instead of a negotiation',
    ],
    help: [
      { title: 'No commissions', body: 'There are no realtor commissions or listing fees in a direct sale.' },
      { title: 'No showings', body: 'No open houses, no lockbox and no last-minute tour requests.' },
      { title: 'Handled closing', body: 'We work with a title company to handle the closing paperwork.' },
    ],
    know: [
      'Skipping a realtor saves the commission, but a direct cash offer is usually below what a well-marketed listing might bring. Compare the net amount you would keep, not just the headline price.',
      'If you want an agent after all, our Real Estate Agent Program can connect you with one.',
    ],
    faqs: [
      { question: 'Are there any fees?', answer: 'No. There are no realtor commissions, listing fees or hidden costs.' },
      { question: 'Who handles the paperwork?', answer: 'The closing is handled through a title company, so you are not doing it alone.' },
    ],
    related: ['sell-house-fast', 'sell-house-as-is', 'sell-house-after-failed-sale'],
  },

  'sell-house-needs-repairs': {
    metaTitle: 'Sell a House That Needs Repairs | Get Home Offer',
    metaDescription:
      'Sell a house that needs repairs without fixing anything. Get a cash offer that accounts for the work, with no out-of-pocket costs.',
    heading: 'Sell a House That Needs Repairs',
    summary: 'Leaky roof, old furnace, worn floors or a list you have lost track of. Sell without fixing a thing.',
    intro: [
      'Repairs add up quickly, and many buyers using loans cannot purchase a house with major issues until they are fixed.',
      'We buy houses that need work. We estimate the repairs, factor them into a straightforward offer and handle everything after closing.',
    ],
    signs: [
      'You have a growing list of repairs you have put off',
      'Contractor quotes are more than you want to spend',
      'A buyer backed out after an inspection',
      'You want to sell before small problems get bigger',
    ],
    help: [
      { title: 'We estimate the work', body: 'We look at what the house needs and build it into the offer.' },
      { title: 'You pay nothing upfront', body: 'No contractors to hire and no materials to buy.' },
      { title: 'We fix it after', body: 'The repairs become our project once we close.' },
    ],
    know: [
      'Spending on repairs before listing does not always come back in the sale price. A direct offer lets you skip that gamble.',
      'Tell us what you know about the house. Being upfront helps us give you an accurate offer the first time.',
    ],
    faqs: [
      { question: 'What if I do not know everything that is wrong?', answer: 'That is fine. Share what you know and we will look at the rest.' },
      { question: 'Is there a repair too big for you?', answer: 'Tell us about it. We consider houses with major issues.' },
    ],
    related: ['sell-house-as-is', 'sell-house-roof-damage', 'sell-house-foundation-problems'],
  },

  'sell-house-foundation-problems': {
    metaTitle: 'Sell a House With Foundation Problems | Get Home Offer',
    metaDescription:
      'Sell a house with foundation problems as-is. Cracks, settling or a failed inspection. Get a cash offer without repairing first.',
    heading: 'Sell a House With Foundation Problems',
    summary: 'Cracks, settling, sloping floors or a failed inspection. Sell without paying for foundation repair first.',
    intro: [
      'Foundation issues are among the hardest problems to sell around. Many buyers walk away, and lenders often will not finance the purchase until the issue is repaired.',
      'We buy houses with foundation problems. We account for the repair in our offer, so you do not have to fund the work or wait on it.',
    ],
    signs: [
      'You see cracks in walls, floors or the foundation itself',
      'Doors and windows stick or floors slope',
      'An inspection or engineer flagged structural concerns',
      'A repair estimate is more than you want to take on',
    ],
    help: [
      { title: 'No engineering bills', body: 'You do not need to commission a repair plan before selling.' },
      { title: 'Offer that reflects reality', body: 'We factor the repair into the price instead of letting it stall the sale.' },
      { title: 'No financing risk', body: 'A cash purchase does not depend on a lender approving the house.' },
    ],
    know: [
      'Most states require you to disclose known structural problems when you sell. Share any reports you have; they help us make an accurate offer.',
      'Foundation repair costs vary widely with the cause and extent of the damage, which is why we look at each house individually.',
    ],
    faqs: [
      { question: 'Do I need an engineer\'s report?', answer: 'No, but if you already have one, sharing it helps us make an accurate offer.' },
      { question: 'Can you buy a house a buyer\'s lender would not approve?', answer: 'Yes. We pay cash, so the sale does not depend on a lender.' },
    ],
    related: ['sell-house-needs-repairs', 'sell-water-damaged-house', 'sell-house-after-failed-sale'],
  },

  'sell-fire-damaged-house': {
    metaTitle: 'Sell a Fire-Damaged House for Cash | Get Home Offer',
    metaDescription:
      'Sell a fire-damaged house as-is. Skip the rebuild and get a straightforward cash offer for the property in its current condition.',
    heading: 'Sell a Fire-Damaged House',
    summary: 'After a fire, you do not have to rebuild to move on. Sell the property as it is now.',
    intro: [
      'A house fire is overwhelming. Between insurance claims, temporary housing and contractor estimates, rebuilding can take a long time.',
      'If you would rather not rebuild, we buy fire-damaged houses in their current condition and take on the restoration ourselves.',
    ],
    signs: [
      'The house has smoke, fire or water damage from firefighting',
      'You do not want to manage a long rebuild',
      'Your insurance payout will not cover everything',
      'You need to settle the property so you can move forward',
    ],
    help: [
      { title: 'Sell before restoring', body: 'No need to clean up, gut or rebuild first.' },
      { title: 'Work around your claim', body: 'Tell us where your insurance claim stands and we will plan around it.' },
      { title: 'Close on your timeline', body: 'Pick a closing date that fits the rest of your recovery.' },
    ],
    know: [
      'How a sale affects an open insurance claim depends on your policy. Check with your insurance company before you sign anything.',
      'Fire damage is often accompanied by smoke and water damage. We look at the whole property, not just the burned areas.',
    ],
    faqs: [
      { question: 'Can I sell before my insurance claim is settled?', answer: 'Often, yes, but it depends on your policy. Talk to your insurer first and tell us where things stand.' },
      { question: 'Does the house need to be cleaned out?', answer: 'No. We buy it in its current condition.' },
    ],
    related: ['sell-water-damaged-house', 'sell-house-needs-repairs', 'sell-house-as-is'],
  },

  'sell-water-damaged-house': {
    metaTitle: 'Sell a Water-Damaged House for Cash | Get Home Offer',
    metaDescription:
      'Sell a water-damaged house as-is. Flooding, leaks or burst pipes. Get a cash offer without paying for restoration first.',
    heading: 'Sell a Water-Damaged House',
    summary: 'Flooded basement, burst pipe or a slow leak that did real damage. Sell without paying for restoration.',
    intro: [
      'Water damage spreads. What starts as a leak can affect floors, drywall and framing, and often leads to mold if it sits.',
      'We buy water-damaged houses as they are. We factor in the drying, repairs and restoration so you can move on now.',
    ],
    signs: [
      'You had a flood, burst pipe, roof leak or sewer backup',
      'Floors, walls or ceilings are stained, warped or soft',
      'Restoration quotes are higher than you expected',
      'You are worried about mold developing',
    ],
    help: [
      { title: 'No restoration bills', body: 'We take on the drying and repairs after closing.' },
      { title: 'Honest offer', body: 'We account for the full extent of the damage, not just what is visible.' },
      { title: 'Fast path out', body: 'Close quickly so the damage stops being your problem.' },
    ],
    know: [
      'Water damage should be disclosed when you sell in most states. Share what happened and any repairs already done.',
      'If the damage is recent, check whether your homeowner\'s insurance covers it before deciding how to sell.',
    ],
    faqs: [
      { question: 'Do you buy houses with flood damage?', answer: 'Yes. Tell us what happened and we will look at the property.' },
      { question: 'What if mold has started?', answer: 'We also buy houses with mold. Let us know what you have seen.' },
    ],
    related: ['sell-house-with-mold', 'sell-fire-damaged-house', 'sell-house-roof-damage'],
  },

  'sell-house-with-mold': {
    metaTitle: 'Sell a House With Mold As-Is | Get Home Offer',
    metaDescription:
      'Sell a house with mold without paying for remediation. Get a straightforward cash offer for the property as it stands.',
    heading: 'Sell a House With Mold',
    summary: 'Mold scares off many buyers and lenders. Sell your house without paying for remediation first.',
    intro: [
      'Mold often shows up after leaks or humidity problems, and remediation can be costly, especially when it has spread behind walls.',
      'We buy houses with mold in their current condition. We factor remediation into our offer and handle it after closing.',
    ],
    signs: [
      'You see or smell mold in the basement, bathroom or attic',
      'An inspection found mold during a previous sale attempt',
      'Remediation quotes are more than you want to spend',
      'You do not want to live with the problem any longer',
    ],
    help: [
      { title: 'No remediation first', body: 'You do not need to hire a mold company before selling.' },
      { title: 'We address the cause', body: 'We plan for the leak or moisture problem behind it, not just the surface.' },
      { title: 'Simple sale', body: 'No buyer inspection demands after you accept our offer.' },
    ],
    know: [
      'Known mold problems usually need to be disclosed. Share what you know, including any testing that has been done.',
      'Mold almost always has a moisture source. Telling us about past leaks helps us make an accurate offer.',
    ],
    faqs: [
      { question: 'Do I need mold testing before selling?', answer: 'No. If you already have test results, sharing them is helpful.' },
      { question: 'Can I sell if the mold is widespread?', answer: 'Yes. Tell us what you have seen and we will review the property.' },
    ],
    related: ['sell-water-damaged-house', 'sell-house-needs-repairs', 'sell-house-as-is'],
  },

  'sell-hoarder-house': {
    metaTitle: 'Sell a Hoarder House As-Is | Get Home Offer',
    metaDescription:
      'Sell a hoarder house without cleaning it out. Get a cash offer and leave the contents behind. No judgment, no cleanup required.',
    heading: 'Sell a Hoarder House',
    summary: 'No clean-out required. Take what matters to you and leave the rest with the house.',
    intro: [
      'Clearing a house full of belongings is exhausting, expensive and often emotional, especially when it belonged to a family member.',
      'We buy hoarder houses as they are, contents included. There is no judgment and no need to clean, sort or haul anything away.',
    ],
    signs: [
      'The house is too full to show to buyers',
      'Clean-out quotes are high or the job feels impossible',
      'You inherited a house packed with belongings',
      'You want privacy instead of crews and open houses',
    ],
    help: [
      { title: 'Leave the contents', body: 'Keep what you want. We handle everything left behind.' },
      { title: 'Discreet process', body: 'No listing photos, no open house and no neighbors touring the home.' },
      { title: 'Damage factored in', body: 'Hidden repairs are common in full houses. We plan for them.' },
    ],
    know: [
      'Take time to remove important documents, photos and valuables before closing. Once the sale closes, what is left becomes part of the property.',
      'If other family members have a say in the house, agree on what to keep before you sell.',
    ],
    faqs: [
      { question: 'Do I have to clean out the house?', answer: 'No. Take what you want and leave the rest.' },
      { question: 'Will anyone else see the inside of the house?', answer: 'No listing and no open house. Only the people involved in the purchase.' },
    ],
    related: ['sell-inherited-house', 'sell-house-as-is', 'sell-house-needs-repairs'],
  },

  'sell-house-code-violations': {
    metaTitle: 'Sell a House With Code Violations | Get Home Offer',
    metaDescription:
      'Sell a house with open code violations as-is. We factor the violations into a cash offer so you do not have to fix them first.',
    heading: 'Sell a House With Code Violations',
    summary: 'Open city orders or citations can stall a traditional sale. Sell without clearing them first.',
    intro: [
      'Code violations can come with deadlines, fines and re-inspections, and many retail buyers and lenders avoid properties with open orders.',
      'We buy houses with code violations. Tell us what is open and we will factor it into our offer and work through it after closing.',
    ],
    signs: [
      'You received a notice or order from your city or county',
      'Fines are adding up while the violations stay open',
      'A buyer backed out after learning about the violations',
      'Fixing everything by the deadline is not realistic',
    ],
    help: [
      { title: 'Sell with orders open', body: 'You do not have to resolve every violation before selling.' },
      { title: 'Offer accounts for the work', body: 'We price in what it will take to bring the house up to code.' },
      { title: 'Paperwork handled', body: 'The title company addresses what must be settled at closing.' },
    ],
    know: [
      'How open violations, fines and liens transfer in a sale depends on your city and county. Share every notice you have so nothing surprises anyone at closing.',
      'Some fines may need to be paid from the sale proceeds. We will walk through what applies to your property.',
    ],
    faqs: [
      { question: 'Do I have to fix violations before selling to you?', answer: 'No. Tell us what is open and we will factor it into the offer.' },
      { question: 'What about unpaid fines?', answer: 'They are handled at closing, often from the sale proceeds. Share the notices so we can plan for them.' },
    ],
    related: ['sell-house-unpermitted-additions', 'sell-house-liens-back-taxes', 'sell-house-needs-repairs'],
  },

  'sell-outdated-house': {
    metaTitle: 'Sell an Old or Outdated House for Cash | Get Home Offer',
    metaDescription:
      'Sell an old or outdated house without updating it. Get a straightforward cash offer that accounts for the age and condition.',
    heading: 'Sell an Old or Outdated House',
    summary: 'Original kitchen, older systems and decades of wear. Sell without renovating first.',
    intro: [
      'Older houses often need more than a fresh coat of paint to compete with updated listings: electrical, plumbing, windows and kitchens add up.',
      'We buy older and outdated houses as they are. We price in the updates so you do not have to choose between renovating and settling for less on the market.',
    ],
    signs: [
      'The house has not been updated in decades',
      'Older systems like wiring, plumbing or heating need attention',
      'You do not want to renovate a house you are leaving',
      'Updated homes nearby make yours harder to sell',
    ],
    help: [
      { title: 'No updates needed', body: 'Keep the original kitchen and carpet. We will take it from here.' },
      { title: 'Systems factored in', body: 'We account for older wiring, plumbing and heating in the offer.' },
      { title: 'Simple timeline', body: 'Skip the months of renovation and close when you are ready.' },
    ],
    know: [
      'Updates rarely return their full cost at sale. Selling as-is avoids spending money you may not get back.',
      'Older homes can have materials that need special handling. Share anything you know about the house\'s history.',
    ],
    faqs: [
      { question: 'Is my house too old for you?', answer: 'No. We buy older houses in many conditions.' },
      { question: 'Should I update the kitchen before selling?', answer: 'Not to sell to us. We factor the updates into our offer.' },
    ],
    related: ['sell-house-as-is', 'sell-house-needs-repairs', 'sell-house-downsizing'],
  },

  'sell-house-unpermitted-additions': {
    metaTitle: 'Sell a House With Unpermitted Additions | Get Home Offer',
    metaDescription:
      'Sell a house with unpermitted work or additions as-is. Get a cash offer without permitting or removing the work first.',
    heading: 'Sell a House With Unpermitted Additions',
    summary: 'A finished basement, addition or garage conversion done without permits. Sell without sorting it out first.',
    intro: [
      'Unpermitted work can complicate a traditional sale. Appraisers may not count it, lenders may hesitate and buyers may ask you to permit or remove it.',
      'We buy houses with unpermitted additions and work. We look at what was done and factor it into a straightforward cash offer.',
    ],
    signs: [
      'A past owner or contractor did work without permits',
      'A buyer\'s inspection or appraisal flagged the work',
      'Retroactive permitting looks costly or uncertain',
      'You are not sure what was permitted and what was not',
    ],
    help: [
      { title: 'No retroactive permits', body: 'You do not need to permit or tear out the work before selling.' },
      { title: 'Clear valuation', body: 'We value the house realistically, with the work as it is.' },
      { title: 'Cash purchase', body: 'No lender or appraiser to object to the unpermitted space.' },
    ],
    know: [
      'Known unpermitted work generally should be disclosed. Share what you know, even if you are unsure of the details.',
      'Permit records are often available from your city or county building department if you want to check.',
    ],
    faqs: [
      { question: 'Do I need to get permits before selling?', answer: 'Not to sell to us. We factor the unpermitted work into the offer.' },
      { question: 'What if I did not know the work was unpermitted?', answer: 'That happens often. Tell us what you know and we will take it from there.' },
    ],
    related: ['sell-house-code-violations', 'sell-house-after-failed-sale', 'sell-house-as-is'],
  },

  'sell-house-roof-damage': {
    metaTitle: 'Sell a House With Roof Damage | Get Home Offer',
    metaDescription:
      'Sell a house with roof damage or an old roof as-is. Get a cash offer without replacing the roof first.',
    heading: 'Sell a House With Roof Damage',
    summary: 'Leaks, missing shingles or a roof at the end of its life. Sell without replacing it first.',
    intro: [
      'A roof problem can stop a traditional sale. Buyers worry about leaks, and some loans and insurers will not move forward until the roof is fixed.',
      'We buy houses with roof damage. We factor the replacement or repair into our offer, so you do not pay for it upfront.',
    ],
    signs: [
      'The roof leaks or has visible damage',
      'The roof is old and an inspector flagged it',
      'Storm damage was not fully covered by insurance',
      'A new roof is not in your budget right now',
    ],
    help: [
      { title: 'No roofer needed', body: 'Skip the quotes and the replacement.' },
      { title: 'Interior damage included', body: 'We account for any leak damage inside the house too.' },
      { title: 'Cash, no lender', body: 'The sale does not depend on a lender approving the roof.' },
    ],
    know: [
      'If the damage came from a recent storm, check whether your homeowner\'s insurance covers it before you decide how to sell.',
      'Roof leaks often cause hidden damage in attics and ceilings. Share what you have noticed.',
    ],
    faqs: [
      { question: 'Do I need to replace the roof to sell?', answer: 'Not to sell to us. We factor it into the offer.' },
      { question: 'What if water has damaged the inside?', answer: 'We look at the whole house, including any interior damage.' },
    ],
    related: ['sell-water-damaged-house', 'sell-house-needs-repairs', 'sell-outdated-house'],
  },

  'sell-house-termite-damage': {
    metaTitle: 'Sell a House With Termite Damage | Get Home Offer',
    metaDescription:
      'Sell a house with termite or pest damage as-is. Get a cash offer without paying for treatment and repairs first.',
    heading: 'Sell a House With Termite Damage',
    summary: 'Termite or pest damage does not have to stop your sale. Sell without treating and repairing first.',
    intro: [
      'Termite damage can weaken wood framing and floors, and many buyers and lenders want treatment and repairs completed before they will buy.',
      'We buy houses with termite and pest damage. We factor treatment and repairs into the offer and handle them after closing.',
    ],
    signs: [
      'An inspection found termites or wood-destroying insects',
      'You see damaged wood, mud tubes or droppings',
      'Treatment and repair quotes are higher than expected',
      'A buyer backed out after a pest inspection',
    ],
    help: [
      { title: 'No treatment first', body: 'You do not need to hire an exterminator before selling.' },
      { title: 'Repairs priced in', body: 'We account for the structural repairs the damage requires.' },
      { title: 'No re-inspection hurdles', body: 'Cash sale, no lender requirement for a clear pest report.' },
    ],
    know: [
      'Known pest damage typically needs to be disclosed. Share any inspection reports you have.',
      'Damage can be more extensive than it looks. We review the property carefully so the offer holds up.',
    ],
    faqs: [
      { question: 'Do I need a pest inspection before selling?', answer: 'No. If you have a recent report, it helps us make an accurate offer.' },
      { question: 'Are the termites still active a problem?', answer: 'Tell us what you know. We buy houses with active or past infestations.' },
    ],
    related: ['sell-house-foundation-problems', 'sell-house-needs-repairs', 'sell-house-after-failed-sale'],
  },

  'sell-vacant-house': {
    metaTitle: 'Sell a Vacant House for Cash | Get Home Offer',
    metaDescription:
      'Sell a vacant house fast. Stop paying taxes, utilities and insurance on an empty property. Get a straightforward cash offer.',
    heading: 'Sell a Vacant House',
    summary: 'An empty house keeps costing you every month. Sell it and stop paying to hold it.',
    intro: [
      'Vacant houses carry costs without benefits: property taxes, insurance, utilities and upkeep, plus the risk of break-ins, leaks or freeze damage nobody notices.',
      'We buy vacant houses in any condition. Sell it as it is and close on a date that works for you, even if you live far away.',
    ],
    signs: [
      'The house has been empty for months',
      'You live out of town and cannot keep an eye on it',
      'Insurance for a vacant house is costly or hard to get',
      'You are paying to maintain a property you do not use',
    ],
    help: [
      { title: 'Remote-friendly', body: 'Much of the process can be handled without you being there.' },
      { title: 'Any condition', body: 'Neglect, damage or leftover belongings are all fine.' },
      { title: 'Stop the costs', body: 'Close quickly and end the monthly holding costs.' },
    ],
    know: [
      'Some cities require vacant buildings to be registered, and long vacancies can bring inspections or fees. Check with your local building department.',
      'Many standard homeowner\'s policies limit coverage once a house has been empty for a while. Review your policy.',
    ],
    faqs: [
      { question: 'Can I sell if I live out of state?', answer: 'Yes. Much of the process can be handled remotely, with closing paperwork through a title company.' },
      { question: 'Do I need to remove what is left inside?', answer: 'No. Take what you want and leave the rest.' },
    ],
    related: ['sell-inherited-house', 'sell-house-relocating', 'sell-rental-property'],
  },

  'sell-rental-property': {
    metaTitle: 'Sell a Rental Property for Cash | Get Home Offer',
    metaDescription:
      'Tired of being a landlord? Sell your rental property as-is, occupied or vacant. Get a straightforward cash offer.',
    heading: 'Sell a Rental Property',
    summary: 'Done with tenants, repairs and late-night calls? Sell your rental as it is, occupied or empty.',
    intro: [
      'Rental properties can be rewarding until they are not: turnover, repairs, vacancies and rules that keep changing.',
      'We buy rental properties in any condition, whether they are occupied, empty or somewhere in between. You do not need to renovate or wait for a lease to end.',
    ],
    signs: [
      'You are tired of managing tenants and repairs',
      'The property needs work before it can be rented again',
      'Your rental is not making the return it used to',
      'You want to move your money somewhere else',
    ],
    help: [
      { title: 'Occupied is fine', body: 'We can buy with tenants in place, subject to their leases.' },
      { title: 'No turnover work', body: 'No need to repaint, repair or re-rent before selling.' },
      { title: 'One clean exit', body: 'One offer, one closing and you are done being a landlord.' },
    ],
    know: [
      'Selling an investment property can have tax consequences. Talk to a tax professional about your situation before you sell.',
      'Tenant rights during a sale depend on state and local law and the lease. Share your current leases so we can plan the sale correctly.',
    ],
    faqs: [
      { question: 'Can you buy my rental with tenants living there?', answer: 'Yes. We buy tenant-occupied properties.' },
      { question: 'Do I need to fix it up between tenants?', answer: 'No. We buy it in its current condition.' },
    ],
    related: ['sell-house-with-tenants', 'sell-duplex-multi-family', 'sell-vacant-house'],
  },

  'sell-house-with-tenants': {
    metaTitle: 'Sell a House With Tenants in Place | Get Home Offer',
    metaDescription:
      'Sell a house with tenants without waiting for the lease to end. We buy tenant-occupied houses as-is for cash.',
    heading: 'Sell a House With Tenants',
    summary: 'You do not have to wait for the lease to end. We buy tenant-occupied houses.',
    intro: [
      'Selling an occupied house the traditional way means coordinating showings around tenants, and many owner-occupant buyers want the house empty.',
      'We buy houses with tenants in place. You do not need to end leases, schedule showings or prepare the unit for buyers.',
    ],
    signs: [
      'Your tenants are mid-lease and you want to sell now',
      'Showings would disrupt your tenants',
      'You have a difficult tenant situation you want to step away from',
      'The unit needs work that is hard to do while occupied',
    ],
    help: [
      { title: 'Leases stay in place', body: 'We can take over existing leases at closing.' },
      { title: 'Minimal disruption', body: 'No open houses or repeated showings for your tenants.' },
      { title: 'Leave tenants to us', body: 'After closing, managing the tenancy becomes our responsibility.' },
    ],
    know: [
      'Tenant rights during a sale depend on state and local law and on each lease. Share your leases and any notices so the sale follows the rules.',
      'Security deposits usually transfer to the new owner at closing. The title company handles the accounting.',
    ],
    faqs: [
      { question: 'Do my tenants have to move out before closing?', answer: 'No. We buy tenant-occupied houses.' },
      { question: 'What happens to security deposits?', answer: 'They are typically transferred to us at closing through the title company.' },
    ],
    related: ['sell-rental-property', 'sell-duplex-multi-family', 'sell-house-fast'],
  },

  'sell-duplex-multi-family': {
    metaTitle: 'Sell a Duplex or Multi-Family Property | Get Home Offer',
    metaDescription:
      'Sell a duplex or small multi-family property, occupied or vacant. Get a straightforward cash offer for two to four units.',
    heading: 'Sell a Duplex or Multi-Family Property',
    summary: 'Duplexes and small multi-family properties of two to four units, occupied, partly occupied or empty.',
    intro: [
      'Multi-family properties bring more units, more tenants and more upkeep. Selling one traditionally can mean coordinating showings across several households.',
      'We buy duplexes and small multi-family properties as they are, with or without tenants, and in any condition.',
    ],
    signs: [
      'You own a duplex, triplex or fourplex you want to sell',
      'Some units are vacant or need work',
      'You are tired of managing several tenants',
      'You lived in one unit and are ready to move',
    ],
    help: [
      { title: 'Two to four units', body: 'We focus on small multi-family properties.' },
      { title: 'Any occupancy', body: 'Fully rented, partly rented or empty.' },
      { title: 'Condition included', body: 'Units needing work are priced in, not a deal-breaker.' },
    ],
    know: [
      'Gather current leases, rent amounts and any recent repair records. They help us make an accurate offer quickly.',
      'Selling an investment property can have tax consequences. Talk to a tax professional before you sell.',
    ],
    faqs: [
      { question: 'Do you buy owner-occupied duplexes?', answer: 'Yes, whether you live in one unit or none.' },
      { question: 'Can some units be vacant?', answer: 'Yes. Any mix of occupied and vacant units is fine.' },
    ],
    related: ['sell-rental-property', 'sell-house-with-tenants', 'sell-vacant-house'],
  },

  'sell-condo-townhome': {
    metaTitle: 'Sell a Condo or Townhome for Cash | Get Home Offer',
    metaDescription:
      'Sell a condo or townhome as-is. Skip showings and listing prep. Get a straightforward cash offer for your unit.',
    heading: 'Sell a Condo or Townhome',
    summary: 'Sell your condo or townhome directly, without listing prep or showings.',
    intro: [
      'Condos and townhomes add their own steps to a sale, like association documents and rules, and they often compete with similar units in the same building.',
      'We buy condos and townhomes as they are. Tell us about the unit and the association, and we will make a straightforward offer.',
    ],
    signs: [
      'Your unit needs updates to compete with others for sale',
      'Association fees or assessments are a burden',
      'You want to avoid showings in a shared building',
      'You are moving and want a simple sale',
    ],
    help: [
      { title: 'Unit as-is', body: 'No updates or staging needed.' },
      { title: 'Association details handled', body: 'We work through the association documents with the title company.' },
      { title: 'No showings', body: 'No tours through shared hallways or common areas.' },
    ],
    know: [
      'Associations often require documents or approvals during a sale. Have your association contact information handy.',
      'Unpaid dues or special assessments are typically settled at closing.',
    ],
    faqs: [
      { question: 'Do you buy condos with high association fees?', answer: 'Yes. Share the fee amount and any assessments so we can account for them.' },
      { question: 'What about special assessments?', answer: 'Tell us about any approved or pending assessments. They are handled at closing.' },
    ],
    related: ['sell-house-relocating', 'sell-house-downsizing', 'sell-house-as-is'],
  },

  'sell-vacant-land': {
    metaTitle: 'Sell Vacant Land for Cash | Get Home Offer',
    metaDescription:
      'Sell vacant land or an empty lot directly. Tell us about the parcel and get a straightforward cash offer.',
    heading: 'Sell Vacant Land',
    summary: 'An empty lot or parcel you no longer want. Tell us about it and get a straightforward offer.',
    intro: [
      'Vacant land can be slow to sell. There is no house to show, fewer buyers are looking, and loans for land are harder to get.',
      'Tell us about your parcel, including its location, size and any access or zoning details you know, and we will review it for a cash offer.',
    ],
    signs: [
      'You own a lot you have no plans to build on',
      'You are paying taxes on land you do not use',
      'You inherited land in another area',
      'Listing the land has not attracted buyers',
    ],
    help: [
      { title: 'Direct offer', body: 'No listing and no waiting for the right buyer.' },
      { title: 'Cash purchase', body: 'No buyer land loan required.' },
      { title: 'Title handled', body: 'The title company manages the closing paperwork.' },
    ],
    know: [
      'Zoning, access, utilities and any back taxes all affect what land is worth. Share what you know about the parcel.',
      'If the land came through an estate, make sure you have the authority to sell before accepting an offer.',
    ],
    faqs: [
      { question: 'What details should I share about my land?', answer: 'The address or parcel number, size, and anything you know about access, utilities or zoning.' },
      { question: 'Can I sell land with back taxes owed?', answer: 'Often, yes. Back taxes are typically settled from the proceeds at closing.' },
    ],
    related: ['sell-inherited-house', 'sell-house-liens-back-taxes', 'sell-vacant-house'],
  },

  'sell-inherited-house': {
    metaTitle: 'Sell an Inherited House for Cash | Get Home Offer',
    metaDescription:
      'Sell an inherited house as-is. No clean-out, no repairs and no showings. Get a straightforward cash offer when you are ready.',
    heading: 'Sell an Inherited House',
    summary: 'Sell a loved one\'s house without clearing it out, fixing it up or managing a listing from afar.',
    intro: [
      'Inheriting a house often comes during a difficult time, along with decisions about belongings, repairs, taxes and family members who may have different ideas.',
      'We buy inherited houses as they are. You can take what matters, leave the rest and close when everyone is ready.',
    ],
    signs: [
      'You inherited a house you do not plan to live in',
      'The house is full of a loved one\'s belongings',
      'You live far away and cannot manage repairs or showings',
      'Several heirs want a simple, fair way to settle the property',
    ],
    help: [
      { title: 'No clean-out', body: 'Keep the things that matter and leave the rest.' },
      { title: 'Patient timeline', body: 'Close when the paperwork and the family are ready.' },
      { title: 'Clear numbers for every heir', body: 'One straightforward offer everyone can review.' },
    ],
    know: [
      'You usually need legal authority to sell, such as being named the personal representative or holding title. If probate is still open, read our probate page or talk to an estate attorney.',
      'Inherited property can have tax implications. A tax professional can explain what applies to you.',
    ],
    faqs: [
      { question: 'Can I sell before probate is finished?', answer: 'It depends on your state and the estate. An estate attorney can confirm, and we can work with the timeline.' },
      { question: 'Do all heirs need to agree?', answer: 'Usually everyone with an ownership interest must sign. We can share one offer for everyone to review.' },
    ],
    related: ['sell-probate-house', 'sell-hoarder-house', 'sell-vacant-house'],
  },

  'sell-probate-house': {
    metaTitle: 'Sell a Probate House for Cash | Get Home Offer',
    metaDescription:
      'Sell a house in probate. We work with personal representatives and estate attorneys to make a straightforward cash offer.',
    heading: 'Sell a Probate House',
    summary: 'Settling an estate? We work with personal representatives and their attorneys on a straightforward sale.',
    intro: [
      'Probate is the court process for settling a person\'s estate, and selling a house during it can involve court timelines and extra paperwork.',
      'We buy houses in probate as they are, and we work with the personal representative and the estate\'s attorney so the sale fits the process.',
    ],
    signs: [
      'You are the personal representative or executor of an estate',
      'The estate needs to sell a house to settle debts or divide assets',
      'The house needs work or is full of belongings',
      'You want a buyer who understands probate timelines',
    ],
    help: [
      { title: 'Works with your attorney', body: 'We coordinate with the estate\'s lawyer on timing and approvals.' },
      { title: 'As-is purchase', body: 'No repairs or clean-out required from the estate.' },
      { title: 'Flexible closing', body: 'We plan the closing around court and estate requirements.' },
    ],
    know: [
      'Probate rules and timelines vary by state and county. Some sales need court approval or notice to heirs. The estate\'s attorney will confirm what applies.',
      'Only the person with legal authority over the estate can sign a sale agreement.',
    ],
    faqs: [
      { question: 'Can a house be sold during probate?', answer: 'Often, yes, with the right authority and sometimes court approval. The estate\'s attorney can confirm.' },
      { question: 'Who signs the sale?', answer: 'The personal representative or executor with legal authority over the estate.' },
    ],
    related: ['sell-inherited-house', 'sell-hoarder-house', 'sell-house-liens-back-taxes'],
  },

  'sell-house-divorce': {
    metaTitle: 'Sell Your House During Divorce | Get Home Offer',
    metaDescription:
      'Sell your house during a divorce with one clear cash offer both parties can review. No showings and a closing date you choose.',
    heading: 'Sell Your House During Divorce',
    summary: 'One clear offer both parties can review, and a closing date that fits the settlement.',
    intro: [
      'Selling a shared home during a divorce adds stress to an already hard time, especially when it means months of showings and negotiating with buyers.',
      'A direct sale gives both parties one straightforward offer and a predictable closing, so you can divide proceeds and move on.',
    ],
    signs: [
      'You and your spouse agree the house should be sold',
      'You want to avoid months of showings and negotiations',
      'You need a clear number to divide',
      'One or both of you have already moved out',
    ],
    help: [
      { title: 'One offer for both', body: 'A single, clear number both parties and their attorneys can review.' },
      { title: 'No showings', body: 'No coordinating tours or keeping the house show-ready.' },
      { title: 'Settlement-friendly closing', body: 'We plan the closing date around your agreement.' },
    ],
    know: [
      'Usually everyone on the title must agree to and sign the sale. Your divorce attorneys can confirm how proceeds are divided.',
      'If a court order covers the house, share it so the sale follows its terms.',
    ],
    faqs: [
      { question: 'Do both spouses need to sign?', answer: 'Usually everyone on the title must sign. Your attorneys will confirm.' },
      { question: 'How are the proceeds split?', answer: 'That follows your agreement or court order. The title company pays out as directed.' },
    ],
    related: ['sell-house-fast', 'sell-house-relocating', 'sell-house-as-is'],
  },

  'sell-house-relocating': {
    metaTitle: 'Sell Your House When Relocating | Get Home Offer',
    metaDescription:
      'Relocating? Sell your house on your schedule without carrying two homes. Get a cash offer and pick your closing date.',
    heading: 'Sell Your House When Relocating',
    summary: 'Moving for work or family? Sell on your schedule without paying for two homes.',
    intro: [
      'A relocation comes with a start date, and a traditional sale may not finish before you need to go, leaving you paying for two places.',
      'We buy houses from people who are moving. Choose a closing date that lines up with your move, and handle much of it from wherever you are.',
    ],
    signs: [
      'You have a new job or family move on the calendar',
      'You do not want to pay a mortgage and rent at the same time',
      'You will be gone before a listing would sell',
      'You want to leave behind what you do not want to move',
    ],
    help: [
      { title: 'Your closing date', body: 'We line up closing with your move.' },
      { title: 'Remote process', body: 'Much of the sale can be handled after you have left.' },
      { title: 'Leave items behind', body: 'Take what you want and leave the rest.' },
    ],
    know: [
      'If your employer offers relocation benefits, check whether they cover home sale costs or have rules about how you sell.',
      'Compare the cost of carrying the house while it sits on the market against a direct offer now.',
    ],
    faqs: [
      { question: 'Can I close after I move?', answer: 'Yes. Closing paperwork can usually be handled remotely through the title company.' },
      { question: 'What if I need to stay a little longer?', answer: 'Tell us. We can often set a later closing date.' },
    ],
    related: ['sell-house-fast', 'sell-vacant-house', 'sell-condo-townhome'],
  },

  'sell-house-downsizing': {
    metaTitle: 'Sell Your House When Downsizing | Get Home Offer',
    metaDescription:
      'Downsizing? Sell your house without updating it or clearing it out. Get a straightforward cash offer and a flexible move date.',
    heading: 'Sell Your House When Downsizing',
    summary: 'Ready for a smaller place? Sell without renovating, staging or clearing out every room.',
    intro: [
      'Downsizing often means leaving a house full of years of belongings, and the idea of updating it for buyers can feel like too much.',
      'We buy houses from people who are downsizing. Take what fits your next home, leave the rest and pick a move date that works.',
    ],
    signs: [
      'The house is more space than you need',
      'Upkeep and stairs are getting harder',
      'You do not want to renovate before selling',
      'You want to sell and move on your own schedule',
    ],
    help: [
      { title: 'No staging', body: 'Sell the house as it is, lived-in and all.' },
      { title: 'Leave what does not fit', body: 'Take what you want to your next home.' },
      { title: 'Flexible move date', body: 'Close when your next place is ready.' },
    ],
    know: [
      'Selling a long-time home can have tax considerations. A tax professional can tell you what applies.',
      'If you want the highest market price and have time, compare our offer with a traditional listing.',
    ],
    faqs: [
      { question: 'Can I pick when I move out?', answer: 'Yes. We set the closing date around your plans.' },
      { question: 'Do I need to empty the house?', answer: 'No. Take what you want and leave the rest.' },
    ],
    related: ['sell-house-assisted-living', 'sell-outdated-house', 'sell-condo-townhome'],
  },

  'sell-house-assisted-living': {
    metaTitle: 'Sell a House for a Move to Assisted Living | Get Home Offer',
    metaDescription:
      'Selling a house to move a parent or yourself to assisted living? Get a simple cash offer and a closing date that fits the move.',
    heading: 'Sell a House for a Move to Assisted Living',
    summary: 'Help a parent, or yourself, make the move without the stress of repairs, showings and clean-outs.',
    intro: [
      'A move to assisted living or senior care often happens on a short timeline, and families are left deciding what to do with a house full of memories.',
      'We buy houses in these situations as they are. Family members can take what matters, and we work with whoever has the authority to sell.',
    ],
    signs: [
      'A parent is moving into assisted living or memory care',
      'The house needs to be sold to help cover care costs',
      'Family members live far away',
      'The house needs work or a full clean-out',
    ],
    help: [
      { title: 'Gentle pace', body: 'We move at a pace that is comfortable for the family.' },
      { title: 'No clean-out', body: 'Keep the keepsakes and leave the rest.' },
      { title: 'Works with representatives', body: 'We work with a power of attorney or other authorized family member.' },
    ],
    know: [
      'If the owner cannot sign, the person selling usually needs legal authority, such as a power of attorney. An attorney can confirm what is needed.',
      'Sale proceeds can affect eligibility for some benefits. Talk to an elder law attorney or benefits advisor first.',
    ],
    faqs: [
      { question: 'Can a family member sell on a parent\'s behalf?', answer: 'Usually only with legal authority, like a power of attorney. An attorney can confirm.' },
      { question: 'Do we need to clear the house first?', answer: 'No. Take what matters and leave the rest.' },
    ],
    related: ['sell-house-downsizing', 'sell-inherited-house', 'sell-hoarder-house'],
  },

  'sell-house-behind-on-payments': {
    metaTitle: 'Sell Your House When Behind on Payments | Get Home Offer',
    metaDescription:
      'Behind on your mortgage? Selling your house may be an option. Get a straightforward cash offer and see where you stand.',
    heading: 'Sell Your House When Behind on Payments',
    summary: 'Falling behind on your mortgage is stressful. Selling may be one option. See where you stand.',
    intro: [
      'Missed mortgage payments can add up quickly. Talking to your lender early, and knowing all your options, matters.',
      'If selling is the right path for you, we can make a straightforward cash offer. At closing, your mortgage balance is paid from the sale proceeds.',
    ],
    signs: [
      'You have missed one or more mortgage payments',
      'Your payment is no longer affordable',
      'You would rather sell than keep falling further behind',
      'You want a clear picture of what you would walk away with',
    ],
    help: [
      { title: 'Clear numbers', body: 'A straightforward offer so you can compare it with what you owe.' },
      { title: 'Payoff at closing', body: 'The title company pays your lender from the proceeds.' },
      { title: 'Timing matters', body: 'A cash sale can close quickly when time is short.' },
    ],
    know: [
      'Selling is one option among several. Your lender may offer alternatives, and a HUD-approved housing counselor can review your options for free.',
      'A sale only works if the proceeds can pay off the loan, unless the lender agrees otherwise. We will be clear about the numbers.',
    ],
    faqs: [
      { question: 'What happens to my mortgage when I sell?', answer: 'It is paid off from the sale proceeds at closing through the title company.' },
      { question: 'Should I talk to my lender first?', answer: 'Yes. Your lender and a HUD-approved housing counselor can explain all your options.' },
    ],
    related: ['sell-house-liens-back-taxes', 'sell-house-fast', 'sell-house-divorce'],
  },

  'sell-house-liens-back-taxes': {
    metaTitle: 'Sell a House With Liens or Back Taxes | Get Home Offer',
    metaDescription:
      'Sell a house with liens or back taxes. Liens and unpaid taxes are typically paid from the proceeds at closing. Get a cash offer.',
    heading: 'Sell a House With Liens or Back Taxes',
    summary: 'Unpaid property taxes, contractor liens or judgments do not always stop a sale.',
    intro: [
      'Liens and back taxes attach to a property, and they usually must be resolved before a buyer can get clear title.',
      'In many cases they are paid from the sale proceeds at closing. Tell us what is owed and we will factor it into a straightforward offer.',
    ],
    signs: [
      'You owe back property taxes',
      'A contractor, lender or creditor has filed a lien',
      'Liens have stalled a previous sale',
      'You want a clear picture of what you would net',
    ],
    help: [
      { title: 'Title search', body: 'The title company identifies every lien on the property.' },
      { title: 'Paid at closing', body: 'Liens and back taxes are typically paid from the proceeds.' },
      { title: 'Clear net number', body: 'We show you what is left after everything is paid.' },
    ],
    know: [
      'Some liens, such as certain tax liens, follow special rules. The title company will confirm what must be paid and how.',
      'If the liens add up to more than the property is worth, a sale may need lienholder approval. We will be upfront about the numbers.',
    ],
    faqs: [
      { question: 'Can I sell a house with a tax lien?', answer: 'Often, yes. Back taxes are typically paid from the proceeds at closing.' },
      { question: 'How do I find out what liens are on my house?', answer: 'The title company runs a title search that shows recorded liens.' },
    ],
    related: ['sell-house-behind-on-payments', 'sell-house-code-violations', 'sell-probate-house'],
  },

  'sell-house-after-failed-sale': {
    metaTitle: 'Sell a House After a Failed Sale | Get Home Offer',
    metaDescription:
      'Buyer\'s financing fell through or the listing expired? Sell your house directly for cash with no lender involved.',
    heading: 'Sell a House After a Failed Sale',
    summary: 'Financing fell through, an inspection killed the deal or the listing expired. Try a sale that does not depend on a lender.',
    intro: [
      'A failed sale is frustrating. You prepared the house, planned your move and then a buyer\'s loan, appraisal or inspection ended the deal.',
      'We buy houses with cash, so there is no lender approval or appraisal to fall through. Tell us what happened and we will make a straightforward offer.',
    ],
    signs: [
      'A buyer\'s financing or appraisal fell through',
      'An inspection report scared off your buyer',
      'Your listing expired without a sale',
      'You still need to sell on a timeline',
    ],
    help: [
      { title: 'No financing contingency', body: 'A cash purchase does not depend on a lender.' },
      { title: 'Inspection issues welcome', body: 'Problems that ended the last deal are part of our offer.' },
      { title: 'Back on schedule', body: 'Close on a date that gets your plans moving again.' },
    ],
    know: [
      'If you are still under a listing agreement, check its terms before selling another way.',
      'Share the previous inspection report if you have one. It helps us make an accurate offer quickly.',
    ],
    faqs: [
      { question: 'Can I sell to you if my listing is still active?', answer: 'Check your listing agreement first. Once you are free to sell, we can make an offer.' },
      { question: 'Will the old inspection report help?', answer: 'Yes. Sharing it helps us make an accurate offer.' },
    ],
    related: ['sell-house-fast', 'sell-house-without-realtor', 'sell-house-needs-repairs'],
  },
};
