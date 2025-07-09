import { useTranslation as useI18nTranslation } from 'react-i18next';

// Custom hook that extends react-i18next's useTranslation with additional functionality
export const useTranslation = (namespace?: string) => {
  const { t, i18n, ready } = useI18nTranslation(namespace);

  // Helper function for common translations
  const tc = (key: string, options?: any) => t(`common.${key}`, options);
  
  // Helper function for navigation translations
  const tn = (key: string, options?: any) => t(`navigation.${key}`, options);
  
  // Helper function for kanban translations
  const tk = (key: string, options?: any) => t(`kanban.${key}`, options);
  
  // Helper function for filter translations
  const tf = (key: string, options?: any) => t(`filters.${key}`, options);
  
  // Helper function for priority translations
  const tp = (key: string, options?: any) => t(`priority.${key}`, options);
  
  // Helper function for status translations
  const ts = (key: string, options?: any) => t(`status.${key}`, options);
  
  // Helper function for message translations
  const tm = (key: string, options?: any) => t(`messages.${key}`, options);
  
  // Helper function for validation translations
  const tv = (key: string, options?: any) => t(`validation.${key}`, options);

  // Get current language info
  const getCurrentLanguage = () => {
    const languages = [
      { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
      { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
      { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
      { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
      { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
    ];
    
    return languages.find(lang => lang.code === i18n.language) || languages[0];
  };

  // Check if current language is RTL
  const isRTL = () => {
    return i18n.language === 'ar';
  };

  // Format date according to current locale
  const formatDate = (date: Date | string, options?: Intl.DateTimeFormatOptions) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const defaultOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
    
    return new Intl.DateTimeFormat(i18n.language, { ...defaultOptions, ...options }).format(dateObj);
  };

  // Format number according to current locale
  const formatNumber = (number: number, options?: Intl.NumberFormatOptions) => {
    return new Intl.NumberFormat(i18n.language, options).format(number);
  };

  // Format currency according to current locale
  const formatCurrency = (amount: number, currency = 'USD') => {
    return new Intl.NumberFormat(i18n.language, {
      style: 'currency',
      currency,
    }).format(amount);
  };

  return {
    t,
    tc,
    tn,
    tk,
    tf,
    tp,
    ts,
    tm,
    tv,
    i18n,
    ready,
    getCurrentLanguage,
    isRTL,
    formatDate,
    formatNumber,
    formatCurrency,
    changeLanguage: i18n.changeLanguage,
    language: i18n.language,
  };
};

export default useTranslation;