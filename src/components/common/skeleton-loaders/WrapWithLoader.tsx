import React from 'react'
import SkeletonLoader, {
  type SkeletonLoaderProps
} from '../../../@styleguide/components/SkeletonLoader/SkeletonLoader.tsx'

interface WrapWithLoader extends SkeletonLoaderProps {
  children: React.ReactNode,
  isLoading: boolean
}

const WrapWithLoader = ({ children, isLoading, ...rest }: WrapWithLoader) => {
  return isLoading
    ? <SkeletonLoader {...rest} />
    // Handle falsy children (false, null, undefined)
    // Return null instead of undefined or any falsy not renderable value to avoid React render error
    : children || null
}

export default WrapWithLoader
