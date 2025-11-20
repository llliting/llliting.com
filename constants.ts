
export interface NavItem {
  label: string;
  path: string;
  description: string;
}

export const NAV_ITEMS: NavItem[] = [
  { 
    label: 'Trades', 
    path: '/trades', 
    description: 'Exploring financial markets, algorithmic strategies, and economic analysis.' 
  },
  { 
    label: 'Qubiee', 
    path: '/qubiee', 
    description: 'A project dedicated to quantum computing simulations and educational resources.' 
  },
  { 
    label: 'Wealth Rod', 
    path: '/wealth-rod', 
    description: 'An Alternative Lens: Evaluating Value Beyond the State Standard' 
  },
  { 
    label: 'Life', 
    path: '/life', 
    description: 'Personal logs, photography, and adventures beyond the screen.' 
  },
  { 
    label: 'Thoughts', 
    path: '/thoughts', 
    description: 'Essays on technology, philosophy, and the future of digital interaction.' 
  },
];
