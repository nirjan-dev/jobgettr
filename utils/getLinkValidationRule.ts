import { FormItemRule } from 'naive-ui';

export function getLinkValidationRule(): FormItemRule {
  function linkValidator(_rule: FormItemRule, value: string) {
    let isValid = false;

    try {
      const url = new URL(value);
      if (url) isValid = true;
    } catch (error) {}

    return isValid;
  }

  return {
    required: true,
    validator: linkValidator,
    message: 'Please enter a valid link that starts with https://',
    trigger: ['input', 'blur'],
  };
}
