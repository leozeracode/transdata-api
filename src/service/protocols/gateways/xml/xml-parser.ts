export interface XmlParser {
  parse: (xml: string) => Promise<any>
}