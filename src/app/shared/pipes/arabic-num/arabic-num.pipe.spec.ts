import { ArabicNumPipe } from './arabic-num.pipe';

describe('ArabicNumPipe', () => {
  it('create an instance', () => {
    const pipe = new ArabicNumPipe();
    expect(pipe).toBeTruthy();
  });
});
