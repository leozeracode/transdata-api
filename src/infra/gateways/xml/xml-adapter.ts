import { XmlParser } from '@/service/protocols'
import { Injectable } from '@nestjs/common'
import { parseStringPromise } from 'xml2js'

@Injectable()
export class XmlAdapter implements XmlParser {
  async parse (xml: string): Promise<any> {
    return parseStringPromise(xml)
  }
}