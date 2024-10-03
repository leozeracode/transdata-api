import { XmlParser } from '@/service/protocols'
import { parseStringPromise } from 'xml2js'

export class XmlAdapter implements XmlParser {
  async parse (xml: string): Promise<any> {
    return parseStringPromise(xml)
  }
}