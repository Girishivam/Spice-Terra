import { useState, useCallback } from "react";

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string | RegExp;
  custom?: (value: string) => string | null;
}

interface FormErrors {
  [key: string]: string | null;
}

interface Touched {
  [key: string]: boolean;
}

interface UseFormValidationReturn {
  formData: Record<string, string>;
  errors: FormErrors;
  touched: Touched;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  validate: (name: string, value: string, rules: ValidationRule) => string | null;
  validateAll: (data: Record<string, string>, rules: Record<string, ValidationRule>) => FormErrors;
  clearErrors: () => void;
  resetForm: () => void;
  isValid: boolean;
}

const patternMap: Record<string, RegExp> = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^[\d\s\-\+\(\)]{10,}$/,
  url: /^https?:\/\/.+/,
};

export const useFormValidation = (
  initialData: Record<string, string>,
  rules?: Record<string, ValidationRule>
): UseFormValidationReturn => {
  const [formData, setFormData] = useState<Record<string, string>>(initialData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Touched>({});

  const validate = useCallback(
    (name: string, value: string, fieldRules: ValidationRule): string | null => {
      let error: string | null = null;

      if (fieldRules.required && !value.trim()) {
        error = "This field is required";
      } else if (fieldRules.minLength && value.length < fieldRules.minLength) {
        error = `Minimum ${fieldRules.minLength} characters required`;
      } else if (fieldRules.maxLength && value.length > fieldRules.maxLength) {
        error = `Maximum ${fieldRules.maxLength} characters allowed`;
      } else if (fieldRules.pattern) {
        const pattern = typeof fieldRules.pattern === "string"
          ? patternMap[fieldRules.pattern]
          : fieldRules.pattern;
        if (pattern && !pattern.test(value)) {
          if (fieldRules.pattern === "email") {
            error = "Invalid email address";
          } else if (fieldRules.pattern === "phone") {
            error = "Invalid phone number";
          } else {
            error = "Invalid format";
          }
        }
      } else if (fieldRules.custom) {
        error = fieldRules.custom(value);
      }

      setErrors((prev) => ({ ...prev, [name]: error }));
      return error;
    },
    []
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));

      // Validate on change if touched
      if (touched[name] && rules && rules[name]) {
        validate(name, value, rules[name]);
      }
    },
    [touched, rules, validate]
  );

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setTouched((prev) => ({ ...prev, [name]: true }));

      // Validate on blur
      if (rules && rules[name]) {
        validate(name, value, rules[name]);
      }
    },
    [rules, validate]
  );

  const validateAll = useCallback(
    (data: Record<string, string>, validationRules: Record<string, ValidationRule>) => {
      const newErrors: FormErrors = {};

      Object.entries(validationRules).forEach(([name, fieldRules]) => {
        newErrors[name] = validate(name, data[name] || "", fieldRules);
      });

      setErrors(newErrors);
      return newErrors;
    },
    [validate]
  );

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  const resetForm = useCallback(() => {
    setFormData(initialData);
    setErrors({});
    setTouched({});
  }, [initialData]);

  const isValid = Object.values(errors).every((error) => error === null);

  return {
    formData,
    errors,
    touched,
    handleChange,
    handleBlur,
    validate,
    validateAll,
    clearErrors,
    resetForm,
    isValid,
  };
};
