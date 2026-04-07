"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container } from '@/components/Layout/Container';
import { Card, CardContent } from '@/components/UI/Card';
import { FormSection } from '@/components/Form/FormSection';
import { InputField } from '@/components/Form/InputField';
import { TextAreaField } from '@/components/Form/TextAreaField';
import { Button } from '@/components/UI/Button';
import { useSowStore } from '@/store/useSowStore';

export default function GeneratorPage() {
  const router = useRouter();
  const setSowData = useSowStore(state => state.setSowData);
  const [formData, setFormData] = useState({
    clientName: '',
    projectTitle: '',
    scopeOfWork: '',
    timeline: '',
    pricing: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSowData(formData);
    router.push('/result');
  };

  return (
    <Container className="py-12">
      <div className="mb-10 text-center max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-3">Project Details</h1>
        <p className="text-gray-500 text-lg">Fill in the information below to automatically generate your Statement of Work document.</p>
      </div>

      <Card className="max-w-4xl mx-auto shadow-sm border-gray-200">
        <CardContent className="p-0">
          <form onSubmit={handleSubmit} className="px-6 md:px-12">
            <FormSection 
              title="General Information" 
              description="Basic details about your client and the project."
            >
              <InputField 
                id="clientName"
                label="Client / Company Name" 
                placeholder="e.g. Acme Corp" 
                required 
                value={formData.clientName}
                onChange={handleChange}
              />
              <InputField 
                id="projectTitle"
                label="Project Title" 
                placeholder="e.g. Website Redesign" 
                required 
                value={formData.projectTitle}
                onChange={handleChange}
              />
            </FormSection>

            <FormSection 
              title="Scope of Work" 
              description="Outline the deliverables. Use bullet points or new lines for clarity."
            >
              <TextAreaField 
                id="scopeOfWork"
                label="Deliverables & Tasks" 
                placeholder="- Main landing page design&#10;- User authentication UI&#10;- Dashboard layout"
                required
                className="min-h-[160px]"
                value={formData.scopeOfWork}
                onChange={handleChange}
              />
            </FormSection>

            <FormSection 
              title="Timeline & Schedule" 
              description="When the project starts and the expected completion timeframe."
            >
              <TextAreaField 
                id="timeline"
                label="Timeline Details" 
                placeholder="Project kick-off on Monday, 3rd. Expected completion in 4 weeks."
                required
                value={formData.timeline}
                onChange={handleChange}
              />
            </FormSection>

            <FormSection 
              title="Pricing" 
              description="Cost of the project and payment structures."
            >
              <TextAreaField 
                id="pricing"
                label="Pricing & Payment Terms" 
                placeholder="Total cost: $5,000. \n50% upfront, 50% upon completion."
                required
                value={formData.pricing}
                onChange={handleChange}
              />
            </FormSection>

            <div className="py-8 flex justify-end">
              <Button type="submit" className="px-8 font-semibold w-full md:w-auto h-12 shadow-sm text-base">
                Generate Document
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
}
