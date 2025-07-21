'use client';

import React, { useState } from 'react';
import { FormContainer } from './FormContainer';
import { FormField } from './FormField';
import { FormButton } from './FormButton';

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  propertyType: string;
  budget: string;
  timeline: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    propertyType: '',
    budget: '',
    timeline: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const propertyTypeOptions = [
    { value: 'single-family', label: 'Single Family Home' },
    { value: 'condo', label: 'Condominium' },
    { value: 'townhouse', label: 'Townhouse' },
    { value: 'multi-family', label: 'Multi-Family' },
    { value: 'land', label: 'Land/Lot' },
    { value: 'commercial', label: 'Commercial' },
  ];

  const budgetOptions = [
    { value: 'under-300k', label: 'Under $300,000' },
    { value: '300k-500k', label: '$300,000 - $500,000' },
    { value: '500k-750k', label: '$500,000 - $750,000' },
    { value: '750k-1m', label: '$750,000 - $1,000,000' },
    { value: 'over-1m', label: 'Over $1,000,000' },
  ];

  const timelineOptions = [
    { value: 'immediate', label: 'Immediately' },
    { value: '1-3-months', label: '1-3 months' },
    { value: '3-6-months', label: '3-6 months' },
    { value: '6-12-months', label: '6-12 months' },
    { value: 'over-12-months', label: 'Over 12 months' },
  ];

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'firstName':
        return value.trim() ? '' : 'First name is required';
      case 'lastName':
        return value.trim() ? '' : 'Last name is required';
      case 'email':
        if (!value.trim()) return 'Email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value) ? '' : 'Please enter a valid email address';
      case 'phone':
        if (!value.trim()) return 'Phone number is required';
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        return phoneRegex.test(value.replace(/[\s\-\(\)]/g, '')) ? '' : 'Please enter a valid phone number';
      case 'propertyType':
        return value ? '' : 'Please select a property type';
      case 'budget':
        return value ? '' : 'Please select a budget range';
      case 'timeline':
        return value ? '' : 'Please select a timeline';
      default:
        return '';
    }
  };

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

  const handleFieldBlur = (name: string) => {
    const error = validateField(name, formData[name as keyof ContactFormData]);
    if (error) {
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key as keyof ContactFormData]);
      if (error) {
        newErrors[key] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would typically send the data to your API
      console.log('Form submitted:', formData);
      
      setIsSubmitted(true);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        propertyType: '',
        budget: '',
        timeline: '',
        message: '',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({ submit: 'There was an error submitting your form. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <FormContainer
        title="Thank You!"
        description="We've received your inquiry and will be in touch within 24 hours."
        className="text-center"
      >
        <div className="py-8">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
            <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Message Sent Successfully</h3>
          <p className="text-gray-600 mb-6">
            Our team will review your requirements and get back to you with personalized recommendations.
          </p>
          <FormButton
            variant="outline"
            onClick={() => setIsSubmitted(false)}
          >
            Send Another Message
          </FormButton>
        </div>
      </FormContainer>
    );
  }

  return (
    <FormContainer
      title="Get in Touch"
      description="Tell us about your real estate needs and we'll help you find your perfect home."
      onSubmit={handleSubmit}
      errors={errors.submit ? [errors.submit] : []}
      isLoading={isLoading}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          id="firstName"
          name="firstName"
          label="First Name"
          type="text"
          value={formData.firstName}
          onChange={(value) => handleFieldChange('firstName', value)}
          onBlur={() => handleFieldBlur('firstName')}
          error={errors.firstName}
          required
          autoComplete="given-name"
        />

        <FormField
          id="lastName"
          name="lastName"
          label="Last Name"
          type="text"
          value={formData.lastName}
          onChange={(value) => handleFieldChange('lastName', value)}
          onBlur={() => handleFieldBlur('lastName')}
          error={errors.lastName}
          required
          autoComplete="family-name"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          id="email"
          name="email"
          label="Email Address"
          type="email"
          value={formData.email}
          onChange={(value) => handleFieldChange('email', value)}
          onBlur={() => handleFieldBlur('email')}
          error={errors.email}
          required
          autoComplete="email"
        />

        <FormField
          id="phone"
          name="phone"
          label="Phone Number"
          type="tel"
          value={formData.phone}
          onChange={(value) => handleFieldChange('phone', value)}
          onBlur={() => handleFieldBlur('phone')}
          error={errors.phone}
          required
          autoComplete="tel"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FormField
          id="propertyType"
          name="propertyType"
          label="Property Type"
          type="select"
          value={formData.propertyType}
          onChange={(value) => handleFieldChange('propertyType', value)}
          onBlur={() => handleFieldBlur('propertyType')}
          error={errors.propertyType}
          required
          options={propertyTypeOptions}
        />

        <FormField
          id="budget"
          name="budget"
          label="Budget Range"
          type="select"
          value={formData.budget}
          onChange={(value) => handleFieldChange('budget', value)}
          onBlur={() => handleFieldBlur('budget')}
          error={errors.budget}
          required
          options={budgetOptions}
        />

        <FormField
          id="timeline"
          name="timeline"
          label="Timeline"
          type="select"
          value={formData.timeline}
          onChange={(value) => handleFieldChange('timeline', value)}
          onBlur={() => handleFieldBlur('timeline')}
          error={errors.timeline}
          required
          options={timelineOptions}
        />
      </div>

      <FormField
        id="message"
        name="message"
        label="Additional Details"
        type="textarea"
        value={formData.message}
        onChange={(value) => handleFieldChange('message', value)}
        placeholder="Tell us about your specific needs, preferred neighborhoods, or any other details..."
        rows={4}
      />

      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <FormButton
          type="submit"
          loading={isLoading}
          fullWidth
        >
          Send Message
        </FormButton>
        
        <FormButton
          type="button"
          variant="outline"
          onClick={() => {
            setFormData({
              firstName: '',
              lastName: '',
              email: '',
              phone: '',
              propertyType: '',
              budget: '',
              timeline: '',
              message: '',
            });
            setErrors({});
          }}
          fullWidth
        >
          Clear Form
        </FormButton>
      </div>
    </FormContainer>
  );
}; 