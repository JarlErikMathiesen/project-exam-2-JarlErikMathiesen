import React from 'react';
import styled from 'styled-components';

const CheckboxField = React.forwardRef(
  ({ label, name, id, icon, checked, onChange, ...props }, ref) => {
    const isControlled = checked !== undefined;

    return (
      <Wrapper>
        {icon && <IconWrapper>{icon}</IconWrapper>}

        <StyledCheckbox
          type="checkbox"
          id={id || name}
          name={name}
          ref={!isControlled ? ref : undefined}
          checked={isControlled ? checked : undefined}
          onChange={isControlled ? onChange : undefined}
          {...(!isControlled ? props : {})}
        />

        <Label htmlFor={id || name}>{label}</Label>
      </Wrapper>
    );
  },
);

export default CheckboxField;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const StyledCheckbox = styled.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: ${({ theme }) => theme.colors.primary};
  flex-shrink: 0;
`;

const Label = styled.label`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
`;
