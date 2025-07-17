import React from 'react'

import './Text.css'

interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  size?: 'large' | 'big' | 'medium' | 'intermediate' | 'regular' | 'small' | 'x-small' | '2x-small'
  singleLine?: boolean
}

/**
 * Functional component for rendering text content with various styling options.
 *
 * The `Text` component is designed to render text with configurable size, custom classes,
 * single-line truncation, and additional properties.
 *
 * @param {TextProps} props - Properties passed to the Text component.
 * @param {string} [props.size='regular'] - Specifies the size of the text. Default is 'regular'.
 * @param {string} [props.className] - Additional class names to be applied to the text element.
 * @param {React.ReactNode} props.children - The content to be displayed within the text element.
 * @param {boolean} [props.singleLine] - If true, the text is truncated to a single line with ellipsis.
 * @param {object} [rest] - Additional properties to be passed to the underlying HTML element.
 * @returns {React.ReactElement} Rendered text component.
 */
const Text: React.FC<TextProps> = ({
  size = 'regular',
  className,
  children,
  singleLine,
  ...rest
}: TextProps) => {
  const getClassName = () => { // could be replaced by classname lib
    const classes = []

    if (className) {
      classes.push(className)
    }

    classes.push(`Text--${size}`)

    if (singleLine) {
      classes.push('ellipsis')
    }

    return classes.join(' ')
  }

  return (
    <p
      className={getClassName()}
      {...rest}
    >
      {children}
    </p>

  )
}

export default Text
