// xml-adapter.spec.ts

import { parseStringPromise } from 'xml2js';
import { XmlAdapter } from './xml-adapter';

jest.mock('xml2js', () => ({
  parseStringPromise: jest.fn()
}));

describe('XmlAdapter', () => {
  let sut: XmlAdapter;

  beforeEach(() => {
    sut = new XmlAdapter();
  });

  it('should call parseStringPromise with correct params', async () => {
    const xml = '<root><test>value</test></root>';
    const mockResponse = { root: { test: 'value' } };
    
    (parseStringPromise as jest.Mock).mockResolvedValueOnce(mockResponse);

    const result = await sut.parse(xml);

    expect(parseStringPromise).toHaveBeenCalledWith(xml);

    expect(result).toEqual(mockResponse);
  });

  it('should throw if parseStringPromise throws', async () => {
    const xml = '<invalid><test></test>';
    const errorMessage = 'Invalid XML';

    (parseStringPromise as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    await expect(sut.parse(xml)).rejects.toThrow(errorMessage);
  });
});
