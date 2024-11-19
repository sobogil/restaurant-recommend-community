import styled from 'styled-components';

// Color palette
export const colors = {
  primary: '#6366f1',
  secondary: '#4f46e5',
  success: '#22c55e',
  danger: '#ef4444',
  warning: '#f59e0b',
  info: '#3b82f6',
  light: '#f3f4f6',
  dark: '#1f2937',
  white: '#ffffff',
  gray: '#6b7280',
};

// Common styled components
export const Card = styled.div`
  background: ${colors.white};
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  padding: 1.5rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  }
`;

export const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${props => props.variant === 'primary' ? colors.primary : 
    props.variant === 'danger' ? colors.danger : colors.light};
  color: ${props => props.variant === 'light' ? colors.dark : colors.white};

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid ${colors.gray}30;
  border-radius: 8px;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${colors.primary};
    box-shadow: 0 0 0 3px ${colors.primary}20;
  }
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

export const Title = styled.h1`
  font-size: 2rem;
  color: ${colors.dark};
  margin-bottom: 2rem;
  font-weight: 700;
`;

export const Subtitle = styled.h2`
  font-size: 1.5rem;
  color: ${colors.dark};
  margin-bottom: 1.5rem;
  font-weight: 600;
`; 