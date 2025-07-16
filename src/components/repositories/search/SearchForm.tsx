import {type JSX, useState} from 'react'

import {useFormStatus} from 'react-dom'

import Input from '../../../@styleguide/components/Input/Input.tsx'
import Button from '../../../@styleguide/components/Button/Button.tsx'

import './SearchForm.css'

/**
 * A functional component representing a search form for querying GitHub repositories.
 *
 * This form allows users to search GitHub repositories using a query string. The form provides
 * an input field for entering a search term and a button to submit the query. The search operation
 * is disabled when no input is provided or when a search request is already pending.
 *
 * IMPORTANT: must be used as child of a <form/>
 *
 * Returns:
 * A JSX element that renders the search form, consisting of a titled header, an input field for
 * query input, and a submit button.
 */
const SearchForm = (): JSX.Element => {
  // this is to override the default Form Actions behaviour where the form is reset after submit
  const [currentValue, setCurrentValue] = useState('')

  const { pending } = useFormStatus()

  return (
    <div className='SearchForm'>
      <h1>Search GitHub repositories</h1>
      <div className='SearchForm__input'>
        <Input
          name='query'
          type='search'
          placeholder='Search repositories (press Enter)'
          value={currentValue}
          onChange={(value) => setCurrentValue(value)}
          aria-label='Search repositories'
          autoComplete='off'
          required
          autoFocus
        />

        <Button type='submit' disabled={!currentValue || pending}>
          Search
        </Button>
      </div>
    </div>
  )
}

export default SearchForm
