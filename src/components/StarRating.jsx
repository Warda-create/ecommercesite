export default function StarRating({ rating, size = 'md' }) {
  const full = Math.floor(rating)
  const half = rating % 1 >= 0.5

  const starSize =
    size === 'sm'
      ? 'text-xs'
      : size === 'lg'
      ? 'text-xl'
      : 'text-sm'

  return (
    <div className={`flex items-center ${starSize}`}>
      {[1, 2, 3, 4, 5].map(i => (
        <span
          key={i}
          className={
            i <= full
              ? 'text-orange-400'
              : i === full + 1 && half
              ? 'text-orange-300'
              : 'text-gray-300'
          }
        >
          ★
        </span>
      ))}
    </div>
  )
}