"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Flame, Award, Heart, Users, Target, Phone, Mail } from 'lucide-react';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import logo from "../../../../../public/icons/qasr-alsutan-logo.png";
import Link from '@/components/common/Link';

const values = [
  {
    icon: Flame,
    titleEn: 'Authentic Tradition',
    titleAr: 'تقليد أصيل',
    descriptionEn:
      'Our grilling techniques and recipes have been perfected over generations, bringing you genuine flavors.',
    descriptionAr:
      'تم تحسين تقنيات ووصفات الشواء لدينا عبر الأجيال، لتقديم نكهات أصيلة.',
  },
  {
    icon: Award,
    titleEn: 'Premium Quality',
    titleAr: 'جودة ممتازة',
    descriptionEn:
      'We source only the finest ingredients and meats, ensuring every dish meets our high standards.',
    descriptionAr:
      'نحن نوفر أفضل المكونات واللحوم فقط لضمان أن كل طبق يفي بمعاييرنا العالية.',
  },
  {
    icon: Heart,
    titleEn: 'Passion for Food',
    titleAr: 'شغف بالطعام',
    descriptionEn:
      'Every meal is prepared with care and dedication by our experienced chefs who love what they do.',
    descriptionAr:
      'يتم إعداد كل وجبة بعناية وتفانٍ من قبل طهاتنا ذوي الخبرة الذين يحبون ما يفعلونه.',
  },
  {
    icon: Users,
    titleEn: 'Family Atmosphere',
    titleAr: 'جو عائلي',
    descriptionEn:
      'We create a welcoming environment where families and friends can gather and enjoy great food together.',
    descriptionAr:
      'نحن نخلق بيئة ترحيبية حيث يمكن للعائلات والأصدقاء التجمع والاستمتاع بالطعام الرائع معًا.',
  },
];

const milestones = [
  { year: '2010', eventEn: 'First restaurant opened in Riyadh', eventAr: 'افتتاح أول مطعم في الرياض' },
  { year: '2015', eventEn: 'Expanded to 5 locations across the city', eventAr: 'التوسع إلى 5 فروع عبر المدينة' },
  { year: '2018', eventEn: 'Introduced fresh butcher section', eventAr: 'تم تقديم قسم الجزارة الطازج' },
  { year: '2020', eventEn: 'Launched online ordering platform', eventAr: 'إطلاق منصة الطلب عبر الإنترنت' },
  { year: '2023', eventEn: 'Reached 10+ branches serving thousands daily', eventAr: 'وصلنا لأكثر من 10 فروع تخدم آلاف العملاء يوميًا' },
];

export default function AboutContent() {
  const locale = useLocale();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
    

      {/* About Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
         <div className=" bg-slate-800 dark:bg-red-900/20 p-5 rounded-2xl  shadow-sm shadow-red-900/30 dark:shadow-red-900/30 flex items-center justify-center border border-gray-200 dark:border-red-800/50">
            <Image
              src={logo}
              alt="Mansour Sweet Bakery Logo"
              width={456}
              height={456}
              className="w-full h-auto transform group-hover:scale-105 transition-transform duration-500 m-10"
              priority
            />
        </div>

          <div className={locale === 'ar' ? 'text-right' : 'text-left'}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              {locale === 'ar' ? 'إرث من التميز' : 'A Legacy of Excellence'}
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>
                {locale === 'ar'
                  ? 'تأسس Grilled Qasr Al-Sultan برؤية بسيطة: تقديم مأكولات مشوية أصيلة وعالية الجودة لمجتمعنا.'
                  : 'Grilled Qasr Al-Sultan was founded with a simple vision: to bring authentic, high-quality grilled cuisine to our community.'}
              </p>
              <p>
                {locale === 'ar'
                  ? 'يعكس اسمنا "قصر السلطان المشوي" التزامنا بتقديم طعام يستحق الملكية.'
                  : 'Our name, which translates to "The Sultan\'s Grilled Palace," reflects our dedication to serving food fit for royalty.'}
              </p>
              <p>
                {locale === 'ar'
                  ? 'اليوم، نواصل احترام جذورنا مع الابتكار المستمر لتقديم أفضل تجربة.'
                  : 'Today, we continue to honor our roots while constantly innovating to serve you better.'}
              </p>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            {locale === 'ar' ? 'قيمنا الأساسية' : 'Our Core Values'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card
                key={index}
                className="border-2 hover:border-[#FFC50F] dark:hover:border-[#A72703] transition-all hover:shadow-lg hover:scale-105 duration-300"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-[#FFC50F]/30 dark:bg-[#A72703]/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-[#A72703] dark:text-[#FFC50F]" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                    {locale === 'ar' ? value.titleAr : value.titleEn}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {locale === 'ar' ? value.descriptionAr : value.descriptionEn}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Mission */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 md:p-12 mb-20">
          <div className="flex items-center justify-center mb-8">
            <Target className="w-12 h-12 text-[#A72703]" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            {locale === 'ar' ? 'مهمتنا' : 'Our Mission'}
          </h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 text-center max-w-3xl mx-auto leading-relaxed">
            {locale === 'ar'
              ? 'تقديم أفضل مأكولات مشوية باستخدام مكونات ممتازة وتقنيات تقليدية، مع خلق جو ترحيبي حيث تُصنع الذكريات وتُحتفى بالتقاليد.'
              : 'To provide our community with the finest grilled cuisine, prepared with premium ingredients and traditional techniques, while creating a welcoming atmosphere where memories are made and traditions are celebrated.'}
          </p>
        </div>

        {/* Journey */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            {locale === 'ar' ? 'رحلتنا' : 'Our Journey'}
          </h2>
          <div className="max-w-3xl mx-auto relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-[#FFC50F]/50 dark:bg-[#A72703]/50"></div>
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="relative flex items-start">
                  <div className="absolute left-0 w-16 h-16 bg-[#A72703] rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                    {milestone.year}
                  </div>
                  <div className="ml-24 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex-1 border-2 border-gray-100 dark:border-gray-700 hover:border-[#FFC50F] dark:hover:border-[#A72703] transition-all">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {locale === 'ar' ? milestone.eventAr : milestone.eventEn}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Join CTA */}
        <div className="bg-gradient-to-br from-[#FFC50F]/20 to-[#A72703]/20 rounded-2xl p-8 md:p-12">
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {locale === 'ar' ? 'انضم إلى عائلتنا المتنامية' : 'Join Our Growing Family'}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto leading-relaxed">
              {locale === 'ar'
                ? 'نحن دائمًا نبحث عن أفراد شغوفين للانضمام إلى فريقنا. إذا كنت تشارك قيمنا وحبنا للطعام الرائع، نود سماع منك.'
                : "We're always looking for passionate individuals to join our team. If you share our values and love for great food, we'd love to hear from you."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="tel:+966123456789"
                className="inline-flex items-center justify-center px-6 py-3 bg-[#A72703] text-white rounded-md hover:bg-[#FF0000] transition-colors font-medium"
              >
                <Phone className="w-5 h-5 mr-2" />
                {locale === 'ar' ? 'اتصل بنا' : 'Contact Us'}
              </Link>
              <Link
                href="mailto:careers@qasralsultan.com"
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-[#A72703] border-2 border-[#A72703] rounded-md hover:bg-[#FFC50F]/20 transition-colors font-medium"
              >
                <Mail className="w-5 h-5 mr-2" />
                {locale === 'ar' ? 'فرص عمل' : 'Career Opportunities'}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
