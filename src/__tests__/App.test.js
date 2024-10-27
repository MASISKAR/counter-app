import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import App from '../App';
import { getInitialCount } from '../api/mockApi';
import { getUniqueId } from '../utils';

jest.mock('../api/mockApi');
jest.mock('../utils', () => ({
  getRandomNumber: jest.fn(),
  getUniqueId: jest.fn(),
}));

describe('App Component - Stage D', () => {
  beforeEach(() => {
    getInitialCount.mockResolvedValue(10);
    getUniqueId
    .mockReturnValueOnce('counter-1')
    .mockReturnValueOnce('counter-2');
  });
  
  it('renders a single counter initially', async () => {
    render(<App />);
    expect(await screen.findByText('10')).toBeInTheDocument();
  });
  
  
  it('adds a new counter and maintains separate count states for each counter', async () => {
    render(<App />);
    
    const initialCounter = await screen.findByText('10');
    expect(initialCounter).toBeInTheDocument();
    
    const addButton = screen.getByText(/add counter/i);
    fireEvent.click(addButton);
    
    await waitFor(async () => {
      const counters = await screen.findAllByText('10');
      expect(counters).toHaveLength(2);
    });

    const [firstCounterIncrement, secondCounterIncrement] = screen.getAllByText(/increment \+/i);
    const [firstCounterDecrement, secondCounterDecrement] = screen.getAllByText(/decrement -/i);
    
    fireEvent.click(firstCounterIncrement);
    expect(screen.getAllByText('11')[0]).toBeInTheDocument();
    expect(screen.getAllByText('10')[0]).toBeInTheDocument();
    
    fireEvent.click(firstCounterDecrement);
    expect(screen.getAllByText('10')[0]).toBeInTheDocument();
    expect(screen.getAllByText('10')[1]).toBeInTheDocument();
    
    fireEvent.click(secondCounterIncrement);
    expect(screen.getAllByText('10')[0]).toBeInTheDocument();
    expect(screen.getAllByText('11')[0]).toBeInTheDocument();
    
    fireEvent.click(secondCounterDecrement);
    expect(screen.getAllByText('10')[0]).toBeInTheDocument();
    expect(screen.getAllByText('10')[1]).toBeInTheDocument();
  });
});
