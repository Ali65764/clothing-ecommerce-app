import React from 'react'

/**
 * Line-icon set drawn to a single 24px grid so weights stay consistent.
 * Every icon inherits `currentColor`, so colour is controlled by text utilities.
 */
const Svg = ({ children, size = 20, className = '', strokeWidth = 1.75, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
    focusable="false"
    {...props}
  >
    {children}
  </svg>
)

export const SearchIcon = (p) => (
  <Svg {...p}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></Svg>
)

export const BagIcon = (p) => (
  <Svg {...p}><path d="M6 8h12l-1 12H7L6 8Z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></Svg>
)

export const UserIcon = (p) => (
  <Svg {...p}><circle cx="12" cy="8" r="3.5" /><path d="M5 20c0-3.5 3.1-5.5 7-5.5s7 2 7 5.5" /></Svg>
)

export const MenuIcon = (p) => (
  <Svg {...p}><path d="M3 6h18M3 12h18M3 18h12" /></Svg>
)

export const CloseIcon = (p) => (
  <Svg {...p}><path d="M6 6l12 12M18 6 6 18" /></Svg>
)

export const ChevronDown = (p) => (
  <Svg {...p}><path d="m5 9 7 7 7-7" /></Svg>
)

export const ChevronRight = (p) => (
  <Svg {...p}><path d="m9 5 7 7-7 7" /></Svg>
)

export const ChevronLeft = (p) => (
  <Svg {...p}><path d="m15 5-7 7 7 7" /></Svg>
)

export const ArrowRight = (p) => (
  <Svg {...p}><path d="M4 12h16" /><path d="m14 6 6 6-6 6" /></Svg>
)

export const ArrowLeft = (p) => (
  <Svg {...p}><path d="M20 12H4" /><path d="m10 6-6 6 6 6" /></Svg>
)

export const PlusIcon = (p) => (
  <Svg {...p}><path d="M12 5v14M5 12h14" /></Svg>
)

export const MinusIcon = (p) => (
  <Svg {...p}><path d="M5 12h14" /></Svg>
)

export const TrashIcon = (p) => (
  <Svg {...p}><path d="M4 7h16" /><path d="M10 11v6M14 11v6" /><path d="M6 7l1 13h10l1-13" /><path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" /></Svg>
)

export const CheckIcon = (p) => (
  <Svg {...p}><path d="m4 12 5 5L20 6" /></Svg>
)

export const StarIcon = ({ filled = false, ...p }) => (
  <Svg {...p} fill={filled ? 'currentColor' : 'none'}>
    <path d="m12 3.5 2.6 5.5 5.9.8-4.3 4.2 1 6-5.2-2.9-5.2 2.9 1-6L3.5 9.8l5.9-.8L12 3.5Z" />
  </Svg>
)

export const TruckIcon = (p) => (
  <Svg {...p}><path d="M3 7h11v9H3z" /><path d="M14 10h4l3 3v3h-7" /><circle cx="7" cy="18" r="1.6" /><circle cx="17" cy="18" r="1.6" /></Svg>
)

export const ShieldIcon = (p) => (
  <Svg {...p}><path d="M12 3.5 19 6v6c0 4.2-2.9 7.4-7 8.5-4.1-1.1-7-4.3-7-8.5V6l7-2.5Z" /><path d="m9 12 2 2 4-4" /></Svg>
)

export const RefreshIcon = (p) => (
  <Svg {...p}><path d="M4 12a8 8 0 0 1 13.7-5.6L20 8" /><path d="M20 4v4h-4" /><path d="M20 12a8 8 0 0 1-13.7 5.6L4 16" /><path d="M4 20v-4h4" /></Svg>
)

export const HeadsetIcon = (p) => (
  <Svg {...p}><path d="M4 14v-2a8 8 0 0 1 16 0v2" /><path d="M4 14h3v5H5.5A1.5 1.5 0 0 1 4 17.5V14Z" /><path d="M20 14h-3v5h1.5a1.5 1.5 0 0 0 1.5-1.5V14Z" /></Svg>
)

export const FilterIcon = (p) => (
  <Svg {...p}><path d="M4 6h16M7 12h10M10 18h4" /></Svg>
)

export const MailIcon = (p) => (
  <Svg {...p}><rect x="3" y="5.5" width="18" height="13" rx="1" /><path d="m3.5 7 8.5 6 8.5-6" /></Svg>
)

export const PhoneIcon = (p) => (
  <Svg {...p}><path d="M6 3.5h3l1.5 4-2 1.5a12 12 0 0 0 6.5 6.5l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4 5.7 2 2 0 0 1 6 3.5Z" /></Svg>
)

export const PinIcon = (p) => (
  <Svg {...p}><path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" /><circle cx="12" cy="10" r="2.5" /></Svg>
)

export const LockIcon = (p) => (
  <Svg {...p}><rect x="5" y="10.5" width="14" height="9.5" rx="1.5" /><path d="M8.5 10.5V7.8a3.5 3.5 0 0 1 7 0v2.7" /></Svg>
)

export const PackageIcon = (p) => (
  <Svg {...p}><path d="M12 3.5 20 8v8l-8 4.5L4 16V8l8-4.5Z" /><path d="M4 8l8 4.5L20 8" /><path d="M12 12.5V20.5" /></Svg>
)

export const InstagramIcon = (p) => (
  <Svg {...p}><rect x="4" y="4" width="16" height="16" rx="4.5" /><circle cx="12" cy="12" r="3.5" /><circle cx="16.6" cy="7.4" r="0.9" fill="currentColor" stroke="none" /></Svg>
)

export const TwitterIcon = (p) => (
  <Svg {...p}><path d="M4.5 4.5h3.6l4.2 5.7 4.9-5.7h2.3l-6 7 6.3 8.5h-3.6l-4.5-6-5.2 6H4.2l6.4-7.4L4.5 4.5Z" /></Svg>
)

export const FacebookIcon = (p) => (
  <Svg {...p}><path d="M14.5 8.5h2.2V5.4h-2.4c-2.3 0-3.7 1.4-3.7 3.8v1.6H8.4v3.1h2.2v6.7h3.3v-6.7h2.4l.4-3.1h-2.8V9.6c0-.8.3-1.1 1-1.1Z" /></Svg>
)

export const ArrowUpRight = (p) => (
  <Svg {...p}><path d="M7 17 17 7" /><path d="M8 7h9v9" /></Svg>
)

export const SparkIcon = (p) => (
  <Svg {...p}><path d="M12 3.5c.6 4.2 2.3 5.9 6.5 6.5-4.2.6-5.9 2.3-6.5 6.5-.6-4.2-2.3-5.9-6.5-6.5 4.2-.6 5.9-2.3 6.5-6.5Z" /><path d="M18.5 16.5c.3 2 1.1 2.8 3 3-1.9.3-2.7 1.1-3 3-.3-1.9-1.1-2.7-3-3 1.9-.2 2.7-1 3-3Z" /></Svg>
)

export const GridIcon = (p) => (
  <Svg {...p}><rect x="4" y="4" width="7" height="7" rx="2" /><rect x="13" y="4" width="7" height="7" rx="2" /><rect x="4" y="13" width="7" height="7" rx="2" /><rect x="13" y="13" width="7" height="7" rx="2" /></Svg>
)

export const ListIcon = (p) => (
  <Svg {...p}><path d="M4 7h16M4 12h16M4 17h10" /></Svg>
)

export const LogoutIcon = (p) => (
  <Svg {...p}><path d="M14 5.5V4a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1.5" /><path d="M10 12h10" /><path d="m17 8 4 4-4 4" /></Svg>
)

export const UploadIcon = (p) => (
  <Svg {...p}><path d="M12 16V4" /><path d="m7.5 8.5 4.5-4.5 4.5 4.5" /><path d="M4 16v2.5A1.5 1.5 0 0 0 5.5 20h13a1.5 1.5 0 0 0 1.5-1.5V16" /></Svg>
)

export const ImageIcon = (p) => (
  <Svg {...p}><rect x="3.5" y="4.5" width="17" height="15" rx="2.5" /><circle cx="9" cy="10" r="1.6" /><path d="m5 17 4.5-4.5 3 3 3-2.5L20 17" /></Svg>
)

export const AlertIcon = (p) => (
  <Svg {...p}><path d="M12 4.5 21 19.5H3L12 4.5Z" /><path d="M12 10v4" /><path d="M12 17h.01" /></Svg>
)

export const TrendIcon = (p) => (
  <Svg {...p}><path d="m4 16 5-5 3.5 3.5L20 7" /><path d="M15 7h5v5" /></Svg>
)

export const WalletIcon = (p) => (
  <Svg {...p}><rect x="3.5" y="6" width="17" height="12.5" rx="3" /><path d="M3.5 10h17" /><circle cx="16.5" cy="14" r="1.2" fill="currentColor" stroke="none" /></Svg>
)

export const EditIcon = (p) => (
  <Svg {...p}><path d="M4 20h4L19 9a2.1 2.1 0 0 0-3-3L5 17v3Z" /><path d="M14.5 6.5 17.5 9.5" /></Svg>
)

export default Svg
