export interface Section {
  id: string;
  title: string;
  content: string[];
  requiresInitials: boolean;
}

export const clientGuidelinesContent: Section[] = [
  {
    id: 'about',
    title: 'About 48 Wall Street: A Historic Venue',
    content: [
      "48 Wall Street offers a distinctive event destination in Lower Manhattan, defined by legacy, prestige, and architectural grandeur. Located in the heart of the Financial District, the Venue spans three remarkable floors of the former Bank of New York & Trust Company Building. The building's cornerstone was laid on January 12, 1928, the 171st birthday of Alexander Hamilton, the bank's founder.",
      'Today, 48 Wall Street remains a preserved architectural landmark featuring soaring ceilings, intricate marble detailing, and the original Grand Mezzanine. The Venue blends 1920s elegance with modern production capabilities, providing clients with a rare combination of historic character and contemporary convenience for corporate summits, private celebrations, and social galas.',
    ],
    requiresInitials: false,
  },
  {
    id: 'exclusive-vendors',
    title: 'Exclusive Vendors and Landmark Restrictions',
    content: [
      '48 Wall Street utilizes exclusive, designated vendors to provide event planning and production services throughout the property, including, without limitation: food and beverage, audiovisual, lighting, staging, custom fabrication, printing, décor, floral design, entertainment, rentals, tenting, and specialty services.',
      'No outside vendors are permitted to provide services within 48 Wall Street unless expressly approved in writing by Venue management.',
      'As a designated landmark building, restrictions apply. No items may be affixed to or placed on walls, columns, revolving doors, marble surfaces, flooring, or architectural elements without prior written approval from Venue management.',
    ],
    requiresInitials: true,
  },
  {
    id: 'venue-contacts',
    title: 'Venue Contacts',
    content: [
      'Venue Sales Director: Lauren Leuci | Corporate Office: 877.885.0705 | Direct: 631.980.0239 | Email: lleuci@mmeink.com',
      'Director of Operations: Andrew Heaton | Corporate Office: 877.885.0705 | Direct: 631.980.3637 | Mobile: 347.295.5501 | Email: aheaton@mmeink.com',
      'Event Manager, Catering & Event Support: Andrea Palacio | Corporate Office: 877.885.0705 | Direct: 631.267.1324 | Email: apalacio@mmeink.com',
      'Manager of Digital Content & Audio Visual: Philip Bianco | Corporate Office: 877.885.0705 | Direct: 631.980.0237 | Email: pbianco@mmeink.com',
      'Production Manager: Juan Fuentes | Corporate Office: 877.885.0705 | Email: jfuentes@mmeink.com',
    ],
    requiresInitials: false,
  },
  {
    id: 'financial-authorization',
    title: 'Financial Authorization, Overtime & Additional Charges',
    content: [
      'The Client shall provide a valid credit card to be maintained on file with 48 Wall Street prior to the event date. The credit card will be pre-authorized to cover additional charges incurred during or after the event.',
      'By signing this Agreement, the Client expressly authorizes 48 Wall Street to charge the credit card on file for, including but not limited to:',
      '• Event overtime charges (Venue, staffing, security, production, and vendors)',
      '• Guest counts exceeding the guaranteed number',
      '• Amenity fees',
      '• Wi-Fi and private network services',
      '• Additional labor, equipment, rentals, or services requested or required',
      '• Damages, excessive cleaning, or trash removal',
      'Overtime is billed in accordance with Venue and vendor rate schedules and may be applied without additional signature if incurred in connection with event execution.',
    ],
    requiresInitials: true,
  },
  {
    id: 'deliveries',
    title: 'Deliveries',
    content: [
      'Standard deliveries should be sent to the 48 Wall Street Events corporate office: 140 Florida St., Farmingdale, NY 11735',
      'Venue deliveries (Lobby 2): 48 Wall St., New York, NY 10005. All Venue deliveries must be scheduled in advance and coordinated through the William Street service entrance, subject to building operations.',
      'Delivery Hours: Monday to Friday, 10:00 AM to 5:00 PM (EST) only.',
      'After-Hours Deliveries: After-hours delivery access may be arranged at an additional cost of $1,800 for deliveries scheduled after 5:00 PM, covering delivery access up to 7:00 PM (EST).',
      'Advance Delivery Requirements: All advance deliveries require prior written approval from Venue management. Client must provide a written inventory list of all items/materials, including the total number of boxes. All items must be removed by 5:00 PM (EST) on the following business day. If items are not removed by the deadline, the Client authorizes a charge of $1,000 per day to the credit card on file until removal. Client is responsible for all shipping labels, arrangements, and item handling.',
      'Release of Liability: The Client hereby releases, indemnifies, defends, and holds harmless 48 Wall Street and its affiliated entities, officers, directors, employees, agents, and management from and against any and all claims, losses, or liabilities arising out of or related to late deliveries, damage to property, or any lost or stolen packages.',
      'Courier and Handling Services: Courier and handling services may be arranged by 48 Wall Street at an additional cost.',
    ],
    requiresInitials: true,
  },
  {
    id: 'load-in-out',
    title: 'Load-In / Load-Out',
    content: [
      'All load-in and load-out schedules must be confirmed at least one (1) week in advance.',
      'Additional Time: Any additional load-in or load-out time required beyond the approved schedule shall be billed at $7,500 per hour.',
      'Venue Access Times (General Guidelines): If the event begins at 8:00 AM, Venue doors open at 7:00 AM. For evening events, access is provided beginning at 2:00 PM, unless otherwise approved in writing.',
      'Guest Entrance Only: The front entrance is for guest entry and exit only. No load-in or load-out is permitted through the front doors.',
      'Service Entrance and Hours: Access for load-in/load-out is limited to Monday to Friday, 10:00 AM to 5:00 PM, via the William Street service entrance, unless otherwise approved.',
      'Freight Elevator: Use of the freight elevator requires prior approval and building personnel. Additional fees may apply and will be billed separately.',
      'Passenger Elevator Restriction: The passenger elevator is for passenger use only. Use of the passenger elevator for equipment or product movement without prior written consent from Venue management is prohibited and may result in immediate removal from the premises.',
      'Damage Responsibility: The Client is solely responsible for any damage caused by Client, guests, vendors (if approved), or any third parties. The Client authorizes the Venue to charge the credit card on file for any and all damages.',
      'Historic Floor and Architectural Protection: To protect the historic architecture and floors, protective measures may be required during load-in/load-out and are subject to an additional $7,500 protection charge, which the Client acknowledges and agrees to pay.',
      'Freight Elevator Specifications (for reference): Door Opening: 83" H x 48" W | Cab Floor: 70" W x 51" D | Max Interior Height: 118.5" | Max Weight: 2,500 lbs',
    ],
    requiresInitials: true,
  },
  {
    id: 'storage',
    title: 'Storage',
    content: [
      'Storage space is extremely limited. Additional storage may be arranged at an added cost of $2,800 per day, subject to availability.',
      "Risk of Loss: Any storage of the Client's packages, marketing materials, equipment, or event-related products at or within the premises is undertaken at the Client's sole risk. Title to and risk of loss remain exclusively with the Client at all times. The Client assumes full responsibility for the care, custody, and control of such items and releases, indemnifies, defends, and holds harmless 48 Wall Street and its affiliates from any claims arising out of or related to storage, handling, damage, loss, or theft of such items, except to the extent caused by the Venue's gross negligence or willful misconduct.",
    ],
    requiresInitials: true,
  },
  {
    id: 'safety-compliance',
    title: 'Safety, Compliance & Venue Restrictions',
    content: [
      'No pyrotechnics, open flames, gas, propane, or sterno fuel. If used, the Venue may immediately end the event. The Client accepts full responsibility for all damages and financial losses and acknowledges no refund will be provided.',
      'All emergency exits and egress paths must remain clear at all times.',
      'Any permitted drapery/soft goods must include fire-retardant certification (if allowed by Venue).',
      'Marble floors must be fully protected beneath any equipment or décor.',
      'No dragging or pushing items. Items must be carried.',
      'Balloons and confetti are prohibited.',
      'No outside food is permitted without prior written approval from Venue management. Violation may result in immediate event termination without refund, and Client waives claims against the Venue for enforcement.',
      'No outside alcohol (spirits, wine, beer, liquor) is permitted and may violate New York State SLA rules. Violation may result in immediate event termination without refund, and Client waives claims against the Venue for enforcement.',
      'No storage of boxes/equipment in back-of-house areas without written approval.',
      'Smoking/vaping is prohibited within the facility.',
    ],
    requiresInitials: true,
  },
  {
    id: 'power-wifi',
    title: 'Power, Wi-Fi & Technical Services',
    content: [
      'All power distribution and technical services are managed exclusively by 48 Wall Street vendors.',
      'Power requirements must be submitted and approved at least two (2) weeks prior to the event and may be subject to additional charges.',
      'Standard Wi-Fi may be available (fees may apply).',
      'Private networks and additional bandwidth are available at an additional cost.',
    ],
    requiresInitials: true,
  },
  {
    id: 'av-production',
    title: 'Audio, Video, Lighting & Production',
    content: [
      "Exclusive AV Services: All audio, video, lighting, staging, rigging, and production services at 48 Wall Street must be provided exclusively by the Venue's designated vendors. The use of outside audiovisual equipment, production companies, or technical providers is not permitted without the Venue's prior written approval.",
      'Media Delivery Requirements: All run-of-show materials, including but not limited to video files, audio files, presentations, and graphics (collectively, "Show Content"), must be delivered in a ready-to-play, final format no later than two (2) weeks prior to the event or show date. Failure to deliver Show Content by this deadline shall result in a rush processing fee of Two Thousand Five Hundred Dollars ($2,500) per day, calculated from the missed deadline.',
      "Dry Runs & Pre-Loads: At the Client's request and subject to Venue availability, a technical dry run and/or pre-load may be scheduled. Such services are subject to an additional fee of Fifteen Thousand Dollars ($15,000), plus applicable labor and technical support charges. All dry runs and pre-loads must be scheduled in advance and are contingent upon Venue staffing and production schedules.",
      "Operational Authority & Venue Protection: The Venue reserves the right to modify, delay, or restrict production elements that, in the Venue's reasonable judgment, pose safety risks, exceed technical limitations, interfere with building operations, or violate Venue policies. The Venue shall not be responsible for production delays, performance issues, or content playback failures resulting from late delivery, incompatible formats, or Client-provided materials.",
      'Client Responsibility & Approval: The Client is responsible for the accuracy, quality, legality, and performance readiness of all Show Content. The Venue makes no guarantee regarding content performance if materials are not delivered in accordance with the required specifications and deadlines.',
      'AV Event Production & Requirements Form: The Client must complete and submit the AV Event Production and AV Requirements Form no later than two (2) weeks prior to the event or show date. This form outlines technical specifications, production needs, and operational requirements and is mandatory for all events.',
      'Billing Authorization: The Client acknowledges and agrees that all applicable rush fees, dry run fees, labor charges, and additional production costs shall be charged to the authorized credit card on file and are non-waivable and non-contestable.',
    ],
    requiresInitials: true,
  },
  {
    id: 'printing-graphics',
    title: 'Printing and Graphics',
    content: [
      "All printing and graphics must be produced exclusively by 48 Wall Street's designated vendors.",
      'Client must approve artwork prior to production. After Client sign-off and Venue countersignature, changes are subject to additional charges.',
      'One (1) initial design revision is included. Each additional revision is $2,500.',
      'Final graphics must be provided in EPS format no later than two and one-half (2.5) weeks prior to the event. Late submissions incur a rush fee of $1,500 per day from the missed deadline.',
      'All charges are billed to the credit card on file and are non-waivable and non-contestable.',
    ],
    requiresInitials: true,
  },
  {
    id: 'marketing-rights',
    title: 'Venue Marketing & Media Rights',
    content: [
      'Marketing, Photography, and Video Rights: The Client acknowledges and agrees that 48 Wall Street (the "Venue") reserves the right to photograph, film, and otherwise record the event, including guests, performers, and activities, through video, photography, or other media, for the purpose of marketing, advertising, and promoting the Venue to prospective clients.',
      'The Client hereby grants the Venue a perpetual, royalty-free, non-exclusive, worldwide license to use, reproduce, publish, display, and distribute such images and recordings, in whole or in part, in any media now known or hereafter developed, solely for Venue marketing, promotional, and portfolio purposes.',
      'The Client represents and warrants that it has obtained, or shall obtain, any necessary consents from guests, performers, or third parties required for such recording and use, and agrees to release, indemnify, and hold harmless the Venue, its owners, management, employees, agents, and affiliated companies from any and all claims arising out of or related to such use.',
    ],
    requiresInitials: true,
  },
  {
    id: 'catering-policy',
    title: 'Catering Policy',
    content: [
      'In-House Caterer: Policies and Procedures',
      'Final Guest Count: The Client shall provide the final guaranteed guest count no later than two and one-half (2.5) weeks prior to the event date. The Client acknowledges and agrees that any attendance in excess of the guaranteed guest count shall constitute an overage. The Client hereby authorizes 48 Wall Street to automatically charge the authorized credit card on file for all overage costs, including applicable service charges and taxes.',
      "Menu Selection: All menu selections must be finalized no later than two (2) weeks prior to the event date. Failure to meet this deadline authorizes the Venue's food and beverage team to determine and select the menu on the Client's behalf, at the Venue's sole discretion.",
      'Plated / Sit-Down Dinners: All seated or plated dinner services require guest pre-selection of menu choices no later than two (2) weeks prior to the event date. If guest selections are not received by this deadline, the Venue reserves the right to select all menu options.',
      "Kitchen Use & Equipment Rentals: All kitchen equipment rentals must be arranged exclusively through 48 Wall Street's designated vendors and are subject to additional charges based on the equipment and specialty catering requirements requested. Use of the 48 Wall Street kitchen is subject to the following mandatory fees: Kitchen rental fee: $7,500 | Kitchen manager: $750 | Power usage fee: $1,000 | Cleaning fee: $2,500. All such fees shall be billed to the authorized credit card on file and are non-waivable and non-contestable.",
      'Alcohol Service: 48 Wall Street holds all required liquor licenses for the premises. No outside alcohol is permitted under any circumstances. All alcoholic beverages must be supplied and served exclusively by 48 Wall Street at all events.',
      'Fire & Fuel Restrictions: The Venue strictly enforces a no open flame, gas, or propane policy. Only electric equipment is permitted within the premises.',
    ],
    requiresInitials: true,
  },
  {
    id: 'outside-caterers',
    title: 'Outside Caterers',
    content: [
      'Insurance & Documentation: All outside caterers must provide a compliant Certificate of Insurance (COI), all required permits (if applicable), and a detailed list of kitchen equipment needs to 48 Wall Street and its exclusive vendors no later than two (2) weeks prior to the event date.',
      "Equipment & Rentals: All kitchen equipment, rentals, and related services must be coordinated exclusively through 48 Wall Street's designated vendors and are subject to additional costs.",
      'Equipment Restrictions: Only electric kitchen equipment is permitted. Open flames, gas, and propane are strictly prohibited.',
      'Floor Plan Submission: Outside caterers must submit a detailed kitchen and service floor plan no later than two (2) weeks prior to the event date for Venue approval.',
      'Waste Removal: Outside caterers are fully responsible for removing all event-related garbage, debris, and waste from the Venue immediately following the event. If any garbage or waste is left behind, the Client acknowledges and authorizes the Venue to automatically charge the authorized credit card on file a cleaning and disposal fee of Two Thousand Five Hundred Dollars ($2,500).',
    ],
    requiresInitials: true,
  },
  {
    id: 'food-allergen',
    title:
      'Food Service; Allergies; Compliance with Health Codes; Assumption of Risk',
    content: [
      'The Client acknowledges that the Venue is an off-premises, non-traditional event location and is not a licensed restaurant or commercial food establishment unless otherwise expressly stated. Any food preparation, handling, service, or consumption occurring at the Venue is conducted at the Client\'s request and subject to applicable New York State Department of Health and New York City Department of Health and Mental Hygiene ("DOHMH") regulations.',
      'The Client shall be solely responsible for providing the Venue, in writing and no later than the deadline specified in this Agreement, with complete and accurate information regarding any guest food allergies, dietary restrictions, or special food-handling requirements. The Client further acknowledges that the Venue cannot guarantee an allergen-free environment.',
      "The Client understands and accepts that the consumption of food involves inherent risks, including allergic reactions and foodborne illness. To the fullest extent permitted by New York law, the Client assumes all risks associated with food consumption at the event and agrees that the Venue, its owners, management, chefs, employees, agents, and affiliated companies shall not be liable for any illness, allergic reaction, injury, or damages arising from food preparation, handling, service, or consumption, except to the extent caused by the Venue's gross negligence or willful misconduct.",
      "The Client hereby releases, indemnifies, defends, and holds harmless the Venue, its owners, management, chefs, employees, agents, and affiliated companies from and against any and all claims, demands, damages, losses, liabilities, fines, penalties, costs, or expenses (including reasonable attorneys' fees) arising out of or related to food service at the event, including but not limited to claims involving food allergies, dietary restrictions, or alleged violations of applicable health codes by the Client, guests, or any third-party food provider.",
      'Any outside caterer, food vendor, or third-party provider engaged by the Client must comply with all applicable New York State and New York City health regulations and shall provide all required permits, licenses, and certificates of insurance prior to the event, as required by the Venue.',
    ],
    requiresInitials: true,
  },
  {
    id: 'bar-services',
    title: 'Bar Services Policy',
    content: [
      "The Venue maintains a no-shots policy and reserves the right, in its sole discretion, to refuse or deny alcoholic beverage service to any guest. The Venue further reserves the right to request and verify a valid state-issued driver's license or other acceptable government-issued photographic identification as a condition of alcohol service.",
      'The Venue shall have the right to close any one or more service bars at any time during the event due to, including but not limited to, excessive consumption of alcohol, guest intoxication, disorderly conduct, a guest becoming incapacitated or unconscious, alcohol-related incidents, or the involvement of emergency medical services (EMS) or law enforcement.',
      'The Client acknowledges and agrees that the Venue may suspend or terminate bar service, in whole or in part, at any time in the interest of guest safety and compliance with applicable laws and regulations. The Client hereby releases, indemnifies, and holds harmless the Venue, its management, bartenders, and affiliated companies from any and all claims or liabilities arising from such actions.',
      'The Client further acknowledges and agrees that the suspension or termination of bar service shall not entitle the Client to any refund, denial of payment, credit, or credit-card chargeback.',
    ],
    requiresInitials: true,
  },
  {
    id: 'beverage-packages',
    title: 'Alcoholic Beverage Packages, Upgrades, and Payment Authorization',
    content: [
      'All alcoholic beverage services shall be provided in accordance with the bar package selected by the Client and set forth in Exhibit A (Beverage Packages and Pricing) attached hereto and incorporated herein by reference. Any liquor, spirits, wine, or beer products requested by the Client that are not included in the selected bar package shall be deemed upgrades and shall be subject to additional charges as outlined in Exhibit A, including any applicable minimum spend requirements or per-unit pricing schedules.',
      'The Client acknowledges and agrees that all beverage upgrades must be requested in writing and approved by the Venue in advance of the event. The Client further authorizes the Venue to charge all approved upgrade costs, minimum spend shortfalls, applicable taxes, service charges, and related fees to the authorized credit card on file in accordance with the Payment Authorization and Billing section of this Agreement.',
      'All such charges are final, non-waivable, and non-contestable, and the Client expressly waives any right to dispute, offset, or initiate a credit-card chargeback in connection with approved beverage upgrades or minimum spend obligations.',
    ],
    requiresInitials: true,
  },
  {
    id: 'security-management',
    title: 'Security Management; Occupancy Limits; Guest Conduct',
    content: [
      'The Venue reserves the right, in its sole and absolute discretion, to control access to the premises and to deny entry to or require the removal of any guest when the Venue has reached its maximum lawful occupancy or when such action is deemed necessary to protect the safety of guests, staff, and the Venue.',
      "The Venue's security and management team shall have full authority to monitor guest behavior and to take reasonable and appropriate action to maintain order and safety, including but not limited to refusing service, restricting access to certain areas, removing guests from the premises, contacting emergency medical services or law enforcement, or terminating the event in whole or in part.",
      'Such actions may be taken in response to, including but not limited to, excessive alcohol consumption, disorderly or disruptive conduct, abusive, threatening, or harassing behavior, damage or attempted damage to the Venue or its property, or any conduct that violates applicable laws, regulations, or Venue policies.',
      'The Client acknowledges and agrees that the Venue, its management, security personnel, employees, agents, and affiliated companies shall not be liable for any claims, losses, or damages arising from the denial of entry, removal of guests, or other security actions taken in good faith to protect the Venue and its occupants. The Client further agrees to release, indemnify, and hold harmless the Venue and its security team from and against any and all claims or liabilities arising from guest conduct or enforcement of Venue policies.',
    ],
    requiresInitials: true,
  },
  {
    id: 'surveillance',
    title: 'Security Cameras and Surveillance Policy',
    content: [
      'The Venue is equipped with security cameras and video surveillance systems located in public and common areas for the purpose of protecting the safety of guests, staff, and the Venue, as well as safeguarding property and ensuring compliance with Venue policies and applicable laws.',
      "The Client acknowledges and agrees that video surveillance may be in operation at all times during the event and that the recording, retention, and use of such footage shall be solely within the Venue's control. Surveillance footage may be reviewed, used, or disclosed by the Venue in connection with security operations, incident investigations, insurance matters, or legal proceedings, as permitted by law.",
      "The Venue's surveillance systems are not intended for constant or individual monitoring, and the Venue makes no representation or warranty regarding the prevention of incidents or losses. The Client further acknowledges that the Venue shall not be liable for any acts, omissions, injuries, losses, or damages occurring on the premises that are captured or not captured by security cameras.",
      'The Client hereby releases, indemnifies, and holds harmless the Venue, its owners, management, security personnel, employees, agents, and affiliated companies from and against any and all claims or liabilities arising out of or related to the use, operation, or existence of security cameras and surveillance systems, to the fullest extent permitted by New York law.',
    ],
    requiresInitials: true,
  },
  {
    id: 'guest-recording',
    title:
      'Guest Recording: Incident Management; Protection of Venue Personnel',
    content: [
      'The Client acknowledges and agrees that guests shall not interfere with, record, photograph, or otherwise document Venue management, security personnel, or employees while they are responding to, managing, or resolving any incident, safety matter, or operational situation occurring during or after the event, except as expressly permitted by the Venue or required by law.',
      'Any unauthorized recording, dissemination, publication, or use of images, video, audio, or other documentation depicting the Venue, its owners, management, security personnel, or employees in a manner that is misleading, defamatory, or intended to cause reputational harm ("bad publicity") shall be strictly prohibited.',
      'The Client acknowledges that it is responsible for the conduct of its guests and agrees that it shall be fully liable for any and all damages, losses, claims, demands, costs, or allegations arising out of or related to the unauthorized recording, distribution, or misuse of such materials by the Client or its guests.',
      "The Client hereby agrees to release, indemnify, defend, and hold harmless 48 Wall Street, its ownership, management, employees, security personnel, agents, and affiliated companies from and against any and all claims, liabilities, damages, or expenses (including reasonable attorneys' fees) arising from or related to any such recording, use, or publication.",
    ],
    requiresInitials: true,
  },
  {
    id: 'personal-property',
    title: 'Personal Property; Lost and Found',
    content: [
      'The Venue shall not be responsible or liable for any personal property belonging to the Client or guests that is lost, misplaced, damaged, or stolen at or about the premises, including but not limited to money, credit cards, identification, checks, gifts, or other valuables.',
      "Any personal items left on the premises may, at the Venue's discretion, be placed in a designated lost-and-found area for a limited period of time. The Venue makes no representation or guarantee regarding the recovery, safekeeping, or condition of such items.",
      'The Client acknowledges and agrees to release, indemnify, and hold harmless the Venue, its owners, management, employees, agents, and affiliated companies from and against any and all claims, demands, losses, damages, or liabilities arising out of or related to the loss, damage, or theft of personal property of the Client or any guest, to the fullest extent permitted by law.',
    ],
    requiresInitials: true,
  },
  {
    id: 'smoking-policy',
    title:
      'Standard Operating Procedure (SOP): Smoking, Vaping, and E-Cigarette Policy',
    content: [
      'Designated Smoking Area: 48 Wall Street maintains a designated smoking area located at the corner of Wall Street and South William Street. This designated area applies to all smoking-related activities, including traditional cigarettes, cigars, pipes, vaping devices, and electronic cigarettes.',
      'Prohibited Areas: Smoking, vaping, or use of e-cigarettes is strictly prohibited inside the building, in front of the building, at all building entrances, and in any non-designated area at all times, including before, during, and after the event.',
      'Enforcement: Venue management and security personnel are authorized to enforce this policy and may direct guests to the designated smoking area. Guests who fail to comply may be denied re-entry, removed from the premises, or subject to additional action deemed necessary by Venue management to ensure safety and compliance with applicable laws and building regulations.',
      'Client Responsibility: The Client acknowledges and agrees that it is responsible for communicating this smoking, vaping, and e-cigarette policy to all guests. The Client further agrees to release, indemnify, and hold harmless the Venue, its ownership, management, employees, security personnel, and affiliated companies from any claims, fines, penalties, or liabilities arising from guest non-compliance.',
    ],
    requiresInitials: true,
  },
  {
    id: 'outside-vendor-policy',
    title: 'Exclusive Venue and Approved Outside Vendor Policy',
    content: [
      "48 Wall Street operates as an exclusive venue. Any approval to permit outside vendors or third-party service providers is granted solely at the Venue's discretion and is subject to a vendor buyout fee associated with the specific services being provided.",
      'Vendor Approval and Compliance: All outside vendors must be pre-approved by the Venue and shall comply with all 48 Wall Street rules, guidelines, operational procedures, and safety requirements. The Venue reserves the right, in its sole discretion, to deny access to, restrict, or remove any vendor or individual who fails to comply with Venue policies or whose conduct is deemed unprofessional, disruptive, abusive, or unsafe.',
      'Behavior and Removal Rights: The Venue reserves the right to remove any individual or outside vendor whose behavior is inappropriate, abusive, or poses a risk to guests, staff, or the premises. Such removal shall not relieve the Client of any financial obligations under this Agreement.',
      'Vendor Buyout Fee and Timing: Approval of outside vendors is subject to a vendor buyout fee starting at Ten Thousand Dollars ($10,000), which is non-refundable and assessed to offset Venue operational, staffing, and risk management costs. Outside vendors are permitted two (2) hours for load-in and two (2) hours for load-out. Any additional time required shall be subject to additional fees as determined by the Venue.',
      'Abandoned Property: Any items, equipment, materials, or property left in the building after load-out shall be deemed abandoned and shall become the property of 48 Wall Street, without liability to the Venue.',
      'Cleaning and Waste Removal: A mandatory cleaning fee of Three Thousand Five Hundred Dollars ($3,500) shall apply for any event requiring vendor evacuation or extraordinary cleaning measures. All vendors must remove all garbage, debris, and materials from the Venue immediately following the event. If any garbage or debris is left behind, the Client acknowledges and authorizes 48 Wall Street to charge the authorized credit card on file an additional cleaning and disposal fee of Two Thousand Five Hundred Dollars ($2,500).',
      'Client Acknowledgment and Authorization: The Client acknowledges and agrees to all fees and charges outlined herein and authorizes 48 Wall Street to charge the authorized credit card on file for all applicable buyout fees, overtime charges, cleaning fees, and related costs, all of which are non-waivable and non-contestable.',
    ],
    requiresInitials: true,
  },
  {
    id: 'insurance',
    title: 'Insurance & Certificates of Insurance (COI)',
    content: [
      "All Clients, vendors, performers, contractors, and outside caterers must maintain insurance meeting the Venue's minimum requirements. A compliant COI must be provided no later than three (3) weeks prior to the event and emailed to info@48wallnyc.com.",
      'Failure to provide a compliant COI may result in denial of access to the building and premises. No entity may enter or perform services at the Venue unless all insurance requirements have been satisfied, without exception. A sample COI may be provided upon request for reference only.',
    ],
    requiresInitials: true,
  },
  {
    id: 'limitation-liability',
    title:
      'Limitation of Liability, Relocation, and Force Majeure (New York Law)',
    content: [
      "Limitation of Venue Liability: To the fullest extent permitted under New York law, the Venue's liability to the Client and any third parties arising out of or related to the Event, whether in contract, tort (including negligence), strict liability, or otherwise, shall be expressly limited and waived as set forth below. New York courts routinely enforce clear liability-limitation provisions agreed to by sophisticated commercial parties as a means of allocating economic risk.",
      'a. Exclusion of Certain Damages: The Venue shall not be liable for indirect, incidental, special, punitive, or consequential damages, including but not limited to loss of profits, loss of business opportunity, or loss of reputation.',
      "b. Cap on Recoverable Damages: Except for liability arising from Venue's willful misconduct or gross negligence, the Venue's total aggregate liability under this Agreement shall not exceed the total amount of fees actually paid to the Venue under this Agreement. Under New York law, limitations on liability may be enforced so long as they are conscionable, clearly stated, and not unconscionable at the time of contracting.",
      "c. Exceptions: Notwithstanding the foregoing, nothing in this clause shall limit liability for claims that cannot be contractually waived under New York law, including claims based on the Venue's willful misconduct or gross negligence as defined by New York courts.",
      'Venue Utility and Service Disruptions: The Venue shall use commercially reasonable efforts to provide required utilities and services. However, the Venue shall not be in breach of this Agreement for interruptions or failures of utilities or services resulting from causes beyond its reasonable control, including but not limited to public protests, governmental orders or shutdowns, mass transit service failures, street closures, construction, labor disputes, acts of God, or similar events. Unless otherwise agreed in writing by the Venue, such disruptions shall not entitle the Client to a refund, fee reduction, or credit.',
      "Right to Relocate Event: The Venue reserves the right, in its sole and reasonable discretion, to relocate the Event to a comparable partner venue location if the originally contracted venue becomes unavailable or unsuitable due to force majeure events, safety concerns, governmental action, or other circumstances beyond the Venue's reasonable control.",
      'No Refund or Discount Upon Relocation: The Client acknowledges and agrees that relocation of the Event shall not entitle the Client to any refund, reduction, or discount in the contracted venue fees or other amounts due under this Agreement. All fees and payments shall remain due in full.',
      'Relocation Costs: The Client further acknowledges that additional costs related to relocation, including but not limited to transportation, labor, and operational expenses, may be incurred. The Client agrees to be responsible for such reasonable costs, provided the Venue gives the Client written notice of such costs in advance.',
      'Force Majeure: For purposes of this Agreement, "Force Majeure" shall mean an event or occurrence beyond the reasonable control of a party that prevents or delays performance and includes, without limitation, natural disasters, acts of government, strikes, riots, epidemics, governmental shutdowns, and similar extraordinary events. New York courts interpret force majeure clauses narrowly and generally require the event to be beyond the reasonable control and fault of the party seeking relief, and to fall within the scope of the clause as written.',
      'a. Effect of Force Majeure: If performance is prevented by a Force Majeure event, the obligated party shall be excused from performance to the extent and for the duration of the Force Majeure event, provided that such party promptly notifies the other party and uses commercially reasonable efforts to mitigate the effects of such event.',
      "b. Relocation Under Force Majeure: A Force Majeure event may trigger the Venue's right to relocate the Event as described above.",
    ],
    requiresInitials: true,
  },
  {
    id: 'getting-here',
    title: 'Getting Here',
    content: [
      "48 Wall Street is centrally located in Manhattan's Financial District and is easily accessible by public transportation, nearby parking facilities, and ride-share services.",
      'Subway Access: The Venue is within walking distance of several subway lines, including: 2 and 3 trains to Wall Street Station | 4 and 5 trains to Wall Street Station | J and Z trains to Broad Street Station | 1 train to Rector Street Station',
      'ADA-Accessible Subway Stations: The following nearby subway stations offer ADA-accessible entrances and elevators (subject to MTA service availability): Fulton Street Station (multiple lines including 2, 3, 4, 5, A, C, J, Z) | Bowling Green Station (4 and 5 trains). Guests are encouraged to check the MTA website or app for real-time elevator status and accessibility updates prior to travel.',
      'Bus Service: Several MTA bus routes serve the Financial District and provide accessible service with wheelchair-accessible buses.',
      'Parking: Multiple public parking garages are located within walking distance of 48 Wall Street, some of which offer ADA-accessible parking spaces. Parking availability, rates, and accessibility features vary by garage and are not guaranteed. The Venue does not own, operate, or manage parking facilities.',
      'RideShare & Drop-Off: Ride-share services and private vehicle drop-offs are permitted on nearby streets, subject to local traffic regulations. Guests requiring accessible drop-off accommodations are encouraged to plan accordingly.',
    ],
    requiresInitials: false,
  },
];

export const documentTitle =
  '48 Wall Street: Event & Show Client Guidelines & Authorization Agreement';
export const documentIntro =
  'Please review the following guidelines carefully. These policies are designed to ensure a seamless event experience while preserving this historic property. For questions or assistance, please contact our event team at 212.971.5353.';
