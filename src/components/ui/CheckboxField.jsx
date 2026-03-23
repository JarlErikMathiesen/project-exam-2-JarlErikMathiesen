import styled from 'styled-components';

export default function CheckboxField({
  label,
  checked,
  onChange,
  name,
  id,
  icon,
}) {
  return (
    <Wrapper>
      {icon && <IconWrapper>{icon}</IconWrapper>}

      <StyledCheckbox
        type="checkbox"
        id={id || name}
        name={name}
        checked={checked}
        onChange={onChange}
      />

      <Label htmlFor={id || name}>{label}</Label>
    </Wrapper>
  );
}

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
