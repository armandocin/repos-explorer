import './LanguageDot.css'

const LanguageDot = ({ language }: { language: string }) => {
  return (
    <span className='LanguageDot' data-language={language}></span>
  )
}

export default LanguageDot