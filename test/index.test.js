import calculate from '../src/calculate';
import chai from 'chai';

const expect = chai.expect;

describe('calculate test', () => {
    it('函数 add', () => {
        expect(calculate.add(1, 2))
            .equal(3);
    })
    it('函数minus', () => {
        expect(calculate.minus(2, 1)).equal(1);
    });
})
