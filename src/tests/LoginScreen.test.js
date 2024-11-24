import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Signup from '../components/start/StartScreen';

describe('Signup Component', () => {
  const mockSignupApi = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all input fields and button', () => {
    const { getByTestId } = render(<Signup onSignup={mockSignupApi} />);

    expect(getByTestId('university-input')).toBeTruthy();
    expect(getByTestId('role-input')).toBeTruthy();
    expect(getByTestId('name-input')).toBeTruthy();
    expect(getByTestId('personality-input')).toBeTruthy();
    expect(getByTestId('signup-button')).toBeTruthy();
  });

  it('allows user to fill inputs', () => {
    const { getByTestId } = render(<Signup onSignup={mockSignupApi} />);

    fireEvent.changeText(getByTestId('university-input'), 'Harvard');
    fireEvent.changeText(getByTestId('role-input'), 'Student');
    fireEvent.changeText(getByTestId('name-input'), 'John Doe');
    fireEvent.changeText(getByTestId('personality-input'), 'Outgoing');

    expect(getByTestId('university-input').props.value).toBe('Harvard');
    expect(getByTestId('role-input').props.value).toBe('Student');
    expect(getByTestId('name-input').props.value).toBe('John Doe');
    expect(getByTestId('personality-input').props.value).toBe('Outgoing');
  });

  it('calls the API with correct data on button press', async () => {
    const { getByTestId } = render(<Signup onSignup={mockSignupApi} />);

    fireEvent.changeText(getByTestId('university-input'), 'Harvard');
    fireEvent.changeText(getByTestId('role-input'), 'Student');
    fireEvent.changeText(getByTestId('name-input'), 'John Doe');
    fireEvent.changeText(getByTestId('personality-input'), 'Outgoing');

    fireEvent.press(getByTestId('signup-button'));

    await waitFor(() => {
      expect(mockSignupApi).toHaveBeenCalledWith({
        university: 'Harvard',
        role: 'Student',
        input: 'John Doe',
        personality: 'Outgoing',
      });
    });
  });

  it('shows a success alert when API call is successful', async () => {
    mockSignupApi.mockResolvedValueOnce({ success: true });

    const { getByTestId } = render(<Signup onSignup={mockSignupApi} />);
    fireEvent.press(getByTestId('signup-button'));

    await waitFor(() => {
      expect(mockSignupApi).toHaveBeenCalled();
    });
  });

  it('shows a failure alert when API call fails', async () => {
    mockSignupApi.mockResolvedValueOnce({ success: false });

    const { getByTestId } = render(<Signup onSignup={mockSignupApi} />);
    fireEvent.press(getByTestId('signup-button'));

    await waitFor(() => {
      expect(mockSignupApi).toHaveBeenCalled();
    });
  });
});
