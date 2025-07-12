import {type JSX} from 'react'
import Input from '../../../@styleguide/components/Input/Input.tsx'
import FormStatus from '../../../common/components/FormStatus.tsx'

interface SearchFormProps {
  action: (formData: FormData) => void,
  currentValue?: string,
  onChange?: ((value: string) => void),
}

const SearchForm = ({ action, currentValue, onChange }: SearchFormProps): JSX.Element => {
  return (
    <div className='SearchRepositories__input'>
      <form action={action}>
        <div>
          <Input
            name='query'
            type='search'
            placeholder='Search repositories (press Enter)'
            value={currentValue}
            onChange={onChange}
            aria-label='Search repositories'
            autoComplete='off'
            required
          />

          <button type='submit'>
            Search
          </button>
        </div>
        {/* hidden button for accessibility */}
        <FormStatus />
      </form>
    </div>
  );
};

export default SearchForm
