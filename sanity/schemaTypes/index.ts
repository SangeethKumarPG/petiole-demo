import { type SchemaTypeDefinition } from 'sanity'
import { productType } from './productType'
import { categoryType } from './categoryType'
import { blockContent } from './blockContent'
import { orderType } from './orderType'
import { salesType } from './salesType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [productType, categoryType, blockContent, orderType, salesType],
}
