'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

import {
  Send,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { logger } from '@teuas/shared/utils';

interface DonateFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  category: string;
  amount: number;
  amountOptions: number[];
  screenshotDonate?: string;
}

export function DonorsForm() {
  const [formData, setFormData] = useState<DonateFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
    category: 'general',
    amount: 0,
    amountOptions: [10000, 25000, 50000, 100000, 250000, 500000, 1000000, 2000000],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');


  const handleInputChange = (field: keyof DonateFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAmountChange = (field: keyof DonateFormData, value: number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Here you would typically send the data to your backend
      logger.log('Form submitted:', formData);

      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        category: 'general',
        amount: formData.amount, // Keep the last selected amount
        amountOptions: [10000, 25000, 50000, 100000, 250000, 500000, 1000000, 2000000],
      });
    } catch (error) {
      logger.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid =
    formData.name && formData.email && formData.message && formData.amount && formData.screenshotDonate;

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="mb-4 text-3xl font-bold">Form Donasi</h2>
          <p className="text-muted-foreground mx-auto max-w-2xl">
            Berapapun donasi yang diberikan sangat berarti bagi yang akan menerimanya nanti 😁
          </p>
        </div>

        <div className="gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="flex h-full flex-col">
              <CardHeader>
                <CardTitle>Form Donasi</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nama Lengkap *</Label>
                      <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          handleInputChange('name', e.target.value)
                        }
                        placeholder="Masukkan nama lengkap Anda"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Alamat Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange('email', e.target.value)
                        }
                        placeholder="Masukkan alamat email Anda"
                        required
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message">Pesan *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) =>
                        handleInputChange('message', e.target.value)
                      }
                      placeholder="Masukkan pesan Anda di sini..."
                      rows={10}
                      className="h-[160px]"
                      required
                    />
                  </div>

                  {/* Donate */}
                  <div className="space-y-2">
                    <Label htmlFor="amount">Jumlah Donasi *</Label>
                    <Input
                      id="amount"
                      type="number"
                      value={formData.amount}
                      onChange={(e) =>
                        handleInputChange('amount', e.target.value)
                      }
                      placeholder="Masukkan jumlah donasi..."
                      required
                    />
                    <Card className='gap-2 overflow-auto sm:items-center'>
                      <CardContent className="flex items-center justify-between gap-2">
                        {formData.amountOptions.map((amount) => (
                          <Button
                            type="button"
                            key={amount}
                            onClick={() => handleAmountChange('amount', amount)}
                          >
                            {amount.toLocaleString('id-ID', {
                              style: 'currency',
                              currency: 'IDR',
                            })}
                          </Button>
                        )
                        )
                        }
                      </CardContent>
                    </Card>
                  </div>

                  {/* Screenshot */}
                  <div className="space-y-2">
                    <Label htmlFor="screenshotDonate">Bukti Donasi *</Label>
                    <Input
                      id="screenshotDonate"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          handleInputChange('screenshotDonate', file.name);
                        }
                      }}
                      placeholder="Upload bukti donasi"
                      required
                    />
                  </div>

                  {/* Submit Status */}
                  {submitStatus === 'success' && (
                    <div className="flex items-center space-x-2 text-green-600">
                      <CheckCircle className="h-5 w-5" />
                      <span>
                        Donasi berhasil dikirim! Kami akan segera menghubungi
                        Anda.
                      </span>
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="flex items-center space-x-2 text-red-600">
                      <AlertCircle className="h-5 w-5" />
                      <span>Gagal mengirim donasi. Silakan coba lagi.</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={!isFormValid || isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center space-x-2">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        <span>Mengirim...</span>
                      </span>
                    ) : (
                      <span className="flex items-center space-x-2">
                        <Send className="h-4 w-4" />
                        <span>Kirim Donasi</span>
                      </span>
                    )}
                  </Button>

                  <p className="text-muted-foreground text-sm">
                    * Field wajib diisi. Kami akan merespons dalam 24-48 jam.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>


        </div>
      </div>
    </section>
  );
}
