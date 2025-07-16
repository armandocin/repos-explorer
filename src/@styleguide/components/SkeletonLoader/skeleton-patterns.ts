import { type SkeletonLoaderProps } from './SkeletonLoader'

/**
 * Common skeleton patterns for consistent loading states across the app
 */

// Text patterns
export const textPatterns = {
  heading: {
    variant: 'text',
    height: 32,
    width: '70%',
  } as const satisfies SkeletonLoaderProps,

  subheading: {
    variant: 'text',
    height: 24,
    width: '60%',
  } as const satisfies SkeletonLoaderProps,

  paragraph: {
    variant: 'text',
    lines: 3,
    lineGap: 8,
    lastLineWidth: 60,
  } as const satisfies SkeletonLoaderProps,

  caption: {
    variant: 'text',
    height: 14,
    width: '40%',
  } as const satisfies SkeletonLoaderProps,
}

// Media patterns
export const mediaPatterns = {
  avatar: {
    variant: 'circular',
    width: 48,
    height: 48,
  } as const satisfies SkeletonLoaderProps,

  avatarSmall: {
    variant: 'circular',
    width: 32,
    height: 32,
  } as const satisfies SkeletonLoaderProps,

  avatarLarge: {
    variant: 'circular',
    width: 64,
    height: 64,
  } as const satisfies SkeletonLoaderProps,

  image: {
    variant: 'rounded',
    width: '100%',
    height: 200,
  } as const satisfies SkeletonLoaderProps,

  banner: {
    variant: 'rectangular',
    width: '100%',
    height: 300,
  } as const satisfies SkeletonLoaderProps,
}

// Interactive patterns
export const interactivePatterns = {
  button: {
    variant: 'rounded',
    height: 40,
    width: 100,
  } as const satisfies SkeletonLoaderProps,

  buttonLarge: {
    variant: 'rounded',
    height: 48,
    width: 120,
  } as const satisfies SkeletonLoaderProps,

  input: {
    variant: 'rounded',
    height: 40,
    width: '100%',
  } as const satisfies SkeletonLoaderProps,

  checkbox: {
    variant: 'rounded',
    width: 20,
    height: 20,
  } as const satisfies SkeletonLoaderProps,

  toggle: {
    variant: 'rounded',
    width: 48,
    height: 24,
  } as const satisfies SkeletonLoaderProps,
}
