const Title = ({ text1, text2 }) => {
  return (
    <div className='flex flex-col items-start'>
      <span className='flex items-center gap-2 text-sm font-semibold text-brand-500'><span className='h-0.5 w-6 bg-brand-200' />{text1}</span>
      <span className='mt-2 text-2xl font-bold text-neutral-900 sm:text-3xl'>{text2}</span>
    </div>
  )
}

export default Title
