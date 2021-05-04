import { useRouter } from 'next/router'

import en from '../locales/en'
// import es from '../locales/es'

export const useTranslation = () => {
  const router = useRouter()
  const { locale } = router
  const tranlation = {
    en,
    es: en,
  }[locale]

  return [tranlation]
}
