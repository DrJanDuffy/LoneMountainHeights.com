# Form Components

A comprehensive form system built with React, TypeScript, and Tailwind CSS, designed specifically for real estate applications with accessibility, validation, and consistent styling.

## Components

### FormField

A flexible form field component that supports text, email, tel, number, textarea, and select inputs with built-in validation and accessibility features.

```tsx
import { FormField } from '@/components/forms';

<FormField
  id="email"
  name="email"
  label="Email Address"
  type="email"
  value={email}
  onChange={setEmail}
  error={errors.email}
  required
  autoComplete="email"
/>
```

**Props:**

- `id` (string, required): Unique identifier for the field
- `name` (string, required): Form field name
- `label` (string, required): Field label
- `type` (string, optional): Input type - 'text' | 'email' | 'tel' | 'number' | 'textarea' | 'select'
- `placeholder` (string, optional): Placeholder text
- `value` (string | number, optional): Field value
- `onChange` (function, optional): Change handler
- `onBlur` (function, optional): Blur handler
- `error` (string, optional): Error message
- `required` (boolean, optional): Whether field is required
- `disabled` (boolean, optional): Whether field is disabled
- `options` (array, optional): Options for select fields
- `rows` (number, optional): Number of rows for textarea
- `autoComplete` (string, optional): HTML autocomplete attribute

### FormContainer

A container component that provides consistent styling, error handling, and loading states for forms.

```tsx
import { FormContainer } from '@/components/forms';

<FormContainer
  title="Contact Form"
  description="Get in touch with our team"
  onSubmit={handleSubmit}
  errors={formErrors}
  isLoading={isSubmitting}
>
  {/* Form fields go here */}
</FormContainer>
```

**Props:**

- `children` (ReactNode, required): Form content
- `onSubmit` (function, optional): Form submit handler
- `title` (string, optional): Form title
- `description` (string, optional): Form description
- `errors` (array, optional): Array of form-level errors
- `isLoading` (boolean, optional): Loading state
- `className` (string, optional): Additional CSS classes

### FormButton

A button component with consistent styling, loading states, and multiple variants.

```tsx
import { FormButton } from '@/components/forms';

<FormButton
  type="submit"
  variant="primary"
  size="md"
  loading={isLoading}
  fullWidth
>
  Submit Form
</FormButton>
```

**Props:**

- `children` (ReactNode, required): Button content
- `type` (string, optional): Button type - 'submit' | 'button' | 'reset'
- `variant` (string, optional): Button variant - 'primary' | 'secondary' | 'outline' | 'danger'
- `size` (string, optional): Button size - 'sm' | 'md' | 'lg'
- `loading` (boolean, optional): Loading state
- `disabled` (boolean, optional): Disabled state
- `fullWidth` (boolean, optional): Full width button
- `onClick` (function, optional): Click handler

### ContactForm

A complete contact form example with real estate-specific fields and validation.

```tsx
import { ContactForm } from '@/components/forms';

<ContactForm />
```

## Design System

The form components follow a consistent design system:

### Colors

- **Primary**: Blue (#3A8DDE) for primary actions and focus states
- **Error**: Red (#DC2626) for validation errors
- **Success**: Green (#16B286) for success states
- **Neutral**: Gray scale for text and borders

### Spacing

- Consistent 6-unit spacing system (1.5rem)
- Form fields: 24px vertical spacing
- Form sections: 32px vertical spacing

### Typography

- Labels: 14px, font-medium, gray-700
- Input text: 16px, gray-900
- Error text: 14px, red-600
- Help text: 14px, gray-500

### Accessibility Features

- Proper ARIA labels and descriptions
- Error announcements with `role="alert"`
- Focus management and keyboard navigation
- Screen reader friendly error messages
- High contrast color ratios

## Validation Patterns

### Real-time Validation

```tsx
const handleFieldChange = (name: string, value: string) => {
  setFormData(prev => ({ ...prev, [name]: value }));
  
  // Clear error when user starts typing
  if (errors[name]) {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
  }
};
```

### Blur Validation

```tsx
const handleFieldBlur = (name: string) => {
  const error = validateField(name, formData[name]);
  if (error) {
    setErrors(prev => ({ ...prev, [name]: error }));
  }
};
```

### Form Submission Validation

```tsx
const validateForm = (): boolean => {
  const newErrors: FormErrors = {};
  
  Object.keys(formData).forEach(key => {
    const error = validateField(key, formData[key]);
    if (error) {
      newErrors[key] = error;
    }
  });
  
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
```

## Best Practices

### 1. Field Organization

- Group related fields together
- Use appropriate input types (email, tel, etc.)
- Provide clear, descriptive labels
- Include helpful placeholder text

### 2. Validation

- Validate on blur for immediate feedback
- Clear errors when user starts typing
- Provide specific, actionable error messages
- Use HTML5 validation attributes

### 3. Accessibility

- Always include proper labels
- Use semantic HTML elements
- Provide error announcements
- Ensure keyboard navigation works

### 4. User Experience

- Show loading states during submission
- Provide clear success feedback
- Allow form reset functionality
- Maintain form state appropriately

### 5. Real Estate Specific

- Include property type selections
- Add budget range options
- Provide timeline expectations
- Collect relevant contact information

## Usage Examples

### Basic Contact Form

```tsx
import { FormContainer, FormField, FormButton } from '@/components/forms';

const BasicContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  return (
    <FormContainer title="Contact Us" onSubmit={handleSubmit}>
      <FormField
        id="name"
        name="name"
        label="Full Name"
        value={formData.name}
        onChange={(value) => setFormData(prev => ({ ...prev, name: value }))}
        required
      />
      <FormField
        id="email"
        name="email"
        label="Email"
        type="email"
        value={formData.email}
        onChange={(value) => setFormData(prev => ({ ...prev, email: value }))}
        required
      />
      <FormField
        id="message"
        name="message"
        label="Message"
        type="textarea"
        value={formData.message}
        onChange={(value) => setFormData(prev => ({ ...prev, message: value }))}
        rows={4}
      />
      <FormButton type="submit" fullWidth>
        Send Message
      </FormButton>
    </FormContainer>
  );
};
```

### Property Search Form

```tsx
const PropertySearchForm = () => {
  const propertyTypes = [
    { value: 'single-family', label: 'Single Family Home' },
    { value: 'condo', label: 'Condominium' },
    { value: 'townhouse', label: 'Townhouse' }
  ];

  return (
    <FormContainer title="Find Your Home">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FormField
          id="propertyType"
          name="propertyType"
          label="Property Type"
          type="select"
          options={propertyTypes}
        />
        <FormField
          id="minPrice"
          name="minPrice"
          label="Min Price"
          type="number"
          min={0}
          step={10000}
        />
        <FormField
          id="maxPrice"
          name="maxPrice"
          label="Max Price"
          type="number"
          min={0}
          step={10000}
        />
      </div>
      <FormButton type="submit" variant="primary" fullWidth>
        Search Properties
      </FormButton>
    </FormContainer>
  );
};
```

## Customization

### Styling

The components use Tailwind CSS classes and can be customized by:

- Modifying the base classes in each component
- Using the `className` prop for additional styling
- Overriding CSS custom properties for theme colors

### Validation

Custom validation can be added by:

- Extending the validation functions
- Adding custom error messages
- Implementing async validation for API calls

### Accessibility

Additional accessibility features can be added by:

- Including more ARIA attributes
- Adding custom focus management
- Implementing voice navigation support

