import{formatCurrency} from '../../../scripts/utils/money.js'
describe('test suite: formatCurrency',()=>{
  it('convers cents into dollars ',()=>{
    expect(formatCurrency(2000.4)).toEqual('20.00');
    expect(formatCurrency(2000.5)).toEqual('20.01');
    expect(formatCurrency(2095)).toEqual('20.95');
  });
  
});