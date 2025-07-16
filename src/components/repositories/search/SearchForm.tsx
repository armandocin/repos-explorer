import {type JSX, useState} from 'react'

import Input from '../../../@styleguide/components/Input/Input.tsx'
import Button from '../../../@styleguide/components/Button/Button.tsx'

import FormStatus from '../../common/components/FormStatus.tsx'

import './SearchForm.css'

interface SearchFormProps {
  action: (formData: FormData) => void
}

const SearchForm = ({ action }: SearchFormProps): JSX.Element => {
  // this is to override the default Form Actions behaviour where the form is reset after submit
  const [currentValue, setCurrentValue] = useState('')
  return (
    <div className='SearchForm'>
      <h1>Search GitHub repositories</h1>
      <form action={action}>
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

          <Button type='submit'>
            Search
          </Button>
        </div>
        <FormStatus />
      </form>
    </div>
  );
};

export default SearchForm
