export const OUR_PHONE_NUMBER = '+234 708 7821 561';
export const COLOR_STYLE = [
  'primary',
  'secondary',
  'success',
  'danger',
  'warning',
  'info',
  'light',
  'dark'
];

export const ONBOARDING_STEPS = {
  entertainerProfile: { title: 'Entertainer Profile' },
  bankAccount: { title: 'Bank Account Details' },
  contact: { title: 'Emergency Contact' },
  youTube: { title: 'Youtube Channel' },
  identification: { title: 'Valid Identification' }
};

export const STEPS_REQUIREMENT = {
  entertainerProfile: ['Profile Image', 'Entertainers Information'],
  bankAccount: [
    'Bank Account details',
    'Account Name must contain at least your stage name, first name or last name'
  ],
  contact: [
    'Your Next of Kin OR',
    'A Professional Contact (mentor, colleague etc)'
  ],
  youTube: [
    'Your Youtube Channel',
    'This must contain some of your previous performance'
  ],
  identification: [
    'Valid Identification',
    'International Passport or Drivers License or National ID Card'
  ]
};

export const USER_TYPES = {
  admin: 0,
  user: 1,
  entertainer: 2,
  bandMember: 3
};

export const HIRE_ENTERTAINERS_TYPE = {
  search: {
    title: 'Search',
    description:
      'Search for your favorite Entertainer and select them for your event',
    color: 'blue'
  },
  auction: {
    title: 'Auction',
    description:
      'Select the best Entertainer for your Event based on bids from Entertainers',
    color: 'red'
  },
  recommend: {
    title: 'Recommend',
    description: 'Lets suggest the best Entertainer for your event',
    color: 'green'
  }
};

export const ENTERTAINER_TYPE = {
  MC: 'MC',
  DJ: 'DJ',
  LiveBand: 'LIVE BAND'
};

export const DASHBOARD_PAGE = {
  [USER_TYPES.user]: 'user',
  [USER_TYPES.entertainer]: 'entertainer',
  [USER_TYPES.admin]: 'admin',
  [USER_TYPES.bandMember]: 'band-member'
};

export const SLIDESHOW_TYPE = {
  image: 'image',
  entertainers: 'entertainers',
  events: 'events',
  testimonials: 'testimonials'
};

export const HIRE_ENTERTAINERS = {
  search: 'Search',
  auction: 'Auction',
  recommend: 'Recommendation'
};

export const SELECT_ENTERTAINERS_TYPE = [
  {
    label: 'DJ',
    value: 'DJ'
  },
  {
    label: 'MC',
    value: 'MC'
  },
  {
    label: 'Live Bands',
    value: 'Liveband'
  }
];

export const EVENT_AGE_GROUP = [
  {
    label: 'All Ages',
    value: 'All Ages'
  },
  {
    label: 'Children (Below 12 years)',
    value: 'children'
  },
  {
    label: 'Teen (12 - 17 years)',
    value: 'teens'
  },
  {
    label: 'Adults (18 - 50 years)',
    value: 'adults'
  },
  {
    label: '51 years old or over',
    value: 'old-people'
  }
];

export const OCCASSION_TYPE = [
  {
    label: 'Aniversary',
    value: 'Aniversary'
  },
  {
    label: 'Ball',
    value: 'Ball'
  },
  {
    label: 'Birthday Party',
    value: 'Birthday Party'
  },
  {
    label: 'Corporate Event',
    value: 'Corporate Event'
  },
  {
    label: 'Celebration',
    value: 'Celebration'
  },
  {
    label: 'Engagement Party',
    value: 'Engagement Party'
  },
  {
    label: 'Entertainment',
    value: 'Entertainment'
  },
  {
    label: 'Family Get-Together',
    value: 'Family Get-Together'
  },
  {
    label: 'Formal Event',
    value: 'Formal Event'
  },
  {
    label: 'Graduation Party',
    value: 'Graduation Party'
  },
  {
    label: 'Naming Ceremony',
    value: 'Naming Ceremony'
  },
  {
    label: 'Party',
    value: 'party'
  },
  {
    label: 'Summer Party',
    value: 'Summer Party'
  },
  {
    label: 'Wedding',
    value: 'wedding'
  }
];
export const AUDIENCE_SIZE = [
  {
    label: 'Fewer than 20 guests',
    value: '0-20'
  },
  {
    label: 'Between 20 and 50 guests',
    value: '21-50'
  },
  {
    label: 'Between 51 and 100 guests',
    value: '51-100'
  },
  {
    label: 'Between 101 and 250 guests',
    value: '101-250'
  },
  {
    label: 'Between 251 and 1000 guests',
    value: '251-1000'
  },
  {
    label: 'Above 1000 guests',
    value: '1000+'
  }
];

export const GENRE = [
  { label: 'Any', value: 'Any' },
  { label: 'Local', value: 'Local' },
  { label: 'Foreign', value: 'Foreign' },
  { label: 'Pop', value: 'Pop' },
  { label: 'Hip-hop', value: 'Hip Hop' },
  { label: 'Rap', value: 'Rap' },
  { label: 'Variety', value: 'Variety' },
  { label: 'Country', value: 'Country' },
  { label: 'Golden Oldies', value: 'Golden Oldies' },
  { label: 'Rock', value: 'Rock' },
  { label: 'The Eighties', value: 'The Eighties' },
  { label: 'Funk or Disco', value: 'Funk' },
  { label: 'Indian', value: 'Indian' }
];

export const RATINGS = [
  { label: 'One Star and above', value: '1star+' },
  { label: 'Two Stars and above', value: '2stars+' },
  { label: 'Three Stars and above', value: '3stars+' },
  { label: 'Four Stars and above', value: '4stars+' },
  { label: 'Five Stars', value: '5stars' }
];

export const PLACE_OF_EVENTS = [
  { label: 'Village hall' },
  { label: 'Conference Centry' },
  { label: 'Concert Hall' },
  { label: 'Outdoors' },
  { label: 'Country' },
  { label: 'Office' },
  { label: 'School' },
  { label: 'In a House' },
  { label: 'Community Centry' },
  { label: 'Place of Worship' },
  { label: 'Barn' }
];

export const BUDGET = [
  { label: '50 thousand naira', value: '50K' },
  { label: '100 thousand naira', value: '100K' },
  { label: '200 thousand naira', value: '200K' },
  { label: '300 thousand naira', value: '300K' },
  { label: '400 thousand naira', value: '400K' },
  { label: '500 thousand naira', value: '500K' },
  { label: '600 thousand naira', value: '600K' },
  { label: '700 thousand naira', value: '700K' },
  { label: '800 thousand naira', value: '800K' },
  { label: '900 thousand naira', value: '900K' },
  { label: 'Over 1 million naira ', value: '1M+' }
];

export const LANGUAGE = [
  { label: 'Any', value: 'Any' },
  { label: 'English', value: 'English' },
  { label: 'Yoruba', value: 'Yoruba' },
  { label: 'Igbo', value: 'Igbo' },
  { label: 'Hausa', value: 'Hausa' }
];
