/** Tiny class-name joiner: keeps conditional Tailwind lists readable. */
export const cx = (...classes) => classes.filter(Boolean).join(' ')

export default cx
