import React from 'react'
import './SkeletonLoader.css'

export interface SkeletonLoaderProps {
  /** Width of the skeleton. Can be number (px) or string (%, rem, etc) */
  width?: number | string
  /** Height of the skeleton. Can be number (px) or string (%, rem, etc) */
  height?: number | string
  /** Shape variant of the skeleton */
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded'
  /** Animation type */
  animation?: 'shimmer' | 'pulse' | 'none'
  /** Additional CSS classes */
  className?: string
  /** Inline styles */
  style?: React.CSSProperties
  /** Number of lines for text variant */
  lines?: number
  /** Gap between lines for multi-line text */
  lineGap?: number
  /** Last line width percentage for multi-line text (0-100) */
  lastLineWidth?: number
  /** Accessibility label */
  ariaLabel?: string
}

/**
 * SkeletonLoader is a reusable loading placeholder component that displays
 * animated shapes while content is being fetched.
 *
 * @example
 * // Basic usage
 * <SkeletonLoader width={200} height={20} />
 *
 * // Circle avatar
 * <SkeletonLoader variant="circular" width={48} height={48} />
 *
 * // Multi-line text
 * <SkeletonLoader variant="text" lines={3} />
 *
 * // Custom styling
 * <SkeletonLoader width="100%" height={100} variant="rounded" />
 */
const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  width = '100%',
  height = 20,
  variant = 'rectangular',
  animation = 'shimmer',
  className = '',
  style = {},
  lines = 1,
  lineGap = 8,
  lastLineWidth = 60,
  ariaLabel = 'Loading content'
}) => {
  // Convert number values to px strings
  const getSize = (value: number | string): string => {
    return typeof value === 'number' ? `${value}px` : value
  }

  // Build class names
  const classNames = [
    'SkeletonLoader',
    `SkeletonLoader--${variant}`,
    `SkeletonLoader--${animation}`,
    className
  ].filter(Boolean).join(' ')

  // Render single skeleton
  const renderSkeleton = (key?: number, customWidth?: string) => (
    <div
      key={key}
      className={classNames}
      style={{
        width: customWidth || getSize(width),
        height: getSize(height),
        ...style
      }}
      aria-label={ariaLabel}
      aria-busy='true'
      role='status'
    />
  )

  // Handle multi-line text variant
  if (variant === 'text' && lines > 1) {
    return (
      <div className='SkeletonLoader__text-container' style={{ gap: `${lineGap}px` }}>
        {Array.from({ length: lines }).map((_, index) => {
          const isLastLine = index === lines - 1
          const lineWidth = isLastLine ? `${lastLineWidth}%` : getSize(width)
          return renderSkeleton(index, lineWidth)
        })}
      </div>
    )
  }

  // Render single skeleton
  return renderSkeleton()
}

export default SkeletonLoader
