import type { IconName } from '@components/Icon/Icon'

export interface FooterLink {
  label: string
  href?: string
}

export interface FooterColumn {
  title: string
  links: FooterLink[]
}

export interface DeviceContent {
  icon: IconName
  title: string
  description: string
}

export interface FaqItemContent {
  id: string
  question: string
  answer: string
}

export interface PricingPlan {
  id: string
  name: string
  description: string
  monthlyPrice: number
}

export const CATEGORIES: readonly string[] = ['Action', 'Adventure', 'Comedy', 'Drama', 'Horror']

const DEVICE_DESCRIPTION =
  'StreamVibe is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store'

export const DEVICES: readonly DeviceContent[] = [
  { icon: 'smartphone', title: 'Smartphones', description: DEVICE_DESCRIPTION },
  { icon: 'tablet', title: 'Tablet', description: DEVICE_DESCRIPTION },
  { icon: 'smart-tv', title: 'Smart TV', description: DEVICE_DESCRIPTION },
  { icon: 'laptop', title: 'Laptops', description: DEVICE_DESCRIPTION },
  { icon: 'gaming-console', title: 'Gaming Consoles', description: DEVICE_DESCRIPTION },
  { icon: 'vr-headset', title: 'VR Headsets', description: DEVICE_DESCRIPTION },
]

export const FAQ_ITEMS: readonly FaqItemContent[] = [
  {
    id: '01',
    question: 'What is StreamVibe?',
    answer:
      'StreamVibe is a streaming service that allows you to watch movies and shows on demand.',
  },
  {
    id: '02',
    question: 'How much does StreamVibe cost?',
    answer:
      'StreamVibe offers Basic, Standard, and Premium plans — see the pricing section below for exact rates.',
  },
  {
    id: '03',
    question: 'What content is available on StreamVibe?',
    answer:
      'StreamVibe offers a wide range of movies, TV shows, and documentaries across every genre.',
  },
  {
    id: '04',
    question: 'How can I watch StreamVibe?',
    answer:
      'You can watch StreamVibe on the web or via our apps for smartphones, tablets, smart TVs, and more.',
  },
  {
    id: '05',
    question: 'How do I sign up for StreamVibe?',
    answer:
      'Choose a plan from the pricing section and follow the checkout steps to create your account.',
  },
  {
    id: '06',
    question: 'What is the StreamVibe free trial?',
    answer:
      'New members can try StreamVibe free for a limited time before their paid subscription begins.',
  },
  {
    id: '07',
    question: 'How do I contact StreamVibe customer support?',
    answer: 'Reach our support team any time from the Support link in the navigation above.',
  },
  {
    id: '08',
    question: 'What are the StreamVibe payment methods?',
    answer: 'StreamVibe accepts major credit/debit cards and popular digital wallets.',
  },
]

export const PRICING_PLANS: readonly PricingPlan[] = [
  {
    id: 'basic',
    name: 'Basic Plan',
    description:
      'Enjoy an extensive library of movies and shows, featuring a range of content, including recently released titles.',
    monthlyPrice: 9.99,
  },
  {
    id: 'standard',
    name: 'Standard Plan',
    description:
      'Access to a wider selection of movies and shows, including most new releases and exclusive content',
    monthlyPrice: 12.99,
  },
  {
    id: 'premium',
    name: 'Premium Plan',
    description:
      'Access to a widest selection of movies and shows, including all new releases and Offline Viewing',
    monthlyPrice: 14.99,
  },
]

export const FOOTER_COLUMNS: readonly FooterColumn[] = [
  {
    title: 'Home',
    links: [
      { label: 'Categories', href: '#categories' },
      { label: 'Devices', href: '#devices' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'FAQ', href: '#faq' },
    ],
  },
  {
    title: 'Movies',
    links: [
      { label: 'Genres' },
      { label: 'Trending' },
      { label: 'New Release' },
      { label: 'Popular' },
    ],
  },
  {
    title: 'Shows',
    links: [
      { label: 'Genres' },
      { label: 'Trending' },
      { label: 'New Release' },
      { label: 'Popular' },
    ],
  },
  {
    title: 'Support',
    links: [{ label: 'Contact Us' }],
  },
  {
    title: 'Subscription',
    links: [{ label: 'Plans' }, { label: 'Features' }],
  },
]

export interface SocialLink {
  icon: IconName
  label: string
}

export const SOCIAL_LINKS: readonly SocialLink[] = [
  { icon: 'facebook', label: 'Facebook' },
  { icon: 'twitter', label: 'Twitter' },
  { icon: 'linkedin', label: 'LinkedIn' },
]

export const LEGAL_LINKS: readonly FooterLink[] = [
  { label: 'Terms of Use' },
  { label: 'Privacy Policy' },
  { label: 'Cookie Policy' },
]
