import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { GlobalFilterPanel } from './GlobalFilterPanel';
import type { BIFilterConfig } from '../../../types/bi.types';

describe('GlobalFilterPanel', () => {
  const mockConfig: BIFilterConfig[] = [
    { id: 'Department', label: 'Phòng ban', type: 'select', defaultValue: 'Tất cả' },
  ];

  const mockData = [
    { Department: 'HR' },
    { Department: 'Tài chính' },
    { Department: 'HR' },
  ];

  it('renders correctly with dynamic options', () => {
    render(<GlobalFilterPanel config={mockConfig} sourceData={mockData} values={{ Department: 'Tất cả' }} />);
    
    // Check label
    expect(screen.getByText('Phòng ban')).toBeInTheDocument();
    
    // Check options (Tất cả, HR, Tài chính)
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
    
    const options = Array.from(select.querySelectorAll('option'));
    expect(options).toHaveLength(3);
    
    const optionTexts = options.map(o => o.textContent);
    expect(optionTexts).toContain('Tất cả');
    expect(optionTexts).toContain('HR');
    expect(optionTexts).toContain('Tài chính');
  });

  it('calls onChange when selection changes', () => {
    const handleChange = vi.fn();
    render(
      <GlobalFilterPanel 
        config={mockConfig} 
        sourceData={mockData} 
        values={{ Department: 'Tất cả' }} 
        onChange={handleChange} 
      />
    );
    
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'HR' } });
    
    expect(handleChange).toHaveBeenCalledWith('Department', 'HR');
  });

  it('calls onReset when reset button is clicked', () => {
    const handleReset = vi.fn();
    render(
      <GlobalFilterPanel 
        config={mockConfig} 
        sourceData={mockData} 
        values={{ Department: 'HR' }} 
        onReset={handleReset} 
      />
    );
    
    const resetBtn = screen.getByText('↺ Đặt lại');
    fireEvent.click(resetBtn);
    
    expect(handleReset).toHaveBeenCalledTimes(1);
  });
});
