import { render, screen, fireEvent } from '@testing-library/react';
import Counter from '../components/Counter';
import { getInitialCount } from '../api/mockApi';
import { getRandomNumber } from '../utils';

jest.mock('../api/mockApi');
jest.mock('../utils', () => ({
  getRandomNumber: jest.fn(),
}));

describe('Counter Component - Stage A', () => {
  it('increments count by one on increment button click', () => {
    render(<Counter index={0} initialValue={5} />);
    const incrementButton = screen.getByText(/increment \+/i);
    fireEvent.click(incrementButton);
    expect(screen.getByText('6')).toBeInTheDocument();
  });
  
  it('decrements count by one on decrement button click', () => {
    render(<Counter index={0} initialValue={5} />);
    const decrementButton = screen.getByText(/decrement -/i);
    fireEvent.click(decrementButton);
    expect(screen.getByText('4')).toBeInTheDocument();
  });
});


describe('Counter Component - Stage B', () => {
  beforeEach(() => {
    getInitialCount.mockResolvedValue(10);
  });
  
  it('fetches and displays initial value from API', async () => {
    render(<Counter index={0} initialValue={null} />);
    expect(await screen.findByText('10')).toBeInTheDocument();
  });
});

describe('Counter Component - Stage C', () => {
  beforeEach(() => {
    getRandomNumber.mockReturnValue(7);
  });
  
  it('replaces count with a random number on randomize button click', () => {
    render(<Counter index={0} initialValue={5} />);
    const randomizeButton = screen.getByText(/randomize/i);
    fireEvent.click(randomizeButton);
    expect(screen.getByText('7')).toBeInTheDocument();
  });
});
