import { FilterCategoriesByLetterPipe } from './filter-categories-by-letter.pipe';

describe('FilterCategoriesByLetterPipe', () => {
  it('create an instance', () => {
    const pipe = new FilterCategoriesByLetterPipe();
    expect(pipe).toBeTruthy();
  });
});
