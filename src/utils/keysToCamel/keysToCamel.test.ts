import { describe, it, expect } from 'vitest'
import keysToCamel, { toCamel } from './keysToCamel'

describe('toCamel', () => {
  it('should convert snake_case to camelCase', () => {
    expect(toCamel('snake_case')).toBe('snakeCase')
    expect(toCamel('long_snake_case_string')).toBe('longSnakeCaseString')
  })

  it('should convert kebab-case to camelCase', () => {
    expect(toCamel('kebab-case')).toBe('kebabCase')
    expect(toCamel('long-kebab-case-string')).toBe('longKebabCaseString')
  })

  it('should handle mixed case', () => {
    expect(toCamel('Mixed_Snake_Case')).toBe('MixedSnakeCase')
    expect(toCamel('Mixed-Kebab-Case')).toBe('MixedKebabCase')
  })

  it('should handle already camelCase strings', () => {
    expect(toCamel('alreadyCamelCase')).toBe('alreadyCamelCase')
    expect(toCamel('camelCase')).toBe('camelCase')
  })

  it('should handle single words', () => {
    expect(toCamel('word')).toBe('word')
    expect(toCamel('WORD')).toBe('WORD')
  })

  it('should handle empty strings', () => {
    expect(toCamel('')).toBe('')
  })

  it('should handle strings with numbers', () => {
    expect(toCamel('field_1')).toBe('field1')
    expect(toCamel('field_1_name')).toBe('field1Name')
  })
})

describe('keysToCamel', () => {
  describe('primitives', () => {
    it('should return primitives unchanged', () => {
      expect(keysToCamel('string')).toBe('string')
      expect(keysToCamel(123)).toBe(123)
      expect(keysToCamel(true)).toBe(true)
      expect(keysToCamel(false)).toBe(false)
      expect(keysToCamel(null)).toBe(null)
      expect(keysToCamel(undefined)).toBe(undefined)
    })
  })

  describe('objects', () => {
    it('should convert simple object keys', () => {
      const input = {
        first_name: 'John',
        last_name: 'Doe',
        'kebab-key': 'value'
      }

      const expected = {
        firstName: 'John',
        lastName: 'Doe',
        kebabKey: 'value'
      }

      expect(keysToCamel(input)).toEqual(expected)
    })

    it('should convert nested object keys', () => {
      const input = {
        user_info: {
          first_name: 'John',
          last_name: 'Doe',
          contact_details: {
            phone_number: '123456789',
            email_address: 'john@example.com'
          }
        }
      }

      const expected = {
        userInfo: {
          firstName: 'John',
          lastName: 'Doe',
          contactDetails: {
            phoneNumber: '123456789',
            emailAddress: 'john@example.com'
          }
        }
      }

      expect(keysToCamel(input)).toEqual(expected)
    })

    it('should handle empty objects', () => {
      expect(keysToCamel({})).toEqual({})
    })

    it('should handle objects with already camelCase keys', () => {
      const input = {
        firstName: 'John',
        lastName: 'Doe',
        phoneNumber: '123456789'
      }

      expect(keysToCamel(input)).toEqual(input)
    })
  })

  describe('arrays', () => {
    it('should convert array of objects', () => {
      const input = [
        { first_name: 'John', last_name: 'Doe' },
        { first_name: 'Jane', last_name: 'Smith' }
      ]

      const expected = [
        { firstName: 'John', lastName: 'Doe' },
        { firstName: 'Jane', lastName: 'Smith' }
      ]

      expect(keysToCamel(input)).toEqual(expected)
    })

    it('should handle array of primitives', () => {
      const input = ['string', 123, true, null]
      expect(keysToCamel(input)).toEqual(input)
    })

    it('should handle nested arrays', () => {
      const input = {
        user_list: [
          { user_id: 1, user_name: 'John' },
          { user_id: 2, user_name: 'Jane' }
        ]
      }

      const expected = {
        userList: [
          { userId: 1, userName: 'John' },
          { userId: 2, userName: 'Jane' }
        ]
      }

      expect(keysToCamel(input)).toEqual(expected)
    })

    it('should handle empty arrays', () => {
      expect(keysToCamel([])).toEqual([])
    })
  })

  describe('complex structures', () => {
    it('should handle mixed nested structures', () => {
      const input = {
        api_response: {
          status_code: 200,
          data_items: [
            {
              item_id: 1,
              item_details: {
                product_name: 'Product 1',
                price_info: {
                  base_price: 100,
                  discount_percentage: 10
                }
              }
            }
          ],
          meta_data: {
            total_count: 1,
            page_number: 1
          }
        }
      }

      const expected = {
        apiResponse: {
          statusCode: 200,
          dataItems: [
            {
              itemId: 1,
              itemDetails: {
                productName: 'Product 1',
                priceInfo: {
                  basePrice: 100,
                  discountPercentage: 10
                }
              }
            }
          ],
          metaData: {
            totalCount: 1,
            pageNumber: 1
          }
        }
      }

      expect(keysToCamel(input)).toEqual(expected)
    })
  })

  describe('edge cases', () => {
    it('should not convert function properties', () => {
      const func = () => 'test'
      expect(keysToCamel(func)).toBe(func)
    })

    it('should not convert Date objects', () => {
      const date = new Date('2024-01-01')
      expect(keysToCamel(date)).toBe(date)
    })

    it('should handle objects with null/undefined values', () => {
      const input = {
        field_one: null,
        field_two: undefined,
        field_three: 'value'
      }

      const expected = {
        fieldOne: null,
        fieldTwo: undefined,
        fieldThree: 'value'
      }

      expect(keysToCamel(input)).toEqual(expected)
    })

    it('should handle circular references gracefully', () => {
      const obj: any = { snake_key: 'value' }
      obj.circular_ref = obj

      expect(() => keysToCamel(obj)).toThrow(RangeError)
    })
  })
})
