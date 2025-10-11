import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  MapPin,
  Mail,
  Phone,
  Info,
  Users,
  Briefcase,
} from 'lucide-react';
import { APP_CONFIG } from '@/constants';
import { FOOTER_NAVIGATION } from '@/constants/navigation';
import Image from 'next/image';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-800 bg-gradient-to-br from-[#1a1825] via-[#212025] to-[#252030]">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
          {/* Organization Info - Left Side */}
          <div className="flex-shrink-0 lg:w-80">
            <div className="mb-8">
              <div className="mb-6 flex items-center space-x-4">
                <div className="relative">
                  <Image
                    src="/assets/icon/logo.png"
                    alt="IKA TE UPI Logo"
                    width={64}
                    height={64}
                    className="h-16 w-16"
                  />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">TEUAS UPI</div>
                  <div className="text-primary text-sm font-medium">
                    Alumni Network
                  </div>
                </div>
              </div>

              <p className="text-primary-foreground mb-6 text-base leading-relaxed">
                Menghubungkan alumni Teknik Elektro UPI untuk membangun masa
                depan yang lebih cerah bersama melalui kolaborasi dan inovasi.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="group hover:text-primary text-primary-foreground flex items-center text-sm transition-colors duration-300">
                  <Mail className="text-primary mr-2 h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                  <span>info@ikateuas.upi.edu</span>
                </div>
                <div className="group hover:text-primary text-primary-foreground flex items-center text-sm transition-colors duration-300">
                  <Phone className="text-primary mr-2 h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                  <span>+62 22 2013161</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Sections - Grid Layout */}
          <div className="flex-grow">
            <div className="grid gap-8 sm:grid-cols-2 lg:gap-6 xl:grid-cols-4">
              {/* About Section */}
              <div>
                <h3 className="border-primary/30 relative mb-6 flex items-center border-b pb-3 text-lg font-bold text-white">
                  <Info className="text-primary mr-2 h-4 w-4" />
                  <span className="relative">
                    {FOOTER_NAVIGATION.about.title}
                    <div className="from-primary to-primary/60 absolute -bottom-3 left-0 h-0.5 w-8 bg-gradient-to-r"></div>
                  </span>
                </h3>
                <ul className="space-y-3">
                  {FOOTER_NAVIGATION.about.items.map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item.href}
                        className="group text-primary-foreground hover:text-primary flex items-center text-sm transition-all duration-300 hover:translate-x-1"
                      >
                        <span className="relative">
                          {item.title}
                          <span className="bg-primary absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full"></span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Community Section */}
              <div>
                <h3 className="border-primary/30 relative mb-6 flex items-center border-b pb-3 text-lg font-bold text-white">
                  <Users className="text-primary mr-2 h-4 w-4" />
                  <span className="relative">
                    {FOOTER_NAVIGATION.community.title}
                    <div className="from-primary to-primary/60 absolute -bottom-3 left-0 h-0.5 w-8 bg-gradient-to-r"></div>
                  </span>
                </h3>
                <ul className="space-y-3">
                  {FOOTER_NAVIGATION.community.items.map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item.href}
                        className="group text-primary-foreground hover:text-primary flex items-center text-sm transition-all duration-300 hover:translate-x-1"
                      >
                        <span className="relative">
                          {item.title}
                          <span className="bg-primary absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full"></span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Opportunities Section */}
              <div>
                <h3 className="border-primary/30 relative mb-6 flex items-center border-b pb-3 text-lg font-bold text-white">
                  <Briefcase className="text-primary mr-2 h-4 w-4" />
                  <span className="relative">
                    {FOOTER_NAVIGATION.opportunities.title}
                    <div className="from-primary to-primary/60 absolute -bottom-3 left-0 h-0.5 w-8 bg-gradient-to-r"></div>
                  </span>
                </h3>
                <ul className="space-y-3">
                  {FOOTER_NAVIGATION.opportunities.items.map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item.href}
                        className="group text-primary-foreground hover:text-primary flex items-center text-sm transition-all duration-300 hover:translate-x-1"
                      >
                        <span className="relative">
                          {item.title}
                          <span className="bg-primary absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full"></span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Location Section */}
              <div>
                <h3 className="relative mb-6 flex items-center border-b border-orange-500/30 pb-3 text-lg font-bold text-white">
                  <MapPin className="text-primary mr-2 h-4 w-4" />
                  <span className="relative">
                    Lokasi
                    <div className="from-primary to-primary/60 absolute -bottom-3 left-0 h-0.5 w-8 bg-gradient-to-r"></div>
                  </span>
                </h3>
                <div className="text-primary-foreground text-sm leading-relaxed">
                  <p className="mb-2 font-semibold text-white">
                    Fakultas Pendidikan Teknologi dan Kejuruan
                  </p>
                  <div className="text-primary-foreground space-y-1">
                    <p>Jl. Dr. Setiabudi No.207</p>
                    <p>Isola, Kec. Sukasari</p>
                    <p>Kota Bandung - 40154</p>
                    <p>Jawa Barat, Indonesia</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Elegant Separator */}
        <div className="my-12">
          <Separator className="bg-gradient-to-r from-transparent via-gray-600 to-transparent" />
        </div>

        {/* Bottom Footer */}
        <div className="flex flex-col items-center space-y-6 text-center">
          {/* Terms, Privacy Policy, and Copyright */}
          <div className="flex flex-col items-center space-y-3 lg:w-full lg:flex-row lg:justify-between lg:space-y-0 lg:space-x-6">
            {/* Terms and Privacy Policy */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
              <Link
                href="/terms"
                className="text-primary-foreground decoration-primary underline-offset-4 transition-all duration-300 hover:text-white hover:underline"
              >
                Syarat & Ketentuan
              </Link>
              <span className="text-primary">•</span>
              <Link
                href="/privacy"
                className="text-primary-foreground decoration-primary underline-offset-4 transition-all duration-300 hover:text-white hover:underline"
              >
                Kebijakan Privasi
              </Link>
            </div>

            {/* Copyright */}
            <p className="text-primary-foreground text-sm">
              © {currentYear} IKA TEUAS UPI. Seluruh hak cipta dilindungi.
            </p>
          </div>

          {/* Social Media Links */}
          <div className="flex flex-col items-center space-y-4">
            <span className="text-primary-foreground text-sm font-medium">
              Ikuti Kami:
            </span>
            <div className="flex space-x-2">
              {APP_CONFIG.social &&
                Object.entries(APP_CONFIG.social).map(([platform, url]) => {
                  const socialConfig = {
                    facebook: {
                      icon: Facebook,
                      colors:
                        'hover:bg-blue-600/20 hover:text-blue-400 hover:shadow-blue-500/25',
                      bgColor: 'bg-blue-600/10',
                    },
                    instagram: {
                      icon: Instagram,
                      colors:
                        'hover:bg-pink-600/20 hover:text-pink-400 hover:shadow-pink-500/25',
                      bgColor:
                        'bg-gradient-to-br from-pink-600/10 to-purple-600/10',
                    },
                    twitter: {
                      icon: Twitter,
                      colors:
                        'hover:bg-sky-600/20 hover:text-sky-400 hover:shadow-sky-500/25',
                      bgColor: 'bg-sky-600/10',
                    },
                    linkedin: {
                      icon: Linkedin,
                      colors:
                        'hover:bg-blue-700/20 hover:text-blue-500 hover:shadow-blue-600/25',
                      bgColor: 'bg-blue-700/10',
                    },
                    youtube: {
                      icon: Youtube,
                      colors:
                        'hover:bg-red-600/20 hover:text-red-400 hover:shadow-red-500/25',
                      bgColor: 'bg-red-600/10',
                    },
                  };

                  const config =
                    socialConfig[platform as keyof typeof socialConfig];
                  if (!config) return null;

                  const IconComponent = config.icon;

                  return (
                    <Link
                      key={platform}
                      href={url || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group text-primary-foreground relative rounded-xl p-3 transition-all duration-300 ${config.colors} hover:scale-110 hover:shadow-lg`}
                      aria-label={
                        platform.charAt(0).toUpperCase() + platform.slice(1)
                      }
                    >
                      <IconComponent className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                      <div
                        className={`absolute inset-0 rounded-xl ${config.bgColor} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                      ></div>
                    </Link>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
