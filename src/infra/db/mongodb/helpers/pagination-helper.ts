import { Model } from 'mongoose'

interface BaseQuery {
  pageSize?: number
  pageNumber?: number
  orderBy?: string
  orderDirection?: 'asc' | 'desc'
  paged?: boolean
}

interface PaginatedResult<T> {
  pageSize: number
  totalItems: number
  totalPages: number
  pageNumber: number
  items: T[]
}

export class PaginationHelper {
  static async Paginated<T>(
    document: Model<T>,
    filter: any,
    input: BaseQuery
  ): Promise<PaginatedResult<T>> {
    const {
      pageSize = 10,
      pageNumber = 1,
      orderBy = '_id',
      orderDirection = 'asc',
      paged = true
    } = input

    const totalItems = await document.countDocuments(filter)
    const totalPages = Math.ceil(totalItems / Number(pageSize))

    const query = document
      .find(filter)
      .sort({ [orderBy]: orderDirection === 'asc' ? 1 : -1 })
      .skip(paged ? (Number(pageNumber) - 1) * Number(pageSize) : 0)
      .limit(paged ? Number(pageSize) : 0)

    const items = await query.exec()

    return {
      pageSize,
      totalItems,
      totalPages,
      pageNumber: Number(pageNumber),
      items: items.map((item) => item.toObject())
    }
  }
}
