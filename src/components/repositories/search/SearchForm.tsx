import {
  type JSX,
  type FormEvent,

  useState
} from 'react'

import { Button, Input } from '../../../@styleguide'

import './SearchForm.css'

interface SearchFormProps {
  isLoading: boolean
  onSubmit: (query: string) => Promise<void>
}

/**
 * SearchForm component.
 *
 * This functional component renders a search form used to search GitHub repositories.
 * It includes an input field for user queries and a submit button.
 *
 * Props:
 * - `isLoading` (boolean): Indicates whether a search operation is in progress.
 * - `onSubmit` (function): Callback function invoked when the form is submitted successfully. It receives the current search query as an argument.
 *
 * Internal State:
 * - `currentValue` (string): Maintains the current value of the search input field.
 *
 * Rendered Elements:
 * - A form element with a header, input field, and a submit button.
 *
 * Behavior:
 * - Prevents form submission if the search query is empty.
 * - Disables the submit button if the search query is empty or a search operation is loading.
 * - Executes the `onSubmit` prop with the current query upon valid form submission.
 */
const SearchForm = ({ isLoading, onSubmit }: SearchFormProps): JSX.Element => {
  const [currentValue, setCurrentValue] = useState('')
  const [isCompact, setIsCompact] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (currentValue) {
      setIsCompact(true)
      await onSubmit(currentValue)
    }
  }

  const handleChange = async (value: string) => {
    if (value.trim() || !value) {
      setCurrentValue(value.replace(/\s+/g, '-'))
    }
  }

  return (
    <form className={`SearchForm ${isCompact ? 'SearchForm--compact' : ''}`} onSubmit={handleSubmit}>
      <h1>Search GitHub repositories</h1>
      <div className='SearchForm__input'>
        <Input
          name='query'
          type='search'
          placeholder='Repository name'
          value={currentValue}
          onChange={handleChange}
          aria-label='Search repositories'
          autoComplete='off'
          required
          autoFocus
        />

        <Button type='submit' disabled={!currentValue || isLoading}>
          Search
        </Button>
      </div>
    </form>
  )
}

export default SearchForm
