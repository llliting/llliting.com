
export interface NavItem {
  label: string;
  path: string;
  description: string;
  subItems?: NavItem[];
}

export const NAV_ITEMS: NavItem[] = [
  {
    label: 'Projects',
    path: '/projects',
    description: 'Showcase of technical implementations and product designs.',
    subItems: [
      {
        label: 'Qubiee',
        path: '/projects/qubiee',
        description: 'Quant Prep, Reimagined. An all-in-one study application.'
      },
      {
        label: 'Wealth Rod',
        path: '/projects/wealth-rod',
        description: 'An Alternative Lens: Evaluating Value Beyond the State Standard'
      }
    ]
  },
  {
    label: 'Trades',
    path: '/trades',
    description: 'Exploring financial markets, algorithmic strategies, and economic analysis.'
  },

  {
    label: 'Thoughts',
    path: '/thoughts',
    description: 'Essays on technology, philosophy, and the future of digital interaction.'
  },
];
