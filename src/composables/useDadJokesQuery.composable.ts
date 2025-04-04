import axios from 'axios';
import { useQuery } from '@tanstack/vue-query';
import { watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { toast } from 'vue3-toastify';
import type { Joke } from '../types';

const url = `${import.meta.env.VITE_APP_API_URL}/jokes/dad/${import.meta.env.VITE_APP_JOKE_COUNT_STRING}`;

export function useDadJokesQuery() {
  const { t } = useI18n();
  const { isFetching, isError, data, refetch } = useQuery({
    queryKey: ['jokes', 'dad'],
    queryFn: getDadJokes,
  });

  watch(isError, (newIsError) => {
    if (newIsError) {
      if (!toast.isActive('generic-error')) {
        toast.error(t('errors.genericError'), { toastId: 'generic-error' });
      }
    }
  });

  return {
    isFetching,
    data,
    refetch,
  };
}

async function getDadJokes(): Promise<Array<Joke>> {
  try {
    const jokes = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return jokes?.data as Array<Joke>;
  } catch (error) {
    /**
     * *** Could log the error somewhere, or console.error on non-prod env ***
     */
    throw error;
  }
}
